/// <reference path="../Xaml/XamlLoader.ts" />

module Fayde {
    export class DataTemplate extends Xaml.FrameworkTemplate {
        TargetType: Function;

        constructor() {
            super();
        }

        GetVisualTree(bindingSource?: DependencyObject): UIElement {
            var uie = <UIElement>super.GetVisualTree(bindingSource);
            return uie;
        }
    }
    Fayde.RegisterType(DataTemplate, "Fayde", Fayde.XMLNS);
}