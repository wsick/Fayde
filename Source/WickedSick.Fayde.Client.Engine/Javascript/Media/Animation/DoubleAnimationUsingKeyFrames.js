/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="DoubleKeyFrame.js"/>
/// CODE

(function (namespace) {
    var DoubleAnimationUsingKeyFrames = Nullstone.Create("DoubleAnimationUsingKeyFrames", namespace.AnimationUsingKeyFrames);

    //#region Properties

    DoubleAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return namespace.DoubleKeyFrameCollection; }, DoubleAnimationUsingKeyFrames, undefined, undefined, { GetValue: function () { return new namespace.DoubleKeyFrameCollection(); } });

    Nullstone.AutoProperties(DoubleAnimationUsingKeyFrames, [
        DoubleAnimationUsingKeyFrames.KeyFramesProperty
    ]);

    //#endregion

    //#region Annotations

    DoubleAnimationUsingKeyFrames.Annotations = {
        ContentProperty: DoubleAnimationUsingKeyFrames.KeyFramesProperty
    };

    //#endregion

    namespace.DoubleAnimationUsingKeyFrames = Nullstone.FinishCreate(DoubleAnimationUsingKeyFrames);
})(Nullstone.Namespace("Fayde.Media.Animation"));
