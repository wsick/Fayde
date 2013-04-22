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
            var PointAnimationUsingKeyFrames = (function (_super) {
                __extends(PointAnimationUsingKeyFrames, _super);
                function PointAnimationUsingKeyFrames() {
                    _super.apply(this, arguments);

                }
                PointAnimationUsingKeyFrames.Annotations = {
                    ContentProperty: "KeyFrames"
                };
                return PointAnimationUsingKeyFrames;
            })(Animation.AnimationUsingKeyFrames);
            Animation.PointAnimationUsingKeyFrames = PointAnimationUsingKeyFrames;            
            Nullstone.RegisterType(PointAnimationUsingKeyFrames, "PointAnimationUsingKeyFrames");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PointAnimationUsingKeyFrames.js.map
