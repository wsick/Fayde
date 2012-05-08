/// <reference path="Exception.js"/>
/// CODE

//#region InvalidOperationException
var InvalidOperationException = Nullstone.Create("InvalidOperationException", Exception);

InvalidOperationException.Instance.toString = function () {
    return "InvalidOperationException: " + this.toString();
};

Nullstone.FinishCreate(InvalidOperationException);
//#endregion