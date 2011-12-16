function BError() {
    this.Number = 0;
    this.Code = 0;
    this.CharPosition = 0;
    this.LineNumber = 0;
    this.Message = "";
    this.SetErrored = function (number, message, code) {
        this.Number = number;
        this.Message = message;
        this.Code = code || 0;
    };
    this.IsErrored = function () {
        return this.Number > 0;
    };
}
BError.UnauthorizedAccess = 1;
BError.prototype = new Object();