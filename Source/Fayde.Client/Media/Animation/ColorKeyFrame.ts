/// <reference path="KeyFrame.ts" />

module Fayde.Media.Animation {
    export class ColorKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Color, ColorKeyFrame);
        Value: Color;
    }
    Fayde.RegisterType(ColorKeyFrame, {
    	Name: "ColorKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });

    export class DiscreteColorKeyFrame extends ColorKeyFrame {
        InterpolateValue(baseValue: Color, keyFrameProgress: number): Color {
            if (keyFrameProgress >= 1.0)
                return this.Value;
            return baseValue;
        }
    }
    Fayde.RegisterType(DiscreteColorKeyFrame, {
    	Name: "DiscreteColorKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });

    export class EasingColorKeyFrame extends ColorKeyFrame {
        static EasingFunctionProperty: DependencyProperty = DependencyProperty.Register("EasingFunction", () => EasingFunctionBase, EasingColorKeyFrame);
        EasingFunction: EasingFunctionBase;

        InterpolateValue(baseValue: Color, keyFrameProgress: number): Color {
            if (keyFrameProgress >= 1.0)
                return this.Value;

            var start = baseValue;
            var end = this.Value;

            var easingFunction = this.EasingFunction;
            if (easingFunction)
                keyFrameProgress = easingFunction.Ease(keyFrameProgress);

            return Color.LERP(start, end, keyFrameProgress);
        }
    }
    Fayde.RegisterType(EasingColorKeyFrame, {
    	Name: "EasingColorKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });

    export class LinearColorKeyFrame extends ColorKeyFrame {
        InterpolateValue(baseValue: Color, keyFrameProgress: number): Color {
            return Color.LERP(baseValue, this.Value, keyFrameProgress);
        }
    }
    Fayde.RegisterType(LinearColorKeyFrame, {
    	Name: "LinearColorKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });

    export class SplineColorKeyFrame extends ColorKeyFrame {
        static KeySplineProperty: DependencyProperty = DependencyProperty.Register("KeySpline", () => KeySpline, SplineColorKeyFrame);
        KeySpline: KeySpline;

        InterpolateValue(baseValue: Color, keyFrameProgress: number): Color {
            if (keyFrameProgress >= 1.0)
                return this.Value;

            var start = baseValue;
            var end = this.Value;
            var splineProgress = keyFrameProgress;
            var keySpline = this.KeySpline;
            if (keySpline)
                splineProgress = keySpline.GetSplineProgress(keyFrameProgress);

            return Color.LERP(start, end, splineProgress);
        }
    }
    Fayde.RegisterType(SplineColorKeyFrame, {
    	Name: "SplineColorKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}