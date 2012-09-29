/// <reference path="EasingFunctionBase.js"/>
/// CODE

//#region ElasticEase
var ElasticEase = Nullstone.Create("ElasticEase", EasingFunctionBase);

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

Nullstone.FinishCreate(ElasticEase);
//#endregion