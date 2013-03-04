/// <reference path="../Core/FrameworkElementMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Shapes) {
        ShapeMetrics.prototype = new Fayde.FrameworkElementMetrics();
        ShapeMetrics.prototype.constructor = ShapeMetrics;
        function ShapeMetrics() {
        }
        ShapeMetrics.prototype.ComputeBounds = function (fe, absoluteXform) {
            this._IntersectBoundsWithClipPath(this.Bounds, absoluteXform);
            rect.copyTo(this.BoundsWithChildren, this.Bounds);
            this.ComputeGlobalBounds();
            this.ComputeSurfaceBounds();
        };
        ShapeMetrics.prototype._IntersectBoundsWithClipPath = function (dest, xform) {
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
        ShapeMetrics.prototype.UpdateStretch = function () {
            rect.clear(this.Extents);
            rect.clear(this.ExtentsWithChildren);
        };
        ShapeMetrics.prototype.GetStretchExtents = function (shape) {
            if (rect.isEmpty(this.Extents)) {
                rect.copyTo(shape._ComputeStretchBounds(), this.Extents);
                rect.copyTo(this.Extents, this.ExtentsWithChildren);
            }
            return this.Extents;
        };
        Shapes.ShapeMetrics = ShapeMetrics;
    })(Fayde.Shapes || (Fayde.Shapes = {}));
})(Fayde || (Fayde = {}));