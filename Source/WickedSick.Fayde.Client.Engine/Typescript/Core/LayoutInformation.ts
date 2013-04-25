/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Media/Geometry.ts" />
/// <reference path="../Primitives/rect.ts" />

module Fayde {
    export class LayoutInformation {
        static GetLayoutClip(uie: UIElement): Media.Geometry {
            return uie.XamlNode.LayoutUpdater.LayoutClip;
        }
        static SetLayoutClip(uie: UIElement, value: Media.Geometry) {
            uie.XamlNode.LayoutUpdater.LayoutClip = value;
        }

        static GetLayoutExceptionElement(): UIElement {
            var lu = LayoutUpdater.LayoutExceptionUpdater;
            if (lu)
                return lu.Node.XObject;
        }
        
        static GetLayoutSlot(uie: UIElement): rect {
            return uie.XamlNode.LayoutUpdater.LayoutSlot;
        }
        static SetLayoutSlot(uie: UIElement, value: rect) {
            uie.XamlNode.LayoutUpdater.LayoutSlot = value;
        }
    }
    Nullstone.RegisterType(LayoutInformation, "LayoutInformation");
}