/// <reference path="../Core/FrameworkTemplate.ts" />
/// CODE
/// <reference path="../Markup/JsonParser.ts" />
/// <reference path="../Core/UIElement.ts" />

module Fayde.Controls {
    export class ControlTemplate extends FrameworkTemplate {
        private _TempJson: any;
        TargetType: Function;

        constructor(targetType: Function, json: any) {
            super();
            if (!targetType)
                throw new XamlParseException("ControlTemplate must have a TargetType.");
            Object.defineProperty(this, "TargetType", {
                value: targetType,
                writable: false
            });
            this._TempJson = json;
        }

        GetVisualTree(templateBindingSource: DependencyObject): UIElement {
            var json = this._TempJson;
            if (!json)
                throw new XamlParseException("ControlTemplate has no definition.");
            var uie = <UIElement>JsonParser.Parse(json, templateBindingSource, new NameScope(true), this.ResChain);
            if (!(uie instanceof UIElement))
                throw new XamlParseException("ControlTemplate root visual is not a UIElement.");
            return uie;
        }
    }
    Nullstone.RegisterType(ControlTemplate, "ControlTemplate");
}