/// <reference path="../../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../../Runtime/MulticastEvent.js"/>

//#region IListenCollectionChanged
var IListenCollectionChanged = Nullstone.Create("IListenCollectionChanged");

IListenCollectionChanged.Instance.Init = function () {
    this.CollectionChanged = new MulticastEvent();
};

Nullstone.FinishCreate(IListenCollectionChanged);
//#endregion