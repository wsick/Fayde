/// <reference path="AnimationBase.ts" />
/// <reference path="EasingFunctionBase.ts" />
/// CODE
/// <reference path="../../Primitives/Color.ts" />

module Fayde.Media.Animation {
    export class ColorAnimation extends AnimationBase {
        static ByProperty: DependencyProperty = DependencyProperty.Register("By", () => Color, ColorAnimation, undefined, (d, args) => (<ColorAnimation>d)._InvalidateCache());
        static EasingFunctionProperty: DependencyProperty = DependencyProperty.Register("EasingFunction", () => EasingFunctionBase, ColorAnimation, undefined, (d, args) => (<ColorAnimation>d)._InvalidateCache());
        static FromProperty: DependencyProperty = DependencyProperty.Register("From", () => Color, ColorAnimation, undefined, (d, args) => (<ColorAnimation>d)._InvalidateCache());
        static ToProperty: DependencyProperty = DependencyProperty.Register("To", () => Color, ColorAnimation, undefined, (d, args) => (<ColorAnimation>d)._InvalidateCache());
        By: Color;
        EasingFunction: IEasingFunction;
        From: Color;
        To: Color;

        private _HasCached: bool = false;
        private _FromCached: Color = null;
        private _ToCached: Color = null;
        private _ByCached: Color = null;

        GetTargetValue(defaultOriginalValue: any): Color {
            this._EnsureCache();

            var start = new Color();
            if (this._FromCached != null)
                start = this._FromCached;
            else if (defaultOriginalValue != null && defaultOriginalValue instanceof Color)
                start = defaultOriginalValue;

            if (this._ToCached != null)
                return this._ToCached;
            else if (this._ByCached != null)
                return start.Add(this._ByCached);
            return start;
        }
        GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): Color {
            this._EnsureCache();

            var start = new Color();
            if (this._FromCached != null)
                start = this._FromCached;
            else if (defaultOriginalValue != null && defaultOriginalValue instanceof Color)
                start = defaultOriginalValue;

            var end = start;
            if (this._ToCached != null)
                end = this._ToCached;
            else if (this._ByCached != null)
                end = start.Add(this._ByCached);
            else if (defaultDestinationValue != null && defaultDestinationValue instanceof Color)
                end = defaultDestinationValue;

            var easingFunc = this.EasingFunction;
            if (easingFunc != null)
                clockData.Progress = easingFunc.Ease(clockData.Progress);

            return Color.LERP(start, end, clockData.Progress);
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
            this._FromCached = null;
            this._ToCached = null;
            this._ByCached = null;
            this._HasCached = false;
        }
    }
    Nullstone.RegisterType(ColorAnimation, "ColorAnimation");
}