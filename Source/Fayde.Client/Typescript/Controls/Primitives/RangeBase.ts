/// <reference path="../Control.ts" />

module Fayde.Controls.Primitives {
    export class RangeBase extends Controls.Control {
        private _LevelsFromRootCall: number = 0;
        private _InitialMax: number = 0;
        private _InitialVal: number = 0;
        private _RequestedMax: number = 0;
        private _RequestedVal: number = 0;

        static MinimumProperty: DependencyProperty = DependencyProperty.Register("Minimum", () => Number, RangeBase, 0, (d, args) => (<RangeBase>d)._OnMinimumChanged(args));
        static MaximumProperty: DependencyProperty = DependencyProperty.Register("Maximum", () => Number, RangeBase, 1, (d, args) => (<RangeBase>d)._OnMaximumChanged(args));
        static LargeChangeProperty: DependencyProperty = DependencyProperty.Register("LargeChange", () => Number, RangeBase, 1, (d, args) => (<RangeBase>d)._OnLargeChangeChanged(args));
        static SmallChangeProperty: DependencyProperty = DependencyProperty.Register("SmallChange", () => Number, RangeBase, 0.1, (d, args) => (<RangeBase>d)._OnSmallChangeChanged(args));
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Number, RangeBase, 0, (d, args) => (<RangeBase>d)._OnValueChanged(args));

        Minimum: number;
        Maximum: number;
        SmallChange: number;
        LargeChange: number;
        Value: number;

        ValueChanged: RoutedPropertyChangedEvent<number> = new RoutedPropertyChangedEvent<number>();

        private _OnMinimumChanged(args: IDependencyPropertyChangedEventArgs) {
            if (!isValidDoubleValue(args.NewValue))
                throw new ArgumentException("Invalid double value for Minimum property.");
            if (this._LevelsFromRootCall === 0) {
                this._InitialMax = this.Maximum;
                this._InitialVal = this.Value;
            }
            this._LevelsFromRootCall++;
            this._CoerceMaximum();
            this._CoerceValue();
            this._LevelsFromRootCall--;
            if (this._LevelsFromRootCall === 0) {
                this.OnMinimumChanged(args.OldValue, args.OldValue);
                var max = this.Maximum;
                if (!areNumbersClose(this._InitialMax, max)) {
                    this.OnMaximumChanged(this._InitialMax, max);
                }
                var val = this.Value;
                if (!areNumbersClose(this._InitialVal, val)) {
                    this.RaiseValueChanged(this._InitialVal, val);
                }
            }
        }
        private _OnMaximumChanged(args: IDependencyPropertyChangedEventArgs) {
            if (!isValidDoubleValue(args.NewValue))
                throw new ArgumentException("Invalid double value for Maximum property.");
            if (this._LevelsFromRootCall === 0) {
                this._RequestedMax = args.NewValue;
                this._InitialMax = args.OldValue;
                this._InitialVal = this.Value;
            }
            this._LevelsFromRootCall++;
            this._CoerceMaximum();
            this._CoerceValue();
            this._LevelsFromRootCall--;
            if (this._LevelsFromRootCall === 0) {
                var max = this.Maximum;
                if (!areNumbersClose(this._InitialMax, max)) {
                    this.OnMaximumChanged(this._InitialMax, max);
                }
                var val = this.Value;
                if (!areNumbersClose(this._InitialVal, val)) {
                    this.RaiseValueChanged(this._InitialVal, val);
                }
            }
        }
        private _OnLargeChangeChanged(args: IDependencyPropertyChangedEventArgs) {
            if (!isValidChange(args.NewValue))
                throw new ArgumentException("Invalid Large Change Value.");
        }
        private _OnSmallChangeChanged(args: IDependencyPropertyChangedEventArgs) {
            if (!isValidChange(args.NewValue))
                throw new ArgumentException("Invalid Small Change Value.");
        }
        private _OnValueChanged(args: IDependencyPropertyChangedEventArgs) {
            if (!isValidDoubleValue(args.NewValue))
                throw new ArgumentException("Invalid double value for Value property.");
            if (this._LevelsFromRootCall === 0) {
                this._RequestedVal = args.NewValue;
                this._InitialVal = args.OldValue;
            }
            this._LevelsFromRootCall++;
            this._CoerceValue();
            this._LevelsFromRootCall--;
            if (this._LevelsFromRootCall === 0) {
                var val = this.Value;
                if (!areNumbersClose(this._InitialVal, val)) {
                    this.RaiseValueChanged(this._InitialVal, val);
                }
            }
        }

        private _CoerceMaximum() {
            var min = this.Minimum;
            var max = this.Maximum;
            if (!areNumbersClose(this._RequestedMax, max) && this._RequestedMax >= min) {
                this.Maximum = this._RequestedMax;
                return;
            }
            if (max < min)
                this.Maximum = min;
        }
        private _CoerceValue() {
            var min = this.Minimum;
            var max = this.Maximum;
            var val = this.Value;
            if (!areNumbersClose(this._RequestedVal, val) && this._RequestedVal >= min && this._RequestedVal <= max) {
                this.Value = this._RequestedVal;
                return;
            }
            if (val < min)
                this.Value = min;
            if (val > max)
                this.Value = max;
        }

        OnMinimumChanged(oldMin: number, newMin: number) { }
        OnMaximumChanged(oldMax: number, newMax: number) { }
        private RaiseValueChanged(oldVal: number, newVal: number) {
            this.ValueChanged.Raise(this, new RoutedPropertyChangedEventArgs(oldVal, newVal));
            this.OnValueChanged(oldVal, newVal);
        }
        OnValueChanged(oldVal: number, newVal: number) { }
    }
    Fayde.RegisterType(RangeBase, {
    	Name: "RangeBase",
    	Namespace: "Fayde.Controls.Primitives",
    	XmlNamespace: Fayde.XMLNS
    });

    function areNumbersClose(val1: number, val2: number): boolean {
        if (val1 === val2)
            return true;
        var num1 = (Math.abs(val1) + Math.abs(val2) + 10) * 1.11022302462516E-16;
        var num2 = val1 - val2;
        return -num1 < num2 && num1 > num2;
    }
    function isValidChange(value: number): boolean {
        if (!isValidDoubleValue(value))
            return false;
        return value >= 0;
    }
    function isValidDoubleValue(value: number): boolean {
        if (typeof value !== "number")
            return false;
        if (isNaN(value))
            return false;
        if (!isFinite(value))
            return false;
        return true;
    }
}