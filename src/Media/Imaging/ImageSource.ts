/// <reference path="../../Core/DependencyObject.ts"/>

module Fayde.Media.Imaging {
    export class ImageSource extends DependencyObject implements minerva.controls.image.IImageSource {
        static PixelWidthProperty = DependencyProperty.RegisterReadOnly("PixelWidth", () => Number, ImageSource, 0);
        static PixelHeightProperty = DependencyProperty.RegisterReadOnly("PixelHeight", () => Number, ImageSource, 0);
        PixelWidth: number;
        PixelHeight: number;

        protected $element: HTMLMediaElement|HTMLImageElement = null;

        constructor() {
            super();
        }

        get pixelWidth(): number {
            return this.GetValue(ImageSource.PixelWidthProperty);
        }

        get pixelHeight(): number {
            return this.GetValue(ImageSource.PixelHeightProperty);
        }

        get isEmpty(): boolean {
            return !this.$element;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.drawImage(<any>this.$element, 0, 0);
        }

        createPattern(ctx: CanvasRenderingContext2D): CanvasPattern {
            ctx.rect(0, 0, this.pixelWidth, this.pixelHeight);
            return ctx.createPattern(<any>this.$element, "no-repeat");
        }

        reset() {
            this.$element = this.createElement();
            this.setMetrics(0, 0);
        }

        createElement(): HTMLMediaElement|HTMLImageElement {
            return undefined;
        }

        protected setMetrics(pixelWidth: number, pixelHeight: number) {
            this.SetCurrentValue(ImageSource.PixelWidthProperty, pixelWidth);
            this.SetCurrentValue(ImageSource.PixelHeightProperty, pixelHeight);
        }
    }
    Fayde.CoreLibrary.add(ImageSource);
}