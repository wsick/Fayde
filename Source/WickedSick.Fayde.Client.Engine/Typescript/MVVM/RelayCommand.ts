/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="../Input/ICommand.ts" />
/// CODE

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
        CanExecuteChanged: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
    }
    Nullstone.RegisterType(RelayCommand, "RelayCommand");
}