Function.prototype.InheritFrom = function (parentType) {
    this.prototype = new parentType;
    this.prototype.constructor = this;
    this.GetBaseClass = function () { return parentType; };
    return this;
};
Function.prototype.DoesInheritFrom = function (type) {
    return (new this()) instanceof type;
};
Function.prototype.Implement = function (interface) {
    for (var i in interface.prototype) {
        if (!this.prototype[i])
            this.prototype[i] = new Function("throw new NotImplementedException();");
    }
    if (this._Interfaces == null)
        this._Interfaces = new Array();
    this._Interfaces[interface] = true;
    return this;
};
Function.prototype.DoesImplement = function (interface) {
    if (!this._Interfaces)
        return false;
    return this._Interfaces[interface] === true;
};

String.prototype.indexOfAny = function (carr, start) {
    if (!(carr instanceof Array))
        return -1;
    if (start == null)
        start = 0;
    for (var cur = start; cur < this.length; cur++) {
        var c = this.charAt(c);
        for (var i = 0; i < carr.length; i++) {
            if (c === carr[i])
                return cur;
        }
    }
    return -1;
};

//#region RefObject

function RefObject() {
    Object.call(this);
    RefObject._LastID = this._ID = RefObject._LastID + 1;
    this._TypeName = RefObject.GetTypeName.call(this);
}
RefObject.InheritFrom(Object);

RefObject._LastID = 0;
RefObject.As = function (obj, type) {
    if (obj instanceof type)
        return obj;
    if (obj.constructor.DoesImplement(type))
        return obj;
    return null;
};
RefObject.GetTypeName = function () {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(this.constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};
RefObject.RefEquals = function (robj1, robj2) {
    if (robj1 == null && robj2 == null)
        return true;
    if (robj1 instanceof RefObject && robj2 instanceof RefObject)
        return robj1._ID === robj2._ID;
    return false;
};
RefObject.Equals = function (val1, val2) {
    if (val1 == null && val2 == null)
        return true;
    if (val1 instanceof RefObject && val2 instanceof RefObject)
        return val1.RefEquals(val2);
    if (!(val1 instanceof Object) && !(val2 instanceof Object))
        return val1 === val2;
    return false;
};

///#endregion

//#region WeakRefRepository

function _WeakRefRepository() {
    RefObject.call(this);
}
_WeakRefRepository.InheritFrom(RefObject);

//#endregion

//#region PropertyInfo

function PropertyInfo(type, name) {
    RefObject.call(this);
    this.Type = type;
    if (type) {
        this.GetFunc = type.prototype["Get" + name];
        this.SetFunc = type.prototype["Set" + name];
    }
}
PropertyInfo.InheritFrom(RefObject);

PropertyInfo.Find = function (type, name) {
    for (var i in type.prototype) {
        
    }
};

PropertyInfo.prototype.GetValue = function (ro) {
    if (!this.GetFunc)
        return undefined;
    return this.GetFunc.call(ro);
};
PropertyInfo.prototype.SetValue = function (ro, value) {
    if (this.SetFunc)
        this.SetFunc.call(ro, value);
};

//#endregion