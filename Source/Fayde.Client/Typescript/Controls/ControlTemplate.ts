/// <reference path="../Xaml/XamlLoader.ts" />

module Fayde.Controls {
    export class ControlTemplate extends Xaml.FrameworkTemplate {
        TargetType: Function;

        constructor() {
            super();
        }

        GetVisualTree(bindingSource: DependencyObject): UIElement {
            var uie = <UIElement>super.GetVisualTree(bindingSource);
            return uie;
        }
    }
    Fayde.RegisterType(ControlTemplate, {
    	Name: "ControlTemplate",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}