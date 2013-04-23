var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Geometry.ts" />
    /// CODE
    /// <reference path="../Runtime/Enum.ts" />
    /// <reference path="../Shapes/Enums.ts" />
    (function (Media) {
        var GeometryGroup = (function (_super) {
            __extends(GeometryGroup, _super);
            function GeometryGroup() {
                        _super.call(this);
                var coll = new Media.GeometryCollection();
                coll.Listen(this);
                Object.defineProperty(this, "Children", {
                    value: coll,
                    writable: false
                });
            }
            GeometryGroup.FillRulleProperty = DependencyProperty.Register("FillRule", function () {
                return new Enum(Fayde.Shapes.FillRule);
            }, GeometryGroup, Fayde.Shapes.FillRule.EvenOdd);
            GeometryGroup.prototype.ComputePathBounds = function (thickness) {
                var bounds = new rect();
                var enumerator = this.Children.GetEnumerator();
                while(enumerator.MoveNext()) {
                    rect.unionLogical(bounds, (enumerator.Current).GetBounds(thickness));
                }
                return bounds;
            };
            GeometryGroup.prototype.Draw = function (ctx) {
                var transform = this.Transform;
                if(transform != null) {
                    ctx.Save();
                    ctx.Transform(transform);
                }
                var enumerator = this.Children.GetEnumerator();
                while(enumerator.MoveNext()) {
                    (enumerator.Current).Draw(ctx);
                }
                if(transform != null) {
                    ctx.Restore();
                }
            };
            GeometryGroup.prototype.GeometryChanged = function (newGeometry) {
                this._InvalidateGeometry();
            };
            return GeometryGroup;
        })(Media.Geometry);
        Media.GeometryGroup = GeometryGroup;        
        Nullstone.RegisterType(GeometryGroup, "GeometryGroup");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=GeometryGroup.js.map
