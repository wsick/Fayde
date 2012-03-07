/// <reference path="JsEx.js"/>

//#region RefObject

function RefObject() {
    RefObject._LastID = this._ID = RefObject._LastID + 1;
    //this._TypeName = RefObject.GetTypeName.call(this);
}

RefObject._LastID = 0;
RefObject.As = function (obj, type) {
    if (obj == null)
        return null;
    if (obj instanceof type)
        return obj;
    if (obj.constructor.DoesImplement(type))
        return obj;
    return null;
};
RefObject.GetTypeName = function () {
    try {
        return this.constructor.GetName();
    } catch (err) {
        err.toString();
    }
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
        return RefObject.RefEquals(val1, val2);
    if (!(val1 instanceof Object) && !(val2 instanceof Object))
        return val1 === val2;
    return false;
};

///#endregion