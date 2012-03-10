/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE

//#region SetterBase
var SetterBase = Nullstone.Create("SetterBase", DependencyObject);

SetterBase.Instance.Init = function () {
    this.SetAttached(false);
};

//#region DEPENDENCY PROPERTIES

SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBase, false);
SetterBase.Instance.GetIsSealed = function () {
    /// <returns type="Boolean" />
    return this.GetValue(SetterBase.IsSealedProperty);
};

//#endregion

SetterBase.Instance.GetAttached = function () {
    /// <returns type="Boolean" />
    return this._Attached;
};
SetterBase.Instance.SetAttached = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._Attached = value;
};
SetterBase.Instance._Seal = function () {
    if (this.GetIsSealed())
        return;
    this.SetValue(SetterBase.IsSealedProperty, true);
};

Nullstone.FinishCreate(SetterBase);
//#endregion