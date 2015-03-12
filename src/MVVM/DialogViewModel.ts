/// <reference path="ViewModelBase" />

module Fayde.MVVM {
    export class DialogViewModel<TBuilder, TAccept> extends ViewModelBase {
        IsOpen = false;
        DialogDataContext: any = null;
        RequestOpenCommand: RelayCommand;
        ClosedCommand: RelayCommand;

        AcceptAction: (data: TAccept) => any;
        CompleteAction: (pars: IModalCompleteParameters) => any;
        ViewModelBuilder: (builder: TBuilder) => any;
        CanOpen: (builder: TBuilder) => boolean;

        constructor () {
            super();
            this.RequestOpenCommand = new RelayCommand(par => this.RequestOpen_Execute(par), par => this.RequestOpen_CanExecute(par));
            this.ClosedCommand = new RelayCommand(par => this.Closed_Execute(par));
        }

        private Closed_Execute (parameter: IModalCompleteParameters) {
            if (parameter.Result === true) {
                this.AcceptAction && this.AcceptAction(<TAccept>parameter.Data || undefined);
            }
            this.CompleteAction && this.CompleteAction(parameter);
        }

        private RequestOpen_Execute (parameter: TBuilder) {
            if (this.ViewModelBuilder != null) {
                var vm = this.ViewModelBuilder(parameter);
                if (vm == null)
                    return;
                this.DialogDataContext = vm;
            }
            this.IsOpen = true;
        }

        private RequestOpen_CanExecute (parameter: TBuilder): boolean {
            return !this.CanOpen || this.CanOpen(parameter);
        }
    }
    NotifyProperties(ModalViewModel, ["IsOpen", "DialogDataContext", "RequestOpenCommand", "ClosedCommand"]);
}