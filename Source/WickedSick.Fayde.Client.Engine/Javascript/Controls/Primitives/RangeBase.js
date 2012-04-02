/// <reference path="../Control.js"/>
/// CODE

//#region RangeBase
var RangeBase = Nullstone.Create("RangeBase", Control);

RangeBase.Instance.Init = function () {
    this.SetMinimum(0);
    this.SetMaximum(1);
    this.SetCurrentValue(0);
    this.SetSmallChange(0.1);
    this.SetLargeChange(1);
};

//#region Dependency Properties

RangeBase.MinimumProperty = DependencyProperty.Register("Minimum", function () { return Number; }, RangeBase, 0, RangeBase._OnMinimumPropertyChanged);
RangeBase.Instance.GetMinimum = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(RangeBase.MinimumProperty);
};
RangeBase.Instance.SetMinimum = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(RangeBase.MinimumProperty, value);
};
RangeBase._OnMinimumPropertyChanged = function (d, args) {
};

RangeBase.MaximumProperty = DependencyProperty.Register("Maximum", function () { return Number; }, RangeBase, 1, RangeBase._OnMaximumPropertyChanged);
RangeBase.Instance.GetMaximum = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(RangeBase.MaximumProperty);
};
RangeBase.Instance.SetMaximum = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(RangeBase.MaximumProperty, value);
};
RangeBase._OnMaximumPropertyChanged = function (d, args) {
};

RangeBase.LargeChangeProperty = DependencyProperty.Register("LargeChange", function () { return Number; }, RangeBase, 1, RangeBase._OnLargeChangePropertyChanged);
RangeBase.Instance.GetLargeChange = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(RangeBase.LargeChangeProperty);
};
RangeBase.Instance.SetLargeChange = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(RangeBase.LargeChangeProperty, value);
};
RangeBase._OnLargeChangePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidChange(args.NewValue)) {
        throw new ArgumentException("Invalid Large Change Value.");
    }
};

RangeBase.SmallChangeProperty = DependencyProperty.Register("SmallChange", function () { return Number; }, RangeBase, 0.1, RangeBase._OnSmallChangePropertyChanged);
RangeBase.Instance.GetSmallChange = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(RangeBase.SmallChangeProperty);
};
RangeBase.Instance.SetSmallChange = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(RangeBase.SmallChangeProperty, value);
};
RangeBase._OnSmallChangePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidChange(args.NewValue)) {
        throw new ArgumentException("Invalid Small Change Value.");
    }
};

RangeBase.CurrentValueProperty = DependencyProperty.Register("CurrentValue", function () { return Number; }, RangeBase, 0, RangeBase._OnCurrentValuePropertyChanged);
RangeBase.Instance.GetCurrentValue = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(RangeBase.CurrentValueProperty);
};
RangeBase.Instance.SetCurrentValue = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(RangeBase.CurrentValueProperty, value);
};
RangeBase._OnCurrentValuePropertyChanged = function (d, args) {
    //TODO: this.ValueChanged.Raise(this, new EventArgs());
};

//#endregion

RangeBase.Instance._CoerceMaximum = function () {
    var min = this.GetMinimum();
    var max = this.GetMaximum();
    ///....
};
RangeBase.Instance._CoerceValue = function () {
};

RangeBase._IsValidChange = function (value) {
    if (!RangeBase._IsValidDoubleValue(value))
        return false;
    return value >= 0;
};
RangeBase._IsValidDoubleValue = function (value) {
    if (typeof value !== "number")
        return false;
    if (isNaN(value))
        return false;
    if (!isFinite(value))
        return false;
    return true;
};

RangeBase.Instance._OnMaximumChanged = function (oldMax, newMax) { };
RangeBase.Instance._OnMinimumChanged = function (oldMin, newMin) { };
RangeBase.Instance._OnCurrentValueChanged = function (oldValue, newValue) { };

Nullstone.FinishCreate(RangeBase);
//#endregion