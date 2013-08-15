/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="../Core/DependencyObject.ts" />
/// CODE
/// <reference path="../Core/UIElement.ts" />

module Fayde.Controls {
    export class ToolTipService {
        static ToolTipProperty: DependencyProperty = DependencyProperty.RegisterAttached("ToolTip", () => DependencyObject, ToolTipService);
        static PlacementTargetProperty: DependencyProperty = DependencyProperty.RegisterAttached("PlacementTarget", () => UIElement, ToolTipService);
    }
    Nullstone.RegisterType(ToolTipService, "ToolTipService");
}