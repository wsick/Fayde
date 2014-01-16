/// <reference path="../Core/DependencyObject.ts" />

module Fayde.Controls {
    export class ToolTipService {
        static ToolTipProperty: DependencyProperty = DependencyProperty.RegisterAttached("ToolTip", () => DependencyObject, ToolTipService);
        static PlacementTargetProperty: DependencyProperty = DependencyProperty.RegisterAttached("PlacementTarget", () => UIElement, ToolTipService);
    }
    Fayde.RegisterType(ToolTipService, "Fayde.Controls", Fayde.XMLNS);
}