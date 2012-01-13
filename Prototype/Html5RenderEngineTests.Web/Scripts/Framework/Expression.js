//#region Expression

Expression.prototype = new Object;
Expression.prototype.constructor = Expression;
function Expression() {
}
Expression.GetBaseClass = function () { return Object; };

Expression.prototype._GetValue = function (propd) {
    AbstractMethod("_Expression._GetValue");
};
Expression.prototype._OnAttached = function (element) {
    this._Attached = true;
};
Expression.prototype._OnDetached = function (element) {
    this._Attached = false;
};

//#endregion

//#region TemplateBindingExpression

TemplateBindingExpression.prototype = new Expression;
TemplateBindingExpression.prototype.constructor = TemplateBindingExpression;
function TemplateBindingExpression(sourcePropd, targetPropd) {
    Expression.call(this);
    this._SourceProperty = sourcePropd;
    this._TargetProperty = targetPropd;
}
TemplateBindingExpression.GetBaseClass = function () { return Expression; };

//#endregion