var Nullstone = {};
Nullstone._LastID = 0;
Nullstone.Create = function (typeName, parent, argCount) {
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
    var f = new Function("if (!Nullstone.IsReady) return; if (this.Init) this.Init(" + s + ");")
    Nullstone._LastID = f._ID = Nullstone._LastID + 1;
    f._IsNullstone = true;
    f._TypeName = typeName;
    f._BaseClass = parent;
    if (!parent) parent = Object;
    Nullstone.IsReady = false;
    f.prototype = new parent;
    Nullstone.IsReady = true;
    f.Instance = {};
    return f;
}
Nullstone.FinishCreate = function (f) {
    for (var k in f.Instance) {
        if ((k in f.prototype) && f._BaseClass != null) {
            f.prototype[k + '$' + f._BaseClass._TypeName] = f.prototype[k];
        }
        f.prototype[k] = f.Instance[k];
    }
    delete f['Instance'];
};

Nullstone.RefEquals = function (obj1, obj2) {
    if (obj1 == null && obj2 == null)
        return true;
    if (obj1._IsNullstone && obj2._IsNullstone)
        return obj1._ID === obj2._ID;
    return false;
};
Nullstone.Equals = function (val1, val2) {
    if (val1 == null && val2 == null)
        return true;
    if (val1 == null || val2 == null)
        return false;
    if (obj1._IsNullstone && obj2._IsNullstone)
        return Nullstone.RefEquals(val1, val2);
    if (!(val1 instanceof Object) && !(val2 instanceof Object))
        return val1 === val2;
    return false;
};
Nullstone.As = function (obj, type) {
    if (obj == null)
        return null;
    if (obj instanceof type)
        return obj;
    //if (obj.constructor.DoesImplement(type))
        //return obj;
    return null;
};
Nullstone.DoesInheritFrom = function (t, type) {
    var temp = t;
    while (temp != null && temp._TypeName !== type._TypeName) {
        temp = temp._BaseClass;
    }
    return temp != null;
};