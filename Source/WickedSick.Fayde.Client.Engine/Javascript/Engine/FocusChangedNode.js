/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

//#region FocusChangedNode
var FocusChangedNode = Nullstone.Create("FocusChangedNode", LinkedListNode, 2);

FocusChangedNode.Instance.Init = function (lostFocus, gotFocus) {
    this.Init$super();
    this.LostFocus = lostFocus;
    this.GotFocus = gotFocus;
};

Nullstone.FinishCreate(FocusChangedNode);
//#endregion