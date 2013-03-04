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
    rect.isEmpty = function isEmpty(rect1) {
        return rect1.Width <= 0 || rect1.Height <= 0;
    };
    rect.copyTo = function copyTo(src, dest) {
        dest.X = src.X;
        dest.Y = src.Y;
        dest.Width = src.Width;
        dest.Height = src.Height;
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
    rect.growByThickness = function growByThickness(dest, thickness) {
        dest.X += thickness.Left;
        dest.Y += thickness.Top;
        dest.Width += thickness.Left + thickness.Right;
        dest.Height += thickness.Top + thickness.Bottom;
        if(dest.Width < 0) {
            dest.Width = 0;
        }
        if(dest.Height < 0) {
            dest.Height = 0;
        }
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
    rect.copyGrowTransform = function copyGrowTransform(dest, src, thickness, xform) {
        rect.copyTo(src, dest);
        rect.growByThickness(dest, thickness);
        rect.transform(dest, xform);
    };
    return rect;
})();
exports.rect = rect;
