/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var Uri = (function () {
    function Uri(originalString) {
        this._OriginalString = originalString;
    }
    Uri.prototype.GetFragment = function () {
        //this._OriginalString.lastIndexOf("");
        return "";
    };
    Uri.prototype.toString = function () {
        return this._OriginalString;
    };
    Uri.prototype.Clone = function () {
        return new Uri(this._OriginalString);
    };
    Uri.IsNullOrEmpty = function IsNullOrEmpty(uri) {
        if(uri == null) {
            return true;
        }
        if(uri._OriginalString) {
            return false;
        }
        return true;
    };
    return Uri;
})();
Nullstone.RegisterType(Uri, "Uri");
//@ sourceMappingURL=Uri.js.map
