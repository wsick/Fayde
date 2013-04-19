var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Runtime/Nullstone.ts" />
        /// <reference path="../TileBrush.ts"/>
        /// <reference path="ImageSource.ts"/>
        /// CODE
        /// <reference path="../../Runtime/MulticastEvent.ts"/>
        /// <reference path="BitmapSource.ts"/>
        (function (Imaging) {
            var ImageBrush = (function (_super) {
                __extends(ImageBrush, _super);
                function ImageBrush() {
                    _super.apply(this, arguments);

                    this.ImageFailed = new MulticastEvent();
                    this.ImageOpened = new MulticastEvent();
                }
                ImageBrush.ImageSourceProperty = DependencyProperty.RegisterFull("ImageSource", function () {
                    return Imaging.ImageSource;
                }, ImageBrush, undefined, function (d, args) {
                    return (d)._ImageSourceChanged(args)/*, ... */ ;
                });
                ImageBrush.prototype.SetupBrush = function (ctx, bounds) {
                    var source = this.ImageSource;
                    if(source && source.Image) {
                        _super.prototype.SetupBrush.call(this, ctx, bounds);
                    }
                };
                ImageBrush.prototype.GetTileExtents = function () {
                    var source = this.ImageSource;
                    var r = new rect();
                    r.Width = source.PixelWidth;
                    r.Height = source.PixelHeight;
                    return r;
                };
                ImageBrush.prototype.DrawTile = function (canvasCtx, bounds) {
                    var source = this.ImageSource;
                    canvasCtx.rect(0, 0, bounds.Width, bounds.Height);
                    canvasCtx.fillStyle = canvasCtx.createPattern(source.Image, "no-repeat");
                    canvasCtx.fill();
                };
                ImageBrush.prototype._ImageSourceChanged = function (args) {
                    var oldSrc;
                    if((oldSrc = args.OldValue) && (oldSrc instanceof Imaging.BitmapSource)) {
                        oldSrc.Unlisten(this);
                    }
                    var newSrc;
                    if((newSrc = args.NewValue) && (newSrc instanceof Imaging.BitmapSource)) {
                        newSrc.Listen(this);
                    }
                    this.InvalidateBrush();
                };
                ImageBrush.prototype.OnImageErrored = function (source, e) {
                    this.ImageFailed.Raise(this, EventArgs.Empty);
                };
                ImageBrush.prototype.OnImageLoaded = function (source, e) {
                    this.ImageOpened.Raise(this, EventArgs.Empty);
                };
                return ImageBrush;
            })(Media.TileBrush);
            Imaging.ImageBrush = ImageBrush;            
            Nullstone.RegisterType(ImageBrush, "ImageBrush");
        })(Media.Imaging || (Media.Imaging = {}));
        var Imaging = Media.Imaging;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ImageBrush.js.map
