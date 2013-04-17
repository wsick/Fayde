var Nullstone = (function () {
    function Nullstone() { }
    Nullstone.Equals = function Equals(val1, val2) {
        if(val1 == null && val2 == null) {
            return true;
        }
        if(val1 == null || val2 == null) {
            return false;
        }
        if(val1 === val2) {
            return true;
        }
        if(val1.Equals) {
            return val1.Equals(val2);
        }
        return false;
    };
    Nullstone.DoesInheritFrom = function DoesInheritFrom(t, type) {
        var temp = t;
        while(temp && temp !== type) {
            temp = (temp)._BaseClass;
        }
        return temp != null;
    };
    Nullstone.GetPropertyDescriptor = function GetPropertyDescriptor(obj, name) {
        if(!obj) {
            return;
        }
        var type = (obj).constructor;
        var propDesc = Object.getOwnPropertyDescriptor(type.prototype, name);
        if(propDesc) {
            return propDesc;
        }
        return Object.getOwnPropertyDescriptor(obj, name);
    };
    Nullstone.HasProperty = function HasProperty(obj, name) {
        if(!obj) {
            return false;
        }
        if(obj.hasOwnProperty(name)) {
            return true;
        }
        var type = obj.constructor;
        return type.prototype.hasOwnProperty(name);
    };
    return Nullstone;
})();
//@ sourceMappingURL=Nullstone.js.map
