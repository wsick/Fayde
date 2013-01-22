/// <reference path="ImageSource.js"/>
/// CODE

(function (namespace) {
    var BitmapSource = Nullstone.Create("BitmapSource", namespace.ImageSource);

    BitmapSource.Instance.Init = function () {
        this.Init$ImageSource();
        this.ResetImage();
    };

    //#region Properties

    BitmapSource.IntGreaterThanZeroValidator = function (instance, propd, value, error) {
        if (typeof value !== "number")
            return false;
        return value > 0;
    };

    BitmapSource.PixelWidthProperty = DependencyProperty.RegisterFull("PixelWidth", function () { return Number; }, BitmapSource, 0, undefined, undefined, undefined, undefined, BitmapSource.IntGreaterThanZeroValidator);
    BitmapSource.PixelHeightProperty = DependencyProperty.RegisterFull("PixelHeight", function () { return Number; }, BitmapSource, 0, undefined, undefined, undefined, undefined, BitmapSource.IntGreaterThanZeroValidator);

    Nullstone.AutoProperty(BitmapSource, BitmapSource.PixelWidthProperty, undefined, true);
    Nullstone.AutoProperty(BitmapSource, BitmapSource.PixelHeightProperty, undefined, true);

    //#endregion

    BitmapSource.Instance.ResetImage = function () {
        this._Image = new Image();
        var bs = this;
        this._Image.onerror = function (e) { bs._OnErrored(e); };
        this._Image.onload = function (e) { bs._OnLoad(e); };
        this.PixelWidth = 0;
        this.PixelHeight = 0;
    };
    BitmapSource.Instance.UriSourceChanged = function (oldValue, newValue) {
        this._Image.src = newValue.toString();
    };

    BitmapSource.Instance._OnErrored = function (e) {
        Info("Failed to load: " + this._Image.src.toString());
        if (this._ErroredCallback)
            this._ErroredCallback(e);
    };
    BitmapSource.Instance._OnLoad = function (e) {
        this.PixelWidth = this._Image.naturalWidth;
        this.PixelHeight = this._Image.naturalHeight;
        if (this._LoadedCallback)
            this._LoadedCallback(e);
    };

    namespace.BitmapSource = Nullstone.FinishCreate(BitmapSource);
})(Nullstone.Namespace("Fayde.Media.Imaging"));