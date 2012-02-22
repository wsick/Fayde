/// <reference path="../Runtime/RefObject.js" />
/// CODE

//#region Color

function Color(r, g, b, a) {
    RefObject.call(this);
    this.R = r == null ? 255 : r;
    this.G = g == null ? 255 : g;
    this.B = b == null ? 255 : b;
    this.A = a == null ? 1.0 : a;
}
Color.InheritFrom(RefObject);

Color.__NoAlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;
Color.__AlphaRegex = /#([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}([0-9a-fA-F][0-9a-fA-F]){1}/;

Color.FromHex = function (hex) {
    var match;
    var r;
    var g;
    var b;
    var a;
    if ((match = Color.__AlphaRegex.exec(hex)) != null) {
        a = parseInt(match[1], 16) / 255.0;
        r = parseInt(match[2], 16);
        g = parseInt(match[3], 16);
        b = parseInt(match[4], 16);
    } else if ((match = Color.__NoAlphaRegex.exec(hex)) != null) {
        a = 1.0;
        r = parseInt(match[1], 16);
        g = parseInt(match[2], 16);
        b = parseInt(match[3], 16);
    }
    return new Color(r, g, b, a);
};

Color.prototype.Add = function (color2) {
    return new Color(this.R + color2.R, this.G + color2.G, this.B + color2.B, this.A + color2.A);
};
Color.prototype.Subtract = function (color2) {
    return new Color(this.R - color2.R, this.G - color2.G, this.B - color2.B, this.A - color2.A);
};
Color.prototype.Multiply = function (factor) {
    return new Color(this.R * factor, this.G * factor, this.B * factor, this.A * factor);
};

Color.prototype._Translate = function () {
    return this.toString();
};

Color.prototype.toString = function () {
    return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
};

//#endregion