var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/RangeBase.ts" />
    /// CODE
    /// <reference path="Control.ts" />
    /// <reference path="Border.ts" />
    /// <reference path="../Core/VisualTreeHelper.ts" />
    (function (Controls) {
        var ProgressBar = (function (_super) {
            __extends(ProgressBar, _super);
            function ProgressBar() {
                        _super.call(this);
                this.DefaultStyleKey = (this).constructor;
            }
            ProgressBar.IsIndeterminateProperty = DependencyProperty.Register("IsIndeterminate", function () {
                return Boolean;
            }, ProgressBar, false, function (d, args) {
                return (d)._IsIndeterminateChanged(args);
            });
            ProgressBar.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                var track = this._Track;
                if(track) {
                    track.SizeChanged.Unsubscribe(this._OnTrackSizeChanged, this);
                }
                track = this._Track = this.GetTemplateChild("ProgressBarTrack");
                this._Indicator = this.GetTemplateChild("ProgressBarIndicator");
                if(track) {
                    track.SizeChanged.Subscribe(this._OnTrackSizeChanged, this);
                }
                this.UpdateVisualState(false);
            };
            ProgressBar.prototype.OnValueChanged = function (oldValue, newValue) {
                _super.prototype.OnValueChanged.call(this, oldValue, newValue);
                this._UpdateIndicator();
            };
            ProgressBar.prototype._OnTrackSizeChanged = function (sender, e) {
                this._UpdateIndicator();
            };
            ProgressBar.prototype._IsIndeterminateChanged = function (args) {
                this.UpdateVisualState();
                this._UpdateIndicator();
            };
            ProgressBar.prototype._UpdateIndicator = function () {
                var min = this.Minimum;
                var max = this.Maximum;
                var val = this.Value;
                if(!this._Track) {
                    return;
                }
                if(this._Indicator) {
                    return;
                }
                var parent = Fayde.VisualTreeHelper.GetParent(this);
                if(!parent) {
                    return;
                }
                var margin = this._Indicator.Margin.Left + this._Indicator.Margin.Right;
                var padding = null;
                if(parent instanceof Controls.Border) {
                    padding = (parent).Padding;
                } else if(parent instanceof Controls.Control) {
                    padding = (parent).Padding;
                }
                if(padding) {
                    margin += padding.Left;
                    margin += padding.Right;
                }
                var progress = this.IsIndeterminate || (max === min ? 1.0 : (val - min) / (max - min));
                var fullWidth = Math.max(0, (parent).ActualWidth - margin);
                this._Indicator.Width = fullWidth * progress;
            };
            ProgressBar.prototype.GetVisualStateNamesToActivate = function () {
                return this.IsIndeterminate ? [
                    "Indeterminate"
                ] : [
                    "Determinate"
                ];
            };
            return ProgressBar;
        })(Controls.Primitives.RangeBase);
        Controls.ProgressBar = ProgressBar;        
        Nullstone.RegisterType(ProgressBar, "ProgressBar");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ProgressBar.js.map
