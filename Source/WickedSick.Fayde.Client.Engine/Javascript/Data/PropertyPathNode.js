/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region _PropertyPathNode
var _PropertyPathNode = Nullstone.Create("_PropertyPathNode");

_PropertyPathNode.Instance.Init = function () {
    this.SetIsBroken(true);
    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();
};

_PropertyPathNode.Instance.OnSourceChanged = function (oldSource, newSource) {
};
_PropertyPathNode.Instance.OnSourcePropertyChanged = function (o, e) {
};

_PropertyPathNode.Instance.UpdateValue = function () {
    AbstractMethod("_PropertyPathNode.UpdateValue");
};
_PropertyPathNode.Instance.SetValue = function (value) {
    AbstractMethod("_PropertyPathNode.SetValue");
};
_PropertyPathNode.Instance.SetSource = function (value) {
    if (value == null || !Nullstone.Equals(value, this._Source)) {
        var oldSource = this._Source;
        var listener = this.GetListener();
        if (listener != null) {
            listener.Detach();
            listener = null;
            this.SetListener(listener);
        }

        this._Source = value;
        if (this._Source != null && Nullstone.DoesImplement(this._Source, INotifyPropertyChanged)) {
            listener = new NPCListener(this._Source, this, this.OnSourcePropertyChanged);
            this.SetListener(listener);
        }

        this.OnSourceChanged(oldSource, this._Source);
        this.UpdateValue();
        if (this.GetNext() != null)
            this.GetNext().SetSource(this._Value);
    }
};

_PropertyPathNode.Instance._UpdateValueAndIsBroken = function (newValue, isBroken) {
    var emitBrokenChanged = this.GetIsBroken() !== isBroken;
    var emitValueChanged = !Nullstone.Equals(this.GetValue(), newValue);

    this.SetIsBroken(isBroken);
    this._Value = newValue;

    if (emitValueChanged) {
        this.ValueChanged.Raise(this, new EventArgs());
    } else if (emitBrokenChanged) {
        this.IsBrokenChanged.Raise(this, new EventArgs());
    }
};
_PropertyPathNode.Instance._CheckIsBroken = function () {
    return this.GetSource() == null || (this.GetPropertyInfo() == null && this.GetDependencyProperty() == null);
};

//#region PROPERTIES

_PropertyPathNode.Instance.GetIsBroken = function () {
    /// <returns type="Boolean" />
    return this._IsBroken;
};
_PropertyPathNode.Instance.SetIsBroken = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._IsBroken = value;
};

_PropertyPathNode.Instance.GetDependencyProperty = function () {
    /// <returns type="DependencyProperty" />
    return this._DependencyProperty;
};
_PropertyPathNode.Instance.SetDependencyProperty = function (value) {
    /// <param name="value" type="DependencyProperty"></param>
    this._DependencyProperty = value;
};

_PropertyPathNode.Instance.GetNext = function () {
    /// <returns type="_PropertyPathNode" />
    return this._Next;
};
_PropertyPathNode.Instance.SetNext = function (value) {
    /// <param name="value" type="_PropertyPathNode"></param>
    this._Next = value;
};

_PropertyPathNode.Instance.GetPropertyInfo = function () {
    /// <returns type="PropertyInfo" />
    return this._PropertyInfo;
};
_PropertyPathNode.Instance.SetPropertyInfo = function (value) {
    /// <param name="value" type="PropertyInfo"></param>
    this._PropertyInfo = value;
};

_PropertyPathNode.Instance.GetListener = function () {
    /// <returns type="NPCListener" />
    return this._Listener;
};
_PropertyPathNode.Instance.SetListener = function (value) {
    /// <param name="value" type="NPCListener"></param>
    this._Listener = value;
};

_PropertyPathNode.Instance.GetSource = function () {
    return this._Source;
};

_PropertyPathNode.Instance.GetValue = function () {
    return this._Value;
};

_PropertyPathNode.Instance.GetValueType = function () {
    return this._ValueType;
};
_PropertyPathNode.Instance.SetValueType = function (value) {
    this._ValueType = value;
};

//#endregion

Nullstone.FinishCreate(_PropertyPathNode);
//#endregion