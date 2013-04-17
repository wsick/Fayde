/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Media/Geometry.ts" />
/// <reference path="../Primitives/rect.ts" />
var Fayde;
(function (Fayde) {
    var LayoutInformation = (function () {
        function LayoutInformation() { }
        LayoutInformation.GetLayoutClip = function GetLayoutClip(uie) {
            return uie.XamlNode.LayoutUpdater.LayoutClip;
        };
        LayoutInformation.SetLayoutClip = function SetLayoutClip(uie, value) {
            uie.XamlNode.LayoutUpdater.LayoutClip = value;
        };
        LayoutInformation.GetLayoutExceptionElement = function GetLayoutExceptionElement(uie) {
            return uie.XamlNode.LayoutUpdater.LayoutExceptionElement;
        };
        LayoutInformation.SetLayoutExceptionElement = function SetLayoutExceptionElement(uie, value) {
            uie.XamlNode.LayoutUpdater.LayoutExceptionElement = value;
        };
        LayoutInformation.GetLayoutSlot = function GetLayoutSlot(uie) {
            return uie.XamlNode.LayoutUpdater.LayoutSlot;
        };
        LayoutInformation.SetLayoutSlot = function SetLayoutSlot(uie, value) {
            uie.XamlNode.LayoutUpdater.LayoutSlot = value;
        };
        return LayoutInformation;
    })();
    Fayde.LayoutInformation = LayoutInformation;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LayoutInformation.js.map
