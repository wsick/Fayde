/// <reference path="AnimationUsingKeyFrames.ts" />

module Fayde.Media.Animation {
    export class DoubleAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: AnimationUsingKeyFrames.KeyFramesProperty };
    }
    Fayde.RegisterType(DoubleAnimationUsingKeyFrames, "Fayde.Media.Animation", Fayde.XMLNS);
}