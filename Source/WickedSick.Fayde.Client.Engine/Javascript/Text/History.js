/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="../Runtime/LinkedListNode.js"/>
/// CODE

(function (Text) {
    //#region TextBoxUndoAction

    var _TextBoxUndoAction = Nullstone.Create("_TextBoxUndoAction", LinkedListNode);
    Text._TextBoxUndoAction = Nullstone.FinishCreate(_TextBoxUndoAction);

    //#endregion

    //#region TextBoxUndoActionDelete

    var _TextBoxUndoActionDelete = Nullstone.Create("_TextBoxUndoActionDelete", _TextBoxUndoAction, 5);
    _TextBoxUndoActionDelete.Instance.Init = function (selectionAnchor, selectionCursor, buffer, start, length) {
        this._SelectionAnchor = selectionAnchor;
        this._SelectionCursor = selectionCursor;
        this._Start = start;
        this._Length = length;

        this._Text = buffer._Text.substr(start, length);
    };
    Text._TextBoxUndoActionDelete = Nullstone.FinishCreate(_TextBoxUndoActionDelete);

    //#endregion

    //#region TextBoxUndoActionInsert

    var _TextBoxUndoActionInsert = Nullstone.Create("_TextBoxUndoActionInsert", _TextBoxUndoAction, 5);
    _TextBoxUndoActionInsert.Instance.Init = function (selectionAnchor, selectionCursor, start, inserted, isAtomic) {
        this._SelectionAnchor = selectionAnchor;
        this._SelectionCursor = selectionCursor;
        this._Start = start;
        this._Length = inserted.length;
        this._Buffer = new Fayde.Text._TextBuffer(inserted);
        this._Growable = isAtomic !== true;
    };
    _TextBoxUndoActionInsert.Instance.Insert = function (start, text) {
        if (!this._Growable || start !== (this._Start + this._Length))
            return false;

        this._Buffer.Append(text);
        this._Length += text.length;
        return true;
    };
    Text._TextBoxUndoActionInsert = Nullstone.FinishCreate(_TextBoxUndoActionInsert);

    //#endregion

    //#region TextBoxUndoActionReplace

    var _TextBoxUndoActionReplace = Nullstone.Create("_TextBoxUndoActionReplace", _TextBoxUndoAction, 6);
    _TextBoxUndoActionReplace.Instance.Init = function (selectionAnchor, selectionCursor, buffer, start, length, inserted) {
        this._SelectionAnchor = selectionAnchor;
        this._SelectionCursor = selectionCursor;
        this._Start = start;
        this._Length = length;
        this._Deleted = buffer._Text.substr(start, length);
        this._Inserted = inserted;
    };
    Text._TextBoxUndoActionReplace = Nullstone.FinishCreate(_TextBoxUndoActionReplace);

    //#endregion

    //#region TextBoxUndoStack

    var _TextBoxUndoStack = Nullstone.Create("_TextBoxUndoStack", undefined, 1);

    _TextBoxUndoStack.Instance.Init = function (maxCount) {
        this._MaxCount = maxCount;
        this._ht = [];
    };

    _TextBoxUndoStack.Instance.IsEmpty = function () {
        return this._ht.length === 0;
    };
    _TextBoxUndoStack.Instance.Clear = function () {
        this._ht = [];
    };
    _TextBoxUndoStack.Instance.Push = function (action) {
        /// <param name="action" type="_TextBoxUndoAction"></param>
        this._ht.push(action);
        if (this._ht.length > this._MaxCount)
            this._ht.shift();
    };
    _TextBoxUndoStack.Instance.Peek = function () {
        /// <returns type="_TextBoxUndoAction" />
        if (this._ht.length === 0)
            return null;
        return this._ht[this._ht.length - 1];
    };
    _TextBoxUndoStack.Instance.Pop = function () {
        /// <returns type="_TextBoxUndoAction" />
        if (this._ht.length === 0)
            return null;
        return this._ht.pop();
    };

    Text._TextBoxUndoStack = Nullstone.FinishCreate(_TextBoxUndoStack);

    //#endregion
})(Nullstone.Namespace("Fayde.Text"));