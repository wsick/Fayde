/// <reference path="../Xaml/XamlLoader.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />

module Fayde {
    export class DataTemplate extends Xaml.FrameworkTemplate {
        private _Xaml: string;
        constructor(xaml: string) {
            super();
            this._Xaml = xaml;
        }

        GetVisualTree(templateBindingSource?: DependencyObject): UIElement {
            var xaml = this._Xaml;
            if (!xaml)
                throw new XamlParseException("DataTemplate has no definition.");
            var uie = <UIElement>this.Load(this._Xaml, templateBindingSource);
            if (!(uie instanceof UIElement))
                throw new XamlParseException("DataTemplate root visual is not a UIElement.");
            return uie;
        }
    }
    Fayde.RegisterType(DataTemplate, {
    	Name: "DataTemplate",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}