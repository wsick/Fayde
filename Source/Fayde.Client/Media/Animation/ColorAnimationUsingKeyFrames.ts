/// <reference path="AnimationUsingKeyFrames.ts" />

module Fayde.Media.Animation {
    export class ColorAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: AnimationUsingKeyFrames.KeyFramesProperty };
    }
    Fayde.RegisterType(ColorAnimationUsingKeyFrames, "Fayde.Media.Animation", Fayde.XMLNS);
}