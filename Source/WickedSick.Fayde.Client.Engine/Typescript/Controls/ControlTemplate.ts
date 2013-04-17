/// <reference path="../Core/FrameworkTemplate.ts" />
/// CODE

module Fayde.Controls {
    export class ControlTemplate extends FrameworkTemplate {
        private _TempJson: any;
        private _ResChain: ResourceDictionary[];
        TargetType: Function;
        constructor(targetType: Function, json: any, resChain: ResourceDictionary[]) {
            super();
            Object.defineProperty(this, "TargetType", {
                value: targetType,
                writable: false
            });
            this._TempJson = json;
            this._ResChain = resChain;
        }
        _GetVisualTreeWithError(templateBindingSource: FrameworkElement, error: BError): XamlObject {
            if (this._TempJson)
                return Fayde.JsonParser.Parse(this._TempJson, templateBindingSource, new Fayde.NameScope(), this._ResChain);
            return super._GetVisualTreeWithError(templateBindingSource, error);
        }
    }
}