/// <reference path="../Xaml/XamlLoader.ts" />

module Fayde.Controls {
    export class ItemsPanelTemplate extends Xaml.FrameworkTemplate {
        constructor() {
            super();
        }

        GetVisualTree(bindingSource: DependencyObject): Panel {
            var panel = <Panel>super.GetVisualTree(bindingSource);
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