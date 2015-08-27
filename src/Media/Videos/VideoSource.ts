/// <reference path="VideoSourceBase.ts"/>

module Fayde.Media.Videos {
    export class VideoSource extends VideoSourceBase {
        static UriSourceProperty = DependencyProperty.RegisterFull("UriSource", () => Uri, VideoSource, undefined, (bi: VideoSource, args) => bi._UriSourceChanged(args), undefined, true);
        UriSource: Uri;
        VideoFailed = new nullstone.Event();
        VideoOpened = new nullstone.Event(); //TODO: Connect

        constructor(uri?: Uri) {
            super();
            if (uri)
                this.UriSource = uri;
        }

        private _UriSourceChanged(args: IDependencyPropertyChangedEventArgs) {
            var uri: Uri = args.NewValue;
            if (Uri.isNullOrEmpty(uri))
                this.reset();
            else
                this.OnUriSourceChanged(args.OldValue, uri);
        }

        protected OnUriSourceChanged(oldValue: Uri, newValue: Uri) {
            if (!this.$element || !newValue)
                this.reset();
            this.$element.src = TypeManager.resolveResource(newValue);
            this.$element.load();
            this.onVideoChanged();
        }

        protected onVideoErrored(e: ErrorEvent) {
            super.onVideoErrored(e);
            this.VideoFailed.raise(this, null);
        }
    }
    Fayde.CoreLibrary.add(VideoSource);
}