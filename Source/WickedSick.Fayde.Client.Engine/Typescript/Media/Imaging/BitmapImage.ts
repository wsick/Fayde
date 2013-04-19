/// <reference path="../../Runtime/Nullstone.ts" />
/// <reference path="BitmapSource.ts"/>
/// <reference path="../../Primitives/Uri.ts"/>
/// CODE
/// <reference path="../../Runtime/MulticastEvent.ts"/>

module Fayde.Media.Imaging {
    export class BitmapImage extends BitmapSource {
        static UriSourceProperty: DependencyProperty = DependencyProperty.RegisterFull("UriSource", () => Uri, BitmapImage, undefined, undefined, undefined, undefined, true);
        UriSource: Uri;
        ImageFailed: MulticastEvent = new MulticastEvent();
        ImageOpened: MulticastEvent = new MulticastEvent();

        constructor(uri?: Uri) {
            super();
            if (uri)
                this.UriSource = uri;
        }

        private _UriSourceChanged(args: IDependencyPropertyChangedEventArgs) {
            var uri: Uri = args.NewValue;
            if (Uri.IsNullOrEmpty(uri))
                this.ResetImage();
            else
                this.UriSourceChanged(args.OldValue, uri);
        }
        private _OnErrored(e: Event) {
            super._OnErrored(e);
            this.ImageFailed.Raise(this, EventArgs.Empty);
        }
        private _OnLoad(e: Event) {
            super._OnLoad(e);
            this.ImageOpened.Raise(this, EventArgs.Empty);
        }
    }
    Nullstone.RegisterType(BitmapImage, "BitmapImage");
}