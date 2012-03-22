/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Matrix.js"/>
/// <reference path="Enums.js"/>

//#region Rect
var Rect = Nullstone.Create("Rect", null, 4);

Rect.Instance.Init = function (x, y, width, height) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
};

Rect.Instance.IsEmpty = function () {
    /// <returns type="Boolean" />
    return this.Width <= 0.0 || this.Height <= 0.0;
};
Rect.Instance.GrowBy = function (left, top, right, bottom) {
    /// <returns type="Rect" />
    var result = new Rect(this.X - left, this.Y - top, this.Width + left + right, this.Height + top + bottom);
    if (result.Width < 0)
        result.Width = 0;
    if (result.Height < 0)
        result.Height = 0;
    return result;
};
Rect.Instance.GrowByThickness = function (thickness) {
    /// <returns type="Rect" />
    return this.GrowBy(thickness.Left, thickness.Top, thickness.Right, thickness.Bottom);
};
Rect.Instance.Union = function (rect2) {
    /// <returns type="Rect" />
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
Rect.Instance.Intersection = function (rect2) {
    /// <returns type="Rect" />
    var result = new Rect(0, 0, 0, 0);
    result.X = Math.max(this.X, rect2.X);
    result.Y = Math.max(this.Y, rect2.Y);
    result.Width = Math.max(0, Math.min(this.X + this.Width, rect2.X + rect2.Width) - result.X);
    result.Height = Math.max(0, Math.min(this.Y + this.Height, rect2.Y + rect2.Height) - result.Y);
    return result;
};
Rect.Instance.RoundOut = function () {
    /// <returns type="Rect" />
    return new Rect(Math.floor(this.X), Math.floor(this.Y), Math.ceil(this.X + this.Width) - Math.floor(this.X), Math.ceil(this.Y + this.Height) - Math.floor(this.Y));
}
Rect.Instance.RoundIn = function () {
    /// <returns type="Rect" />
    return new Rect(Math.ceil(this.X), Math.ceil(this.Y), Math.floor(this.X + this.Width) - Math.ceil(this.X), Math.floor(this.Y + this.Height) - Math.ceil(this.Y));
}
Rect.Instance.Transform = function (matrix) {
    /// <param name="matrix" type="Matrix"></param>
    /// <returns type="Rect" />
    var topLeft = new Point(this.X, this.Y);
    var bottomRight = new Point(this.X + this.Width, this.Y + this.Height);
    topLeft = matrix.MultiplyPoint(topLeft);
    bottomRight = matrix.MultiplyPoint(bottomRight);
    return new Rect(Math.min(topLeft.X, bottomRight.X),
        Math.min(topLeft.Y, bottomRight.Y),
        Math.abs(bottomRight.X - topLeft.X),
        Math.abs(bottomRight.Y - topLeft.Y));
};
Rect.Instance.RectIn = function (rect2) {
    /// <param name="rect2" type="Rect"></param>
    /// <returns type="Number" />
    var inter = this.Intersection(rect2);
    if (inter.IsEmpty())
        return RectOverlap.Out;
    if (Rect.Equals(rect2, inter))
        return RectOverlap.In;
    return RectOverlap.Part;
};
Rect.Instance.ContainsPoint = function (p) {
    /// <param name="p" type="Point"></param>
    return this.X <= p.X
        && this.Y <= p.Y
        && (this.X + this.Width) >= p.X
        && (this.Y + this.Height) >= p.Y;
};
Rect.Equals = function (rect1, rect2) {
    /// <returns type="Boolean" />
    if (rect1 == null && rect2 == null)
        return true;
    if (rect1 == null || rect2 == null)
        return false;
    return rect1.X == rect2.X && rect1.Y == rect2.Y && rect1.Width == rect2.Width && rect1.Height == rect2.Height;
};

Nullstone.FinishCreate(Rect);
//#endregion