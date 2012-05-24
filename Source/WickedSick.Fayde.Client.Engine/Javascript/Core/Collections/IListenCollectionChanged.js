/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Runtime/MulticastEvent.js"/>
/// CODE

//#region IListenCollectionChanged
var IListenCollectionChanged = Nullstone.Create("IListenCollectionChanged");

IListenCollectionChanged.Instance.Init = function () {
    this.CollectionChanged = new MulticastEvent();
};

Nullstone.FinishCreate(IListenCollectionChanged);
//#endregion