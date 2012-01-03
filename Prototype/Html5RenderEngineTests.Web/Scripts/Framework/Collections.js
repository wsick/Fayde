/// <reference path="List.js"/>
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

//#endregion

//#region ResourceDictionary

ResourceDictionary.prototype = new Collection;
ResourceDictionary.prototype.constructor = ResourceDictionary;
function ResourceDictionary() {
    Collection.call(this);
}

//#endregion

//#region ResourceDictionaryCollection

ResourceDictionaryCollection.prototype = new DependencyObjectCollection;
ResourceDictionaryCollection.prototype.constructor = ResourceDictionaryCollection;
function ResourceDictionaryCollection() {
    DependencyObjectCollection.call(this);
}
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

var _VisualTreeWalkerDirection = {
    Logical: 0,
    LogicalReverse: 1,
    ZForward: 2,
    ZReverse: 3
};

//#region _VisualTreeWalker

_VisualTreeWalker.prototype = new Object;
_VisualTreeWalker.prototype.constructor = _VisualTreeWalker;
function _VisualTreeWalker(/* UIElement */obj, /* _VisualTreeWalkerDirection */direction) {
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

_DeepTreeWalker.prototype = new Object;
_DeepTreeWalker.prototype.constructor = _DeepTreeWalker;
_DeepTreeWalker.prototype._WalkList = new List();
_DeepTreeWalker.prototype._Last = null;
_DeepTreeWalker.prototype._Direction = _VisualTreeWalkerDirection.Logical;
function _DeepTreeWalker(/* UIElement */top, /* _VisualTreeWalkerDirection */direction) {
    this._WalkList.Append(new UIElementNode(top));
    if (direction)
        this._Direction = direction;
}
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