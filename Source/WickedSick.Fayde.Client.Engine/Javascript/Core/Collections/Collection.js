/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../DependencyObject.js"/>
/// <reference path="../../Runtime/MulticastEvent.js"/>
/// CODE
/// <reference path="ItemChangedArgs.js"/>
/// <reference path="CollectionChangedArgs.js"/>

//#region Collection
var Collection = Nullstone.Create("Collection", DependencyObject);

Collection.Instance.Init = function () {
    this.Init$DependencyObject();
    this._ht = [];
    this.Changed = new MulticastEvent();
    this.ItemChanged = new MulticastEvent();
};

//#region Dependency Properties

Collection.CountProperty = DependencyProperty.RegisterFull("Count", function () { return Number; }, Collection, 0);
Collection.Instance.GetCount = function () {
    return this._ht.length;
};

//#endregion

Collection.Instance.GetValueAt = function (index) {
    return this._ht[index];
};
Collection.Instance.SetValueAt = function (index, value) {
    if (!this.CanAdd(value))
        return false;

    if (index < 0 || index >= this._ht.length)
        return false;

    var removed = this._ht[index];
    var added = value;

    var error = new BError();
    if (this.AddedToCollection(added, error)) {
        this._ht[index] = added;
        this.RemovedFromCollection(removed, true);
        this._RaiseChanged(CollectionChangedArgs.Action.Replace, removed, added, index);
        return true;
    }
    return false;
};
Collection.Instance.Add = function (value) {
    var rv = this.Insert(this._ht.length, value);
    return rv ? this._ht.length - 1 : -1;
};
Collection.Instance.Insert = function (index, value) {
    if (!this.CanAdd(value))
        return false;
    if (index < 0)
        return false;
    var count = this.GetCount();
    if (index > count)
        index = count;

    var error = new BError();
    if (this.AddedToCollection(value, error)) {
        this._ht.splice(index, 0, value);
        this._RaiseChanged(CollectionChangedArgs.Action.Add, undefined, value, index);
        return true;
    }
    return false;
};
Collection.Instance.Remove = function (value) {
    var index = this.IndexOf(value);
    if (index == -1)
        return false;
    return this.RemoveAt(index);
};
Collection.Instance.RemoveAt = function (index) {
    /// <param name="index" type="Number"></param>
    /// <returns type="Boolean" />
    if (index < 0 || index >= this._ht.length)
        return false;
    var value = this._ht[index];
    this._ht.splice(index, 1);
    this.RemovedFromCollection(value, true);
    this._RaiseChanged(CollectionChangedArgs.Action.Remove, value, undefined, index);
    return true;
};
Collection.Instance.Clear = function () {
    this._RaiseChanged(CollectionChangedArgs.Action.Clearing, undefined, undefined, -1);
    var old = this._ht;
    this._ht = [];
    for (var i = 0; i < old.length; i++) {
        this.RemovedFromCollection(old[i], true);
    }
    this._RaiseChanged(CollectionChangedArgs.Action.Cleared, undefined, undefined, -1);
    return true;
};
Collection.Instance.IndexOf = function (value) {
    for (var i = 0; i < this.GetCount(); i++) {
        if (Nullstone.Equals(value, this._ht[i]))
            return i;
    }
    return -1;
};
Collection.Instance.Contains = function (value) {
    return this.IndexOf(value) > -1;
};
Collection.Instance.CanAdd = function (value) { return true; };
Collection.Instance.AddedToCollection = function (value, error) { return true; };
Collection.Instance.RemovedFromCollection = function (value, isValueSafe) { };
Collection.Instance.GetIterator = function () {
    return new CollectionIterator(this);
};

Collection.Instance._RaiseItemChanged = function (obj, propd, oldValue, newValue) {
    this.ItemChanged.Raise(this, new ItemChangedArgs(obj, propd, oldValue, newValue));
};
Collection.Instance._RaiseChanged = function (action, oldValue, newValue, index) {
    this.Changed.Raise(this, new CollectionChangedArgs(action, oldValue, newValue, index));
};

Nullstone.FinishCreate(Collection);
//#endregion