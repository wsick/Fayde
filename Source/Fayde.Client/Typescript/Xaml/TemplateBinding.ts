/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="MarkupExpressionParser.ts" />
/// <reference path="../Core/TemplateBindingExpression.ts" />

module Fayde.Xaml {
    export class TemplateBinding implements IMarkup {
        Property: string;
        constructor(property?: string) {
            this.Property = property;
        }

        Parse(value: string) {
            this.Property = value;
        }
        Transmute(ctx: Xaml.IMarkupParseContext): Expression {
            var propd = DependencyProperty.GetDependencyProperty((<any>ctx.Owner).constructor, this.Property);
            return new TemplateBindingExpression(propd, ctx.Property);
        }
    }
    Fayde.RegisterType(TemplateBinding, {
        Name: "TemplateBinding",
        Namespace: "Fayde.Xaml",
        XmlNamespace: Fayde.XMLNS
    });
}