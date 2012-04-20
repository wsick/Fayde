/// <reference path="../ImageSource.js"/>
/// CODE

//#region BitmapSource
var BitmapSource = Nullstone.Create("BitmapSource", ImageSource);

BitmapSource.Instance.Init = function () {
    this.Init$ImageSource();
    this.ResetImage();
};

//#region Dependency Properties

BitmapSource.PixelWidthProperty = DependencyProperty.RegisterFull("PixelWidth", function () { return Number; }, BitmapSource, 0, null, null, null, BitmapSource.IntGreaterThanZeroValidator);
BitmapSource.Instance.GetPixelWidth = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(BitmapSource.PixelWidthProperty);
};
BitmapSource.Instance.SetPixelWidth = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(BitmapSource.PixelWidthProperty, value);
};

BitmapSource.PixelHeightProperty = DependencyProperty.RegisterFull("PixelHeight", function () { return Number; }, BitmapSource, 0, null, null, null, BitmapSource.IntGreaterThanZeroValidator);
BitmapSource.Instance.GetPixelHeight = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(BitmapSource.PixelHeightProperty);
};
BitmapSource.Instance.SetPixelHeight = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(BitmapSource.PixelHeightProperty, value);
};

BitmapSource.IntGreaterThanZeroValidator = function (instance, propd, value, error) {
    if (typeof value !== "number")
        return false;
    return value > 0;
};

//#endregion

BitmapSource.Instance.ResetImage = function () {
    this._Image = new Image();
    var bs = this;
    this._Image.onerror = function (e) { bs._OnErrored(e); };
    this._Image.onload = function (e) { bs._OnLoad(e); };
    this.SetPixelWidth(0);
    this.SetPixelHeight(0);
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
    this.SetPixelWidth(this._Image.naturalWidth);
    this.SetPixelHeight(this._Image.naturalHeight);
    if (this._LoadedCallback)
        this._LoadedCallback(e);
};

Nullstone.FinishCreate(BitmapSource);
//#endregion