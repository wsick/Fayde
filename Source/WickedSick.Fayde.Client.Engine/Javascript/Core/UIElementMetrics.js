/// <reference path="../Primitives.js"/>
/// <reference path="../Primitives/Thickness.js"/>

var Fayde;
(function (Fayde) {
    function UIElementMetrics() {
        this.Extents = new rect();
        this.Bounds = new rect();
        this.Global = new rect();
        this.Surface = new rect();
        this.EffectPadding = new Thickness();
        this.ClipBounds = new rect();

        this.SubtreeExtents = this.Extents;
        this.SubtreeBounds = this.Surface;
        this.GlobalBounds = this.Global;
    }
    UIElementMetrics.prototype.ComputeBounds = function (uie, absoluteXform) { };
    UIElementMetrics.prototype.ComputeSurfaceBounds = function (absoluteXform) {
        this._IntersectBoundsWithClipPath(this.Surface, absoluteXform);
    };
    UIElementMetrics.prototype.ComputeGlobalBounds = function (localXform) {
        this._IntersectBoundsWithClipPath(this.Global, localXform);
    };
    UIElementMetrics.prototype.ComputeEffectPadding = function (effect) {
        if (!effect)
            return false;
        return effect.GetPadding(this.EffectPadding);
    };
    UIElementMetrics.prototype._IntersectBoundsWithClipPath = function (dest, xform) {
        var isClipEmpty = rect.isEmpty(this.ClipBounds);

        if (!isClipEmpty && !this._GetRenderVisible()) {
            rect.clear(dest);
            return;
        }

        rect.copyGrowTransform(dest, this.Extents, this.EffectPadding, xform);
        if (isClipEmpty)
            return;

        rect.intersection(dest, this.ClipBounds);
    };
    UIElementMetrics.prototype.UpdateClipBounds = function (clip) {
        if (!clip)
            rect.clear(this.ClipBounds);
        rect.copyTo(clip.GetBounds(), this.ClipBounds);
    };
    UIElementMetrics.prototype.TransformBounds = function (uie, old, current) {
        var tween = mat3.inverse(old);
        mat3.multiply(current, tween, tween); //tween = tween * current;

        var p0 = vec2.createFrom(0, 0);
        var p1 = vec2.createFrom(1, 0);
        var p2 = vec2.createFrom(1, 1);
        var p3 = vec2.createFrom(0, 1);

        var p0a = mat3.transformVec2(tween, p0, vec2.create());
        p0[0] = p0[0] - p0a[0];
        p0[1] = p0[1] - p0a[1];

        var p1a = mat3.transformVec2(tween, p1, vec2.create());
        p1[0] = p1[0] - p1a[0];
        p1[1] = p1[1] - p1a[1];

        var p2a = mat3.transformVec2(tween, p2, vec2.create());
        p2[0] = p2[0] - p2a[0];
        p2[1] = p2[1] - p2a[1];

        var p3a = mat3.transformVec2(tween, p3, vec2.create());
        p3[0] = p3[0] - p3a[0];
        p3[1] = p3[1] - p3a[1];

        if (vec2.equal(p0, p1) && vec2.equal(p1, p2) && vec2.equal(p2, p3)) {
            var bounds = vec2.createFrom(this.Bounds.X, this.Bounds.Y);
            mat3.transformVec2(tween, bounds);
            this.ShiftPosition(uie, bounds);
            this.ComputeGlobalBounds();
            this.ComputeSurfaceBounds();
            return;
        }

        uie._UpdateBounds();
    };
    UIElementMetrics.prototype.ShiftPosition = function (uie, point) {
        this.Bounds.X = point.X;
        this.Bounds.Y = point.Y;
    };
    Fayde.UIElementMetrics = UIElementMetrics;
})(Fayde || (Fayde = {}));