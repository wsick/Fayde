/// <reference path="Animation.js"/>
/// CODE

//#region AnimationUsingKeyFrames
var AnimationUsingKeyFrames = Nullstone.Create("AnimationUsingKeyFrames", Animation);

AnimationUsingKeyFrames.Instance.Init = function () {
    this.Init$Animation();
};

//#region Properties

Nullstone.AbstractProperty(AnimationUsingKeyFrames, "KeyFrames");

//#endregion

AnimationUsingKeyFrames.Instance.Resolve = function (target, propd) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    var keyFrames = this.KeyFrames;
    
    KeyFrameCollection.ResolveKeyFrames(this, keyFrames);

    var count = keyFrames._SortedList.length;
    for (var j = 0; j < count; j++) {
        if (!keyFrames._SortedList[j].KeyTime.IsValid)
            return false;
    }

    return true;
};
AnimationUsingKeyFrames.Instance.GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
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
AnimationUsingKeyFrames.Instance.GetNaturalDurationCore = function () {
    var keyFrames = this.KeyFrames;
    KeyFrameCollection.ResolveKeyFrames(this, keyFrames);
    var count = keyFrames._SortedList.length;
    if (count > 0)
        return keyFrames._SortedList[count - 1]._ResolvedKeyTime;
    return new Duration(new TimeSpan());
};

AnimationUsingKeyFrames.Instance.AddKeyFrame = function (frame) {
    this.KeyFrames.Add(frame);
};
AnimationUsingKeyFrames.Instance.RemoveKeyFrame = function (frame) {
    this.KeyFrames.Remove(frame);
};

Nullstone.FinishCreate(AnimationUsingKeyFrames);
//#endregion