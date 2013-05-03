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
    /// <reference path="../Core/UIElement.ts" />
    (function (Controls) {
        var ControlTemplate = (function (_super) {
            __extends(ControlTemplate, _super);
            function ControlTemplate(targetType, json) {
                        _super.call(this);
                if(!targetType) {
                    throw new XamlParseException("ControlTemplate must have a TargetType.");
                }
                Object.defineProperty(this, "TargetType", {
                    value: targetType,
                    writable: false
                });
                this._TempJson = json;
            }
            ControlTemplate.prototype.GetVisualTree = function (templateBindingSource) {
                var json = this._TempJson;
                if(!json) {
                    throw new XamlParseException("ControlTemplate has no definition.");
                }
                var uie = Fayde.JsonParser.Parse(json, templateBindingSource, new Fayde.NameScope(true), this.ResChain);
                if(!(uie instanceof Fayde.UIElement)) {
                    throw new XamlParseException("ControlTemplate root visual is not a UIElement.");
                }
                return uie;
            };
            return ControlTemplate;
        })(Fayde.FrameworkTemplate);
        Controls.ControlTemplate = ControlTemplate;        
        Nullstone.RegisterType(ControlTemplate, "ControlTemplate");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ControlTemplate.js.map
