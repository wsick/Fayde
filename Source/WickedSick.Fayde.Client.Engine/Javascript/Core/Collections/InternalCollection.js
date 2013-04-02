/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../DependencyObject.js"/>
/// <reference path="../../Runtime/MulticastEvent.js"/>
/// CODE
/// <reference path="CollectionIterator.js"/>

(function (Fayde) {

    //#region CollectionChangedArgs

    function _CollectionChangedArgs(oldValue, newValue, index) {
        this.OldValue = oldValue;
        this.NewValue = newValue;
        this.Index = index;
    }
    _CollectionChangedArgs.Add = function (value, index) {
        var args = new _CollectionChangedArgs(undefined, value, index);
        args.IsAdd = true;
        return args;
    };
    _CollectionChangedArgs.Clearing = function () {
        var args = new _CollectionChangedArgs(undefined, undefined, -1);
        args.IsClearing = true;
        return args;
    };
    _CollectionChangedArgs.Cleared = function () {
        var args = new _CollectionChangedArgs(undefined, undefined, -1);
        args.IsCleared = true;
        return args;
    };
    _CollectionChangedArgs.Remove = function (removed, index) {
        var args = new _CollectionChangedArgs(removed, undefined, index);
        args.IsRemove = true;
        return args;
    };
    _CollectionChangedArgs.Replace = function (removed, added, index) {
        var args = new _CollectionChangedArgs(removed, added, index);
        args.IsReplace = true;
        return args;
    };
    _CollectionChangedArgs.Reset = function () {
        var args = new _CollectionChangedArgs(undefined, undefined, -1);
        args.IsReset = true;
        return args;
    };

    //#endregion

    //#region ItemChangedArgs

    function _ItemChangedArgs(item, propd, oldValue, newValue) {
        this.Item = item;
        this.Property = propd;
        this.OldValue = oldValue;
        this.NewValue = newValue;
    };

    //#endregion

    //#region InternalCollectionIterator

    function InternalCollectionIterator(collection) {
        this._Collection = collection;
        this._Index = -1;
    }
    InternalCollectionIterator.prototype.Next = function (error) {
        /// <param name="error" type="BError"></param>
        /// <returns type="Boolean" />
        this._Index++;
        return this._Index < this._Collection.GetCount();
    };
    InternalCollectionIterator.prototype.Reset = function () {
        this._Index = -1;
    };
    InternalCollectionIterator.prototype.GetCurrent = function (error) {
        if (this._Index < 0 || this._Index >= this._Collection.GetCount()) {
            error.SetErrored(BError.InvalidOperation, "Index out of bounds.");
            return undefined;
        }
        return this._Collection.GetValueAt(this._Index);
    };

    //#endregion

    //#region InternalCollection

    var InternalCollection = Nullstone.Create("InternalCollection", Fayde.DependencyObject);

    var instance = {};
    instance.Init = function () {
        this.Init$DependencyObject();
        this._ht = [];
        this.Changed = new MulticastEvent();
        this.ItemChanged = new MulticastEvent();
    };

    //#region Properties

    InternalCollection.CountProperty = DependencyProperty.RegisterCore("Count", function () { return Number; }, InternalCollection, 0);
    instance.GetCount = function () {
        return this._ht.length;
    };

    //#endregion

    instance.GetValueAt = function (index) {
        return this._ht[index];
    };
    instance.SetValueAt = function (index, value) {
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
            this._RaiseChanged(_CollectionChangedArgs.Replace(removed, added, index));
            return true;
        }
        return false;
    };
    instance.Add = function (value) {
        var rv = this.Insert(this._ht.length, value);
        return rv ? this._ht.length - 1 : -1;
    };
    instance.AddRange = function (newItems) {
        if (newItems == null)
            return false;
        var rawArray = newItems;
        if (rawArray instanceof InternalCollection)
            rawArray = rawArray._ht;

        if (!Array.isArray(rawArray))
            return false;

        var rv = true;
        var count = rawArray.length;
        for (var i = 0; i < count; i++) {
            if (!this.Add(rawArray[i]))
                rv = false;
        }
        return rv;
    };
    instance.Insert = function (index, value) {
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
            this._RaiseChanged(_CollectionChangedArgs.Add(value, index));
            return true;
        }
        if (error.Message)
            throw new Exception(error.Message);
        return false;
    };
    instance.Remove = function (value) {
        var index = this.IndexOf(value);
        if (index == -1)
            return false;
        return this.RemoveAt(index);
    };
    instance.RemoveAt = function (index) {
        /// <param name="index" type="Number"></param>
        /// <returns type="Boolean" />
        if (index < 0 || index >= this._ht.length)
            return false;
        var value = this._ht[index];
        this._ht.splice(index, 1);
        this.RemovedFromCollection(value, true);
        this._RaiseChanged(_CollectionChangedArgs.Remove(value, index));
        return true;
    };
    instance.Clear = function () {
        this._RaiseChanged(_CollectionChangedArgs.Clearing());
        var old = this._ht;
        this._ht = [];
        for (var i = 0; i < old.length; i++) {
            this.RemovedFromCollection(old[i], true);
        }
        this._RaiseChanged(_CollectionChangedArgs.Cleared());
        return true;
    };
    instance.IndexOf = function (value) {
        var count = this.GetCount();
        for (var i = 0; i < count; i++) {
            if (Nullstone.Equals(value, this._ht[i]))
                return i;
        }
        return -1;
    };
    instance.Contains = function (value) {
        return this.IndexOf(value) > -1;
    };
    instance.CanAdd = function (value) { return true; };
    instance.AddedToCollection = function (value, error) { return true; };
    instance.RemovedFromCollection = function (value, isValueSafe) { };
    instance.GetIterator = function () {
        return new InternalCollectionIterator(this);
    };

    instance.ToArray = function () {
        return this._ht.slice(0);
    };

    instance._RaiseItemChanged = function (obj, propd, oldValue, newValue) {
        this.ItemChanged.Raise(this, new _ItemChangedArgs(obj, propd, oldValue, newValue));
    };
    instance._RaiseChanged = function (args) {
        this.Changed.Raise(this, args);
    };

    instance.CloneCore = function (source) {
        this.CloneCore$DependencyObject(source);

        var len = source._ht.length;
        for (var i = 0; i < len; i++) {
            this.Add(Fayde.Clone(source._ht[i]));
        }
    };

    InternalCollection.Instance = instance;
    Fayde.InternalCollection = Nullstone.FinishCreate(InternalCollection);

    //#endregion

})(Nullstone.Namespace("Fayde"));