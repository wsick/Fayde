Function.prototype.InheritFrom = function (parentType) {
    this.prototype = new parentType;
    this.prototype.constructor = this;
    this.GetBaseClass = function () { return parentType; };
};
Function.prototype.DoesInheritFrom = function (type) {
    return (new this()) instanceof type;
};

//#region RefObject

function RefObject() {
    Object.call(this);
    var id;
    do {
        id = new Date().getTime();
    } while (id === RefObject._LastID);
    RefObject._LastID = this._ID = id;
}
RefObject.InheritFrom(Object);

RefObject.prototype.RefEquals = function (robj) {
    if (robj == null)
        return false;
    if (!(robj instanceof RefObject))
        return false;
    return this._ID === robj._ID;
};
RefObject.As = function (obj, type) {
    if (obj instanceof type)
        return obj;
    return null;
};

///#endregion