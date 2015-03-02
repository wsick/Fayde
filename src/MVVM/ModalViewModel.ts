module Fayde.MVVM {
    export class ModalViewModel<TBuilder, TAccept> extends ViewModelBase {
        IsRequestingChange = false;
        RequestChangeCommand: RelayCommand<TBuilder>;
        ChangedCommand: RelayCommand<IModalCompleteParameters>;
        ModalDataContext: any = null;

        AcceptAction: (data: TAccept) => any;
        CompleteAction: (pars: IModalCompleteParameters) => any;
        ViewModelBuilder: (builder: TBuilder) => any;
        CanChange: (builder: TBuilder) => boolean;

        constructor () {
            super();
            this.RequestChangeCommand = new RelayCommand<TBuilder>(par => this.RequestChange_Execute(par), par => this.RequestChange_CanExecute(par));
            this.ChangedCommand = new RelayCommand<IModalCompleteParameters>(par => this.Changed_Execute(par));
        }

        private Changed_Execute (parameter: IModalCompleteParameters) {
            if (parameter.Result == true) {
                if (this.AcceptAction != null) {
                    this.AcceptAction(<TAccept>parameter.Data || undefined);
                }
            }
            if (this.CompleteAction != null)
                this.CompleteAction(parameter);
        }

        private RequestChange_Execute (parameter: TBuilder) {
            if (this.ViewModelBuilder != null) {
                var vm = this.ViewModelBuilder(parameter);
                if (vm == null)
                    return;
                this.ModalDataContext = vm;
            }
            this.IsRequestingChange = true;
        }

        private RequestChange_CanExecute (parameter: TBuilder): boolean {
            if (this.CanChange != null)
                return this.CanChange(parameter);
            return true;
        }
    }
    NotifyProperties(ModalViewModel, ["IsRequestingChange", "RequestChangeCommand", "ChangedCommand", "ModalDataContext"]);
}