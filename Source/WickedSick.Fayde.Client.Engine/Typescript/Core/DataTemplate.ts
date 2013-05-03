/// <reference path="XamlNode.ts" />
/// <reference path="FrameworkTemplate.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />
/// <reference path="../Markup/JsonParser.ts" />

module Fayde {
    export class DataTemplate extends FrameworkTemplate {
        private _TempJson: any;
        constructor(json: any) {
            super();
            this._TempJson = json;
        }

        GetVisualTree(templateBindingSource?: DependencyObject): UIElement {
            var json = this._TempJson;
            if (!json)
                throw new XamlParseException("DataTemplate has no definition.");
            var uie = <UIElement>JsonParser.Parse(json, templateBindingSource, new NameScope(true), this.ResChain);
            if (!(uie instanceof UIElement))
                throw new XamlParseException("DataTemplate root visual is not a UIElement.");
            return uie;
        }
    }
    Nullstone.RegisterType(DataTemplate, "DataTemplate");
}