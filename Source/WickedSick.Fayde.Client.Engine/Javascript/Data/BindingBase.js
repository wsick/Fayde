/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region BindingBase
var BindingBase = Nullstone.Create("BindingBase");

//#region Properties

Nullstone.AutoProperties(BindingBase, [
    "Sealed"
]);

Nullstone.Property(BindingBase, "StringFormat", {
    get: function () { return this._StringFormat; },
    set: function (value) {
        this.CheckSealed();
        this._StringFormat = value;
    }
});
Nullstone.Property(BindingBase, "FallbackValue", {
    get: function () { return this._FallbackValue; },
    set: function (value) {
        this.CheckSealed();
        this._FallbackValue = value;
    }
});
Nullstone.Property(BindingBase, "TargetNullValue", {
    get: function () { return this._TargetNullValue; },
    set: function (value) {
        this.CheckSealed();
        this._TargetNullValue = value;
    }
});

//#endregion

BindingBase.Instance.CheckSealed = function () {
    if (this.Sealed)
        throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
};
BindingBase.Instance.Seal = function () {
    this.Sealed = true;
};

Nullstone.FinishCreate(BindingBase);
//#endregion