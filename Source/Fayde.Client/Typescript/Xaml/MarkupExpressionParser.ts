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
    interface IInnerExpressionValue {
        strVal: string;
        objVal: string;
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
                    return parseXStatic(r2, ctx);
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
    function parseXStatic(val: string, ctx: IMarkupParseContext): any {
        return new Function("return (" + val + ")")();
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
                    var path: string;
                    if (commai !== -1) {
                        path = remaining.substr(0, commai);
                        remaining = remaining.substr(path.length + 1);
                    } else {
                        path = remaining;
                        remaining = "";
                    }
                    bindingPropertyFuncs["Path"](binding, "Path", undefined, path);
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
                    var iev = parseInnerExpression(remaining, ctx);
                    remaining = iev.remaining;
                    strVal = iev.strVal;
                    curVal = iev.objVal;
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
                var propFunc = bindingPropertyFuncs[curKey];
                if (!propFunc)
                    throw new Exception("Unknown property in Binding '" + curKey + "'.");
                propFunc(binding, curKey, curVal, strVal);
                inKey = true;
            }
        }

        return binding.Transmute(ctx);
    }
    function parseInnerExpression(val: string, ctx: IMarkupParseContext): IInnerExpressionValue {
        var len = val.length;
        var i: number;
        var inQuote = false;
        var quoteTerm: string;
        var c: string;
        var squigglyCount = 0;
        for (i = 0; i < len; i++) {
            c = val[i];
            if (inQuote) {
                if (c === quoteTerm) {
                    if (val[i - 1] === "\\")
                        i++;
                    else
                        inQuote = false;
                }
            } else if (c === "'" || c === "\"") {
                inQuote = true;
                quoteTerm = c;
            } else if (c === "{") {
                squigglyCount++;
            } else if (c === "}") {
                squigglyCount--;
                if (squigglyCount === 0)
                    break;
            }
        }
        if (inQuote)
            throw new Exception("Unterminated string constant.");
        if (squigglyCount > 0)
            throw new Exception("Unterminated bracket.");
        var rv: IInnerExpressionValue = {
            strVal: val.substr(0, i),
            objVal: null,
            remaining: val.substr(i)
        };
        rv.objVal = MarkupExpressionParser.Parse(rv.strVal, ctx);
        return rv;
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
        var tokens = val.split(",");
        var len = tokens.length;
        var rs = new Data.RelativeSource();
        var key: string;
        var value: string;
        for (var i = 0; i < len; i++) {
            var kvp = tokens[i].split("=");
            if (kvp.length === 1) {
                key = "Mode";
                value = kvp[0];
            } else {
                key = kvp[0];
                value = kvp[1];
            }
            switch (key) {
                case "Mode":
                    rs.Mode = Data.RelativeSourceMode[value];
                    if (rs.Mode == null) rs.Mode = Data.RelativeSourceMode.Self;
                    break;
                case "AncestorLevel":
                    rs.AncestorLevel = parseInt(value);
                    if (isNaN(rs.AncestorLevel)) rs.AncestorLevel = 1;
                    break;
                case "AncestorType":
                    var typeres = TypeResolver.ResolveFullyQualifiedName(value, ctx.Resolver);
                    if (!typeres)
                        throw new Exception("Could not resolve type '" + value + "'.");
                    rs.AncestorType = typeres.Type;
                    break;
            }
        }
        return rs;
    }


    var bindingPropertyFuncs: { (binding: Data.Binding, key: string, oVal: any, strVal: string): void }[] = [];
    bindingPropertyFuncs["FallbackValue"] =
    bindingPropertyFuncs["ElementName"] =
    bindingPropertyFuncs["TargetNullValue"] =
    bindingPropertyFuncs["ConverterParameter"] =
    bindingPropertyFuncs["Source"] =
    bindingPropertyFuncs["StringFormat"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        if (oVal !== undefined)
            binding[key] = oVal;
        else
            binding[key] = strVal;
    };

    bindingPropertyFuncs["BindsDirectlyToSource"] =
    bindingPropertyFuncs["NotifyOnValidationError"] =
    bindingPropertyFuncs["ValidatesOnExceptions"] =
    bindingPropertyFuncs["ValidatesOnDataErrors"] =
    bindingPropertyFuncs["ValidatesOnNotifyDataErrors"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        var val = oVal;
        if (val === undefined) val = strVal;
        if (!val)
            return;
        val = val.toString().toLowerCase();
        if (val === "true") {
            binding[key] = true;
        } else if (val === "false") {
            binding[key] = false;
        } else {
            throw new Exception("Invalid boolean value for '" + key + "'.");
        }
    };

    bindingPropertyFuncs["Mode"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        var mode = Data.BindingMode[strVal];
        if (mode == null) mode = Data.BindingMode.OneWay;
        binding.Mode = mode;
    };

    bindingPropertyFuncs["UpdateSourceTrigger"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        var ust = Data.UpdateSourceTrigger[strVal];
        if (ust == null) Data.UpdateSourceTrigger.Default;
        binding.UpdateSourceTrigger = ust;
    };

    bindingPropertyFuncs["Path"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        if (!strVal)
            return;
        binding.Path = new Data.PropertyPath(strVal);
    };

    bindingPropertyFuncs["RelativeSource"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        if (!(oVal instanceof Data.RelativeSource))
            throw new Exception("RelativeSource value must be a RelativeSource.");
        binding.RelativeSource = <Data.RelativeSource>oVal;
    };

    bindingPropertyFuncs["Converter"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        var vc = oVal;
        if (!Nullstone.ImplementsInterface(oVal, Data.IValueConverter_))
            throw new Exception("Binding Converter must be implement IValueConverter.");
        binding.Converter = vc;
    };

    bindingPropertyFuncs["ConverterCulture"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        throw new NotSupportedException("ConverterCulture");
    };
    return bindingPropertyFuncs;
}