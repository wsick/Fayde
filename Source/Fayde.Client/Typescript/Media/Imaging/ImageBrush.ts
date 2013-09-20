/// <reference path="../../Runtime/Nullstone.ts" />
/// <reference path="../TileBrush.ts"/>
/// <reference path="ImageSource.ts"/>
/// CODE
/// <reference path="../../Runtime/MulticastEvent.ts"/>
/// <reference path="BitmapSource.ts"/>
/// <reference path="BitmapImage.ts"/>

module Fayde.Media.Imaging {
    export class ImageBrush extends TileBrush implements IImageChangedListener {
        private static _SourceCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return new Media.Imaging.BitmapImage(new Uri(value));
            if (value instanceof Uri)
                return new Media.Imaging.BitmapImage(value);
            return value;
        }
        static ImageSourceProperty: DependencyProperty = DependencyProperty.RegisterFull("ImageSource", () => ImageSource, ImageBrush, undefined, (d, args) => (<ImageBrush>d)._ImageSourceChanged(args), ImageBrush._SourceCoercer);
        ImageSource: ImageSource;
        ImageFailed: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
        ImageOpened: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();

        SetupBrush(ctx: CanvasRenderingContext2D, bounds: rect) {
            var source = this.ImageSource;
            if (source && source.Image)
                super.SetupBrush(ctx, bounds);
        }
        GetTileExtents(): rect {
            var source = this.ImageSource;
            var r = new rect();
            r.Width = source.PixelWidth;
            r.Height = source.PixelHeight;
            return r;
        }
        DrawTile(canvasCtx: CanvasRenderingContext2D, bounds: rect) {
            var source = this.ImageSource;
            canvasCtx.rect(0, 0, source.PixelWidth, source.PixelHeight);
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
        OnImageErrored(source: BitmapSource, e: Event) { this.ImageFailed.Raise(this, EventArgs.Empty); }
        OnImageLoaded(source: BitmapSource, e: Event) { this.ImageOpened.Raise(this, EventArgs.Empty); }
        ImageChanged(source: BitmapSource) {
            this.InvalidateBrush();
        }
    }
    Fayde.RegisterType(ImageBrush, {
    	Name: "ImageBrush",
    	Namespace: "Fayde.Media.Imaging",
    	XmlNamespace: Fayde.XMLNS
    });
}