/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

//#region _TextLayoutAttributes

function _TextLayoutAttributes(source, start) {
    LinkedListNode.call(this);
    this._Source = source;
    this._Start = start == null ? 0 : start;
}
_TextLayoutAttributes.InheritFrom(LinkedListNode);

_TextLayoutAttributes.prototype.GetBackground = function (selected) { return this._Source.GetBackground(selected); };
_TextLayoutAttributes.prototype.GetForeground = function (selected) { return this._Source.GetForeground(selected); };
_TextLayoutAttributes.prototype.GetFont = function () { return this._Source.GetFont(); };
_TextLayoutAttributes.prototype.GetDirection = function () { return this._Source.GetDirection(); };
_TextLayoutAttributes.prototype.IsUnderlined = function () { return this._Source.GetTextDecorations() & TextDecorations.Underline; };

//#endregion
