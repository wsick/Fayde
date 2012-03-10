/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region ICollectionView
var ICollectionView = Nullstone.Create("ICollectionView");

ICollectionView.Instance.Init = function () {
    this.CurrentChanged = new MulticastEvent();
};

Nullstone.FinishCreate(ICollectionView);
//#endregion