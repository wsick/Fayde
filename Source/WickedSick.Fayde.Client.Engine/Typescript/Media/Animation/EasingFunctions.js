var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="EasingFunctionBase.ts" />
        /// CODE
        (function (Animation) {
            var BackEase = (function (_super) {
                __extends(BackEase, _super);
                function BackEase() {
                    _super.apply(this, arguments);

                }
                BackEase.AmplitudeProperty = DependencyProperty.Register("Amplitude", function () {
                    return Number;
                }, BackEase);
                BackEase.prototype.EaseInCore = function (t) {
                    var a = this.Amplitude;
                    return (t * t * t) - (t * a * Math.sin(t * Math.PI));
                };
                return BackEase;
            })(Animation.EasingFunctionBase);
            Animation.BackEase = BackEase;            
            Nullstone.RegisterType(BackEase, "BackEase");
            var BounceEase = (function (_super) {
                __extends(BounceEase, _super);
                function BounceEase() {
                    _super.apply(this, arguments);

                }
                BounceEase.BouncesProperty = DependencyProperty.Register("Bounces", function () {
                    return Number;
                }, BounceEase, 3);
                BounceEase.BouncinessProperty = DependencyProperty.Register("Bounciness", function () {
                    return Number;
                }, BounceEase, 2);
                BounceEase.prototype.EaseInCore = function (t) {
                    t = 1 - t;
                    var bounces = this.Bounces;
                    var bounciness = this.Bounciness;
                    var r = -1;
                    var period = 2;
                    for(var i = 0; i <= bounces; i++) {
                        r += (period * Math.pow(1 + (bounciness / 2), -i));
                    }
                    var x1 = -1.0;
                    var x2 = 0;
                    var r_sq = r * r;
                    var val = 100;
                    var p = 0;
                    while(val > 0.0) {
                        x2 = x1 + period * Math.pow(1 + (bounciness / 2), -p++);
                        val = r_sq * (t - x1 / r) * (t - x2 / r);
                        x1 = x2;
                    }
                    return -val;
                };
                return BounceEase;
            })(Animation.EasingFunctionBase);
            Animation.BounceEase = BounceEase;            
            Nullstone.RegisterType(BounceEase, "BounceEase");
            var CircleEase = (function (_super) {
                __extends(CircleEase, _super);
                function CircleEase() {
                    _super.apply(this, arguments);

                }
                CircleEase.prototype.EaseInCore = function (t) {
                    return 1 - Math.sqrt(1 - (t * t));
                };
                return CircleEase;
            })(Animation.EasingFunctionBase);
            Animation.CircleEase = CircleEase;            
            Nullstone.RegisterType(CircleEase, "CircleEase");
            var CubicEase = (function (_super) {
                __extends(CubicEase, _super);
                function CubicEase() {
                    _super.apply(this, arguments);

                }
                CubicEase.prototype.EaseInCore = function (t) {
                    return t * t * t;
                };
                return CubicEase;
            })(Animation.EasingFunctionBase);
            Animation.CubicEase = CubicEase;            
            Nullstone.RegisterType(CubicEase, "CubicEase");
            var ElasticEase = (function (_super) {
                __extends(ElasticEase, _super);
                function ElasticEase() {
                    _super.apply(this, arguments);

                }
                ElasticEase.OscillationsProperty = DependencyProperty.Register("Oscillations", function () {
                    return Number;
                }, ElasticEase);
                ElasticEase.SpringinessProperty = DependencyProperty.Register("Springiness", function () {
                    return Number;
                }, ElasticEase);
                ElasticEase.prototype.EaseInCore = function (t) {
                    var period = 1.0 / (this.Oscillations + 0.25);
                    var offset = period / 4;
                    t = t - 1;
                    return t * -Math.pow(2.0, this.Springiness * t) * Math.sin(((t - offset) * Math.PI * 2) / period);
                };
                return ElasticEase;
            })(Animation.EasingFunctionBase);
            Animation.ElasticEase = ElasticEase;            
            Nullstone.RegisterType(ElasticEase, "ElasticEase");
            var ExponentialEase = (function (_super) {
                __extends(ExponentialEase, _super);
                function ExponentialEase() {
                    _super.apply(this, arguments);

                }
                ExponentialEase.ExponentProperty = DependencyProperty.Register("Exponent", function () {
                    return Number;
                }, ExponentialEase);
                ExponentialEase.prototype.EaseInCore = function (t) {
                    var e = this.Exponent;
                    return (Math.exp(e * t) - 1) / (Math.exp(e) - 1);
                };
                return ExponentialEase;
            })(Animation.EasingFunctionBase);
            Animation.ExponentialEase = ExponentialEase;            
            Nullstone.RegisterType(ExponentialEase, "ExponentialEase");
            var PowerEase = (function (_super) {
                __extends(PowerEase, _super);
                function PowerEase() {
                    _super.apply(this, arguments);

                }
                PowerEase.PowerProperty = DependencyProperty.Register("Power", function () {
                    return Number;
                }, PowerEase);
                PowerEase.prototype.EaseInCore = function (t) {
                    return Math.pow(t, this.Power);
                };
                return PowerEase;
            })(Animation.EasingFunctionBase);
            Animation.PowerEase = PowerEase;            
            Nullstone.RegisterType(PowerEase, "PowerEase");
            var QuadraticEase = (function (_super) {
                __extends(QuadraticEase, _super);
                function QuadraticEase() {
                    _super.apply(this, arguments);

                }
                QuadraticEase.prototype.EaseInCore = function (t) {
                    return t * t;
                };
                return QuadraticEase;
            })(Animation.EasingFunctionBase);
            Animation.QuadraticEase = QuadraticEase;            
            Nullstone.RegisterType(QuadraticEase, "QuadraticEase");
            var QuarticEase = (function (_super) {
                __extends(QuarticEase, _super);
                function QuarticEase() {
                    _super.apply(this, arguments);

                }
                QuarticEase.prototype.EaseInCore = function (t) {
                    return t * t * t * t;
                };
                return QuarticEase;
            })(Animation.EasingFunctionBase);
            Animation.QuarticEase = QuarticEase;            
            Nullstone.RegisterType(QuarticEase, "QuarticEase");
            var QuinticEase = (function (_super) {
                __extends(QuinticEase, _super);
                function QuinticEase() {
                    _super.apply(this, arguments);

                }
                QuinticEase.prototype.EaseInCore = function (t) {
                    return t * t * t * t * t;
                };
                return QuinticEase;
            })(Animation.EasingFunctionBase);
            Animation.QuinticEase = QuinticEase;            
            Nullstone.RegisterType(QuinticEase, "QuinticEase");
            var SineEase = (function (_super) {
                __extends(SineEase, _super);
                function SineEase() {
                    _super.apply(this, arguments);

                }
                SineEase.prototype.EaseInCore = function (t) {
                    return 1 - (Math.sin(1 - t) * (Math.PI / 2));
                };
                return SineEase;
            })(Animation.EasingFunctionBase);
            Animation.SineEase = SineEase;            
            Nullstone.RegisterType(SineEase, "SineEase");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=EasingFunctions.js.map
