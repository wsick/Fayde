/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
    var _LayoutWord = Nullstone.Create("_LayoutWord");
    _LayoutWord.Instance.Init = function () {
        this._Advance = 0.0;
        this._LineAdvance = 0.0;
        this._Length = 0;
        this._BreakOps = null;
        this._Font = new Font();
    };
    namespace._LayoutWord = Nullstone.FinishCreate(_LayoutWord);
})(window);