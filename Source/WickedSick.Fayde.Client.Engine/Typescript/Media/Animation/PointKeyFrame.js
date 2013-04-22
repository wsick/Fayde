var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="KeyFrame.ts" />
        /// <reference path="../../Primitives/Point.ts" />
        /// <reference path="EasingFunctionBase.ts" />
        /// <reference path="KeySpline.ts" />
        /// CODE
        (function (Animation) {
            var PointKeyFrame = (function (_super) {
                __extends(PointKeyFrame, _super);
                function PointKeyFrame() {
                    _super.apply(this, arguments);

                }
                PointKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () {
                    return Point;
                }, PointKeyFrame);
                return PointKeyFrame;
            })(Animation.KeyFrame);
            Animation.PointKeyFrame = PointKeyFrame;            
            Nullstone.RegisterType(PointKeyFrame, "PointKeyFrame");
            var DiscretePointKeyFrame = (function (_super) {
                __extends(DiscretePointKeyFrame, _super);
                function DiscretePointKeyFrame() {
                    _super.apply(this, arguments);

                }
                DiscretePointKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    if(keyFrameProgress >= 1.0) {
                        return this.Value;
                    }
                    return baseValue;
                };
                return DiscretePointKeyFrame;
            })(PointKeyFrame);
            Animation.DiscretePointKeyFrame = DiscretePointKeyFrame;            
            Nullstone.RegisterType(DiscretePointKeyFrame, "DiscretePointKeyFrame");
            var EasingPointKeyFrame = (function (_super) {
                __extends(EasingPointKeyFrame, _super);
                function EasingPointKeyFrame() {
                    _super.apply(this, arguments);

                }
                EasingPointKeyFrame.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, EasingPointKeyFrame);
                EasingPointKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    if(keyFrameProgress >= 1.0) {
                        return this.Value;
                    }
                    var start = baseValue;
                    var end = this.Value;
                    var easingFunction = this.EasingFunction;
                    if(easingFunction) {
                        keyFrameProgress = easingFunction.Ease(keyFrameProgress);
                    }
                    return Point.LERP(start, end, keyFrameProgress);
                };
                return EasingPointKeyFrame;
            })(PointKeyFrame);
            Animation.EasingPointKeyFrame = EasingPointKeyFrame;            
            Nullstone.RegisterType(EasingPointKeyFrame, "EasingPointKeyFrame");
            var LinearPointKeyFrame = (function (_super) {
                __extends(LinearPointKeyFrame, _super);
                function LinearPointKeyFrame() {
                    _super.apply(this, arguments);

                }
                LinearPointKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    return Point.LERP(baseValue, this.Value, keyFrameProgress);
                };
                return LinearPointKeyFrame;
            })(PointKeyFrame);
            Animation.LinearPointKeyFrame = LinearPointKeyFrame;            
            Nullstone.RegisterType(LinearPointKeyFrame, "LinearPointKeyFrame");
            var SplinePointKeyFrame = (function (_super) {
                __extends(SplinePointKeyFrame, _super);
                function SplinePointKeyFrame() {
                    _super.apply(this, arguments);

                }
                SplinePointKeyFrame.KeySplineProperty = DependencyProperty.Register("KeySpline", function () {
                    return Animation.KeySpline;
                }, SplinePointKeyFrame);
                SplinePointKeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
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
                    if(isNaN(start.X)) {
                        start.X = 0;
                    }
                    if(isNaN(start.Y)) {
                        start.Y = 0;
                    }
                    if(isNaN(end.X)) {
                        end.X = 0;
                    }
                    if(isNaN(end.Y)) {
                        end.Y = 0;
                    }
                    return Point.LERP(start, end, splineProgress);
                };
                return SplinePointKeyFrame;
            })(PointKeyFrame);
            Animation.SplinePointKeyFrame = SplinePointKeyFrame;            
            Nullstone.RegisterType(SplinePointKeyFrame, "SplinePointKeyFrame");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PointKeyFrame.js.map
