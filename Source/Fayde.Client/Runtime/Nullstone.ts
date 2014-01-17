/// <reference path="TypeManagement.ts" />

interface IOutValue {
    Value: any;
}
interface ICloneable {
    Clone(): any;
}

class Nullstone {
    static Equals(val1: any, val2: any): boolean {
        if (val1 == null && val2 == null)
            return true;
        if (val1 == null || val2 == null)
            return false;
        if (val1 === val2)
            return true;
        if (val1.Equals)
            return val1.Equals(val2);
        return false;
    }
    static DoesInheritFrom(t: IType, type: any): boolean {
        var temp = <Function><any>t;
        while (temp && temp !== type) {
            temp = Fayde.GetTypeParent(temp);
        }
        return temp != null;
    }
    static GetPropertyDescriptor(obj: any, name: string): PropertyDescriptor {
        if (!obj)
            return;
        var type: Function = (<any>obj).constructor;
        var propDesc = Object.getOwnPropertyDescriptor(type.prototype, name);
        if (propDesc)
            return propDesc;
        return Object.getOwnPropertyDescriptor(obj, name);
    }
    static HasProperty(obj: any, name: string): boolean {
        if (!obj)
            return false;
        if (obj.hasOwnProperty(name))
            return true;
        var type = obj.constructor;
        return type.prototype.hasOwnProperty(name);
    }
    static ImplementsInterface(obj: any, i: IInterfaceDeclaration): boolean {
        if (!obj)
            return false;
        var curType: any = obj.constructor;
        if (!curType)
            return false;
        var is: IInterfaceDeclaration[];
        do {
            is = curType.$$interfaces;
            if (!is)
                continue;
            if (is.indexOf(i) > -1)
                return true;
        } while (curType = Fayde.GetTypeParent(curType));
        return false;
    }
}

function NotImplemented(str: string) {
    if (window.console && console.warn)
        console.warn("NotImplemented: " + str);
}
function Warn(str: string) {
    if (window.console && console.warn)
        console.warn(str);
}