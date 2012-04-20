﻿/// <reference path="Animation.js"/>
/// <reference path="ObjectKeyFrameCollection.js"/>
/// CODE

//#region ObjectAnimationUsingKeyFrames
var ObjectAnimationUsingKeyFrames = Nullstone.Create("ObjectAnimationUsingKeyFrames", Animation);

//#region DEPENDENCY PROPERTIES

ObjectAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return ObjectKeyFrameCollection; }, ObjectAnimationUsingKeyFrames, null, { GetValue: function () { return new ObjectKeyFrameCollection(); } });
ObjectAnimationUsingKeyFrames.Instance.GetKeyFrames = function () {
    ///<returns type="ObjectKeyFrameCollection"></returns>
    return this.$GetValue(ObjectAnimationUsingKeyFrames.KeyFramesProperty);
};
ObjectAnimationUsingKeyFrames.Instance.SetKeyFrames = function (value) {
    ///<param name="value" type="ObjectKeyFrameCollection"></param>
    this.SetValue(ObjectAnimationUsingKeyFrames.KeyFramesProperty, value);
};

//#endregion

ObjectAnimationUsingKeyFrames.Instance.Resolve = function (target, propd) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    var frames = this.GetKeyFrames();
    var count = frames.GetCount();
    for (var i = 0; i < count; i++) {
        var frame = Nullstone.As(frames.GetValueAt(i), ObjectKeyFrame);
        var value = frame.$GetValue(ObjectKeyFrame.ValueProperty);
        if (value == null) {
            frame.SetValue(ObjectKeyFrame.ConvertedValueProperty, null);
        } else {
            var converted = value;
            //TODO: Convert - return false if error converting
            frame.SetValue(ObjectKeyFrame.ConvertedValueProperty, converted);
        }
    }
    KeyFrameCollection.ResolveKeyFrames(this, frames);

    //TODO: Validate Key Times

    return true;
};

ObjectAnimationUsingKeyFrames.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
    var keyFrames = this.GetKeyFrames();

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
        baseValue = prevFrame.GetConvertedValue();
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

ObjectAnimationUsingKeyFrames.Instance.AddKeyFrame = function (frame) {
    /// <param name="frame" type="ObjectKeyFrame"></param>
    this.GetKeyFrames().Add(frame);
};
ObjectAnimationUsingKeyFrames.Instance.RemoveKeyFrame = function (frame) {
    /// <param name="frame" type="ObjectKeyFrame"></param>
    this.GetKeyFrames().Remove(frame);
};

Nullstone.FinishCreate(ObjectAnimationUsingKeyFrames);
//#endregion