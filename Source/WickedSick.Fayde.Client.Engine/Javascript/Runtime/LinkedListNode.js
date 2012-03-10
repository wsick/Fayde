/// <reference path="Nullstone.js"/>
/// CODE

//#region LinkedListNode
var LinkedListNode = Nullstone.Create("LinkedListNode");

LinkedListNode.Instance.Init = function (args) 
    this.Previous = null;
    this.Next = null;
};

Nullstone.FinishCreate(LinkedListNode);
//#endregion