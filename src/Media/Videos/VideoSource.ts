/// <reference path="VideoSourceBase.ts"/>

module Fayde.Media.Videos {
    export class VideoSource extends VideoSourceBase {
        static UriSourceProperty = DependencyProperty.RegisterFull("UriSource", () => Uri, VideoSource, undefined, (bi: VideoSource, args) => bi._UriSourceChanged(args), undefined, true);
        UriSource: Uri;
        VideoFailed = new nullstone.Event();
        VideoOpened = new nullstone.Event();

        constructor(uri?: Uri) {
            super();
            if (uri)
                this.UriSource = uri;
        }

        private _UriSourceChanged(args: IDependencyPropertyChangedEventArgs) {
            var uri: Uri = args.NewValue;
            if (Uri.isNullOrEmpty(uri))
                this.ResetVideo();
            else
                this.UriSourceChanged(args.OldValue, uri);
        }

        protected _OnErrored(e: Event) {
            super._OnErrored(e);
            this.VideoFailed.raise(this, null);
        }

        protected _OnLoad(e: Event) {
            super._OnLoad(e);
            this.VideoOpened.raise(this, null);
        }
    }

    Fayde.CoreLibrary.add(VideoSource);
}