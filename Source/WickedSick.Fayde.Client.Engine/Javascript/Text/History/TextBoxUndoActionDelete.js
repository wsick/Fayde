/// <reference path="TextBoxUndoAction.js"/>
/// CODE

(function (namespace) {
    var _TextBoxUndoActionDelete = Nullstone.Create("_TextBoxUndoActionDelete", _TextBoxUndoAction, 5);

    _TextBoxUndoActionDelete.Instance.Init = function (selectionAnchor, selectionCursor, buffer, start, length) {
        this._SelectionAnchor = selectionAnchor;
        this._SelectionCursor = selectionCursor;
        this._Start = start;
        this._Length = length;

        this._Text = buffer._Text.substr(start, length);
    };

    namespace._TextBoxUndoActionDelete = Nullstone.FinishCreate(_TextBoxUndoActionDelete);
})(window);