
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

    export class Interface implements IInterfaceDeclaration {
        Name: string;
        constructor(name: string) {
            Object.defineProperty(this, "Name", { value: name, writable: false });
        }
    }

    export function RegisterType(type: Function, ns?: string, xmlns?: string) {
        if (ns) {
            Object.defineProperty(type, "$$ns", { value: ns, writable: false });
            var jarr = jsNamespaces[ns];
            if (!jarr) jarr = jsNamespaces[ns] = [];
            jarr[name] = type;
        }

        var bc = <Function>Object.getPrototypeOf(type.prototype).constructor;
        Object.defineProperty(type, "$$parent", { value: bc, writable: false });

        RegisterTypeName(type, xmlns);
    }
    export function RegisterTypeInterfaces(type: Function, interfaces: IInterfaceDeclaration[]) {
        if (!interfaces)
            return;
        for (var j = 0, len = interfaces.length; j < len; j++) {
            if (!interfaces[j]) {
                console.warn("Registering undefined interface on type.", type);
                break;
            }
        }
        Object.defineProperty(type, "$$interfaces", { value: interfaces, writable: false });
    }
    export function RegisterTypeName(type: Function, xmlns: string, localName?: string) {
        localName = localName || ensureFunctionName(type);

        if (!xmlns)
            return;
        Object.defineProperty(type, "$$xmlns", { value: xmlns, writable: false });
        var xarr = xmlNamespaces[xmlns];
        if (!xarr) xarr = xmlNamespaces[xmlns] = [];
        xarr[localName] = type;
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
        return new Interface(name);
    }
    var PRIMITIVE_MAPPINGS = [];
    PRIMITIVE_MAPPINGS["String"] = String;
    PRIMITIVE_MAPPINGS["Number"] = Number;
    PRIMITIVE_MAPPINGS["Date"] = Date;
    PRIMITIVE_MAPPINGS["RegExp"] = RegExp;
    PRIMITIVE_MAPPINGS["Array"] = Array;
    PRIMITIVE_MAPPINGS["Null"] = null;

    var ALIASES = [];
    ALIASES["Boolean"] = Boolean;
    ALIASES["Double"] = Number;

    var SIMPLES = [];
    SIMPLES["Color"] = true;
    SIMPLES["FontFamily"] = true;

    export interface ITypeResolution {
        IsPrimitive: boolean;
        IsSystem: boolean;
        IsSimple: boolean;
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
            return TypeResolver.GetAnnotation(t.$$parent, name);
        },
        Resolve: function (xmlns: string, xmlname: string): ITypeResolution {
            var isSystem = false;
            var isSimple = false;
            if (xmlns === Fayde.XMLNSX) {
                var mapping = PRIMITIVE_MAPPINGS[xmlname];
                if (mapping !== undefined) {
                    return {
                        Type: mapping,
                        IsPrimitive: true,
                        IsSystem: false,
                        IsSimple: false,
                        IsEnum: false
                    };
                }
                isSystem = true;
            } else if (xmlns === Fayde.XMLNS) {
                var alias = ALIASES[xmlname];
                if (alias !== undefined) {
                    return {
                        Type: alias,
                        IsPrimitive: true,
                        IsSystem: false,
                        IsSimple: false,
                        IsEnum: false
                    };
                }
                isSimple = SIMPLES[xmlname] === true;
            }
            var xarr = xmlNamespaces[xmlns];
            if (xarr) {
                var t = xarr[xmlname];
                if (t)
                    return { IsSystem: isSystem, IsPrimitive: false, IsSimple: isSimple, IsEnum: t.IsEnum === true, Type: t };
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
    converters[Boolean] = function (val: any): boolean {
        if (val == null)
            return null;
        if (typeof val === "boolean")
            return val;
        var c = val.toString().toUpperCase();
        return c === "TRUE" ? true : (c === "FALSE" ? false : null);
    }
    converters[String] = function (val: any): String {
        if (val == null) return "";
        return val.toString();
    }
    converters[Number] = function (val: any): Number {
        if (!val) return 0;
        if (typeof val === "number")
            return val;
        if (val instanceof Thickness)
            return (<Thickness>val).Left;
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
            if (enumo.Converter)
                return enumo.Converter(val);
            val = val || 0;
            if (typeof val === "string")
                return enumo[val];
            return val;
        }
        return val;
    }
    export function RegisterTypeConverter(type: Function, converter: (val: any) => any) {
        converters[type] = converter;
    }
    export function RegisterEnumConverter(e: any, converter: (val: any) => any) {
        e.Converter = converter;
    }


    function ensureFunctionName(type: Function): string {
        var t = <any>type;
        if (!t)
            return "";
        var name = t.name;
        if (name)
            return name;
        return t.name = t.toString().match(/function ([^\(]+)/);
    }
}