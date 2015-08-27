/// <reference path="ImageSource.ts"/>

module Fayde.Media.Imaging {
    export interface IBitmapSourceWatcher {
        onErrored(source: BitmapSource, error: Error);
        onLoaded(source: BitmapSource);
        onChanged(source: BitmapSource);
    }

    export class BitmapSource extends ImageSource {
        protected $element: HTMLImageElement;
        private $watchers: IBitmapSourceWatcher[] = [];

        createElement(): HTMLMediaElement|HTMLImageElement {
            return new Image();
        }

        reset() {
            super.reset();
            this.$element.onerror = (e: ErrorEvent) => this.onImageErrored(e);
            this.$element.onload = (e) => {
                this.onImageLoaded();
                this.onImageChanged();
            };
            this.onImageChanged();
        }

        watch(watcher: IBitmapSourceWatcher): nullstone.IDisposable {
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

        protected onImageLoaded() {
            this.setMetrics(this.$element.naturalWidth, this.$element.naturalHeight);
            for (var i = 0, watchers = this.$watchers; i < watchers.length; i++) {
                watchers[i].onLoaded(this);
            }
        }

        protected onImageErrored(e: ErrorEvent) {
            console.warn("Failed to load: " + this.$element.src.toString());
            for (var i = 0, watchers = this.$watchers; i < watchers.length; i++) {
                watchers[i].onErrored(this, e.error);
            }
        }

        protected onImageChanged() {
            for (var i = 0, watchers = this.$watchers; i < watchers.length; i++) {
                watchers[i].onChanged(this);
            }
        }
    }
    Fayde.CoreLibrary.add(BitmapSource);
}