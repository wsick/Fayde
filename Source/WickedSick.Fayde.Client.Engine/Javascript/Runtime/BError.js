/// <reference path="Nullstone.js"/>
/// CODE

(function (namespace) {
    function BError() {
        this._Number = 0;
        this.Code = 0;
        this.CharPosition = 0;
        this.LineNumber = 0;
        this.Message = "";
    }

    BError.prototype.SetErrored = function (number, message, code) {
        this._Number = number;
        this.Message = message;
        this.Code = code || 0;
    };
    BError.prototype.IsErrored = function () {
        return this._Number > 0;
    };
    BError.prototype.toString = function () {
        return "[" + this._Number + "] " + this.Message;
    };
    BError.prototype.CreateException = function () {
        switch (this._Number) {
            case BError.Argument:
                return new ArgumentException(this.Message, this.CharPosition, this.LineNumber);
            case BError.InvalidOperation:
                return new InvalidOperationException(this.Message, this.CharPosition, this.LineNumber);
            case BError.XamlParseException:
                return new XamlParseException(this.Message, this.CharPosition, this.LineNumber);
            default:
                return new Exception(this.Message, this.CharPosition, this.LineNumber);
        }
    };
    BError.UnauthorizedAccess = 1;
    BError.Argument = 2;
    BError.InvalidOperation = 3;
    BError.Exception = 4;
    BError.XamlParseException = 5;
    namespace.BError = BError;
})(window);