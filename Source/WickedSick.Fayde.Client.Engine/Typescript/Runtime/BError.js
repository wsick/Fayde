/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var BError = (function () {
    function BError() { }
    BError.Argument = 2;
    BError.InvalidOperation = 3;
    BError.XamlParse = 5;
    BError.prototype.ThrowException = function () {
        throw new Exception(this.Message);
    };
    return BError;
})();
Nullstone.RegisterType(BError, "BError");
//@ sourceMappingURL=BError.js.map
