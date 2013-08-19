/// <reference path="../Xaml/XamlLoader.ts" />
/// CODE
/// <reference path="../Core/UIElement.ts" />

module Fayde.Controls {
    export class ControlTemplate extends Xaml.FrameworkTemplate {
        private _Xaml: string;
        TargetType: Function;

        constructor(targetType: Function, xaml:string) {
            super();
            if (!targetType)
                throw new XamlParseException("ControlTemplate must have a TargetType.");
            Object.defineProperty(this, "TargetType", {
                value: targetType,
                writable: false
            });
            this._Xaml = xaml;
        }

        GetVisualTree(templateBindingSource: DependencyObject): UIElement {
            var xaml = this._Xaml;
            if (!xaml)
                throw new XamlParseException("ControlTemplate has no definition.");
            var uie = <UIElement>this.Load(this._Xaml, templateBindingSource);
            if (!(uie instanceof UIElement))
                throw new XamlParseException("ControlTemplate root visual is not a UIElement.");
            return uie;
        }
    }
    Fayde.RegisterType(ControlTemplate, {
    	Name: "ControlTemplate",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}