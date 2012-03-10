/// <reference path="../../Core/DependencyObject.js"/>
/// CODE

//#region KeyFrame
var KeyFrame = Nullstone.Create("KeyFrame", DependencyObject);

KeyFrame.Instance.Init = function () {
    this.Init$super();
    this._ResolvedKeyTime = null;
    this._Resolved = false;
};

KeyFrame.Instance.GetKeyTime = function () {
    /// <returns type="KeyTime" />
    throw new AbstractMethodException();
};
KeyFrame.Instance.SetKeyTime = function (value) {
    /// <param name="value" type="KeyTime"></param>
    throw new AbstractMethodException();
};

KeyFrame.Instance.CoerceKeyTime = function (dobj, propd, value, coerced, error) {
    if (value == null)
        coerced.Value = this.GetKeyTime();
    else
        coerced.Value = value;
    return true;
};
KeyFrame.Instance.InterpolateValue = function () {
    throw new AbstractMethodException();
};

KeyFrame.Comparer = function (kf1, kf2) {
    /// <param name="kf1" type="KeyFrame"></param>
    /// <param name="kf2" type="KeyFrame"></param>
    var ts1 = kf1._ResolvedKeyTime;
    var ts2 = kf2._ResolvedKeyTime;
    return ts1.CompareTo(ts2);
};

Nullstone.FinishCreate(KeyFrame);
//#endregion