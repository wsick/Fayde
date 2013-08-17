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
    Fayde.RegisterType(PointKeyFrame, {
    	Name: "PointKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
    
    export class DiscretePointKeyFrame extends PointKeyFrame {
        InterpolateValue(baseValue: Point, keyFrameProgress: number): Point {
            if (keyFrameProgress >= 1.0)
                return this.Value;
            return baseValue;
        }
    }
    Fayde.RegisterType(DiscretePointKeyFrame, {
    	Name: "DiscretePointKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
    
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
    Fayde.RegisterType(EasingPointKeyFrame, {
    	Name: "EasingPointKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
    
    export class LinearPointKeyFrame extends PointKeyFrame {
        InterpolateValue(baseValue: Point, keyFrameProgress: number): Point {
            return Point.LERP(baseValue, this.Value, keyFrameProgress);
        }
    }
    Fayde.RegisterType(LinearPointKeyFrame, {
    	Name: "LinearPointKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
    
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
    Fayde.RegisterType(SplinePointKeyFrame, {
    	Name: "SplinePointKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}