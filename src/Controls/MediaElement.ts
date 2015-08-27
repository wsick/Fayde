/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Media/Enums.ts"/>

module Fayde.Controls {
    import VideoUpdater = minerva.controls.video.VideoUpdater;

    export class MediaElement extends FrameworkElement implements Media.Videos.IVideoChangedListener {
        CreateLayoutUpdater() {
            return new VideoUpdater();
        }

        private static _SourceCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return new Media.Videos.VideoSource(new Uri(value));
            if (value instanceof Uri)
                return new Media.Videos.VideoSource(value);
            return value;
        }

        static SourceProperty = DependencyProperty.RegisterFull("Source", () => Media.Videos.VideoSource, MediaElement, undefined, undefined, MediaElement._SourceCoercer);
        static StretchProperty = DependencyProperty.RegisterCore("Stretch", () => new Enum(Media.Stretch), MediaElement, Media.Stretch.Uniform);
        Source: Media.Videos.VideoSource;
        Stretch: Media.Stretch;

        VideoOpened = new nullstone.Event();
        VideoFailed = new nullstone.Event();

        OnVideoErrored(source: Media.Videos.VideoSourceBase, e: Event) {
            this.VideoFailed.raise(this, null);
        }

        OnVideoLoaded(source: Media.Videos.VideoSourceBase, e: Event) {
            this.VideoOpened.raise(this, null);
            var lu = this.XamlNode.LayoutUpdater;
            lu.invalidateMeasure();
        }

        VideoChanged(source: Media.Videos.VideoSourceBase) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.invalidateMeasure();
            lu.invalidate();
        }

        Play() {
            this.Source.Play();
        }

        Pause() {
            this.Source.Pause();
        }
    }

    Fayde.CoreLibrary.add(MediaElement);

    UIReaction<Media.Videos.VideoSource>(MediaElement.SourceProperty, (upd: VideoUpdater, ov, nv, video?: MediaElement) => {
        if (ov instanceof Media.Videos.VideoSource)
            (<Media.Videos.VideoSource>ov).Unlisten(video);
        if (nv instanceof Media.Videos.VideoSource) {
            (<Media.Videos.VideoSource>nv).Listen(video);
        } else {
            upd.updateBounds();
            upd.invalidate();
        }
        upd.invalidateMeasure();
        upd.invalidateMetrics();
    }, false);
    UIReaction<minerva.Stretch>(MediaElement.StretchProperty, (upd: VideoUpdater, ov, nv) => {
        upd.invalidateMeasure();
        upd.invalidateMetrics();
    }, false);
}