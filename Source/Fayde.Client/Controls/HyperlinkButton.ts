/// <reference path="Primitives/ButtonBase.ts" />

module Fayde.Controls {
    export class HyperlinkButton extends Primitives.ButtonBase {
        static NavigateUriProperty: DependencyProperty = DependencyProperty.Register("NavigateUri", () => Uri, HyperlinkButton);
        static TargetNameProperty: DependencyProperty = DependencyProperty.Register("TargetName", () => String, HyperlinkButton);
        NavigateUri: Uri;
        TargetName: string;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        OnClick() {
            super.OnClick();
            if (this.NavigateUri != null)
                this._Navigate();
        }

        /*
        private _GetAbsoluteUri(): Uri {
            var destination = this.NavigateUri;
            if (!destination.IsAbsoluteUri) {
                var original = destination.OriginalString;
                if (original && original.charAt(0) !== '/')
                    throw new NotSupportedException();
                destination = new Uri(App.Current.GetHost().GetSource(), destination);
            }
            return destination;
        }
        */
        private _Navigate() {
            var targetName = this.TargetName;
            if (!targetName) {
                window.location.href = this.NavigateUri.toString();
                return;
            }
            var targetUie: XamlObject = this.FindName(targetName);
            if (targetUie instanceof Frame) {
                window.location.hash = this.NavigateUri.toString();
            } else {
                window.open(this.NavigateUri.toString(), targetName);
            }
        }
    }
    Fayde.RegisterType(HyperlinkButton, "Fayde.Controls", Fayde.XMLNS);
}