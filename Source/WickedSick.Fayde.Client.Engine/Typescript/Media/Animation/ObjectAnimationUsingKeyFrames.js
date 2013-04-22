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
        /// <reference path="ObjectKeyFrame.ts" />
        (function (Animation) {
            var ObjectAnimationUsingKeyFrames = (function (_super) {
                __extends(ObjectAnimationUsingKeyFrames, _super);
                function ObjectAnimationUsingKeyFrames() {
                    _super.apply(this, arguments);

                }
                ObjectAnimationUsingKeyFrames.Annotations = {
                    ContentProperty: "KeyFrames"
                };
                ObjectAnimationUsingKeyFrames.prototype.Resolve = function (target, propd) {
                    var enumerator = this.KeyFrames.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        var keyFrame = enumerator.Current;
                        var value = keyFrame.Value;
                        if(value == null) {
                            keyFrame.ConvertedValue = undefined;
                        } else {
                            var converted = value;
                            //TODO: Convert - return false if error converting
                            keyFrame.ConvertedValue = converted;
                        }
                    }
                    return _super.prototype.Resolve.call(this, target, propd);
                };
                return ObjectAnimationUsingKeyFrames;
            })(Animation.AnimationUsingKeyFrames);
            Animation.ObjectAnimationUsingKeyFrames = ObjectAnimationUsingKeyFrames;            
            Nullstone.RegisterType(ObjectAnimationUsingKeyFrames, "ObjectAnimationUsingKeyFrames");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ObjectAnimationUsingKeyFrames.js.map
