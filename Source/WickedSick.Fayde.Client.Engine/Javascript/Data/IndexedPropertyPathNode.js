/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="PropertyPathNode.js"/>
/// CODE

(function (namespace) {
    var _IndexedPropertyPathNode = Nullstone.Create("_IndexedPropertyPathNode", _PropertyPathNode, 1);

    _IndexedPropertyPathNode.Instance.Init = function (index) {
        this.Init$_PropertyPathNode();
        this._isBroken = false;
        var val = parseInt(index, 10);
        if (isNaN(val))
            this._Index = index;
        else
            this._Index = val;
    };

    _IndexedPropertyPathNode.Instance.UpdateValue = function () {
        if (this.PropertyInfo == null) {
            this._isBroken = true;
            this.ValueType = null;
            this.UpdateValueAndIsBroken(null, this._isBroken);
            return;
        }

        try {
            var newVal = this.PropertyInfo.GetValue(this.Source, [this._Index]);
            this._isBroken = false;
            this.ValueType = this.PropertyInfo.PropertyType;
            this.UpdateValueAndIsBroken(newVal, this._isBroken);
        } catch (err) {
            this._isBroken = true;
            this.ValueType = null;
            this.UpdateValueAndIsBroken(null, this._isBroken);
        }
    };
    _IndexedPropertyPathNode.Instance.SetValue = function (value) {
        if (this.PropertyInfo != null)
            this.PropertyInfo.SetValue(this.Source, value, [this._Index]);
    };

    _IndexedPropertyPathNode.Instance._CheckIsBroken = function () {
        return this._isBroken || this._CheckIsBroken$_PropertyPathNode();
    };

    _IndexedPropertyPathNode.Instance.OnSourcePropertyChanged = function (o, e) {
        this.UpdateValue();
        if (this.Next != null)
            this.Next.SetSource(this.Value);
    };
    _IndexedPropertyPathNode.Instance.OnSourceChanged = function (oldSource, newSource) {
        this.OnSourceChanged$_PropertyPathNode(oldSource, newSource);
        if (this.Listener != null) {
            this.Listener.Detach();
            this.Listener = null;
        }

        if (Nullstone.DoesImplement(newSource, INotifyCollectionChanged)) {
            //TODO: CollectionChangedListener
            //this.Listener = new CollectionChangedListener(newSource, this, this.CollectionChanged);
        }

        this._GetIndexer();
    };

    _IndexedPropertyPathNode.Instance._GetIndexer = function () {
        //TODO: Implement
    };

    _IndexedPropertyPathNode.Instance.CollectionChanged = function (o, e) {
        this.UpdateValue();
        if (this.Next != null)
            this.Next.SetSource(this.Value);
    };

    Nullstone.Property(_IndexedPropertyPathNode, "Index", {
        get: function () { return this._Index; }
    });

    namespace._IndexedPropertyPathNode = Nullstone.FinishCreate(_IndexedPropertyPathNode);
})(window);