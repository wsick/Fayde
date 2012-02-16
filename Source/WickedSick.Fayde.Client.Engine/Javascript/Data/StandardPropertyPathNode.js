/// <reference path="../Runtime/RefObject.js" />
/// <reference path="PropertyPathNode.js"/>
/// CODE

//#region _StandardPropertyPathNode

function _StandardPropertyPathNode(typeName, propertyName) {
    _PropertyPathNode.call(this);
    this._STypeName = typeName;
    this._PropertyName = propertyName;
}
_StandardPropertyPathNode.InheritFrom(_PropertyPathNode);

_StandardPropertyPathNode.prototype.SetValue = function (value) {
    if (this.GetDependencyProperty() != null)
        this.GetSource().SetValue(this.GetDependencyProperty(), value);
    else if (this.GetPropertyInfo() != null)
        this.GetPropertyInfo().SetValue(this.GetSource(), value, null);
};
_StandardPropertyPathNode.prototype.UpdateValue = function () {
    if (this.GetDependencyProperty() != null) {
        this.SetValueType(this.GetDependencyProperty().GetTargetType());
        this._UpdateValueAndIsBroken(this.GetSource().GetValue(this.GetDependencyProperty()), this._CheckIsBroken());
    } else if (this.GetPropertyInfo() != null) {
        //TODO: this.SetValueType(PropertyInfo.PropertyType);
        this.SetValueType(null);
        try {
            this._UpdateValueAndIsBroken(this.GetPropertyInfo().GetValue(this.GetSource(), null), this._CheckIsBroken());
        } catch (err) {
            this._UpdateValueAndIsBroken(null, this._CheckIsBroken());
        }
    } else {
        this.SetValueType(null);
        this._UpdateValueAndIsBroken(null, this._CheckIsBroken());
    }
};

_StandardPropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
    _PropertyPathNode.prototype.OnSourceChanged.call(this, oldSource, newSource);

    var oldDO = RefObject.As(oldSource, DependencyObject);
    var newDO = RefObject.As(newSource, DependencyObject);
    var listener = this.GetListener();
    if (listener != null) {
        listener.Detach();
        this.SetListener(listener);
    }

    this.SetDependencyProperty(null);
    this.SetPropertyInfo(null);
    if (this.GetSource() == null)
        return;

    if (newDO != null) {
        propd = DependencyProperty.GetDependencyProperty(this.GetSource().constructor, this.GetPropertyName());
        if (propd != null) {
            this.SetDependencyProperty(propd);
            listener = new PropertyChangedListener(newDO, propd, this, this.OnPropertyChanged);
            this.SetListener(listener);
        }
    }

    if (this.GetDependencyProperty() == null || !this.GetDependencyProperty()._IsAttached) {
        this.SetPropertyInfo(PropertyInfo.Find(this.GetSource(), this.GetPropertyName()));
    }
};
_StandardPropertyPathNode.prototype.OnPropertyChanged = function (s, e) {
    try {
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this.GetValue());
    } catch (err) {
        //Ignore
    }
};
_StandardPropertyPathNode.prototype.OnSourcePropertyChanged = function (o, e) {
    if (e.PropertyName === this.GetPropertyName() && this.GetPropertyInfo() != null) {
        this.UpdateValue();
        var next = this.GetNext();
        if (next != null)
            next.SetSource(this.GetValue());
    }
};

//#region PROPERTIES

_StandardPropertyPathNode.prototype.GetTypeName = function () {
    return this._STypeName;
};

_StandardPropertyPathNode.prototype.GetPropertyName = function () {
    return this._PropertyName;
};

//#endregion

//#endregion
