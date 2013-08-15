/// <reference path="Primitives/RangeBase.ts" />
/// CODE
/// <reference path="Control.ts" />
/// <reference path="Border.ts" />
/// <reference path="../Core/VisualTreeHelper.ts" />

module Fayde.Controls {
    export class ProgressBar extends Primitives.RangeBase {
        private _Track: FrameworkElement;
        private _Indicator: FrameworkElement;

        static IsIndeterminateProperty: DependencyProperty = DependencyProperty.Register("IsIndeterminate", () => Boolean, ProgressBar, false, (d, args) => (<ProgressBar>d)._IsIndeterminateChanged(args));
        IsIndeterminate: boolean;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();

            var track = this._Track;
            if (track)
                track.SizeChanged.Unsubscribe(this._OnTrackSizeChanged, this);

            track = this._Track = <FrameworkElement>this.GetTemplateChild("ProgressBarTrack");
            this._Indicator = <FrameworkElement>this.GetTemplateChild("ProgressBarIndicator");

            if (track)
                track.SizeChanged.Subscribe(this._OnTrackSizeChanged, this);

            this.UpdateVisualState(false);
        }

        OnValueChanged(oldValue: number, newValue: number) {
            super.OnValueChanged(oldValue, newValue);
            this._UpdateIndicator();
        }

        private _OnTrackSizeChanged(sender, e) {
            this._UpdateIndicator();
        }
        private _IsIndeterminateChanged(args: IDependencyPropertyChangedEventArgs) {
            this.UpdateVisualState();
            this._UpdateIndicator();
        }
        private _UpdateIndicator() {
            var min = this.Minimum;
            var max = this.Maximum;
            var val = this.Value;

            var indicator = this._Indicator;
            if (!indicator)
                return;

            var parent = VisualTreeHelper.GetParent(this);
            if (!parent)
                return;

            var margin = indicator.Margin;
            var outerWidth = (margin) ? margin.Left + margin.Right : 0.0;
            var padding: Thickness = null;
            if (parent instanceof Border)
                padding = (<Border>parent).Padding;
            else if (parent instanceof Control)
                padding = (<Control>parent).Padding;

            if (padding) {
                outerWidth += padding.Left;
                outerWidth += padding.Right;
            }
            
            var progress = 1.0;
            if (!this.IsIndeterminate && max !== min)
                progress = (val - min) / (max - min);
            var fullWidth = Math.max(0, (<FrameworkElement>parent).ActualWidth - outerWidth);
            indicator.Width = fullWidth * progress;
        }

        GetVisualStateNamesToActivate(): string[] {
            return this.IsIndeterminate ? ["Indeterminate"] : ["Determinate"];
        }
    }
    Nullstone.RegisterType(ProgressBar, "ProgressBar");
}