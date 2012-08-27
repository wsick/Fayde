/// <reference path="JsEx.js"/>
/// <reference path="Enum.js"/>

var Nullstone = {};
Nullstone._LastID = 0;
Nullstone._LastTypeID = 1;
Nullstone._RecordTypeCounts = true;
Nullstone.Create = function (typeName, parent, argCount, interfaces) {
    if (parent && parent._IsNullstone !== true) {
        throw new InvalidOperationException("Nullstones can only be inherited from other nullstones.");
    }

    var s;
    if (argCount) {
        s = "";
        for (var i = 0; i < argCount; i++) {
            if (s)
                s += ", arguments[" + i + "]";
            else
                s += "arguments[" + i + "]";
        }
    }
    else
        s = "arguments";

    var code = "var n = Nullstone; if (!n.IsReady) return;" +
        "n._LastID = this._ID = n._LastID + 1;" +
        "n._CreateProps(this);" +
        "if (this.Init) this.Init(" + s + ");"

    if (Nullstone._RecordTypeCounts) {
        code += "n._TypeCount['" + typeName + "']++;";
        if (!Nullstone._TypeCount)
            Nullstone._TypeCount = [];
        Nullstone._TypeCount[typeName] = 0;
    }

    var f = new Function(code);
    f._IsNullstone = true;
    f._TypeName = typeName;
    Nullstone._LastTypeID = f._TypeID = Nullstone._LastTypeID + 1;
    f._BaseClass = parent;
    if (!parent) parent = Object;
    Nullstone.IsReady = false;
    f.prototype = new parent;
    f.prototype.constructor = f;
    Nullstone.IsReady = true;
    f.Instance = {};
    f.Properties = [];
    f.Interfaces = interfaces;
    return f;
}
Nullstone.FinishCreate = function (f) {
    var i;
    //Crash if interface is not implemented
    if (f.Interfaces) {
        for (i = 0; i < f.Interfaces.length; i++) {
            var it = f.Interfaces[i].Instance;
            for (var m in it) {
                if (!(m in f.prototype))
                    throw new NotImplementedException(f, it, m);
            }
        }
    }

    //Set up 'this.Method$BaseClass();' construct
    for (var k in f.Instance) {
        if ((k in f.prototype) && f._BaseClass != null) {
            f.prototype[k + '$' + f._BaseClass._TypeName] = f.prototype[k];
        }
        f.prototype[k] = f.Instance[k];
    }

    //Bring up properties defined in base class
    Nullstone._PropagateBaseProperties(f, f._BaseClass);

    delete f['Instance'];
};

Nullstone.RefEquals = function (obj1, obj2) {
    if (obj1 == null && obj2 == null)
        return true;
    if (obj1 == null || obj2 == null)
        return false;
    if (obj1.constructor._IsNullstone && obj2.constructor._IsNullstone)
        return obj1._ID === obj2._ID;
    return false;
};
Nullstone.Equals = function (val1, val2) {
    if (val1 == null && val2 == null)
        return true;
    if (val1 == null || val2 == null)
        return false;
    if (val1.constructor._IsNullstone && val2.constructor._IsNullstone)
        return val1._ID === val2._ID;
    if (!(val1 instanceof Object) && !(val2 instanceof Object))
        return val1 === val2;
    return false;
};
Nullstone.As = function (obj, type) {
    if (obj == null)
        return null;
    if (obj instanceof type)
        return obj;
    if (Nullstone.DoesImplement(obj, type))
        return obj;
    return null;
};
Nullstone.Is = function (obj, type) {
    if (obj == null)
        return false;
    if (obj instanceof type)
        return true;
    if (Nullstone.DoesImplement(obj, type))
        return true;
    return false;
};
Nullstone.DoesInheritFrom = function (t, type) {
    var temp = t;
    while (temp != null && temp._TypeName !== type._TypeName) {
        temp = temp._BaseClass;
    }
    return temp != null;
};
Nullstone.DoesImplement = function (obj, interfaceType) {
    if (!obj.constructor._IsNullstone)
        return false;
    if (!obj.constructor.Interfaces)
        return false;
    return interfaceType in obj.constructor.Interfaces;
};

