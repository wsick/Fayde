/// <reference path="../Core/FrameworkTemplate.ts" />
/// CODE
/// <reference path="../Markup/JsonParser.ts" />
/// <reference path="Panel.ts" />

module Fayde.Controls {
    export class ItemsPanelTemplate extends FrameworkTemplate {
        private _TempJson: any;
        constructor(json: any) {
            super();
            this._TempJson = json;
        }

        GetVisualTree(templateBindingSource: DependencyObject): Panel {
            var json = this._TempJson;
            if (!json)
                throw new XamlParseException("ItemsPanelTemplate has no definition.");
            var ns = new NameScope(true);
            var panel = <Panel>JsonParser.Parse(json, templateBindingSource, new NameScope(true), this.ResChain);
            if (!(panel instanceof Panel))
                throw new XamlParseException("The root element of an ItemsPanelTemplate must be a Panel subclass.");
            panel.XamlNode.NameScope = ns;
            return panel;
        }
    }
    Fayde.RegisterType(ItemsPanelTemplate, {
    	Name: "ItemsPanelTemplate",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}