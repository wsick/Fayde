/// <reference path="../Core/DependencyObject.js"/>
/// CODE

(function (namespace) {
    var ImageSource = Nullstone.Create("ImageSource", DependencyObject);

    Nullstone.AutoProperties(ImageSource, [
        "PixelWidth",
        "PixelHeight"
    ]);

    ImageSource.Instance.Lock = function () { };
    ImageSource.Instance.Unlock = function () { };

    namespace.ImageSource = Nullstone.FinishCreate(ImageSource);
})(window);