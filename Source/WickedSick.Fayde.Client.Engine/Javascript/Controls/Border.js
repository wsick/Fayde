/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="../Core/DependencyObject.js" />
/// <reference path="../Primitives/CornerRadius.js"/>
/// <reference path="../Primitives/Thickness.js"/>
/// <reference path="../Primitives/Brush.js"/>

//#region Border
var Border = Nullstone.Create("Border", FrameworkElement);

//#region DEPENDENCY PROPERTIES

Border.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Border);
Border.Instance.GetBackground = function () {
    return this.GetValue(Border.BackgroundProperty);
};
Border.Instance.SetBackground = function (value) {
    this.SetValue(Border.BackgroundProperty, value);
};

Border.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () { return Brush; }, Border);
Border.Instance.GetBorderBrush = function () {
    return this.GetValue(Border.BorderBrushProperty);
};
Border.Instance.SetBorderBrush = function (value) {
    this.SetValue(Border.BorderBrushProperty, value);
};

Border.BorderThicknessProperty = DependencyProperty.RegisterFull("BorderThickness", function () { return Thickness; }, Border, new Thickness(0), null, null, null, Border._ThicknessValidator);
Border.Instance.GetBorderThickness = function () {
    return this.GetValue(Border.BorderThicknessProperty);
};
Border.Instance.SetBorderThickness = function (value) {
    this.SetValue(Border.BorderThicknessProperty, value);
};

Border.ChildProperty = DependencyProperty.Register("Child", function () { return UIElement; }, Border);
Border.Instance.GetChild = function () {
    return this.GetValue(Border.ChildProperty);
};
Border.Instance.SetChild = function (value) {
    this.SetValue(Border.ChildProperty, value);
};

Border.CornerRadiusProperty = DependencyProperty.RegisterFull("CornerRadius", function () { return CornerRadius; }, Border, new CornerRadius(0), null, null, null, Border._CornerRadiusValidator);
Border.Instance.GetCornerRadius = function () {
    return this.GetValue(Border.CornerRadiusProperty);
};
Border.Instance.SetCornerRadius = function (value) {
    this.SetValue(Border.CornerRadiusProperty, value);
};

Border.PaddingProperty = DependencyProperty.RegisterFull("Padding", function () { return Thickness; }, Border, new Thickness(0), null, null, null, Border._ThicknessValidator);
Border.Instance.GetPadding = function () {
    return this.GetValue(Border.PaddingProperty);
};
Border.Instance.SetPadding = function (value) {
    this.SetValue(Border.PaddingProperty, value);
};

//#endregion

//#region INSTANCE METHODS

Border.Instance.IsLayoutContainer = function () { return true; };
Border.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var desired = new Size(0, 0);
    var border = this.GetPadding().Plus(this.GetBorderThickness());

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
    var border = this.GetPadding().Plus(this.GetBorderThickness());
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
    var borderBrush = this.GetBorderBrush();
    var paintBorder = this._Extents;

    if (!this.GetBackground() && !borderBrush)
        return;
    if (paintBorder.IsEmpty())
        return;

    //BorderBrush or CornerRadius?
    if (borderBrush || !this.GetCornerRadius().IsZero()) {
        ctx.Save();
        this._RenderImpl(ctx, region);
        ctx.Restore();
        return;
    }

    //If we got this far, all we have left to paint is the background
    if (!this._HasLayoutClip() && false /* TODO: IsIntegerTranslation  */) {
        //TODO:
        //var paintBackground = paintBorder.GrowByThickness(this.GetBorderThickness().Negate());

    } else {
        ctx.Save();
        this._RenderImpl(ctx, region);
        ctx.Restore();
    }
};
Border.Instance._RenderImpl = function (ctx, region) {
    ctx.Save();
    this._RenderLayoutClip(ctx);
    ctx.CustomRender(Border._Painter, this.GetBackground(), this.GetBorderBrush(), this._Extents, this.GetBorderThickness(), this.GetCornerRadius());
    ctx.Restore();
};

Border.Instance._CanFindElement = function () {
    return this.GetBackground() != null || this.GetBorderBrush() != null;
};

Border.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Border) {
        this._OnPropertyChanged$super(args, error)
        return;
    }
    if (args.Property == Border.ChildProperty) {
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
                if (logicalParent && logicalParent !== this) {
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
    } else if (args.Property == Border.PaddingProperty || args.Property == Border.BorderThicknessProperty) {
        this._InvalidateMeasure();
    } else if (args.Property == Border.BackgroundProperty) {
        this._Invalidate();
    } else if (args.Property == Border.BorderBrushProperty) {
        this._Invalidate();
    }

    this.PropertyChanged.Raise(this, args);
};

//#endregion

//#region ANNOTATIONS

Border.Annotations = {
    ContentProperty: Border.ChildProperty
};

//#endregion

Border._Painter = function (canvasCtx, backgroundBrush, borderBrush, boundingRect, thickness, cornerRadius, pathOnly) {
    var pathRect = boundingRect.GrowByThickness(thickness.Half().Negate());

    canvasCtx.beginPath();
    if (cornerRadius.IsZero()) {
        canvasCtx.rect(pathRect.X, pathRect.Y, pathRect.Width, pathRect.Height);
    } else {
        var left = pathRect.X;
        var top = pathRect.Y;
        var right = pathRect.X + pathRect.Width;
        var bottom = pathRect.Y + pathRect.Height;

        canvasCtx.moveTo(left + cornerRadius.TopLeft, top);
        //top edge
        canvasCtx.lineTo(right - cornerRadius.TopRight, top);
        //top right arc
        if (cornerRadius.TopRight > 0)
            canvasCtx.quadraticCurveTo(right, top, right, top + cornerRadius.TopRight);
        //right edge
        canvasCtx.lineTo(right, bottom - cornerRadius.BottomRight);
        //bottom right arc
        if (cornerRadius.BottomRight > 0)
            canvasCtx.quadraticCurveTo(right, bottom, right - cornerRadius.BottomRight, bottom);
        //bottom edge
        canvasCtx.lineTo(left + cornerRadius.BottomLeft, bottom);
        //bottom left arc
        if (cornerRadius.BottomLeft > 0)
            canvasCtx.quadraticCurveTo(left, bottom, left, bottom - cornerRadius.BottomLeft);
        //left edge
        canvasCtx.lineTo(left, top + cornerRadius.TopLeft);
        //top left arc
        if (cornerRadius.TopLeft > 0)
            canvasCtx.quadraticCurveTo(left, top, left + cornerRadius.TopLeft, top);
    }
    if (backgroundBrush) {
        canvasCtx.fillStyle = backgroundBrush._Translate(canvasCtx, pathRect);
        canvasCtx.fill();
    }
    if (borderBrush && !thickness.IsEmpty()) {
        canvasCtx.lineWidth = thickness;
        canvasCtx.strokeStyle = borderBrush._Translate(canvasCtx, pathRect);
        canvasCtx.stroke();
    }
    canvasCtx.closePath();
};
Border._ThicknessValidator = function () {
};

Nullstone.FinishCreate(Border);
//#endregion