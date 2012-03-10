/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _LayoutWord

function _LayoutWord() {
    if (!Nullstone.IsReady)
        return;
    this._Advance = 0.0;
    this._LineAdvance = 0.0;
    this._Length = 0;
    this._BreakOps = null;
    this._Font = new Font();
}
Nullstone.Create(_LayoutWord, "_LayoutWord");

//#endregion