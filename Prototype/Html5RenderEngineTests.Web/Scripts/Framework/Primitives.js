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

CornerRadius.prototype = new Object;
CornerRadius.prototype.constructor = CornerRadius;
function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
    this.TopLeft = topLeft == null ? 0 : topLeft;
    this.TopRight = topRight == null ? 0 : topRight;
    this.BottomRight = bottomRight == null ? 0 : bottomRight;
    this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
}
CornerRadius.prototype.IsZero = function () {
    return this.TopLeft == 0
        && this.TopRight == 0
        && this.BottomRight == 0
        && this.BottomLeft == 0;
};

Thickness.prototype = new Object;
Thickness.prototype.constructor = Thickness;
function Thickness(left, top, right, bottom) {
    this.Left = left == null ? 0 : left;
    this.Top = top == null ? 0 : top;
    this.Right = right == null ? 0 : right;
    this.Bottom = bottom == null ? 0 : bottom;
}
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

Point.prototype = new Object;
Point.prototype.constructor = Point;
function Point(x, y) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
}

Size.prototype = new Object;
Size.prototype.constructor = Size;
function Size(width, height) {
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}
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

Rect.prototype = new Object;
Rect.prototype.constructor = Rect;
function Rect(x, y, width, height) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}
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