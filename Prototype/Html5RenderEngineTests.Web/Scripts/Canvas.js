/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="Panel.js" />

function Canvas() {
    this._IsCanvas = true;
}
Canvas.prototype = new Panel();

Canvas.TopProperty = DependencyProperty.RegisterAttached("Top", Canvas);
Canvas.LeftProperty = DependencyProperty.RegisterAttached("Left", Canvas);
Canvas.GetTop = function (d) {
    return d.GetValue(Canvas.TopProperty);
};
Canvas.GetLeft = function (d) {
    return d.GetValue(Canvas.LeftProperty);
};