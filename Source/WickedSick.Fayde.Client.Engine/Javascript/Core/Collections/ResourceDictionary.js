/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="DependencyObjectCollection.js"/>
/// CODE

//#region ResourceDictionary

function ResourceDictionary() {
    Collection.call(this);
    this._KeyIndex = new Array();
}
ResourceDictionary.InheritFrom(Collection);

//#region DEPENDENCY PROPERTIES

ResourceDictionary.MergedDictionariesProperty = DependencyProperty.RegisterFull("MergedDictionaries", function () { return ResourceDictionaryCollection; }, ResourceDictionary, null, { GetValue: function () { return new ResourceDictionaryCollection(); } });
ResourceDictionary.prototype.GetMergedDictionaries = function () {
    return this.GetValue(ResourceDictionary.MergedDictionariesProperty);
};

//#endregion

ResourceDictionary.prototype.ContainsKey = function (key) {
    return this._KeyIndex[key] != undefined;
};
ResourceDictionary.prototype._GetIndexFromKey = function (key) {
    return this._KeyIndex[key];
};
ResourceDictionary.prototype.Get = function (key) {
    if (this.ContainsKey(key))
        return this.GetValueAt(this._GetIndexFromKey(key));
    return this._GetFromMergedDictionaries(key);
};
ResourceDictionary.prototype._GetFromMergedDictionaries = function (key) {
    var merged = this.GetMergedDictionaries();

    if (!merged)
        return undefined;

    for (var i = 0; i < merged.GetCount(); i++) {
        var dict = merged.GetValueAt(i);
        var value = dict.Get(key);
        if (value != undefined)
            return value;
    }
    return undefined;
};
ResourceDictionary.prototype.Set = function (key, value) {
    var oldValue;
    if (this.ContainsKey(key)) {
        oldValue = this.Get(key);
        this.Remove(oldValue);
    }
    var index = Collection.prototype.Add.call(this, value);
    this._KeyIndex[key] = index;
    this._RaiseChanged(CollectionChangedArgs.Action.Replace, oldValue, value, index);
    return true;
};
ResourceDictionary.prototype.Add = function (key, value) {
    this.Set(key, value);
};
ResourceDictionary.prototype.Remove = function (key) {
    var index = this._GetIndexFromKey(key);
    if (index > -1)
        return this.RemoveAt(index);
};

ResourceDictionary.prototype.AddedToCollection = function (value, error) {
    var obj = null;
    var rv = false;

    if (value instanceof DependencyObject) {
        obj = RefObject.As(value, DependencyObject);
        if (obj._GetParent() != null && !ResourceDictionary._CanBeAddedTwice(value)) {
            error.SetErrored(BError.InvalidOperation, "Element is already a child of another element.");
            return false;
        }
        obj._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
        obj._SetIsAttached(this._IsAttached);
        obj.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);

        //WTF: if (!from_resource_dictionary_api)...
    }

    rv = Collection.prototype.AddedToCollection.call(this, value, error);

    if (rv /* && !from_resource_dictionary_api */ && obj != null) {
        this._RaiseChanged(CollectionChangedArgs.Action.Add, null, obj, obj.GetName());
    }

    return rv;
};
ResourceDictionary.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe && value instanceof DependencyObject) {
        var obj = RefObject.As(value, DependencyObject);
        if (obj != null) {
            obj.PropertyChanged.Unsubscribe(this._OnSubPropertyChanged, this);
            obj._RemoveParent(this, null);
            obj._SetIsAttached(false);
        }
    }
    Collection.prototype.RemovedFromCollection.call(this, value, isValueSafe);
};

ResourceDictionary.prototype._OnIsAttachedChanged = function (value) {
    Collection.prototype._OnIsAttachedChanged.call(this, value);

    for (var i = 0; i < this._ht.length; i++) {
        var obj = this._ht[i];
        if (obj instanceof DependencyObject)
            obj._SetIsAttached(value);
    }
};
ResourceDictionary.prototype._OnMentorChanged = function (oldValue, newValue) {
    Collection.prototype._OnMentorChanged.call(this, oldValue, newValue);
    for (var i = 0; i < this._KeyIndex.length; i++) {
        DependencyObject._PropagateMentor(this._KeyIndex[i], this.GetValueAt(this._KeyIndex[i]), newValue);
    }
};

ResourceDictionary.prototype._RegisterAllNamesRootedAt = function (namescope, error) {
    /// <param name="namescope" type="NameScope"></param>
    /// <param name="error" type="BError"></param>
    for (var i = 0; i < this.GetCount(); i++) {
        var obj = this.GetValueAt(i);
        if (obj != null && obj instanceof DependencyObject)
            obj._RegisterAllNamesRootedAt(namescope, error);
    }
    Collection.prototype._RegisterAllNamesRootedAt.call(this, namescope, error);
};
ResourceDictionary.prototype._UnregisterAllNamesRootedAt = function (fromNs) {
    /// <param name="fromNs" type="NameScope"></param>
    for (var i = 0; i < this.GetCount(); i++) {
        var obj = this.GetValueAt(i);
        if (obj != null && obj instanceof DependencyObject)
            obj._UnregisterAllNamesRootedAt(fromNs);
    }
    Collection.prototype._UnregisterAllNamesRootedAt.call(this, fromNs);
};

ResourceDictionary._CanBeAddedTwice = function (value) {
    //TODO: Uncomment when implemented
    var twices = [
        FrameworkTemplate,
        Style,
        //StrokeCollection,
        //DrawingAttributes,
        //Transform,
        Brush,
        //StylusPointCollection,
        //BitmapImage,
        //Stroke,
        //Invalid
    ];

    for (var i = 0; i < twices.length; i++) {
        if (value instanceof twices[i])
            return true;
    }
    return true;
};

//#endregion