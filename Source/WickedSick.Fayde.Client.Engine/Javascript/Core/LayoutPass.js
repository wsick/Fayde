/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedList.js"/>
/// CODE

//#region LayoutPass
var LayoutPass = Nullstone.Create("DependencyObject");

LayoutPass.Instance.Init = function () {
    this._MeasureList = new LinkedList();
    this._ArrangeList = new LinkedList();
    this._SizeList = new LinkedList();
    this._Count = 0;
    this._Updated = false;
};

LayoutPass.MaxCount = 250;

Nullstone.FinishCreate(DependencyObject);
//#endregion