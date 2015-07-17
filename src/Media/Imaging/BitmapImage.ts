/// <reference path="BitmapSource.ts"/>

module Fayde.Media.Imaging {
    export class BitmapImage extends BitmapSource {
        static UriSourceProperty = DependencyProperty.RegisterFull("UriSource", () => Uri, BitmapImage, undefined, (bi: BitmapImage, args) => bi._UriSourceChanged(args), undefined, true);
        UriSource: Uri;
        ImageFailed = new nullstone.Event();
        ImageOpened = new nullstone.Event();

        constructor(uri?: Uri) {
            super();
            if (uri)
                this.UriSource = uri;
        }

        private _UriSourceChanged(args: IDependencyPropertyChangedEventArgs) {
            var uri: Uri = args.NewValue;
            if (Uri.isNullOrEmpty(uri))
                this.ResetImage();
            else
                this.UriSourceChanged(args.OldValue, uri);
        }
        _OnErrored(e: Event) {
            super._OnErrored(e);
            this.ImageFailed.raise(this, null);
        }
        _OnLoad(e: Event) {
            super._OnLoad(e);
            this.ImageOpened.raise(this, null);
        }
    }
    Fayde.CoreLibrary.add(BitmapImage);

    nullstone.registerTypeConverter(ImageSource, (val: any): ImageSource => {
        if (!val)
            return null;
        if (val instanceof ImageSource)
            return val;
        var bi = new BitmapImage();
        bi.UriSource = nullstone.convertAnyToType(val, Uri);
        return bi;
    });
}