/// <reference path="PanelMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Controls) {
        GridMetrics.prototype = new Controls.PanelMetrics();
        GridMetrics.prototype.constructor = GridMetrics;
        function GridMetrics() {
            Controls.PanelMetrics.call(this);
        }
        var superComputeBounds = GridMetrics.prototype.ComputeBounds;
        GridMetrics.prototype.ComputeBounds = function (fe) {
            superComputeBounds.call(this, fe);
            if (fe.ShowGridLines) {
                rect.set(this.Extents, 0, 0, fe.ActualWidth, fe.ActualHeight);
                rect.union(this.ExtentsWithChildren, this.Extents);
                this._IntersectBoundsWithClipPath(this.Bounds, fe, fe._Xformer.AbsoluteXform);
                rect.union(this.BoundsWithChildren, this.Bounds);

                this.ComputeGlobalBounds(fe);
                this.ComputeSurfaceBounds(fe);
            }
        };
        Controls.GridMetrics = GridMetrics;
    })(Fayde.Controls || (Fayde.Controls = {}));
})(Fayde || (Fayde = {}));