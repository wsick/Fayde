var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Geometry.ts" />
    /// CODE
    /// <reference path="../Shapes/RawPath.ts"/>
    (function (Media) {
        var RectangleGeometry = (function (_super) {
            __extends(RectangleGeometry, _super);
            function RectangleGeometry() {
                _super.apply(this, arguments);

            }
            RectangleGeometry.RectProperty = DependencyProperty.RegisterCore("Rect", function () {
                return rect;
            }, RectangleGeometry, undefined, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            RectangleGeometry.RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", function () {
                return Number;
            }, RectangleGeometry, 0, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            RectangleGeometry.RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", function () {
                return Number;
            }, RectangleGeometry, 0, function (d, args) {
                return (d)._InvalidateGeometry();
            });
            RectangleGeometry.prototype._Build = function () {
                var irect = this.Rect;
                if(!irect) {
                    return;
                }
                var radiusX = this.RadiusX;
                var radiusY = this.RadiusY;
                var p = new Fayde.Shapes.RawPath();
                p.RoundedRect(irect.X, irect.Y, irect.Width, irect.Height, radiusX, radiusY);
                return p;
            };
            return RectangleGeometry;
        })(Media.Geometry);
        Media.RectangleGeometry = RectangleGeometry;        
        Nullstone.RegisterType(RectangleGeometry, "RectangleGeometry");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RectangleGeometry.js.map
