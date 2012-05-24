/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.js"/>

//#region INotifyCollectionChanged
var INotifyCollectionChanged = Nullstone.Create("INotifyCollectionChanged", null);

INotifyCollectionChanged.Instance.Init = function () {
    this.CollectionChanged = new MulticastEvent();
};

Nullstone.FinishCreate(INotifyCollectionChanged);
//#endregion