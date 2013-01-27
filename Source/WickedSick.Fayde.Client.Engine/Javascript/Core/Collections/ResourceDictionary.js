/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Collection.js"/>
/// CODE

(function (namespace) {
    var ResourceDictionary = Nullstone.Create("ResourceDictionary", Collection);

    ResourceDictionary.Instance.Init = function () {
        this.Init$Collection();
        this._KeyIndex = [];
    };

    //#region Properties

    ResourceDictionary.MergedDictionariesProperty = DependencyProperty.RegisterFull("MergedDictionaries", function () { return ResourceDictionaryCollection; }, ResourceDictionary, undefined, undefined, { GetValue: function () { return new ResourceDictionaryCollection(); } });

    Nullstone.AutoProperties(ResourceDictionary, [
        ResourceDictionary.MergedDictionariesProperty
    ]);

    //#endregion

    ResourceDictionary.Instance.ContainsKey = function (key) {
        return this._KeyIndex[key] != undefined;
    };
    ResourceDictionary.Instance._GetIndexFromKey = function (key) {
        return this._KeyIndex[key];
    };
    ResourceDictionary.Instance.Get = function (key) {
        if (this.ContainsKey(key))
            return this.GetValueAt(this._GetIndexFromKey(key));
        return this._GetFromMergedDictionaries(key);
    };
    ResourceDictionary.Instance._GetFromMergedDictionaries = function (key) {
        var merged = this.MergedDictionaries;

        if (!merged)
            return undefined;

        var count = merged.GetCount();
        for (var i = 0; i < count; i++) {
            var dict = merged.GetValueAt(i);
            var value = dict.Get(key);
            if (value != undefined)
                return value;
        }
        return undefined;
    };
    ResourceDictionary.Instance.Set = function (key, value) {
        var oldValue;
        if (this.ContainsKey(key)) {
            oldValue = this.Get(key);
            this.Remove(oldValue);
        }
        var index = this.Add$Collection(value);
        this._KeyIndex[key] = index;
        this._RaiseChanged(CollectionChangedArgs.Action.Replace, oldValue, value, index);
        return true;
    };
    ResourceDictionary.Instance.Add = function (key, value) {
        this.Set(key, value);
    };
    ResourceDictionary.Instance.Remove = function (key) {
        var index = this._GetIndexFromKey(key);
        if (index > -1 && this.RemoveAt(index)) {
            delete this._KeyIndex[key];
            for (var h in this._KeyIndex) {
                if (this._KeyIndex[h] > index)
                    this._KeyIndex[h] -= 1;
            }
            return true;
        }
    };

    ResourceDictionary.Instance.AddedToCollection = function (value, error) {
        var rv = false;
        var obj = Nullstone.As(value, Fayde.DependencyObject);
        if (obj) {
            if (obj._Parent && !ResourceDictionary._CanBeAddedTwice(value)) {
                error.SetErrored(BError.InvalidOperation, "Element is already a child of another element.");
                return false;
            }
            obj._AddParent(this, true, error);
            if (error.IsErrored())
                return false;
            obj._SetIsAttached(this._IsAttached);
            obj.AddPropertyChangedListener(this);

            //WTF: if (!from_resource_dictionary_api)...
        }

        rv = this.AddedToCollection$Collection(value, error);

        if (rv /* && !from_resource_dictionary_api */ && obj) {
            this._RaiseChanged(CollectionChangedArgs.Action.Add, undefined, obj, obj.Name);
        }

        return rv;
    };
    ResourceDictionary.Instance.RemovedFromCollection = function (value, isValueSafe) {
        if (isValueSafe && value instanceof Fayde.DependencyObject) {
            var obj = Nullstone.As(value, Fayde.DependencyObject);
            if (obj) {
                obj.RemovePropertyChangedListener(this);
                obj._RemoveParent(this, null);
                obj._SetIsAttached(false);
            }
        }
        this.RemovedFromCollection$Collection(value, isValueSafe);
    };

    ResourceDictionary.Instance._OnIsAttachedChanged = function (value) {
        this._OnIsAttachedChanged$Collection(value);

        for (var i = 0; i < this._ht.length; i++) {
            var obj = this._ht[i];
            if (obj instanceof Fayde.DependencyObject)
                obj._SetIsAttached(value);
        }
    };
    ResourceDictionary.Instance._OnMentorChanged = function (oldValue, newValue) {
        this._OnMentorChanged$Collection(oldValue, newValue);
        for (var i = 0; i < this._KeyIndex.length; i++) {
            Fayde.DependencyObject._PropagateMentor(this._KeyIndex[i], this.GetValueAt(this._KeyIndex[i]), newValue);
        }
    };

    ResourceDictionary.Instance._RegisterAllNamesRootedAt = function (namescope, error) {
        /// <param name="namescope" type="NameScope"></param>
        /// <param name="error" type="BError"></param>
        for (var i = 0; i < this.GetCount() ; i++) {
            var obj = this.GetValueAt(i);
            if (obj && obj instanceof Fayde.DependencyObject)
                obj._RegisterAllNamesRootedAt(namescope, error);
        }
        this._RegisterAllNamesRootedAt$Collection(namescope, error);
    };
    ResourceDictionary.Instance._UnregisterAllNamesRootedAt = function (fromNs) {
        /// <param name="fromNs" type="NameScope"></param>
        for (var i = 0; i < this.GetCount() ; i++) {
            var obj = this.GetValueAt(i);
            if (obj && obj instanceof Fayde.DependencyObject)
                obj._UnregisterAllNamesRootedAt(fromNs);
        }
        this._UnregisterAllNamesRootedAt$Collection(fromNs);
    };

    ResourceDictionary._CanBeAddedTwice = function (value) {
        //TODO: Uncomment when implemented
        if (value instanceof Fayde.FrameworkTemplate)
            return true;
        if (value instanceof Fayde.Style)
            return true;
        if (value instanceof Fayde.Media.Transform)
            return true;
        if (value instanceof Fayde.Media.Brush)
            return true;
        //if (value instanceof StrokeCollection)
        //  return true;
        //if (value instanceof DrawingAttributes)
        //  return true;
        //if (value instanceof StylusPointCollection)
        //  return true;
        if (value instanceof Fayde.Media.Imaging.BitmapImage)
            return true;
        //if (value instanceof Stroke)
        //  return true;
        //if (value instanceof Invalid)
        //  return true;
        return false;
    };

    namespace.ResourceDictionary = Nullstone.FinishCreate(ResourceDictionary);
})(window);