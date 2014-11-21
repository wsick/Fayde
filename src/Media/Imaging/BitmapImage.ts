/// <reference path="BitmapSource.ts"/>

module Fayde.Media.Imaging {
    export class BitmapImage extends BitmapSource {
        static UriSourceProperty: DependencyProperty = DependencyProperty.RegisterFull("UriSource", () => Uri, BitmapImage, undefined, (d, args) => (<BitmapImage>d)._UriSourceChanged(args), undefined, true);
        UriSource: Uri;
        ImageFailed: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
        ImageOpened: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();

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
    Fayde.RegisterType(BitmapImage, "Fayde.Media.Imaging", Fayde.XMLNS);

    Fayde.RegisterTypeConverter(ImageSource, (val: any): ImageSource => {
        var bi = new BitmapImage();
        bi.UriSource = Fayde.ConvertAnyToType(val, Uri);
        return bi;
    });
}