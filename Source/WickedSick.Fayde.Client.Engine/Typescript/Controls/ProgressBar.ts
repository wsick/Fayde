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
        IsIndeterminate: bool;

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

            if (!this._Track)
                return;
            if (!this._Indicator)
                return;

            var parent = VisualTreeHelper.GetParent(this);
            if (!parent)
                return;

            var margin = this._Indicator.Margin.Left + this._Indicator.Margin.Right;
            var padding: Thickness = null;
            if (parent instanceof Border)
                padding = (<Border>parent).Padding;
            else if (parent instanceof Control)
                padding = (<Control>parent).Padding;

            if (padding) {
                margin += padding.Left;
                margin += padding.Right;
            }

            var progress = this.IsIndeterminate || (max === min ? 1.0 : (val - min) / (max - min));
            var fullWidth = Math.max(0, (<FrameworkElement>parent).ActualWidth - margin);
            this._Indicator.Width = fullWidth * progress;
        }

        GetVisualStateNamesToActivate(): string[] {
            return this.IsIndeterminate ? ["Indeterminate"] : ["Determinate"];
        }
    }
    Nullstone.RegisterType(ProgressBar, "ProgressBar");
}