/// <reference path="../../Runtime/Nullstone.ts" />
/// <reference path="../../Core/DependencyObject.ts"/>
/// CODE

module Fayde.Media.Imaging {
    export class ImageSource extends DependencyObject {
        PixelWidth: number = 0;
        PixelHeight: number = 0;
        Lock() { }
        Unlock() { }
        get Image(): HTMLImageElement { return undefined; }
    }
    Nullstone.RegisterType(ImageSource, "ImageSource");
}