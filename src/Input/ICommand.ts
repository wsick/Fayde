module Fayde.Input {
    export interface ICommand {
        Execute(parameter: any);
        CanExecute(parameter: any): boolean;
        CanExecuteChanged: MulticastEvent<EventArgs>;
    }
    export var ICommand_ = new nullstone.Interface<ICommand>("ICommand");
}