var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/ButtonBase.ts" />
    /// CODE
    /// <reference path="Frame.ts" />
    /// <reference path="../Primitives/Uri.ts" />
    (function (Controls) {
        var HyperlinkButton = (function (_super) {
            __extends(HyperlinkButton, _super);
            function HyperlinkButton() {
                        _super.call(this);
                this.DefaultStyleKey = (this).constructor;
            }
            HyperlinkButton.NavigateUriProperty = DependencyProperty.Register("NavigateUri", function () {
                return Uri;
            }, HyperlinkButton);
            HyperlinkButton.TargetNameProperty = DependencyProperty.Register("TargetName", function () {
                return String;
            }, HyperlinkButton);
            HyperlinkButton.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this.UpdateVisualState(false);
            };
            HyperlinkButton.prototype.OnClick = function () {
                _super.prototype.OnClick.call(this);
                if(this.NavigateUri != null) {
                    this._Navigate();
                }
            };
            HyperlinkButton.prototype._Navigate = /*
            private _GetAbsoluteUri(): Uri {
            var destination = this.NavigateUri;
            if (!destination.IsAbsoluteUri) {
            var original = destination.OriginalString;
            if (original && original.charAt(0) !== '/')
            throw new NotSupportedException();
            destination = new Uri(App.Instance.GetHost().GetSource(), destination);
            }
            return destination;
            }
            */
            function () {
                var targetName = this.TargetName;
                if(!targetName) {
                    window.location.href = this.NavigateUri.toString();
                    return;
                }
                var targetUie = this.FindName(targetName);
                if(targetUie instanceof Controls.Frame) {
                    window.location.href = this.NavigateUri.toString();
                } else {
                    window.open(this.NavigateUri.toString(), targetName);
                }
            };
            return HyperlinkButton;
        })(Controls.Primitives.ButtonBase);
        Controls.HyperlinkButton = HyperlinkButton;        
        Nullstone.RegisterType(HyperlinkButton, "HyperlinkButton");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=HyperlinkButton.js.map
