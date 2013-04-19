var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Runtime/Nullstone.ts" />
        /// <reference path="../../Core/DependencyObject.ts"/>
        /// CODE
        (function (Imaging) {
            var ImageSource = (function (_super) {
                __extends(ImageSource, _super);
                function ImageSource() {
                    _super.apply(this, arguments);

                    this.PixelWidth = 0;
                    this.PixelHeight = 0;
                }
                ImageSource.prototype.Lock = function () {
                };
                ImageSource.prototype.Unlock = function () {
                };
                Object.defineProperty(ImageSource.prototype, "Image", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ImageSource;
            })(Fayde.DependencyObject);
            Imaging.ImageSource = ImageSource;            
            Nullstone.RegisterType(ImageSource, "ImageSource");
        })(Media.Imaging || (Media.Imaging = {}));
        var Imaging = Media.Imaging;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ImageSource.js.map
