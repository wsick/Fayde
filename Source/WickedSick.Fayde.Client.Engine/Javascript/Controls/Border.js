/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="../Core/DependencyObject.js" />
/// <reference path="../Primitives/CornerRadius.js"/>
/// <reference path="../Primitives/Thickness.js"/>
/// <reference path="../Media/Brush.js"/>
/// <reference path="../Engine/RenderContext.js"/>

(function (namespace) {
    var Border = Nullstone.Create("Border", Fayde.FrameworkElement);

    //#region Properties

    Border.BackgroundProperty = DependencyProperty.RegisterCore("Background", function () { return Fayde.Media.Brush; }, Border);
    Border.BorderBrushProperty = DependencyProperty.RegisterCore("BorderBrush", function () { return Fayde.Media.Brush; }, Border);
    Border.BorderThicknessProperty = DependencyProperty.RegisterFull("BorderThickness", function () { return Thickness; }, Border, new Thickness(0), undefined, undefined, undefined, undefined, Border._ThicknessValidator);
    Border.ChildProperty = DependencyProperty.RegisterCore("Child", function () { return Fayde.UIElement; }, Border);
    Border.CornerRadiusProperty = DependencyProperty.RegisterFull("CornerRadius", function () { return CornerRadius; }, Border, new CornerRadius(0), undefined, undefined, undefined, undefined, Border._CornerRadiusValidator);
    Border.PaddingProperty = DependencyProperty.RegisterFull("Padding", function () { return Thickness; }, Border, new Thickness(0), undefined, undefined, undefined, undefined, Border._ThicknessValidator);

    Nullstone.AutoProperties(Border, [
        Border.BackgroundProperty,
        Border.BorderBrushProperty,
        Border.BorderThicknessProperty,
        Border.ChildProperty,
        Border.CornerRadiusProperty,
        Border.PaddingProperty
    ]);

    //#endregion

    //#region Annotations

    Border.Annotations = {
        ContentProperty: Border.ChildProperty
    };

    //#endregion

    //#region Instance Methods

    Border.Instance.IsLayoutContainer = function () { return true; };
    Border.Instance._MeasureOverrideWithError = function (availableSize, error) {
        var desired = new Size();
        var border = this.Padding.Plus(this.BorderThickness);

        var walker = new Fayde._VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            child._MeasureWithError(availableSize.ShrinkByThickness(border), error);
            desired = child._DesiredSize;
        }
        desired = desired.GrowByThickness(border);
        desired = desired.Min(availableSize);
        return desired;
    };
    Border.Instance._ArrangeOverrideWithError = function (finalSize, error) {
        var border = this.Padding.Plus(this.BorderThickness);
        var arranged = finalSize;

        var walker = new Fayde._VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
            childRect = childRect.ShrinkByThickness(border);
            child._ArrangeWithError(childRect, error);
            arranged = new Size(childRect.Width, childRect.Height).GrowBy(border);
            arranged = arranged.Max(finalSize);
        }
        return finalSize;
    };

    //#region Render

    Border.Instance._Render = function (ctx, region) {
        /// <param name="ctx" type="_RenderContext"></param>
        var borderBrush = this.BorderBrush;
        var extents = this._Extents;
        var backgroundBrush = this.Background;

        if (!backgroundBrush && !borderBrush)
            return;
        if (extents.IsEmpty())
            return;

        var thickness = this.BorderThickness;

        var fillOnly = !borderBrush || thickness.IsEmpty();
        if (fillOnly && !backgroundBrush)
            return;
        ctx.Save();
        this._RenderLayoutClip(ctx);
        if (fillOnly)
            this._RenderFillOnly(ctx, extents, backgroundBrush, thickness, this.CornerRadius);
        else if (thickness.IsBalanced())
            this._RenderBalanced(ctx, extents, backgroundBrush, borderBrush, thickness, this.CornerRadius);
        else
            this._RenderUnbalanced(ctx, extents, backgroundBrush, borderBrush, thickness, this.CornerRadius);
        ctx.Restore();
    };
    Border.Instance._RenderFillOnly = function (ctx, extents, backgroundBrush, thickness, cornerRadius) {
        /// <param name="ctx" type="_RenderContext"></param>
        /// <param name="extents" type="Rect"></param>
        /// <param name="backgroundBrush" type="Brush"></param>
        /// <param name="thickness" type="Thickness"></param>
        /// <param name="cornerRadius" type="CornerRadius"></param>

        var fillExtents = thickness.IsEmpty() ? extents : extents.ShrinkByThickness(thickness);

        if (cornerRadius.IsZero()) {
            ctx.FillRect(backgroundBrush, fillExtents);
            return;
        }

        var rawPath = new Fayde.Shapes.RawPath();
        rawPath.RoundedRectFull(fillExtents.X, fillExtents.Y, fillExtents.Width, fillExtents.Height,
            cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
        rawPath.Draw(ctx);
        ctx.Fill(backgroundBrush, fillExtents);
    };
    Border.Instance._RenderBalanced = function (ctx, extents, backgroundBrush, borderBrush, thickness, cornerRadius) {
        /// <param name="ctx" type="_RenderContext"></param>
        /// <param name="extents" type="Rect"></param>
        /// <param name="backgroundBrush" type="Brush"></param>
        /// <param name="borderBrush" type="Brush"></param>
        /// <param name="thickness" type="Thickness"></param>
        /// <param name="cornerRadius" type="CornerRadius"></param>

        //Stroke renders half-out/half-in the path, Border control needs to fit within the given extents so we need to shrink by half the border thickness
        var full = thickness.Left;
        var half = full * 0.5;
        var strokeExtents = extents.ShrinkBy(half, half, half, half);
        var fillExtents = extents.ShrinkBy(full, full, full, full);

        if (cornerRadius.IsZero()) {
            //Technically this fills outside it's fill extents, we may need to do something different for a transparent border brush
            if (backgroundBrush) {
                ctx.StrokeAndFillRect(borderBrush, thickness.Left, strokeExtents, backgroundBrush, fillExtents);
            } else {
                ctx.Rect(fillExtents);
                ctx.Stroke(borderBrush, thickness.Left, extents);
            }
        } else {
            var rawPath = new Fayde.Shapes.RawPath();
            rawPath.RoundedRectFull(strokeExtents.X, strokeExtents.Y, strokeExtents.Width, strokeExtents.Height,
                cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
            rawPath.Draw(ctx);
            if (backgroundBrush)
                ctx.Fill(backgroundBrush, fillExtents);
            ctx.Stroke(borderBrush, thickness.Left, extents);
        }
    };
    Border.Instance._RenderUnbalanced = function (ctx, extents, backgroundBrush, borderBrush, thickness, cornerRadius) {
        /// <param name="ctx" type="_RenderContext"></param>
        /// <param name="extents" type="Rect"></param>
        /// <param name="backgroundBrush" type="Brush"></param>
        /// <param name="borderBrush" type="Brush"></param>
        /// <param name="thickness" type="Thickness"></param>
        /// <param name="cornerRadius" type="CornerRadius"></param>

        var hasCornerRadius = !cornerRadius.IsZero();
        var innerExtents = extents.ShrinkByThickness(thickness);

        var innerPath = new Fayde.Shapes.RawPath();
        var outerPath = new Fayde.Shapes.RawPath();
        if (hasCornerRadius) {
            outerPath.RoundedRectFull(0, 0, extents.Width, extents.Height,
                cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
            innerPath.RoundedRectFull(innerExtents.X - extents.X, innerExtents.Y - extents.Y, innerExtents.Width, innerExtents.Height,
                cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
        } else {
            outerPath.Rect(0, 0, extents.Width, extents.Height);
            innerPath.Rect(innerExtents.X - extents.X, innerExtents.Y - extents.Y, innerExtents.Width, innerExtents.Height);
        }

        var tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = extents.Width;
        tmpCanvas.height = extents.Height;
        var tmpCtx = tmpCanvas.getContext("2d");

        outerPath.Draw(tmpCtx);
        borderBrush.SetupBrush(tmpCtx, extents);
        tmpCtx.fillStyle = borderBrush.ToHtml5Object();
        tmpCtx.fill();

        tmpCtx.globalCompositeOperation = "xor";
        innerPath.Draw(tmpCtx);
        tmpCtx.fill();

        ctx.CanvasContext.drawImage(tmpCanvas, extents.X, extents.Y);
        DrawDebug("Draw Image (Border)");

        innerPath.Draw(ctx);
        if (backgroundBrush)
            ctx.Fill(backgroundBrush, innerExtents);
    };

    //#endregion

    Border.Instance._CanFindElement = function () {
        return this.Background != null || this.BorderBrush != null;
    };

    //#endregion

    //#region Changed

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Border.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Border) {
                this._OnPropertyChanged$FrameworkElement(args, error)
                return;
            }

            var ivprop = false;
            switch (args.Property._ID) {
                case Border.ChildProperty._ID:
                    if (args.OldValue && args.OldValue instanceof Fayde.UIElement) {
                        this._ElementRemoved(args.OldValue);
                        this._SubtreeObject = null;
                        if (args.OldValue instanceof Fayde.FrameworkElement) {
                            args.OldValue._SetLogicalParent(null, error);
                            if (error.IsErrored())
                                return;
                        }
                    }
                    if (args.NewValue && args.NewValue instanceof Fayde.UIElement) {
                        this._SubtreeObject = args.NewValue;
                        this._ElementAdded(args.NewValue);
                        if (args.NewValue instanceof Fayde.FrameworkElement) {
                            var logicalParent = args.NewValue._GetLogicalParent();
                            if (logicalParent && !Nullstone.RefEquals(logicalParent, this)) {
                                error.SetErrored(BError.Argument, "Content is already a child of another element.");
                                return;
                            }
                            args.NewValue._SetLogicalParent(this, error);
                            if (error.IsErrored())
                                return;
                        }
                    }
                    break;
                case Border.BackgroundProperty._ID:
                case Border.BorderThicknessProperty._ID:
                case Border.BorderBrushProperty._ID:
                case Border.CornerRadiusProperty._ID:
                case Border.PaddingProperty._ID:
                    ivprop = true;
                    break;
            }

            if (ivprop)
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            this.PropertyChanged.Raise(this, args);
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        Border.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Border) {
                this._OnPropertyChanged$FrameworkElement(args, error)
                return;
            }

            
            switch (args.Property._ID) {
                case Border.ChildProperty._ID:
                    if (args.OldValue && args.OldValue instanceof Fayde.UIElement) {
                        this._ElementRemoved(args.OldValue);
                        this._SubtreeObject = null;
                        if (args.OldValue instanceof Fayde.FrameworkElement) {
                            args.OldValue._SetLogicalParent(null, error);
                            if (error.IsErrored())
                                return;
                        }
                    }
                    if (args.NewValue && args.NewValue instanceof Fayde.UIElement) {
                        this._SubtreeObject = args.NewValue;
                        this._ElementAdded(args.NewValue);
                        if (args.NewValue instanceof Fayde.FrameworkElement) {
                            var logicalParent = args.NewValue._GetLogicalParent();
                            if (logicalParent && !Nullstone.RefEquals(logicalParent, this)) {
                                error.SetErrored(BError.Argument, "Content is already a child of another element.");
                                return;
                            }
                            args.NewValue._SetLogicalParent(this, error);
                            if (error.IsErrored())
                                return;
                        }
                    }
                    this._UpdateBounds();
                    this._InvalidateMeasure();
                    break;
                case Border.PaddingProperty._ID:
                case Border.BorderThicknessProperty._ID:
                    this._InvalidateMeasure();
                    break;
                case Border.BackgroundProperty._ID:
                case Border.BorderBrushProperty._ID:
                    this._Invalidate();
                    break;
            }

            this.PropertyChanged.Raise(this, args);
        };
        Border.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd && (propd._ID === Border.BackgroundProperty._ID || propd._ID === Border.BorderBrushProperty._ID)) {
                this._Invalidate();
            } else {
                this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
            }
        };
    }
    //#endif

    //#endregion

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Border.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== Border) {
                this.ApplyHtmlChange$FrameworkElement(change);
                return;
            }

            var rootEl = this.GetRootHtmlElement();
            var contentEl = rootEl.firstChild;
            if (propd._ID === Border.BackgroundProperty._ID) {
                var brush = change.NewValue;
                if (!brush)
                    brush = this.Background;
                brush.SetupBrush(null, null);
                contentEl.style.background = brush.ToHtml5Object();
            }

            if (propd._ID === Border.BorderBrushProperty._ID) {
                var brush = change.NewValue;
                if (!brush)
                    brush = this.BorderBrush;
                brush.SetupBrush(null, null);
                contentEl.style.borderStyle = "solid";
                contentEl.style.borderColor = brush.ToHtml5Object();
            }

            if (propd._ID === Border.BorderThicknessProperty._ID
                || propd._ID === Border.CornerRadiusProperty._ID) {
                var thickness = this.BorderThickness;
                var radius = this.CornerRadius;

                contentEl.style.borderWidth = thickness.Top + "px " + thickness.Right + "px " + thickness.Bottom + "px " + thickness.Left + "px";

                var halfThickness = new Thickness(thickness.Left * 0.5, thickness.Top * 0.5, thickness.Right * 0.5, thickness.Bottom * 0.5);
                var htmlRadius = new CornerRadius(
                    radius.TopLeft + (halfThickness.Top + halfThickness.Left) / 2,
                    radius.TopRight + (halfThickness.Top + halfThickness.Right) / 2,
                    radius.BottomRight + (halfThickness.Bottom + halfThickness.Right) / 2,
                    radius.BottomLeft + (halfThickness.Bottom + halfThickness.Left) / 2);

                contentEl.style.borderRadius = htmlRadius.TopLeft + "px " + htmlRadius.TopRight + "px " + htmlRadius.BottomRight + "px " + htmlRadius.BottomLeft + "px";
            }
        };
    }
    //#endif

    Border._ThicknessValidator = function () {
    };

    namespace.Border = Nullstone.FinishCreate(Border);
})(Nullstone.Namespace("Fayde.Controls"));