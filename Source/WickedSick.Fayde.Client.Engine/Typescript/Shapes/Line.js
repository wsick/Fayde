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
        var Line = (function (_super) {
            __extends(Line, _super);
            function Line() {
                _super.apply(this, arguments);

            }
            Line.X1Property = DependencyProperty.Register("X1", function () {
                return Number;
            }, Line, 0.0, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Line.Y1Property = DependencyProperty.Register("Y1", function () {
                return Number;
            }, Line, 0.0, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Line.X2Property = DependencyProperty.Register("X2", function () {
                return Number;
            }, Line, 0.0, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Line.Y2Property = DependencyProperty.Register("Y2", function () {
                return Number;
            }, Line, 0.0, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Line.prototype._DrawPath = function (ctx) {
                if(!this._Path) {
                    this._BuildPath();
                }
                _super.prototype._DrawPath.call(this, ctx);
            };
            Line.prototype._BuildPath = function () {
                this._ShapeFlags = Shapes.ShapeFlags.Normal;
                var path = new Shapes.RawPath();
                this._Path = path;
                var x1 = this.X1;
                var y1 = this.Y1;
                var x2 = this.X2;
                var y2 = this.Y2;
                path.Move(x1, y1);
                path.Line(x2, y2);
            };
            Line.prototype._ComputeShapeBounds = function (logical) {
                var shapeBounds = new rect();
                var thickness = 0;
                if(!logical) {
                    thickness = this.StrokeThickness;
                }
                if(thickness <= 0.0 && !logical) {
                    return shapeBounds;
                }
                var x1 = this.X1;
                var y1 = this.Y1;
                var x2 = this.X2;
                var y2 = this.Y2;
                rect.set(shapeBounds, Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
                //TODO: Handle startcap, endcap, thickness
                return shapeBounds;
            };
            return Line;
        })(Shapes.Shape);
        Shapes.Line = Line;        
        Nullstone.RegisterType(Line, "Line");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Line.js.map
