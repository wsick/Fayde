/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />

module Fayde.Input {
    export interface ICommand {
        Execute(parameter: any);
        CanExecute(parameter: any): boolean;
        CanExecuteChanged: MulticastEvent<EventArgs>;
    }
    export var ICommand_ = Fayde.RegisterInterface("ICommand");
}