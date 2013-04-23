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
                _super.apply(this, arguments);

            }
            PathGeometry.FillRuleProperty = DependencyProperty.Register("FillRule", function () {
                return new Enum(Fayde.Shapes.FillRule);
            }, PathGeometry, Fayde.Shapes.FillRule.EvenOdd);
            PathGeometry.FiguresProperty = DependencyProperty.Register("Figures", function () {
                return Media.PathFigureCollection;
            }, PathGeometry);
            PathGeometry.prototype.SetPath = function (path) {
                (this)._Path = path;
            };
            return PathGeometry;
        })(Media.Geometry);
        Media.PathGeometry = PathGeometry;        
        Nullstone.RegisterType(PathGeometry, "PathGeometry");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PathGeometry.js.map
