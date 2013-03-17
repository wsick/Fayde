/// <reference path="UIElementMetrics.js"/>

var Fayde;
(function (Fayde) {
    FrameworkElementMetrics.prototype = new Fayde.UIElementMetrics();
    FrameworkElementMetrics.prototype.constructor = FrameworkElementMetrics;
    function FrameworkElementMetrics() {
        Fayde.UIElementMetrics.call(this);
        this.ExtentsWithChildren = new rect();
        this.BoundsWithChildren = new rect();
        this.GlobalWithChildren = new rect();
        this.SurfaceWithChildren = new rect();
        this.LayoutClipBounds = new rect();

        this.SubtreeExtents = this.ExtentsWithChildren;
        this.SubtreeBounds = this.SurfaceWithChildren;
        this.GlobalBounds = this.GlobalWithChildren;
    }
    FrameworkElementMetrics.prototype.ComputeBounds = function (fe) {
        var s = fe._ApplySizeConstraints(size.fromRaw(fe.ActualWidth, fe.ActualHeight));

        rect.set(this.Extents, 0, 0, s.Width, s.Height);
        rect.copyTo(this.Extents, this.ExtentsWithChildren);

        var walker = new Fayde._VisualTreeWalker(fe);
        var item;
        while (item = walker.Step()) {
            if (item._GetRenderVisible())
                rect.union(this.ExtentsWithChildren, item._GetGlobalBounds());
        }

        var xformer = fe._Xformer;
        this._IntersectBoundsWithClipPath(this.Bounds, fe, xformer.AbsoluteXform);
        rect.copyGrowTransform(this.BoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, xformer.AbsoluteXform);

        this.ComputeGlobalBounds(fe);
        this.ComputeSurfaceBounds(fe);
    };
    FrameworkElementMetrics.prototype.ComputeSurfaceBounds = function (fe) {
        var xformer = fe._Xformer;
        this._IntersectBoundsWithClipPath(this.Surface, fe, xformer.AbsoluteXform);
        rect.copyGrowTransform4(this.SurfaceWithChildren, this.ExtentsWithChildren, this.EffectPadding, xformer.AbsoluteProjection);
    };
    FrameworkElementMetrics.prototype.ComputeGlobalBounds = function (fe) {
        var xformer = fe._Xformer;
        this._IntersectBoundsWithClipPath(this.Global, fe, xformer.LocalXform);
        rect.copyGrowTransform4(this.GlobalWithChildren, this.ExtentsWithChildren, this.EffectPadding, xformer.LocalProjection);
    };
    FrameworkElementMetrics.prototype._IntersectBoundsWithClipPath = function (dest, fe, xform) {
        var isClipEmpty = rect.isEmpty(this.ClipBounds);
        var isLayoutClipEmpty = rect.isEmpty(this.LayoutClipBounds);

        if ((!isClipEmpty || !isLayoutClipEmpty) && !fe._GetRenderVisible()) {
            rect.clear(dest);
            return;
        }

        rect.copyGrowTransform(dest, this.Extents, this.EffectPadding, xform);

        if (!isClipEmpty)
            rect.intersection(dest, this.ClipBounds);
        if (!isLayoutClipEmpty)
            rect.intersection(dest, this.LayoutClipBounds);
    };
    FrameworkElementMetrics.prototype.UpdateLayoutClipBounds = function (layoutClip) {
        if (!layoutClip) {
            rect.clear(this.LayoutClipBounds);
            return;
        }
        rect.copyTo(layoutClip.GetBounds(), this.LayoutClipBounds);
    };
    Fayde.FrameworkElementMetrics = FrameworkElementMetrics;
})(Fayde || (Fayde = {}));