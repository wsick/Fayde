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
        CanExecuteChanged: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
    }
    Fayde.RegisterType(RelayCommand, {
        Name: "RelayCommand",
        Namespace: "Fayde.MVVM",
        XmlNamespace: Fayde.XMLNS,
        Interfaces: [Input.ICommand_]
    });
}