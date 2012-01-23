/// <reference path="RefObject.js"/>
/// <reference path="DependencyObject.js" />
/// CODE
/// <reference path="List.js"/>
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
Collection.GetBaseClass = function () { return DependencyObject; };

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
Collection.prototype.Clear = function () {
    this._RaiseChanged(CollectionChangedArgs.Action.Clearing, null, null, -1);
    var old = this._ht;
    this._ht = new Array();
    for (var i = 0; i < old.length; i++) {
        this.RemovedFromCollection(old[i], true);
    }
    this._RaiseChanged(CollectionChangedArgs.Action.Cleared, null, null, -1);
    return true;
};
Collection.prototype.IndexOf = function (value) {
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
Collection.prototype.GetIterator = function () {
    return new CollectionIterator(this);
};

Collection.prototype._RaiseItemChanged = function (obj, propd, oldValue, newValue) {
    this.ItemChanged.Raise(this, new ItemChangedArgs(obj, propd, oldValue, newValue));
};
Collection.prototype._RaiseChanged = function (action, oldValue, newValue, index) {
    this.Changed.Raise(this, new CollectionChangedArgs(action, oldValue, newValue, index));
};

//#endregion

//#region CollectionIterator

CollectionIterator.prototype = new RefObject;
CollectionIterator.prototype.constructor = CollectionIterator;
function CollectionIterator(collection) {
    RefObject.call(this);
    this._Collection = collection;
    this._Index = -1;
}
CollectionIterator.GetBaseClass = function () { return RefObject; };

CollectionIterator.prototype.Next = function (error) {
    this._Index++;
    return this._Index < this._Collection.GetCount();
};
CollectionIterator.prototype.Reset = function () {
    this._Index = -1;
};
CollectionIterator.prototype.GetCurrent = function (error) {
    if (this._Index < 0 || this._Index >= this._Collection.GetCount()) {
        error.SetErrored(BError.InvalidOperation, "Index out of bounds.");
        return null;
    }
    return this._Collection.GetValueAt(this._Index);
};

//#endregion

//#region ItemChangedArgs

ItemChangedArgs.prototype = new RefObject;
ItemChangedArgs.prototype.constructor = ItemChangedArgs;
function ItemChangedArgs(item, propd, oldValue, newValue) {
    RefObject.call(this);
    this.Item = item;
    this.Property = propd;
    this.OldValue = oldValue;
    this.NewValue = newValue;
}
ItemChangedArgs.GetBaseClass = function () { return RefObject; };

//#endregion

//#region CollectionChangedArgs

CollectionChangedArgs.Action = {
    Clearing: 0,
    Cleared: 1,
    Add: 2,
    Remove: 3,
    Replace: 4
};
CollectionChangedArgs.prototype = new RefObject;
CollectionChangedArgs.prototype.constructor = CollectionChangedArgs;
function CollectionChangedArgs(action, oldValue, newValue, index) {
    RefObject.call(this);
    this.Action = action;
    this.OldValue = oldValue;
    this.NewValue = newValue;
    this.Index = index;
}
CollectionChangedArgs.GetBaseClass = function () { return RefObject; };

//#endregion

//#region DependencyObjectCollection

DependencyObjectCollection.prototype = new Collection;
DependencyObjectCollection.prototype.constructor = DependencyObjectCollection;
function DependencyObjectCollection(setsParent) {
    Collection.call(this);
    this._IsSecondaryParent = false;
    this._SetsParent = !setsParent ? true : setsParent;
}
DependencyObjectCollection.GetBaseClass = function () { return Collection; };

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

            if (this._SetsParent && value._GetParent().RefEquals(this))
                value._RemoveParent(this, null);
            value._SetIsAttached(false);
        }
    }
};
DependencyObjectCollection.prototype._OnIsAttachedChanged = function (value) {
    Collection.prototype._OnIsAttachedChanged.call(this, value);
    for (var i = 0; i < this.GetCount(); i++) {
        var val = this.GetValueAt(i);
        if (val instanceof DependencyObject)
            val._SetIsAttached(value);
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
UIElementCollection.GetBaseClass = function () { return DependencyObjectCollection; };

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
UIElementCollection.prototype.IsElementType = function (value) {
    return value instanceof UIElement;
};

//#endregion

//#region InlineCollection

InlineCollection.prototype = new DependencyObjectCollection;
InlineCollection.prototype.constructor = InlineCollection;
function InlineCollection() {
    DependencyObjectCollection.call(this);
}
InlineCollection.GetBaseClass = function () { return DependencyObjectCollection; };

InlineCollection.prototype.AddedToCollection = function (value, error) {
    if (this._ForHyperlink) {
        if (false) { //TODO: if (!this._IsValueSupportedInHyperlinkn(value)) {
            error.SetErrored(BError.Argument, "Invalid value in Hyperlink");
            return false;
        }
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};
InlineCollection.prototype.Equals = function (inlines) {
    NotImplemented("InlineCollection.Equals");
};
InlineCollection.prototype.IsElementType = function (value) {
    return value instanceof Inline;
};
InlineCollection.prototype._SetIsForHyperlink = function () { this._ForHyperlink = true; };

//#endregion

//#region ResourceDictionary

ResourceDictionary.prototype = new Collection;
ResourceDictionary.prototype.constructor = ResourceDictionary;
function ResourceDictionary() {
    Collection.call(this);
    this._KeyIndex = new Array();
}
ResourceDictionary.GetBaseClass = function () { return Collection; };

ResourceDictionary.MergedDictionariesProperty = DependencyProperty.Register("MergedDictionaries", ResourceDictionary, null, { GetValue: function () { return new ResourceDictionaryCollection(); } });
ResourceDictionary.prototype.GetMergedDictionaries = function () {
    return this.GetValue(ResourceDictionary.MergedDictionariesProperty);
};

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

//#region ResourceDictionaryCollection

ResourceDictionaryCollection.prototype = new DependencyObjectCollection;
ResourceDictionaryCollection.prototype.constructor = ResourceDictionaryCollection;
function ResourceDictionaryCollection() {
    DependencyObjectCollection.call(this);
}
ResourceDictionaryCollection.GetBaseClass = function () { return DependencyObjectCollection; };

ResourceDictionaryCollection.prototype.AddedToCollection = function (value, error) {
    if (!DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error))
        return false;
    var parent = this._GetParent();
    if (!parent)
        return true;

    return this._WalkSubtreeLookingForCycle(value, parent, error);
};
ResourceDictionaryCollection.prototype.IsElementType = function (value) {
    return value instanceof ResourceDictionary;
};
ResourceDictionaryCollection.prototype._WalkSubtreeLookingForCycle = function (subtreeRoot, firstAncestor, error) {
    var source = subtreeRoot._GetInternalSource();

    var p = firstAncestor;
    while (p) {
        if (p instanceof ResourceDictionary) {
            var cycleFound = false;
            var rdSource = p._GetInternalSource();
            if (p == subtreeRoot)
                cycleFound = true;
            else if (source && rdSource && !source.localeCompare(rdSource))
                cycleFound = true;

            if (cycleFound) {
                error.SetErrored(BError.InvalidOperation, "Cycle found in resource dictionaries.");
                return false;
            }
        }
        p = p._GetParent();
    }

    var children = subtreeRoot._GetMergedDictionaries();
    for (var i = 0; i < children.GetCount(); i++) {
        if (!this._WalkSubtreeLookingForCycle(children.GetValueAt(i), firstAncestor, error))
            return false;
    }

    return true;
};

//#endregion

//#region GradientStop

GradientStop.prototype = new DependencyObject;
GradientStop.prototype.constructor = GradientStop;
function GradientStop() {
    DependencyObject.call(this);
}
GradientStop.GetBaseClass = function () { return DependencyObject; };

GradientStop.ColorProperty = DependencyProperty.Register("Color", GradientStop, new Color());
GradientStop.prototype.GetColor = function () {
    return this.GetValue(GradientStop.ColorProperty);
};
GradientStop.prototype.SetColor = function (value) {
    this.SetValue(GradientStop.ColorProperty, value);
};

GradientStop.OffsetProperty = DependencyProperty.Register("Offset", GradientStop, 0.0);
GradientStop.prototype.GetOffset = function () {
    return this.GetValue(GradientStop.OffsetProperty);
};
GradientStop.prototype.SetOffset = function (value) {
    this.SetValue(GradientStop.OffsetProperty, value);
};

//#endregion

//#region GradientStopCollection

GradientStopCollection.prototype = new DependencyObjectCollection;
GradientStopCollection.prototype.constructor = GradientStopCollection;
function GradientStopCollection() {
    DependencyObjectCollection.call(this);
}
GradientStopCollection.GetBaseClass = function () { return DependencyObjectCollection; };

GradientStopCollection.prototype.IsElementType = function (value) {
    return value instanceof GradientStop;
};

//#endregion

var _VisualTreeWalkerDirection = {
    Logical: 0,
    LogicalReverse: 1,
    ZForward: 2,
    ZReverse: 3
};

//#region _VisualTreeWalker

_VisualTreeWalker.prototype = new RefObject;
_VisualTreeWalker.prototype.constructor = _VisualTreeWalker;
function _VisualTreeWalker(/* UIElement */obj, /* _VisualTreeWalkerDirection */direction) {
    RefObject.call(this);
    this._Offset = 0;
    this._Collection = null;
    this._Content = obj._GetSubtreeObject();
    if (direction)
        this._Direction = direction;
    else
        this._Direction = _VisualTreeWalkerDirection.Logical;
    if (this._Content) {
        if (this._Content instanceof Collection) {
            this._Collection = this._Content;
            if (this._Content instanceof UIElementCollection)
                this._Direction = _VisualTreeWalkerDirection.Logical;
        }
    }
}
_VisualTreeWalker.GetBaseClass = function () { return RefObject; };

_VisualTreeWalker.prototype.Step = function () {
    var result = null;
    if (this._Collection) {
        var count = this.GetCount();
        if (count < 0 || this._Offset >= count)
            return null;
        if (count == 1 && this._Offset == 0) {
            this._Offset++;
            return this._Collection.GetValueAt(0);
        }

        if (this._Direction == _VisualTreeWalkerDirection.ZForward || this._Direction == _VisualTreeWalkerDirection.ZReverse) {
            if (this._Collection.GetZSortedCount() != count) {
                this._Collection.ResortByZIndex();
            }
        }

        switch (this._Direction) {
            case _VisualTreeWalkerDirection.ZForward:
                result = this._Collection.GetValueAtZIndex(this._Offset);
                break;
            case _VisualTreeWalkerDirection.ZReverse:
                result = this._Collection.GetValueAtZIndex(count - (this._Offset + 1));
                break;
            case _VisualTreeWalkerDirection.Logical:
                result = this._Collection.GetValueAt(this._Offset);
                break;
            case _VisualTreeWalkerDirection.LogicalReverse:
                result = this._Collection.GetValueAt(count - (this._Offset + 1));
                break;
        }
        this._Offset++;
    } else {
        if (this._Offset == 0) {
            this._Offset++;
            result = this._Content;
        }
    }
    return result;
};
_VisualTreeWalker.prototype.GetCount = function () {
    if (!this._Content)
        return 0;
    if (!this._Collection)
        return 1;
    return this._Collection.GetCount();
};

//#endregion

//#region _DeepTreeWalker

_DeepTreeWalker.prototype = new RefObject;
_DeepTreeWalker.prototype.constructor = _DeepTreeWalker;
function _DeepTreeWalker(/* UIElement */top, /* _VisualTreeWalkerDirection */direction) {
    RefObject.call(this);
    this._WalkList = new List();
    this._WalkList.Append(new UIElementNode(top));
    this._Last = null;
    this._Direction = _VisualTreeWalkerDirection.Logical;
    if (direction)
        this._Direction = direction;
}
_DeepTreeWalker.GetBaseClass = function () { return RefObject; };

_DeepTreeWalker.prototype.Step = function () {
    if (this._Last) {
        var walker = new _VisualTreeWalker(this._Last, this._Direction);
        var prepend = this._WalkList.First();
        var child;
        while (child = walker.Step()) {
            this._WalkList.InsertBefore(new UIElementNode(child), prepend);
        }
    }

    var next = this._WalkList.First();
    if (!next) {
        this._Last = null;
        return null;
    }

    var current = next.UIElement;
    this._WalkList.Remove(next);
    this._Last = current;

    return current;
};
_DeepTreeWalker.prototype.SkipBranch = function () {
    this._Last = null;
};

//#endregion