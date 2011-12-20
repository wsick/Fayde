/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="FrameworkElement.js" />
/// <reference path="Surface.js"/>

Border.prototype = new FrameworkElement();
Border.prototype.constructor = Border;
function Border() {
    FrameworkElement.call(this);
}

//////////////////////////////////////////
// DEPENDENCY PROPERTIES
//////////////////////////////////////////
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

//////////////////////////////////////////
// INSTANCE METHODS
//////////////////////////////////////////
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
Border.prototype._Render = function (ctx) {
    var background = this.GetBackground();
    var borderBrush = this.GetBorderBrush();
    var radius = this.GetCornerRadius();
    var thickness = this.GetBorderThickness();
    var paintBorder = this._Extents;
    var paintBackground = paintBorder.GrowByThickness(thickness.Negate());

    if (!background && !borderBrush)
        return;

    if (paintBorder.IsEmpty())
        return;

    if (borderBrush || radius != new CornerRadius()) {
        this._RenderImpl(ctx.GetSurface());
        return;
    }
};
Border.prototype._RenderImpl = function (surface, pathOnly) {
    //cairo_save(surface); //WTF: ?
    if (!path_only)
        this._RenderLayoutClip(surface);
    surface.DrawRectangle(this.GetBackground(), this.GetBorderBrush(), this._Extents, this.GetBorderThickness(), this.GetCornerRadius(), pathOnly);
};

Border._ThicknessValidator = function () {
};