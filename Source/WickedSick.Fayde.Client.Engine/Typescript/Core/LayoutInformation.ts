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

        static GetLayoutExceptionElement(uie: UIElement): UIElement {
            return uie.XamlNode.LayoutUpdater.LayoutExceptionElement;
        }
        static SetLayoutExceptionElement(uie: UIElement, value: UIElement) {
            uie.XamlNode.LayoutUpdater.LayoutExceptionElement = value;
        }
        
        static GetLayoutSlot(uie: UIElement): rect {
            return uie.XamlNode.LayoutUpdater.LayoutSlot;
        }
        static SetLayoutSlot(uie: UIElement, value: rect) {
            uie.XamlNode.LayoutUpdater.LayoutSlot = value;
        }
    }
}