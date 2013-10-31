/// <reference path="TypeManagement.ts" />
var Nullstone = (function () {
    function Nullstone() {
    }
    Nullstone.Equals = function (val1, val2) {
        if (val1 == null && val2 == null)
            return true;
        if (val1 == null || val2 == null)
            return false;
        if (val1 === val2)
            return true;
        if (val1.Equals)
            return val1.Equals(val2);
        return false;
    };
    Nullstone.DoesInheritFrom = function (t, type) {
        var temp = t;
        while (temp && temp !== type) {
            temp = (temp)._BaseClass;
        }
        return temp != null;
    };
    Nullstone.GetPropertyDescriptor = function (obj, name) {
        if (!obj)
            return;
        var type = (obj).constructor;
        var propDesc = Object.getOwnPropertyDescriptor(type.prototype, name);
        if (propDesc)
            return propDesc;
        return Object.getOwnPropertyDescriptor(obj, name);
    };
    Nullstone.HasProperty = function (obj, name) {
        if (!obj)
            return false;
        if (obj.hasOwnProperty(name))
            return true;
        var type = obj.constructor;
        return type.prototype.hasOwnProperty(name);
    };
    Nullstone.ImplementsInterface = function (obj, i) {
        if (!obj)
            return false;
        var curType = obj.constructor;
        if (!curType)
            return false;
        var is;
        do {
            is = curType._Interfaces;
            if (!is)
                continue;
            if (is.indexOf(i) > -1)
                return true;
        } while(curType = curType._BaseClass);
        return false;
    };
    return Nullstone;
})();

function NotImplemented(str) {
    if (window.console && console.warn)
        console.warn("NotImplemented: " + str);
}
function Warn(str) {
    if (window.console && console.warn)
        console.warn(str);
}
//# sourceMappingURL=Nullstone.js.map
