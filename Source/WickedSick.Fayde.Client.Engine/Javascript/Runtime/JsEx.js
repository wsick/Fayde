Object.Clone = function (o) {
    return eval(uneval(o));
};

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
    var interfaceName = (new interface())._TypeName;
    for (var i in interface.prototype) {
        if (!this.prototype[i])
            this.prototype[i] = new Function("throw new NotImplementedException();");
    }
    if (this._Interfaces == null)
        this._Interfaces = new Array();
    this._Interfaces[interfaceName] = true;
    return this;
};
Function.prototype.DoesImplement = function (interface) {
    if (!this._Interfaces)
        return false;
    var interfaceName = (new interface())._TypeName;
    return this._Interfaces[interfaceName] === true;
};
Function.prototype.GetName = function () {
    if (this.___FunctionName___ != null)
        return this.___FunctionName___;
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(this.toString());
    var name = (results && results.length > 1) ? results[1] : "";
    this.___FunctionName___ = name;
    return name;
};
Function.prototype.Clone = function () {
    return eval(uneval(this));
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

Array.indexOfRefObject = function (arr, ro) {
    /// <param name="ro" type="RefObject"></param>
    /// <returns type="Number" />
    for (var i = 0; i < arr.length; i++) {
        if (RefObject.RefEquals(arr[i], ro))
            return i;
    }
    return -1;
};
Array.containsRefObject = function (arr, ro) {
    /// <param name="ro" type="RefObject"></param>
    /// <returns type="Boolean" />
    return Array.indexOfRefObject(arr, ro) > -1;
};
Array.addDistinctRefObject = function (arr, ro) {
    /// <param name="ro" type="RefObject"></param>
    /// <returns type="Boolean" />
    if (Array.containsRefObject(arr, ro))
        return false;
    arr.push(ro);
    return true;
};
Array.removeRefObject = function (arr, ro) {
    /// <param name="ro" type="RefObject"></param>
    var index = Array.indexOfRefObject(arr, ro);
    if (index > -1)
        arr.splice(index, 1);
};

Number.isNumber = function (o) {
    return typeof o == "number";
};

String.isString = function (o) {
    return typeof o == "string";
};

function IsDocumentReady() {
    /// <returns type="Boolean" />
    return false;
}