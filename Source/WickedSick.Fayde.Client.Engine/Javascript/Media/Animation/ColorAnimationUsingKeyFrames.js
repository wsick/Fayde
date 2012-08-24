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

ColorAnimationUsingKeyFrames.Instance.Resolve = function () {
    var keyFrames = this.KeyFrames;

    KeyFrameCollection.ResolveKeyFrames(this, keyFrames);

    var count = keyFrames._SortedList.length;
    for (var j = 0; j < count; j++) {
        if (!keyFrames._SortedList[j].KeyTime.IsValid)
            return false;
    }

    return true;
};

ColorAnimationUsingKeyFrames.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
    var keyFrames = this.KeyFrames;

    var prevFrameRef = {};
    var currentKeyFrame = keyFrames.GetKeyFrameForTime(clockData.CurrentTime, prevFrameRef);
    var prevFrame = prevFrameRef.Value;
    if (currentKeyFrame == null)
        return null;

    var baseValue;
    var keyStartTime;
    var keyEndTime = currentKeyFrame._ResolvedKeyTime;
    if (prevFrame == null) {
        // the first keyframe, start at the animation's base value
        baseValue = defaultOriginValue;
        keyStartTime = new TimeSpan();
    } else {
        // start at the previous keyframe's target value
        baseValue = prevFrame.ConvertedValue;
        keyStartTime = prevFrame._ResolvedKeyTime;
    }

    var progress;
    if (clockData.CurrentTime.CompareTo(keyEndTime) >= 0) {
        progress = 1.0;
    } else {
        var keyDuration = keyEndTime._Ticks - keyStartTime._Ticks;
        if (keyDuration <= 0)
            progress = 1.0;
        else
            progress = (clockData.CurrentTime._Ticks - keyStartTime._Ticks) / keyDuration;
    }

    return currentKeyFrame.InterpolateValue(baseValue, progress);
};

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