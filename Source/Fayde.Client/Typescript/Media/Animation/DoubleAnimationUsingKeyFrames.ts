/// <reference path="AnimationUsingKeyFrames.ts" />
/// CODE

module Fayde.Media.Animation {
    export class DoubleAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: AnimationUsingKeyFrames.KeyFramesProperty };
    }
    Nullstone.RegisterType(DoubleAnimationUsingKeyFrames, "DoubleAnimationUsingKeyFrames");
}