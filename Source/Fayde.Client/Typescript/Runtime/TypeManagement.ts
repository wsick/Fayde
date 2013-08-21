/// CODE

interface IInterfaceDeclaration extends IType {
    Name: string;
}
interface IType {
}

module Fayde {
    export var XMLNS = "http://schemas.wsick.com/fayde";
    export var XMLNSX = "http://schemas.wsick.com/fayde/x";

    var jsNamespaces: any[][] = [];
    var xmlNamespaces: any[][] = [];

    export function RegisterType(type: Function, reg: any) {
        var t = <any>type;

        var name = reg.Name;
        if (!name)
            throw new Error("Type Name not specified.");
        var ns = reg.Namespace;
        if (!ns)
            throw new Error("Type Namespace not specified.");

        var xn = reg.XmlNamespace;
        if (!xn) xn = "";
        
        var i = reg.Interfaces;
        if (!i) i = [];

        var bc = <Function>Object.getPrototypeOf(type.prototype).constructor;

        Object.defineProperty(t, "_BaseClass", { value: bc, writable: false });
        Object.defineProperty(t, "_TypeName", { value: name, writable: false });
        Object.defineProperty(t, "_JsNamespace", { value: ns, writable: false });
        Object.defineProperty(t, "_XmlNamespace", { value: xn, writable: false });
        Object.defineProperty(t, "_Interfaces", { value: i, writable: false });

        var jarr = jsNamespaces[ns];
        if (!jarr) jarr = jsNamespaces[ns] = [];
        jarr[name] = t;

        if (xn) {
            var xarr = xmlNamespaces[xn];
            if (!xarr) xarr = xmlNamespaces[xn] = [];
            xarr[name] = t;
        }
    }
    export function RegisterEnum(e: any, reg: any) {
        var name = reg.Name;
        var ns = reg.Namespace;
        var xn = reg.XmlNamespace;

        e.IsEnum = true;

        var jarr = jsNamespaces[ns];
        if (!jarr) jarr = jsNamespaces[ns] = [];
        jarr[name] = e;

        if (xn) {
            var xarr = xmlNamespaces[xn];
            if (!xarr) xarr = xmlNamespaces[xn] = [];
            xarr[name] = e;
        }
    }
    export function RegisterInterface(name: string): IInterfaceDeclaration {
        return { Name: name };
    }
    var PRIMITIVE_MAPPINGS = [];
    PRIMITIVE_MAPPINGS["String"] = String;
    PRIMITIVE_MAPPINGS["Number"] = Number;
    PRIMITIVE_MAPPINGS["Date"] = Date;
    PRIMITIVE_MAPPINGS["RegExp"] = RegExp;
    PRIMITIVE_MAPPINGS["Array"] = Array;
    PRIMITIVE_MAPPINGS["Null"] = null;

    export interface ITypeResolution {
        IsPrimitive: boolean;
        IsSystem: boolean;
        IsEnum: boolean;
        Type: Function;
    }
    export interface INamespacePrefixResolver {
        lookupNamespaceURI(prefix: string): string;
    }
    export interface ITypeResolver {
        GetAnnotation(type: Function, name: string): any;
        Resolve(xmlns: string, xmlname: string): ITypeResolution;
        ResolveFullyQualifiedName(xmlname: string, resolver: INamespacePrefixResolver): ITypeResolution;
    }
    export var TypeResolver: ITypeResolver = {
        GetAnnotation: function (type: Function, name: string): any {
            if (!type)
                return;
            var t = <any>type;
            var anns = (<any>t).Annotations;
            var annotation: any;
            if (anns && (annotation = anns[name]))
                return annotation;
            return TypeResolver.GetAnnotation(t._BaseClass, name);
        },
        Resolve: function (xmlns: string, xmlname: string): ITypeResolution {
            var isSystem = false;
            if (xmlns === Fayde.XMLNSX) {
                var mapping = PRIMITIVE_MAPPINGS[xmlname];
                if (mapping !== undefined) {
                    return {
                        Type: mapping,
                        IsPrimitive: true,
                        IsSystem: false,
                        IsEnum: false
                    };
                }
                isSystem = true;
            }
            var xarr = xmlNamespaces[xmlns];
            if (xarr) {
                var t = xarr[xmlname];
                if (t)
                    return { IsSystem: isSystem, IsPrimitive: false, IsEnum: t.IsEnum === true, Type: t };
            }
            return undefined;
        },
        ResolveFullyQualifiedName: function (xmlname: string, resolver: INamespacePrefixResolver): ITypeResolution {
            var ns = Fayde.XMLNS;
            var typeName = xmlname;
            var tokens = xmlname.split(":");
            if (tokens.length === 2) {
                ns = resolver.lookupNamespaceURI(tokens[0]);
                typeName = tokens[1];
            }
            return TypeResolver.Resolve(ns, typeName);
        }
    }

    var converters: any = [];
    converters[String] = function (val: any): String {
        if (val == null) return "";
        return val.toString();
    }
    converters[Number] = function (val: any): Number {
        if (!val) return 0;
        if (typeof val === "number")
            return val;
        return parseFloat(val.toString());
    }
    converters[Date] = function (val: any): Date {
        if (val == null)
            return new Date(0);
        return new Date(val.toString());
    }
    converters[RegExp] = function (val: any): RegExp {
        if (val instanceof RegExp)
            return val;
        if (val = null)
            throw new XamlParseException("Cannot specify an empty RegExp.");
        val = val.toString();
        return new RegExp(val);
    }
    export function ConvertAnyToType(val: any, type: Function): any {
        var converter: (val: any) => any = (<any>converters)[type];
        if (converter)
            return converter(val);
        if (type instanceof Enum) {
            var enumo = (<Enum><any>type).Object;
            return enumo[val];
        }
        return val;
    }
    export function RegisterTypeConverter(type: Function, converter: (val: any) => any) {
        converters[type] = converter;
    }
}