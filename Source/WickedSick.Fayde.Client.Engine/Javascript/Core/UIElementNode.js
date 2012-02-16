/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE
/// <reference path="UIElement.js"/>

//#region UIElementNode

function UIElementNode(element) {
    /// <param name="element" type="UIElement"></param>
    LinkedListNode.call(this);
    this.UIElement = element;
}
UIElementNode.InheritFrom(LinkedListNode);

//#endregion
