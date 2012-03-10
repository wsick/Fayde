/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE
/// <reference path="UIElement.js"/>

//#region UIElementNode
var UIElementNode = Nullstone.Create("UIElementNode", LinkedListNode);

UIElementNode.Instance.Init = function (element) {
    /// <param name="element" type="UIElement"></param>
    this.UIElement = element;
};

Nullstone.FinishCreate(UIElementNode);
//#endregion