Nullstone.AutoProperties = function (type, arr) {
    for (var i = 0; i < arr.length; i++) {
        Nullstone.AutoProperty(type, arr[i]);
    }
};
Nullstone.AutoProperty = function (type, nameOrDp, converter, isOverride) {
    if (nameOrDp instanceof DependencyProperty) {
        type.Instance[nameOrDp.Name] = null;
        type.Properties.push({
            Auto: true,
            DP: nameOrDp,
            Converter: converter,
            Override: isOverride === true
        });
    } else {
        type.Instance[nameOrDp] = null;
        type.Properties.push({
            Auto: true,
            Name: nameOrDp,
            Converter: converter,
            Override: isOverride === true
        });
    }
};
Nullstone.AutoPropertiesReadOnly = function (type, arr) {
    for (var i = 0; i < arr.length; i++) {
        Nullstone.AutoPropertyReadOnly(type, arr[i]);
    }
};
Nullstone.AutoPropertyReadOnly = function (type, nameOrDp, isOverride) {
    if (nameOrDp instanceof DependencyProperty) {
        type.Instance[nameOrDp.Name] = null;
        type.Properties.push({
            Auto: true,
            DP: nameOrDp,
            Override: isOverride === true
        });
    } else {
        type.Instance[nameOrDp] = null;
        type.Properties.push({
            Auto: true,
            Name: nameOrDp,
            IsReadOnly: true,
            Override: isOverride === true
        });
    }
};
Nullstone.AbstractProperty = function (type, name, isReadOnly) {
    type.Instance[name] = null;
    type.Properties.push({
        Name: name,
        IsAbstract: true,
        IsReadOnly: isReadOnly === true
    });
};
Nullstone.Property = function (type, name, data) {
    type.Instance[name] = null;
    type.Properties.push({
        Custom: true,
        Name: name,
        Data: data
    });
};

Nullstone._CreateProps = function (ns) {
    //Define Properties on prototype
    var props = ns.constructor.Properties;
    for (var i = 0; i < props.length; i++) {
        var p = props[i];
        if (p.IsAbstract) {
            continue;
        } else if (p.Custom) {
            Object.defineProperty(ns, p.Name, p.Data);
        } else if (p.DP) {
            Nullstone._CreateDP(ns, p.DP, p.Converter);
        } else {
            Object.defineProperty(ns, p.Name, {
                value: null,
                writable: p.IsReadOnly !== true
            });
        }
    }
};
Nullstone._CreateDP = function (ns, dp, converter) {
    var getFunc = function () {
        var value = undefined;
        if (dp._ID in this._CachedValues) {
            value = this._CachedValues[dp._ID];
        } else {
            value = this.$GetValue(dp);
            this._CachedValues[dp._ID] = value;
        }
        return value;
    };
    if (dp.IsReadOnly) {
        Object.defineProperty(ns, dp.Name, {
            get: getFunc
        });
    } else {
        var setFunc;
        if (converter) {
            setFunc = function (value) { value = converter(value); this.$SetValue(dp, value); };
            setFunc.Converter = converter;
        } else {
            setFunc = function (value) { this.$SetValue(dp, value); };
        }
        Object.defineProperty(ns, dp.Name, {
            get: getFunc,
            set: setFunc
        });
    }
};
Nullstone._PropagateBaseProperties = function (targetNs, baseNs) {
    if (!baseNs)
        return;
    var props = baseNs.Properties;
    var count = props.length;
    for (i = 0; i < count; i++) {
        var p = props[i];
        var name = p.DP ? p.DP.Name : p.Name;

        var curNsProp = Nullstone._FindProperty(targetNs.Properties, name);

        //If base nullstone has abstract property, ensure exists on current nullstone
        if (p.IsAbstract) {
            if (!curNsProp)
                throw new PropertyNotImplementedException(baseNs, targetNs, name);
            continue;
        } else if (curNsProp) {
            //If base nullstone has property that collides with current nullstone...
            //Ensure property has explicit override, 
            if (!curNsProp.Override)
                throw new PropertyCollisionException(baseNs, targetNs, name);
            continue;
        }

        targetNs.prototype[name] = null;
        targetNs.Properties.push(p);
    }
};

Nullstone._FindProperty = function (props, name) {
    var count = props.length;
    for (var i = 0; i < count; i++) {
        var p = props[i];
        if (name === (p.DP ? p.DP.Name : p.Name))
            return p;
    }
    return null;
};

Nullstone._GetTypeCountsAbove = function (count) {
    var arr = [];
    for (var tn in Nullstone._TypeCount) {
        if (Nullstone._TypeCount[tn] > count)
            arr[tn] = Nullstone._TypeCount[tn];
    }
    return arr;
};