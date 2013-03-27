/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Primitives.js"/>
/// CODE
/// <reference path="../Primitives/Point.js"/>
/// <reference path="../Media/Geometry.js"/>
/// <reference path="UIElement.js"/>
/// <reference path="DependencyProperty.js"/>

(function (Fayde) {
    function LayoutInformation() {
        this.LayoutClip = undefined;
        this.LayoutExceptionElement = undefined;
        this.LayoutSlot = undefined;
        this.FinalRect = undefined;
        this.LastRenderSize = undefined;
        this.VisualOffset = undefined;
    }

    LayoutInformation.GetLayoutClip = function (uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="Fayde.Media.Geometry" />
        return uie._LayoutInformation.LayoutClip;
    }
    LayoutInformation.SetLayoutClip = function (uie, value) {
        /// <param name="uie" type="UIElement"></param>
        /// <param name="value" type="Fayde.Media.Geometry"></param>
        uie._LayoutInformation.LayoutClip = value;
        if (uie._Metrics)
            uie._Metrics.UpdateLayoutClipBounds(value);
    };

    LayoutInformation.GetLayoutExceptionElement = function (uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="Fayde.UIElement" />
        return uie._LayoutInformation.LayoutExceptionElement;
    };
    LayoutInformation.SetLayoutExceptionElement = function (uie, value) {
        /// <param name="uie" type="UIElement"></param>
        /// <param name="value" type="UIElement"></param>
        uie._LayoutInformation.LayoutExceptionElement = value;
    };

    LayoutInformation.GetLayoutSlot = function (uie, ignoreDefault) {
        /// <param name="uie" type="Fayde.UIElement"></param>
        /// <param name="ignoreDefault" type="Boolean"></param>
        /// <returns type="rect" />
        var s = uie._LayoutInformation.LayoutSlot;
        if (ignoreDefault || s)
            return s;
        return new rect();
    };
    LayoutInformation.SetLayoutSlot = function (uie, value) {
        /// <param name="uie" type="UIElement"></param>
        /// <param name="value" type="rect"></param>
        uie._LayoutInformation.LayoutSlot = value;
    };
    
    LayoutInformation.GetFinalRect = function (uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="rect" />
        return uie._LayoutInformation.FinalRect;
    };
    LayoutInformation.SetFinalRect = function (uie, value) {
        /// <param name="uie" type="UIElement"></param>
        /// <param name="value" type="rect"></param>
        uie._LayoutInformation.FinalRect = value;
    };
    
    LayoutInformation.GetLastRenderSize = function (uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="size" />
        return uie._LayoutInformation.LastRenderSize;
    };
    LayoutInformation.SetLastRenderSize = function (uie, value) {
        /// <param name="uie" type="UIElement"></param>
        /// <param name="value" type="size"></param>
        uie._LayoutInformation.LastRenderSize = value;
    };
    
    LayoutInformation.GetVisualOffset = function (uie) {
        /// <param name="uie" type="UIElement"></param>
        /// <returns type="Point" />
        return uie._LayoutInformation.VisualOffset;
    };
    LayoutInformation.SetVisualOffset = function (uie, value) {
        /// <param name="uie" type="UIElement"></param>
        /// <param name="value" type="Point"></param>
        uie._LayoutInformation.VisualOffset = value;
    };

    /*
    LayoutInformation.LayoutClipProperty = DependencyProperty.RegisterAttachedCore("LayoutClip", function () { return Fayde.Media.Geometry; }, LayoutInformation);
    LayoutInformation.LayoutExceptionElementProperty = DependencyProperty.RegisterAttachedCore("LayoutExceptionElement", function () { return Fayde.UIElement; }, LayoutInformation);
    LayoutInformation.LayoutSlotProperty = DependencyProperty.RegisterAttachedCore("LayoutSlot", function () { return rect; }, LayoutInformation, new rect());

    LayoutInformation.PreviousConstraintProperty = DependencyProperty.RegisterAttachedCore("PreviousConstraint", function () { return size; }, LayoutInformation);
    LayoutInformation.FinalRectProperty = DependencyProperty.RegisterAttachedCore("FinalRect", function () { return rect; }, LayoutInformation);
    LayoutInformation.LastRenderSizeProperty = DependencyProperty.RegisterAttachedCore("LastRenderSize", function () { return size; }, LayoutInformation);
    LayoutInformation.VisualOffsetProperty = DependencyProperty.RegisterAttachedCore("VisualOffset", function () { return Point; }, LayoutInformation);
    */

    Fayde.LayoutInformation = LayoutInformation;
})(Nullstone.Namespace("Fayde"));