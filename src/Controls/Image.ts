/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Media/Enums.ts" />

module Fayde.Controls {
    import ImageUpdater = minerva.controls.image.ImageUpdater;
    export class Image extends FrameworkElement {
        CreateLayoutUpdater() {
            return new ImageUpdater();
        }

        private static _SourceCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return new Media.Imaging.BitmapImage(new Uri(value));
            if (value instanceof Uri)
                return new Media.Imaging.BitmapImage(value);
            return value;
        }

        static SourceProperty = DependencyProperty.RegisterFull("Source", () => Media.Imaging.ImageSource, Image, undefined, undefined, Image._SourceCoercer);
        // http: //msdn.microsoft.com/en-us/library/system.windows.media.stretch(v=vs.95).aspx
        static StretchProperty = DependencyProperty.RegisterCore("Stretch", () => new Enum(Media.Stretch), Image, Media.Stretch.Uniform);
        Source: Media.Imaging.ImageSource;
        Stretch: Media.Stretch;

        ImageOpened = new nullstone.Event();
        ImageFailed = new nullstone.Event();

        private $watcher: nullstone.IDisposable = null;

        OnImageErrored(source: Media.Imaging.BitmapSource, error: Error) {
            this.ImageFailed.raise(this, null);
        }

        OnImageLoaded(source: Media.Imaging.BitmapSource) {
            this.ImageOpened.raise(this, null);
            var lu = this.XamlNode.LayoutUpdater;
            lu.invalidateMeasure();
        }

        OnImageChanged(source: Media.Imaging.BitmapSource) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.invalidateMeasure();
            lu.invalidate();
        }

        OnSourceChanged(oldSource: Media.Imaging.ImageSource, newSource: Media.Imaging.ImageSource) {
            if (this.$watcher) {
                this.$watcher.dispose();
                this.$watcher = null;
            }
            if (newSource instanceof Media.Imaging.BitmapSource) {
                this.$watcher = newSource.watch({
                    onErrored: (source, error) => this.OnImageErrored(source, error),
                    onLoaded: (source) => this.OnImageLoaded(source),
                    onChanged: (source) => this.OnImageChanged(source)
                });
            }
        }
    }
    Fayde.CoreLibrary.add(Image);

    UIReaction<Media.Imaging.ImageSource>(Image.SourceProperty, (upd: ImageUpdater, ov, nv, image?: Image) => {
        image.OnSourceChanged(ov, nv);
        if (!nv) {
            upd.updateBounds();
            upd.invalidate();
        }
        upd.invalidateMeasure();
        upd.invalidateMetrics();
    }, false);
    UIReaction<minerva.Stretch>(Image.StretchProperty, (upd: ImageUpdater, ov, nv) => {
        upd.invalidateMeasure();
        upd.invalidateMetrics();
    }, false);
}