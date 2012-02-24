/// <reference path="../../Core/DependencyObject.js"/>
/// CODE

//#region KeyFrame

function KeyFrame() {
    DependencyObject.call(this);
    if (!IsDocumentReady())
        return;
    this._ResolvedKeyTime = null;
    this._Resolved = false;
}
KeyFrame.InheritFrom(DependencyObject);

KeyFrame.prototype.GetKeyTime = function () {
    /// <returns type="KeyTime" />
    throw new AbstractMethodException();
};
KeyFrame.prototype.SetKeyTime = function (value) {
    /// <param name="value" type="KeyTime"></param>
    throw new AbstractMethodException();
};

KeyFrame.prototype.CoerceKeyTime = function (dobj, propd, value, coerced, error) {
    if (value == null)
        coerced.Value = this.GetKeyTime();
    else
        coerced.Value = value;
    return true;
};
KeyFrame.prototype.InterpolateValue = function () {
    throw new AbstractMethodException();
};

KeyFrame.Comparer = function (kf1, kf2) {
    /// <param name="kf1" type="KeyFrame"></param>
    /// <param name="kf2" type="KeyFrame"></param>
    var ts1 = kf1._ResolvedKeyTime;
    var ts2 = kf2._ResolvedKeyTime;
    return ts1.CompareTo(ts2);
};

//#endregion