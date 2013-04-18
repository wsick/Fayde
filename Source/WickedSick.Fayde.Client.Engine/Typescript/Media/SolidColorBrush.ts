/// <reference path="Brush.ts" />
/// CODE

module Fayde.Media {
    export class SolidColorBrush extends Brush {
        Color: Color;
    }
    Nullstone.RegisterType(SolidColorBrush, "SolidColorBrush");
}