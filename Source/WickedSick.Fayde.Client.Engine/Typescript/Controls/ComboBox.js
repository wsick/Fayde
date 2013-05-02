var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/Selector.ts" />
    /// CODE
    (function (Controls) {
        var ComboBox = (function (_super) {
            __extends(ComboBox, _super);
            function ComboBox() {
                _super.apply(this, arguments);

            }
            return ComboBox;
        })(Controls.Primitives.Selector);
        Controls.ComboBox = ComboBox;        
        Nullstone.RegisterType(ComboBox, "ComboBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ComboBox.js.map
