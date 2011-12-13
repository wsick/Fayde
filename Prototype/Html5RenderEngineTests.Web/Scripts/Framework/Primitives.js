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

function CornerRadius() {
    this.TopLeft = 0;
    this.TopRight = 0;
    this.BottomRight = 0;
    this.BottomLeft = 0;
}
CornerRadius.prototype = new Object();

function Thickness() {
    this.Left = 0;
    this.Top = 0;
    this.Right = 0;
    this.Bottom = 0;
    this.Negative = function () {
        var t = new Thickness();
        t.Left = -this.Left;
        t.Right = -this.Right;
        t.Top = -this.Top;
        t.Bottom = -this.Bottom;
        return t;
    };
}
Thickness.prototype = new Object();

function Point(x, y) {
    this.X = x;
    this.Y = y;
}
Point.prototype = new Object();

function Size(width, height) {
    this.Width = width;
    this.Height = height;
    this.GrowBy = function (width, height) {
        var h = this.Height;
        var w = this.Width;
        if (h != Number.POSITIVE_INFINITY)
            h += height;
        if (w != Number.POSITIVE_INFINITY)
            w += width;
        return new Size(w > 0 ? w : 0, h > 0 ? h : 0);
    };
    this.GrowByThickness = function (thickness) {
        return this.GrowBy(thickness.Left + thickness.Right, thickness.Top + thickness.Bottom);
    };
    this.Min = function (size2) {
        return new Size(Math.min(this.Width, size2.Width), Math.min(this.Height, size2.Height));
    };
    this.Max = function (size2) {
        return new Size(Math.max(this.Width, size2.Width), Math.max(this.Height, size2.Height));
    };
}
Size.prototype = new Object();

function Rect(x, y, width, height) {
    if (x)
        this.X = x;
    if (y)
        this.Y = y;
    if (width)
        this.Width = width;
    if (height)
        this.Height = height;
    this.IsEmpty = function () {
        return this.Width <= 0.0 || this.Height <= 0.0;
    };
    this.GrowBy = function (left, top, right, bottom) {
        var result = new Rect(this.X - left, this.Y - top, this.Width + left + right, this.Height + top + bottom);
        if (result.Width < 0)
            result.Width = 0;
        if (result.Height < 0)
            result.Height = 0;
        return result;
    };
    this.GrowByThickness = function (thickness) {
        return this.GrowBy(thickness.Left, thickness.Top, thickness.Right, thickness.Bottom);
    };
    
    this.Union = function (rect2) {
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
    },
    this.Intersection = function (rect2) {
        var result = new Rect(0, 0, 0, 0);
        result.X = Math.max(this.X, rect2.x);
        result.Y = Math.max(this.Y, rect2.Y);
        result.Width = Math.max(0, Math.min(this.X + this.Width, rect2.X + rect2.Width) - result.X);
        result.Height = Math.max(0, Math.min(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y);
        return result;
    }
}
Rect.prototype = new Object();