/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Runtime/LinkedList.js"/>
/// CODE

//#region LayoutPass

function LayoutPass() {
    RefObject.call(this);
    this._MeasureList = new LinkedList();
    this._ArrangeList = new LinkedList();
    this._SizeList = new LinkedList();
    this._Count = 0;
    this._Updated = false;
}
LayoutPass.InheritFrom(RefObject);

LayoutPass.MaxCount = 250;

//#endregion
