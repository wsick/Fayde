/// <reference path="Exception.js"/>
/// CODE

//#region InvalidOperationException
var InvalidOperationException = Nullstone.Create("InvalidOperationException", Exception, 1);

InvalidOperationException.Instance.Init = function (message) {
    this.Message = message;
};

Nullstone.FinishCreate(InvalidOperationException);
//#endregion