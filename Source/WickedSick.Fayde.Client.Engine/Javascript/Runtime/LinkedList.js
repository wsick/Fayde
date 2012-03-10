/// <reference path="Nullstone.js"/>
/// CODE

//#region LinkedList
var LinkedList = Nullstone.Create("LinkedList");

LinkedList.Instance.Init = function () {
    this.Clear();
};

LinkedList.Instance.First = function () {
    return this._Head;
};
LinkedList.Instance.Last = function () {
    return this._Tail;
};
LinkedList.Instance.IsEmpty = function () {
    return !this._Head;
};
LinkedList.Instance.Prepend = function (node) {
    node.Next = this._Head;
    node.Previous = null;
    if (this._Head)
        this._Head.Previous = node;
    else
        this._Tail = node;
    this._Head = node;
    this._Count++;
    return node;
};
LinkedList.Instance.Append = function (node) {
    node.Previous = this._Tail;
    node.Next = null;
    if (this._Tail)
        this._Tail.Next = node;
    else
        this._Head = node;
    this._Tail = node;
    this._Count++;
    return node;
};
LinkedList.Instance.Remove = function (node) {
    if (node.Previous)
        node.Previous.Next = node.Next;
    else
        this._Head = node.Next;

    if (node.Next)
        node.Next.Previous = node.Previous;
    else
        this._Tail = node.Previous;

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
        this._Head = node;

    before.Previous = node;
    this._Count++;
};
LinkedList.Instance.Clear = function () {
    this._Count = 0;
    this._Head = null;
    this._Tail = null;
};

Nullstone.FinishCreate(LinkedList);
//#endregion