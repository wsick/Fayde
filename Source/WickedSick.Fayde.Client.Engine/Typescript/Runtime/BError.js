/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var BError = (function () {
    function BError() { }
    BError.Argument = 2;
    BError.InvalidOperation = 3;
    BError.XamlParse = 5;
    BError.Attach = 6;
    BError.prototype.ThrowException = function () {
        var ex;
        switch(this.Number) {
            case BError.Attach:
                ex = new AttachException(this.Message, this.Data);
                Fayde.VisualTreeHelper.__Debug((ex).Data.ParentNode);
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
    return BError;
})();
Nullstone.RegisterType(BError, "BError");
//@ sourceMappingURL=BError.js.map
