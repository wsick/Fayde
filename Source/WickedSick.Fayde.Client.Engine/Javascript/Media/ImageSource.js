/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region ImageSource
var ImageSource = Nullstone.Create("ImageSource", DependencyObject);

ImageSource.Instance.Init = function () {
    this.Init$DependencyObject();
};

ImageSource.Instance.GetPixelWidth = function () { return 0; };
ImageSource.Instance.SetPixelWidth = function (width) { };

ImageSource.Instance.GetPixelHeight = function () { return 0; };
ImageSource.Instance.SetPixelHeight = function (height) { };

ImageSource.Instance.Lock = function () { };
ImageSource.Instance.Unlock = function () { };

Nullstone.FinishCreate(ImageSource);
//#endregion