_Expression.prototype = new Object;
_Expression.prototype.constructor = _Expression;
function _Expression() {
}

_Expression.prototype._GetValue = function (propd) {
    AbstractMethod("_Expression._GetValue");
};
_Expression.prototype._OnAttached = function (element) {
    this._Attached = true;
};
_Expression.prototype._OnDetached = function (element) {
    this._Attached = false;
};



_TemplateBindingExpression.prototype = new _Expression;
_TemplateBindingExpression.prototype.constructor = _TemplateBindingExpression;
function _TemplateBindingExpression(sourcePropd, targetPropd) {
    _Expression.call(this);
    this._SourceProperty = sourcePropd;
    this._TargetProperty = targetPropd;
}