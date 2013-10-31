/// <reference path="../../Core/DependencyObject.ts"/>

module Fayde.Media.Imaging {
    export class ImageSource extends DependencyObject {
        PixelWidth: number = 0;
        PixelHeight: number = 0;
        Lock() { }
        Unlock() { }
        get Image(): HTMLImageElement { return undefined; }
    }
    Fayde.RegisterType(ImageSource, {
    	Name: "ImageSource",
    	Namespace: "Fayde.Media.Imaging",
    	XmlNamespace: Fayde.XMLNS
    });
}