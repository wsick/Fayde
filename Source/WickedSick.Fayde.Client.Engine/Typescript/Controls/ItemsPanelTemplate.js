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
    (function (Controls) {
        var ItemsPanelTemplate = (function (_super) {
            __extends(ItemsPanelTemplate, _super);
            function ItemsPanelTemplate(json) {
                        _super.call(this);
                this._TempJson = json;
            }
            ItemsPanelTemplate.prototype._GetVisualTreeWithError = function (templateBindingSource, error) {
                if(this._TempJson) {
                    return Fayde.JsonParser.Parse(this._TempJson, templateBindingSource, new Fayde.NameScope());
                }
                return _super.prototype._GetVisualTreeWithError.call(this, templateBindingSource, error);
            };
            return ItemsPanelTemplate;
        })(Fayde.FrameworkTemplate);
        Controls.ItemsPanelTemplate = ItemsPanelTemplate;        
        Nullstone.RegisterType(ItemsPanelTemplate, "ItemsPanelTemplate");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemsPanelTemplate.js.map
