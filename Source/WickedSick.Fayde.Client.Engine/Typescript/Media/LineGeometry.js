var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Geometry.ts" />
    /// CODE
    /// <reference path="../Primitives/Point.ts" />
    /// <reference path="../Shapes/Enums.ts" />
    (function (Media) {
        var LineGeometry = (function (_super) {
            __extends(LineGeometry, _super);
            function LineGeometry() {
                _super.apply(this, arguments);

            }
            LineGeometry.StartPointProperty = DependencyProperty.Register("StartPoint", function () {
                return Point;
            }, LineGeometry, undefined, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            LineGeometry.EndPointProperty = DependencyProperty.Register("EndPoint", function () {
                return Point;
            }, LineGeometry, undefined, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            LineGeometry.prototype._Build = function () {
                var p1 = this.StartPoint;
                var p2 = this.EndPoint;
                var p = new Fayde.Shapes.RawPath();
                p.Move(p1.X, p1.Y);
                p.Line(p2.X, p2.Y);
                return p;
            };
            return LineGeometry;
        })(Media.Geometry);
        Media.LineGeometry = LineGeometry;        
        Nullstone.RegisterType(LineGeometry, "LineGeometry");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LineGeometry.js.map
