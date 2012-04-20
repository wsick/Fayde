/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TileBrush.js"/>
/// CODE
/// <reference path="Imaging/BitmapSource.js"/>
/// <reference path="Imaging/BitmapImage.js"/>

//#region ImageBrush
var ImageBrush = Nullstone.Create("ImageBrush", TileBrush);

ImageBrush.Instance.Init = function () {
    this.Init$TileBrush();
    this.ImageFailed = new MulticastEvent();
    this.ImageOpened = new MulticastEvent();
};

//#region Dependency Properties

ImageBrush.ImageSourceProperty = DependencyProperty.RegisterFull("ImageSource", function () { return ImageBrush; }, ImageBrush, null, { GetValue: function (propd, obj) { return new BitmapImage(); } });
ImageBrush.Instance.GetImageSource = function () {
    ///<returns type="ImageBrush"></returns>
    return this.$GetValue(ImageBrush.ImageSourceProperty);
};
ImageBrush.Instance.SetImageSource = function (value) {
    ///<param name="value" type="ImageBrush"></param>
    this.SetValue(ImageBrush.ImageSourceProperty, value);
};

//#endregion

ImageBrush.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ImageBrush) {
        this._OnPropertyChanged$TileBrush(args, error);
        return;
    }

    if (args.Property._ID === ImageBrush.ImageSourceProperty._ID) {
        var oldBmpSrc = Nullstone.As(args.OldValue, BitmapSource);
        if (oldBmpSrc != null) {
            oldBmpSrc._ErroredCallback = null;
            oldBmpSrc._LoadedCallback = null;
        }
        var newBmpSrc = Nullstone.As(args.NewValue, BitmapSource);
        if (newBmpSrc != null) {
            var ib = this;
            newBmpSrc._ErroredCallback = function () { ib.ImageFailed.Raise(this, new EventArgs()); };
            newBmpSrc._LoadedCallback = function () { ib.ImageOpened.Raise(this, new EventArgs()); };
        }
    }

    this.PropertyChanged.Raise(this, args);
};

ImageBrush.Instance.SetupBrush = function (ctx, bounds) {
    var source = this.GetSource();
    if (source == null)
        return null;

    var pattern = ctx.createPattern(source._Image, "no-repeat");
    NotImplemented("ImageBrush.SetupBrush");
};

Nullstone.FinishCreate(ImageBrush);
//#endregion