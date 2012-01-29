/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="DependencyProperty.js"/>
/// <reference path="ContentControl.js"/>

var BindingMode = {
    TwoWay: 0,
    OneWay: 1,
    OneTime: 2,
    OneWayToSource: 3
};

//#region Expression

function Expression() {
    RefObject.call(this);
}
Expression.InheritFrom(RefObject);

Expression.prototype.GetValue = function (propd) {
    AbstractMethod("_Expression.GetValue");
};
Expression.prototype._OnAttached = function (element) {
    this._Attached = true;
};
Expression.prototype._OnDetached = function (element) {
    this._Attached = false;
};

//#endregion

//#region BindingExpressionBase

function BindingExpressionBase() {
    Expression.call(this);
}
BindingExpressionBase.InheritFrom(Expression);

//#endregion

//#region TemplateBindingExpression

function TemplateBindingExpression(sourcePropd, targetPropd) {
    Expression.call(this);
    this.SourceProperty = sourcePropd;
    this.TargetProperty = targetPropd;
}
TemplateBindingExpression.InheritFrom(Expression);

TemplateBindingExpression.prototype.GetValue = function (propd) {
    var source = this.Target._TemplateOwner;
    var value = null;
    if (source != null)
        value = source.GetValue(this.SourceProperty);
    return value; //TODO: Send through IValueConverter
};
TemplateBindingExpression.prototype._OnAttached = function (element) {
    Expression.prototype._OnAttached.call(this, element);

    this.Target = element;
    if (this._Listener != null) {
        this._Listener.Detach();
        this._Listener = null;
    }

    var c;
    if (this.Target instanceof ContentControl)
        c = this.Target;

    if (this.TargetProperty === ContentControl.ContentProperty && c != null) {
        this.SetsParent = c._ContentSetsParent;
        c._ContentSetsParent = false;
    }

//    var source = this.Target._TemplateOwner;
//    if (source != null)
//        this._Listener = new WeakPropertyChangedListener(source, this.SourceProperty, this);
};
TemplateBindingExpression.prototype._OnDetached = function (element) {
    Expression.prototype._OnDetached.call(this, element);

    if (this._Listener == null)
        return;

    var c;
    if (this.Target instanceof ContentControl)
        c = this.Target;
    if (c != null)
        c._ContentSetsParent = this.SetsParent;

    this._Listener.Detach();
    this._Listener = null;
    this.Target = null;
};

//#endregion