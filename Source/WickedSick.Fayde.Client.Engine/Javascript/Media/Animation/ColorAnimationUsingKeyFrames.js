/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="ColorKeyFrameCollection.js"/>
/// CODE
/// <reference path="ColorKeyFrame.js"/>

(function (namespace) {
    var ColorAnimationUsingKeyFrames = Nullstone.Create("ColorAnimationUsingKeyFrames", AnimationUsingKeyFrames);

    //#region Properties

    ColorAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return ColorKeyFrameCollection; }, ColorAnimationUsingKeyFrames, undefined, undefined, { GetValue: function () { return new ColorKeyFrameCollection(); } });

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
})(window);