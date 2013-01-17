/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="PointKeyFrameCollection.js"/>
/// CODE
/// <reference path="PointKeyFrame.js"/>

(function (namespace) {
    var PointAnimationUsingKeyFrames = Nullstone.Create("PointAnimationUsingKeyFrames", AnimationUsingKeyFrames);

    //#region Properties

    PointAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return PointKeyFrameCollection; }, PointAnimationUsingKeyFrames, undefined, undefined, { GetValue: function () { return new PointKeyFrameCollection(); } });

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
})(window);