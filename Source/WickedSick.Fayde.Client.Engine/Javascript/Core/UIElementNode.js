/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE
/// <reference path="UIElement.js"/>

//#region UIElementNode

function UIElementNode(element) {
    /// <param name="element" type="UIElement"></param>
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this.UIElement = element;
}
Nullstone.Extend(UIElementNode, "UIElementNode", LinkedListNode);

//#endregion
