interface IOutValue {
    Value: any;
}
interface ICloneable {
    Clone(): any;
}
class Nullstone {
    static RegisterType(type: Function, name: string) {
        var t: any = type;
        t._TypeName = name;
        t._BaseClass = Object.getPrototypeOf(type.prototype).constructor;
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
}