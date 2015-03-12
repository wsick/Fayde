/// <reference path="../Core/FrameworkElement" />

module Fayde.Controls {
    export class DialogLauncher extends FrameworkElement {
        static ViewUriProperty = DependencyProperty.Register("ViewUri", () => Uri, ModalLauncher, undefined, (d: DialogLauncher, args) => d._TryShowDialog());
        static ViewModelProperty = DependencyProperty.Register("ViewModel", () => Object, ModalLauncher, undefined, (d: DialogLauncher, args) => d._TryShowDialog());
        static IsDialogOpenProperty = DependencyProperty.Register("IsDialogOpen", () => Boolean, ModalLauncher, undefined, (d: DialogLauncher, args) => d._TryShowDialog());
        static ClosedCommandProperty = DependencyProperty.Register("ClosedCommand", () => Input.ICommand_, DialogLauncher);
        ViewUri: Uri;
        ViewModel: any;
        IsDialogOpen: boolean;
        ClosedCommand: Input.ICommand;

        private _Overlay: Primitives.Overlay = null;

        constructor () {
            super();
            this.SetBinding(DialogLauncher.ViewModelProperty, new Data.Binding("DialogDataContext"));
            var binding = new Data.Binding("IsOpen");
            binding.Mode = Data.BindingMode.TwoWay;
            this.SetBinding(DialogLauncher.IsDialogOpenProperty, binding);
            this.SetBinding(DialogLauncher.ClosedCommandProperty, new Data.Binding("ClosedCommand"));
        }

        private _TryShowDialog () {
            if (!this.IsDialogOpen)
                return;
            if (!this.ViewUri)
                return;
            if (this.ViewModel == null)
                return;
            this._ShowDialog();
        }

        private _ShowDialog () {
            var overlay = this._Overlay;
            if (!overlay) {
                overlay = this._Overlay = new Primitives.Overlay();
                var cc = new ContentControl();
                cc.ContentUri = this.ViewUri;
                cc.DataContext = this.ViewModel;
                cc.SetValue(DialogOwnerProperty, this);
                overlay.Visual = cc;
                overlay.XamlNode.RegisterInitiator(this);
            }
            overlay.Closed.on(this._OnOverlayClosed, this);
            overlay.IsOpen = true;
        }

        private _OnOverlayClosed (sender, e) {
            var overlay = this._Overlay;
            overlay.Closed.off(this._OnOverlayClosed, this);
            this.SetCurrentValue(DialogLauncher.IsDialogOpenProperty, false);
            var parameter: MVVM.IModalCompleteParameters = {
                Result: null, //TODO: DialogResult
                Data: overlay.Visual.DataContext
            };
            var cmd = this.ClosedCommand;
            if (!cmd.CanExecute || cmd.CanExecute(parameter))
                cmd.Execute(parameter);
        }
    }
    Fayde.CoreLibrary.add(ModalLauncher);

    var DialogOwnerProperty = DependencyProperty.RegisterAttached("DialogOwner", () => DialogLauncher, DialogLauncher);
}