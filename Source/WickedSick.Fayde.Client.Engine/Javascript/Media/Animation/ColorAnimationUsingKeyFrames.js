/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="ColorKeyFrameCollection.js"/>
/// CODE
/// <reference path="ColorKeyFrame.js"/>

//#region ColorAnimationUsingKeyFrames
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

Nullstone.FinishCreate(ColorAnimationUsingKeyFrames);
//#endregion