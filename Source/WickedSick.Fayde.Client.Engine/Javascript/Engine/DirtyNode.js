/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

//#region DirtyNode

function DirtyNode(element) {
    /// <param name="element" type="UIElement"></param>
    LinkedListNode.call(this);
    this.Element = element;
}
DirtyNode.InheritFrom(LinkedListNode);

//#endregion