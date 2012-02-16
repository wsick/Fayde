/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Expression.js"/>
/// CODE

//#region TemplateBindingExpression

function TemplateBindingExpression(sourcePropd, targetPropd) {
    Expression.call(this);
    this.SourceProperty = sourcePropd;
    this.TargetProperty = targetPropd;
}
TemplateBindingExpression.InheritFrom(Expression);

TemplateBindingExpression.prototype.GetValue = function (propd) {
    var source = this.Target.GetTemplateOwner();
    var value = null;
    if (source != null)
        value = source.GetValue(this.SourceProperty);
    return value; //TODO: Send through TypeConverter
};
TemplateBindingExpression.prototype._OnAttached = function (element) {
    Expression.prototype._OnAttached.call(this, element);

    this.Target = element;
    var listener = this.GetListener();
    if (listener != null) {
        listener.Detach();
        listener = null;
        this.SetListener(listener);
    }

    var c = RefObject.As(this.Target, ContentControl);
    if (this.TargetProperty === ContentControl.ContentProperty && c != null) {
        this.SetsParent = c._ContentSetsParent;
        c._ContentSetsParent = false;
    }

    var source = this.Target.GetTemplateOwner();
    if (source != null) {
        listener = new PropertyChangedListener(source, this.SourceProperty, this, this.OnPropertyChanged);
        this.SetListener(listener);
    }
};
TemplateBindingExpression.prototype._OnDetached = function (element) {
    Expression.prototype._OnDetached.call(this, element);

    var listener = this.GetListener();
    if (listener == null)
        return;

    var c = RefObject.As(this.Target, ContentControl);
    if (c != null)
        c._ContentSetsParent = this.SetsParent;

    listener.Detach();
    listener = null;
    this.SetListener(listener);
    this.Target = null;
};
TemplateBindingExpression.prototype.OnPropertyChanged = function (sender, args) {
    try {
        // Type converting doesn't happen for TemplateBindings
        this.SetUpdating(true);
        try {
            this.Target.SetValue(this.TargetProperty, this.GetValue(null));
        } catch (err2) {
            this.Target.SetValue(this.TargetProperty, this.TargetProperty.GetDefaultValue(this.Target));
        }
    } catch (err) {

    } finally {
        this.SetUpdating(false);
    }
};

TemplateBindingExpression.prototype.GetListener = function () {
    /// <returns type="PropertyChangedListener" />
    return this._Listener;
};
TemplateBindingExpression.prototype.SetListener = function (value) {
    /// <param name="value" type="PropertyChangedListener"></param>
    this._Listener = value;
};

//#endregion
