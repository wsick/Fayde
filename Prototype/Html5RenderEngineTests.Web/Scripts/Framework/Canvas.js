/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="Panel.js" />

Canvas.LeftProperty = DependencyProperty.RegisterAttached("Left", Canvas, 0.0);
Canvas.TopProperty = DependencyProperty.RegisterAttached("Top", Canvas, 0.0);
Canvas.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", Canvas, 0);
Canvas.ZProperty = DependencyProperty.RegisterAttached("Z", Canvas, NaN);

Canvas.prototype = new Panel();
Canvas.prototype.constructor = Canvas;
function Canvas() {
    this._IsCanvas = true;
}

// STATICS
Canvas.GetLeft = function (d) {
    return d.GetValue(Canvas.LeftProperty);
};
Canvas.SetLeft = function (d, value) {
    d.SetValue(Canvas.LeftProperty, value);
};

Canvas.GetTop = function (d) {
    return d.GetValue(Canvas.TopProperty);
};
Canvas.SetTop = function (d, value) {
    d.SetValue(Canvas.TopProperty, value);
};

Canvas.GetZIndex = function (d) {
    return d.GetValue(Canvas.ZIndexProperty);
};
Canvas.SetZIndex = function (d, value) {
    d.SetValue(Canvas.ZIndexProperty, value);
};

Canvas.GetZ = function (d) {
    return d.GetValue(Canvas.ZProperty);
};
Canvas.SetZ = function (d, value) {
    d.SetValue(Canvas.ZProperty, value);
};