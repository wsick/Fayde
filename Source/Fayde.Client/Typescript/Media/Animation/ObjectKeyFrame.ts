/// <reference path="KeyFrame.ts" />
/// CODE

module Fayde.Media.Animation {
    export class ObjectKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Object, ObjectKeyFrame);
        Value: any;
        ConvertedValue: any = undefined;
    }
    Nullstone.RegisterType(ObjectKeyFrame, "ObjectKeyFrame");
    
    export class DiscreteObjectKeyFrame extends ObjectKeyFrame {
        InterpolateValue(baseValue: any, keyFrameProgress: number): any {
            if (keyFrameProgress >= 1.0)
                return this.ConvertedValue;
            return baseValue;
        }
    }
    Nullstone.RegisterType(DiscreteObjectKeyFrame, "DiscreteObjectKeyFrame");
}