function Nullstone() {
}
Nullstone._LastID = 0;
Nullstone.Create = function (f, typeName) {
    Nullstone._LastID = f._ID = Nullstone._LastID + 1;
    f._IsNullstone = true;
    f._TypeName = typeName;
    f.GetBaseClass = function () { return null; };
};
Nullstone.Extend = function (f, typeName, parent, interfaces) {
    Nullstone._LastID = f._ID = Nullstone._LastID + 1;
    f._IsNullstone = true;
    f._TypeName = typeName;
    f.GetBaseClass = function () { return parent; };
    Nullstone.IsReady = false;
    f.prototype = new parent;
    Nullstone.IsReady = true;
    for (var k in parent.prototype) {
        if (typeof parent.prototype[k] == 'function') {
            if (k.length > 5 && k.substr(k.length - 6) === '$super')
                continue;
            f.prototype[k + '$super'] = parent.prototype[k];
        }
    }
    f.prototype['$super'] = parent.prototype.constructor;
    return f;
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
    if (obj1._IsNullstone && obj2._IsNullstone)
        return RefObject.RefEquals(val1, val2);
    if (!(val1 instanceof Object) && !(val2 instanceof Object))
        return val1 === val2;
    return false;
};
Nullstone.As = function (obj, type) {
    if (obj == null)
        return null;
    if (obj instanceof type)
        return obj;
    if (obj.constructor.DoesImplement(type))
        return obj;
    return null;
};
Nullstone.DoesInheritFrom = function (t, type) {
    var temp = t;
    while (temp != null && temp._TypeName !== type._TypeName) {
        temp = temp.GetBaseClass();
    }
    return temp != null;
};