/// <reference path="Nullstone.js"/>
/// CODE

(function (namespace) {
    var PropertyInfo = Nullstone.Create("PropertyInfo");

    PropertyInfo.Find = function (typeOrObj, name) {
        var o = typeOrObj;
        var isType = typeOrObj instanceof Function;
        if (isType)
            o = new typeOrObj();

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
    };

    PropertyInfo.Instance.GetValue = function (ro) {
        if (this.GetFunc)
            return this.GetFunc.call(ro);

    };
    PropertyInfo.Instance.SetValue = function (ro, value) {
        if (this.SetFunc)
            this.SetFunc.call(ro, value);
    };

    namespace.PropertyInfo = Nullstone.FinishCreate(PropertyInfo);
})(window);

(function (namespace) {
    var IndexedPropertyInfo = Nullstone.Create("IndexedPropertyInfo");

    IndexedPropertyInfo.Find = function (typeOrObj) {
        var o = typeOrObj;
        var isType = typeOrObj instanceof Function;
        if (isType)
            o = new typeOrObj();

        if (o instanceof Array) {
            var pi = new IndexedPropertyInfo();
            pi.GetFunc = function (index) { return this[index]; };
            pi.SetFunc = function (index, value) { this[index] = value; };
            return pi;
        } else if (o instanceof Fayde.InternalCollection) {
            var pi = new IndexedPropertyInfo();
            pi.GetFunc = function (index) { return this.GetValueAt(index); };
            pi.SetFunc = function (index, value) { return this.SetValueAt(index, value); };
            return pi;
        }
    };

    IndexedPropertyInfo.Instance.GetValue = function (ro, index) {
        if (this.GetFunc)
            return this.GetFunc.call(ro, index);
    };
    IndexedPropertyInfo.Instance.SetValue = function (ro, index, value) {
        if (this.SetFunc)
            this.SetFunc.call(ro, index, value);
    };

    namespace.IndexedPropertyInfo = Nullstone.FinishCreate(IndexedPropertyInfo);
})(window);