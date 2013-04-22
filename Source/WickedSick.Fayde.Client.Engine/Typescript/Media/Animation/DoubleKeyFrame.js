var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="KeyFrame.ts" />
        /// <reference path="EasingFunctionBase.ts" />
        /// <reference path="KeySpline.ts" />
        /// CODE
        (function (Animation) {
            var DoubleKeyFrame = (function (_super) {
                __extends(DoubleKeyFrame, _super);
                function DoubleKeyFrame() {
                    _super.apply(this, arguments);

                }
                DoubleKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () {
                    return Number;
                }, DoubleKeyFrame);
                return DoubleKeyFrame;
            })(Animation.KeyFrame);
            Animation.DoubleKeyFrame = DoubleKeyFrame;            
            Nullstone.RegisterType(DoubleKeyFrame, "DoubleKeyFrame");
            var DiscreteDoubleKeyFrame = (function (_super) {
                __extends(DiscreteDoubleKeyFrame, _super);
                function DiscreteDoubleKeyFrame() {
                    _super.apply(this, arguments);

                }
                DiscreteDoubleKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    if(keyFrameProgress >= 1.0) {
                        return this.Value;
                    }
                    return baseValue;
                };
                return DiscreteDoubleKeyFrame;
            })(DoubleKeyFrame);
            Animation.DiscreteDoubleKeyFrame = DiscreteDoubleKeyFrame;            
            Nullstone.RegisterType(DiscreteDoubleKeyFrame, "DiscreteDoubleKeyFrame");
            var EasingDoubleKeyFrame = (function (_super) {
                __extends(EasingDoubleKeyFrame, _super);
                function EasingDoubleKeyFrame() {
                    _super.apply(this, arguments);

                }
                EasingDoubleKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, EasingDoubleKeyFrame);
                EasingDoubleKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    if(keyFrameProgress >= 1.0) {
                        return this.Value;
                    }
                    var start = baseValue;
                    var end = this.Value;
                    var easingFunction = this.EasingFunction;
                    if(easingFunction) {
                        keyFrameProgress = easingFunction.Ease(keyFrameProgress);
                    }
                    if(isNaN(start)) {
                        start = 0;
                    }
                    if(isNaN(end)) {
                        end = 0;
                    }
                    return start + (end - start) * keyFrameProgress;
                };
                return EasingDoubleKeyFrame;
            })(DoubleKeyFrame);
            Animation.EasingDoubleKeyFrame = EasingDoubleKeyFrame;            
            Nullstone.RegisterType(EasingDoubleKeyFrame, "EasingDoubleKeyFrame");
            var LinearDoubleKeyFrame = (function (_super) {
                __extends(LinearDoubleKeyFrame, _super);
                function LinearDoubleKeyFrame() {
                    _super.apply(this, arguments);

                }
                LinearDoubleKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    var start = baseValue;
                    var end = this.Value;
                    if(isNaN(start)) {
                        start = 0;
                    }
                    if(isNaN(end)) {
                        end = 0;
                    }
                    return start + (end - start) * keyFrameProgress;
                };
                return LinearDoubleKeyFrame;
            })(DoubleKeyFrame);
            Animation.LinearDoubleKeyFrame = LinearDoubleKeyFrame;            
            Nullstone.RegisterType(LinearDoubleKeyFrame, "LinearDoubleKeyFrame");
            var SplineDoubleKeyFrame = (function (_super) {
                __extends(SplineDoubleKeyFrame, _super);
                function SplineDoubleKeyFrame() {
                    _super.apply(this, arguments);

                }
                SplineDoubleKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () {
                    return Animation.KeySpline;
                }, SplineDoubleKeyFrame);
                SplineDoubleKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    if(keyFrameProgress >= 1.0) {
                        return this.Value;
                    }
                    var start = baseValue;
                    var end = this.Value;
                    var splineProgress = keyFrameProgress;
                    var keySpline = this.KeySpline;
                    if(keySpline) {
                        splineProgress = keySpline.GetSplineProgress(keyFrameProgress);
                    }
                    if(isNaN(start)) {
                        start = 0;
                    }
                    if(isNaN(end)) {
                        end = 0;
                    }
                    return start + (end - start) * splineProgress;
                };
                return SplineDoubleKeyFrame;
            })(DoubleKeyFrame);
            Animation.SplineDoubleKeyFrame = SplineDoubleKeyFrame;            
            Nullstone.RegisterType(SplineDoubleKeyFrame, "SplineDoubleKeyFrame");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DoubleKeyFrame.js.map
