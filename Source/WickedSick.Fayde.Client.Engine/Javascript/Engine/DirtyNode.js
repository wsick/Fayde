/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

//#region DirtyNode
var DirtyNode = Nullstone.Create("DirtyNode", LinkedListNode, 1);

DirtyNode.Instance.Init = function (element) {
    /// <param name="element" type="UIElement"></param>
    this.Init$LinkedListNode();
    this.Element = element;
};

Nullstone.FinishCreate(DirtyNode);
//#endregion