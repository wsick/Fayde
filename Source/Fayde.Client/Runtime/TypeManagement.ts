
interface IInterfaceDeclaration<T> extends IType {
    Name: string;
    Is(o: any): boolean;
    As(o: any): T;
}
interface IType {
}

module Fayde {
    export var XMLNS = "http://schemas.wsick.com/fayde";
    export var XMLNSX = "http://schemas.wsick.com/fayde/x";

    var jsNamespaces: any[][] = [];
    var xmlNamespaces: any[][] = [];

    export class Interface<T> implements IInterfaceDeclaration<T> {
        Name: string;
        constructor(name: string) {
            Object.defineProperty(this, "Name", { value: name, writable: false });
        }
        Is(o: any): boolean {
            if (!o)
                return false;
            var type = o.constructor;
            while (type) {
                var is: IInterfaceDeclaration<any>[] = type.$$interfaces;
                if (is && is.indexOf(this) > -1)
                    return true;
                type = GetTypeParent(type);
            }
            return false;
        }
        As(o: any): T {
            if (!this.Is(o))
                return;
            return <T>o;
        }
    }

    export function RegisterType(type: Function, ns?: string, xmlns?: string) {
        if (ns) {
            Object.defineProperty(type, "$$ns", { value: ns, writable: false });
            var jarr = jsNamespaces[ns];
            if (!jarr) jarr = jsNamespaces[ns] = [];
            jarr[name] = type;
        }

        RegisterTypeName(type, xmlns);
    }
    export function RegisterTypeInterfaces(type: Function, ...interfaces: IInterfaceDeclaration<any>[]) {
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
        localName = localName || GetTypeName(type);

        if (!xmlns)
            return;
        Object.defineProperty(type, "$$xmlns", { value: xmlns, writable: false });
        var xarr = xmlNamespaces[xmlns];
        if (!xarr) xarr = xmlNamespaces[xmlns] = [];
        xarr[localName] = type;
    }
    export function GetTypeName(type: Function): string {
        var t = <any>type;
        if (!t)
            return "";
        var name = t.name;
        if (name)
            return name;
        var name = t.toString().match(/function ([^\(]+)/)[1];
        Object.defineProperty(t, "name", { enumerable: false, value: name, writable: false });
        return name;
    }
    export function GetTypeParent(type: Function): Function {
        if (type === Object)
            return null;
        var p = (<any>type).$$parent;
        if (!p) {
            p = <Function>Object.getPrototypeOf(type.prototype).constructor;
            Object.defineProperty(type, "$$parent", { value: p, writable: false });
        }
        return p;
    }

    export function RegisterEnum(e: any, name: string, xmlns?: string) {
        Object.defineProperty(e, "$$enum", { value: true, writable: false });
        e.name = name;

        if (!xmlns)
            return;
        Object.defineProperty(e, "$$xmlns", { value: xmlns, writable: false });
        var xarr = xmlNamespaces[xmlns];
        if (!xarr) xarr = xmlNamespaces[xmlns] = [];
        xarr[name] = e;
    }
    export function RegisterInterface<T>(name: string): IInterfaceDeclaration<T> {
        return new Interface<T>(name);
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
        Resolve(xmlns: string, xmlname: string): ITypeResolution;
        ResolveFullyQualifiedName(xmlname: string, resolver: INamespacePrefixResolver): ITypeResolution;
    }
    export var TypeResolver: ITypeResolver = {
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
            var t: any;
            var xarr = xmlNamespaces[xmlns];
            if (xarr)
                t = xarr[xmlname];
            t = t || Library.TryGetClass(xmlns, xmlname) || tryGetRequireClass(xmlns, xmlname);
            if (t)
                return { IsSystem: isSystem, IsPrimitive: false, IsSimple: isSimple, IsEnum: t.$$enum === true, Type: t };
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

    function tryGetRequireClass(xmlns: string, xmlname: string): any {
        var format = xmlns + "/" + xmlname;
        return require(format);
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
}