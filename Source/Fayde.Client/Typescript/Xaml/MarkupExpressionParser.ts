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
            if (value[value.length - 1] !== "}")
                return undefined;
            var result = EXPRESSION_REGEX.exec(value);
            var typeres: ITypeResolution;
            var r1 = "";
            var r2 = "";
            if (result) {
                r1 = result[1];
                r2 = result[2];
            } else {
                r1 = value.substr(1, value.length - 2);
            }
            if (r1 === "x:Type") {
                typeres = TypeResolver.ResolveFullyQualifiedName(r2, ctx.Resolver);
                if (!typeres)
                    throw new XamlMarkupParseException("Could not resolve type '" + r2 + "'");
            } else if (r1 === "x:Static") {
                throw new NotSupportedException("{x:Static ...} is not currently supported.");
            }
            typeres = TypeResolver.ResolveFullyQualifiedName(r1, ctx.Resolver);
            if (!typeres)
                throw new XamlMarkupParseException("Could not resolve type '" + r1 + "'");
            var markup = <IMarkup>(new (<any>typeres.Type)());
            if (!markup.Transmute || !markup.Parse)
                throw new XamlMarkupParseException("Could not create expression from markup '" + value + "'");
            markup.Parse(r2);
            return markup.Transmute(ctx);
        }
    }
}