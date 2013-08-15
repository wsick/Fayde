/// <reference path="AnimationUsingKeyFrames.ts" />
/// CODE

module Fayde.Media.Animation {
    export class DoubleAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: "KeyFrames" };
    }
    Nullstone.RegisterType(DoubleAnimationUsingKeyFrames, "DoubleAnimationUsingKeyFrames");
}