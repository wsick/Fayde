/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/PresentationFrameworkCollection.js"/>
/// <reference path="../Collections/INotifyCollectionChanged.js"/>
/// CODE

(function (namespace) {
    var ItemCollection = Nullstone.Create("ItemCollection", Fayde.PresentationFrameworkCollection, 0, [Fayde.Collections.INotifyCollectionChanged]);

    ItemCollection.Instance.Init = function () {
        this.Init$PresentationFrameworkCollection();
        this.CollectionChanged = this.ItemsChanged;
        this._ReadOnly = false;
    };

    ItemCollection.Instance.$GetIsReadOnly = function () {
        return this._ReadOnly;
    };

    ItemCollection.Instance._IsReadOnlyImpl = function () {
        return this._ReadOnly;
    };

    ItemCollection.Instance._CheckNull = function (action, value) {
        if (value != null)
            return false;
        if (action === Fayde.Collections.NotifyCollectionChangedAction.Remove)
            return true;
        throw new ArgumentException();
    };

    namespace.ItemCollection = Nullstone.FinishCreate(ItemCollection);
})(window);