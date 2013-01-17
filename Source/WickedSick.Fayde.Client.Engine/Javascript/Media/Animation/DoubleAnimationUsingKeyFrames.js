/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="DoubleKeyFrameCollection.js"/>
/// CODE
/// <reference path="DoubleKeyFrame.js"/>

(function (namespace) {
    var DoubleAnimationUsingKeyFrames = Nullstone.Create("DoubleAnimationUsingKeyFrames", AnimationUsingKeyFrames);

    //#region Properties

    DoubleAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return DoubleKeyFrameCollection; }, DoubleAnimationUsingKeyFrames, undefined, undefined, { GetValue: function () { return new DoubleKeyFrameCollection(); } });

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
})(window);