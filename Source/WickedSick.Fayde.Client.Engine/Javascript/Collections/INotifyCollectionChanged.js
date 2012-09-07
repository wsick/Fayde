/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

//#region INotifyCollectionChanged
var INotifyCollectionChanged = Nullstone.Create("INotifyCollectionChanged");

INotifyCollectionChanged.Instance.Init = function () {
    this.CollectionChanged = new MulticastEvent();
};

Nullstone.FinishCreate(INotifyCollectionChanged);
//#endregion