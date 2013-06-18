/// <reference path="XamlObject.ts" />
/// CODE
/// <reference path="NameScope.ts" />
/// <reference path="DependencyObject.ts" />
/// <reference path="ResourceDictionary.ts" />
/// <reference path="../Markup/JsonParser.ts" />

module Fayde {
    export class ResourceTarget extends XamlObject {
        private _Json: any;
        private _Namescope: NameScope;
        private _TemplateBindingSource: DependencyObject;
        private _ResChain: ResourceDictionary[];
        constructor(json: any, namescope: NameScope, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]) {
            super();
            this._Json = json;
            this._Namescope = namescope;
            this._TemplateBindingSource = templateBindingSource;
            this._ResChain = resChain;
        }
        CreateResource(): XamlObject {
            return JsonParser.Parse(this._Json, this._TemplateBindingSource, this._Namescope, this._ResChain);
        }
    }
    Nullstone.RegisterType(ResourceTarget, "ResourceTarget");
}