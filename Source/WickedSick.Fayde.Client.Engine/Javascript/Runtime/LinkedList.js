/// <reference path="Nullstone.js"/>
/// CODE

(function (namespace) {
    var LinkedList = Nullstone.Create("LinkedList");

    LinkedList.Instance.Init = function () {
        this.Clear();
    };

    LinkedList.Instance.IsEmpty = function () {
        return !this.Head;
    };
    LinkedList.Instance.Prepend = function (node) {
        node.Next = this.Head;
        node.Previous = null;
        if (this.Head)
            this.Head.Previous = node;
        else
            this.Tail = node;
        this.Head = node;
        this._Count++;
        return node;
    };
    LinkedList.Instance.Append = function (node) {
        node.Previous = this.Tail;
        node.Next = null;
        if (this.Tail)
            this.Tail.Next = node;
        else
            this.Head = node;
        this.Tail = node;
        this._Count++;
        return node;
    };
    LinkedList.Instance.Remove = function (node) {
        if (node.Previous)
            node.Previous.Next = node.Next;
        else
            this.Head = node.Next;

        if (node.Next)
            node.Next.Previous = node.Previous;
        else
            this.Tail = node.Previous;

        node.Previous = null;
        node.Next = null;

        this._Count--;
    };
    LinkedList.Instance.InsertBefore = function (node, before) {
        if (before == null) {
            this.Append(node);
            return;
        }

        node.Next = before;
        node.Previous = before.Previous;

        if (before.Previous)
            before.Previous.Next = node;
        else
            this.Head = node;

        before.Previous = node;
        this._Count++;
    };
    LinkedList.Instance.InsertAfter = function (node, after) {
        if (after == null) {
            this.Append(node);
            return;
        }

        node.Next = after.Next;
        node.Previous = after;

        if (node.Next)
            node.Next.Previous = node;
        else
            this.Tail = node;

        after.Next = node;
        this._Count++;
    };
    LinkedList.Instance.Clear = function () {
        this._Count = 0;
        this.Head = null;
        this.Tail = null;
    };

    namespace.LinkedList = Nullstone.FinishCreate(LinkedList);
})(window);