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
            var r = uie.XamlNode.LayoutUpdater.LayoutClip;
            var geom = new Fayde.Media.RectangleGeometry();
            geom.Rect = rect.copyTo(r);
            return geom;
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
        return LayoutInformation;
    })();
    Fayde.LayoutInformation = LayoutInformation;    
    Nullstone.RegisterType(LayoutInformation, "LayoutInformation");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LayoutInformation.js.map
