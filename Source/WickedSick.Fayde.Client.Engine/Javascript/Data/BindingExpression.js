/// <reference path="BindingExpressionBase.js"/>
/// CODE

//#region BindingExpression

function BindingExpression(binding, target, propd) {
    BindingExpressionBase.call(this, binding, target, propd);
}
BindingExpression.InheritFrom(BindingExpressionBase);

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