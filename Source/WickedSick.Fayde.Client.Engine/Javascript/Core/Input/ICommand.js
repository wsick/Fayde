/// <reference path="../../Runtime/Nullstone.js"/>

//#region ICommand
var ICommand = Nullstone.Create("ICommand");

ICommand.Instance.Init = function () {
    this.CanExecuteChanged = new MulticastEvent();
};

ICommand.Instance.Execute = function (parameter) { };
ICommand.Instance.CanExecute = function (parameter) { return true; };

Nullstone.FinishCreate(ICommand);
//#endregion