/// <reference path="TextBoxUndoAction.js"/>
/// CODE
/// <reference path="../../TextLayout/TextBuffer.js"/>

//#region _TextBoxUndoActionInsert
var _TextBoxUndoActionInsert = Nullstone.Create("_TextBoxUndoActionInsert", _TextBoxUndoAction, 5);

_TextBoxUndoActionInsert.Instance.Init = function (selectionAnchor, selectionCursor, start, inserted, isAtomic) {
    this._SelectionAnchor = selectionAnchor;
    this._SelectionCursor = selectionCursor;
    this._Start = start;
    this._Length = inserted.length;
    this._Buffer = new _TextBuffer(inserted);
    this._Growable = isAtomic !== true;
};

_TextBoxUndoActionInsert.Instance.Insert = function (start, text) {
    if (!this._Growable || start !== (this._Start + this._Length))
        return false;

    this._Buffer.Append(text);
    this._Length += text.length;
    return true;
};

Nullstone.FinishCreate(_TextBoxUndoActionInsert);
//#endregion