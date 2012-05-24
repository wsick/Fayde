/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="PresentationFrameworkCollection.js"/>
/// <reference path="../../Collections/INotifyCollectionChanged.js"/>
/// CODE

//#region ItemCollection
var ItemCollection = Nullstone.Create("ItemCollection", PresentationFrameworkCollection, 0, [INotifyCollectionChanged]);

ItemCollection.Instance.Init = function () {
    this.Init$PresentationFrameworkCollection();
    this.CollectionChanged = this.ItemsChanged;
    this._ReadOnly = false;
};

ItemCollection.Instance.$SetIsReadOnly = function (readOnly) {
    this._ReadOnly = readOnly;
};
ItemCollection.Instance.$GetIsReadOnly = function () {
    return this._ReadOnly;
};

ItemCollection.Instance._CheckNull = function (action, value) {
    if (value != null)
        return false;
    if (action === NotifyCollectionChangedAction.Remove)
        return true;
    throw new ArgumentException();
};

Nullstone.FinishCreate(ItemCollection);
//#endregion