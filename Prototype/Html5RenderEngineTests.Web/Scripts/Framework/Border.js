/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="FrameworkElement.js" />

Border.prototype = new FrameworkElement();
Border.prototype.constructor = Border;
function Border() {
    FrameworkElement.call(this);
}

Border.BackgroundProperty = DependencyProperty.Register("Background", Border);
Border.prototype.GetBackground = function () {
    return this.GetValue(Border.BackgroundProperty);
};
Border.prototype.SetBackground = function (value) {
    this.SetValue(Border.BackgroundProperty, value);
};

Border.BorderBrushProperty = DependencyProperty.Register("BorderBrush", Border);
Border.prototype.GetBorderBrush = function () {
    return this.GetValue(Border.BorderBrushProperty);
};
Border.prototype.SetBorderBrush = function (value) {
    this.SetValue(Border.BorderBrushProperty, value);
};

Border.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", Border, new Thickness(0), null, null, null, Border._ThicknessValidator);
Border.prototype.GetBorderThickness = function () {
    return this.GetValue(Border.BorderThicknessProperty);
};
Border.prototype.SetBorderThickness = function (value) {
    this.SetValue(Border.BorderThicknessProperty, value);
};

Border.ChildProperty = DependencyProperty.Register("Child", Border);
Border.prototype.GetChild = function () {
    return this.GetValue(Border.ChildProperty);
};
Border.prototype.SetChild = function (value) {
    this.SetValue(Border.ChildProperty, value);
};

Border.CornerRadiusProperty = DependencyProperty.Register("CornerRadius", Border, new CornerRadius(0), null, null, null, Border._CornerRadiusValidator);
Border.prototype.GetCornerRadius = function () {
    return this.GetValue(Border.CornerRadiusProperty);
};
Border.prototype.SetCornerRadius = function (value) {
    this.SetValue(Border.CornerRadiusProperty, value);
};

Border.PaddingProperty = DependencyProperty.Register("Padding", Border, new Thickness(0), null, null, null, Border._ThicknessValidator);
Border.prototype.GetPadding = function () {
    return this.GetValue(Border.PaddingProperty);
};
Border.prototype.SetPadding = function (value) {
    this.SetValue(Border.PaddingProperty, value);
};

Border.prototype.IsLayoutContainer = function () { return true; };
Border.prototype._MeasureOverrideWithEror = function (availableSize, error) {
    var desired = new Size(0, 0);
    var border = this.GetPadding().Plus(this.GetBorderThickness());

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        child._MeasureWithError(availableSize.GrowByThickness(border.Negate()), error);
        desired = child.GetDesiredSize();
    }
    desired = desired.GrowByThickness(border);
    desired = desired.Min(availableSize);
    return desired;
};
Border.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var border = this.GetPadding().Plus(this.GetBorderThickness());
    var arranged = finalSize;

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize, Height);
        childRect = childRect.GrowBy(border.Negate());
        child._ArrangeWithError(childRect, error);
        arranged = new Size(childRect.Width, childRect.Height).GrowBy(border);
        arranged = arranged.Max(finalSize);
    }
    return finalSize;
};


/*
Border.prototype.ComputeActuals = function () {
    var actual = new Rect();
    //NOT IMPLEMENTED
    actual.X1 = this.Left;
    actual.X2 = this.Left + this.Width;
    actual.Y1 = this.Top;
    actual.Y2 = this.Top + this.Height;
    return actual;
};
Border.prototype.Render = function (ctx) {
    var actualRect = this.ComputeActuals();
    ctx.beginPath();
    ctx.moveTo(actualRect.X1 + this.CornerRadius.TopLeft, actualRect.Y1);
    //top edge
    ctx.lineTo(actualRect.X2 - this.CornerRadius.TopRight, actualRect.Y1);
    //top right arc
    if (this.CornerRadius.TopRight && this.CornerRadius.TopRight > 0)
        ctx.arcTo(actualRect.X2, actualRect.Y1, actualRect.X2, actualRect.Y1 + this.CornerRadius.TopRight, this.CornerRadius.TopRight);
    //right edge
    ctx.lineTo(actualRect.X2, actualRect.Y2 - this.CornerRadius.BottomRight);
    //bottom right arc
    if (this.CornerRadius.BottomRight && this.CornerRadius.BottomRight > 0)
        ctx.arcTo(actualRect.X2, actualRect.Y2, actualRect.X2 - this.CornerRadius.BottomRight, actualRect.Y2, this.CornerRadius.BottomRight);
    //bottom edge
    ctx.lineTo(actualRect.X1 + this.CornerRadius.BottomLeft, actualRect.Y2);
    //bottom left arc
    if (this.CornerRadius.BottomLeft && this.CornerRadius.BottomLeft > 0)
        ctx.arcTo(actualRect.X1, actualRect.Y2, actualRect.X1, actualRect.Y2 - this.CornerRadius.BottomLeft, this.CornerRadius.BottomLeft);
    //left edge
    ctx.lineTo(actualRect.X1, actualRect.Y1 + this.CornerRadius.TopLeft);
    //top left arc
    if (this.CornerRadius.TopLeft && this.CornerRadius.TopLeft > 0)
        ctx.arcTo(actualRect.X1, actualRect.Y1, actualRect.X1 + this.CornerRadius.TopLeft, actualRect.Y1, this.CornerRadius.TopLeft);
    if (this.BorderThickness) {
        ctx.lineWidth = this.BorderThickness;
        ctx.stroke();
    }
    if (this.Background) {
        ctx.fillStyle = this.Background;
        ctx.fill();
    }
    ctx.closePath();

    if (this.Child) {
        this.Child.Render(ctx);
    }
};
*/

Border._ThicknessValidator = function () {
};