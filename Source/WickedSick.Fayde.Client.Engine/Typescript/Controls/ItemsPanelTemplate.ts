/// <reference path="../Core/FrameworkTemplate.ts" />
/// CODE
/// <reference path="../Markup/JsonParser.ts" />

module Fayde.Controls {
    export class ItemsPanelTemplate extends FrameworkTemplate {
        private _TempJson: any;
        constructor(json: any) {
            super();
            this._TempJson = json;
        }
        private _GetVisualTreeWithError(templateBindingSource: DependencyObject, error: BError): XamlObject {
            if (this._TempJson)
                return JsonParser.Parse(this._TempJson, templateBindingSource, new NameScope());
            return super._GetVisualTreeWithError(templateBindingSource, error);
        }
    }
    Nullstone.RegisterType(ItemsPanelTemplate, "ItemsPanelTemplate");
}