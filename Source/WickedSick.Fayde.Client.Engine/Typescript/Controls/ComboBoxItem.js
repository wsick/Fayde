var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ListBoxItem.ts" />
    /// CODE
    /// <reference path="ComboBox.ts" />
    (function (Controls) {
        var ComboBoxItem = (function (_super) {
            __extends(ComboBoxItem, _super);
            function ComboBoxItem() {
                        _super.call(this);
                this.DefaultStyleKey = (this).constructor;
            }
            ComboBoxItem.prototype.OnMouseLeftButtonUp = function (e) {
                _super.prototype.OnMouseLeftButtonUp.call(this, e);
                if(this.ParentSelector instanceof Controls.ComboBox) {
                    (this.ParentSelector).IsDropDownOpen = false;
                }
            };
            return ComboBoxItem;
        })(Controls.ListBoxItem);
        Controls.ComboBoxItem = ComboBoxItem;        
        Nullstone.RegisterType(ComboBoxItem, "ComboBoxItem");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ComboBoxItem.js.map
