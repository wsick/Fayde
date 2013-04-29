var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Brush.ts" />
    /// CODE
    /// <reference path="../Primitives/Color.ts" />
    (function (Media) {
        var SolidColorBrush = (function (_super) {
            __extends(SolidColorBrush, _super);
            function SolidColorBrush() {
                        _super.call(this);
                if(arguments.length === 1 && arguments[0] instanceof Color) {
                    this.Color = arguments[0];
                }
            }
            SolidColorBrush.ColorProperty = DependencyProperty.Register("Color", function () {
                return Color;
            }, SolidColorBrush, undefined, function (d, args) {
                return (d).InvalidateBrush();
            });
            SolidColorBrush.FromColor = function FromColor(color) {
                var scb = new SolidColorBrush();
                scb.Color = color;
                return scb;
            };
            SolidColorBrush.prototype.CreateBrush = function (ctx, bounds) {
                var color = this.Color;
                if(!color) {
                    return "#000000";
                }
                return color.toString();
            };
            return SolidColorBrush;
        })(Media.Brush);
        Media.SolidColorBrush = SolidColorBrush;        
        Nullstone.RegisterType(SolidColorBrush, "SolidColorBrush");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=SolidColorBrush.js.map
