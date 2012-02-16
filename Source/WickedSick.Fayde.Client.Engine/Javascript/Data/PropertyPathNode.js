/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region _PropertyPathNode

function _PropertyPathNode() {
    RefObject.call(this);
    this.SetIsBroken(true);
    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();
}
_PropertyPathNode.InheritFrom(RefObject);

_PropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
};
_PropertyPathNode.prototype.OnSourcePropertyChanged = function (o, e) {
};

_PropertyPathNode.prototype.UpdateValue = function () {
    AbstractMethod("_PropertyPathNode.UpdateValue");
};
_PropertyPathNode.prototype.SetValue = function (value) {
    AbstractMethod("_PropertyPathNode.SetValue");
};
_PropertyPathNode.prototype.SetSource = function (value) {
    if (value == null || !RefObject.Equals(value, this._Source)) {
        var oldSource = this._Source;
        var listener = this.GetListener();
        if (listener != null) {
            listener.Detach();
            listener = null;
            this.SetListener(listener);
        }

        this._Source = value;
        if (this._Source != null && this._Source instanceof RefObject && this._Source.DoesImplement(INotifyPropertyChanged)) {
            listener = new NPCListener(this._Source, this, this.OnSourcePropertyChanged);
            this.SetListener(listener);
        }

        this.OnSourceChanged(oldSource, this._Source);
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this._Value);
    }
};

_PropertyPathNode.prototype._UpdateValueAndIsBroken = function (newValue, isBroken) {
    var emitBrokenChanged = this.GetIsBroken() !== isBroken;
    var emitValueChanged = !RefObject.Equals(this.GetValue(), newValue);

    this.SetIsBroken(isBroken);
    this._Value = newValue;

    if (emitValueChanged) {
        this.ValueChanged.Raise(this, new EventArgs());
    } else if (emitBrokenChanged) {
        this.IsBrokenChanged.Raise(this, new EventArgs());
    }
};
_PropertyPathNode.prototype._CheckIsBroken = function () {
    return this.GetSource() == null || (this.GetPropertyInfo() == null && this.GetDependencyProperty() == null);
};

//#region PROPERTIES

_PropertyPathNode.prototype.GetIsBroken = function () {
    /// <returns type="Boolean" />
    return this._IsBroken;
};
_PropertyPathNode.prototype.SetIsBroken = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._IsBroken = value;
};

_PropertyPathNode.prototype.GetDependencyProperty = function () {
    /// <returns type="DependencyProperty" />
    return this._DependencyProperty;
};
_PropertyPathNode.prototype.SetDependencyProperty = function (value) {
    /// <param name="value" type="DependencyProperty"></param>
    this._DependencyProperty = value;
};

_PropertyPathNode.prototype.GetNext = function () {
    /// <returns type="_PropertyPathNode" />
    return this._Next;
};
_PropertyPathNode.prototype.SetNext = function (value) {
    /// <param name="value" type="_PropertyPathNode"></param>
    this._Next = value;
};

_PropertyPathNode.prototype.GetPropertyInfo = function () {
    /// <returns type="PropertyInfo" />
    return this._PropertyInfo;
};
_PropertyPathNode.prototype.SetPropertyInfo = function (value) {
    /// <param name="value" type="PropertyInfo"></param>
    this._PropertyInfo = value;
};

_PropertyPathNode.prototype.GetListener = function () {
    /// <returns type="NPCListener" />
    return this._Listener;
};
_PropertyPathNode.prototype.SetListener = function (value) {
    /// <param name="value" type="NPCListener"></param>
    this._Listener = value;
};

_PropertyPathNode.prototype.GetSource = function () {
    /// <returns type="RefObject" />
    return this._Source;
};

_PropertyPathNode.prototype.GetValue = function () {
    return this._Value;
};

_PropertyPathNode.prototype.GetValueType = function () {
    return this._ValueType;
};
_PropertyPathNode.prototype.SetValueType = function (value) {
    this._ValueType = value;
};

//#endregion

//#endregion