/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="Timeline.js"/>
/// CODE
/// <reference path="Storyboard.js"/>
/// <reference path="../../Core/DependencyObject.js"/>

//#region DoubleAnimation

function DoubleAnimation() {
    Timeline.call(this);
}
DoubleAnimation.InheritFrom(Timeline);

//#region DEPENDENCY PROPERTIES

DoubleAnimation.ByProperty = DependencyProperty.Register("By", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetBy = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(DoubleAnimation.ByProperty);
};
DoubleAnimation.prototype.SetBy = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(DoubleAnimation.ByProperty, value);
};

/*
DoubleAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return EasingFunction; }, DoubleAnimation);
DoubleAnimation.prototype.GetEasingFunction = function () {
    ///<returns type="EasingFunction"></returns>
    return this.GetValue(DoubleAnimation.EasingFunctionProperty);
};
DoubleAnimation.prototype.SetEasingFunction = function (value) {
    ///<param name="value" type="EasingFunction"></param>
    this.SetValue(DoubleAnimation.EasingFunctionProperty, value);
};
*/

DoubleAnimation.FromProperty = DependencyProperty.Register("From", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetFrom = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(DoubleAnimation.FromProperty);
};
DoubleAnimation.prototype.SetFrom = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(DoubleAnimation.FromProperty, value);
};

DoubleAnimation.ToProperty = DependencyProperty.Register("To", function () { return Number; }, DoubleAnimation);
DoubleAnimation.prototype.GetTo = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(DoubleAnimation.ToProperty);
};
DoubleAnimation.prototype.SetTo = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(DoubleAnimation.ToProperty, value);
};

//#endregion

DoubleAnimation.prototype._GetTargetValue = function (defaultOriginValue) {
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
DoubleAnimation.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, progress) {
    this._EnsureCache();
    if (progress > 1.0)
        progress = 1.0;

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
    //progress = easingFunc.Ease(progress);

    return start + ((end - start) * progress);
};
DoubleAnimation.prototype._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.GetFrom();
    this._ToCached = this.GetTo();
    this._ByCached = this.GetBy();
    this._HasCached = true;
};

DoubleAnimation.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== DoubleAnimation) {
        Timeline.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    this._FromCached = null;
    this._ToCached = null;
    this._ByCached = null;
    this._HasCached = false;

    this.PropertyChanged.Raise(this, args);
};

//#endregion
