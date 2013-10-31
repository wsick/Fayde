/// <reference path="AnimationUsingKeyFrames.ts" />

module Fayde.Media.Animation {
    export class PointAnimationUsingKeyFrames extends AnimationUsingKeyFrames {
        static Annotations = { ContentProperty: AnimationUsingKeyFrames.KeyFramesProperty };
    }
    Fayde.RegisterType(PointAnimationUsingKeyFrames, {
    	Name: "PointAnimationUsingKeyFrames",
    	Namespace: "Fayde.Media.Animation",
    	XmlNamespace: Fayde.XMLNS
    });
}