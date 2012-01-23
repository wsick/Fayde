/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="DependencyProperty.js"/>
/// <reference path="Primitives.js"/>

//#region LayoutInformation

LayoutInformation.prototype = new RefObject;
LayoutInformation.prototype.constructor = new LayoutInformation;
function LayoutInformation() {
    RefObject.call(this);
}
LayoutInformation.GetBaseClass = function () { return RefObject; };

//#region DEPENDENCY PROPERTIES

LayoutInformation.LayoutClipProperty = DependencyProperty.RegisterAttached("LayoutClip", LayoutInformation);
LayoutInformation.GetLayoutClip = function (d) {
    return d.GetValue(LayoutInformation.LayoutClipProperty);
};
LayoutInformation.SetLayoutClip = function (d, value) {
    d.SetValue(LayoutInformation.LayoutClipProperty, value);
};

LayoutInformation.LayoutExceptionElementProperty = DependencyProperty.RegisterAttached("LayoutExceptionElement", LayoutInformation);
LayoutInformation.GetLayoutExceptionElement = function (d) {
    return d.GetValue(LayoutInformation.LayoutExceptionElementProperty);
};
LayoutInformation.SetLayoutExceptionElement = function (d, value) {
    d.SetValue(LayoutInformation.LayoutExceptionElementProperty, value);
};

LayoutInformation.LayoutSlotProperty = DependencyProperty.RegisterAttached("LayoutSlot", LayoutInformation, new Rect());
LayoutInformation.GetLayoutSlot = function (d) {
    return d.GetValue(LayoutInformation.LayoutSlotProperty);
};
LayoutInformation.SetLayoutSlot = function (d, value) {
    d.SetValue(LayoutInformation.LayoutSlotProperty, value);
};

LayoutInformation.PreviousConstraintProperty = DependencyProperty.RegisterAttached("PreviousConstraint", LayoutInformation);
LayoutInformation.GetPreviousConstraint = function (d) {
    return d.GetValue(LayoutInformation.PreviousConstraintProperty);
};
LayoutInformation.SetPreviousConstraint = function (d, value) {
    d.SetValue(LayoutInformation.PreviousConstraintProperty, value);
};

LayoutInformation.FinalRectProperty = DependencyProperty.RegisterAttached("FinalRect", LayoutInformation);
LayoutInformation.GetFinalRect = function (d) {
    return d.GetValue(LayoutInformation.FinalRectProperty);
};
LayoutInformation.SetFinalRect = function (d, value) {
    d.SetValue(LayoutInformation.FinalRectProperty, value);
};

LayoutInformation.LastRenderSizeProperty = DependencyProperty.RegisterAttached("LastRenderSize", LayoutInformation);
LayoutInformation.GetLastRenderSize = function (d) {
    return d.GetValue(LayoutInformation.LastRenderSizeProperty);
};
LayoutInformation.SetLastRenderSize = function (d, value) {
    d.SetValue(LayoutInformation.LastRenderSizeProperty, value);
};

LayoutInformation.VisualOffsetProperty = DependencyProperty.RegisterAttached("VisualOffset", LayoutInformation);
LayoutInformation.GetVisualOffset = function (d) {
    return d.GetValue(LayoutInformation.VisualOffsetProperty);
};
LayoutInformation.SetVisualOffset = function (d, value) {
    d.SetValue(LayoutInformation.VisualOffsetProperty, value);
};

//#endregion

//#endregion

//#region LayoutPass

LayoutPass.prototype = new RefObject;
LayoutPass.prototype.constructor = LayoutPass;
function LayoutPass() {
    RefObject.call(this);
    this._MeasureList = new List();
    this._ArrangeList = new List();
    this._SizeList = new List();
    this._Count = 0;
    this._Updated = false;
}
LayoutPass.GetBaseClass = function () { return RefObject; };

LayoutPass.MaxCount = 250;

//#endregion