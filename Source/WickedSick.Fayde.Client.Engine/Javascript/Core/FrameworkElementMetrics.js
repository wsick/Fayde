/// <reference path="UIElementMetrics.js"/>

var Fayde;
(function (Fayde) {
    FrameworkElementMetrics.prototype = new Fayde.UIElementMetrics();
    FrameworkElementMetrics.prototype.constructor = Fayde.UIElementMetrics;
    function FrameworkElementMetrics() {
        this.ExtentsWithChildren = new rect();
        this.BoundsWithChildren = new rect();
        this.GlobalWithChildren = new rect();
        this.SurfaceWithChildren = new rect();
        this.LayoutClipBounds = new rect(); //TODO: Update LayoutClipBounds from UIElement

        this.SubtreeExtents = this.ExtentsWithChildren;
        this.SubtreeBounds = this.SurfaceWithChildren;
        this.GlobalBounds = this.GlobalWithChildren;
    }
    FrameworkElementMetrics.prototype.ComputeBounds = function (fe) {
        var size = new Size(fe.ActualWidth, fe.ActualHeight);
        size = fe._ApplySizeConstraints(size);

        rect.set(this.Extents, 0, 0, size.Width, size.Height);
        rect.copyTo(this.Extents, this.ExtentsWithChildren);

        var walker = new Fayde._VisualTreeWalker(fe);
        var item;
        while (item = walker.Step()) {
            if (item._GetRenderVisible())
                rect.union(this.ExtentsWithChildren, item._GetGlobalBounds());
        }

        this._IntersectBoundsWithClipPath(this.Bounds, absoluteXform);
        rect.copyGrowTransform(this.BoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, xform);

        this.ComputeGlobalBounds();
        this.ComputeSurfaceBounds();
    };
    FrameworkElementMetrics.prototype.ComputeSurfaceBounds = function (absoluteXform, absoluteProjection) {
        this._IntersectBoundsWithClipPath(this.Surface, absoluteXform);
        rect.copyGrowTransform4(this.SurfaceWithChildren, this.ExtentsWithChildren, this.EffectPadding, absoluteProjection);
    };
    FrameworkElementMetrics.prototype.ComputeGlobalBounds = function (localXform, localProjection) {
        this._IntersectBoundsWithClipPath(this.Global, localXform);
        rect.copyGrowTransform4(this.GlobalWithChildren, this.ExtentsWithChildren, this.EffectPadding, localProjection);
    };
    FrameworkElementMetrics.prototype._IntersectBoundsWithClipPath = function (dest, xform) {
        var isClipEmpty = rect.isEmpty(this.ClipBounds);
        var isLayoutClipEmpty = rect.isEmpty(this.LayoutClipBounds);

        if ((!isClipEmpty || !isLayoutClipEmpty) && !this._GetRenderVisible()) {
            rect.clear(dest);
            return;
        }

        rect.copyGrowTransform(dest, this.Extents, this.EffectPadding, xform);

        if (!isClipEmpty)
            rect.intersection(dest, this.ClipBounds);
        if (!isLayoutClipEmpty)
            rect.intersection(dest, this.LayoutClipBounds);
    };
    Fayde.FrameworkElementMetrics = FrameworkElementMetrics;
})(Fayde || (Fayde = {}));