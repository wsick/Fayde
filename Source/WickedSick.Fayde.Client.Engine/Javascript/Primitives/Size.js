/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Size
function Size(width, height) {
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}

Size.Equals = function (size1, size2) {
    if (size1 == null)
        return size2 == null;
    if (size2 == null)
        return false;
    return size1.Width === size2.Width && size1.Height === size2.Height;
};

Size.prototype.Copy = function () {
    return new Size(this.Width, this.Height);
};

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
    /// <param name="thickness" type="Thickness"></param>
    var width = thickness.Left + thickness.Right;
    var height = thickness.Top + thickness.Bottom;
    var h = this.Height;
    var w = this.Width;
    if (h != Number.POSITIVE_INFINITY)
        h += height;
    if (w != Number.POSITIVE_INFINITY)
        w += width;
    return new Size(w > 0 ? w : 0, h > 0 ? h : 0);
};
Size.prototype.ShrinkByThickness = function (thickness) {
    /// <param name="thickness" type="Thickness"></param>
    var width = thickness.Left + thickness.Right;
    var height = thickness.Top + thickness.Bottom;
    var h = this.Height;
    var w = this.Width;
    if (h != Number.POSITIVE_INFINITY)
        h -= height;
    if (w != Number.POSITIVE_INFINITY)
        w -= width;
    return new Size(w > 0 ? w : 0, h > 0 ? h : 0);
};
Size.prototype.Min = function (size2) {
    return new Size(Math.min(this.Width, size2.Width), Math.min(this.Height, size2.Height));
};
Size.prototype.Max = function (size2) {
    return new Size(Math.max(this.Width, size2.Width), Math.max(this.Height, size2.Height));
};

Size.prototype.toString = function () {
    return "[Width = " + this.Width + "; Height = " + this.Height + "]";
};

//#endregion