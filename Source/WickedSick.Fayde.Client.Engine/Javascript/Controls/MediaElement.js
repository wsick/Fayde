/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="Enums.js"/>

(function (namespace) {
    var MediaElement = Nullstone.Create("MediaElement", FrameworkElement);

    //#region Properties

    //MediaElement.AudioStreamCountProperty = DependencyProperty.Register("AudioStreamCount", function () { return Number; }, MediaElement);
    //MediaElement.AudioStreamIndexProperty = DependencyProperty.Register("AudioStreamIndex", function () { return Number; }, MediaElement);
    MediaElement.AutoPlayProperty = DependencyProperty.RegisterCore("AutoPlay", function () { return Boolean; }, MediaElement, true);
    //MediaElement.BalanceProperty = DependencyProperty.RegisterCore("Balance", function () { return Number; }, MediaElement);
    MediaElement.BufferingProgressProperty = DependencyProperty.RegisterReadOnlyCore("BufferingProgress", function () { return Number; }, MediaElement);
    MediaElement.BufferingTimeProperty = DependencyProperty.RegisterReadOnlyCore("BufferingTime", function () { return TimeSpan; }, MediaElement);
    MediaElement.CanPauseProperty = DependencyProperty.RegisterReadOnlyCore("CanPause", function () { return Boolean; }, MediaElement);
    MediaElement.CanSeekProperty = DependencyProperty.RegisterReadOnlyCore("CanSeek", function () { return Boolean; }, MediaElement);
    MediaElement.CurrentStateProperty = DependencyProperty.RegisterReadOnlyCore("CurrentState", function () { return new Enum(MediaElementState); }, MediaElement);
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
    MediaElement.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return Stretch; }, MediaElement, Stretch.Uniform);
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
        get: function () { return this._State === MediaElementState.Closed; }
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
        return new Rect();
        //TODO: Implement video
    };

    //#endregion

    //#region Arrange

    MediaElement.Instance._ArrangeOverrideWithError = function (finalSize, error) {
        /// <param name="finalSize" type="Size"></param>
        return new Rect();
        //TODO: Implement video
    };

    //#endregion

    MediaElement.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== MediaElement) {
            this._OnPropertyChanged$FrameworkElement(args, error);
            return;
        }

        if (args.Property._ID === MediaElement.SourceProperty._ID) {
            if (this._Element) {
                this._Element.src = args.NewValue.toString();
                //TODO: Reset position to 00:00:00
            }
        } else if (args.Property._ID === MediaElement.AutoPlayProperty._ID) {
            if (this._Element)
                this._Element.autoplay = args.NewValue;
        } else if (args.Property._ID === MediaElement.IsMutedProperty._ID) {
            if (this._Element)
                this._Element.muted = args.NewValue;
        } else if (args.Property._ID === MediaElement.PlaybackRateProperty._ID) {
            if (this._Element)
                this._Element.playbackRate = args.NewValue;
        } else if (args.Property._ID === MediaElement.StretchProperty._ID) {
            this._InvalidateMeasure();
        } else if (args.Property._ID === MediaElement.VolumeProperty._ID) {
            if (this._Element)
                this._Element.volume = args.NewValue;
        }

        this.PropertyChanged.Raise(this, args);
    };

    namespace.MediaElement = Nullstone.FinishCreate(MediaElement);
})(window);