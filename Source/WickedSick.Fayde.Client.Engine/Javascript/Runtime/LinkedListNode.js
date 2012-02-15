/// <reference path="RefObject.js"/>
/// CODE

//#region LinkedListNode

function LinkedListNode() {
    RefObject.call(this);
    this.Previous = null;
    this.Next = null;
}
LinkedListNode.InheritFrom(RefObject);

//#endregion