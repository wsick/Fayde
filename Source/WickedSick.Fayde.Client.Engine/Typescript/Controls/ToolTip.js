var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ContentControl.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    (function (Controls) {
        var ToolTip = (function (_super) {
            __extends(ToolTip, _super);
            function ToolTip() {
                _super.apply(this, arguments);

            }
            ToolTip.HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", function () {
                return Number;
            }, ToolTip);
            ToolTip.VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", function () {
                return Number;
            }, ToolTip);
            ToolTip.IsOpenProperty = DependencyProperty.Register("IsOpen", function () {
                return Boolean;
            }, ToolTip);
            ToolTip.PlacementProperty = DependencyProperty.Register("Placement", function () {
                return new Enum(Controls.PlacementMode);
            }, ToolTip);
            ToolTip.PlacementTargetProperty = DependencyProperty.Register("PlacementTarget", function () {
                return Fayde.UIElement;
            }, ToolTip);
            return ToolTip;
        })(Controls.ContentControl);
        Controls.ToolTip = ToolTip;        
        Nullstone.RegisterType(ToolTip, "ToolTip");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ToolTip.js.map
