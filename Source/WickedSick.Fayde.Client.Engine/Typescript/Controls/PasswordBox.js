var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="TextBoxBase.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    (function (Controls) {
        var PasswordBox = (function (_super) {
            __extends(PasswordBox, _super);
            function PasswordBox() {
                _super.apply(this, arguments);

            }
            return PasswordBox;
        })(Controls.TextBoxBase);
        Controls.PasswordBox = PasswordBox;        
        Nullstone.RegisterType(PasswordBox, "PasswordBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PasswordBox.js.map
