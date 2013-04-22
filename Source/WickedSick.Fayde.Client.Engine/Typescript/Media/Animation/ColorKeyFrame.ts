/// <reference path="KeyFrame.ts" />
/// <reference path="../../Primitives/Color.ts" />
/// <reference path="EasingFunctionBase.ts" />
/// <reference path="KeySpline.ts" />
/// CODE

module Fayde.Media.Animation {
    export class ColorKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Color, ColorKeyFrame);
        Value: Color;
    }
    Nullstone.RegisterType(ColorKeyFrame, "ColorKeyFrame");

    export class DiscreteColorKeyFrame extends ColorKeyFrame {
        InterpolateValue(baseValue: Color, keyFrameProgress: number): Color {
            if (keyFrameProgress >= 1.0)
                return this.Value;
            return baseValue;
        }
    }
    Nullstone.RegisterType(DiscreteColorKeyFrame, "DiscreteColorKeyFrame");

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
    Nullstone.RegisterType(EasingColorKeyFrame, "EasingColorKeyFrame");

    export class LinearColorKeyFrame extends ColorKeyFrame {
        InterpolateValue(baseValue: Color, keyFrameProgress: number): Color {
            return Color.LERP(baseValue, this.Value, keyFrameProgress);
        }
    }
    Nullstone.RegisterType(LinearColorKeyFrame, "LinearColorKeyFrame");

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
    Nullstone.RegisterType(SplineColorKeyFrame, "SplineColorKeyFrame");
}