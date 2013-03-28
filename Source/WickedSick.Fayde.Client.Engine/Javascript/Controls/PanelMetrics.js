/// <reference path="../Core/FrameworkElementMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Controls) {
        PanelMetrics.prototype = new Fayde.FrameworkElementMetrics();
        PanelMetrics.prototype.constructor = PanelMetrics;
        function PanelMetrics() {
            Fayde.FrameworkElementMetrics.call(this);
        }
        PanelMetrics.prototype.ComputeBounds = function (fe) {
            /// <param name="fe" type="FrameworkElement"></param>
            rect.clear(this.Extents);
            rect.clear(this.ExtentsWithChildren);

            var walker = Fayde._VisualTreeWalker.Logical(fe);
            var item;
            while (item = walker.Step()) {
                if (!item._GetRenderVisible())
                    continue;
                rect.union(this.ExtentsWithChildren, item._GetGlobalBounds());
            }

            if (fe.Background) {
                rect.set(this.Extents, 0, 0, fe.ActualWidth, fe.ActualHeight);
                rect.union(this.ExtentsWithChildren, this.Extents);
            }

            rect.copyGrowTransform(this.Bounds, this.Extents, this.EffectPadding, fe._Xformer.AbsoluteXform);
            rect.copyGrowTransform(this.BoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, fe._Xformer.AbsoluteXform);

            this.ComputeGlobalBounds(fe);
            this.ComputeSurfaceBounds(fe);
        };
        var superShiftPosition = PanelMetrics.prototype.ShiftPosition;
        PanelMetrics.prototype.ShiftPosition = function (uie, point) {
            var dx = point.X - this.Bounds.X;
            var dy = point.Y - this.Bounds.Y;

            superShiftPosition.call(this, uie, point);

            this.BoundsWithChildren.X += dx;
            this.BoundsWithChildren.Y += dy;
        };
        Controls.PanelMetrics = PanelMetrics;
    })(Fayde.Controls || (Fayde.Controls = {}));
})(Fayde || (Fayde = {}));