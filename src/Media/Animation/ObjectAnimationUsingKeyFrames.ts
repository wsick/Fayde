/// <reference path="AnimationUsingKeyFrames.ts" />

module Fayde.Media.Animation {
    export class ObjectAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        Resolve(target: DependencyObject, propd: DependencyProperty): boolean {
            var enumerator = this.KeyFrames.getEnumerator();
            while (enumerator.moveNext()) {
                var keyFrame = <ObjectKeyFrame>enumerator.current;
                var value = keyFrame.Value;
                if (value == null) {
                    keyFrame.ConvertedValue = undefined;
                } else {
                    var converted: any;
                    try {
                        converted = nullstone.convertAnyToType(value, <Function>propd.GetTargetType());
                    } catch (err) {
                        console.warn("Error resolving ObjectAnimation Value.");
                        return false;
                    }
                    keyFrame.ConvertedValue = converted;
                }
            }
            return super.Resolve(target, propd);
        }
    }
    Fayde.CoreLibrary.add(ObjectAnimationUsingKeyFrames);
}