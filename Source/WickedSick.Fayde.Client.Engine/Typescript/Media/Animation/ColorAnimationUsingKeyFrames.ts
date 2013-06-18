/// <reference path="AnimationUsingKeyFrames.ts" />
/// CODE

module Fayde.Media.Animation {
    export class ColorAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: "KeyFrames" };
    }
    Nullstone.RegisterType(ColorAnimationUsingKeyFrames, "ColorAnimationUsingKeyFrames");
}