var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Runtime/Nullstone.ts" />
        /// <reference path="BitmapSource.ts"/>
        /// <reference path="../../Primitives/Uri.ts"/>
        /// CODE
        /// <reference path="../../Runtime/MulticastEvent.ts"/>
        (function (Imaging) {
            var BitmapImage = (function (_super) {
                __extends(BitmapImage, _super);
                function BitmapImage(uri) {
                                _super.call(this);
                    this.ImageFailed = new MulticastEvent();
                    this.ImageOpened = new MulticastEvent();
                    if(uri) {
                        this.UriSource = uri;
                    }
                }
                BitmapImage.UriSourceProperty = DependencyProperty.RegisterFull("UriSource", function () {
                    return Uri;
                }, BitmapImage, undefined, function (d, args) {
                    return (d)._UriSourceChanged(args);
                }, undefined, undefined, true);
                BitmapImage.prototype._UriSourceChanged = function (args) {
                    var uri = args.NewValue;
                    if(Uri.IsNullOrEmpty(uri)) {
                        this.ResetImage();
                    } else {
                        this.UriSourceChanged(args.OldValue, uri);
                    }
                };
                BitmapImage.prototype._OnErrored = function (e) {
                    _super.prototype._OnErrored.call(this, e);
                    this.ImageFailed.Raise(this, EventArgs.Empty);
                };
                BitmapImage.prototype._OnLoad = function (e) {
                    _super.prototype._OnLoad.call(this, e);
                    this.ImageOpened.Raise(this, EventArgs.Empty);
                };
                return BitmapImage;
            })(Imaging.BitmapSource);
            Imaging.BitmapImage = BitmapImage;            
            Nullstone.RegisterType(BitmapImage, "BitmapImage");
        })(Media.Imaging || (Media.Imaging = {}));
        var Imaging = Media.Imaging;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BitmapImage.js.map
