/// <reference path="ContentControl.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class ToolTip extends ContentControl {
        static HorizontalOffsetProperty: DependencyProperty = DependencyProperty.Register("HorizontalOffset", () => Number, ToolTip);
        static VerticalOffsetProperty: DependencyProperty = DependencyProperty.Register("VerticalOffset", () => Number, ToolTip);
        static IsOpenProperty: DependencyProperty = DependencyProperty.Register("IsOpen", () => Boolean, ToolTip);
        static PlacementProperty: DependencyProperty = DependencyProperty.Register("Placement", () => new Enum(PlacementMode), ToolTip);
        static PlacementTargetProperty: DependencyProperty = DependencyProperty.Register("PlacementTarget", () => UIElement, ToolTip);
        HorizontalOffset: Number;
        VerticalOffset: Number;
        IsOpen: boolean;
        Placement: PlacementMode;
        PlacementTarget: UIElement;
    }
    Fayde.RegisterType(ToolTip, {
    	Name: "ToolTip",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}