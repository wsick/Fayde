/// <reference path="../TileBrush.ts"/>

module Fayde.Media.Imaging {
    export class ImageBrush extends TileBrush implements IImageChangedListener {
        private static _SourceCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return new Media.Imaging.BitmapImage(new Uri(value));
            if (value instanceof Uri)
                return new Media.Imaging.BitmapImage(value);
            return value;
        }
        static ImageSourceProperty = DependencyProperty.RegisterFull("ImageSource", () => ImageSource, ImageBrush, undefined, (d: ImageBrush, args) => d._ImageSourceChanged(args), ImageBrush._SourceCoercer);
        ImageSource: ImageSource;
        ImageFailed = new MulticastEvent<EventArgs>();
        ImageOpened = new MulticastEvent<EventArgs>();

        setupBrush(ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var source = this.ImageSource;
            if (source && source.image)
                super.setupBrush(ctx, bounds);
        }
        GetTileExtents(): minerva.Rect {
            var source = this.ImageSource;
            var r = new minerva.Rect();
            r.width = source.pixelWidth;
            r.height = source.pixelHeight;
            return r;
        }
        DrawTile(canvasCtx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var source = this.ImageSource;
            canvasCtx.rect(0, 0, source.pixelWidth, source.pixelHeight);
            canvasCtx.fillStyle = canvasCtx.createPattern(source.image, "no-repeat");
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
    Fayde.RegisterType(ImageBrush, "Fayde.Media.Imaging", Fayde.XMLNS);
}