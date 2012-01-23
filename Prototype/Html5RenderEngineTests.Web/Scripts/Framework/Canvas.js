/// <reference path="Panel.js" />
/// CODE
/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />

//#region Canvas

Canvas.prototype = new Panel;
Canvas.prototype.constructor = Canvas;
function Canvas() {
    Panel.call(this);
}
Canvas.GetBaseClass = function () { return Panel; };

//#region DEPENDENCY PROPERTIES

Canvas.LeftProperty = DependencyProperty.RegisterAttached("Left", Canvas, 0.0);
Canvas.GetLeft = function (d) {
    return d.GetValue(Canvas.LeftProperty);
};
Canvas.SetLeft = function (d, value) {
    d.SetValue(Canvas.LeftProperty, value);
};

Canvas.TopProperty = DependencyProperty.RegisterAttached("Top", Canvas, 0.0);
Canvas.GetTop = function (d) {
    return d.GetValue(Canvas.TopProperty);
};
Canvas.SetTop = function (d, value) {
    d.SetValue(Canvas.TopProperty, value);
};

Canvas.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", Canvas, 0);
Canvas.GetZIndex = function (d) {
    return d.GetValue(Canvas.ZIndexProperty);
};
Canvas.SetZIndex = function (d, value) {
    d.SetValue(Canvas.ZIndexProperty, value);
};

Canvas.ZProperty = DependencyProperty.RegisterAttached("Z", Canvas, NaN);
Canvas.GetZ = function (d) {
    return d.GetValue(Canvas.ZProperty);
};
Canvas.SetZ = function (d, value) {
    d.SetValue(Canvas.ZProperty, value);
};

//#endregion

//#endregion