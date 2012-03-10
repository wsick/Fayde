/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedList.js"/>
/// CODE

//#region LayoutPass

function LayoutPass() {
    if (!Nullstone.IsReady)
        return;
    this._MeasureList = new LinkedList();
    this._ArrangeList = new LinkedList();
    this._SizeList = new LinkedList();
    this._Count = 0;
    this._Updated = false;
}
Nullstone.Create(LayoutPass, "LayoutPass");

LayoutPass.MaxCount = 250;

//#endregion