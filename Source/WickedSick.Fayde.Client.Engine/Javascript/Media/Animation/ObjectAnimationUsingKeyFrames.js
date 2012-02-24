/// <reference path="Animation.js"/>
/// <reference path="ObjectKeyFrameCollection.js"/>
/// CODE

//#region ObjectAnimationUsingKeyFrames

function ObjectAnimationUsingKeyFrames() {
    Animation.call(this);
}
ObjectAnimationUsingKeyFrames.InheritFrom(Animation);

//#region DEPENDENCY PROPERTIES

ObjectAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return ObjectKeyFrameCollection; }, ObjectAnimationUsingKeyFrames, null, { GetValue: function () { return new ObjectKeyFrameCollection(); } });
ObjectAnimationUsingKeyFrames.prototype.GetKeyFrames = function () {
    ///<returns type="ObjectKeyFrameCollection"></returns>
    return this.GetValue(ObjectAnimationUsingKeyFrames.KeyFramesProperty);
};
ObjectAnimationUsingKeyFrames.prototype.SetKeyFrames = function (value) {
    ///<param name="value" type="ObjectKeyFrameCollection"></param>
    this.SetValue(ObjectAnimationUsingKeyFrames.KeyFramesProperty, value);
};

//#endregion

ObjectAnimationUsingKeyFrames.prototype.Resolve = function (target, propd) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    var frames = this.GetKeyFrames();
    var count = frames.GetCount();
    for (var i = 0; i < count; i++) {
        var frame = RefObject.As(frames.GetValueAt(i), ObjectKeyFrame);
        var value = frame.GetValue_Prop();
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

ObjectAnimationUsingKeyFrames.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
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

ObjectAnimationUsingKeyFrames.prototype.AddKeyFrame = function (frame) {
    /// <param name="frame" type="ObjectKeyFrame"></param>
    this.GetKeyFrames().Add(frame);
};
ObjectAnimationUsingKeyFrames.prototype.RemoveKeyFrame = function (frame) {
    /// <param name="frame" type="ObjectKeyFrame"></param>
    this.GetKeyFrames().Remove(frame);
};

//#endregion