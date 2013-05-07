var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Shape.ts" />
    /// CODE
    (function (Shapes) {
        var Ellipse = (function (_super) {
            __extends(Ellipse, _super);
            //defined in Shape
            function Ellipse() {
                        _super.call(this);
                this.Stretch = Fayde.Media.Stretch.Fill;
            }
            Ellipse.prototype._BuildPath = function () {
                var stretch = this.Stretch;
                var t = this._Stroke != null ? this.StrokeThickness : 0.0;
                var irect = new rect();
                irect.Width = this.ActualWidth;
                irect.Height = this.ActualHeight;
                switch(stretch) {
                    case Fayde.Media.Stretch.None:
                        irect.Width = irect.Height = 0;
                        break;
                    case Fayde.Media.Stretch.Uniform:
                        irect.Width = irect.Height = Math.min(irect.Width, irect.Height);
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        irect.Width = irect.Height = Math.max(irect.Width, irect.Height);
                        break;
                    case Fayde.Media.Stretch.Fill:
                        break;
                }
                if(t >= irect.Width || t >= irect.Height) {
                    irect.Width = Math.max(irect.Width, t + t * 0.001);
                    irect.Height = Math.max(irect.Height, t + t * 0.001);
                    this._ShapeFlags = Shapes.ShapeFlags.Degenerate;
                } else {
                    this._ShapeFlags = Shapes.ShapeFlags.Normal;
                }
                var ht = -t / 2;
                rect.growBy(irect, ht, ht, ht, ht);
                var path = new Fayde.Shapes.RawPath();
                path.Ellipse(irect.X, irect.Y, irect.Width, irect.Height);
                return path;
            };
            Ellipse.prototype._ComputeStretchBounds = function () {
                return this._ComputeShapeBounds(false);
            };
            Ellipse.prototype._ComputeShapeBounds = function (logical) {
                var irect = new rect();
                irect.Width = this.ActualWidth;
                irect.Height = this.ActualHeight;
                this._ShapeFlags = Shapes.ShapeFlags.Normal;
                var width = this.Width;
                var height = this.Height;
                if(irect.Width < 0.0 || irect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
                    this._ShapeFlags = Shapes.ShapeFlags.Empty;
                    return new rect();
                }
                var node = this.XamlNode;
                var vpNode = node.VisualParentNode;
                if(vpNode instanceof Fayde.Controls.CanvasNode) {
                    if(isNaN(width) !== isNaN(height)) {
                        this._ShapeFlags = Shapes.ShapeFlags.Empty;
                        return new rect();
                    }
                }
                var t = this._Stroke != null ? this.StrokeThickness : 0.0;
                switch(this.Stretch) {
                    case Fayde.Media.Stretch.None:
                        irect.Width = irect.Height = 0.0;
                        break;
                    case Fayde.Media.Stretch.Uniform:
                        irect.Width = irect.Height = Math.min(irect.Width, irect.Height);
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        irect.Width = irect.Height = Math.max(irect.Width, irect.Height);
                        break;
                    case Fayde.Media.Stretch.Fill:
                        break;
                }
                if(t >= irect.Width || t >= irect.Height) {
                    irect.Width = Math.max(irect.Width, t + t * 0.001);
                    irect.Height = Math.max(irect.Height, t + t * 0.001);
                    this._ShapeFlags = Shapes.ShapeFlags.Degenerate;
                } else {
                    this._ShapeFlags = Shapes.ShapeFlags.Normal;
                }
                return irect;
            };
            Ellipse.prototype._ComputeShapeBoundsImpl = function (logical, matrix) {
                var r = new rect();
                if(logical) {
                    r.Width = 1.0;
                    r.Height = 1.0;
                }
                return r;
            };
            return Ellipse;
        })(Shapes.Shape);
        Shapes.Ellipse = Ellipse;        
        Nullstone.RegisterType(Ellipse, "Ellipse");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Ellipse.js.map
