var BError = (function () {
    function BError() { }
    BError.Argument = 2;
    BError.InvalidOperation = 3;
    BError.prototype.ThrowException = function () {
        throw new Exception(this.Message);
    };
    return BError;
})();
//@ sourceMappingURL=BError.js.map
