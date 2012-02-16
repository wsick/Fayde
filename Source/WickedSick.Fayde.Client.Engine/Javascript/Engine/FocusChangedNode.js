/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

//#region FocusChangedNode

function FocusChangedNode(lostFocus, gotFocus) {
    LinkedListNode.call(this);
    this.LostFocus = lostFocus;
    this.GotFocus = gotFocus;
}
FocusChangedNode.InheritFrom(LinkedListNode);

//#endregion
