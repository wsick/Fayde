/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="PointKeyFrameCollection.js"/>
/// CODE
/// <reference path="PointKeyFrame.js"/>

(function (namespace) {
    var PointAnimationUsingKeyFrames = Nullstone.Create("PointAnimationUsingKeyFrames", namespace.AnimationUsingKeyFrames);

    //#region Properties

    PointAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return namespace.PointKeyFrameCollection; }, PointAnimationUsingKeyFrames, undefined, undefined, { GetValue: function () { return new namespace.PointKeyFrameCollection(); } });

    Nullstone.AutoProperties(PointAnimationUsingKeyFrames, [
        PointAnimationUsingKeyFrames.KeyFramesProperty
    ]);

    //#endregion

    //#region Annotations

    PointAnimationUsingKeyFrames.Annotations = {
        ContentProperty: PointAnimationUsingKeyFrames.KeyFramesProperty
    };

    //#endregion

    namespace.PointAnimationUsingKeyFrames = Nullstone.FinishCreate(PointAnimationUsingKeyFrames);
})(Nullstone.Namespace("Fayde.Media.Animation"));
