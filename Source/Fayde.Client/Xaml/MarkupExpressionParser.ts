
module Fayde.Xaml {
    export interface IMarkupParseContext {
        Owner: DependencyObject;
        Property: DependencyProperty;
        ResourceChain: ResourceDictionary[];
        TemplateBindingSource: DependencyObject;
        Resolver: INamespacePrefixResolver;
        ObjectStack: any[];
    }
    export interface ITransmuteContext {
        Owner: DependencyObject;
        Property: DependencyProperty;
        TemplateBindingSource: DependencyObject;
        ObjectStack: any[];
    }
    export interface IMarkup {
        Transmute(ctx: ITransmuteContext): Expression;
    }
    export var IMarkup_ = Fayde.RegisterInterface<IMarkup>("IMarkup");
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
                case "RelativeSource":
                    return parseRelativeSource(r2, ctx);
                case "EventBinding":
                    return parseEventBinding(r2, ctx);
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
                if (equali === -1 || (commai !== -1 && commai < equali)) {
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
                    curKey = remaining.substr(0, equali).trim();
                    remaining = remaining.substr(equali + 1);
                    inKey = false;
                }
            } else {
                var strVal: string;
                var curVal: any = undefined;
                if (remaining[0] === "{") {
                    var iev = parseInnerExpression(remaining, ctx);
                    remaining = iev.remaining;
                    if (remaining[0] === ",")
                        remaining = remaining.substr(1);
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
        return binding;
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
                if (squigglyCount === 0) {
                    i++;
                    break;
                }
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
    function parseStaticResource(key: string, ctx: IMarkupParseContext): any {
        var o: any;

        var rc = ctx.ResourceChain;
        var len = rc.length;
        for (var i = len - 1; i >= 0; i--) {
            o = rc[i].Get(key);
            if (o !== undefined)
                return o;
        }

        var objs = ctx.ObjectStack;
        len = objs.length;
        var cur: any;
        for (var i = len - 1; i >= 0; i--) {
            cur = objs[i];
            if (cur instanceof FrameworkElement) {
                o = (<FrameworkElement>cur).Resources.Get(key);
            } else if (cur instanceof Application) {
                o = (<Application>cur).Resources.Get(key);
            }
            if (o !== undefined)
                return o;
        }

        o = Application.Current.Resources.Get(key);
        if (o !== undefined)
            return o;

        throw new XamlParseException("Could not resolve StaticResource: '" + key + "'.");
    }
    function parseTemplateBinding(val: string, ctx: IMarkupParseContext): any {
        return new TemplateBinding(val);
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
    function parseEventBinding(val: string, ctx: IMarkupParseContext): any {
        var eb = new EventBinding();
        
        var inKey = true;
        var inQuote = false;
        var inDoubleQuote = false;
        var remaining = val;
        var commai: number;
        var equali: number;
        var squigglyi: number;
        var curKey = "Command";
        while (remaining) {
            if (inKey) {
                commai = remaining.indexOf(",");
                equali = remaining.indexOf("=");
                if (equali === -1 || (commai !== -1 && commai < equali)) {
                    var path: string;
                    if (commai !== -1) {
                        path = remaining.substr(0, commai);
                        remaining = remaining.substr(path.length + 1);
                    } else {
                        path = remaining;
                        remaining = "";
                    }
                    eventBindingPropertyFuncs["Command"](eb, "Command", undefined, path);
                    inKey = true;
                } else {
                    curKey = remaining.substr(0, equali).trim();
                    remaining = remaining.substr(equali + 1);
                    inKey = false;
                }
            } else {
                var strVal: string;
                var curVal: any = undefined;
                if (remaining[0] === "{") {
                    var iev = parseInnerExpression(remaining, ctx);
                    remaining = iev.remaining;
                    if (remaining[0] === ",")
                        remaining = remaining.substr(1);
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
                var propFunc = eventBindingPropertyFuncs[curKey];
                if (!propFunc)
                    throw new Exception("Unknown property in EventBinding '" + curKey + "'.");
                propFunc(eb, curKey, curVal, strVal);
                inKey = true;
            }
        }
        return eb;
    }

    interface IBindingPropertyFunc {
        (binding: Data.Binding, key: string, oVal: any, strVal: string);
    }
    var bindingPropertyFuncs: IBindingPropertyFunc[] = [];
    bindingPropertyFuncs["FallbackValue"] =
    bindingPropertyFuncs["ElementName"] =
    bindingPropertyFuncs["TargetNullValue"] =
    bindingPropertyFuncs["ConverterParameter"] =
    bindingPropertyFuncs["Source"] =
    bindingPropertyFuncs["StringFormat"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        if (oVal !== undefined) {
            binding[key] = oVal;
            return;
        }
        if (strVal[0] === "'" && strVal[strVal.length - 1] === "'")
            strVal = strVal.substr(1, strVal.length - 2);
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
        if (oVal != null && !(binding.Converter = Data.IValueConverter_.As(oVal)))
            throw new Exception("Binding Converter must implement IValueConverter.");
    };

    bindingPropertyFuncs["ConverterCulture"] = function (binding: Data.Binding, key: string, oVal: any, strVal: string) {
        throw new NotSupportedException("ConverterCulture");
    };


    interface IEventBindingPropertyFunc {
        (binding: EventBinding, key: string, oVal: any, strVal: string);
    }
    var eventBindingPropertyFuncs: IEventBindingPropertyFunc[] = [];
    eventBindingPropertyFuncs["Command"] = function (binding: EventBinding, key: string, oVal: any, strVal: string) {
        if (!oVal || typeof oVal === "string")
            binding.CommandBinding = new Data.Binding(strVal);
        else if (oVal instanceof Data.Binding)
            binding.CommandBinding = oVal;
    };
    eventBindingPropertyFuncs["CommandParameter"] = function (binding: EventBinding, key: string, oVal: any, strVal: string) {
        if (!oVal || typeof oVal === "string")
            binding.CommandParameterBinding = new Data.Binding(strVal);
        else if (oVal instanceof Data.Binding)
            binding.CommandParameterBinding = oVal;
    };
    eventBindingPropertyFuncs["Filter"] = function (binding: EventBinding, key: string, oVal: any, strVal: string) {
        if (oVal != null && !(binding.Filter = Fayde.IEventFilter_.As(oVal)))
            throw new Exception("EventBinding Filter must implement IEventFilter.");
    };
}