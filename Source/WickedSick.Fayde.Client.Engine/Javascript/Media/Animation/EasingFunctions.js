/// <reference path="EasingFunctionBase.js"/>
/// CODE
/// <reference path="Enums.js"/>

(function (namespace) {
    //#region BackEase

    var BackEase = Nullstone.Create("BackEase", namespace.EasingFunctionBase);

    //#region Properties

    BackEase.AmplitudeProperty = DependencyProperty.Register("Amplitude", function () { return Number; }, BackEase);

    Nullstone.AutoProperties(BackEase, [
        BackEase.AmplitudeProperty
    ]);

    //#endregion

    BackEase.Instance.EaseInCore = function (t) {
        var a = this.Amplitude;
        return (t * t * t) - (t * a * Math.sin(t * Math.PI));
    };

    namespace.BackEase = Nullstone.FinishCreate(BackEase);

    //#endregion

    //#region BounceEase

    var BounceEase = Nullstone.Create("BounceEase", namespace.EasingFunctionBase);

    //#region Properties

    BounceEase.BouncesProperty = DependencyProperty.Register("Bounces", function () { return Number; }, BounceEase, 3);
    BounceEase.BouncinessProperty = DependencyProperty.Register("Bounciness", function () { return Number; }, BounceEase, 2);

    Nullstone.AutoProperties(BounceEase, [
        BounceEase.BouncesProperty,
        BounceEase.BouncinessProperty
    ]);

    //#endregion

    BounceEase.Instance.EaseInCore = function (t) {
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
    };

    namespace.BounceEase = Nullstone.FinishCreate(BounceEase);

    //#endregion

    //#region CircleEase

    var CircleEase = Nullstone.Create("CircleEase", namespace.EasingFunctionBase);
    CircleEase.Instance.EaseInCore = function (t) {
        return 1 - Math.sqrt(1 - (t * t));
    };
    namespace.CircleEase = Nullstone.FinishCreate(CircleEase);

    //#endregion

    //#region CubicEase

    var CubicEase = Nullstone.Create("CubicEase", namespace.EasingFunctionBase);
    CubicEase.Instance.EaseInCore = function (t) {
        return t * t * t;
    };
    namespace.CubicEase = Nullstone.FinishCreate(CubicEase);

    //#endregion

    //#region ElasticEase

    var ElasticEase = Nullstone.Create("ElasticEase", namespace.EasingFunctionBase);

    //#region Properties

    ElasticEase.OscillationsProperty = DependencyProperty.Register("Oscillations", function () { return Number; }, ElasticEase);
    ElasticEase.SpringinessProperty = DependencyProperty.Register("Springiness", function () { return Number; }, ElasticEase);

    Nullstone.AutoProperties(ElasticEase, [
        ElasticEase.OscillationsProperty,
        ElasticEase.SpringinessProperty
    ]);

    //#endregion

    ElasticEase.Instance.EaseInCore = function (t) {
        var period = 1.0 / (this.Oscillations + .25);
        var offset = period / 4;
        t = t - 1;
        return t * -Math.pow(2.0, this.Springiness * t) * Math.sin(((t - offset) * Math.PI * 2) / period);
    };

    namespace.ElasticEase = Nullstone.FinishCreate(ElasticEase);

    //#endregion

    //#region ExponentialEase

    var ExponentialEase = Nullstone.Create("ExponentialEase", namespace.EasingFunctionBase);

    //#region Properties

    ExponentialEase.ExponentProperty = DependencyProperty.Register("Exponent", function () { return Number; }, ExponentialEase);

    Nullstone.AutoProperties(ExponentialEase, [
        ExponentialEase.ExponentProperty
    ]);

    //#endregion

    ExponentialEase.Instance.EaseInCore = function (t) {
        var e = this.Exponent;
        return (Math.exp(e * t) - 1) / (Math.exp(e) - 1);
    };

    namespace.ExponentialEase = Nullstone.FinishCreate(ExponentialEase);

    //#endregion

    //#region PowerEase

    var PowerEase = Nullstone.Create("PowerEase", namespace.EasingFunctionBase);

    //#region Properties

    PowerEase.PowerProperty = DependencyProperty.Register("Power", function () { return Number; }, PowerEase);

    Nullstone.AutoProperties(PowerEase, [
        PowerEase.PowerProperty
    ]);

    //#endregion

    PowerEase.Instance.EaseInCore = function (t) {
        return Math.pow(t, this.Power);
    };

    namespace.PowerEase = Nullstone.FinishCreate(PowerEase);

    //#endregion

    //#region QuadraticEase

    var QuadraticEase = Nullstone.Create("QuadraticEase", namespace.EasingFunctionBase);
    QuadraticEase.Instance.EaseInCore = function (t) {
        return t * t;
    };
    namespace.QuadraticEase = Nullstone.FinishCreate(QuadraticEase);

    //#endregion

    //#region QuarticEase

    var QuarticEase = Nullstone.Create("QuarticEase", namespace.EasingFunctionBase);
    QuarticEase.Instance.EaseInCore = function (t) {
        return t * t * t * t;
    };
    namespace.QuarticEase = Nullstone.FinishCreate(QuarticEase);

    //#endregion

    //#region QuinticEase

    var QuinticEase = Nullstone.Create("QuinticEase", namespace.EasingFunctionBase);
    QuinticEase.Instance.EaseInCore = function (t) {
        return t * t * t * t * t;
    };
    namespace.QuinticEase = Nullstone.FinishCreate(QuinticEase);

    //#endregion

    //#region SineEase

    var SineEase = Nullstone.Create("SineEase", namespace.EasingFunctionBase);
    SineEase.Instance.EaseInCore = function (t) {
        return 1 - (Math.sin(1 - t) * (Math.PI / 2));
    };
    namespace.SineEase = Nullstone.FinishCreate(SineEase);

    //#endregion
})(Nullstone.Namespace("Fayde.Media.Animation"));