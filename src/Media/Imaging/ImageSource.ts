/// <reference path="../../Core/DependencyObject.ts"/>

module Fayde.Media.Imaging {
    export class ImageSource extends DependencyObject implements minerva.controls.image.IImageSource {
        pixelWidth: number = 0;
        pixelHeight: number = 0;
        lock() { }
        unlock() { }
        get image(): HTMLImageElement { return undefined; }
    }
    Fayde.RegisterType(ImageSource, "Fayde.Media.Imaging", Fayde.XMLNS);
}