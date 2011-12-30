/// <reference path="Debug.js"/>

Color.prototype = new Object;
Color.prototype.constructor = Color;
function Color(r, g, b, a) {
    this.R = r == null ? 255 : r;
    this.G = g == null ? 255 : g;
    this.B = b == null ? 255 : b;
    this.A = a == null ? 1.0 : a;
}
Color.prototype.toString = function () {
    return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
};


Brush.prototype = new Object;
Brush.prototype.constructor = Brush;
function Brush() {
};
Brush.prototype._Translate = function () {
    AbstractMethod("Brush._Translate()");
};


SolidColorBrush.prototype = Brush.prototype;
SolidColorBrush.prototype.constructor = SolidColorBrush;
function SolidColorBrush(color) {
    Brush.call(this);
    this._Color = color;
}
SolidColorBrush.prototype._Translate = function () {
    return this._Color.toString();
};