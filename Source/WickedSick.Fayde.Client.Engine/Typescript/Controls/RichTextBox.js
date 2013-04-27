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
        var _RichTextBoxView = (function () {
            function _RichTextBoxView() { }
            return _RichTextBoxView;
        })();
        Controls._RichTextBoxView = _RichTextBoxView;        
        Nullstone.RegisterType(_RichTextBoxView, "_RichTextBoxView");
        var RichTextBox = (function (_super) {
            __extends(RichTextBox, _super);
            function RichTextBox() {
                _super.apply(this, arguments);

            }
            return RichTextBox;
        })(Controls.Control);
        Controls.RichTextBox = RichTextBox;        
        Nullstone.RegisterType(RichTextBox, "RichTextBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RichTextBox.js.map
