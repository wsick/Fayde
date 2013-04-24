/// <reference path="../Core/FrameworkElement.ts" />
/// CODE

module Fayde.Controls {
    export class Border extends FrameworkElement {
        CreateNode(): FENode {
            var n = super.CreateNode();
            n.LayoutUpdater.SetContainerMode(true);
            return n;
        }
    }
}