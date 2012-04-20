/// <reference path="../Control.js"/>
/// CODE
/// <reference path="../../Runtime/Utils.js"/>
/// <reference path="../../Runtime/RoutedPropertyChangedEventArgs.js"/>

//#region RangeBase
var RangeBase = Nullstone.Create("RangeBase", Control);

RangeBase.Instance.Init = function () {
    this.Init$Control();
    this.SetMinimum(0);
    this.SetMaximum(1);
    this.SetCurrentValue(0);
    this.SetSmallChange(0.1);
    this.SetLargeChange(1);
    this.CurrentValueChanged = new MulticastEvent();
    this._LevelsFromRootCall = 0;
};

//#region Dependency Properties

RangeBase.MinimumProperty = DependencyProperty.Register("Minimum", function () { return Number; }, RangeBase, 0, RangeBase._OnMinimumPropertyChanged);
RangeBase.Instance.GetMinimum = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(RangeBase.MinimumProperty);
};
RangeBase.Instance.SetMinimum = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(RangeBase.MinimumProperty, value);
};
RangeBase._OnMinimumPropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for Minimum property.");
    if (d._LevelsFromRootCall === 0) {
        d._InitialMax = args.GetMaximum();
        d._InitialVal = d.GetCurrentValue();
    }
    d._LevelsFromRootCall++;
    d._CoerceMaximum();
    d._CoerceCurrentValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        d._OnMinimumChanged(args.OldValue, args.OldValue);
        var max = d.GetMaximum();
        if (!DoubleUtil.AreClose(d._InitialMax, max)) {
            d._OnMaximumChanged(d._InitialMax, max);
        }
        var val = d.GetCurrentValue();
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnCurrentValueChanged(d._InitialVal, val);
        }
    }
};

RangeBase.MaximumProperty = DependencyProperty.Register("Maximum", function () { return Number; }, RangeBase, 1, RangeBase._OnMaximumPropertyChanged);
RangeBase.Instance.GetMaximum = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(RangeBase.MaximumProperty);
};
RangeBase.Instance.SetMaximum = function (value) {
    ///<param name="value" type="Number"></param>
    if (this._LevelsFromRootCall === 0)
        this._RequestedMax = value;
    this.$SetValue(RangeBase.MaximumProperty, value);
};
RangeBase._OnMaximumPropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for Maximum property.");
    if (d._LevelsFromRootCall === 0) {
        d._RequestedMax = args.NewValue;
        d._InitialMax = args.OldValue;
        d._InitialVal = d.GetCurrentValue();
    }
    d._LevelsFromRootCall++;
    d._CoerceMaximum();
    d._CoerceCurrentValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        var max = d.GetMaximum();
        if (!DoubleUtil.AreClose(d._InitialMax, max)) {
            d._OnMaximumChanged(d._InitialMax, max);
        }
        var val = d.GetCurrentValue();
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnCurrentValueChanged(d._InitialVal, val);
        }
    }
};

RangeBase.LargeChangeProperty = DependencyProperty.Register("LargeChange", function () { return Number; }, RangeBase, 1, RangeBase._OnLargeChangePropertyChanged);
RangeBase.Instance.GetLargeChange = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(RangeBase.LargeChangeProperty);
};
RangeBase.Instance.SetLargeChange = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(RangeBase.LargeChangeProperty, value);
};
RangeBase._OnLargeChangePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidChange(args.NewValue)) {
        throw new ArgumentException("Invalid Large Change Value.");
    }
};

RangeBase.SmallChangeProperty = DependencyProperty.Register("SmallChange", function () { return Number; }, RangeBase, 0.1, RangeBase._OnSmallChangePropertyChanged);
RangeBase.Instance.GetSmallChange = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(RangeBase.SmallChangeProperty);
};
RangeBase.Instance.SetSmallChange = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(RangeBase.SmallChangeProperty, value);
};
RangeBase._OnSmallChangePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidChange(args.NewValue)) {
        throw new ArgumentException("Invalid Small Change Value.");
    }
};

RangeBase.CurrentValueProperty = DependencyProperty.Register("CurrentValue", function () { return Number; }, RangeBase, 0, RangeBase._OnCurrentValuePropertyChanged);
RangeBase.Instance.GetCurrentValue = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(RangeBase.CurrentValueProperty);
};
RangeBase.Instance.SetCurrentValue = function (value) {
    ///<param name="value" type="Number"></param>
    if (this._LevelsFromRootCall === 0)
        this._RequestedVal = value;
    this.$SetValue(RangeBase.CurrentValueProperty, value);
};
RangeBase._OnCurrentValuePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for CurrentValue property.");
    if (d._LevelsFromRootCall === 0) {
        d._RequestedVal = args.NewValue;
        d._InitialVal = args.OldValue;
    }
    d._LevelsFromRootCall++;
    d._CoerceCurrentValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        var val = d.GetCurrentValue();
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnCurrentValueChanged(d._InitialVal, val);
        }
    }

};

//#endregion

RangeBase.Instance._CoerceMaximum = function () {
    var min = this.GetMinimum();
    var max = this.GetMaximum();
    if (!DoubleUtil.AreClose(this._RequestedMax, max) && this._RequestedMax >= min) {
        this.$SetValue(RangeBase.MaximumProperty, this._RequestedMax);
        return;
    }
    if (max < min)
        this.$SetValue(RangeBase.MaximumProperty, min);
};
RangeBase.Instance._CoerceCurrentValue = function () {
    var min = this.GetMinimum();
    var max = this.GetMaximum();
    var val = this.GetCurrentValue();
    if (!DoubleUtil.AreClose(this._RequestedVal, val) && this._RequestedVal >= min && this._RequestedVal <= max) {
        this.$SetValue(RangeBase.CurrentValueProperty, this._RequestedVal);
        return;
    }
    if (val < min)
        this.$SetValue(RangeBase.CurrentValueProperty, min);
    if (val > max)
        this.$SetValue(RangeBase.CurrentValueProperty, max);
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

RangeBase.Instance._OnMinimumChanged = function (oldMin, newMin) { };
RangeBase.Instance._OnMaximumChanged = function (oldMax, newMax) { };
RangeBase.Instance._OnCurrentValueChanged = function (oldValue, newValue) {
    d.CurrentValueChanged.Raise(d, new RoutedPropertyChangedEventArgs(oldValue, newValue));
};

Nullstone.FinishCreate(RangeBase);
//#endregion