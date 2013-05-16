var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Runtime/Nullstone.ts" />
        /// <reference path="ImageSource.ts"/>
        /// CODE
        /// <reference path="../../Primitives/Uri.ts"/>
        (function (Imaging) {
            function intGreaterThanZeroValidator(instance, propd, value) {
                if(typeof value !== "number") {
                    return false;
                }
                return value > 0;
            }
            var BitmapSource = (function (_super) {
                __extends(BitmapSource, _super);
                function BitmapSource() {
                    _super.apply(this, arguments);

                    this._Listener = null;
                }
                BitmapSource.PixelWidthProperty = DependencyProperty.RegisterFull("PixelWidth", function () {
                    return Number;
                }, BitmapSource, 0, undefined, undefined, undefined, intGreaterThanZeroValidator);
                BitmapSource.PixelHeightProperty = DependencyProperty.RegisterFull("PixelHeight", function () {
                    return Number;
                }, BitmapSource, 0, undefined, undefined, undefined, intGreaterThanZeroValidator);
                Object.defineProperty(BitmapSource.prototype, "Image", {
                    get: function () {
                        return this._Image;
                    },
                    enumerable: true,
                    configurable: true
                });
                BitmapSource.prototype.ResetImage = function () {
                    var _this = this;
                    this._Image = new Image();
                    this._Image.onerror = function (e) {
                        return _this._OnErrored(e);
                    };
                    this._Image.onload = function (e) {
                        return _this._OnLoad(e);
                    };
                    this.PixelWidth = 0;
                    this.PixelHeight = 0;
                    var listener = this._Listener;
                    if(listener) {
                        listener.ImageChanged(this);
                    }
                };
                BitmapSource.prototype.UriSourceChanged = function (oldValue, newValue) {
                    if(!this._Image) {
                        this.ResetImage();
                    }
                    this._Image.src = newValue.toString();
                    var listener = this._Listener;
                    if(listener) {
                        listener.ImageChanged(this);
                    }
                };
                BitmapSource.prototype.Listen = function (listener) {
                    this._Listener = listener;
                };
                BitmapSource.prototype.Unlisten = function (listener) {
                    if(this._Listener === listener) {
                        this._Listener = null;
                    }
                };
                BitmapSource.prototype._OnErrored = function (e) {
                    Info("Failed to load: " + this._Image.src.toString());
                    var listener = this._Listener;
                    if(listener) {
                        listener.OnImageErrored(this, e);
                    }
                };
                BitmapSource.prototype._OnLoad = function (e) {
                    this.PixelWidth = this._Image.naturalWidth;
                    this.PixelHeight = this._Image.naturalHeight;
                    var listener = this._Listener;
                    if(listener) {
                        listener.OnImageLoaded(this, e);
                        listener.ImageChanged(this);
                    }
                };
                return BitmapSource;
            })(Imaging.ImageSource);
            Imaging.BitmapSource = BitmapSource;            
            Nullstone.RegisterType(BitmapSource, "BitmapSource");
        })(Media.Imaging || (Media.Imaging = {}));
        var Imaging = Media.Imaging;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BitmapSource.js.map
