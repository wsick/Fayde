var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Shape.ts" />
    /// CODE
    /// <reference path="../Media/MediaParser.ts" />
    (function (Shapes) {
        var Path = (function (_super) {
            __extends(Path, _super);
            function Path() {
                _super.apply(this, arguments);

            }
            Path._DataCoercer = //defined in Shape
            function _DataCoercer(d, propd, value) {
                if(typeof value === "string") {
                    return Fayde.Media.ParseGeometry(value);
                }
                return value;
            };
            Path.DataProperty = DependencyProperty.RegisterFull("Data", function () {
                return Fayde.Media.Geometry;
            }, Path, undefined, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            }, undefined, Path._DataCoercer);
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
                if(!geom) {
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
