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
        var Path = (function (_super) {
            __extends(Path, _super);
            function Path() {
                _super.apply(this, arguments);

            }
            Path.DataProperty = DependencyProperty.RegisterCore("Data", function () {
                return Fayde.Media.Geometry;
            }, Path, undefined, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Path.prototype._GetFillRule = function () {
                var geom = this.Data;
                if(!geom) {
                    return _super.prototype._GetFillRule.call(this);
                }
                return (geom).FillRule;
            };
            Path.prototype._DrawPath = function (ctx) {
                var geom = this.Data;
                if(!geom) {
                    return;
                }
                geom.Draw(ctx);
            };
            Path.prototype._ComputeShapeBoundsImpl = function (logical, matrix) {
                var geom = this.Data;
                if(geom == null) {
                    this._ShapeFlags = Shapes.ShapeFlags.Empty;
                    return new rect();
                }
                if(logical) {
                    return geom.GetBounds();
                }
                var thickness = (logical || this._Stroke != null) ? 0.0 : this.StrokeThickness;
                return geom.GetBounds(thickness);
            };
            return Path;
        })(Shapes.Shape);
        Shapes.Path = Path;        
        Nullstone.RegisterType(Path, "Path");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Path.js.map
