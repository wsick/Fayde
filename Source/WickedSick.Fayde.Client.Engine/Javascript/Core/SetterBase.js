/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE

//#region SetterBase

function SetterBase() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this.SetAttached(false);
}
Nullstone.Extend(SetterBase, "SetterBase", DependencyObject);

//#region DEPENDENCY PROPERTIES

SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBase, false);
SetterBase.prototype.GetIsSealed = function () {
    /// <returns type="Boolean" />
    return this.GetValue(SetterBase.IsSealedProperty);
};

//#endregion

SetterBase.prototype.GetAttached = function () {
    /// <returns type="Boolean" />
    return this._Attached;
};
SetterBase.prototype.SetAttached = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._Attached = value;
};
SetterBase.prototype._Seal = function () {
    if (this.GetIsSealed())
        return;
    this.SetValue(SetterBase.IsSealedProperty, true);
};

//#endregion
