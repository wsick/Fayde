/// <reference path="RefObject.js"/>

var Visibility = {
    Visible: 0,
    Collapsed: 1
};

var HorizontalAlignment = {
    Left: 0,
    Center: 1,
    Right: 2,
    Stretch: 3
};

var VerticalAlignment = {
    Top: 0,
    Center: 1,
    Bottom: 2,
    Stretch: 3
};

var Orientation = {
    Vertical: "Vertical",
    Horizontal: "Horizontal"
};

var TextAlignment = {
    Left: 0,
    Center: 1,
    Right: 2
};

var TextTrimming = {
    None: 0
};

var TextWrapping = {
    NoWrap: 0,
    Wrap: 1,
    WrapWithOverflow: 2
};

var TextDecorations = {
    None: 0,
    Underline: 1
};

var FlowDirection = {
    LeftToRight: 0,
    RightToLeft: 1
};

var LineStackingStrategy = {
    MaxHeight: 0,
    BlockLineHeight: 1
};

var FontWeights = {
    Normal: "normal",
    Bold: "bold",
    Bolder: "bolder",
    Lighter: "lighter"
};

var FontStyles = {
    Normal: "normal",
    Italic: "italic",
    Oblique: "oblique"
};

var FontStretches = {
    UltraCondensed: "ultra-condensed",
    ExtraCondensed: "extra-condensed",
    Condensed: "condensed",
    SemiCondensed: "semi-condensed",
    Normal: "normal",
    SemiExpanded: "semi-expanded",
    Expanded: "expanded",
    ExtraExpanded: "extra-expanded",
    UltraExpanded: "ultra-expanded"
};

var ScrollBarVisibility = {
    Auto: 0,
    Disabled: 1,
    Hidden: 2,
    Visible: 3
};

function IsOpacityInvisible(opacity) {
    return opacity <= 0.0;
}

//#region RefParam

RefParam.prototype = new RefObject;
RefParam.prototype.constructor = RefParam;
function RefParam(v) {
    RefObject.call(this);
    this.Value = v;
}
RefParam.GetBaseClass = function () { return RefObject; };

//#endregion

//#region CornerRadius

CornerRadius.prototype = new RefObject;
CornerRadius.prototype.constructor = CornerRadius;
function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
    RefObject.call(this);
    this.TopLeft = topLeft == null ? 0 : topLeft;
    this.TopRight = topRight == null ? 0 : topRight;
    this.BottomRight = bottomRight == null ? 0 : bottomRight;
    this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
}
CornerRadius.GetBaseClass = function () { return RefObject; };

CornerRadius.prototype.IsZero = function () {
    return this.TopLeft == 0
        && this.TopRight == 0
        && this.BottomRight == 0
        && this.BottomLeft == 0;
};

//#endregion

//#region Thickness

Thickness.prototype = new RefObject;
Thickness.prototype.constructor = Thickness;
function Thickness(left, top, right, bottom) {
    RefObject.call(this);
    this.Left = left == null ? 0 : left;
    this.Top = top == null ? 0 : top;
    this.Right = right == null ? 0 : right;
    this.Bottom = bottom == null ? 0 : bottom;
}
Thickness.GetBaseClass = function () { return RefObject; };

Thickness.prototype.Plus = function (thickness2) {
    var t = new Thickness();
    t.Left = this.Left + thickness2.Left;
    t.Right = this.Right + thickness2.Right;
    t.Top = this.Top + thickness2.Top;
    t.Bottom = this.Bottom + thickness2.Bottom;
    return t;
};
Thickness.prototype.Half = function () {
    var t = new Thickness();
    t.Left = this.Left / 2;
    t.Top = this.Top / 2;
    t.Right = this.Right / 2;
    t.Bottom = this.Bottom / 2;
    return t;
};
Thickness.prototype.Negate = function () {
    var t = new Thickness();
    t.Left = -this.Left;
    t.Right = -this.Right;
    t.Top = -this.Top;
    t.Bottom = -this.Bottom;
    return t;
};
Thickness.prototype.IsEmpty = function () {
    return this.Left == 0 && this.Top == 0 && this.Right == 0 && this.Bottom == 0;
};

//#endregion

//#region Point

