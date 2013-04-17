var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObject.ts" />
/// CODE
/// <reference path="NameScope.ts" />
/// <reference path="DependencyObject.ts" />
/// <reference path="ResourceDictionary.ts" />
/// <reference path="../Markup/JsonParser.ts" />
var Fayde;
(function (Fayde) {
    var ResourceTarget = (function (_super) {
        __extends(ResourceTarget, _super);
        function ResourceTarget(json, namescope, templateBindingSource, resChain) {
                _super.call(this);
            this._Json = json;
            this._Namescope = namescope;
            this._TemplateBindingSource = templateBindingSource;
            this._ResChain = resChain;
        }
        ResourceTarget.prototype.CreateResource = function () {
            return Fayde.JsonParser.Parse(this._Json, this._TemplateBindingSource, this._Namescope, this._ResChain);
        };
        return ResourceTarget;
    })(Fayde.XamlObject);
    Fayde.ResourceTarget = ResourceTarget;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ResourceTarget.js.map
