/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region INotifyCollectionChanged
var INotifyCollectionChanged = Nullstone.Create("INotifyCollectionChanged", null);

INotifyCollectionChanged.Instance.Init = function () {
    this.CollectionChanged = new MulticastEvent();
};

Nullstone.FinishCreate(INotifyCollectionChanged);
//#endregion