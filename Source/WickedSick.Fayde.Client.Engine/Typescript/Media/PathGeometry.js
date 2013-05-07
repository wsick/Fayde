var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Geometry.ts" />
    /// <reference path="Geometry.ts" />
    /// CODE
    /// <reference path="../Shapes/Enums.ts" />
    /// <reference path="PathFigure.ts" />
    (function (Media) {
        var PathGeometry = (function (_super) {
            __extends(PathGeometry, _super);
            function PathGeometry() {
                        _super.call(this);
                this._OverridePath = null;
                var coll = new Media.PathFigureCollection();
                coll.Listen(this);
                Object.defineProperty(this, "Figures", {
                    value: coll,
                    writable: false
                });
            }
            PathGeometry.Annotations = {
                ContentProperty: "Figures"
            };
            PathGeometry.FillRuleProperty = DependencyProperty.Register("FillRule", function () {
                return new Enum(Fayde.Shapes.FillRule);
            }, PathGeometry, Fayde.Shapes.FillRule.EvenOdd, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            PathGeometry.prototype.OverridePath = function (path) {
                this._OverridePath = path;
            };
            PathGeometry.prototype._Build = function () {
                if(this._OverridePath) {
                    return this._OverridePath;
                }
                var p = new Fayde.Shapes.RawPath();
                var figures = this.Figures;
                if(!figures) {
                    return;
                }
                var enumerator = figures.GetEnumerator();
                while(enumerator.MoveNext()) {
                    (enumerator.Current).MergeInto(p);
                }
                return p;
            };
            PathGeometry.prototype.PathFigureChanged = function (newPathFigure) {
                this._OverridePath = null//Any change in PathFigures invalidates a path override
                ;
                this._InvalidateGeometry();
            };
            return PathGeometry;
        })(Media.Geometry);
        Media.PathGeometry = PathGeometry;        
        Nullstone.RegisterType(PathGeometry, "PathGeometry");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PathGeometry.js.map
