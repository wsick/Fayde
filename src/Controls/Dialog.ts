/// <reference path="Control" />

module Fayde.Controls {
    export class Dialog extends ContentControl {
        static DialogResultProperty = DependencyProperty.Register("DialogResult", () => Boolean, Dialog, undefined, (d: Dialog, args) => d.OnDialogResultChanged(args));
        DialogResult: boolean;

        private OnDialogResultChanged (args: IDependencyPropertyChangedEventArgs) {
            var launcher = Primitives.OverlayLauncher.FindLauncher(this);
            if (launcher)
                launcher.Close(args.NewValue);
        }

        constructor () {
            super();
            this.DefaultStyleKey = Dialog;
        }
    }
    Fayde.CoreLibrary.add(Dialog);
}