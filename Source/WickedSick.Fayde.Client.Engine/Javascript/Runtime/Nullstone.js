/// <reference path="JsEx.js"/>
/// <reference path="Enum.js"/>

var Nullstone = {};
Nullstone._LastID = 0;
Nullstone._LastTypeID = 1;
Nullstone.Create = function (typeName, parent, argCount, interfaces) {
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
    //Crash if interface is not implemented
    if (f.Interfaces) {
        for (var i = 0; i < f.Interfaces.length; i++) {
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
    var props;
    if (f._BaseClass) {
        props = f._BaseClass.Properties;
        for (var i = 0; i < props.length; i++) {
            var p = props[i];
            if (p.DP) {
                f.prototype[p.DP.Name] = null;
            } else {
                f.prototype[p.Name] = null;
            }
            f.Properties.push(p);
        }
    }

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
Nullstone.AutoProperty = function (type, nameOrDp, converter) {
    if (nameOrDp instanceof DependencyProperty) {
        type.Instance[nameOrDp.Name] = null;
        type.Properties.push({
            Auto: true,
            DP: nameOrDp,
            Converter: converter
        });
    } else {
        type.Instance[nameOrDp] = null;
        type.Properties.push({
            Auto: true,
            Name: nameOrDp,
            Converter: converter
        });
    }
};
Nullstone.AutoPropertiesReadOnly = function (type, arr) {
    for (var i = 0; i < arr.length; i++) {
        Nullstone.AutoPropertyReadOnly(type, arr[i]);
    }
};
Nullstone.AutoPropertyReadOnly = function (type, nameOrDp) {
    if (nameOrDp instanceof DependencyProperty) {
        type.Instance[nameOrDp.Name] = null;
        type.Properties.push({
            Auto: true,
            DP: nameOrDp
        });
    } else {
        type.Instance[nameOrDp] = null;
        type.Properties.push({
            Auto: true,
            Name: nameOrDp,
            IsReadOnly: true
        });
    }
};

Nullstone._CreateProps = function (ns) {
    var f = ns.constructor;
    //Define Properties on prototype
    props = f.Properties;
    for (var i = 0; i < props.length; i++) {
        var p = props[i];
        if (p.DP) {
            Nullstone._CreateDP(ns, p.DP, p.Converter);
        } else {
            Object.defineProperty(ns, p, {
                value: null,
                writable: p.IsReadOnly
            });
        }
    }
};
Nullstone._CreateDP = function (ns, dp, converter) {
    var getFunc = function () { return this.$GetValue(dp); };
    if (dp._IsReadOnly) {
        Object.defineProperty(ns, dp.Name, {
            get: getFunc
        });
    } else {
        var setFunc;
        if (converter) {
            setFunc = function (value) { value = converter(value); this.$SetValue(dp, value); };
            setFunc.Converter = converter;
        }
        else
            setFunc = function (value) { this.$SetValue(dp, value); };
        Object.defineProperty(ns, dp.Name, {
            get: getFunc,
            set: setFunc
        });
    }
};