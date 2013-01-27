/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="../Media/Enums.js"/>

(function (namespace) {
    var MediaElement = Nullstone.Create("MediaElement", FrameworkElement);

    MediaElement.Instance.Init = function () {
        this.Init$FrameworkElement();

        this.BufferingProgressChanged = new MulticastEvent();
        this.CurrentStateChanged = new MulticastEvent();
        this.DownloadProgressChanged = new MulticastEvent();
        this.MarkerReached = new MulticastEvent();
        this.MarkerReached = new MulticastEvent();
        this.MediaEnded = new MulticastEvent();
        this.MediaFailed = new MulticastEvent();
        this.MediaOpened = new MulticastEvent();
        this.RateChanged = new MulticastEvent();
    };

    //#region Properties

    //MediaElement.AudioStreamCountProperty = DependencyProperty.Register("AudioStreamCount", function () { return Number; }, MediaElement);
    //MediaElement.AudioStreamIndexProperty = DependencyProperty.Register("AudioStreamIndex", function () { return Number; }, MediaElement);
    MediaElement.AutoPlayProperty = DependencyProperty.RegisterCore("AutoPlay", function () { return Boolean; }, MediaElement, true);
    //MediaElement.BalanceProperty = DependencyProperty.RegisterCore("Balance", function () { return Number; }, MediaElement);
    MediaElement.BufferingProgressProperty = DependencyProperty.RegisterReadOnlyCore("BufferingProgress", function () { return Number; }, MediaElement);
    MediaElement.BufferingTimeProperty = DependencyProperty.RegisterReadOnlyCore("BufferingTime", function () { return TimeSpan; }, MediaElement);
    MediaElement.CanPauseProperty = DependencyProperty.RegisterReadOnlyCore("CanPause", function () { return Boolean; }, MediaElement);
    MediaElement.CanSeekProperty = DependencyProperty.RegisterReadOnlyCore("CanSeek", function () { return Boolean; }, MediaElement);
    MediaElement.CurrentStateProperty = DependencyProperty.RegisterReadOnlyCore("CurrentState", function () { return new Enum(namespace.MediaElementState); }, MediaElement);
    MediaElement.DownloadProgressProperty = DependencyProperty.RegisterReadOnlyCore("DownloadProgress", function () { return Number; }, MediaElement);
    MediaElement.DownloadProgressOffsetProperty = DependencyProperty.RegisterReadOnlyCore("DownloadProgressOffset", function () { return Number; }, MediaElement);
    //MediaElement.DroppedFramesPerSecondProperty = DependencyProperty.Register("DroppedFramesPerSecond", function () { return Number; }, MediaElement);
    //MediaElement.IsDecodingOnGPUProperty = DependencyProperty.Register("IsDecodingOnGPU", function () { return Boolean; }, MediaElement);
    MediaElement.IsMutedProperty = DependencyProperty.RegisterCore("IsMuted", function () { return Boolean; }, MediaElement, false);
    //MediaElement.LicenseAcquirerProperty = DependencyProperty.Register("LicenseAcquirer", function () { return Object; }, MediaElement);
    //MediaElement.MarkersProperty = DependencyProperty.Register("Markers", function () { return TimelineMarkerCollection; }, MediaElement);
    MediaElement.NaturalDurationProperty = DependencyProperty.RegisterReadOnlyCore("NaturalDuration", function () { return Duration; }, MediaElement);
    MediaElement.NaturalVideoHeightProperty = DependencyProperty.RegisterReadOnlyCore("NaturalVideoHeight", function () { return Number; }, MediaElement);
    MediaElement.NaturalVideoWidthProperty = DependencyProperty.RegisterReadOnlyCore("NaturalVideoWidth", function () { return Number; }, MediaElement);
    MediaElement.PlaybackRateProperty = DependencyProperty.RegisterCore("PlaybackRate", function () { return Number; }, MediaElement, 1.0);
    MediaElement.PositionProperty = DependencyProperty.RegisterCore("Position", function () { return TimeSpan; }, MediaElement);
    //MediaElement.RenderedFramesPerSecondProperty = DependencyProperty.Register("RenderedFramesPerSecond", function () { return Number; }, MediaElement);
    MediaElement.SourceProperty = DependencyProperty.RegisterCore("Source", function () { return Uri; }, MediaElement);
    MediaElement.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return Fayde.Media.Stretch; }, MediaElement, Fayde.Media.Stretch.Uniform);
    MediaElement.VolumeProperty = DependencyProperty.RegisterCore("Volume", function () { return Number; }, MediaElement);

    Nullstone.AutoProperties(MediaElement, [
        MediaElement.AutoPlayProperty,
        MediaElement.IsMutedProperty,
        MediaElement.PlaybackRateProperty,
        MediaElement.PositionProperty,
        MediaElement.SourceProperty,
        MediaElement.StretchProperty,
        MediaElement.VolumeProperty
    ]);

    Nullstone.AutoPropertiesReadOnly(MediaElement, [
        MediaElement.BufferingProgressProperty,
        MediaElement.BufferingTimeProperty,
        MediaElement.CanPauseProperty,
        MediaElement.CanSeekProperty,
        MediaElement.CurrentStateProperty,
        MediaElement.DownloadProgressProperty,
        MediaElement.DownloadProgressOffsetProperty,
        MediaElement.NaturalDurationProperty,
        MediaElement.NaturalVideoHeightProperty,
        MediaElement.NaturalVideoWidthProperty
    ]);

    Nullstone.Property(MediaElement, "IsClosed", {
        get: function () { return this._State === namespace.MediaElementState.Closed; }
    });

    //#endregion

    //#region Size/Bounds

    MediaElement.Instance._ComputeActualSize = function () {
        return new Size();
        //TODO: Implement video
    };

    //#endregion

    //#region Hit Testing

    MediaElement.Instance._InsideObject = function (ctx, x, y) {
        /// <param name="ctx" type="_RenderContext"></param>
        return false;
        //TODO: Implement video element
    };

    //#endregion

    //#region Render

    MediaElement.Instance._Render = function (ctx, region) {
        /// <param name="ctx" type="_RenderContext"></param>
        var element = this._Element;
        if (!element)
            return;
        //TODO: Implement video element
    };

    //#endregion

    //#region Measure

    MediaElement.Instance._MeasureOverrideWithError = function (availableSize, error) {
        /// <param name="availableSize" type="Size"></param>
        return new Size();
        //TODO: Implement video
    };

    //#endregion

    //#region Arrange

    MediaElement.Instance._ArrangeOverrideWithError = function (finalSize, error) {
        /// <param name="finalSize" type="Size"></param>
        return new Size();
        //TODO: Implement video
    };

    //#endregion

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        MediaElement.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== MediaElement) {
                this._OnPropertyChanged$FrameworkElement(args, error);
                return;
            }

            var ivprop = false;
            switch (args.Property._ID) {
                case MediaElement.SourceProperty._ID:
                case MediaElement.AutoPlayProperty._ID:
                case MediaElement.IsMutedProperty._ID:
                case MediaElement.PlaybackRateProperty._ID:
                case MediaElement.VolumeProperty._ID:
                case MediaElement.StretchProperty._ID:
                    ivprop = true;
                    break;
            }

            if (ivprop)
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            this.PropertyChanged.Raise(this, args);
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        MediaElement.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== MediaElement) {
                this._OnPropertyChanged$FrameworkElement(args, error);
                return;
            }

            if (args.Property._ID === MediaElement.StretchProperty._ID) {
                this._InvalidateMeasure();
            }

            this.PropertyChanged.Raise(this, args);
        };
    }
    //#endif

    // http://www.w3.org/2010/05/video/mediaevents.html
    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        MediaElement.Instance.CreateHtmlObjectImpl = function () {
            var rootEl = this.CreateHtmlObjectImpl$FrameworkElement();
            var contentEl = rootEl.firstChild;
            contentEl.appendChild(this.GetHtmlMediaEl());
            return rootEl;
        };
        MediaElement.Instance.GetHtmlMediaEl = function () {
            if (!this._Element)
                this._Element = this.CreateHtmlMediaEl();
            return this._Element;
        };
        MediaElement.Instance.CreateHtmlMediaEl = function () {
            var video = document.createElement("video");
            video.style.position = "absolute";
            video.style.width = "100%";
            video.style.height = "100%";
            video.autoplay = this.AutoPlay;
            var that = this;
            video.onerror = function (e) { that.HandleMediaError(e); };

            video.onvolumechange = function (e) { that.$SetValueInternal(MediaElement.VolumeProperty, video.volume); };
            video.ondurationchange = function (e) { that.$SetValueInternal(MediaElement.NaturalDurationProperty, new Duration(new TimeSpan(0, 0, video.duration))); };
            video.onratechange = function (e) {
                that.$SetValueInternal(MediaElement.PlaybackRateProperty, video.playbackRate);
                that.RateChanged.Raise(that, new namespace.RateChangedRoutedEventArgs(vide.playbackRate));
            };

            video.addEventListener("progress", function (e) {
                //TODO: Finish
            }, false);
            video.ontimeupdate = function (e) { that.$SetValueInternal(MediaElement.PositionProperty, new TimeSpan(0, 0, video.currentTime)); };

            video.onloadeddata = function (e) { that.MediaOpened.Raise(that, new Fayde.RoutedEventArgs()); };
            video.onended = function (e) { that.MediaEnded.Raise(that, new Fayde.RoutedEventArgs()); };

            return video;
        };
        MediaElement.Instance.HandleMediaError = function (e) {
            var el = this.GetHtmlMediaEl();
            if (!el.error)
                return;
            this.MediaFailed.Raise(this, new namespace.MediaFailedEventArgs(el.error.code));
        };
        MediaElement.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== MediaElement) {
                this.ApplyChange$FrameworkElement(change);
                return;
            }

            var el = this.GetHtmlMediaEl();
            if (propd._ID === MediaElement.SourceProperty._ID) {
                el.src = change.NewValue.toString();
                //TODO: Reset position to 00:00:00
            } else if (propd._ID === MediaElement.AutoPlayProperty._ID) {
                el.autoplay = change.NewValue;
            } else if (propd._ID === MediaElement.IsMutedProperty._ID) {
                el.muted = change.NewValue;
            } else if (propd._ID === MediaElement.PlaybackRateProperty._ID) {
                el.playbackRate = change.NewValue;
            } else if (propd._ID === MediaElement.StretchProperty._ID) {
                //TODO: 
            } else if (propd._ID === MediaElement.VolumeProperty._ID) {
                el.volume = change.NewValue;
            }
        };
    }
    //#endregion

    namespace.MediaElement = Nullstone.FinishCreate(MediaElement);
})(Nullstone.Namespace("Fayde.Controls"));

