/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region ICollectionView

function ICollectionView() {
    RefObject.call(this);
    this.CurrentChanged = new MulticastEvent();
}
ICollectionView.InheritFrom(RefObject);

//#endregion
