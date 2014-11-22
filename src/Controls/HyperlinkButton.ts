/// <reference path="Primitives/ButtonBase.ts" />

module Fayde.Controls {
    export class HyperlinkButton extends Primitives.ButtonBase {
        static NavigateUriProperty: DependencyProperty = DependencyProperty.Register("NavigateUri", () => Uri, HyperlinkButton);
        static TargetNameProperty: DependencyProperty = DependencyProperty.Register("TargetName", () => String, HyperlinkButton);
        NavigateUri: Uri;
        TargetName: string;

        constructor() {
            super();
            this.DefaultStyleKey = HyperlinkButton;
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
            var targetUie;
            if (!targetName) {
                targetUie = VisualTreeHelper.GetParentOfType(this, Fayde.Controls.Frame);
            } else {
                targetUie = this.FindName(targetName, true);
            }

            if (!targetUie) {
                window.location.href = this.NavigateUri.toString();
            } else if (targetUie instanceof Frame) {
                window.location.hash = this.NavigateUri.toString();
            } else {
                window.open(this.NavigateUri.toString(), targetName);
            }
        }
    }
    Fayde.CoreLibrary.add(HyperlinkButton);
    TemplateVisualStates(HyperlinkButton, 
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Pressed" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "FocusStates", Name: "Unfocused" },
        { GroupName: "FocusStates", Name: "Focused" });
}