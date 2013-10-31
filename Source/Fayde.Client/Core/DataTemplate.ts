/// <reference path="../Xaml/XamlLoader.ts" />

module Fayde {
    export class DataTemplate extends Xaml.FrameworkTemplate {
        constructor() {
            super();
        }

        GetVisualTree(bindingSource?: DependencyObject): UIElement {
            var uie = <UIElement>super.GetVisualTree(bindingSource);
            return uie;
        }
    }
    Fayde.RegisterType(DataTemplate, {
    	Name: "DataTemplate",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}