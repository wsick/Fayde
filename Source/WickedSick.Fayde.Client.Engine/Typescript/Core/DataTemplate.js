var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlNode.ts" />
/// <reference path="FrameworkTemplate.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />
/// <reference path="../Markup/JsonParser.ts" />
var Fayde;
(function (Fayde) {
    var DataTemplate = (function (_super) {
        __extends(DataTemplate, _super);
        function DataTemplate(json) {
                _super.call(this);
            this._TempJson = json;
        }
        DataTemplate.prototype.GetVisualTree = function (templateBindingSource) {
            var json = this._TempJson;
            if(!json) {
                throw new XamlParseException("DataTemplate has no definition.");
            }
            var ns = new Fayde.NameScope(true);
            var uie = Fayde.JsonParser.Parse(json, templateBindingSource, ns, this.ResChain);
            if(!(uie instanceof Fayde.UIElement)) {
                throw new XamlParseException("DataTemplate root visual is not a UIElement.");
            }
            uie.XamlNode.NameScope = ns;
            return uie;
        };
        return DataTemplate;
    })(Fayde.FrameworkTemplate);
    Fayde.DataTemplate = DataTemplate;    
    Nullstone.RegisterType(DataTemplate, "DataTemplate");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DataTemplate.js.map
