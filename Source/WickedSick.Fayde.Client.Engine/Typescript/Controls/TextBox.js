var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    (function (Controls) {
        var _TextBoxView = (function () {
            function _TextBoxView() { }
            return _TextBoxView;
        })();
        Controls._TextBoxView = _TextBoxView;        
        Nullstone.RegisterType(_TextBoxView, "_TextBoxView");
        var TextBox = (function (_super) {
            __extends(TextBox, _super);
            function TextBox() {
                _super.apply(this, arguments);

            }
            return TextBox;
        })(Controls.Control);
        Controls.TextBox = TextBox;        
        Nullstone.RegisterType(TextBox, "TextBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBox.js.map
