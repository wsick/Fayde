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

DoubleAnimationUsingKeyFrames.Instance.Resolve = function () {
    var keyFrames = this.KeyFrames;

    KeyFrameCollection.ResolveKeyFrames(this, keyFrames);

    var count = keyFrames._SortedList.length;
    for (var j = 0; j < count; j++) {
        if (!keyFrames._SortedList[j].KeyTime.IsValid)
            return false;
    }

    return true;
};

DoubleAnimationUsingKeyFrames.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
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
        keyStartTime = 0;
    } else {
        // start at the previous keyframe's target value
        baseValue = prevFrame.ConvertedValue;
        keyStartTime = prevFrame._ResolvedKeyTime;
    }

    var progress;
    if (clockData.CurrentTime.CompareTo(keyEndTime) >= 0) {
        progress = 1.0;
    } else {
        var keyDuration = keyEndTime.Subtract(keyStartTime);
        if (keyDuration <= 0)
            progress = 1.0;
        else
            progress = (clockData.CurrentTime.Subtract(keyStartTime)).Divide(keyDuration);
    }

    return currentKeyFrame.InterpolateValue(baseValue, progress);
};

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