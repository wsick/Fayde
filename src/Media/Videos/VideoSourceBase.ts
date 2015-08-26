/// <reference path="../../Core/DependencyObject.ts"/>
/// <reference path="../../Controls/Canvas.ts"/>

module Fayde.Media.Videos {

    export interface IVideoChangedListener {
        OnVideoErrored(source: VideoSourceBase, e: Event);
        OnVideoLoaded(source: VideoSourceBase, e: Event);
        VideoChanged(source: VideoSourceBase);
    }

    function intGreaterThanZeroValidator(instance: DependencyObject, propd: DependencyProperty, value: any) {
        if (typeof value !== "number")
            return false;
        return value > 0;
    }

    export class VideoSourceBase extends DependencyObject implements minerva.controls.video.IVideoSource {
        static PixelWidthProperty = DependencyProperty.RegisterFull("PixelWidth", () => Number, VideoSourceBase, 0, undefined, undefined, undefined, intGreaterThanZeroValidator);
        static PixelHeightProperty = DependencyProperty.RegisterFull("PixelHeight", () => Number, VideoSourceBase, 0, undefined, undefined, undefined, intGreaterThanZeroValidator);
        PixelWidth: number;
        PixelHeight: number;

        private _Listener: IVideoChangedListener = null;
        private _Video: HTMLVideoElement;
        private _VideoUpdater: minerva.controls.video.VideoUpdater;

        get pixelWidth(): number {
            return this.GetValue(VideoSourceBase.PixelWidthProperty);
        }

        get pixelHeight(): number {
            return this.GetValue(VideoSourceBase.PixelHeightProperty);
        }

        get video(): HTMLVideoElement {
            return this._Video;
        }

        lock() {
        }

        unlock() {
        }

        Play() {
            this._Video.play();
            this.draw(this._Video, this._VideoUpdater);
        }

        Pause() {
            this._Video.pause();
        }

        SetUpdater(updater: minerva.controls.video.VideoUpdater) {
            this._VideoUpdater = updater;
        }

        ResetVideo() {
            this._Video = <HTMLVideoElement>document.createElement("VIDEO");
            this._Video.onerror = (e) => this._OnErrored(e);
            this._Video.onload = (e) => this._OnLoad(e);
            this.PixelWidth = 0;
            this.PixelHeight = 0;
            var listener = this._Listener;
            if (listener) listener.VideoChanged(this);
        }

        UriSourceChanged(oldValue: Uri, newValue: Uri) {
            if (!this._Video || !newValue)
                this.ResetVideo();
            var listener = this._Listener;
            this._Video.src = TypeManager.resolveResource(newValue);
            this._Video.load();
            if (listener) listener.VideoChanged(this);
        }

        private draw(v, u) {
            if (v.paused || v.ended) return false;
            u.preRender();
            setTimeout(this.draw, 20, v, u);
            return true;
        }

        Listen(listener: IVideoChangedListener) {
            this._Listener = listener;
        }

        Unlisten(listener: IVideoChangedListener) {
            if (this._Listener === listener) this._Listener = null;
        }

        _OnErrored(e: Event) {
            console.info("Failed to load: " + this._Video.src.toString());
            var listener = this._Listener;
            if (listener)
                listener.OnVideoErrored(this, e);
        }

        _OnLoad(e: Event) {
            this.PixelWidth = this._Video.videoWidth;
            this.PixelHeight = this._Video.videoHeight;
            var listener = this._Listener;
            if (listener) {
                listener.OnVideoLoaded(this, e);
                listener.VideoChanged(this);
            }
        }
    }

    Fayde.CoreLibrary.add(VideoSourceBase);
}