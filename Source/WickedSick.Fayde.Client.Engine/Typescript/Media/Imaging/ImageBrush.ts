/// <reference path="../../Runtime/Nullstone.ts" />
/// <reference path="../TileBrush.ts"/>
/// <reference path="ImageSource.ts"/>
/// CODE
/// <reference path="../../Runtime/MulticastEvent.ts"/>
/// <reference path="BitmapSource.ts"/>

module Fayde.Media.Imaging {
    export class ImageBrush extends TileBrush implements IImageLoadListener {
        static ImageSourceProperty: DependencyProperty = DependencyProperty.RegisterFull("ImageSource", () => ImageSource, ImageBrush, undefined, (d, args) => (<ImageBrush>d)._ImageSourceChanged(args)/*, ... */);
        ImageSource: ImageSource;
        ImageFailed: MulticastEvent = new MulticastEvent();
        ImageOpened: MulticastEvent = new MulticastEvent();

        SetupBrush(ctx: CanvasRenderingContext2D, bounds: rect) {
            var source = this.ImageSource;
            if (source && source.Image)
                super.SetupBrush(ctx, bounds);
        }
        private GetTileExtents(): rect {
            var source = this.ImageSource;
            var r = new rect();
            r.Width = source.PixelWidth;
            r.Height = source.PixelHeight;
            return r;
        }
        private DrawTile(canvasCtx: CanvasRenderingContext2D, bounds: rect) {
            var source = this.ImageSource;
            canvasCtx.rect(0, 0, bounds.Width, bounds.Height);
            canvasCtx.fillStyle = canvasCtx.createPattern(source.Image, "no-repeat");
            canvasCtx.fill();
        }
        private _ImageSourceChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldSrc: BitmapSource;
            if ((oldSrc = args.OldValue) && (oldSrc instanceof BitmapSource))
                oldSrc.Unlisten(this);
            var newSrc: BitmapSource;
            if ((newSrc = args.NewValue) && (newSrc instanceof BitmapSource))
                newSrc.Listen(this);
            this.InvalidateBrush();
        }
        private OnImageErrored(source: BitmapSource, e: Event) { this.ImageFailed.Raise(this, EventArgs.Empty); }
        private OnImageLoaded(source: BitmapSource, e: Event) { this.ImageOpened.Raise(this, EventArgs.Empty); }
    }
    Nullstone.RegisterType(ImageBrush, "ImageBrush");
}