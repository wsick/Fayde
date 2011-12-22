/// <reference path="Debug.js"/>

Color.prototype = new Object;
Color.prototype.constructor = Color;
Color.prototype.R = 255;
Color.prototype.G = 255;
Color.prototype.B = 255;
Color.prototype.A = 1.0;
function Color(r, g, b, a) {
    if (r)
        this.R = r;
    if (g)
        this.G = g;
    if (b)
        this.B = b;
    if (a)
        this.A = a;
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