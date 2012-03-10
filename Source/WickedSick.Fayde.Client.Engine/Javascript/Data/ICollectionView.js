/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region ICollectionView

function ICollectionView() {
    if (!Nullstone.IsReady)
        return;
    this.CurrentChanged = new MulticastEvent();
}
Nullstone.Create(ICollectionView, "ICollectionView");

//#endregion