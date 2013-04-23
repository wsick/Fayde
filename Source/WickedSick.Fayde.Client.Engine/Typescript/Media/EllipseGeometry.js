var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Geometry.ts" />
    /// CODE
    (function (Media) {
        var EllipseGeometry = (function (_super) {
            __extends(EllipseGeometry, _super);
            function EllipseGeometry() {
                _super.apply(this, arguments);

            }
            EllipseGeometry.CenterProperty = DependencyProperty.Register("Center", function () {
                return Point;
            }, EllipseGeometry, undefined, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            EllipseGeometry.RadiusXProperty = DependencyProperty.Register("RadiusX", function () {
                return Number;
            }, EllipseGeometry, 0.0, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            EllipseGeometry.RadiusYProperty = DependencyProperty.Register("RadiusY", function () {
                return Number;
            }, EllipseGeometry, 0.0, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            EllipseGeometry.prototype._Build = function () {
                var rx = this.RadiusX;
                var ry = this.RadiusY;
                var center = this.Center;
                var x = center ? center.X : 0.0;
                var y = center ? center.Y : 0.0;
                var p = new Fayde.Shapes.RawPath();
                p.Ellipse(x - rx, y - ry, rx * 2.0, ry * 2.0);
                return p;
            };
            return EllipseGeometry;
        })(Media.Geometry);
        Media.EllipseGeometry = EllipseGeometry;        
        Nullstone.RegisterType(EllipseGeometry, "EllipseGeometry");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=EllipseGeometry.js.map
