var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="AnimationUsingKeyFrames.ts" />
        /// CODE
        (function (Animation) {
            var ColorAnimationUsingKeyFrames = (function (_super) {
                __extends(ColorAnimationUsingKeyFrames, _super);
                function ColorAnimationUsingKeyFrames() {
                    _super.apply(this, arguments);

                }
                ColorAnimationUsingKeyFrames.Annotations = {
                    ContentProperty: "KeyFrames"
                };
                return ColorAnimationUsingKeyFrames;
            })(Animation.AnimationUsingKeyFrames);
            Animation.ColorAnimationUsingKeyFrames = ColorAnimationUsingKeyFrames;            
            Nullstone.RegisterType(ColorAnimationUsingKeyFrames, "ColorAnimationUsingKeyFrames");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ColorAnimationUsingKeyFrames.js.map
