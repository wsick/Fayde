/// <reference path="RefObject.js"/>
/// CODE
/// <reference path="Primitives.js"/>
/// <reference path="Geometry.js"/>
/// <reference path="UIElement.js"/>
/// <reference path="DependencyProperty.js"/>

//#region LayoutInformation

function LayoutInformation() {
    RefObject.call(this);
}
LayoutInformation.InheritFrom(RefObject);

//#region DEPENDENCY PROPERTIES

LayoutInformation.LayoutClipProperty = DependencyProperty.RegisterAttached("LayoutClip", function () { return Geometry; }, LayoutInformation);
LayoutInformation.GetLayoutClip = function (d) {
    return d.GetValue(LayoutInformation.LayoutClipProperty);
};
LayoutInformation.SetLayoutClip = function (d, value) {
    d.SetValue(LayoutInformation.LayoutClipProperty, value);
};

LayoutInformation.LayoutExceptionElementProperty = DependencyProperty.RegisterAttached("LayoutExceptionElement", function () { return UIElement; }, LayoutInformation);
LayoutInformation.GetLayoutExceptionElement = function (d) {
    return d.GetValue(LayoutInformation.LayoutExceptionElementProperty);
};
LayoutInformation.SetLayoutExceptionElement = function (d, value) {
    d.SetValue(LayoutInformation.LayoutExceptionElementProperty, value);
};

LayoutInformation.LayoutSlotProperty = DependencyProperty.RegisterAttached("LayoutSlot", function () { return Rect; }, LayoutInformation, new Rect());
LayoutInformation.GetLayoutSlot = function (d) {
    return d.GetValue(LayoutInformation.LayoutSlotProperty);
};
LayoutInformation.SetLayoutSlot = function (d, value) {
    d.SetValue(LayoutInformation.LayoutSlotProperty, value);
};

LayoutInformation.PreviousConstraintProperty = DependencyProperty.RegisterAttached("PreviousConstraint", function () { return Size; }, LayoutInformation);
LayoutInformation.GetPreviousConstraint = function (d) {
    return d.GetValue(LayoutInformation.PreviousConstraintProperty);
};
LayoutInformation.SetPreviousConstraint = function (d, value) {
    d.SetValue(LayoutInformation.PreviousConstraintProperty, value);
};

LayoutInformation.FinalRectProperty = DependencyProperty.RegisterAttached("FinalRect", function () { return Rect; }, LayoutInformation);
LayoutInformation.GetFinalRect = function (d) {
    return d.GetValue(LayoutInformation.FinalRectProperty);
};
LayoutInformation.SetFinalRect = function (d, value) {
    d.SetValue(LayoutInformation.FinalRectProperty, value);
};

LayoutInformation.LastRenderSizeProperty = DependencyProperty.RegisterAttached("LastRenderSize", function () { return Size; }, LayoutInformation);
LayoutInformation.GetLastRenderSize = function (d) {
    return d.GetValue(LayoutInformation.LastRenderSizeProperty);
};
LayoutInformation.SetLastRenderSize = function (d, value) {
    d.SetValue(LayoutInformation.LastRenderSizeProperty, value);
};

LayoutInformation.VisualOffsetProperty = DependencyProperty.RegisterAttached("VisualOffset", function () { return Point; }, LayoutInformation);
LayoutInformation.GetVisualOffset = function (d) {
    return d.GetValue(LayoutInformation.VisualOffsetProperty);
};
LayoutInformation.SetVisualOffset = function (d, value) {
    d.SetValue(LayoutInformation.VisualOffsetProperty, value);
};

//#endregion

//#endregion

//#region LayoutPass

function LayoutPass() {
    RefObject.call(this);
    this._MeasureList = new List();
    this._ArrangeList = new List();
    this._SizeList = new List();
    this._Count = 0;
    this._Updated = false;
}
LayoutPass.InheritFrom(RefObject);

LayoutPass.MaxCount = 250;

//#endregion