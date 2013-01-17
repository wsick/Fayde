/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="TextBoxUndoAction.js"/>

(function (namespace) {
    var _TextBoxUndoStack = Nullstone.Create("_TextBoxUndoStack", null, 1);

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

    namespace._TextBoxUndoStack = Nullstone.FinishCreate(_TextBoxUndoStack);
})(window);