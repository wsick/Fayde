/// <reference path="KeyFrame.ts" />

module Fayde.Media.Animation {
    export class ObjectKeyFrame extends KeyFrame {
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Object, ObjectKeyFrame);
        Value: any;
        ConvertedValue: any = undefined;
    }
    Fayde.RegisterType(ObjectKeyFrame, {
    	Name: "ObjectKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
    
    export class DiscreteObjectKeyFrame extends ObjectKeyFrame {
        InterpolateValue(baseValue: any, keyFrameProgress: number): any {
            if (keyFrameProgress >= 1.0)
                return this.ConvertedValue;
            return baseValue;
        }
    }
    Fayde.RegisterType(DiscreteObjectKeyFrame, {
    	Name: "DiscreteObjectKeyFrame",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}