/// <reference path="../Runtime/Nullstone.ts" />
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
        LayoutInformation.GetLayoutExceptionElement = function GetLayoutExceptionElement() {
            var lu = Fayde.LayoutUpdater.LayoutExceptionUpdater;
            if(lu) {
                return lu.Node.XObject;
            }
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
    Nullstone.RegisterType(LayoutInformation, "LayoutInformation");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LayoutInformation.js.map
