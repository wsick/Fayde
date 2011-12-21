Color.prototype = new Object();
Color.prototype.constructor = Color;
Color.prototype.R = 255;
Color.prototype.G = 255;
Color.prototype.B = 255;
Color.prototype.A = 1.0;
function Color(r, g, b, a) {
    this.R = r;
    this.G = g;
    this.B = b;
    this.A = a;
}
Color.prototype.toString = function () {
    return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
};


Brush.prototype = new Object();
Brush.prototype.constructor = Brush;
function Brush() {
};
Brush.prototype._Translate = function () {
    NotImplemented();
};