/// <reference path="../Imaging/ImageSource" />

module Fayde.Media.Videos {
    import IVideoSource = minerva.controls.video.IVideoSource;

    export interface IVideoSourceWatcher {
        onErrored(source: VideoSourceBase, error: Error);
        onCanPlay(source: VideoSourceBase);
        onChanged(source: VideoSourceBase);
    }

    export class VideoSourceBase extends Imaging.ImageSource implements minerva.controls.video.IVideoSource {
        protected $element: HTMLVideoElement;
        private $watchers: IVideoSourceWatcher[] = [];
<<<<<<< HEAD
=======
        private $autoplay = true;
>>>>>>> refs/remotes/wsick/master

        createElement(): HTMLVideoElement {
            return document.createElement("video");
        }

        reset() {
            super.reset();
<<<<<<< HEAD
=======
            this.setAutoPlay(this.$autoplay);
>>>>>>> refs/remotes/wsick/master
            this.$element.onerror = (e: ErrorEvent) => this.onVideoErrored(e);
            this.$element.oncanplay = (e) => this.onVideoCanPlay();
            this.onVideoChanged();
        }

        watch(watcher: IVideoSourceWatcher): nullstone.IDisposable {
            var watchers = this.$watchers;
            watchers.push(watcher);
            return {
                dispose() {
                    var index = watchers.indexOf(watcher);
                    if (index > -1)
                        watchers.splice(index, 1);
                }
            }
        }

<<<<<<< HEAD
=======
        setAutoPlay(value: boolean) {
            this.$autoplay = value;
            if (!value)
                this.$element.removeAttribute("autoplay");
            else
                this.$element.setAttribute("autoplay", "autoplay");
        }

>>>>>>> refs/remotes/wsick/master
        getIsPlaying(): boolean {
            var video = this.$element;
            return !!video && !video.paused && !video.ended;
        }

        Play() {
            this.$element.play();
        }

        Pause() {
            this.$element.pause();
        }

<<<<<<< HEAD
        GetBuffered(): TimeRanges {
            return this.$element.buffered;
        }

        GetProgress(): TimeRanges {
            return this.$element.played;
        }

=======
>>>>>>> refs/remotes/wsick/master
        protected onVideoErrored(e: ErrorEvent) {
            console.info("Failed to load: " + this.$element.src.toString());
            for (var i = 0, watchers = this.$watchers; i < watchers.length; i++) {
                watchers[i].onErrored(this, e.error);
            }
        }

        protected onVideoCanPlay() {
            this.setMetrics(this.$element.videoWidth, this.$element.videoHeight);
            for (var i = 0, watchers = this.$watchers; i < watchers.length; i++) {
                watchers[i].onCanPlay(this);
            }
        }

        protected onVideoChanged() {
            for (var i = 0, watchers = this.$watchers; i < watchers.length; i++) {
                watchers[i].onChanged(this);
            }
        }
    }

    Fayde.CoreLibrary.add(VideoSourceBase);
}