var Uri = (function () {
    function Uri(originalString) {
        this._OriginalString = originalString;
    }
    Uri._TypeName = "Uri";
    Uri.prototype.GetFragment = function () {
        //this._OriginalString.lastIndexOf("");
        return "";
    };
    Uri.prototype.toString = function () {
        return this._OriginalString;
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
//@ sourceMappingURL=Uri.js.map
