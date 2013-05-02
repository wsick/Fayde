var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/ToggleButton.ts" />
    /// CODE
    (function (Controls) {
        var CheckBox = (function (_super) {
            __extends(CheckBox, _super);
            function CheckBox() {
                        _super.call(this);
                this.DefaultStyleKey = (this).constructor;
            }
            return CheckBox;
        })(Controls.Primitives.ToggleButton);
        Controls.CheckBox = CheckBox;        
        Nullstone.RegisterType(CheckBox, "CheckBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=CheckBox.js.map
