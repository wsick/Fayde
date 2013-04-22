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
            var DoubleAnimationUsingKeyFrames = (function (_super) {
                __extends(DoubleAnimationUsingKeyFrames, _super);
                function DoubleAnimationUsingKeyFrames() {
                    _super.apply(this, arguments);

                }
                DoubleAnimationUsingKeyFrames.Annotations = {
                    ContentProperty: "KeyFrames"
                };
                return DoubleAnimationUsingKeyFrames;
            })(Animation.AnimationUsingKeyFrames);
            Animation.DoubleAnimationUsingKeyFrames = DoubleAnimationUsingKeyFrames;            
            Nullstone.RegisterType(DoubleAnimationUsingKeyFrames, "DoubleAnimationUsingKeyFrames");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DoubleAnimationUsingKeyFrames.js.map
