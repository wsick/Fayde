/// <reference path="../../Runtime/RefObject.js" />
/// <reference path="Timeline.js"/>
/// CODE

//#region ColorAnimation

function ColorAnimation() {
    Timeline.call(this);
}
ColorAnimation.InheritFrom(Timeline);

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

//#endregion
