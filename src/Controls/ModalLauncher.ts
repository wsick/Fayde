module Fayde.Controls {
    export class ModalLauncher extends DependencyObject {
        static ViewUriProperty = DependencyProperty.Register("ViewUri", () => Uri, ModalLauncher, undefined, (d: ModalLauncher, args) => d._TryShowModal());
        static ViewModelProperty = DependencyProperty.Register("ViewModel", () => Object, ModalLauncher, undefined, (d: ModalLauncher, args) => d._TryShowModal());
        static IsModalVisibleProperty = DependencyProperty.Register("IsModalVisible", () => Boolean, ModalLauncher, undefined, (d: ModalLauncher, args) => d._TryShowModal());
        static ModalCompleteCommandProperty = DependencyProperty.Register("ModalCompleteCommand", () => Input.ICommand_, ModalLauncher);
        ViewUri: Uri;
        ViewModel: any;
        IsModalVisible: boolean;
        ModalCompleteCommand: Input.ICommand;
        //StartupLocation

        constructor () {
            super();
            this.SetBinding(ModalLauncher.ViewModelProperty, new Data.Binding("ModalDataContext"));
            var binding = new Data.Binding("IsRequestingChange");
            binding.Mode = Data.BindingMode.TwoWay;
            this.SetBinding(ModalLauncher.IsModalVisibleProperty, binding);
            this.SetBinding(ModalLauncher.ModalCompleteCommandProperty, new Data.Binding("ChangedCommand"));
        }

        private _TryShowModal () {
            if (!this.IsModalVisible)
                return;
            if (!this.ViewUri)
                return;
            if (this.ViewModel == null)
                return;

            this._ShowModalAsync(this.ViewUri, this.ViewModel)
                .then((result) => this._FinishModal(result))
        }

        private _ShowModalAsync () {

        }

        private _FinishModal (result: boolean) {

        }
    }
    Fayde.CoreLibrary.add(ModalLauncher);
}