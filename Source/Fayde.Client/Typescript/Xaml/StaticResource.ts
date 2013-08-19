/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="MarkupExpressionParser.ts" />
/// <reference path="../Core/StaticResourceExpression.ts" />

module Fayde.Xaml {
    export class StaticResource implements IMarkup {
        ResourceKey: string;
        constructor(resourceKey?: string) {
            this.ResourceKey = resourceKey;
        }

        Parse(value: string) {
            this.ResourceKey = value;
        }
        Transmute(ctx: Xaml.IMarkupParseContext): Expression {
            return new StaticResourceExpression(this.ResourceKey, ctx.Owner, ctx.Property, ctx.TemplateBindingSource, ctx.ResourceChain);
        }
    }
    Fayde.RegisterType(StaticResource, {
        Name: "StaticResource",
        Namespace: "Fayde.Xaml",
        XmlNamespace: Fayde.XMLNS
    });
}