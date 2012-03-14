/// <reference path="../../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="KeyFrame.js"/>
/// <reference path="Animation.js"/>

//#region KeyFrameCollection
var KeyFrameCollection = Nullstone.Create("KeyFrameCollection", DependencyObjectCollection);

KeyFrameCollection.Instance.Init = function () {
    this.Init$DependencyObjectCollection();
    this._Resolved = false;
    this._SortedList = new Array();
};

KeyFrameCollection.Instance.GetKeyFrameForTime = function (t, prevFrameRef) {
    /// <param name="t" type="TimeSpan"></param>
    /// <param name="prevFrameRef" type="Object"></param>
    var currentKeyFrame = null;
    var previousKeyFrame = null;
    var i;

    if (this._SortedList.length == 0) {
        prevFrameRef.Value = null;
        return null;
    }

    var keyFrame;
    var valuePropd;
    // Crawl forward to figure out what segment to use (this assumes the list is sorted)
    for (i = 0; i < this._SortedList.length; i++) {
        keyFrame = this._SortedList[i];
        var keyEndTime = keyFrame._ResolvedKeyTime;
        if (keyEndTime.CompareTo(t) >= 0 || (i + 1) >= this._SortedList.length)
            break;
    }

    // Crawl backward to find first non-null frame
    for (; i >= 0; i--) {
        keyFrame = this._SortedList[i];
        valuePropd = keyFrame.GetDependencyProperty("Value");
        if (keyFrame.GetValue(valuePropd) != null) {
            currentKeyFrame = keyFrame;
            break;
        }
    }

    // Crawl backward some more to find first non-null prev frame
    for (i--; i >= 0; i--) {
        keyFrame = this._SortedList[i];
        valuePropd = keyFrame.GetDependencyProperty("Value");
        if (keyFrame.GetValue(valuePropd) != null) {
            previousKeyFrame = keyFrame;
            break;
        }
    }

    prevFrameRef.Value = previousKeyFrame;
    return currentKeyFrame;
};

KeyFrameCollection.Instance.Clear = function () {
    this._Resolved = false;
    //Clear sorted
    this.Clear$DependencyObjectCollection();
};

KeyFrameCollection.Instance.AddedToCollection = function (value, error) {
    if (!this.AddedToCollection$DependencyObjectCollection(value, error))
        return false;
    this._Resolved = false;
    return true;
};
KeyFrameCollection.Instance.RemovedFromCollection = function (value, isValueSafe) {
    this.RemovedFromCollection$DependencyObjectCollection(value, isValueSafe);
    this._Resolved = false;
};

KeyFrameCollection.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (args.Property.Name === "KeyTime")
        this._Resolved = false;
    this._OnSubPropertyChanged$DependencyObjectCollection(propd, sender, args);
};

/// http://msdn2.microsoft.com/en-us/library/ms742524.aspx (Bottom of page)
KeyFrameCollection.ResolveKeyFrames = function (animation, coll) {
    /// <param name="animation" type="Animation"></param>
    /// <param name="coll" type="KeyFrameCollection"></param>
    if (coll._Resolved)
        return;
    coll._Resolved = true;

    var totalInterpolationTime;
    var hasTimeSpanKeyFrame = false;
    var highestKeyTimeTimeSpan = 0;
    var keyFrame;
    var value;
    var count = coll.GetCount();

    var i;
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyFrame._ResolvedTime = 0;
        keyFrame._Resolved = false;
    }

    var keyTime;
    // resolve TimeSpan keyframes
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (keyTime.HasTimeSpan()) {
            hasTimeSpanKeyFrame = true;
            var ts = keyTime.GetTimeSpan();
            if (ts.CompareTo(highestKeyTimeTimeSpan) > 0)
                highestKeyTimeTimeSpan = ts;
            keyFrame._ResolvedKeyTime = ts;
            keyFrame._Resolved = true;
        }
    }

    // calculate total animation interpolation time
    var d = animation.GetDuration();
    if (d.HasTimeSpan()) {
        totalInterpolationTime = d.GetTimeSpan();
    } else if (hasTimeSpanKeyFrame) {
        totalInterpolationTime = highestKeyTimeTimeSpan;
    } else {
        totalInterpolationTime = new TimeSpan(TimeSpan._TicksPerSecond);
    }

    // use the total interpolation time to resolve percent keytime keyframes
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (keyTime.HasPercent()) {
            keyFrame._ResolvedTime = totalInterpolationTime.Multiply(keyTime.GetPercent())
            keyFrame._Resolved = true;
        }
    }

    // if the last frame is KeyTime Uniform or Paced, resolve it to be equal to the total interpolation time
    if (count > 0) {
        value = coll.GetValueAt(count - 1);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (keyTime.IsPaced() || keyTime.IsUniform()) {
            keyFrame._ResolvedKeyTime = totalInterpolationTime;
            keyFrame._Resolved = true;
        }
    }

    /* if the first frame is KeyTime Paced:
    **   1. if there is only 1 frame, its KeyTime is the total interpolation time.
    **   2. if there is more than 1 frame, its KeyTime is 0.
    **
    ** note 1 is handled in the above block so we only have to
    ** handle 2 here.
    */
    if (count > 0) {
        value = coll.GetValueAt(count - 1);
        keyFrame = Nullstone.As(value, KeyFrame);
        keyTime = keyFrame.GetKeyTime();
        if (!keyFrame._Resolved && keyTime.IsPaced()) {
            keyFrame._ResolvedKeyTime = new TimeSpan(0);
            keyFrame._Resolved = true;
        }
    }

    // XXX resolve remaining KeyTime::Uniform frames

    // XXX resolve frames with unspecified keytimes -- is this possible?  is the default keytime NULL?  it seems to be Uniform?

    // XXX resolve remaining KeyTime::Paced frames */

    this._SortedList = new Array();
    for (i = 0; i < count; i++) {
        value = coll.GetValueAt(i);
        keyFrame = Nullstone.As(value, KeyFrame);
        this._SortedList.push(keyFrame);
    }
    this._SortedList.sort(KeyFrame.Comparer);
};

Nullstone.FinishCreate(KeyFrameCollection);
//#endregion