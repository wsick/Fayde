/// <reference path="Nullstone.js"/>
/// CODE

//#region PropertyInfo
var PropertyInfo = Nullstone.Create("PropertyInfo");

PropertyInfo.Find = function (typeOrObj, name) {
    var isType = typeOrObj instanceof Function;
    var type = isType ? typeOrObj : typeOrObj.constructor;

    var setFunc;
    var getFunc;
    for (var i in type.Instance) {
        if (i.toString() === ("Set" + name))
            setFunc = type.Instance[i];
        if (i.toString() === ("Get" + name))
            getFunc = type.Instance[i];
        if (getFunc && setFunc) {
            var pi = new PropertyInfo();
            pi.Type = type;
            pi.SetFunc = setFunc;
            pi.GetFunc = getFunc;
            return pi;
        }
    }
};

PropertyInfo.Instance.GetValue = function (ro) {
    if (!this.GetFunc)
        return undefined;
    return this.GetFunc.call(ro);
};
PropertyInfo.Instance.SetValue = function (ro, value) {
    if (this.SetFunc)
        this.SetFunc.call(ro, value);
};

Nullstone.FinishCreate(PropertyInfo);
//#endregion