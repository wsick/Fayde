/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="PropertyPathNode.js"/>
/// CODE

//#region _StandardPropertyPathNode
var _StandardPropertyPathNode = Nullstone.Create("_StandardPropertyPathNode", _PropertyPathNode, 2);

_StandardPropertyPathNode.Instance.Init = function (typeName, propertyName) {
    this.Init$_PropertyPathNode();
    this._STypeName = typeName;
    this._PropertyName = propertyName;
};

_StandardPropertyPathNode.Instance.SetValue = function (value) {
    if (this.GetDependencyProperty() != null)
        this.GetSource().SetValue(this.GetDependencyProperty(), value);
    else if (this.GetPropertyInfo() != null)
        this.GetPropertyInfo().SetValue(this.GetSource(), value, null);
};
_StandardPropertyPathNode.Instance.UpdateValue = function () {
    if (this.GetDependencyProperty() != null) {
        this.SetValueType(this.GetDependencyProperty().GetTargetType());
        this._UpdateValueAndIsBroken(this.GetSource().$GetValue(this.GetDependencyProperty()), this._CheckIsBroken());
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

_StandardPropertyPathNode.Instance.OnSourceChanged = function (oldSource, newSource) {
    this.OnSourceChanged$_PropertyPathNode(oldSource, newSource);

    var oldDO = Nullstone.As(oldSource, DependencyObject);
    var newDO = Nullstone.As(newSource, DependencyObject);
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
_StandardPropertyPathNode.Instance.OnPropertyChanged = function (s, e) {
    try {
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this.GetValue());
    } catch (err) {
        //Ignore
    }
};
_StandardPropertyPathNode.Instance.OnSourcePropertyChanged = function (o, e) {
    if (e.PropertyName === this.GetPropertyName() && this.GetPropertyInfo() != null) {
        this.UpdateValue();
        var next = this.GetNext();
        if (next != null)
            next.SetSource(this.GetValue());
    }
};

//#region PROPERTIES

_StandardPropertyPathNode.Instance.GetTypeName = function () {
    return this._STypeName;
};

_StandardPropertyPathNode.Instance.GetPropertyName = function () {
    return this._PropertyName;
};

//#endregion

Nullstone.FinishCreate(_StandardPropertyPathNode);
//#endregion