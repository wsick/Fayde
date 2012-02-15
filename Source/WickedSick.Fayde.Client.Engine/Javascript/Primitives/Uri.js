/// <reference path="RefObject.js"/>
/// CODE

//#region Uri

function Uri(os) {
    RefObject.call(this);

    if (!os)
        return;
    this._OriginalString = os;
}
Uri.InheritFrom(RefObject);

Uri.prototype.GetFragment = function () {
    ///<returns type="String"></returns>

    //this._OriginalString.lastIndexOf("");
};

Uri.prototype.toString = function () {
    return this._OriginalString;
};

//#endregion