/// <reference path="../Core/FrameworkElementMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Controls) {
        TextBlockMetrics.prototype = new Fayde.FrameworkElementMetrics();
        TextBlockMetrics.prototype.constructor = TextBlockMetrics;
        function TextBlockMetrics() {
            Fayde.FrameworkElementMetrics.call(this);
        }
        TextBlockMetrics.prototype.ComputeBounds = function (fe) {
            rect.copyTo(fe._Layout.GetRenderExtents(), this.Extents);
            var padding = fe.Padding;
            this.Extents.X += padding.Left;
            this.Extents.Y += padding.Top;
            rect.copyTo(this.Extents, this.ExtentsWithChildren);

            this._IntersectBoundsWithClipPath(this.Bounds, fe, fe._Xformer.AbsoluteXform);
            rect.copyTo(this.Bounds, this.BoundsWithChildren);

            this.ComputeGlobalBounds(fe);
            this.ComputeSurfaceBounds(fe);
        };
        Controls.TextBlockMetrics = TextBlockMetrics;
    })(Fayde.Controls || (Fayde.Controls = {}));
})(Fayde || (Fayde = {}));