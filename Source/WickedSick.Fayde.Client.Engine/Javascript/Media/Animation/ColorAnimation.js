/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="Animation.js"/>
/// CODE
/// <reference path="../../Primitives/Color.js"/>

//#region ColorAnimation

function ColorAnimation() {
    Animation.call(this);
}
ColorAnimation.InheritFrom(Animation);

//#region DEPENDENCY PROPERTIES

ColorAnimation.ByProperty = DependencyProperty.Register("By", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetBy = function () {
    ///<returns type="Color"></returns>
    return this.GetValue(ColorAnimation.ByProperty);
};
ColorAnimation.prototype.SetBy = function (value) {
    ///<param name="value" type="Color"></param>
    this.SetValue(ColorAnimation.ByProperty, value);
};

/*
ColorAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () { return EasingFunction; }, ColorAnimation);
ColorAnimation.prototype.GetEasingFunction = function () {
    ///<returns type="EasingFunction"></returns>
    return this.GetValue(ColorAnimation.EasingFunctionProperty);
};
ColorAnimation.prototype.SetEasingFunction = function (value) {
    ///<param name="value" type="EasingFunction"></param>
    this.SetValue(ColorAnimation.EasingFunctionProperty, value);
};
*/

ColorAnimation.FromProperty = DependencyProperty.Register("From", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetFrom = function () {
    ///<returns type="Color"></returns>
    return this.GetValue(ColorAnimation.FromProperty);
};
ColorAnimation.prototype.SetFrom = function (value) {
    ///<param name="value" type="Color"></param>
    this.SetValue(ColorAnimation.FromProperty, value);
};

ColorAnimation.ToProperty = DependencyProperty.Register("To", function () { return Color; }, ColorAnimation);
ColorAnimation.prototype.GetTo = function () {
    ///<returns type="Color"></returns>
    return this.GetValue(ColorAnimation.ToProperty);
};
ColorAnimation.prototype.SetTo = function (value) {
    ///<param name="value" type="Color"></param>
    this.SetValue(ColorAnimation.ToProperty, value);
};

//#endregion

ColorAnimation.prototype._GetTargetValue = function (defaultOriginValue) {
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
ColorAnimation.prototype._GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, progress) {
    this._EnsureCache();
    if (progress > 1.0)
        progress = 1.0;

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
        //progress = easingFunc.Ease(progress);

    return start.Add(end.Subtract(start).Multiply(progress));
};
ColorAnimation.prototype._EnsureCache = function () {
    if (this._HasCached)
        return;
    this._FromCached = this.GetFrom();
    this._ToCached = this.GetTo();
    this._ByCached = this.GetBy();
    this._HasCached = true;
};

//#endregion