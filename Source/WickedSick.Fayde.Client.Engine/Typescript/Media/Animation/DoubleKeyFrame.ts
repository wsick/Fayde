/// <reference path="KeyFrame.ts" />
/// <reference path="EasingFunctionBase.ts" />
/// <reference path="KeySpline.ts" />
/// CODE

module Fayde.Media.Animation {
    export class DoubleKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Number, DoubleKeyFrame);
        Value: number;
    }
    Nullstone.RegisterType(DoubleKeyFrame, "DoubleKeyFrame");

    export class DiscreteDoubleKeyFrame extends DoubleKeyFrame {
        InterpolateValue(baseValue: number, keyFrameProgress: number): number {
            if (keyFrameProgress >= 1.0)
                return this.Value;
            return baseValue;
        }
    }
    Nullstone.RegisterType(DiscreteDoubleKeyFrame, "DiscreteDoubleKeyFrame");

    export class EasingDoubleKeyFrame extends DoubleKeyFrame {
        static EasingFunctionProperty: DependencyProperty = DependencyProperty.Register("EasingFunction", () => EasingFunctionBase, EasingDoubleKeyFrame);
        EasingFunction: EasingFunctionBase;

        InterpolateValue(baseValue: number, keyFrameProgress: number): number {
            if (keyFrameProgress >= 1.0)
                return this.Value;

            var start = baseValue;
            var end = this.Value;

            var easingFunction = this.EasingFunction;
            if (easingFunction)
                keyFrameProgress = easingFunction.Ease(keyFrameProgress);

            if (isNaN(start))
                start = 0;
            if (isNaN(end))
                end = 0;

            return start + (end - start) * keyFrameProgress;
        }
    }
    Nullstone.RegisterType(EasingDoubleKeyFrame, "EasingDoubleKeyFrame");

    export class LinearDoubleKeyFrame extends DoubleKeyFrame {
        InterpolateValue(baseValue: number, keyFrameProgress: number): number {
            var start = baseValue;
            var end = this.Value;
            if (isNaN(start))
                start = 0;
            if (isNaN(end))
                end = 0;
            return start + (end - start) * keyFrameProgress;
        }
    }
    Nullstone.RegisterType(LinearDoubleKeyFrame, "LinearDoubleKeyFrame");
    
    export class SplineDoubleKeyFrame extends DoubleKeyFrame {
        static KeySplineProperty: DependencyProperty = DependencyProperty.Register("KeySpline", () => KeySpline, SplineDoubleKeyFrame);
        KeySpline: KeySpline;

        InterpolateValue(baseValue: number, keyFrameProgress: number): number {
            if (keyFrameProgress >= 1.0)
                return this.Value;

            var start = baseValue;
            var end = this.Value;
            var splineProgress = keyFrameProgress;
            var keySpline = this.KeySpline;
            if (keySpline)
                splineProgress = keySpline.GetSplineProgress(keyFrameProgress);

            if (isNaN(start))
                start = 0;
            if (isNaN(end))
                end = 0;

            return start + (end - start) * splineProgress;
        }
    }
    Nullstone.RegisterType(SplineDoubleKeyFrame, "SplineDoubleKeyFrame");
}