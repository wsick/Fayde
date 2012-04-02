/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Size
var Size = Nullstone.Create("Size", null, 2);

Size.Instance.Init = function (width, height) {
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
};

Size.Instance.GrowBy = function (width, height) {
    var h = this.Height;
    var w = this.Width;
    if (h != Number.POSITIVE_INFINITY)
        h += height;
    if (w != Number.POSITIVE_INFINITY)
        w += width;
    return new Size(w > 0 ? w : 0, h > 0 ? h : 0);
};
Size.Instance.GrowByThickness = function (thickness) {
    return this.GrowBy(thickness.Left + thickness.Right, thickness.Top + thickness.Bottom);
};
Size.Instance.Min = function (size2) {
    return new Size(Math.min(this.Width, size2.Width), Math.min(this.Height, size2.Height));
};
Size.Instance.Max = function (size2) {
    return new Size(Math.max(this.Width, size2.Width), Math.max(this.Height, size2.Height));
};
Size.Instance.Equals = function (size2) {
    return this.Width == size2.Width && this.Height == size2.Height;
};
Size.Instance.toString = function () {
    return "[Width = " + this.Width + "; Height = " + this.Height + "]";
};
Size.Instance.Copy = function () {
    return new Size(this.Width, this.Height);
};
Size.Equals = function (size1, size2) {
    if (size1 == null && size2 == null)
        return true;
    if (size1 == null && size2 == null)
        return false;
    return size1.Width === size2.Width && size1.Height === size2.Height;
};

Nullstone.FinishCreate(Size);
//#endregion