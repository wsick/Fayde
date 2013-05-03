var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkTemplate.ts" />
    /// CODE
    /// <reference path="../Markup/JsonParser.ts" />
    /// <reference path="Panel.ts" />
    (function (Controls) {
        var ItemsPanelTemplate = (function (_super) {
            __extends(ItemsPanelTemplate, _super);
            function ItemsPanelTemplate(json) {
                        _super.call(this);
                this._TempJson = json;
            }
            ItemsPanelTemplate.prototype.GetVisualTree = function (templateBindingSource) {
                var json = this._TempJson;
                if(!json) {
                    throw new XamlParseException("ItemsPanelTemplate has no definition.");
                }
                var panel = Fayde.JsonParser.Parse(json, templateBindingSource, new Fayde.NameScope(true), this.ResChain);
                if(!(panel instanceof Controls.Panel)) {
                    throw new XamlParseException("The root element of an ItemsPanelTemplate must be a Panel subclass.");
                }
                return panel;
            };
            return ItemsPanelTemplate;
        })(Fayde.FrameworkTemplate);
        Controls.ItemsPanelTemplate = ItemsPanelTemplate;        
        Nullstone.RegisterType(ItemsPanelTemplate, "ItemsPanelTemplate");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemsPanelTemplate.js.map
