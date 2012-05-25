/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region ImageSource
var ImageSource = Nullstone.Create("ImageSource", DependencyObject);

ImageSource.Instance.Init = function () {
    this.Init$DependencyObject();
};

// TODO: Create virtual properties
//      - Pixel Width  
//      - Pixel Height

ImageSource.Instance.Lock = function () { };
ImageSource.Instance.Unlock = function () { };

Nullstone.FinishCreate(ImageSource);
//#endregion