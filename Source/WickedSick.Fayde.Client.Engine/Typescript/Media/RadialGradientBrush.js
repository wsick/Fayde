var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="GradientBrush.ts" />
    /// <reference path="../Primitives/Point.ts" />
    /// CODE
    (function (Media) {
        var RadialGradientBrush = (function (_super) {
            __extends(RadialGradientBrush, _super);
            function RadialGradientBrush() {
                _super.apply(this, arguments);

            }
            RadialGradientBrush.CenterProperty = DependencyProperty.RegisterCore("Center", function () {
                return Point;
            }, RadialGradientBrush, new Point(0.5, 0.5));
            RadialGradientBrush.GradientOriginProperty = DependencyProperty.RegisterCore("GradientOrigin", function () {
                return Point;
            }, RadialGradientBrush, new Point(0.5, 0.5));
            RadialGradientBrush.RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", function () {
                return Number;
            }, RadialGradientBrush, 0.5);
            RadialGradientBrush.RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", function () {
                return Number;
            }, RadialGradientBrush, 0.5);
            RadialGradientBrush.prototype.CreateBrush = function (ctx, bounds) {
                //TODO: Implement
                return undefined;
            };
            return RadialGradientBrush;
        })(Media.GradientBrush);
        Media.RadialGradientBrush = RadialGradientBrush;        
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RadialGradientBrush.js.map
