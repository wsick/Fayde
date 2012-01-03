/// <reference path="DependencyObject.js" />
/// <reference path="UIElement.js" />

//#region Collection

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

//#endregion

//#region DependencyObjectCollection

DependencyObjectCollection.prototype = new Collection;
DependencyObjectCollection.prototype.constructor = DependencyObjectCollection;
function DependencyObjectCollection(setsParent) {
    Collection.call(this);
    this._IsSecondaryParent = false;
    this._SetsParent = !setsParent ? true : setsParent;
}

DependencyObjectCollection.prototype.IsElementType = function (value) {
    return value instanceof DependencyObject;
};

DependencyObjectCollection.prototype._GetIsSecondaryParent = function () {
    return this._IsSecondaryParent;
};
DependencyObjectCollection.prototype._SetIsSecondaryParent = function (value) {
    this._IsSecondaryParent = value;
};

DependencyObjectCollection.prototype._OnMentorChanged = function (oldValue, newValue) {
    DependencyObject.prototype._OnMentorChanged.call(this, oldValue, newValue);
    for (var i = 0; i < this._ht.length; i++) {
        if (this._ht[i] instanceof DependencyObject)
            this._ht[i]._SetMentor(newValue);
    }
};

DependencyObjectCollection.prototype.AddedToCollection = function (value, error) {
    if (this._SetsParent) {
        var existingParent = value._GetParent();
        value._AddParent(this, true, error);
        if (!error.IsErrored() && !existingParent && this._GetIsSecondaryParent())
            value._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
    } else {
        value._SetMentor(this._GetMentor());
    }

    value.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);

    var rv = Collection.prototype.AddedToCollection.call(this, value, error);
    value._IsAttached = rv && this._IsAttached;
    if (!rv) {
        if (this._SetsParent) {
            value._RemoveParent(this, error);
            value._SetMentor(this._GetMentor());
        } else {
            value._SetMentor(null);
        }
    }
    return rv;
};
DependencyObjectCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof DependencyObject) {
            value.Unsubscribe(this._OnSubPropertyChanged, this);
            if (this._GetIsSecondaryParent())
                value._RemoveSecondaryParent(this);

            if (this._SetsParent && value._GetParent() == this)
                value._RemoveParent(this, null);
            value._SetIsAttached(false);
        }
    }
};
DependencyObjectCollection.prototype._OnIsAttachedChanged = function (value) {
    Collection.prototype._OnIsAttachedChanged.call(this, value);
    for (var i = 0; i < this.GetCount(); i++) {
        var value = this.GetValueAt(i);
        if (value instanceof DependencyObject)
            value._SetIsAttached(value);
    }
};
DependencyObjectCollection.prototype._OnSubPropertyChanged = function (sender, args) {
    this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
};

//#endregion

//#region UIElementCollection

UIElementCollection.prototype = new DependencyObjectCollection;
UIElementCollection.prototype.constructor = UIElementCollection;
function UIElementCollection() {
    DependencyObjectCollection.call(this);
    this._ZSorted = new Array();
}
UIElementCollection.prototype.GetValueAtZIndex = function (index) {
    return this._ZSorted[index];
};
UIElementCollection.prototype.GetZSortedCount = function () {
    return this._ZSorted.length;
};
UIElementCollection.prototype.ResortByZIndex = function () {
    var count = this.GetCount();
    this._ZSorted = new Array(count);
    if (count < 1)
        return;

    for (var i = 0; i < count; i++) {
        this._ZSorted[i] = this._ht[i];
    }

    if (count > 1) {
        this._ZSorted.sort(UIElement.ZIndexComparer);
    }
};

//#endregion

//#region ItemChangedArgs

ItemChangedArgs.prototype = new Object;
ItemChangedArgs.prototype.constructor = ItemChangedArgs;
function ItemChangedArgs(item, propd, oldValue, newValue) {
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
}

//#endregion

//#region CollectionChangedArgs

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

//#endregion

//#region ResourceDictionary

ResourceDictionary.prototype = new Collection;
ResourceDictionary.prototype.constructor = ResourceDictionary;
function ResourceDictionary() {
    Collection.call(this);
}

//#endregion