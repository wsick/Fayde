/// <reference path="../../Core/FrameworkElement" />

module Fayde.Controls.Primitives {
    export class OverlayLauncher extends FrameworkElement {
        static ViewUriProperty = DependencyProperty.Register("ViewUri", () => Uri, OverlayLauncher, undefined, (d: OverlayLauncher, args) => d._TryShowOverlay());
        static ViewModelProperty = DependencyProperty.Register("ViewModel", () => Object, OverlayLauncher, undefined, (d: OverlayLauncher, args) => d._TryShowOverlay());
        static IsOverlayOpenProperty = DependencyProperty.Register("IsOverlayOpen", () => Boolean, OverlayLauncher, undefined, (d: OverlayLauncher, args) => d._TryShowOverlay());
        static ClosedCommandProperty = DependencyProperty.Register("ClosedCommand", () => Input.ICommand_, OverlayLauncher);
        ViewUri: Uri;
        ViewModel: any;
        IsOverlayOpen: boolean;
        ClosedCommand: Input.ICommand;

        Closed = new nullstone.Event<OverlayClosedEventArgs>();

        private _Overlay: Primitives.Overlay = null;

        constructor () {
            super();
            this.InitBindings();
        }

        InitBindings () {
            this.SetBinding(OverlayLauncher.ViewModelProperty, new Data.Binding("OverlayDataContext"));
            var binding = new Data.Binding("IsOpen");
            binding.Mode = Data.BindingMode.TwoWay;
            this.SetBinding(OverlayLauncher.IsOverlayOpenProperty, binding);
            this.SetBinding(OverlayLauncher.ClosedCommandProperty, new Data.Binding("ClosedCommand"));
        }

        private _TryShowOverlay () {
            if (!this.IsOverlayOpen)
                return;
            if (!this.ViewUri)
                return;
            if (this.ViewModel == null)
                return;
            this._ShowOverlay();
        }

        private _ShowOverlay () {
            var overlay = this._Overlay;
            if (!overlay) {
                overlay = this._Overlay = new Primitives.Overlay();
                var cc = new ContentControl();
                cc.ContentUri = this.ViewUri;
                cc.DataContext = this.ViewModel;
                cc.SetValue(LauncherOwnerProperty, this);
                overlay.Visual = cc;
                overlay.XamlNode.RegisterInitiator(this);
            }
            overlay.Closed.on(this._OnOverlayClosed, this);
            overlay.IsOpen = true;
        }

        private _OnOverlayClosed (sender, e) {
            this.Close(this._GetDialogResult());
        }

        private _GetDialogResult (): boolean {
            var overlay = this._Overlay;
            var cc = overlay ? overlay.Visual : null;
            var dialog = VisualTreeHelper.GetChildrenCount(cc) > 0 ? VisualTreeHelper.GetChild(cc, 0) : null;
            return (dialog instanceof Dialog) ? (<Dialog>dialog).DialogResult : undefined;
        }

        Close (result?: boolean) {
            if (this.IsOverlayOpen !== true)
                return;
            var overlay = this._Overlay;
            overlay.Closed.off(this._OnOverlayClosed, this);
            this.SetCurrentValue(OverlayLauncher.IsOverlayOpenProperty, false);
            var parameter: MVVM.IOverlayCompleteParameters = {
                Result: result,
                Data: overlay.Visual.DataContext
            };
            var cmd = this.ClosedCommand;
            if (!cmd.CanExecute || cmd.CanExecute(parameter))
                cmd.Execute(parameter);
            this.Closed.raise(this, new OverlayClosedEventArgs(parameter.Result, parameter.Data));
        }

        static FindLauncher (visual: UIElement): OverlayLauncher {
            for (var en = VisualTreeEnum.GetAncestors(visual).getEnumerator(); en.moveNext();) {
                var owner = en.current.GetValue(LauncherOwnerProperty);
                if (owner instanceof OverlayLauncher)
                    return owner;
            }
            return undefined;
        }
    }
    Fayde.CoreLibrary.add(OverlayLauncher);

    var LauncherOwnerProperty = DependencyProperty.RegisterAttached("LauncherOwner", () => OverlayLauncher, OverlayLauncher);
}