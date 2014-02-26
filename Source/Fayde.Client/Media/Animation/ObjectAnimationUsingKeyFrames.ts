/// <reference path="AnimationUsingKeyFrames.ts" />

module Fayde.Media.Animation {
    export class ObjectAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        Resolve(target: DependencyObject, propd: DependencyProperty): boolean {
            var enumerator = this.KeyFrames.GetEnumerator();
            while (enumerator.MoveNext()) {
                var keyFrame = <ObjectKeyFrame>enumerator.Current;
                var value = keyFrame.Value;
                if (value == null) {
                    keyFrame.ConvertedValue = undefined;
                } else {
                    var converted: any;
                    try {
                        converted = Fayde.ConvertAnyToType(value, <Function>propd.GetTargetType());
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
    Fayde.RegisterType(ObjectAnimationUsingKeyFrames, "Fayde.Media.Animation", Fayde.XMLNS);
}