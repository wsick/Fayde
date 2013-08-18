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
                        IsSystem: false
                    };
                }
                isSystem = true;
            }
            var xarr = xmlNamespaces[xmlns];
            if (xarr) {
                var t = xarr[xmlname];
                if (t)
                    return { IsSystem: isSystem, IsPrimitive: false, Type: t };
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
    export function ConvertStringToType(val: string, type: Function): any {
        if (type instanceof Enum) {
            var enumo = (<Enum><any>type).Object;
            return enumo[val];
        }
        var converter: (val: string) => any = (<any>converters)[type];
        if (!converter)
            return val;
        return converter(val);
    }
    export function RegisterTypeConverter(type: Function, converter: (val: string) => any) {
        converters[type] = converter;
    }
}