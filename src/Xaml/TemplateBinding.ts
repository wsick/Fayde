/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Xaml {
    export class TemplateBinding implements IMarkup {
        Property: string;
        constructor(property?: string) {
            this.Property = property;
        }

        Transmute(ctx: Xaml.ITransmuteContext): Expression {
            if (!ctx.TemplateBindingSource)
                throw new XamlParseException("{TemplateBinding} can only be used within a ControlTemplate.");
            var propd = DependencyProperty.GetDependencyProperty((<any>ctx.TemplateBindingSource).constructor, this.Property);
            return new TemplateBindingExpression(propd, ctx.Property);
        }
    }
    Fayde.RegisterType(TemplateBinding, "Fayde.Xaml", Fayde.XMLNS);
}