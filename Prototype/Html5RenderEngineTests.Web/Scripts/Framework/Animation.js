/// <reference path="Timeline.js"/>
/// CODE
/// <reference path="Color.js"/>

//#region Animation

function Animation() {
    Timeline.call(this);
}
Animation.InheritFrom(Timeline);

//#endregion

//#region DoubleAnimation

function DoubleAnimation() {
    Animation.call(this);
}
DoubleAnimation.InheritFrom(Animation);

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

//#endregion

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