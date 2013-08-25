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
            switch (r1) {
                case "x:Type":
                    return parseXType(r2, ctx);
                case "x:Static":
                    return parseStatic(r2, ctx);
                case "Binding":
                    return parseBinding(r2, ctx);
                case "StaticResource":
                    return parseStaticResource(r2, ctx);
                case "TemplateBinding":
                    return parseTemplateBinding(r2, ctx);
                default:
                    return undefined;
            }
        }
    }

    function parseXType(val: string, ctx: IMarkupParseContext): any {
        var typeres = TypeResolver.ResolveFullyQualifiedName(val, ctx.Resolver);
        if (!typeres)
            throw new XamlMarkupParseException("Could not resolve type '" + val + "'");
        return typeres.Type;
    }
    function parseStatic(val: string, ctx: IMarkupParseContext): any {
        throw new NotSupportedException("{x:Static ...} is not currently supported.");
    }
    function parseBinding(val: string, ctx: IMarkupParseContext): any {
        throw new NotSupportedException("{Binding ...} is not currently supported.");
    }
    function parseStaticResource(val: string, ctx: IMarkupParseContext): any {
        var sr = new StaticResource(val);
        return sr.Transmute(ctx);
    }
    function parseTemplateBinding(val: string, ctx: IMarkupParseContext): any {
        var tb = new TemplateBinding(val);
        return tb.Transmute(ctx);
    }
    function parseRelativeSource(val: string, ctx: IMarkupParseContext): any {
        throw new NotSupportedException("{RelativeSource} is not currently supported.");
    }
}