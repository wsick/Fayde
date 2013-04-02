/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="InternalCollection.js"/>
/// <reference path="../DependencyObject.js"/>
/// CODE

(function (namespace) {
    var DependencyObjectCollection = Nullstone.Create("DependencyObjectCollection", Fayde.InternalCollection, 1);

    DependencyObjectCollection.Instance.Init = function (setsParent) {
        this.Init$InternalCollection();
        this._IsSecondaryParent = false;
        this._SetsParent = setsParent == null ? true : setsParent;
    };

    DependencyObjectCollection.Instance.IsElementType = function (value) {
        return value instanceof Fayde.DependencyObject;
    };

    DependencyObjectCollection.Instance._GetIsSecondaryParent = function () {
        return this._IsSecondaryParent;
    };
    DependencyObjectCollection.Instance._SetIsSecondaryParent = function (value) {
        this._IsSecondaryParent = value;
    };

    DependencyObjectCollection.Instance._OnMentorChanged = function (oldValue, newValue) {
        this._OnMentorChanged$InternalCollection(oldValue, newValue);
        for (var i = 0; i < this._ht.length; i++) {
            if (this._ht[i] instanceof Fayde.DependencyObject)
                this._ht[i].SetMentor(newValue);
        }
    };

    DependencyObjectCollection.Instance.AddedToCollection = function (value, error) {
        if (this._SetsParent) {
            var existingParent = value._Parent;
            value._AddParent(this, true, error);
            if (!error.Message && existingParent == null && this._GetIsSecondaryParent() != null)
                value._AddParent(this, true, error);
            if (error.Message)
                return false;
        } else {
            value.SetMentor(this.GetMentor());
        }

        value.AddPropertyChangedListener(this);

        var rv = this.AddedToCollection$InternalCollection(value, error);
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
            if (value instanceof Fayde.DependencyObject) {
                value.RemovePropertyChangedListener(this);
                if (this._GetIsSecondaryParent())
                    value._RemoveSecondaryParent(this);

                if (this._SetsParent && Nullstone.RefEquals(value._Parent, this))
                    value._RemoveParent(this, null);
                value._SetIsAttached(false);
            }
        }
    };
    DependencyObjectCollection.Instance._OnIsAttachedChanged = function (value) {
        this._OnIsAttachedChanged$InternalCollection(value);
        for (var i = 0; i < this.GetCount() ; i++) {
            var val = this.GetValueAt(i);
            if (val instanceof Fayde.DependencyObject)
                val._SetIsAttached(value);
        }
    };
    DependencyObjectCollection.Instance._OnSubPropertyChanged = function (propd, sender, args) {
        this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
    };

    namespace.DependencyObjectCollection = Nullstone.FinishCreate(DependencyObjectCollection);
})(Nullstone.Namespace("Fayde"));