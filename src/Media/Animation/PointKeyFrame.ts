/// <reference path="KeyFrame.ts" />

module Fayde.Media.Animation {
    export class PointKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Point, PointKeyFrame);
        Value: Point;
    }
    Fayde.RegisterType(PointKeyFrame, "Fayde.Media.Animation", Fayde.XMLNS);
    
    export class DiscretePointKeyFrame extends PointKeyFrame {
        InterpolateValue(baseValue: Point, keyFrameProgress: number): Point {
            if (keyFrameProgress >= 1.0)
                return this.Value;
            return baseValue;
        }
    }
    Fayde.RegisterType(DiscretePointKeyFrame, "Fayde.Media.Animation", Fayde.XMLNS);
    
    export class EasingPointKeyFrame extends PointKeyFrame {
        static EasingFunctionProperty = DependencyProperty.Register("EasingFunction", () => EasingFunctionBase, EasingPointKeyFrame);
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
    Fayde.RegisterType(EasingPointKeyFrame, "Fayde.Media.Animation", Fayde.XMLNS);
    
    export class LinearPointKeyFrame extends PointKeyFrame {
        InterpolateValue(baseValue: Point, keyFrameProgress: number): Point {
            return Point.LERP(baseValue, this.Value, keyFrameProgress);
        }
    }
    Fayde.RegisterType(LinearPointKeyFrame, "Fayde.Media.Animation", Fayde.XMLNS);
    
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

            if (isNaN(start.x))
                start.x = 0;
            if (isNaN(start.y))
                start.y = 0;
            if (isNaN(end.x))
                end.x = 0;
            if (isNaN(end.y))
                end.y = 0;

            return Point.LERP(start, end, splineProgress);
        }
    }
    Fayde.RegisterType(SplinePointKeyFrame, "Fayde.Media.Animation", Fayde.XMLNS);
}