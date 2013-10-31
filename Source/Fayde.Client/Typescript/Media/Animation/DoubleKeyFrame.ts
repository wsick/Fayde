/// <reference path="KeyFrame.ts" />

module Fayde.Media.Animation {
    export class DoubleKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Number, DoubleKeyFrame);
        Value: number;
    }
    Fayde.RegisterType(DoubleKeyFrame, {
    	Name: "DoubleKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });

    export class DiscreteDoubleKeyFrame extends DoubleKeyFrame {
        InterpolateValue(baseValue: number, keyFrameProgress: number): number {
            if (keyFrameProgress >= 1.0)
                return this.Value;
            return baseValue;
        }
    }
    Fayde.RegisterType(DiscreteDoubleKeyFrame, {
    	Name: "DiscreteDoubleKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });

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
    Fayde.RegisterType(EasingDoubleKeyFrame, {
    	Name: "EasingDoubleKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });

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
    Fayde.RegisterType(LinearDoubleKeyFrame, {
    	Name: "LinearDoubleKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
    
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
    Fayde.RegisterType(SplineDoubleKeyFrame, {
    	Name: "SplineDoubleKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}