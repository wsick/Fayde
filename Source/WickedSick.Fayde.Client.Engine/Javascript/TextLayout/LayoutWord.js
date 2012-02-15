/// CODE

//#region _LayoutWord

function _LayoutWord() {
    RefObject.call(this);
    this._Advance = 0.0;
    this._LineAdvance = 0.0;
    this._Length = 0;
    this._BreakOps = null;
    this._Font = new Font();
}
_LayoutWord.InheritFrom(RefObject);

//#endregion