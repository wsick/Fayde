var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="FrameworkTemplate.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var DataTemplate = (function (_super) {
        __extends(DataTemplate, _super);
        function DataTemplate(json, resChain) {
                _super.call(this);
            this._TempJson = json;
            this._ResChain = resChain;
        }
        DataTemplate.prototype._GetVisualTreeWithError = function (templateBindingSource, error) {
            if(this._TempJson) {
                return Fayde.JsonParser.Parse(this._TempJson, templateBindingSource);
            }
            return _super.prototype._GetVisualTreeWithError.call(this, templateBindingSource, error);
        };
        return DataTemplate;
    })(Fayde.FrameworkTemplate);
    Fayde.DataTemplate = DataTemplate;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DataTemplate.js.map
