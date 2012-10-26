/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="DoubleKeyFrameCollection.js"/>
/// CODE
/// <reference path="DoubleKeyFrame.js"/>

//#region DoubleAnimationUsingKeyFrames
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

Nullstone.FinishCreate(DoubleAnimationUsingKeyFrames);
//#endregion