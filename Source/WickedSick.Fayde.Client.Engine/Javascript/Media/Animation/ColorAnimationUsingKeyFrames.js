/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="ColorKeyFrame.js"/>
/// CODE

(function (namespace) {
    var ColorAnimationUsingKeyFrames = Nullstone.Create("ColorAnimationUsingKeyFrames", namespace.AnimationUsingKeyFrames);

    //#region Properties

    ColorAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return namespace.ColorKeyFrameCollection; }, ColorAnimationUsingKeyFrames, undefined, undefined, { GetValue: function () { return new namespace.ColorKeyFrameCollection(); } });

    Nullstone.AutoProperties(ColorAnimationUsingKeyFrames, [
        ColorAnimationUsingKeyFrames.KeyFramesProperty
    ]);

    //#endregion

    //#region Annotations

    ColorAnimationUsingKeyFrames.Annotations = {
        ContentProperty: ColorAnimationUsingKeyFrames.KeyFramesProperty
    };

    //#endregion

    namespace.ColorAnimationUsingKeyFrames = Nullstone.FinishCreate(ColorAnimationUsingKeyFrames);
})(Nullstone.Namespace("Fayde.Media.Animation"));
