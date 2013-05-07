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
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle() {
                        _super.call(this);
                this.Stretch = Fayde.Media.Stretch.Fill;
            }
            Rectangle.RadiusXProperty = DependencyProperty.Register("RadiusX", function () {
                return Number;
            }, Rectangle, 0.0, function (d, args) {
                return (d)._RadiusChanged(args);
            });
            Rectangle.RadiusYProperty = DependencyProperty.Register("RadiusY", function () {
                return Number;
            }, Rectangle, 0.0, function (d, args) {
                return (d)._RadiusChanged(args);
            });
            Rectangle.prototype._BuildPath = function () {
                var stretch = this.Stretch;
                var t = this._Stroke != null ? this.StrokeThickness : 0.0;
                var irect = new rect();
                irect.Width = this.ActualWidth;
                irect.Height = this.ActualHeight;
                var radiusX = this.RadiusX;
                var radiusY = this.RadiusY;
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
                if(irect.Width === 0) {
                    irect.X = t * 0.5;
                }
                if(irect.Height === 0) {
                    irect.Y = t * 0.5;
                }
                var ta;
                if(t >= irect.Width || t >= irect.Height) {
                    ta = t * 0.001;
                    rect.growBy(irect, ta, ta, ta, ta);
                    this._ShapeFlags = Shapes.ShapeFlags.Degenerate;
                } else {
                    ta = -t * 0.5;
                    rect.growBy(irect, ta, ta, ta, ta);
                    this._ShapeFlags = Shapes.ShapeFlags.Normal;
                }
                var path = new Shapes.RawPath();
                if((radiusX === 0.0 && radiusY === 0.0) || (radiusX === radiusY)) {
                    path.RoundedRect(irect.X, irect.Y, irect.Width, irect.Height, radiusX, radiusY);
                } else {
                    NotImplemented("Rectangle._BuildPath with RadiusX !== RadiusY");
                }
                return path;
            };
            Rectangle.prototype._ComputeShapeBounds = function (logical) {
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
                if(irect.Width === 0) {
                    irect.X = t * 0.5;
                }
                if(irect.Height === 0) {
                    irect.Y = t * 0.5;
                }
                if(t >= irect.Width || t >= irect.Height) {
                    var g = t * 0.5005;
                    rect.growBy(irect, g, g, g, g);
                    this._ShapeFlags = Shapes.ShapeFlags.Degenerate;
                } else {
                    this._ShapeFlags = Shapes.ShapeFlags.Normal;
                }
                return irect;
            };
            Rectangle.prototype._ComputeShapeBoundsImpl = function (logical, matrix) {
                var r = new rect();
                if(logical) {
                    r.Width = 1.0;
                    r.Height = 1.0;
                }
                return r;
            };
            Rectangle.prototype._ComputeStretchBounds = function () {
                return this._ComputeShapeBounds(false);
            };
            Rectangle.prototype._RadiusChanged = function (args) {
                var lu = this.XamlNode.LayoutUpdater;
                lu.InvalidateMeasure();
                this._InvalidatePathCache();
                lu.Invalidate();
            };
            return Rectangle;
        })(Shapes.Shape);
        Shapes.Rectangle = Rectangle;        
        Nullstone.RegisterType(Rectangle, "Rectangle");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Rectangle.js.map
