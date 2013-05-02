var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../Control.ts" />
        /// CODE
        /// <reference path="../../Core/RoutedPropertyChangedEventArgs.ts" />
        (function (Primitives) {
            var RangeBase = (function (_super) {
                __extends(RangeBase, _super);
                function RangeBase() {
                    _super.apply(this, arguments);

                    this._LevelsFromRootCall = 0;
                    this._InitialMax = 0;
                    this._InitialVal = 0;
                    this._RequestedMax = 0;
                    this._RequestedVal = 0;
                    this.ValueChanged = new Fayde.RoutedEvent();
                }
                RangeBase.MinimumProperty = DependencyProperty.Register("Minimum", function () {
                    return Number;
                }, RangeBase, 0, function (d, args) {
                    return (d)._OnMinimumChanged(args);
                });
                RangeBase.MaximumProperty = DependencyProperty.Register("Maximum", function () {
                    return Number;
                }, RangeBase, 1, function (d, args) {
                    return (d)._OnMaximumChanged(args);
                });
                RangeBase.LargeChangeProperty = DependencyProperty.Register("LargeChange", function () {
                    return Number;
                }, RangeBase, 1, function (d, args) {
                    return (d)._OnLargeChangeChanged(args);
                });
                RangeBase.SmallChangeProperty = DependencyProperty.Register("SmallChange", function () {
                    return Number;
                }, RangeBase, 0.1, function (d, args) {
                    return (d)._OnSmallChangeChanged(args);
                });
                RangeBase.ValueProperty = DependencyProperty.Register("Value", function () {
                    return Number;
                }, RangeBase, 0, function (d, args) {
                    return (d)._OnValueChanged(args);
                });
                RangeBase.prototype._OnMinimumChanged = function (args) {
                    if(!isValidDoubleValue(args.NewValue)) {
                        throw new ArgumentException("Invalid double value for Minimum property.");
                    }
                    if(this._LevelsFromRootCall === 0) {
                        this._InitialMax = this.Maximum;
                        this._InitialVal = this.Value;
                    }
                    this._LevelsFromRootCall++;
                    this._CoerceMaximum();
                    this._CoerceValue();
                    this._LevelsFromRootCall--;
                    if(this._LevelsFromRootCall === 0) {
                        this.OnMinimumChanged(args.OldValue, args.OldValue);
                        var max = this.Maximum;
                        if(!areNumbersClose(this._InitialMax, max)) {
                            this.OnMaximumChanged(this._InitialMax, max);
                        }
                        var val = this.Value;
                        if(!areNumbersClose(this._InitialVal, val)) {
                            this.RaiseValueChanged(this._InitialVal, val);
                        }
                    }
                };
                RangeBase.prototype._OnMaximumChanged = function (args) {
                    if(!isValidDoubleValue(args.NewValue)) {
                        throw new ArgumentException("Invalid double value for Maximum property.");
                    }
                    if(this._LevelsFromRootCall === 0) {
                        this._RequestedMax = args.NewValue;
                        this._InitialMax = args.OldValue;
                        this._InitialVal = this.Value;
                    }
                    this._LevelsFromRootCall++;
                    this._CoerceMaximum();
                    this._CoerceValue();
                    this._LevelsFromRootCall--;
                    if(this._LevelsFromRootCall === 0) {
                        var max = this.Maximum;
                        if(!areNumbersClose(this._InitialMax, max)) {
                            this.OnMaximumChanged(this._InitialMax, max);
                        }
                        var val = this.Value;
                        if(!areNumbersClose(this._InitialVal, val)) {
                            this.RaiseValueChanged(this._InitialVal, val);
                        }
                    }
                };
                RangeBase.prototype._OnLargeChangeChanged = function (args) {
                    if(!isValidChange(args.NewValue)) {
                        throw new ArgumentException("Invalid Large Change Value.");
                    }
                };
                RangeBase.prototype._OnSmallChangeChanged = function (args) {
                    if(!isValidChange(args.NewValue)) {
                        throw new ArgumentException("Invalid Small Change Value.");
                    }
                };
                RangeBase.prototype._OnValueChanged = function (args) {
                    if(!isValidDoubleValue(args.NewValue)) {
                        throw new ArgumentException("Invalid double value for Value property.");
                    }
                    if(this._LevelsFromRootCall === 0) {
                        this._RequestedVal = args.NewValue;
                        this._InitialVal = args.OldValue;
                    }
                    this._LevelsFromRootCall++;
                    this._CoerceValue();
                    this._LevelsFromRootCall--;
                    if(this._LevelsFromRootCall === 0) {
                        var val = this.Value;
                        if(!areNumbersClose(this._InitialVal, val)) {
                            this.RaiseValueChanged(this._InitialVal, val);
                        }
                    }
                };
                RangeBase.prototype._CoerceMaximum = function () {
                    var min = this.Minimum;
                    var max = this.Maximum;
                    if(!areNumbersClose(this._RequestedMax, max) && this._RequestedMax >= min) {
                        this.Maximum = this._RequestedMax;
                        return;
                    }
                    if(max < min) {
                        this.Maximum = min;
                    }
                };
                RangeBase.prototype._CoerceValue = function () {
                    var min = this.Minimum;
                    var max = this.Maximum;
                    var val = this.Value;
                    if(!areNumbersClose(this._RequestedVal, val) && this._RequestedVal >= min && this._RequestedVal <= max) {
                        this.Value = this._RequestedVal;
                        return;
                    }
                    if(val < min) {
                        this.Value = min;
                    }
                    if(val > max) {
                        this.Value = max;
                    }
                };
                RangeBase.prototype.OnMinimumChanged = function (oldMin, newMin) {
                };
                RangeBase.prototype.OnMaximumChanged = function (oldMax, newMax) {
                };
                RangeBase.prototype.RaiseValueChanged = function (oldVal, newVal) {
                    this.ValueChanged.Raise(this, new Fayde.RoutedPropertyChangedEventArgs(oldVal, newVal));
                    this.OnValueChanged(oldVal, newVal);
                };
                RangeBase.prototype.OnValueChanged = function (oldVal, newVal) {
                };
                return RangeBase;
            })(Fayde.Controls.Control);
            Primitives.RangeBase = RangeBase;            
            Nullstone.RegisterType(RangeBase, "RangeBase");
            function areNumbersClose(val1, val2) {
                if(val1 === val2) {
                    return true;
                }
                var num1 = (Math.abs(val1) + Math.abs(val2) + 10) * 1.11022302462516e-16;
                var num2 = val1 - val2;
                return -num1 < num2 && num1 > num2;
            }
            function isValidChange(value) {
                if(!isValidDoubleValue(value)) {
                    return false;
                }
                return value >= 0;
            }
            function isValidDoubleValue(value) {
                if(typeof value !== "number") {
                    return false;
                }
                if(isNaN(value)) {
                    return false;
                }
                if(!isFinite(value)) {
                    return false;
                }
                return true;
            }
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RangeBase.js.map