(function (namespace) {
    var MediaFailedEventArgs = Nullstone.Create("MediaFailedEventArgs", Fayde.RoutedEventArgs, 1);

    MediaFailedEventArgs.Instance.Init = function (code) {
        this.Init$RoutedEventArgs();
        this.Code = code;
        switch (code) {
            case 1: //MEDIA_ERR_ABORTED
                this.Description = "Aborted";
                break;
            case 2: //MEDIA_ERR_NETWORK
                this.Description = "Aborted";
                break;
            case 3: //MEDIA_ERR_DECODE
                this.Description = "Decode";
                break;
            case 4: //MEDIA_ERR_SRC_NOT_SUPPORTED
                this.Description = "Media Type Not Supported";
                break;
        }
    };

    namespace.MediaFailedEventArgs = Nullstone.FinishCreate(MediaFailedEventArgs);
})(Nullstone.Namespace("Fayde.Controls"));

(function (namespace) {
    var RateChangedRoutedEventArgs = Nullstone.Create("RateChangedRoutedEventArgs", Fayde.RoutedEventArgs, 1);

    RateChangedRoutedEventArgs.Instance.Init = function (newRate) {
        this.Init$RoutedEventArgs();
        this.NewRate = newRate;
    };

    namespace.RateChangedRoutedEventArgs = Nullstone.FinishCreate(RateChangedRoutedEventArgs);
})(Nullstone.Namespace("Fayde.Controls"));