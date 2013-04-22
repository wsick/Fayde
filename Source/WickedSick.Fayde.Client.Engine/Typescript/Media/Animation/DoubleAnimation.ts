/// <reference path="AnimationBase.ts" />
/// <reference path="EasingFunctionBase.ts" />
/// CODE

module Fayde.Media.Animation {
    export class DoubleAnimation extends AnimationBase {
        static ByProperty: DependencyProperty = DependencyProperty.Register("By", () => Number, DoubleAnimation, undefined, (d, args) => (<DoubleAnimation>d)._InvalidateCache());
        static EasingFunctionProperty: DependencyProperty = DependencyProperty.Register("EasingFunction", () => EasingFunctionBase, DoubleAnimation, undefined, (d, args) => (<DoubleAnimation>d)._InvalidateCache());
        static FromProperty: DependencyProperty = DependencyProperty.Register("From", () => Number, DoubleAnimation, undefined, (d, args) => (<DoubleAnimation>d)._InvalidateCache());
        static ToProperty: DependencyProperty = DependencyProperty.Register("To", () => Number, DoubleAnimation, undefined, (d, args) => (<DoubleAnimation>d)._InvalidateCache());
        By: number;
        EasingFunction: IEasingFunction;
        From: number;
        To: number;

        private _HasCached: bool = false;
        private _FromCached: number = 0.0;
        private _ToCached: number = 0.0;
        private _ByCached: number = 0.0;

        GetTargetValue(defaultOriginalValue: any): number {
            this._EnsureCache();

            var start = 0.0;
            if (this._FromCached != null)
                start = this._FromCached;
            else if (defaultOriginalValue != null && typeof defaultOriginalValue === "number")
                start = defaultOriginalValue;

            if (this._ToCached != null)
                return this._ToCached;
            else if (this._ByCached != null)
                return start + this._ByCached;
            return start;
        }
        GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): number {
            this._EnsureCache();

            var start = 0.0;
            if (this._FromCached != null)
                start = this._FromCached;
            else if (defaultOriginalValue != null && typeof defaultOriginalValue === "number")
                start = defaultOriginalValue;

            var end = start;
            if (this._ToCached != null)
                end = this._ToCached;
            else if (this._ByCached != null)
                end = start + this._ByCached;
            else if (defaultDestinationValue != null && typeof defaultDestinationValue === "number")
                end = defaultDestinationValue;

            var easingFunc = this.EasingFunction;
            if (easingFunc != null)
                clockData.Progress = easingFunc.Ease(clockData.Progress);

            return start + ((end - start) * clockData.Progress);
        }

        private _EnsureCache() {
            if (this._HasCached)
                return;
            this._FromCached = this.From;
            this._ToCached = this.To;
            this._ByCached = this.By;
            this._HasCached = true;
        }
        private _InvalidateCache() {
            this._FromCached = 0.0;
            this._ToCached = 0.0;
            this._ByCached = 0.0;
            this._HasCached = false;
        }
    }
    Nullstone.RegisterType(DoubleAnimation, "DoubleAnimation");
}