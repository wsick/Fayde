/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE

(function (Primitives) {
    var IScrollInfo = Nullstone.Create("IScrollInfo");

    Nullstone.AutoProperties(IScrollInfo, [
        "CanHorizontallyScroll",
        "CanVerticallyScroll",
        "HorizontalOffset",
        "VerticalOffset",
        "ScrollOwner",
    ]);

    Nullstone.AutoPropertiesReadOnly(IScrollInfo, [
        "ExtentWidth",
        "ExtentHeight",
        "ViewportWidth",
        "ViewportHeight"
    ]);

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

    IScrollInfo.Instance.MakeVisible = function (uie, rectangle) { return new rect(); };

    Primitives.IScrollInfo = Nullstone.FinishCreate(IScrollInfo);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));