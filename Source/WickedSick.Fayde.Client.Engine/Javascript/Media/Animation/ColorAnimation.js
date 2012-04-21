/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Animation.js"/>
/// CODE
/// <reference path="../../Primitives/Color.js"/>

//#region ColorAnimation
var ColorAnimation = Nullstone.Create("ColorAnimation", Animation);

//#region Dependency Properties

ColorAnimation.ByProperty = DependencyProperty.Register("By", function () { return Color; }, ColorAnimation);
ColorAnimation.Instance.GetBy = function () {
    ///<returns type="Color"></returns>
    return this.$GetValue(ColorAnimation.ByProperty);
};
ColorAnimation.Instance.SetBy = function (value) {
    ///<param name="value" type="Color"></param>
    this.$SetValue(ColorAnimation.ByProperty, value);
};

/*
ColorAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return EasingFunction; }, ColorAnimation);
ColorAnimation.Instance.GetEasingFunction = function () {
///<returns type="EasingFunction"></returns>
return this.$GetValue(ColorAnimation.EasingFunctionProperty);
};
ColorAnimation.Instance.SetEasingFunction = function (value) {
///<param name="value" type="EasingFunction"></param>
this.$SetValue(ColorAnimation.EasingFunctionProperty, value);
};
*/

ColorAnimation.FromProperty = DependencyProperty.Register("From", function () { return Color; }, ColorAnimation);
ColorAnimation.Instance.GetFrom = function () {
    ///<returns type="Color"></returns>
    return this.$GetValue(ColorAnimation.FromProperty);
};
ColorAnimation.Instance.SetFrom = function (value) {
    ///<param name="value" type="Color"></param>
    this.$SetValue(ColorAnimation.FromProperty, value);
};

ColorAnimation.ToProperty = DependencyProperty.Register("To", function () { return Color; }, ColorAnimation);
ColorAnimation.Instance.GetTo = function () {
    ///<returns type="Color"></returns>
    return this.$GetValue(ColorAnimation.ToProperty);
};
ColorAnimation.Instance.SetTo = function (value) {
    ///<param name="value" type="Color"></param>
    this.$SetValue(ColorAnimation.ToProperty, value);
};

//#endregion

ColorAnimation.Instance._GetTargetValue = function (defaultOriginValue) {
    this._EnsureCache();

    var start = new Color();
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && defaultOriginValue instanceof Color)
        start = defaultOriginValue;

    if (this._ToCached != null)
        return this._ToCached;
    else if (this._ByCached != null)
        return start.Add(this._ByCached);
    return start;
};
ColorAnimation.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
    this._EnsureCache();

    var start = new Color();
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && defaultOriginValue instanceof Color)
        start = defaultOriginValue;

    var end = start;
    if (this._ToCached != null)
        end = this._ToCached;
    else if (this._ByCached != null)
        end = start.Add(this._ByCached);
    else if (defaultDestinationValue != null && defaultDestinationValue instanceof Number)
        end = defaultDestinationValue;

    //var easingFunc = this.GetEasingFunction();
    //if (easingFunc != null)
    //clockData.Progress = easingFunc.Ease(clockData.Progress);

    return start.Add(end.Subtract(start).Multiply(clockData.Progress));
};
ColorAnimation.Instance._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.GetFrom();
    this._ToCached = this.GetTo();
    this._ByCached = this.GetBy();
    this._HasCached = true;
};

Nullstone.FinishCreate(ColorAnimation);
//#endregion