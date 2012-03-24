/// <reference path="TextBoxUndoAction.js"/>
/// CODE

//#region _TextBoxUndoActionDelete
var _TextBoxUndoActionDelete = Nullstone.Create("_TextBoxUndoActionDelete", _TextBoxUndoAction, 5);

_TextBoxUndoActionDelete.Instance.Init = function (selectionAnchor, selectionCursor, buffer, start, length) {
    this._SelectionAnchor = selectionAnchor;
    this._SelectionCursor = selectionCursor;
    this._Start = start;
    this._Length = length;

    this._Text = buffer._Text.substr(start, length);
};

Nullstone.FinishCreate(_TextBoxUndoActionDelete);
//#endregion