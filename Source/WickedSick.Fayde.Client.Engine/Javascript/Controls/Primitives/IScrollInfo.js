/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE

//#region IScrollInfo
var IScrollInfo = Nullstone.Create("IScrollInfo");

IScrollInfo.Instance.GetCanHorizontallyScroll = function () { };
IScrollInfo.Instance.SetCanHorizontallyScroll = function () { };

IScrollInfo.Instance.GetCanVerticallyScroll = function () { };
IScrollInfo.Instance.SetCanVerticallyScroll = function () { };

IScrollInfo.Instance.GetExtentWidth = function () { };
IScrollInfo.Instance.GetExtentHeight = function () { };

IScrollInfo.Instance.GetViewportWidth = function () { };
IScrollInfo.Instance.GetViewportHeight = function () { };

IScrollInfo.Instance.GetHorizontalOffset = function () { };
IScrollInfo.Instance.SetHorizontalOffset = function (value) { };

IScrollInfo.Instance.GetVerticalOffset = function () { };
IScrollInfo.Instance.SetVerticalOffset = function (value) { };

IScrollInfo.Instance.GetScrollOwner = function () { };
IScrollInfo.Instance.SetScrollOwner = function (value) { };

IScrollInfo.Instance.LineUp = function () { };
IScrollInfo.Instance.LineDown = function () { };
IScrollInfo.Instance.LineLeft = function () { };
IScrollInfo.Instance.LineRight = function () { };

IScrollInfo.Instance.MouseWheelUp = function () { };
IScrollInfo.Instance.MouseWheelDown = function () { };
IScrollInfo.Instance.MouseWheelLeft = function () { };
IScrollInfo.Instance.MouseWheelRight = function () { };

IScrollInfo.Instance.PageUp = function () { };
IScrollInfo.Instance.PageDown = function () { };
IScrollInfo.Instance.PageLeft = function () { };
IScrollInfo.Instance.PageRight = function () { };

IScrollInfo.Instance.MakeVisible = function (uie, rectangle) { return new Rect(); };

Nullstone.FinishCreate(IScrollInfo);
//#endregion