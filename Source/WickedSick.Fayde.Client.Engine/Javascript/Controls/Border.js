/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="../Core/DependencyObject.js" />
/// <reference path="../Primitives/CornerRadius.js"/>
/// <reference path="../Primitives/Thickness.js"/>
/// <reference path="../Primitives/Brush.js"/>
/// <reference path="../Engine/RenderContext.js"/>

//#region Border
var Border = Nullstone.Create("Border", FrameworkElement);

//#region Dependency Properties

Border.BackgroundProperty = DependencyProperty.RegisterCore("Background", function () { return Brush; }, Border);
Border.BorderBrushProperty = DependencyProperty.RegisterCore("BorderBrush", function () { return Brush; }, Border);
Border.BorderThicknessProperty = DependencyProperty.RegisterFull("BorderThickness", function () { return Thickness; }, Border, new Thickness(0), undefined, undefined, undefined, Border._ThicknessValidator);
Border.ChildProperty = DependencyProperty.RegisterCore("Child", function () { return UIElement; }, Border);
Border.CornerRadiusProperty = DependencyProperty.RegisterFull("CornerRadius", function () { return CornerRadius; }, Border, new CornerRadius(0), undefined, undefined, undefined, Border._CornerRadiusValidator);
Border.PaddingProperty = DependencyProperty.RegisterFull("Padding", function () { return Thickness; }, Border, new Thickness(0), undefined, undefined, undefined, Border._ThicknessValidator);

Nullstone.AutoProperties(Border, [
    Border.BackgroundProperty,
    Border.BorderBrushProperty,
    Border.BorderThicknessProperty,
    Border.ChildProperty,
    Border.CornerRadiusProperty,
    Border.PaddingProperty
]);

//#endregion

//#region Instance Methods

Border.Instance.IsLayoutContainer = function () { return true; };
Border.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var desired = new Size();
    var border = this.Padding.Plus(this.BorderThickness);

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        child._MeasureWithError(availableSize.GrowByThickness(border.Negate()), error);
        desired = child._DesiredSize;
    }
    desired = desired.GrowByThickness(border);
    desired = desired.Min(availableSize);
    return desired;
};
Border.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    var border = this.Padding.Plus(this.BorderThickness);
    var arranged = finalSize;

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
        childRect = childRect.GrowByThickness(border.Negate());
        child._ArrangeWithError(childRect, error);
        arranged = new Size(childRect.Width, childRect.Height).GrowBy(border);
        arranged = arranged.Max(finalSize);
    }
    return finalSize;
};
Border.Instance._Render = function (ctx, region) {
    /// <param name="ctx" type="_RenderContext"></param>
    var borderBrush = this.BorderBrush;
    var paintBorder = this._Extents;
    var background = this.Background;

    if (!background && !borderBrush)
        return;
    if (paintBorder.IsEmpty())
        return;
    this._RenderImpl(ctx, region);
};
Border.Instance._RenderImpl = function (ctx, region) {
    /// <param name="ctx" type="_RenderContext"></param>
    ctx.Save();
    this._RenderLayoutClip(ctx);
    {
        var canvasCtx = ctx.GetCanvasContext();
        var backgroundBrush = this.Background;
        var borderBrush = this.BorderBrush;
        var boundingRect = this._Extents;
        var thickness = this.BorderThickness;
        var cornerRadius = this.CornerRadius;

        var pathRect = boundingRect.GrowByThickness(thickness.Half().Negate());
        var rawPath = new RawPath();
        if (cornerRadius.IsZero()) {
            rawPath.Rect(pathRect.X, pathRect.Y, pathRect.Width, pathRect.Height);
        } else {
            rawPath.RoundedRectFull(pathRect.X, pathRect.Y, pathRect.Width, pathRect.Height,
                cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
        }
        rawPath.Draw(ctx);

        if (backgroundBrush)
            ctx.Fill(backgroundBrush, pathRect);
        if (borderBrush && !thickness.IsEmpty())
            ctx.Stroke(borderBrush, thickness, pathRect);
        canvasCtx.closePath();
    }
    ctx.Restore();
};

Border.Instance._CanFindElement = function () {
    return this.Background != null || this.BorderBrush != null;
};

Border.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Border) {
        this._OnPropertyChanged$FrameworkElement(args, error)
        return;
    }
    if (args.Property._ID === Border.ChildProperty._ID) {
        if (args.OldValue && args.OldValue instanceof UIElement) {
            this._ElementRemoved(args.OldValue);
            this._SetSubtreeObject(null);
            if (args.OldValue instanceof FrameworkElement) {
                args.OldValue._SetLogicalParent(null, error);
                if (error.IsErrored())
                    return;
            }
        }
        if (args.NewValue && args.NewValue instanceof UIElement) {
            this._SetSubtreeObject(args.NewValue);
            this._ElementAdded(args.NewValue);
            if (args.NewValue instanceof FrameworkElement) {
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
    } else if (args.Property._ID === Border.PaddingProperty._ID || args.Property._ID === Border.BorderThicknessProperty._ID) {
        this._InvalidateMeasure();
    } else if (args.Property._ID === Border.BackgroundProperty._ID) {
        this._Invalidate();
    } else if (args.Property._ID === Border.BorderBrushProperty._ID) {
        this._Invalidate();
    }

    this.PropertyChanged.Raise(this, args);
};
Border.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd && (propd._ID === Border.BackgroundProperty._ID || propd._ID === Border.BorderBrushProperty._ID))
        this._Invalidate();
    else
        this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
};

//#endregion

//#region Annotations

Border.Annotations = {
    ContentProperty: Border.ChildProperty
};

//#endregion

Border._ThicknessValidator = function () {
};

Nullstone.FinishCreate(Border);
//#endregion