Point.prototype = new RefObject;
Point.prototype.constructor = Point;
function Point(x, y) {
    RefObject.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
}
Point.GetBaseClass = function () { return RefObject; };

Point.prototype.Apply = function (matrix) {
    return matrix.Multiply(this);
};

//#endregion

//#region Size

Size.prototype = new RefObject;
Size.prototype.constructor = Size;
function Size(width, height) {
    RefObject.call(this);
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}
Size.GetBaseClass = function () { return RefObject; };

Size.prototype.GrowBy = function (width, height) {
    var h = this.Height;
    var w = this.Width;
    if (h != Number.POSITIVE_INFINITY)
        h += height;
    if (w != Number.POSITIVE_INFINITY)
        w += width;
    return new Size(w > 0 ? w : 0, h > 0 ? h : 0);
};
Size.prototype.GrowByThickness = function (thickness) {
    return this.GrowBy(thickness.Left + thickness.Right, thickness.Top + thickness.Bottom);
};
Size.prototype.Min = function (size2) {
    return new Size(Math.min(this.Width, size2.Width), Math.min(this.Height, size2.Height));
};
Size.prototype.Max = function (size2) {
    return new Size(Math.max(this.Width, size2.Width), Math.max(this.Height, size2.Height));
};
Size.prototype.Equals = function (size2) {
    return this.Width == size2.Width && this.Height == size2.Height;
};
Size.prototype.toString = function () {
    return "[Width = " + this.Width + "; Height = " + this.Height + "]";
};

//#endregion

//#region Rect

Rect.prototype = new RefObject;
Rect.prototype.constructor = Rect;
function Rect(x, y, width, height) {
    RefObject.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}
Rect.GetBaseClass = function () { return RefObject; };

Rect.prototype.IsEmpty = function () {
    return this.Width <= 0.0 || this.Height <= 0.0;
};
Rect.prototype.GrowBy = function (left, top, right, bottom) {
    var result = new Rect(this.X - left, this.Y - top, this.Width + left + right, this.Height + top + bottom);
    if (result.Width < 0)
        result.Width = 0;
    if (result.Height < 0)
        result.Height = 0;
    return result;
};
Rect.prototype.GrowByThickness = function (thickness) {
    return this.GrowBy(thickness.Left, thickness.Top, thickness.Right, thickness.Bottom);
};
Rect.prototype.Union = function (rect2) {
    if (this.IsEmpty())
        return new Rect(rect2.X, rect2.Y, rect2.Width, rect2.Height);
    if (rect2.Width <= 0 || rect2.Height <= 0)
        return new Rect(this.X, this.Y, this.Width, this.Height);

    var result = new Rect(0, 0, 0, 0);
    result.X = Math.min(this.X, rect2.X);
    result.Y = Math.min(this.Y, rect2.Y);
    result.Width = Math.max(this.X + this.Width, rect2.X + rect2.Width) - result.X;
    result.Height = Math.max(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y;
    return result;
};
Rect.prototype.Intersection = function (rect2) {
    var result = new Rect(0, 0, 0, 0);
    result.X = Math.max(this.X, rect2.X);
    result.Y = Math.max(this.Y, rect2.Y);
    result.Width = Math.max(0, Math.min(this.X + this.Width, rect2.X + rect2.Width) - result.X);
    result.Height = Math.max(0, Math.min(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y);
    return result;
};
Rect.prototype.RoundOut = function () {
    return new Rect(Math.floor(this.X), Math.floor(this.Y), Math.ceil(this.X + this.Width) - Math.floor(this.X), Math.ceil(this.Y + this.Height) - Math.floor(this.Y));
}
Rect.prototype.RoundIn = function () {
    return new Rect(Math.ceil(this.X), Math.ceil(this.Y), Math.floor(this.X + this.Width) - Math.ceil(this.X), Math.floor(this.Y + this.Height) - Math.ceil(this.Y));
}
Rect.Equals = function (rect1, rect2) {
    if (rect1 == null && rect2 == null)
        return true;
    if (rect1 == null || rect2 == null)
        return false;
    return rect1.X == rect2.X && rect1.Y == rect2.Y && rect1.Width == rect2.Width && rect1.Height == rect2.Height;
};

//#endregion

//#region Clip

Clip.prototype = new Rect;
Clip.prototype.constructor = Clip;
function Clip(rect) {
    Rect.call(this);
    var rounded = rect.RoundOut();
    this.X = rounded.X;
    this.Y = rounded.Y;
    this.Width = rounded.Width;
    this.Height = rounded.Height;
}
Clip.GetBaseClass = function () { return Rect; };

//#endregion

//#region Color

Color.prototype = new RefObject;
Color.prototype.constructor = Color;
function Color(r, g, b, a) {
    RefObject.call(this);
    this.R = r == null ? 255 : r;
    this.G = g == null ? 255 : g;
    this.B = b == null ? 255 : b;
    this.A = a == null ? 1.0 : a;
}
Color.GetBaseClass = function () { return RefObject; };

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
    } else if ((match == Color.__NoAlphaRegex.exec(hex)) != null) {
        a = 1.0;
        r = parseInt(match[1], 16);
        g = parseInt(match[2], 16);
        b = parseInt(match[3], 16);
    }
    return new Color(r, g, b, a);
};

