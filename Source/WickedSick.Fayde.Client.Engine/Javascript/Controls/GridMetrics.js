/// <reference path="PanelMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Controls) {
        GridMetrics.prototype = new Controls.PanelMetrics();
        GridMetrics.prototype.constructor = GridMetrics;
        function GridMetrics() {
        }
        var superComputeBounds = GridMetrics.prototype.ComputeBounds;
        GridMetrics.prototype.ComputeBounds = function (fe, absoluteXform) {
            superComputeBounds.call(this, fe, absoluteXform);
            if (fe.ShowGridLines) {
                rect.set(this.Extents, 0, 0, fe.ActualWidth, fe.ActualHeight);
                rect.union(this.ExtentsWithChildren, this.Extents);
                this._IntersectBoundsWithClipPath(this.Bounds, this.EffectPadding, absoluteXform);
                rect.union(this.BoundsWithChildren, this.Bounds);

                this.ComputeGlobalBounds();
                this.ComputeSurfaceBounds();
            }
        };
        Controls.GridMetrics = GridMetrics;
    })(Fayde.Controls || (Fayde.Controls = {}));
})(Fayde || (Fayde = {}));