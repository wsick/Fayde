/// <reference path="Animation.js"/>
/// CODE

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