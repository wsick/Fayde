/// CODE
/// <reference path="../Runtime/TypeManagement.ts" />
/// <reference path="../Core/Expression.ts" />

module Fayde.Xaml {
    export interface IMarkupParseContext {
        Owner: DependencyObject;
        Property: DependencyProperty;
        ResourceChain: ResourceDictionary[];
        TemplateBindingSource: DependencyObject;
        Resolver: INamespacePrefixResolver;
    }
    export interface IMarkup {
        Parse(value: string);
        Transmute(ctx: IMarkupParseContext): Expression;
    }

    var EXPRESSION_REGEX = /\{([^\s]*)\s(.*)\}/;
    export class MarkupExpressionParser {
        static Parse(value: string, ctx: IMarkupParseContext): any {
            if (value && value.toLowerCase() === "{x:null}")
                return null;
            var result = EXPRESSION_REGEX.exec(value);
            var typeres: ITypeResolution;
            if (result[0] === "x:Type") {
                typeres = TypeResolver.ResolveFullyQualifiedName(result[1], ctx.Resolver);
                if (!typeres)
                    throw new XamlMarkupParseException("Could not resolve type '" + result[1] + "'");
            } else if (result[0] === "x:Static") {
                throw new NotSupportedException("{x:Static ...} is not currently supported.");
            }
            typeres = TypeResolver.ResolveFullyQualifiedName(result[0], ctx.Resolver);
            if (!typeres)
                throw new XamlMarkupParseException("Could not resolve type '" + result[0] + "'");
            var markup = <IMarkup>(new (<any>typeres.Type)());
            if (!markup.Transmute || !markup.Parse)
                throw new XamlMarkupParseException("Could not create expression from markup '" + value + "'");
            markup.Parse(result[1]);
            return markup.Transmute(ctx);
        }
    }
}