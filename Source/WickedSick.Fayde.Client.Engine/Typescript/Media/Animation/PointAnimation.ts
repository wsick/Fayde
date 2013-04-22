/// <reference path="AnimationBase.ts" />
/// <reference path="EasingFunctionBase.ts" />
/// CODE
/// <reference path="../../Primitives/Point.ts" />

module Fayde.Media.Animation {
    export class PointAnimation extends AnimationBase {
        static ByProperty: DependencyProperty = DependencyProperty.Register("By", () => Point, PointAnimation, undefined, (d, args) => (<PointAnimation>d)._InvalidateCache());
        static EasingFunctionProperty: DependencyProperty = DependencyProperty.Register("EasingFunction", () => EasingFunctionBase, PointAnimation, undefined, (d, args) => (<PointAnimation>d)._InvalidateCache());
        static FromProperty: DependencyProperty = DependencyProperty.Register("From", () => Point, PointAnimation, undefined, (d, args) => (<PointAnimation>d)._InvalidateCache());
        static ToProperty: DependencyProperty = DependencyProperty.Register("To", () => Point, PointAnimation, undefined, (d, args) => (<PointAnimation>d)._InvalidateCache());
        By: Point;
        EasingFunction: IEasingFunction;
        From: Point;
        To: Point;

        private _HasCached: bool = false;
        private _FromCached: Point = null;
        private _ToCached: Point = null;
        private _ByCached: Point = null;

        GetTargetValue(defaultOriginalValue: any): Point {
            this._EnsureCache();

            var start = new Point();
            if (this._FromCached != null)
                start = this._FromCached;
            else if (defaultOriginalValue != null && defaultOriginalValue instanceof Point)
                start = defaultOriginalValue;

            if (this._ToCached != null)
                return this._ToCached;
            else if (this._ByCached != null)
                return new Point(start.X + this._ByCached.X, start.Y + this._ByCached.Y);
            return start;
        }
        GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): Point {
            this._EnsureCache();

            var start = new Point();
            if (this._FromCached != null)
                start = this._FromCached;
            else if (defaultOriginalValue != null && defaultOriginalValue instanceof Point)
                start = defaultOriginalValue;

            var end = start;
            if (this._ToCached != null)
                end = this._ToCached;
            else if (this._ByCached != null)
                end = new Point(start.X + this._ByCached.X, start.Y + this._ByCached.Y);
            else if (defaultDestinationValue != null && defaultDestinationValue instanceof Point)
                end = defaultDestinationValue;

            var easingFunc = this.EasingFunction;
            if (easingFunc != null)
                clockData.Progress = easingFunc.Ease(clockData.Progress);

            return Point.LERP(start, end, clockData.Progress);
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
    Nullstone.RegisterType(PointAnimation, "PointAnimation");
}