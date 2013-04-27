interface IOutValue {
    Value: any;
}
interface ICloneable {
    Clone(): any;
}
interface IInterfaceDeclaration {
    Name: string;
}
class Nullstone {
    static RegisterType(type: Function, name: string, interfaces?: IInterfaceDeclaration[]) {
        var t: any = type;
        t._TypeName = name;
        t._BaseClass = Object.getPrototypeOf(type.prototype).constructor;
        t._Interfaces = interfaces;
    }
    static Equals(val1: any, val2: any): bool {
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
    static DoesInheritFrom(t: Function, type: Function): bool {
        var temp = t;
        while (temp && temp !== type) {
            temp = (<any>temp)._BaseClass;
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
    static HasProperty(obj: any, name: string): bool {
        if (!obj)
            return false;
        if (obj.hasOwnProperty(name))
            return true;
        var type = obj.constructor;
        return type.prototype.hasOwnProperty(name);
    }

    static RegisterInterface(name: string): IInterfaceDeclaration {
        return { Name: name };
    }
    static ImplementsInterface(obj: any, i: IInterfaceDeclaration): bool {
        if (!obj)
            return false;
        var curType: any = obj.constructor;
        if (!curType)
            return false;
        var is: IInterfaceDeclaration[];
        do {
            is = curType._Interfaces;
            if (!is)
                continue;
            if (is.indexOf(i) > -1)
                return true;
        } while (curType = curType._BaseClass);
        return false;
    }
}