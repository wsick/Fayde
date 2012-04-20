/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="Animation.js"/>
/// CODE
/// <reference path="Storyboard.js"/>
/// <reference path="../../Core/DependencyObject.js"/>

//#region DoubleAnimation
var DoubleAnimation = Nullstone.Create("DoubleAnimation", Animation);

//#region DEPENDENCY PROPERTIES

DoubleAnimation.ByProperty = DependencyProperty.Register("By", function () { return Number; }, DoubleAnimation);
DoubleAnimation.Instance.GetBy = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(DoubleAnimation.ByProperty);
};
DoubleAnimation.Instance.SetBy = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(DoubleAnimation.ByProperty, value);
};

/*
DoubleAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return EasingFunction; }, DoubleAnimation);
DoubleAnimation.Instance.GetEasingFunction = function () {
///<returns type="EasingFunction"></returns>
return this.$GetValue(DoubleAnimation.EasingFunctionProperty);
};
DoubleAnimation.Instance.SetEasingFunction = function (value) {
///<param name="value" type="EasingFunction"></param>
this.SetValue(DoubleAnimation.EasingFunctionProperty, value);
};
*/

DoubleAnimation.FromProperty = DependencyProperty.Register("From", function () { return Number; }, DoubleAnimation);
DoubleAnimation.Instance.GetFrom = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(DoubleAnimation.FromProperty);
};
DoubleAnimation.Instance.SetFrom = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(DoubleAnimation.FromProperty, value);
};

DoubleAnimation.ToProperty = DependencyProperty.Register("To", function () { return Number; }, DoubleAnimation);
DoubleAnimation.Instance.GetTo = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(DoubleAnimation.ToProperty);
};
DoubleAnimation.Instance.SetTo = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(DoubleAnimation.ToProperty, value);
};

//#endregion

DoubleAnimation.Instance._GetTargetValue = function (defaultOriginValue) {
    this._EnsureCache();

    var start = 0.0;
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && Number.isNumber(defaultOriginValue))
        start = defaultOriginValue;

    if (this._ToCached != null)
        return this._ToCached;
    else if (this._ByCached != null)
        return start + this._ByCached;
    return start;
};
DoubleAnimation.Instance._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
    this._EnsureCache();

    var start = 0.0;
    if (this._FromCached != null)
        start = this._FromCached;
    else if (defaultOriginValue != null && Number.isNumber(defaultOriginValue))
        start = defaultOriginValue;

    var end = start;
    if (this._ToCached != null)
        end = this._ToCached;
    else if (this._ByCached != null)
        end = start + this._ByCached;
    else if (defaultDestinationValue != null && Number.isNumber(defaultDestinationValue))
        end = defaultDestinationValue;

    //var easingFunc = this.GetEasingFunction();
    //if (easingFunc != null)
    //clockData.Progress = easingFunc.Ease(clockData.Progress);

    return start + ((end - start) * clockData.Progress);
};
DoubleAnimation.Instance._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.GetFrom();
    this._ToCached = this.GetTo();
    this._ByCached = this.GetBy();
    this._HasCached = true;
};

DoubleAnimation.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== DoubleAnimation) {
        this._OnPropertyChanged$Animation(args, error);
        return;
    }

    this._FromCached = null;
    this._ToCached = null;
    this._ByCached = null;
    this._HasCached = false;

    this.PropertyChanged.Raise(this, args);
};

Nullstone.FinishCreate(DoubleAnimation);
//#endregion