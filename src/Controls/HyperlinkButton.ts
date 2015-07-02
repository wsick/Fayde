/// <reference path="Primitives/ButtonBase.ts" />

module Fayde.Controls {
    export class HyperlinkButton extends Primitives.ButtonBase {
        static NavigateUriProperty: DependencyProperty = DependencyProperty.Register("NavigateUri", () => Uri, HyperlinkButton);
        static TargetNameProperty: DependencyProperty = DependencyProperty.Register("TargetName", () => String, HyperlinkButton);
        NavigateUri: Uri;
        TargetName: string;

        constructor () {
            super();
            this.DefaultStyleKey = HyperlinkButton;
        }

        OnApplyTemplate () {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        OnClick () {
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

        private _Navigate () {
            var targetName = this.TargetName;
            switch ((targetName || "").toLowerCase()) {
                case "_blank":
                case "_media":
                case "_search":
                    launchDummyLink(targetName.toLowerCase(), this.NavigateUri);
                    return;
                case "_parent":
                case "_self":
                case "_top":
                default:
                    break;
            }

            var targetUie = this._FindTargetElement();
            if (targetUie instanceof Frame)
                window.location.hash = this.NavigateUri.toString();
            else
                window.location.href = this.NavigateUri.toString();
        }

        private _FindTargetElement () {
            var targetName = this.TargetName;
            if (!targetName)
                return VisualTreeHelper.GetParentOfType(this, Fayde.Controls.Frame);
            return this.FindName(targetName, true);
        }
    }
    Fayde.CoreLibrary.add(HyperlinkButton);
    TemplateVisualStates(HyperlinkButton,
        {GroupName: "CommonStates", Name: "Normal"},
        {GroupName: "CommonStates", Name: "MouseOver"},
        {GroupName: "CommonStates", Name: "Pressed"},
        {GroupName: "CommonStates", Name: "Disabled"},
        {GroupName: "FocusStates", Name: "Unfocused"},
        {GroupName: "FocusStates", Name: "Focused"});

    var dummyLink: HTMLAnchorElement;
    function launchDummyLink (target: string, navigateUri: Uri) {
        dummyLink = dummyLink || document.createElement('a');
        dummyLink.href = navigateUri.toString();
        dummyLink.target = target;
        dummyLink.click();
    }
}