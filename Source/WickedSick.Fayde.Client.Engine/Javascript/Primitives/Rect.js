/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Matrix.js"/>
/// <reference path="Matrix3D.js"/>
/// <reference path="Enums.js"/>

//#region Rect
function Rect(x, y, width, height) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}

Rect.Equals = function (rect1, rect2) {
    /// <returns type="Boolean" />
    if (rect1 == null)
        return rect2 == null;
    if (rect2 == null)
        return false;
    return rect1.X == rect2.X && rect1.Y == rect2.Y && rect1.Width == rect2.Width && rect1.Height == rect2.Height;
};

Rect.prototype.GetRight = function () {
    return this.X + this.Width;
};
Rect.prototype.GetBottom = function () {
    return this.Y + this.Height;
};

Rect.prototype.IsEmpty = function () {
    /// <returns type="Boolean" />
    return this.Width <= 0.0 || this.Height <= 0.0;
};
Rect.prototype.GrowBy = function (left, top, right, bottom) {
    /// <returns type="Rect" />
    var result = new Rect(this.X - left, this.Y - top, this.Width + left + right, this.Height + top + bottom);
    if (result.Width < 0)
        result.Width = 0;
    if (result.Height < 0)
        result.Height = 0;
    return result;
};
Rect.prototype.GrowByThickness = function (thickness) {
    /// <returns type="Rect" />
    var result = new Rect(this.X - thickness.Left, this.Y - thickness.Top, this.Width + thickness.Left + thickness.Right, this.Height + thickness.Top + thickness.Bottom);
    if (result.Width < 0)
        result.Width = 0;
    if (result.Height < 0)
        result.Height = 0;
    return result;
};
Rect.prototype.ShrinkByThickness = function (thickness) {
    /// <returns type="Rect" />
    var result = new Rect(this.X + thickness.Left, this.Y + thickness.Top, this.Width - thickness.Left - thickness.Right, this.Height - thickness.Top - thickness.Bottom);
    if (result.Width < 0)
        result.Width = 0;
    if (result.Height < 0)
        result.Height = 0;
    return result;
};
Rect.prototype.Union = function (rect2, logical) {
    /// <returns type="Rect" />
    if (this.IsEmpty())
        return new Rect(rect2.X, rect2.Y, rect2.Width, rect2.Height);
    if (rect2.IsEmpty())
        return new Rect(this.X, this.Y, this.Width, this.Height);
    if (logical) {
        if (rect2.Width <= 0 && rect2.Height <= 0)
            return new Rect(this.X, this.Y, this.Width, this.Height);
    } else {
        if (rect2.Width <= 0 || rect2.Height <= 0)
            return new Rect(this.X, this.Y, this.Width, this.Height);
    }

    var result = new Rect(0, 0, 0, 0);
    result.X = Math.min(this.X, rect2.X);
    result.Y = Math.min(this.Y, rect2.Y);
    result.Width = Math.max(this.X + this.Width, rect2.X + rect2.Width) - result.X;
    result.Height = Math.max(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y;
    return result;
};
Rect.prototype.Intersection = function (rect2) {
    /// <returns type="Rect" />
    var result = new Rect(0, 0, 0, 0);
    result.X = Math.max(this.X, rect2.X);
    result.Y = Math.max(this.Y, rect2.Y);
    result.Width = Math.max(0, Math.min(this.X + this.Width, rect2.X + rect2.Width) - result.X);
    result.Height = Math.max(0, Math.min(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y);
    return result;
};
Rect.prototype.RoundOut = function () {
    /// <returns type="Rect" />
    return new Rect(Math.floor(this.X), Math.floor(this.Y), Math.ceil(this.X + this.Width) - Math.floor(this.X), Math.ceil(this.Y + this.Height) - Math.floor(this.Y));
}
Rect.prototype.RoundIn = function () {
    /// <returns type="Rect" />
    return new Rect(Math.ceil(this.X), Math.ceil(this.Y), Math.floor(this.X + this.Width) - Math.ceil(this.X), Math.floor(this.Y + this.Height) - Math.ceil(this.Y));
}
Rect.prototype.Transform = function (transform) {
    /// <returns type="Rect" />
    if (!transform)
        return this;

    if (transform instanceof Matrix)
        return Matrix.TransformBounds(transform, this);
    else if (transform instanceof Matrix3D)
        return Matrix3D.TransformBounds(transform, this);
};
Rect.prototype.RectIn = function (rect2) {
    /// <param name="rect2" type="Rect"></param>
    /// <returns type="Number" />
    var inter = this.Intersection(rect2);
    if (inter.IsEmpty())
        return RectOverlap.Out;
    if (Rect.Equals(rect2, inter))
        return RectOverlap.In;
    return RectOverlap.Part;
};
Rect.prototype.ContainsPoint = function (p) {
    /// <param name="p" type="Point"></param>
    return this.X <= p.X
        && this.Y <= p.Y
        && (this.X + this.Width) >= p.X
        && (this.Y + this.Height) >= p.Y;
};
Rect.prototype.ContainsPointXY = function (x, y) {
    /// <param name="x" type="Number"></param>
    /// <param name="y" type="Number"></param>
    return this.X <= x
        && this.Y <= y
        && (this.X + this.Width) >= x
        && (this.Y + this.Height) >= y;
};
Rect.prototype.ExtendTo = function (x, y) {
    var result = new Rect(this.X, this.Y, this.Width, this.Height);

    if (x < result.X || x > (result.X + result.Width))
        result.Width = Math.max(Math.abs(x - result.X), Math.abs(x - result.X - result.Width));

    if (y < result.Y || y > (result.Y + result.Height))
        result.Height = Math.max(Math.abs(y - result.Y), Math.abs(y - result.Y - result.Height));

    result.X = Math.min(result.X, x);
    result.Y = Math.min(result.Y, y);

    return result;
};

Rect.prototype.toString = function () {
    return "[X = " + this.X + "; Y = " + this.Y + "; Width = " + this.Width + "; Height = " + this.Height + "]";
};

//#endregion