/// <reference path="AnimationUsingKeyFrames.ts" />

module Fayde.Media.Animation {
    export class DoubleAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: AnimationUsingKeyFrames.KeyFramesProperty };
    }
    Fayde.RegisterType(DoubleAnimationUsingKeyFrames, {
    	Name: "DoubleAnimationUsingKeyFrames",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}