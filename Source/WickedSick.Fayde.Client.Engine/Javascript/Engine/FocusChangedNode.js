/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

//#region FocusChangedNode

function FocusChangedNode(lostFocus, gotFocus) {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this.LostFocus = lostFocus;
    this.GotFocus = gotFocus;
}
Nullstone.Extend(FocusChangedNode, "FocusChangedNode", LinkedListNode);

//#endregion
