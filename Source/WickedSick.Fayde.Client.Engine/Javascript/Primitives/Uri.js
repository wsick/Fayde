/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
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

    Uri.IsNullOrEmpty = function (uri) {
        /// <param name="uri" type="Uri"></param>
        if (uri == null)
            return true;
        if (uri._OriginalString)
            return false;
        return true;
    };

    namespace.Uri = Nullstone.FinishCreate(Uri);
})(window);