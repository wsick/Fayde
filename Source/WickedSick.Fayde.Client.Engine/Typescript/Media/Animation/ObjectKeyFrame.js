var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="KeyFrame.ts" />
        /// CODE
        (function (Animation) {
            var ObjectKeyFrame = (function (_super) {
                __extends(ObjectKeyFrame, _super);
                function ObjectKeyFrame() {
                    _super.apply(this, arguments);

                    this.ConvertedValue = undefined;
                }
                ObjectKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () {
                    return Object;
                }, ObjectKeyFrame);
                return ObjectKeyFrame;
            })(Animation.KeyFrame);
            Animation.ObjectKeyFrame = ObjectKeyFrame;            
            Nullstone.RegisterType(ObjectKeyFrame, "ObjectKeyFrame");
            var DiscreteObjectKeyFrame = (function (_super) {
                __extends(DiscreteObjectKeyFrame, _super);
                function DiscreteObjectKeyFrame() {
                    _super.apply(this, arguments);

                }
                DiscreteObjectKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    if(keyFrameProgress >= 1.0) {
                        return this.ConvertedValue;
                    }
                    return baseValue;
                };
                return DiscreteObjectKeyFrame;
            })(ObjectKeyFrame);
            Animation.DiscreteObjectKeyFrame = DiscreteObjectKeyFrame;            
            Nullstone.RegisterType(DiscreteObjectKeyFrame, "DiscreteObjectKeyFrame");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ObjectKeyFrame.js.map
