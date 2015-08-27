/// <reference path="../../Core/DependencyObject.ts"/>

module Fayde.Media.Imaging {
    export class ImageSource extends DependencyObject implements minerva.controls.image.IImageSource {
        get pixelWidth(): number {
            return 0;
        }

        get pixelHeight(): number {
            return 0;
        }

        get isEmpty(): boolean {
            return true;
        }

        draw(ctx: CanvasRenderingContext2D) {

        }

        createPattern(ctx: CanvasRenderingContext2D): CanvasPattern {
            return undefined;
        }
    }
    Fayde.CoreLibrary.add(ImageSource);
}