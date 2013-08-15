/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Media/Geometry.ts" />
/// <reference path="../Primitives/rect.ts" />

module Fayde {
    export class LayoutInformation {
        static GetLayoutClip(uie: UIElement): Media.Geometry {
            var r = uie.XamlNode.LayoutUpdater.LayoutClip;
            var geom = new Media.RectangleGeometry();
            geom.Rect = rect.copyTo(r);
            return geom;
        }
        static GetLayoutExceptionElement(): UIElement {
            var lu = LayoutUpdater.LayoutExceptionUpdater;
            if (lu)
                return lu.Node.XObject;
        }
        static GetLayoutSlot(uie: UIElement): rect {
            return uie.XamlNode.LayoutUpdater.LayoutSlot;
        }
    }
    Nullstone.RegisterType(LayoutInformation, "LayoutInformation");
}