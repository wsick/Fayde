/// <reference path="KeyFrame.ts" />
/// <reference path="../../Primitives/Point.ts" />
/// <reference path="EasingFunctionBase.ts" />
/// <reference path="KeySpline.ts" />
/// CODE

module Fayde.Media.Animation {
    export class PointKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Point, PointKeyFrame);
        Value: Point;
    }
    Nullstone.RegisterType(PointKeyFrame, "PointKeyFrame");
    
    export class DiscretePointKeyFrame extends PointKeyFrame {
        InterpolateValue(baseValue: Point, keyFrameProgress: number): Point {
            if (keyFrameProgress >= 1.0)
                return this.Value;
            return baseValue;
        }
    }
    Nullstone.RegisterType(DiscretePointKeyFrame, "DiscretePointKeyFrame");
    
    export class EasingPointKeyFrame extends PointKeyFrame {
        static EasingFunctionProperty: DependencyProperty = DependencyProperty.Register("EasingFunction", () => EasingFunctionBase, EasingPointKeyFrame);
        EasingFunction: EasingFunctionBase;

        InterpolateValue(baseValue: Point, keyFrameProgress: number): Point {
            if (keyFrameProgress >= 1.0)
                return this.Value;

            var start = baseValue;
            var end = this.Value;

            var easingFunction = this.EasingFunction;
            if (easingFunction)
                keyFrameProgress = easingFunction.Ease(keyFrameProgress);

            return Point.LERP(start, end, keyFrameProgress);
        }
    }
    Nullstone.RegisterType(EasingPointKeyFrame, "EasingPointKeyFrame");
    
    export class LinearPointKeyFrame extends PointKeyFrame {
        InterpolateValue(baseValue: Point, keyFrameProgress: number): Point {
            return Point.LERP(baseValue, this.Value, keyFrameProgress);
        }
    }
    Nullstone.RegisterType(LinearPointKeyFrame, "LinearPointKeyFrame");
    
    export class SplinePointKeyFrame extends PointKeyFrame {
        static KeySplineProperty: DependencyProperty = DependencyProperty.Register("KeySpline", () => KeySpline, SplinePointKeyFrame);
        KeySpline: KeySpline;

        InterpolateValue(baseValue: Point, keyFrameProgress: number): Point {
            if (keyFrameProgress >= 1.0)
                return this.Value;

            var start = baseValue;
            var end = this.Value;
            var splineProgress = keyFrameProgress;
            var keySpline = this.KeySpline;
            if (keySpline)
                splineProgress = keySpline.GetSplineProgress(keyFrameProgress);

            if (isNaN(start.X))
                start.X = 0;
            if (isNaN(start.Y))
                start.Y = 0;
            if (isNaN(end.X))
                end.X = 0;
            if (isNaN(end.Y))
                end.Y = 0;

            return Point.LERP(start, end, splineProgress);
        }
    }
    Nullstone.RegisterType(SplinePointKeyFrame, "SplinePointKeyFrame");
}