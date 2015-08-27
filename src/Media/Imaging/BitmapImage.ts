/// <reference path="BitmapSource.ts"/>

module Fayde.Media.Imaging {
    export class BitmapImage extends BitmapSource {
        static UriSourceProperty = DependencyProperty.RegisterFull("UriSource", () => Uri, BitmapImage, undefined, (bi: BitmapImage, args) => bi.OnUriSourceChanged(args.OldValue, args.NewValue), undefined, true);
        UriSource: Uri;
        ImageFailed = new nullstone.Event();
        ImageOpened = new nullstone.Event();

        private _BackingBuffer: ArrayBuffer = null;

        constructor(uri?: Uri) {
            super();
            if (uri)
                this.UriSource = uri;
        }

        protected OnUriSourceChanged(oldValue: Uri, newValue: Uri) {
            if (Uri.isNullOrEmpty(newValue)) {
                this.reset();
            } else {
                if (!this.$element || !newValue)
                    this.reset();
                this.$element.src = TypeManager.resolveResource(newValue);
                this.onImageChanged();
            }
        }

        protected onImageErrored(e: ErrorEvent) {
            super.onImageErrored(e);
            this.ImageFailed.raise(this, null);
        }

        protected onImageLoaded() {
            super.onImageLoaded();
            this.ImageOpened.raise(this, null);
        }

        SetSource(buffer: ArrayBuffer) {
            this._BackingBuffer = buffer;
            this.UriSource = encodeImage(buffer);
        }
    }
    Fayde.CoreLibrary.add(BitmapImage);

    nullstone.registerTypeConverter(ImageSource, (val: any): ImageSource => {
        if (!val)
            return null;
        if (val instanceof ImageSource)
            return val;
        if (val instanceof ArrayBuffer) {
            var bi = new BitmapImage();
            bi.SetSource(val);
            return bi;
        }
        var bi = new BitmapImage();
        bi.UriSource = nullstone.convertAnyToType(val, Uri);
        return bi;
    });
}