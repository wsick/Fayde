var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="KeyFrame.ts" />
        /// <reference path="../../Primitives/Color.ts" />
        /// <reference path="EasingFunctionBase.ts" />
        /// <reference path="KeySpline.ts" />
        /// CODE
        (function (Animation) {
            var ColorKeyFrame = (function (_super) {
                __extends(ColorKeyFrame, _super);
                function ColorKeyFrame() {
                    _super.apply(this, arguments);

                }
                ColorKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () {
                    return Color;
                }, ColorKeyFrame);
                return ColorKeyFrame;
            })(Animation.KeyFrame);
            Animation.ColorKeyFrame = ColorKeyFrame;            
            Nullstone.RegisterType(ColorKeyFrame, "ColorKeyFrame");
            var DiscreteColorKeyFrame = (function (_super) {
                __extends(DiscreteColorKeyFrame, _super);
                function DiscreteColorKeyFrame() {
                    _super.apply(this, arguments);

                }
                DiscreteColorKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    if(keyFrameProgress >= 1.0) {
                        return this.Value;
                    }
                    return baseValue;
                };
                return DiscreteColorKeyFrame;
            })(ColorKeyFrame);
            Animation.DiscreteColorKeyFrame = DiscreteColorKeyFrame;            
            Nullstone.RegisterType(DiscreteColorKeyFrame, "DiscreteColorKeyFrame");
            var EasingColorKeyFrame = (function (_super) {
                __extends(EasingColorKeyFrame, _super);
                function EasingColorKeyFrame() {
                    _super.apply(this, arguments);

                }
                EasingColorKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, EasingColorKeyFrame);
                EasingColorKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    if(keyFrameProgress >= 1.0) {
                        return this.Value;
                    }
                    var start = baseValue;
                    var end = this.Value;
                    var easingFunction = this.EasingFunction;
                    if(easingFunction) {
                        keyFrameProgress = easingFunction.Ease(keyFrameProgress);
                    }
                    return Color.LERP(start, end, keyFrameProgress);
                };
                return EasingColorKeyFrame;
            })(ColorKeyFrame);
            Animation.EasingColorKeyFrame = EasingColorKeyFrame;            
            Nullstone.RegisterType(EasingColorKeyFrame, "EasingColorKeyFrame");
            var LinearColorKeyFrame = (function (_super) {
                __extends(LinearColorKeyFrame, _super);
                function LinearColorKeyFrame() {
                    _super.apply(this, arguments);

                }
                LinearColorKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    return Color.LERP(baseValue, this.Value, keyFrameProgress);
                };
                return LinearColorKeyFrame;
            })(ColorKeyFrame);
            Animation.LinearColorKeyFrame = LinearColorKeyFrame;            
            Nullstone.RegisterType(LinearColorKeyFrame, "LinearColorKeyFrame");
            var SplineColorKeyFrame = (function (_super) {
                __extends(SplineColorKeyFrame, _super);
                function SplineColorKeyFrame() {
                    _super.apply(this, arguments);

                }
                SplineColorKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () {
                    return Animation.KeySpline;
                }, SplineColorKeyFrame);
                SplineColorKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
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
                    return Color.LERP(start, end, splineProgress);
                };
                return SplineColorKeyFrame;
            })(ColorKeyFrame);
            Animation.SplineColorKeyFrame = SplineColorKeyFrame;            
            Nullstone.RegisterType(SplineColorKeyFrame, "SplineColorKeyFrame");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ColorKeyFrame.js.map
