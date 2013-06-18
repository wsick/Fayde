/// <reference path="../Core/FrameworkElementMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Shapes) {
        ShapeMetrics.prototype = new Fayde.FrameworkElementMetrics();
        ShapeMetrics.prototype.constructor = ShapeMetrics;
        function ShapeMetrics() {
            Fayde.FrameworkElementMetrics.call(this);
        }
        ShapeMetrics.prototype.ComputeBounds = function (fe) {
            this._IntersectBaseBoundsWithClipPath(this.Bounds, this.GetStretchExtents(fe), fe, fe._Xformer.AbsoluteXform);
            rect.copyTo(this.Bounds, this.BoundsWithChildren);
            this.ComputeGlobalBounds(fe);
            this.ComputeSurfaceBounds(fe);
        };
        ShapeMetrics.prototype._IntersectBaseBoundsWithClipPath = function (dest, baseBounds, fe, xform) {
            var isClipEmpty = rect.isEmpty(this.ClipBounds);
            var isLayoutClipEmpty = rect.isEmpty(this.LayoutClipBounds);

            if ((!isClipEmpty || !isLayoutClipEmpty) && !fe._GetRenderVisible()) {
                rect.clear(dest);
                return;
            }

            rect.copyGrowTransform(dest, baseBounds, this.EffectPadding, xform);

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
        ShapeMetrics.prototype.TransformBounds = function (uie, old, current) {
            //TODO:
        };
        var superShiftPosition = ShapeMetrics.prototype.ShiftPosition;
        ShapeMetrics.prototype.ShiftPosition = function (uie, point) {
            var dx = this.Bounds.X - point.X;
            var dy = this.Bounds.Y - point.Y;
            //WTF?
            superShiftPosition.call(this, uie, point);
        };
        Shapes.ShapeMetrics = ShapeMetrics;
    })(Fayde.Shapes || (Fayde.Shapes = {}));
})(Fayde || (Fayde = {}));