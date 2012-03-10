/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Uri
var Uri = Nullstone.Create("Uri", null, 1);

Uri.Instance.Init = function (os) {
    this._OriginalString = os;
};

Uri.Instance.GetFragment = function () {
    ///<returns type="String"></returns>

    //this._OriginalString.lastIndexOf("");
};

Uri.Instance.toString = function () {
    return this._OriginalString;
};

Nullstone.FinishCreate(Uri);
//#endregion