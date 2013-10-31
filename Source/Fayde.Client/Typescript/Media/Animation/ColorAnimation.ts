/// <reference path="AnimationBase.ts" />

module Fayde.Media.Animation {
    export class ColorAnimation extends AnimationBase {
        static ByProperty: DependencyProperty = DependencyProperty.Register("By", () => Color, ColorAnimation, null, (d, args) => (<ColorAnimation>d)._ByChanged(args));
        static EasingFunctionProperty: DependencyProperty = DependencyProperty.Register("EasingFunction", () => EasingFunctionBase, ColorAnimation, undefined, (d, args) => (<ColorAnimation>d)._EasingChanged(args));
        static FromProperty: DependencyProperty = DependencyProperty.Register("From", () => Color, ColorAnimation, null, (d, args) => (<ColorAnimation>d)._FromChanged(args));
        static ToProperty: DependencyProperty = DependencyProperty.Register("To", () => Color, ColorAnimation, null, (d, args) => (<ColorAnimation>d)._ToChanged(args));
        By: Color;
        EasingFunction: IEasingFunction;
        From: Color;
        To: Color;

        private _FromCached: Color = null;
        private _ToCached: Color = null;
        private _ByCached: Color = null;
        private _EasingCached: EasingFunctionBase = undefined;

        constructor(){
            super();
        }

        GetCurrentValue(defaultOriginalValue: any, defaultDestinationValue: any, clockData: IClockData): Color {
            var start = new Color();
            if (this._FromCached)
                start = this._FromCached;
            else if (defaultOriginalValue instanceof Color)
                start = defaultOriginalValue;

            var end = start;
            if (this._ToCached)
                end = this._ToCached;
            else if (this._ByCached)
                end = start.Add(this._ByCached);
            else if (defaultDestinationValue instanceof Color)
                end = defaultDestinationValue;

            var easingFunc = this._EasingCached;
            if (easingFunc)
                clockData.Progress = easingFunc.Ease(clockData.Progress);

            return Color.LERP(start, end, clockData.Progress);
        }

        private _FromChanged(args: IDependencyPropertyChangedEventArgs) {
            this._FromCached = args.NewValue;
        }
        private _ToChanged(args: IDependencyPropertyChangedEventArgs) {
            this._ToCached = args.NewValue;
        }
        private _ByChanged(args: IDependencyPropertyChangedEventArgs) {
            this._ByCached = args.NewValue;
        }
        private _EasingChanged(args: IDependencyPropertyChangedEventArgs) {
            this._EasingCached = args.NewValue;
        }
    }
    Fayde.RegisterType(ColorAnimation, {
    	Name: "ColorAnimation",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}