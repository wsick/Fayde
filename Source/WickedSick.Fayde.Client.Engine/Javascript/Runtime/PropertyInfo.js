/// <reference path="Nullstone.js"/>
/// CODE

//#region PropertyInfo

function PropertyInfo() {
}
Nullstone.Create(PropertyInfo, "PropertyInfo");

PropertyInfo.Find = function (typeOrObj, name) {
    var isType = typeOrObj instanceof Function;
    var type = isType ? typeOrObj : typeOrObj.constructor;

    var setFunc;
    var getFunc;
    for (var i in type.prototype) {
        if (i.toString() === ("Set" + name))
            setFunc = type.prototype[i];
        if (i.toString() === ("Get" + name))
            getFunc = type.prototype[i];
        if (getFunc && setFunc) {
            var pi = new PropertyInfo();
            pi.Type = type;
            pi.SetFunc = setFunc;
            pi.GetFunc = getFunc;
            return pi;
        }
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