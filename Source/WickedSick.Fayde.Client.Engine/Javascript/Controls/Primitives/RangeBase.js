/// <reference path="../Control.js"/>
/// CODE
/// <reference path="../../Runtime/Utils.js"/>
/// <reference path="../../Runtime/RoutedPropertyChangedEventArgs.js"/>

//#region RangeBase
var RangeBase = Nullstone.Create("RangeBase", Control);

RangeBase.Instance.Init = function () {
    this.Init$Control();
    
    this.Minimum = 0;
    this.Maximum = 1;
    this.SmallChange = 0.1;
    this.LargeChange = 1;
    this.Value = 0;

    this.ValueChanged = new MulticastEvent();
    this._LevelsFromRootCall = 0;
};

//#region Dependency Properties

RangeBase._OnMinimumPropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for Minimum property.");
    if (d._LevelsFromRootCall === 0) {
        d._InitialMax = d.Maximum;
        d._InitialVal = d.Value;
    }
    d._LevelsFromRootCall++;
    d._CoerceMaximum();
    d._CoerceValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        d._OnMinimumChanged(args.OldValue, args.OldValue);
        var max = d.Maximum;
        if (!DoubleUtil.AreClose(d._InitialMax, max)) {
            d._OnMaximumChanged(d._InitialMax, max);
        }
        var val = d.Value;
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnValueChanged(d._InitialVal, val);
        }
    }
};
RangeBase.MinimumProperty = DependencyProperty.Register("Minimum", function () { return Number; }, RangeBase, 0, RangeBase._OnMinimumPropertyChanged);

RangeBase._OnMaximumPropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for Maximum property.");
    if (d._LevelsFromRootCall === 0) {
        d._RequestedMax = args.NewValue;
        d._InitialMax = args.OldValue;
        d._InitialVal = d.Value;
    }
    d._LevelsFromRootCall++;
    d._CoerceMaximum();
    d._CoerceValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        var max = d.Maximum;
        if (!DoubleUtil.AreClose(d._InitialMax, max)) {
            d._OnMaximumChanged(d._InitialMax, max);
        }
        var val = d.Value;
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnValueChanged(d._InitialVal, val);
        }
    }
};
RangeBase.MaximumProperty = DependencyProperty.Register("Maximum", function () { return Number; }, RangeBase, 1, RangeBase._OnMaximumPropertyChanged);

RangeBase._OnLargeChangePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidChange(args.NewValue)) {
        throw new ArgumentException("Invalid Large Change Value.");
    }
};
RangeBase.LargeChangeProperty = DependencyProperty.Register("LargeChange", function () { return Number; }, RangeBase, 1, RangeBase._OnLargeChangePropertyChanged);

RangeBase._OnSmallChangePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidChange(args.NewValue)) {
        throw new ArgumentException("Invalid Small Change Value.");
    }
};
RangeBase.SmallChangeProperty = DependencyProperty.Register("SmallChange", function () { return Number; }, RangeBase, 0.1, RangeBase._OnSmallChangePropertyChanged);

RangeBase._OnValuePropertyChanged = function (d, args) {
    if (!RangeBase._IsValidDoubleValue(args.NewValue))
        throw new ArgumentException("Invalid double value for Value property.");
    if (d._LevelsFromRootCall === 0) {
        d._RequestedVal = args.NewValue;
        d._InitialVal = args.OldValue;
    }
    d._LevelsFromRootCall++;
    d._CoerceValue();
    d._LevelsFromRootCall--;
    if (d._LevelsFromRootCall === 0) {
        var val = d.Value;
        if (!DoubleUtil.AreClose(d._InitialVal, val)) {
            d._OnValueChanged(d._InitialVal, val);
        }
    }

};
RangeBase.ValueProperty = DependencyProperty.Register("Value", function () { return Number; }, RangeBase, 0, RangeBase._OnValuePropertyChanged);

Nullstone.AutoProperties(RangeBase, [
    RangeBase.MinimumProperty,
    RangeBase.MaximumProperty,
    RangeBase.LargeChangeProperty,
    RangeBase.SmallChangeProperty,
    RangeBase.ValueProperty
]);

//#endregion

RangeBase.Instance._CoerceMaximum = function () {
    var min = this.Minimum;
    var max = this.Maximum;
    if (!DoubleUtil.AreClose(this._RequestedMax, max) && this._RequestedMax >= min) {
        this.Maximum = this._RequestedMax;
        return;
    }
    if (max < min)
        this.Maximum = min;
};
RangeBase.Instance._CoerceValue = function () {
    var min = this.Minimum;
    var max = this.Maximum;
    var val = this.Value;
    if (!DoubleUtil.AreClose(this._RequestedVal, val) && this._RequestedVal >= min && this._RequestedVal <= max) {
        this.Value = this._RequestedVal;
        return;
    }
    if (val < min)
        this.Value = min;
    if (val > max)
        this.Value = max;
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
RangeBase.Instance._OnValueChanged = function (oldValue, newValue) {
    this.ValueChanged.Raise(this, new RoutedPropertyChangedEventArgs(oldValue, newValue));
};

Nullstone.FinishCreate(RangeBase);
//#endregion