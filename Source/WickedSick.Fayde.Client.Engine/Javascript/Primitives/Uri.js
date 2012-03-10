/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Uri

function Uri(os) {
    if (!Nullstone.IsReady)
        return;
    this._OriginalString = os;
}
Nullstone.Create(Uri, "Uri");

Uri.prototype.GetFragment = function () {
    ///<returns type="String"></returns>

    //this._OriginalString.lastIndexOf("");
};

Uri.prototype.toString = function () {
    return this._OriginalString;
};

//#endregion