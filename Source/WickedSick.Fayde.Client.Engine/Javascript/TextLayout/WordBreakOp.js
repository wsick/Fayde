/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _WordBreakOp

function _WordBreakOp() {
    this._Advance = 0.0;
    this._Index = 0;
    this._Btype = 0;
    this._C = '';
}
Nullstone.Create(_WordBreakOp, "_WordBreakOp");
_WordBreakOp.prototype.Copy = function () {
    var newOp = new _WordBreakOp();
    newOp._Advance = this._Advance;
    newOp._Btype = this._Btype;
    newOp._C = this._C;
    newOp._Index = this._Index;
};
_WordBreakOp.prototype.SetWordBasics = function (word) {
    word._Length = this._Index;
    word._Advance = this._Advance;
};

//#endregion