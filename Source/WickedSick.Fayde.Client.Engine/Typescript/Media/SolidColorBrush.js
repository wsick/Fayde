var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Brush.ts" />
    /// CODE
    (function (Media) {
        var SolidColorBrush = (function (_super) {
            __extends(SolidColorBrush, _super);
            function SolidColorBrush() {
                _super.apply(this, arguments);

            }
            return SolidColorBrush;
        })(Media.Brush);
        Media.SolidColorBrush = SolidColorBrush;        
        Nullstone.RegisterType(SolidColorBrush, "SolidColorBrush");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=SolidColorBrush.js.map
