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
        var TextBox = (function (_super) {
            __extends(TextBox, _super);
            function TextBox() {
                _super.apply(this, arguments);

            }
            return TextBox;
        })(Controls.TextBoxBase);
        Controls.TextBox = TextBox;        
        Nullstone.RegisterType(TextBox, "TextBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBox.js.map
