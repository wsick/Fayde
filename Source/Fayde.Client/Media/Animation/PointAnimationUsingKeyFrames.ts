/// <reference path="AnimationUsingKeyFrames.ts" />

module Fayde.Media.Animation {
    export class PointAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: AnimationUsingKeyFrames.KeyFramesProperty };
    }
    Fayde.RegisterType(PointAnimationUsingKeyFrames, "Fayde.Media.Animation", Fayde.XMLNS);
}