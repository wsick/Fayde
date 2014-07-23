
interface IPropertyInfo {
}


class PropertyInfo implements IPropertyInfo {
    GetFunc: () => any;
    SetFunc: (value: any) => any;

    GetValue(ro: any): any {
        if (this.GetFunc)
            return this.GetFunc.call(ro);

    }
    SetValue(ro: any, value: any) {
        if (this.SetFunc)
            this.SetFunc.call(ro, value);
    }

    static Find(typeOrObj, name: string): PropertyInfo {
        var o = typeOrObj;
        var isType = typeOrObj instanceof Function;
        if (isType)
            o = new typeOrObj();

        if (!(o instanceof Object))
            return null;

        var nameClosure = name;
        var propDesc = Nullstone.GetPropertyDescriptor(o, name);
        if (propDesc) {
            var pi = new PropertyInfo();
            pi.GetFunc = propDesc.get;
            if (!pi.GetFunc)
                pi.GetFunc = function () { return this[nameClosure]; }
            pi.SetFunc = propDesc.set;
            if (!pi.SetFunc && propDesc.writable)
                pi.SetFunc = function (value) { this[nameClosure] = value; }
            return pi;
        }

        var type = isType ? typeOrObj : typeOrObj.constructor;
        var pi = new PropertyInfo();
        pi.GetFunc = type.prototype["Get" + name];
        pi.SetFunc = type.prototype["Set" + name];
        return pi;
    }
}

class IndexedPropertyInfo implements IPropertyInfo {
    GetFunc: (index: number) => any;
    SetFunc: (index: number, value: any) => any;

    get PropertyType(): Function {
        //NotImplemented
        return undefined;
    }

    GetValue(ro: any, index: number): any {
        if (this.GetFunc)
            return this.GetFunc.call(ro, index);
    }
    SetValue(ro: any, index: number, value: any) {
        if (this.SetFunc)
            this.SetFunc.call(ro, index, value);
    }

    static Find(typeOrObj): IndexedPropertyInfo {
        var o = typeOrObj;
        var isType = typeOrObj instanceof Function;
        if (isType)
            o = new typeOrObj();

        if (o instanceof Array) {
            var pi = new IndexedPropertyInfo();
            pi.GetFunc = function (index) { return this[index]; };
            pi.SetFunc = function (index, value) { this[index] = value; };
            return pi;
        } else if (o instanceof Fayde.XamlObjectCollection) {
            var pi = new IndexedPropertyInfo();
            pi.GetFunc = function (index) { return this.GetValueAt(index); };
            pi.SetFunc = function (index, value) { return this.SetValueAt(index, value); };
            return pi;
        }
    }
}