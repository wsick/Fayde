/// <reference path="../../Runtime/Nullstone.js"/>

(function (namespace) {
    var ICommand = Nullstone.Create("ICommand");

    ICommand.Instance.Init = function () {
        this.CanExecuteChanged = new MulticastEvent();
    };

    ICommand.Instance.Execute = function (parameter) { };
    ICommand.Instance.CanExecute = function (parameter) { return true; };

    namespace.ICommand = Nullstone.FinishCreate(ICommand);
})(window);