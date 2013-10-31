/// <reference path="../Runtime/TypeManagement.ts" />
var BError = (function () {
    function BError() {
    }
    BError.prototype.ThrowException = function () {
        var ex;
        switch (this.Number) {
            case BError.Attach:
                ex = new AttachException(this.Message, this.Data);
                break;
            case BError.Argument:
                ex = new ArgumentException(this.Message);
                break;
            case BError.InvalidOperation:
                ex = new InvalidOperationException(this.Message);
                break;
            case BError.XamlParse:
                ex = new XamlParseException(this.Message);
                break;
            default:
                ex = new Exception(this.Message);
                break;
        }
        throw ex;
    };
    BError.Argument = 2;
    BError.InvalidOperation = 3;
    BError.XamlParse = 5;
    BError.Attach = 6;
    return BError;
})();
Fayde.RegisterType(BError, {
    Name: "BError",
    Namespace: "Fayde"
});
//# sourceMappingURL=BError.js.map