Color.prototype._Translate = function () {
    return this.toString();
};

Color.prototype.toString = function () {
    return "rgba(" + this.R.toString() + "," + this.G.toString() + "," + this.B.toString() + "," + this.A.toString() + ")";
};

//#endregion

//#region Matrix

Matrix.prototype = new RefObject;
Matrix.prototype.constructor = Matrix;
function Matrix() {
    RefObject.call(this);
    this._Elements = Matrix.CreateIdentityArray();
}
Matrix.GetBaseClass = function () { return RefObject; };

Matrix.prototype.GetElements = function () {
    return this._Elements;
};
Matrix.prototype.SetElement = function (i, j, value) {
    this._Elements[i][j] = value;
};
Matrix.prototype.Apply = function (ctx) {
    var elements = this.GetElements();
    ctx.transform(elements[0][0], elements[1][0], elements[0][1], elements[1][1], elements[0][2], elements[1][2]);
};
Matrix.prototype.Multiply = function (val) {
    if (val instanceof Point) {
        var result = new Point();
        val = [[val.X], [val.Y], [0]];
        for (var i = 0; i < 3; i++) {
            result.X += this._Elements[0][i] * val[i][0];
            result.Y += this._Elements[1][i] * val[i][0];
        }
        return result;
    }
    if (val instanceof Matrix) {
        var result = new Matrix();
        var arr1 = this.GetElements();
        var arr2 = val.GetElements();
        for (var i = 0; i < arr1.length; i++) {
            result[i] = new Array();
            for (var j = 0; j < arr2.length; j++) {
                var temp = 0;
                for (var k = 0; k < arr2[j].length; k++) {
                    temp += arr1[i][k] * arr2[k][j];
                }
                result.SetElement(i, j, temp);
            }
        }
        return result;
    }
    NotImplemented("Matrix.Multiply");
};
Matrix.prototype.toString = function () {
    var t = new String();
    t += "[\n";
    var arr = this.GetElements();
    for (var i = 0; i < arr.length; i++) {
        t += "[";
        for (var j = 0; j < arr[i].length; j++) {
            t += arr[i][j].toString();
            t += ",";
        }
        t = t.substr(0, t.length - 1)
        t += "],\n";
    }
    t = t.substr(0, t.length - 2);
    t += "\n]";
    return t;
};
Matrix.CreateIdentityArray = function () {
    return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
};

//#endregion

//#region TranslationMatrix

TranslationMatrix.prototype = new Matrix;
TranslationMatrix.prototype.constructor = TranslationMatrix;
function TranslationMatrix(x, y) {
    Matrix.call(this);
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
}
TranslationMatrix.GetBaseClass = function () { return Matrix; };

TranslationMatrix.prototype.GetElements = function () {
    return [
        [1, 0, this.X],
        [0, 1, this.Y],
        [0, 0, 1]
    ];
};
TranslationMatrix.prototype.Apply = function (ctx) {
    ctx.translate(this.X, this.Y);
};

//#endregion

//#region RotationMatrix

RotationMatrix.prototype = new Matrix;
RotationMatrix.prototype.constructor = RotationMatrix;
function RotationMatrix(angleRad) {
    Matrix.call(this);
    this.Angle = angleRad == null ? 0 : angleRad;
}
RotationMatrix.GetBaseClass = function () { return Matrix; };

