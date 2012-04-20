﻿/// <reference path="BitmapSource.js"/>
/// CODE
/// <reference path="../../Primitives/Uri.js"/>

//#region BitmapImage
var BitmapImage = Nullstone.Create("BitmapImage", BitmapSource, 1);

BitmapImage.Instance.Init = function (uri) {
    this.Init$BitmapSource();
    this.ImageFailed = new MulticastEvent();
    this.ImageOpened = new MulticastEvent();
    if (uri == null)
        return;
    this.SetUriSource(uri);
};

//#region Dependency Properties

BitmapImage.UriSourceProperty = DependencyProperty.RegisterFull("UriSource", function () { return Uri; }, BitmapImage, new Uri(), null, null, true);
BitmapImage.Instance.GetUriSource = function () {
    ///<returns type="Uri"></returns>
    return this.$GetValue(BitmapImage.UriSourceProperty);
};
BitmapImage.Instance.SetUriSource = function (value) {
    ///<param name="value" type="Uri"></param>
    this.SetValue(BitmapImage.UriSourceProperty, value);
};

//#endregion

BitmapImage.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== BitmapImage) {
        this._OnPropertyChanged$BitmapSource(args, error);
        return;
    }

    if (args.Property._ID === BitmapImage.UriSourceProperty._ID) {
        var uri = args.NewValue;
        if (Uri.IsNullOrEmpty(uri)) {
            this.ResetImage();
        } else {
            this.UriSourceChanged(args.OldValue, uri);
        }
    }
    this.PropertyChanged.Raise(this, args);
};

BitmapImage.Instance._OnErrored = function (e) {
    this._OnErrored$BitmapSource(e);
    this.ImageFailed.Raise(this, new EventArgs());
};
BitmapImage.Instance._OnLoad = function (e) {
    this._OnLoad$BitmapSource(e);
    this.ImageOpened.Raise(this, new EventArgs());
};

Nullstone.FinishCreate(BitmapImage);
//#endregion