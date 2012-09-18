/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="Matrix.js"/>
/// <reference path="Enums.js"/>

//#region Rect
function Rect(x, y, width, height) {
    this.X = x == null ? 0 : x;
    this.Y = y == null ? 0 : y;
    this.Width = width == null ? 0 : width;
    this.Height = height == null ? 0 : height;
}
Rect._TypeName = "Rect";

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
Rect.prototype.ShrinkBy = function (left, top, right, bottom) {
    /// <returns type="Rect" />
    var result = new Rect(this.X + left, this.Y + top, this.Width - left - right, this.Height - top - bottom);
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

    var x = this.X;
    var y = this.Y;
    var width = this.Width;
    var height = this.Height;

    var p1 = vec2.createFrom(x, y);
    var p2 = vec2.createFrom(x + width, y);
    var p3 = vec2.createFrom(x + width, y + height);
    var p4 = vec2.createFrom(x, y + height);

    mat3.transformVec2(transform, p1);
    mat3.transformVec2(transform, p2);
    mat3.transformVec2(transform, p3);
    mat3.transformVec2(transform, p4);

    var l = Math.min(p1[0], p2[0], p3[0], p4[0]);
    var t = Math.min(p1[1], p2[1], p3[1], p4[1]);
    var r = Math.max(p1[0], p2[0], p3[0], p4[0]);
    var b = Math.max(p1[1], p2[1], p3[1], p4[1]);

    return new Rect(l, t, r - l, b - t);
};
Rect.prototype.Transform4 = function (transform) {
    /// <returns type="Rect" />
    if (!transform)
        return this;

    var x = this.X;
    var y = this.Y;
    var width = this.Width;
    var height = this.Height;

    var p1 = vec4.createFrom(x, y, 0.0, 1.0);
    var p2 = vec4.createFrom(x + width, y, 0.0, 1.0);
    var p3 = vec4.createFrom(x + width, y + height, 0.0, 1.0);
    var p4 = vec4.createFrom(x, y + height, 0.0, 1.0);

    mat4.transformVec4(transform, p1);
    mat4.transformVec4(transform, p2);
    mat4.transformVec4(transform, p3);
    mat4.transformVec4(transform, p4);

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

    var clipmask = Rect._ClipMask;
    var cm1 = clipmask(p1);
    var cm2 = clipmask(p2);
    var cm3 = clipmask(p3);
    var cm4 = clipmask(p4);

    var bounds;
    if ((cm1 | cm2 | cm3 | cm4) !== 0) {
        bounds = new Rect();
        if ((cm1 & cm2 & cm3 & cm4) === 0) {
            NotImplemented("Rect.Transform4");
            //var r1 = Matrix3D._ClipToBounds(p1, p2, p3, cm1 | cm2 | cm3);
            //var r2 = Matrix3D._ClipToBounds(p1, p3, p4, cm1 | cm3 | cm4);
            //if (!r1.IsEmpty()) bounds = bounds.Union(r1);
            //if (!r2.IsEmpty()) bounds = bounds.Union(r2);
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

        bounds = new Rect(p1[0], p1[1], 0, 0);
        bounds.ExtendTo(p2[0], p2[1]);
        bounds.ExtendTo(p3[0], p3[1]);
        bounds.ExtendTo(p4[0], p4[1]);
    }

    return bounds;
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
    var rx = this.X;
    var ry = this.Y;
    var rw = this.Width;
    var rh = this.Height;

    if (x < rx || x > (rx + rw))
        rw = Math.max(Math.abs(x - rx), Math.abs(x - rx - rw));
    if (y < ry || y > (ry + rh))
        rh = Math.max(Math.abs(y - ry), Math.abs(y - ry - rh));

    this.X = Math.min(rx, x);
    this.Y = Math.min(ry, y);

    this.Width = rw;
    this.Height = rh;
};

Rect._ClipMask = function (clip) {
    var mask = 0;

    if (-clip[0] + clip[3] < 0) mask |= (1 << 0);
    if (clip[0] + clip[3] < 0) mask |= (1 << 1);
    if (-clip[1] + clip[3] < 0) mask |= (1 << 2);
    if (clip[1] + clip[3] < 0) mask |= (1 << 3);
    if (clip[2] + clip[3] < 0) mask |= (1 << 4);
    if (-clip[2] + clip[3] < 0) mask |= (1 << 5);

    return mask;
};

Rect.prototype.toString = function () {
    return "[X = " + this.X + "; Y = " + this.Y + "; Width = " + this.Width + "; Height = " + this.Height + "]";
};

//#endregion