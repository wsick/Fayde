/// <reference path="Primitives/ButtonBase.ts" />

module Fayde.Controls {
    type Target = string|Frame;

    export class HyperlinkButton extends Primitives.ButtonBase {
        static NavigateUriProperty = DependencyProperty.Register("NavigateUri", () => Uri, HyperlinkButton);
        static TargetNameProperty = DependencyProperty.Register("TargetName", () => String, HyperlinkButton);
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
            var navUri = this._GetNavigateLink();
            if (!navUri)
                return;

            var targetUie = this._FindTarget();
            if (targetUie instanceof Frame)
                window.location.hash = navUri;
            else if (!targetUie)
                window.location.href = navUri;
            else
                launchDummyLink(this.TargetName, navUri);
        }

        private _GetNavigateLink (): string {
            var uri = this.NavigateUri;
            if (!uri)
                return "";
            return uri.toString() || "";
        }

        private _FindTarget (): Target {
            var targetName = this.TargetName;
            var lower = (targetName || "").toLowerCase();
            switch (lower) {
                case "_blank":
                case "_media":
                case "_search":
                    return lower;
                case "_parent":
                case "_self":
                case "_top":
                case "":
                    return VisualTreeHelper.GetParentOfType(this, Frame);
                default:
                    return this.FindName(targetName, true);
            }
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
    function launchDummyLink (target: string, navigateUri: string) {
        dummyLink = dummyLink || document.createElement('a');
        dummyLink.href = navigateUri;
        dummyLink.target = target;
        dummyLink.click();
    }
}