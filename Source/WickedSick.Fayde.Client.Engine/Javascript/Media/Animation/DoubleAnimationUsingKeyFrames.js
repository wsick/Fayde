/// <reference path="Animation.js"/>
/// <reference path="DoubleKeyFrameCollection.js"/>
/// CODE
/// <reference path="DoubleKeyFrame.js"/>

//#region DoubleAnimationUsingKeyFrames
var DoubleAnimationUsingKeyFrames = Nullstone.Create("DoubleAnimationUsingKeyFrames", Animation);

//#region Dependency Properties

DoubleAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return DoubleKeyFrameCollection; }, DoubleAnimationUsingKeyFrames, undefined, { GetValue: function () { return new DoubleKeyFrameCollection(); } });

Nullstone.AutoProperties(DoubleAnimationUsingKeyFrames, [
    DoubleAnimationUsingKeyFrames.KeyFramesProperty
]);

//#endregion

DoubleAnimationUsingKeyFrames.Instance.AddKeyFrame = function (frame) {
    /// <param name="frame" type="DoubleKeyFrame"></param>
    this.KeyFrames.Add(frame);
};
DoubleAnimationUsingKeyFrames.Instance.RemoveKeyFrame = function (frame) {
    /// <param name="frame" type="DoubleKeyFrame"></param>
    this.KeyFrames.Remove(frame);
};

//#region Annotations

DoubleAnimationUsingKeyFrames.Annotations = {
    ContentProperty: DoubleAnimationUsingKeyFrames.KeyFramesProperty
};

//#endregion

Nullstone.FinishCreate(DoubleAnimationUsingKeyFrames);
//#endregion