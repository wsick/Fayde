/// <reference path="RefObject.js"/>

function BError() {
    RefObject.call(this);
    this._Number = 0;
    this.Code = 0;
    this.CharPosition = 0;
    this.LineNumber = 0;
    this.Message = "";
}
RefObject.Register(BError, RefObject);

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
BError.UnauthorizedAccess = 1;
BError.Argument = 2;
BError.InvalidOperation = 3;
BError.Exception = 4;