/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../../Javascript/Primitives.ts" />

module Fayde {
    export class FrameworkElement extends UIElement {
        static DataContextProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        static ActualHeightProperty: DependencyProperty;

        _ComputeActualSize(): size {
            return new size();
        }
    }
}