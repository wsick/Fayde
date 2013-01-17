/// <reference path="Nullstone.js"/>
/// CODE

(function (namespace) {
    var LinkedListNode = Nullstone.Create("LinkedListNode");

    LinkedListNode.Instance.Init = function () {
        this.Previous = null;
        this.Next = null;
    };

    namespace.LinkedListNode = Nullstone.FinishCreate(LinkedListNode);
})(window);