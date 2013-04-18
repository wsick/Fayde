var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkTemplate.ts" />
    /// CODE
    (function (Controls) {
        var ControlTemplate = (function (_super) {
            __extends(ControlTemplate, _super);
            function ControlTemplate(targetType, json, resChain) {
                        _super.call(this);
                Object.defineProperty(this, "TargetType", {
                    value: targetType,
                    writable: false
                });
                this._TempJson = json;
                this._ResChain = resChain;
            }
            ControlTemplate.prototype._GetVisualTreeWithError = function (templateBindingSource, error) {
                if(this._TempJson) {
                    return Fayde.JsonParser.Parse(this._TempJson, templateBindingSource, new Fayde.NameScope(), this._ResChain);
                }
                return _super.prototype._GetVisualTreeWithError.call(this, templateBindingSource, error);
            };
            return ControlTemplate;
        })(Fayde.FrameworkTemplate);
        Controls.ControlTemplate = ControlTemplate;        
        Nullstone.RegisterType(ControlTemplate, "ControlTemplate");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ControlTemplate.js.map
