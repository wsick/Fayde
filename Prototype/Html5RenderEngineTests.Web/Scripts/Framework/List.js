/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Primitives.js"/>

//#region List

function List() {
    RefObject.call(this);
    this._Count = 0;
    this._Head = null;
    this._Tail = null;
}
List.InheritFrom(RefObject);

List.prototype.First = function () {
    return this._Head;
};
List.prototype.Last = function () {
    return this._Tail;
};
List.prototype.IsEmpty = function () {
    return !this._Head;
};
List.prototype.Prepend = function (node) {
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
List.prototype.Append = function (node) {
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
List.prototype.Remove = function (node) {
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
List.prototype.InsertBefore = function (node, before) {
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
List.prototype.Clear = function () {
    this._Count = 0;
    this._Head = null;
    this._Tail = null;
};

//#endregion

//#region Node

function Node() {
    RefObject.call(this);
    this.Previous = null;
    this.Next = null;
}
Node.InheritFrom(RefObject);

//#endregion

//#region UIElementNode

function UIElementNode(/* UIElement */element) {
    Node.call(this);
    this.UIElement = element;
}
UIElementNode.InheritFrom(Node);

//#endregion

//#region DirtyNode

function DirtyNode(/* UIElement */element) {
    Node.call(this);
    this.Element = element;
}
DirtyNode.InheritFrom(Node);

//#endregion

//#region Dictionary

function Dictionary() {
    RefObject.call(this);
    this._ht = new Array();
}
Dictionary.InheritFrom(RefObject);

Dictionary.prototype.TryGetValue = function (key, refParam) {
    refParam.Value = this._ht[key];
    return refParam.Value != null;
};
Dictionary.prototype.Add = function (key, value) {
    this._ht[key] = value;
};
Dictionary.prototype.Remove = function (key) {
    delete this._ht[key];
};

//#endregion