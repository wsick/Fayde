/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region _PropertyPathNode
var _PropertyPathNode = Nullstone.Create("_PropertyPathNode");

_PropertyPathNode.Instance.Init = function () {
    this._IsBroken = true;
    this.IsBrokenChanged = new MulticastEvent();
    this.ValueChanged = new MulticastEvent();
};

//#region Properties

Nullstone.AutoProperties(_PropertyPathNode, [
    "DependencyProperty",
    "Next",
    "PropertyInfo",
    "Listener",
    "ValueType"
]);

Nullstone.Property(_PropertyPathNode, "IsBroken", {
    get: function () { return this._IsBroken; }
});
Nullstone.Property(_PropertyPathNode, "Source", {
    get: function () { return this._Source; }
});
Nullstone.Property(_PropertyPathNode, "Value", {
    get: function () { return this._Value; }
});

//#endregion

_PropertyPathNode.Instance.OnSourceChanged = function (oldSource, newSource) { };
_PropertyPathNode.Instance.OnSourcePropertyChanged = function (o, e) { };

_PropertyPathNode.Instance.UpdateValue = function () {
    AbstractMethod("_PropertyPathNode.UpdateValue");
};
_PropertyPathNode.Instance.SetValue = function (value) {
    AbstractMethod("_PropertyPathNode.SetValue");
};

_PropertyPathNode.Instance.SetSource = function (value) {
    if (value == null || !Nullstone.Equals(value, this._Source)) {
        var oldSource = this._Source;
        var listener = this.Listener;
        if (listener) {
            listener.Detach();
            listener = null;
            this.Listener = listener;
        }

        this._Source = value;
        if (this._Source && Nullstone.DoesImplement(this._Source, INotifyPropertyChanged)) {
            listener = new NPCListener(this._Source, this, this.OnSourcePropertyChanged);
            this.Listener = listener;
        }

        this.OnSourceChanged(oldSource, this._Source);
        this.UpdateValue();
        if (this.Next)
            this.Next.SetSource(this._Value);
    }
};

_PropertyPathNode.Instance.UpdateValueAndIsBroken = function (newValue, isBroken) {
    var emitBrokenChanged = this._IsBroken !== isBroken;
    var emitValueChanged = !Nullstone.Equals(this.Value, newValue);

    this._IsBroken = isBroken;
    this._Value = newValue;

    if (emitValueChanged) {
        this.ValueChanged.Raise(this, new EventArgs());
    } else if (emitBrokenChanged) {
        this.IsBrokenChanged.Raise(this, new EventArgs());
    }
};
_PropertyPathNode.Instance._CheckIsBroken = function () {
    return !this.Source || (!this.PropertyInfo && !this.DependencyProperty);
};

Nullstone.FinishCreate(_PropertyPathNode);
//#endregion