/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

//#region DirtyNode

function DirtyNode(element) {
    /// <param name="element" type="UIElement"></param>
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this.Element = element;
}
Nullstone.Extend(DirtyNode, "DirtyNode", LinkedListNode);

//#endregion
