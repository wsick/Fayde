/// <reference path="Markup.ts" />
/// CODE
/// <reference path="../Core/TemplateBindingExpression.ts" />

module Fayde {
    export class TemplateBindingMarkup extends Markup {
        Path: string;
        constructor(path: string) {
            super();
            this.Path = path;
        }
        
        Transmute(target: XamlObject, propd: DependencyProperty, propName: string, templateBindingSource: DependencyObject, resChain: ResourceDictionary[]) {
            var sourcePropd = DependencyProperty.GetDependencyProperty((<any>templateBindingSource).constructor, this.Path);
            return new TemplateBindingExpression(sourcePropd, propd, propName);
        }
    }
    Nullstone.RegisterType(TemplateBindingMarkup, "TemplateBindingMarkup");
}