RotationMatrix.prototype.GetElements = function () {
    return [
        [Math.cos(this.Angle), -1 * Math.sin(this.Angle), 0],
        [Math.sin(this.Angle), Math.cos(this.Angle), 0],
        [0, 0, 1]
    ];
};
RotationMatrix.prototype.Apply = function (ctx) {
    ctx.rotate(this.Angle);
};

//#endregion

//#region ScalingMatrix

ScalingMatrix.prototype = new Matrix;
ScalingMatrix.prototype.constructor = ScalingMatrix;
function ScalingMatrix(x, y) {
    Matrix.call(this);
    this.X = x == null ? 1 : x;
    this.Y = y == null ? 1 : y;
}
ScalingMatrix.GetBaseClass = function () { return Matrix; };

ScalingMatrix.prototype.GetElements = function () {
    return [
        [this.X, 0, 0],
        [0, this.Y, 0],
        [0, 0, 1]
    ];
};
ScalingMatrix.prototype.Apply = function (ctx) {
    ctx.scale(this.X, this.Y);
};

//#endregion

//#region ShearingMatrix

ShearingMatrix.prototype = new Matrix;
ShearingMatrix.prototype.constructor = ShearingMatrix;
function ShearingMatrix(shearX, shearY) {
    Matrix.call(this);
    this.ShearX = shearX == null ? 0 : shearX;
    this.ShearY = shearY == null ? 0 : shearY;
}
ShearingMatrix.GetBaseClass = function () { return Matrix; };

ShearingMatrix.prototype.GetElements = function () {
    return [
        [1, this.ShearX, 0],
        [this.ShearY, 1, 0],
        [0, 0, 1]
    ];
};

//#endregion

//#region Font

Font.prototype = new RefObject;
Font.prototype.constructor = Font;
function Font() {
    RefObject.call(this);
    this._Family = Font.DEFAULT_FAMILY;
    this._Stretch = Font.DEFAULT_STRETCH;
    this._Style = Font.DEFAULT_STYLE;
    this._Weight = Font.DEFAULT_WEIGHT;
    this._Size = Font.DEFAULT_SIZE;
}
Font.GetBaseClass = function () { return RefObject; };

Font.prototype.GetFamily = function () {
    return this._Family;
};
Font.prototype.SetFamily = function (value) {
    if (this._Family == value)
        return false;
    this._Family = value;
    return true;
};

Font.prototype.GetStretch = function () {
    return this._Stretch;
};
Font.prototype.SetStretch = function (value) {
    if (this._Stretch == value)
        return false;
    this._Stretch = value;
    return true;
};

Font.prototype.GetStyle = function () {
    return this._Style;
};
Font.prototype.SetStyle = function (value) {
    if (this._Style == value)
        return false;
    this._Style = value;
    return true;
};

Font.prototype.GetWeight = function () {
    return this._Weight;
};
Font.prototype.SetWeight = function (value) {
    if (this._Weight == value)
        return false;
    this._Weight = value;
    return true;
};

Font.prototype.GetSize = function () {
    return this._Size;
};
Font.prototype.SetSize = function (value) {
    if (this._Size == value)
        return false;
    this._Size = value;
    return true;
};

Font.prototype.GetActualHeight = function () {
    NotImplemented("Font.GetActualHeight");
};

Font.prototype._Descender = function () { return 0.0; }; //most likely removable
Font.prototype._Ascender = function () { return 0.0; }; //most likely removable
Font.prototype._Height = function () {
    return Surface.MeasureText("M", this).Height;
};

Font.prototype._Translate = function () {
    var s = "";
    var style = this.GetStyle();
    var weight = this.GetWeight();
    if (style && style !== FontStyles.Normal)
        s += style.toString() + " ";
    if (weight && weight !== FontWeights.Normal)
        s += weight.toString() + " ";
    s += this.GetSize() + " ";
    s += this.GetFamily() + " ";
    return s;
};

Font.DEFAULT_FAMILY = "Calibri";
Font.DEFAULT_STRETCH = FontStretches.Normal;
Font.DEFAULT_STYLE = FontStyles.Normal;
Font.DEFAULT_WEIGHT = FontWeights.Normal;
Font.DEFAULT_SIZE = "12px";

//#endregion