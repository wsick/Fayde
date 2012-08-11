/// <reference path="Animation.js"/>
/// <reference path="ColorKeyFrameCollection.js"/>
/// CODE
/// <reference path="ColorKeyFrame.js"/>

//#region ColorAnimationUsingKeyFrames
var ColorAnimationUsingKeyFrames = Nullstone.Create("ColorAnimationUsingKeyFrames", Animation);

//#region Properties

ColorAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return ColorKeyFrameCollection; }, ColorAnimationUsingKeyFrames, undefined, { GetValue: function () { return new ColorKeyFrameCollection(); } });

Nullstone.AutoProperties(ColorAnimationUsingKeyFrames, [
    ColorAnimationUsingKeyFrames.KeyFramesProperty
]);

//#endregion

ColorAnimationUsingKeyFrames.Instance.AddKeyFrame = function (frame) {
    /// <param name="frame" type="ColorKeyFrame"></param>
    this.KeyFrames.Add(frame);
};
ColorAnimationUsingKeyFrames.Instance.RemoveKeyFrame = function (frame) {
    /// <param name="frame" type="ColorKeyFrame"></param>
    this.KeyFrames.Remove(frame);
};

//#region Annotations

ColorAnimationUsingKeyFrames.Annotations = {
    ContentProperty: ColorAnimationUsingKeyFrames.KeyFramesProperty
};

//#endregion

Nullstone.FinishCreate(ColorAnimationUsingKeyFrames);
//#endregion