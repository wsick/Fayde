/// <reference path="Nullstone.js"/>
/// CODE

//#region Exception
var Exception = Nullstone.Create("Exception", undefined, 3);

Exception.Instance.Init = function (message, charPosition, lineNumber) {
    this.Message = message;
    this.CharPosition = charPosition;
    this.LineNumber = lineNumber;
};

Exception.Instance.toString = function () {
    return this.Message;
};

Nullstone.FinishCreate(Exception);
//#endregion