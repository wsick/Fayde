function BError() {
    this.Number = 0;
    this.Code = 0;
    this.CharPosition = 0;
    this.LineNumber = 0;
    this.Message = "";
    this.IsErrored = function () {
        return this.Number > 0;
    };
}
BError.prototype = new Object();