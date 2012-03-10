/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="BindingExpressionBase.js"/>
/// CODE

//#region BindingExpression

function BindingExpression(binding, target, propd) {
    if (!Nullstone.IsReady)
        return;
    this.$super(binding, target, propd);
}
Nullstone.Extend(BindingExpression, "BindingExpression", BindingExpressionBase);

BindingExpression.prototype.GetParentBinding = function () {
    return this.GetBinding();
};
BindingExpression.prototype.GetDataItem = function () {
    return this.GetDataSource();
};
BindingExpression.prototype.UpdateSource = function () {
    return this._UpdateSourceObject(undefined, true);
};

//#endregion
