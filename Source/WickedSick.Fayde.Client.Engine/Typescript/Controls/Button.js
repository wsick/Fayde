var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/ButtonBase.ts" />
    /// CODE
    (function (Controls) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button() {
                        _super.call(this);
                this.DefaultStyleKey = (this).constructor;
            }
            Button.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this.UpdateVisualState(false);
            };
            Button.prototype.OnIsEnabledChanged = function (e) {
                _super.prototype.OnIsEnabledChanged.call(this, e);
                this.IsTabStop = e.NewValue;
            };
            return Button;
        })(Controls.Primitives.ButtonBase);
        Controls.Button = Button;        
        Nullstone.RegisterType(Button, "Button");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Button.js.map
