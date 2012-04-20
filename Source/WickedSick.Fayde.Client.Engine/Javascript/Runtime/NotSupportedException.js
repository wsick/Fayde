/// <reference path="Exception.js"/>
/// CODE

//#region NotSupportedException
var NotSupportedException = Nullstone.Create("NotSupportedException", Exception, 1);

NotSupportedException.Instance.Init = function (message) {
    this.Message = message;
};

Nullstone.FinishCreate(NotSupportedException);
//#endregion