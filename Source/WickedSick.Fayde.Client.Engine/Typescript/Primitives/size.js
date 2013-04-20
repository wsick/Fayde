/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="rect.ts" />
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
    size.fromRaw = function fromRaw(width, height) {
        var s = new size();
        s.Width = width;
        s.Height = height;
        return s;
    };
    size.fromRect = function fromRect(src) {
        var s = new size();
        s.Width = src.Width;
        s.Height = src.Height;
        return s;
    };
    size.createInfinite = function createInfinite() {
        var s = new size();
        s.Width = Number.POSITIVE_INFINITY;
        s.Height = Number.POSITIVE_INFINITY;
        return s;
    };
    size.createNegativeInfinite = function createNegativeInfinite() {
        var s = new size();
        s.Width = Number.NEGATIVE_INFINITY;
        s.Height = Number.NEGATIVE_INFINITY;
        return s;
    };
    size.copyTo = function copyTo(src, dest) {
        dest.Width = src.Width;
        dest.Height = src.Height;
    };
    size.clone = function clone(src) {
        var s = new size();
        s.Width = src.Width;
        s.Height = src.Height;
        return s;
    };
    size.clear = function clear(dest) {
        dest.Width = 0;
        dest.Height = 0;
    };
    size.isEqual = function isEqual(size1, size2) {
        return size1.Width === size2.Width && size1.Height === size2.Height;
    };
    size.growBy = function growBy(dest, width, height) {
        var h = dest.Height;
        var w = dest.Width;
        if(h != Number.POSITIVE_INFINITY) {
            h += height;
        }
        if(w != Number.POSITIVE_INFINITY) {
            w += width;
        }
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.growByThickness = function growByThickness(dest, thickness) {
        var w = dest.Width;
        var h = dest.Height;
        if(w != Number.POSITIVE_INFINITY) {
            w += thickness.Left + thickness.Right;
        }
        if(h != Number.POSITIVE_INFINITY) {
            h += thickness.Top + thickness.Bottom;
        }
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.shrinkBy = function shrinkBy(dest, width, height) {
        var h = dest.Height;
        var w = dest.Width;
        if(h != Number.POSITIVE_INFINITY) {
            h -= height;
        }
        if(w != Number.POSITIVE_INFINITY) {
            w -= width;
        }
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.shrinkByThickness = function shrinkByThickness(dest, thickness) {
        var w = dest.Width;
        var h = dest.Height;
        if(w != Number.POSITIVE_INFINITY) {
            w -= thickness.Left + thickness.Right;
        }
        if(h != Number.POSITIVE_INFINITY) {
            h -= thickness.Top + thickness.Bottom;
        }
        dest.Width = w > 0 ? w : 0;
        dest.Height = h > 0 ? h : 0;
        return dest;
    };
    size.min = function min(dest, other) {
        dest.Width = Math.min(dest.Width, other.Width);
        dest.Height = Math.min(dest.Height, other.Height);
        return dest;
    };
    size.max = function max(dest, other) {
        dest.Width = Math.max(dest.Width, other.Width);
        dest.Height = Math.max(dest.Height, other.Height);
        return dest;
    };
    return size;
})();
Nullstone.RegisterType(size, "size");
//@ sourceMappingURL=size.js.map
