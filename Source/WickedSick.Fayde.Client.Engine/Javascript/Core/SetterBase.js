/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE

(function (namespace) {
    var SetterBase = Nullstone.Create("SetterBase", DependencyObject);

    SetterBase.Instance.Init = function () {
        this.Init$DependencyObject();
        this._Attached = false;
    };

    //#region Properties

    SetterBase.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBase, false);

    Nullstone.AutoProperties(SetterBase, [
        SetterBase.IsSealedProperty
    ]);

    //#endregion

    SetterBase.Instance._Seal = function () {
        if (this.IsSealed)
            return;
        this.$SetValue(SetterBase.IsSealedProperty, true);
    };

    namespace.SetterBase = Nullstone.FinishCreate(SetterBase);
})(Nullstone.Namespace("Fayde"));