var PropertyInfo = (function () {
    function PropertyInfo() { }
    PropertyInfo.prototype.GetValue = function (ro) {
        if(this.GetFunc) {
            return this.GetFunc.call(ro);
        }
    };
    PropertyInfo.prototype.SetValue = function (ro, value) {
        if(this.SetFunc) {
            this.SetFunc.call(ro, value);
        }
    };
    PropertyInfo.Find = function Find(typeOrObj, name) {
        var o = typeOrObj;
        var isType = typeOrObj instanceof Function;
        if(isType) {
            o = new typeOrObj();
        }
        var nameClosure = name;
        var propDesc = Nullstone.GetPropertyDescriptor(o, name);
        if(propDesc) {
            var pi = new PropertyInfo();
            pi.GetFunc = propDesc.get;
            if(!pi.GetFunc) {
                pi.GetFunc = function () {
                    return this[nameClosure];
                };
            }
            pi.SetFunc = propDesc.set;
            if(!pi.SetFunc && propDesc.writable) {
                pi.SetFunc = function (value) {
                    this[nameClosure] = value;
                };
            }
            return pi;
        }
        var type = isType ? typeOrObj : typeOrObj.constructor;
        var pi = new PropertyInfo();
        pi.GetFunc = type.prototype["Get" + name];
        pi.SetFunc = type.prototype["Set" + name];
        return pi;
    };
    return PropertyInfo;
})();
var IndexedPropertyInfo = (function () {
    function IndexedPropertyInfo() { }
    Object.defineProperty(IndexedPropertyInfo.prototype, "PropertyType", {
        get: function () {
            //NotImplemented
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    IndexedPropertyInfo.prototype.GetValue = function (ro, index) {
        if(this.GetFunc) {
            return this.GetFunc.call(ro, index);
        }
    };
    IndexedPropertyInfo.prototype.SetValue = function (ro, index, value) {
        if(this.SetFunc) {
            this.SetFunc.call(ro, index, value);
        }
    };
    IndexedPropertyInfo.Find = function Find(typeOrObj) {
        var o = typeOrObj;
        var isType = typeOrObj instanceof Function;
        if(isType) {
            o = new typeOrObj();
        }
        if(o instanceof Array) {
            var pi = new IndexedPropertyInfo();
            pi.GetFunc = function (index) {
                return this[index];
            };
            pi.SetFunc = function (index, value) {
                this[index] = value;
            };
            return pi;
        } else if(o instanceof Fayde.XamlObjectCollection) {
            var pi = new IndexedPropertyInfo();
            pi.GetFunc = function (index) {
                return this.GetValueAt(index);
            };
            pi.SetFunc = function (index, value) {
                return this.SetValueAt(index, value);
            };
            return pi;
        }
    };
    return IndexedPropertyInfo;
})();
//@ sourceMappingURL=PropertyInfo.js.map
