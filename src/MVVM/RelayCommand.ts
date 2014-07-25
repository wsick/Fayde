/// <reference path="../Runtime/TypeManagement.ts" />
/// <reference path="../Input/ICommand.ts" />

module Fayde.MVVM {
    export class RelayCommand implements Input.ICommand {
        constructor(execute?: (parameter: any) => void , canExecute?: (parameter: any) => boolean) {
            if (execute)
                this.Execute = execute;
            if (canExecute)
                this.CanExecute = canExecute;
        }

        Execute(parameter: any) { }
        CanExecute(parameter: any): boolean { return true; }
        CanExecuteChanged = new MulticastEvent<EventArgs>();
        ForceCanExecuteChanged() {
            this.CanExecuteChanged.Raise(this, EventArgs.Empty);
        }
    }
    Fayde.RegisterType(RelayCommand, "Fayde.MVVM", Fayde.XMLNS);
    Fayde.RegisterTypeInterfaces(RelayCommand, Input.ICommand_);
}