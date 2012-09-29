/// <reference path="EasingFunctionBase.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region BounceEase
var BounceEase = Nullstone.Create("BounceEase", EasingFunctionBase);

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


Nullstone.FinishCreate(BounceEase);
//#endregion