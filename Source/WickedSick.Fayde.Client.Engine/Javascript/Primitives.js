var RectOverlap = {
    Out: 0,
    In: 1,
    Part: 2
};
var rect = (function () {
    function rect() {
        this.X = 0;
        this.Y = 0;
        this.Width = 0;
        this.Height = 0;
    }
    rect.clear = function clear(dest) {
        dest.X = 0;
        dest.Y = 0;
        dest.Width = 0;
        dest.Height = 0;
    };
    rect.set = function set(dest, x, y, width, height) {
        dest.X = x;
        dest.Y = y;
        dest.Width = width;
        dest.Height = height;
    };
    rect.isEmpty = function isEmpty(rect1) {
        return rect1.Width <= 0 || rect1.Height <= 0;
    };
    rect.copyTo = function copyTo(src, dest) {
        dest.X = src.X;
        dest.Y = src.Y;
        dest.Width = src.Width;
        dest.Height = src.Height;
    };
    rect.clone = function clone(src) {
        var r = new rect();
        r.X = src.X;
        r.Y = src.Y;
        r.Width = src.Width;
        r.Height = src.Height;
        return r;
    };
    rect.isEqual = function isEqual(rect1, rect2) {
        return rect1.X === rect2.X && rect1.Y === rect2.Y && rect1.Width === rect2.Width && rect1.Height === rect2.Height;
    };
    rect.intersection = function intersection(rect1, rect2) {
        var x = Math.max(rect1.X, rect2.X);
        var y = Math.max(rect2.Y, rect2.Y);
        rect1.Width = Math.max(0, Math.min(rect1.X + rect1.Width, rect2.X + rect2.Width) - x);
        rect1.Height = Math.max(0, Math.min(rect1.Y + rect1.Height, rect2.Y + rect2.Height) - y);
        rect1.X = x;
        rect1.Y = y;
    };
    rect.union = function union(rect1, rect2) {
        if(rect.isEmpty(rect2)) {
            return;
        }
        if(rect.isEmpty(rect1)) {
            rect.copyTo(rect2, rect1);
            return;
        }
        var x = Math.min(rect1.X, rect2.X);
        var y = Math.min(rect1.Y, rect2.Y);
        rect1.Width = Math.max(rect1.X + rect1.Width, rect2.X + rect2.Width) - x;
        rect1.Height = Math.max(rect1.Y + rect1.Height, rect2.Y + rect2.Height) - y;
        rect1.X = x;
        rect1.Y = y;
    };
    rect.growBy = function growBy(dest, left, top, right, bottom) {
        dest.X -= left;
        dest.Y -= top;
        dest.Width += left + right;
        dest.Height += top + bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
    };
    rect.growByThickness = function growByThickness(dest, thickness) {
        dest.X -= thickness.Left;
        dest.Y -= thickness.Top;
        dest.Width += thickness.Left + thickness.Right;
        dest.Height += thickness.Top + thickness.Bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
    };
    rect.shrinkBy = function shrinkBy(dest, left, top, right, bottom) {
        dest.X += left;
        dest.Y += top;
        dest.Width -= left + right;
        dest.Height -= top + bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
    };
    rect.shrinkByThickness = function shrinkByThickness(dest, thickness) {
        dest.X += thickness.Left;
        dest.Y += thickness.Top;
        dest.Width -= thickness.Left + thickness.Right;
        dest.Height -= thickness.Top + thickness.Bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
    };
    rect.extendTo = function extendTo(rect1, x, y) {
        var rx = rect1.X;
        var ry = rect1.Y;
        var rw = rect1.Width;
        var rh = rect1.Height;
        if(x < rx || x > (rx + rw)) {
            rw = Math.max(Math.abs(x - rx), Math.abs(x - rx - rw));
        }
        if(y < ry || y > (ry + rh)) {
            rh = Math.max(Math.abs(y - ry), Math.abs(y - ry - rh));
        }
        rect1.X = Math.min(rx, x);
        rect1.Y = Math.min(ry, y);
        rect1.Width = rw;
        rect1.Height = rh;
    };
    rect.transform = function transform(dest, xform) {
        if(!xform) {
            return this;
        }
        var x = dest.X;
        var y = dest.Y;
        var width = dest.Width;
        var height = dest.Height;
        var p1 = vec2.createFrom(x, y);
        var p2 = vec2.createFrom(x + width, y);
        var p3 = vec2.createFrom(x + width, y + height);
        var p4 = vec2.createFrom(x, y + height);
        mat3.transformVec2(rect.transform, p1);
        mat3.transformVec2(rect.transform, p2);
        mat3.transformVec2(rect.transform, p3);
        mat3.transformVec2(rect.transform, p4);
        var l = Math.min(p1[0], p2[0], p3[0], p4[0]);
        var t = Math.min(p1[1], p2[1], p3[1], p4[1]);
        var r = Math.max(p1[0], p2[0], p3[0], p4[0]);
        var b = Math.max(p1[1], p2[1], p3[1], p4[1]);
        dest.X = l;
        dest.Y = t;
        dest.Width = r - l;
        dest.Width = b - t;
    };
    rect.clipmask = function clipmask(clip) {
        var mask = 0;
        if(-clip[0] + clip[3] < 0) {
            mask |= (1 << 0);
        }
        if(clip[0] + clip[3] < 0) {
            mask |= (1 << 1);
        }
        if(-clip[1] + clip[3] < 0) {
            mask |= (1 << 2);
        }
        if(clip[1] + clip[3] < 0) {
            mask |= (1 << 3);
        }
        if(clip[2] + clip[3] < 0) {
            mask |= (1 << 4);
        }
        if(-clip[2] + clip[3] < 0) {
            mask |= (1 << 5);
        }
        return mask;
    };
    rect.transform4 = function transform4(dest, projection) {
        if(!rect.transform) {
            return;
        }
        var x = dest.X;
        var y = dest.Y;
        var width = dest.Width;
        var height = dest.Height;
        var p1 = vec4.createFrom(x, y, 0.0, 1.0);
        var p2 = vec4.createFrom(x + width, y, 0.0, 1.0);
        var p3 = vec4.createFrom(x + width, y + height, 0.0, 1.0);
        var p4 = vec4.createFrom(x, y + height, 0.0, 1.0);
        mat4.transformVec4(rect.transform, p1);
        mat4.transformVec4(rect.transform, p2);
        mat4.transformVec4(rect.transform, p3);
        mat4.transformVec4(rect.transform, p4);
        var vs = 65536.0;
        var vsr = 1.0 / vs;
        p1[0] *= vsr;
        p1[1] *= vsr;
        p2[0] *= vsr;
        p2[1] *= vsr;
        p3[0] *= vsr;
        p3[1] *= vsr;
        p4[0] *= vsr;
        p4[1] *= vsr;
        var cm1 = rect.clipmask(p1);
        var cm2 = rect.clipmask(p2);
        var cm3 = rect.clipmask(p3);
        var cm4 = rect.clipmask(p4);
        if((cm1 | cm2 | cm3 | cm4) !== 0) {
            if((cm1 & cm2 & cm3 & cm4) === 0) {
                rect.clear(dest);
            }
        } else {
            var p1w = 1.0 / p1[3];
            var p2w = 1.0 / p2[3];
            var p3w = 1.0 / p3[3];
            var p4w = 1.0 / p4[3];
            p1[0] *= p1w * vs;
            p1[1] *= p1w * vs;
            p2[0] *= p2w * vs;
            p2[1] *= p2w * vs;
            p3[0] *= p3w * vs;
            p3[1] *= p3w * vs;
            p4[0] *= p4w * vs;
            p4[1] *= p4w * vs;
            dest.X = p1[0];
            dest.Y = p1[1];
            dest.Width = 0;
            dest.Height = 0;
            rect.extendTo(dest, p2[0], p2[1]);
            rect.extendTo(dest, p3[0], p3[1]);
            rect.extendTo(dest, p4[0], p4[1]);
        }
    };
    rect.roundOut = function roundOut(dest) {
        var x = Math.floor(dest.X);
        var y = Math.floor(dest.Y);
        dest.Width = Math.ceil(dest.X + dest.Width) - Math.floor(dest.X);
        dest.Height = Math.ceil(dest.Y + dest.Height) - Math.floor(dest.Y);
        dest.X = x;
        dest.Y = y;
    };
    rect.roundIn = function roundIn(dest) {
        var x = Math.ceil(dest.X);
        var y = Math.ceil(dest.Y);
        dest.Width = Math.floor(dest.X + dest.Width) - Math.ceil(dest.X);
        dest.Height = Math.floor(dest.Y + dest.Height) - Math.ceil(dest.Y);
        dest.X = x;
        dest.Y = y;
    };
    rect.copyGrowTransform = function copyGrowTransform(dest, src, thickness, xform) {
        rect.copyTo(src, dest);
        rect.growByThickness(dest, thickness);
        rect.transform(dest, xform);
    };
    rect.copyGrowTransform4 = function copyGrowTransform4(dest, src, thickness, projection) {
        rect.copyTo(src, dest);
        rect.growByThickness(dest, thickness);
        rect.transform4(dest, projection);
    };
    rect.containsPoint = function containsPoint(rect1, p) {
        return rect1.X <= p.X && rect1.Y <= p.Y && (rect1.X + rect1.Width) >= p.X && (rect1.Y + rect1.Height) >= p.Y;
    };
    rect.containsPointXY = function containsPointXY(rect1, x, y) {
        return rect1.X <= x && rect1.Y <= y && (rect1.X + rect1.Width) >= x && (rect1.Y + rect1.Height) >= y;
    };
    rect.rectIn = function rectIn(rect1, rect2) {
        var copy = rect.clone(rect1);
        rect.intersection(copy, rect2);
        if(rect.isEmpty(copy)) {
            return RectOverlap.Out;
        }
        if(rect.isEqual(copy, rect2)) {
            return RectOverlap.In;
        }
        return RectOverlap.Part;
    };
    return rect;
})();
