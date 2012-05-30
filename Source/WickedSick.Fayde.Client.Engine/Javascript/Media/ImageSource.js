/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region ImageSource
var ImageSource = Nullstone.Create("ImageSource", DependencyObject);

ImageSource.Instance.Init = function () {
    this.Init$DependencyObject();
};

Nullstone.AutoProperties(ImageSource, [
    "PixelWidth",
    "PixelHeight"
]);

ImageSource.Instance.Lock = function () { };
ImageSource.Instance.Unlock = function () { };

Nullstone.FinishCreate(ImageSource);
//#endregion