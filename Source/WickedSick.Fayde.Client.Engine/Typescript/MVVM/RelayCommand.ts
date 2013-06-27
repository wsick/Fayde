/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="../Input/ICommand.ts" />
/// CODE

module Fayde.MVVM {
    export class RelayCommand implements Input.ICommand {
        constructor(execute?: (parameter: any) => void , canExecute?: (parameter: any) => bool) {
            this.Execute = execute;
            this.CanExecute = canExecute;
        }

        Execute(parameter: any) { }
        CanExecute(parameter: any): bool { return true; }
        CanExecuteChanged: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
    }
    Nullstone.RegisterType(RelayCommand, "RelayCommand");
}