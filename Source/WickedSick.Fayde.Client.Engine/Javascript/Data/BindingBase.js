/// CODE

//#region BindingBase

function BindingBase() {
    RefObject.call(this);
}
BindingBase.InheritFrom(RefObject);

BindingBase.prototype.CheckSealed = function () {
    if (this.GetSealed())
        throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
};
BindingBase.prototype.Seal = function () {
    this.SetSealed(true);
};

//#region PROPERTIES

BindingBase.prototype.GetFallbackValue = function () {
    ///<returns type="RefObject"></returns>
    return this._FallbackValue;
};
BindingBase.prototype.SetFallbackValue = function (value) {
    ///<param name="value" type="RefObject"></param>
    this.CheckSealed();
    this._FallbackValue = value;
};

BindingBase.prototype.GetSealed = function () {
    ///<returns type="Boolean"></returns>
    return this._Sealed;
};
BindingBase.prototype.SetSealed = function (value) {
    ///<param name="value" type="Boolean"></param>
    this._Sealed = value;
};

BindingBase.prototype.GetStringFormat = function () {
    ///<returns type="String"></returns>
    return this._StringFormat;
};
BindingBase.prototype.SetStringFormat = function (value) {
    ///<param name="value" type="String"></param>
    this.CheckSealed();
    this._StringFormat = value;
};

BindingBase.prototype.GetTargetNullValue = function () {
    ///<returns type="RefObject"></returns>
    return this._TargetNullValue;
};
BindingBase.prototype.SetTargetNullValue = function (value) {
    ///<param name="value" type="RefObject"></param>
    this.CheckSealed();
    this._TargetNullValue = value;
};

//#endregion

//#endregion