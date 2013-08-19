/// <reference path="../Xaml/XamlLoader.ts" />
/// CODE
/// <reference path="Panel.ts" />

module Fayde.Controls {
    export class ItemsPanelTemplate extends Xaml.FrameworkTemplate {
        private _Xaml: string;
        constructor(xaml: string) {
            super();
            this._Xaml = xaml;
        }

        GetVisualTree(templateBindingSource: DependencyObject): Panel {
            var xaml = this._Xaml;
            if (!xaml)
                throw new XamlParseException("ItemsPanelTemplate has no definition.");
            var panel = <Panel>this.Load(xaml, templateBindingSource);
            if (!(panel instanceof Panel))
                throw new XamlParseException("The root element of an ItemsPanelTemplate must be a Panel subclass.");
            return panel;
        }
    }
    Fayde.RegisterType(ItemsPanelTemplate, {
        Name: "ItemsPanelTemplate",
        Namespace: "Fayde.Controls",
        XmlNamespace: Fayde.XMLNS
    });
}