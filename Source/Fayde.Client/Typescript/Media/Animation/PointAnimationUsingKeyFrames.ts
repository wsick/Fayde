/// <reference path="AnimationUsingKeyFrames.ts" />
/// CODE

module Fayde.Media.Animation {
    export class PointAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: "KeyFrames" };
    }
    Nullstone.RegisterType(PointAnimationUsingKeyFrames, "PointAnimationUsingKeyFrames");
}