/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="DependencyProperty.js"/>
/// <reference path="ContentControl.js"/>
/// <reference path="PropertyPath.js"/>

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

function BindingExpressionBase(binding, target, propd) {
    Expression.call(this);

    this._SetBinding(binding);
    this._SetTarget(target);
    this._SetProperty(propd);

    //var bindsToView = propd === FrameworkElement.DataContextProperty; //TODO: || propd.GetTargetType() == typeof(IEnumerable) || propd.GetTargetType() == typeof(ICollectionView)
    //this._SetPropertyPathWalker(new _PropertyPathWalker(this._GetBinding().
    //if (this._GetBinding().Mode !== BindingMode.OneTime) {
        // TODO: IsBrokenChanged
        // TODO: ValueChanged
    //}
}
BindingExpressionBase.InheritFrom(Expression);

//#region PROPERTIES

BindingExpressionBase.prototype._GetBinding = function () {
    return this._Binding;
};
BindingExpressionBase.prototype._SetBinding = function (/* Binding */binding) {
    this._Binding = binding;
};

BindingExpressionBase.prototype._GetTarget = function () {
    return this._Target;
};
BindingExpressionBase.prototype._SetTarget = function (/* DependencyObject */value) {
    this._Target = value;
};

BindingExpressionBase.prototype._GetProperty = function () {
    return this._Property;
};
BindingExpressionBase.prototype._SetProperty = function (/* DependencyProperty */value) {
    this._Property = value;
};

BindingExpressionBase.prototype._GetPropertyPathWalker = function () {
    return this._PropertyPathWalker;
};
BindingExpressionBase.prototype._SetPropertyPathWalker = function (/* _PropertyPathWalker */value) {
    this._PropertyPathWalker = value;
};

//#endregion

BindingExpressionBase.prototype._UpdateSourceObject = function (value, force) {
    if (value === undefined)
        value = GetTarget().GetValue(GetProperty());
    if (force === undefined)
        force = false;
    if (this.GetBinding().Mode !== BindingMode.TwoWay)
        return;
    NotImplemented("BindingExpressionBase._UpdateSourceObject");
};

//#endregion

//#region BindingExpression

function BindingExpression(binding, target, propd) {
    BindingExpressionBase.call(this, binding, target, propd);
}
BindingExpression.InheritFrom(BindingExpressionBase);

BindingExpression.prototype.GetParentBinding = function () {
    return this._GetBinding();
};
BindingExpression.prototype.GetDataItem = function () {
    return this._GetDataSource();
};
BindingExpression.prototype.UpdateSource = function () {
    return this._UpdateSourceObject(undefined, true);
};

//#endregion

//#region BindingOperations

function BindingOperations() {
    RefObject.call(this);
}
BindingOperations.InheritFrom(RefObject);

BindingOperations.SetBinding = function (/* DependencyObject */target, /* DependencyProperty */dp, /* BindingBase */binding) {
    if (target == null)
        throw new ArgumentNullException("target");
    if (dp == null)
        throw new ArgumentNullException("dp");
    if (binding == null)
        throw new ArgumentNullException("binding");

    var e = new BindingExpression(binding, target, dp);
    target.SetValue(dp, e);
    return e;
};

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