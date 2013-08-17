interface IInterfaceDeclaration extends IType {
    Name: string;
}
interface IType {
}
interface ITypeRegistration extends Function, IType {
    _JsNamespace: string;
    _XmlNamespace: string;
    _TypeName: string;
    _BaseClass: Function;
    _Interfaces: IInterfaceDeclaration[];

    Namespace(jsNamespace: string, xmlNamespace?: string): ITypeRegistration;
    Name(name: string): ITypeRegistration;
    Interface(inter: IInterfaceDeclaration): ITypeRegistration;
    Register();
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

    export function Declare(type: Function): ITypeRegistration {
        var itr = extendType(type);
        itr._BaseClass = <Function>Object.getPrototypeOf(type.prototype).constructor;
        return itr;
    }

    function extendType(type: Function): ITypeRegistration {
        var t = <ITypeRegistration>type;
        Object.defineProperty(t, "_Interfaces", { value: [], writable: false });
        t.Namespace = function (jsNamespace: string, xmlNamespace?: string): ITypeRegistration {
            Object.defineProperty(t, "_JsNamespace", { value: jsNamespace, writable: false });
            Object.defineProperty(t, "_XmlNamespace", { value: xmlNamespace, writable: false });
            return t;
        };
        t.Name = function (typeName: string): ITypeRegistration {
            Object.defineProperty(t, "_TypeName", { value: typeName, writable: false });
            return t;
        };
        t.Interface = function (inter: IInterfaceDeclaration): ITypeRegistration {
            t._Interfaces.push(inter);
            return t;
        };
        t.Register = function () {
            var jarr = jsNamespaces[t._JsNamespace];
            if (!jarr) jarr = jsNamespaces[t._JsNamespace] = [];
            jarr[t._TypeName] = t;

            var xarr = xmlNamespaces[t._XmlNamespace];
            if (!xarr) xarr = xmlNamespaces[t._XmlNamespace] = [];
            xarr[t._TypeName] = t;
        };
        return t;
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
        Type: Function;
    }
    export interface ITypeResolver {
        GetAnnotation(type: Function, name: string): any;
        Resolve(xmlns: string, xmlname: string): ITypeResolution;
    }
    export var TypeResolver: ITypeResolver = {
        GetAnnotation: function (type: Function, name: string): any {
            if (!type)
                return;
            var t = <ITypeRegistration>type;
            var anns = (<any>t).Annotations;
            var annotation: any;
            if (anns && (annotation = anns[name]))
                return annotation;
            return this.GetAnnotationMember(t._BaseClass, name);
        },
        Resolve: function (xmlns: string, xmlname: string): ITypeResolution {
            if (xmlns === Fayde.XMLNSX) {
                var mapping = PRIMITIVE_MAPPINGS[xmlname];
                if (mapping !== undefined) {
                    return {
                        Type: mapping,
                        IsPrimitive: true
                    };
                }
            }
            var xarr = xmlNamespaces[xmlns];
            if (xarr) {
                var t = xarr[xmlname];
                if (t)
                    return { IsPrimitive: false, Type: t };
            }
            return undefined;
        }
    }
}