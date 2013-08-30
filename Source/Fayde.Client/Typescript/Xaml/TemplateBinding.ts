/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="MarkupExpressionParser.ts" />
/// <reference path="../Core/TemplateBindingExpression.ts" />

module Fayde.Xaml {
    export class TemplateBinding extends Markup {
        Property: string;
        constructor(property?: string) {
            super();
            this.Property = property;
        }

        Transmute(ctx: Xaml.ITransmuteContext): Expression {
            if (!ctx.TemplateBindingSource)
                throw new XamlParseException("{TemplateBinding} can only be used within a ControlTemplate.");
            var propd = DependencyProperty.GetDependencyProperty((<any>ctx.TemplateBindingSource).constructor, this.Property);
            return new TemplateBindingExpression(propd, ctx.Property);
        }
    }
    Fayde.RegisterType(TemplateBinding, {
        Name: "TemplateBinding",
        Namespace: "Fayde.Xaml",
        XmlNamespace: Fayde.XMLNS
    });
}