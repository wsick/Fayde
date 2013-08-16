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
}

module Fayde {
    export var XMLNS = "http://schemas.wsick.com/fayde";
    export var XMLNSX = "http://schemas.wsick.com/fayde/x";

    export function Register(type: Function): ITypeRegistration {
        var itr = extendType(type);
        itr._BaseClass = <Function>Object.getPrototypeOf(type.prototype).constructor;
        return itr;
    }
    
    export function RegisterInterface(name: string): IInterfaceDeclaration {
        return { Name: name };
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
        return t;
    }
}