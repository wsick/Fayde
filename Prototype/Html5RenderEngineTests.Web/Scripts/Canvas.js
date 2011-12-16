/// <reference path="/Scripts/Framework/Primitives.js" />
/// <reference path="/Scripts/Framework/DependencyObject.js" />
/// <reference path="/Scripts/Framework/Panel.js" />

Canvas.TopProperty = DependencyProperty.RegisterAttached("Top", Canvas);
Canvas.LeftProperty = DependencyProperty.RegisterAttached("Left", Canvas);

Canvas.prototype = new Panel();
Canvas.prototype.constructor = Canvas;
function Canvas() {
    this._IsCanvas = true;
}

// STATICS
Canvas.GetTop = function (d) {
    return d.GetValue(Canvas.TopProperty);
};
Canvas.GetLeft = function (d) {
    return d.GetValue(Canvas.LeftProperty);
};