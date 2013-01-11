/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="../Core/Input/ICommand.js"/>

(function (namespace) {
    var RelayCommand = Nullstone.Create("RelayCommand", undefined, 2, [ICommand]);

    RelayCommand.Instance.Init = function (execute, canExecute) {
        this.CanExecuteChanged = new MulticastEvent();
        if (execute)
            this.Execute = execute;
        if (canExecute)
            this.CanExecute = canExecute;
    };
    RelayCommand.Instance.Execute = function (parameter) { };
    RelayCommand.Instance.CanExecute = function (parameter) { return true; };

    Nullstone.FinishCreate(RelayCommand);
    namespace.RelayCommand = RelayCommand;
})(Nullstone.Namespace("Fayde.MVVM"));