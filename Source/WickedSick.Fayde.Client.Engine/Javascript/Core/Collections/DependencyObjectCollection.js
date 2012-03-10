/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Collection.js"/>
/// <reference path="../DependencyObject.js"/>
/// CODE

//#region DependencyObjectCollection
var DependencyObjectCollection = Nullstone.Create("DependencyObjectCollection", Collection, 1);

DependencyObjectCollection.Instance.Init = function (setsParent) {
    this.Init$super();
    this._IsSecondaryParent = false;
    this._SetsParent = !setsParent ? true : setsParent;
};

DependencyObjectCollection.Instance.IsElementType = function (value) {
    return value instanceof DependencyObject;
};

DependencyObjectCollection.Instance._GetIsSecondaryParent = function () {
    return this._IsSecondaryParent;
};
DependencyObjectCollection.Instance._SetIsSecondaryParent = function (value) {
    this._IsSecondaryParent = value;
};

DependencyObjectCollection.Instance._OnMentorChanged = function (oldValue, newValue) {
    this._OnMentorChanged$super(oldValue, newValue);
    for (var i = 0; i < this._ht.length; i++) {
        if (this._ht[i] instanceof DependencyObject)
            this._ht[i].SetMentor(newValue);
    }
};

DependencyObjectCollection.Instance.AddedToCollection = function (value, error) {
    if (this._SetsParent) {
        var existingParent = value._GetParent();
        value._AddParent(this, true, error);
        if (!error.IsErrored() && existingParent == null && this._GetIsSecondaryParent() != null)
            value._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
    } else {
        value.SetMentor(this.GetMentor());
    }

    value.PropertyChanged.Subscribe(this._OnSubPropertyChanged, this);

    var rv = this.AddedToCollection$super(value, error);
    value._SetIsAttached(rv && this._IsAttached);
    if (!rv) {
        if (this._SetsParent) {
            value._RemoveParent(this, error);
            value.SetMentor(this.GetMentor());
        } else {
            value.SetMentor(null);
        }
    }
    return rv;
};
DependencyObjectCollection.Instance.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof DependencyObject) {
            value.PropertyChanged.Unsubscribe(this._OnSubPropertyChanged, this);
            if (this._GetIsSecondaryParent())
                value._RemoveSecondaryParent(this);

            if (this._SetsParent && RefObject.RefEquals(value._GetParent(), this))
                value._RemoveParent(this, null);
            value._SetIsAttached(false);
        }
    }
};
DependencyObjectCollection.Instance._OnIsAttachedChanged = function (value) {
    this._OnIsAttachedChanged$super(value);
    for (var i = 0; i < this.GetCount(); i++) {
        var val = this.GetValueAt(i);
        if (val instanceof DependencyObject)
            val._SetIsAttached(value);
    }
};
DependencyObjectCollection.Instance._OnSubPropertyChanged = function (sender, args) {
    this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
};

Nullstone.FinishCreate(DependencyObjectCollection);
//#endregion