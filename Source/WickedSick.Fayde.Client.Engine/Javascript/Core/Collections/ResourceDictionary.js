/// <reference path="Collection.js"/>
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
    return this.KeyIndex[key];
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
    var index = this.Add(value);
    this._KeyIndex[key] = index;
    this._RaiseChanged(CollectionChangedArgs.Action.Replace, oldValue, value, index);
    return true;
};

ResourceDictionary.prototype.AddedToCollection = function (value, error) {
    NotImplemented("ResourceDictionary.AddedToCollection");
};
ResourceDictionary.prototype.RemovedFromCollection = function (value, isValueSafe) {
    NotImplemented("ResourceDictionary.RemovedFromCollection");
};

ResourceDictionary.prototype._OnIsAttachedChanged = function (value) {
    Collection.prototype._OnIsAttachedChanged.call(this, value);

    for (var i = 0; i < this._ht.length; i++) {
        var obj = this._ht[i];
        if (obj instanceof DependencyObject)
            obj._SetIsAttached(value);
    }
};

//#endregion