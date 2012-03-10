/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="BindingExpressionBase.js"/>
/// CODE

//#region BindingExpression
var BindingExpression = Nullstone.Create("BindingExpression", BindingExpressionBase, 3);

BindingExpression.Instance.Init = function (binding, target, propd) {
    this.Init$BindingExpressionBase(binding, target, propd);
};

BindingExpression.Instance.GetParentBinding = function () {
    return this.GetBinding();
};
BindingExpression.Instance.GetDataItem = function () {
    return this.GetDataSource();
};
BindingExpression.Instance.UpdateSource = function () {
    return this._UpdateSourceObject(undefined, true);
};

Nullstone.FinishCreate(BindingExpression);
//#endregion