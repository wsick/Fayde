/// <reference path="EasingFunctionBase.ts" />
/// CODE

module Fayde.Media.Animation {
    export class BackEase extends EasingFunctionBase {
        static AmplitudeProperty: DependencyProperty = DependencyProperty.Register("Amplitude", () => Number, BackEase);
        Amplitude: number;
        EaseInCore(t: number): number {
            var a = this.Amplitude;
            return (t * t * t) - (t * a * Math.sin(t * Math.PI));
        }
    }
    Nullstone.RegisterType(BackEase, "BackEase");

    export class BounceEase extends EasingFunctionBase {
        static BouncesProperty:DependencyProperty = DependencyProperty.Register("Bounces", () => Number, BounceEase, 3);
        static BouncinessProperty:DependencyProperty = DependencyProperty.Register("Bounciness", () => Number, BounceEase, 2);
        Bounces: number;
        Bounciness: number;
        EaseInCore(t: number): number {
            t = 1 - t;
            var bounces = this.Bounces;
            var bounciness = this.Bounciness;
            var r = -1;
            var period = 2;

            for (var i = 0; i <= bounces; i++) {
                r += (period * Math.pow(1 + (bounciness / 2), -i));
            }

            var x1 = -1.0;
            var x2 = 0;
            var r_sq = r * r;
            var val = 100;
            var p = 0;

            while (val > 0.0) {
                x2 = x1 + period * Math.pow(1 + (bounciness / 2), -p++);
                val = r_sq * (t - x1 / r) * (t - x2 / r);
                x1 = x2;
            }
            return -val;
        }
    }
    Nullstone.RegisterType(BounceEase, "BounceEase");

    export class CircleEase extends EasingFunctionBase {
        EaseInCore(t: number): number {
            return 1 - Math.sqrt(1 - (t * t));
        }
    }
    Nullstone.RegisterType(CircleEase, "CircleEase");

    export class CubicEase extends EasingFunctionBase {
        EaseInCore(t: number): number {
            return t * t * t;
        }
    }
    Nullstone.RegisterType(CubicEase, "CubicEase");

    export class ElasticEase extends EasingFunctionBase {
        static OscillationsProperty: DependencyProperty = DependencyProperty.Register("Oscillations", () => Number, ElasticEase);
        static SpringinessProperty: DependencyProperty = DependencyProperty.Register("Springiness", () => Number, ElasticEase);
        Oscillations: number;
        Springiness: number;
        EaseInCore(t: number): number {
            var period = 1.0 / (this.Oscillations + .25);
            var offset = period / 4;
            t = t - 1;
            return t * -Math.pow(2.0, this.Springiness * t) * Math.sin(((t - offset) * Math.PI * 2) / period);
        }
    }
    Nullstone.RegisterType(ElasticEase, "ElasticEase");

    export class ExponentialEase extends EasingFunctionBase {
        static ExponentProperty: DependencyProperty = DependencyProperty.Register("Exponent", () => Number, ExponentialEase);
        Exponent: number;
        EaseInCore(t: number): number {
            var e = this.Exponent;
            return (Math.exp(e * t) - 1) / (Math.exp(e) - 1);
        }
    }
    Nullstone.RegisterType(ExponentialEase, "ExponentialEase");

    export class PowerEase extends EasingFunctionBase {
        static PowerProperty: DependencyProperty = DependencyProperty.Register("Power", () => Number, PowerEase);
        Power: number;
        EaseInCore(t: number): number {
            return Math.pow(t, this.Power);
        }
    }
    Nullstone.RegisterType(PowerEase, "PowerEase");

    export class QuadraticEase extends EasingFunctionBase {
        EaseInCore(t: number): number {
            return t * t;
        }
    }
    Nullstone.RegisterType(QuadraticEase, "QuadraticEase");

    export class QuarticEase extends EasingFunctionBase {
        EaseInCore(t: number): number {
            return t * t * t * t;
        }
    }
    Nullstone.RegisterType(QuarticEase, "QuarticEase");

    export class QuinticEase extends EasingFunctionBase {
        EaseInCore(t: number): number {
            return t * t * t * t * t;
        }
    }
    Nullstone.RegisterType(QuinticEase, "QuinticEase");

    export class SineEase extends EasingFunctionBase {
        EaseInCore(t: number): number {
            return 1 - (Math.sin(1 - t) * (Math.PI / 2));
        }
    }
    Nullstone.RegisterType(SineEase, "SineEase");
}