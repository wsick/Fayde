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
    interface IParseHandlerData {
        all: string;
        remaining: string;
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
        var inKey = true;
        var inQuote = false;
        var inDoubleQuote = false;

        var binding = new Data.Binding();

        var remaining = val;
        var commai: number;
        var equali: number;
        var squigglyi: number;
        var curKey = "Path";
        while (remaining) {
            if (inKey) {
                commai = remaining.indexOf(",");
                equali = remaining.indexOf("=");
                if (equali === -1 || commai < equali) {
                    var path = (commai !== -1) ? remaining.substr(0, commai) : remaining;
                    binding.Path = new Data.PropertyPath(path);
                    remaining = remaining.substr(commai + 1);
                    inKey = true;
                } else {
                    curKey = remaining.substr(0, equali);
                    remaining = remaining.substr(equali + 1);
                    inKey = false;
                }
            } else {
                var strVal: string;
                var curVal: any = null;
                if (remaining[0] === "{") {
                    
                    //StaticResource, RelativeResource, x:Null, x:Type, x:Static
                } else {
                    commai = remaining.indexOf(",");
                    if (commai === -1) {
                        strVal = remaining;
                        remaining = "";
                    } else {
                        strVal = remaining.substr(0, commai);
                        remaining = remaining.substr(commai + 1);
                    }
                }
                setBindingProperty(binding, curKey, curVal, strVal);
                inKey = true;
            }
        }

        return binding;
    }
    function parseInnerExpression(data: IParseHandlerData): any {
        var rem = data.remaining;
        var len = rem.length;
        var i: number;
        var inQuote = false;
        var quoteTerm: string;
        for (i = 0; i < len; i++) {
            
        }
        data.remaining = rem.substr(i);
    }
    function setBindingProperty(binding: Data.Binding, key: string, oVal:any, strVal: string) {
        switch (key) {
            case "FallbackValue":
                break;
            case "Mode":
                break;
            case "Path":
                break;
            case "Source":
                break;
            case "BindsDirectlyToSource":
                break;
            case "StringFormat":
                break;
            case "Converter":
                break;
            case "ConverterCulture":
                break;
            case "ConverterParameter":
                break;
            case "NotifyOnValidationError":
                break;
            case "TargetNullValue":
                break;
            case "ValidatesOnExceptions":
                break;
            case "ValidatesOnDataErrors":
                break;
            case "ValidatesOnNotifyDataErrors":
                break;
            case "RelativeSource":
                break;
            case "ElementName":
                break;
            case "UpdateSourceTrigger":
                break;
            default:
                throw new Exception("Unknown property in Binding '" + key + "'.");
        }
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