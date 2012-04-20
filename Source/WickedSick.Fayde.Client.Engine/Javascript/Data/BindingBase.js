/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region BindingBase
var BindingBase = Nullstone.Create("BindingBase");

BindingBase.Instance.CheckSealed = function () {
    if (this.GetSealed())
        throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
};
BindingBase.Instance.Seal = function () {
    this.SetSealed(true);
};

//#region Properties

BindingBase.Instance.GetFallbackValue = function () {
    return this._FallbackValue;
};
BindingBase.Instance.SetFallbackValue = function (value) {
    this.CheckSealed();
    this._FallbackValue = value;
};

BindingBase.Instance.GetSealed = function () {
    ///<returns type="Boolean"></returns>
    return this._Sealed;
};
BindingBase.Instance.SetSealed = function (value) {
    ///<param name="value" type="Boolean"></param>
    this._Sealed = value;
};

BindingBase.Instance.GetStringFormat = function () {
    ///<returns type="String"></returns>
    return this._StringFormat;
};
BindingBase.Instance.SetStringFormat = function (value) {
    ///<param name="value" type="String"></param>
    this.CheckSealed();
    this._StringFormat = value;
};

BindingBase.Instance.GetTargetNullValue = function () {
    return this._TargetNullValue;
};
BindingBase.Instance.SetTargetNullValue = function (value) {
    this.CheckSealed();
    this._TargetNullValue = value;
};

//#endregion

Nullstone.FinishCreate(BindingBase);
//#endregion