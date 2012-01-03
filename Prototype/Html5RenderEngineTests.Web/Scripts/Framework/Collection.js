/// <reference path="DependencyObject.js" />

Collection.prototype = new DependencyObject;
Collection.prototype.constructor = Collection;
function Collection() {
    DependencyObject.call(this);
    this._ht = new Array();
    this.Changed = new MulticastEvent();
    this.ItemChanged = new MulticastEvent();
}
Collection.CountProperty = DependencyProperty.Register("Count", Collection, 0);
Collection.prototype.GetCount = function () {
    return this._ht.length;
};
Collection.prototype.GetValueAt = function (index) {
    return this._ht[index];
};
Collection.prototype.Add = function (value) {
    var rv = this.Insert(this._ht.length, value);
    return rv ? this._ht.length - 1 : -1;
};
Collection.prototype.Insert = function (index, value) {
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
        this._RaiseChanged(CollectionChangedArgs.Action.Add, null, value, index);
        return true;
    }
    return false;
};
Collection.prototype.Remove = function (value) {
    var index = this.IndexOf(value);
    if (index == -1)
        return false;
    return this.RemoveAt(index);
};
Collection.prototype.RemoveAt = function (index) {
    if (index < 0 || index >= this._ht.length)
        return false;
    var value = this._ht[index];
    this._ht.splice(index, 1);
    this.RemovedFromCollection(value, true);
    this._RaiseChanged(CollectionChangedArgs.Action.Remove, value, null, index);
    return true;
};
Collection.prototype.IndexOf = function (value) {
    var v;
    for (var i = 0; i < this.GetCount(); i++) {
        if (value == this._ht[i])
            return i;
    }
    return -1;
};
Collection.prototype.Contains = function (value) {
    return this.IndexOf(value) > -1;
};
Collection.prototype.CanAdd = function (value) { return true; };
Collection.prototype.AddedToCollection = function (value, error) { return true; };
Collection.prototype.RemovedFromCollection = function (value, isValueSafe) { };

Collection.prototype._RaiseItemChanged = function (obj, propd, oldValue, newValue) {
    this.ItemChanged.Raise(this, new ItemChangedArgs(obj, propd, oldValue, newValue));
};
Collection.prototype._RaiseChanged = function (action, oldValue, newValue, index) {
    this.Changed.Raise(this, new CollectionChangedArgs(action, oldValue, newValue, index));
};


ItemChangedArgs.prototype = new Object;
ItemChangedArgs.prototype.constructor = ItemChangedArgs;
function ItemChangedArgs(item, propd, oldValue, newValue) {
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
}

CollectionChangedArgs.Action = {
    Clearing: 0,
    Cleared: 1,
    Add: 2,
    Remove: 3,
    Replace: 4
};
CollectionChangedArgs.prototype = new Object;
CollectionChangedArgs.prototype.constructor = CollectionChangedArgs;
function CollectionChangedArgs(action, oldValue, newValue, index) {
    this.Action = action;
    this.OldValue = oldValue;
    this.NewValue = newValue;
    this.Index = index;
}