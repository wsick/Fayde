/// <reference path="../TileBrush.ts"/>

module Fayde.Media.Imaging {
    export class ImageBrush extends TileBrush {
        private static _SourceCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return new Media.Imaging.BitmapImage(new Uri(value));
            if (value instanceof Uri)
                return new Media.Imaging.BitmapImage(value);
            return value;
        }

        static ImageSourceProperty = DependencyProperty.RegisterFull("ImageSource", () => ImageSource, ImageBrush, undefined, (d: ImageBrush, args) => d._ImageSourceChanged(args), ImageBrush._SourceCoercer);
        ImageSource: ImageSource;
        ImageFailed = new nullstone.Event();
        ImageOpened = new nullstone.Event();

        private $watcher: nullstone.IDisposable = null;

        setupBrush(ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var source = this.ImageSource;
            if (source && !source.isEmpty)
                super.setupBrush(ctx, bounds);
        }

        GetTileExtents(): minerva.Rect {
            var source = this.ImageSource;
            return new minerva.Rect(0, 0, source.pixelWidth, source.pixelHeight);
        }

        DrawTile(canvasCtx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var source = this.ImageSource;
            canvasCtx.fillStyle = source.createPattern(canvasCtx);
            canvasCtx.fill();
        }

        private _ImageSourceChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this.$watcher) {
                this.$watcher.dispose();
                this.$watcher = null;
            }

            if (args.NewValue instanceof BitmapSource) {
                this.$watcher = args.NewValue.watch({
                    onErrored: (source, error) => this.OnImageErrored(source, error),
                    onLoaded: (source) => this.OnImageLoaded(source),
                    onChanged: (source) => this.OnImageChanged(source)
                });
            }
            this.InvalidateBrush();
        }

        OnImageErrored(source: BitmapSource, error: Error) {
            this.ImageFailed.raise(this, null);
        }

        OnImageLoaded(source: BitmapSource) {
            this.ImageOpened.raise(this, null);
        }

        OnImageChanged(source: BitmapSource) {
            this.InvalidateBrush();
        }
    }
    Fayde.CoreLibrary.add(ImageBrush);
}