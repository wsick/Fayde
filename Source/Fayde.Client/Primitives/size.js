/// <reference path="../Runtime/TypeManagement.ts" />
var size = (function () {
    function size() {
        this.Width = 0;
        this.Height = 0;
    }
    size.prototype.toString = function () {
        return "{" + this.Width + "," + this.Height + "}";
    };

    size.prototype.Clone = function () {
        var s = new size();
        s.Width = this.Width;
        s.Height = this.Height;
        return s;
    };

    size.fromRaw = function (width, height) {
        var s = new size();
        s.Width = width;
        s.Height = height;
        return s;
    };
    size.fromRect = function (src) {
        var s = new size();
        s.Width = src.Width;
        s.Height = src.Height;
        return s;
    };
    size.createInfinite = function () {
        var s = new size();
        s.Width = Number.POSITIVE_INFINITY;
        s.Height = Number.POSITIVE_INFINITY;
        return s;
    };
    size.createNegativeInfinite = function () {
        var s = new size();
        s.Width = Number.NEGATIVE_INFINITY;
        s.Height = Number.NEGATIVE_INFINITY;
        return s;
    };
    size.copyTo = function (src, dest) {
        if (!dest)
            dest = new size();
        dest.Width = src.Width;
        dest.Height = src.Height;
        return dest;
    };
    size.clear = function (dest) {
        dest.Width = 0;
        dest.Height = 0;
    };
    size.isEqual = function (size1, size2) {
        return size1.Width === size2.Width && size1.Height === size2.Height;
    };

    size.growBy = function (dest, width, height) {
        var h = dest.Height;
        var w = dest.Width;
        if (h != Number.POSITIVE_INFINITY)
            h += height;
        if (w != Number.POSITIVE_INFINITY)
            w += width;
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.growByThickness = function (dest, thickness) {
        var w = dest.Width;
        var h = dest.Height;
        if (w != Number.POSITIVE_INFINITY)
            w += thickness.Left + thickness.Right;
        if (h != Number.POSITIVE_INFINITY)
            h += thickness.Top + thickness.Bottom;
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.shrinkBy = function (dest, width, height) {
        var h = dest.Height;
        var w = dest.Width;
        if (h != Number.POSITIVE_INFINITY)
            h -= height;
        if (w != Number.POSITIVE_INFINITY)
            w -= width;
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.shrinkByThickness = function (dest, thickness) {
        var w = dest.Width;
        var h = dest.Height;
        if (w != Number.POSITIVE_INFINITY)
            w -= thickness.Left + thickness.Right;
        if (h != Number.POSITIVE_INFINITY)
            h -= thickness.Top + thickness.Bottom;
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.min = function (dest, other) {
        dest.Width = Math.min(dest.Width, other.Width);
        dest.Height = Math.min(dest.Height, other.Height);
        return dest;
    };
    size.max = function (dest, other) {
        dest.Width = Math.max(dest.Width, other.Width);
        dest.Height = Math.max(dest.Height, other.Height);
        return dest;
    };
    return size;
})();
Fayde.RegisterType(size, {
    Name: "size",
    Namespace: "window",
    XmlNamespace: Fayde.XMLNSX
});
//# sourceMappingURL=size.js.map
