/// <reference path="FrameworkTemplate.ts" />
/// CODE
/// <reference path="ResourceDictionary.ts" />
/// <reference path="FrameworkElement.ts" />
/// <reference path="../Markup/JsonParser.ts" />

module Fayde {
    export class DataTemplate extends FrameworkTemplate {
        private _TempJson: any;
        private _ResChain: ResourceDictionary[];
        constructor(json: any, resChain: ResourceDictionary[]) {
            super();
            this._TempJson = json;
            this._ResChain = resChain;
        }

        _GetVisualTreeWithError(templateBindingSource: FrameworkElement, error: BError): XamlObject {
            if (this._TempJson)
                return JsonParser.Parse(this._TempJson, templateBindingSource);
            return super._GetVisualTreeWithError(templateBindingSource, error);
        }
    }
    Nullstone.RegisterType(DataTemplate, "DataTemplate");
}