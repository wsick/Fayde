/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />

module Fayde.Input {
    export interface ICommand {
        Execute(parameter: any);
        CanExecute(parameter: any): bool;
        CanExecuteChanged: MulticastEvent;
    }
    export var ICommand_ = Nullstone.RegisterInterface("ICommand");
}