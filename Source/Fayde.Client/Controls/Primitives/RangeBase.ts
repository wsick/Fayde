/// <reference path="../Control.ts" />

module Fayde.Controls.Primitives {
    function numberValidator(d: DependencyObject, propd: DependencyProperty, value: any): boolean {
        if (typeof value !== "number")
            return false;
        if (isNaN(value))
            return false;
        if (!isFinite(value))
            return false;
        return true;
    }
    function changeValidator(d: DependencyObject, propd: DependencyProperty, value: any): boolean {
        if (!numberValidator(d, propd, value))
            return false;
        return value >= 0;
    }

    export class RangeBase extends Controls.Control {
        private _LevelsFromRootCall: number = 0;
        private _InitialMax: number = 1;
        private _InitialVal: number = 0;
        private _RequestedMax: number = 1;
        private _RequestedVal: number = 0;
        private _PreCoercedMax: number = 1;
        private _PreCoercedVal: number = 0;

        static MinimumProperty = DependencyProperty.RegisterFull("Minimum", () => Number, RangeBase, 0, (d, args) => (<RangeBase>d)._OnMinimumChanged(args), undefined, false, numberValidator);
        static MaximumProperty = DependencyProperty.RegisterFull("Maximum", () => Number, RangeBase, 1, (d, args) => (<RangeBase>d)._OnMaximumChanged(args), undefined, false, numberValidator);
        static LargeChangeProperty = DependencyProperty.RegisterFull("LargeChange", () => Number, RangeBase, 1, undefined, undefined, false, changeValidator);
        static SmallChangeProperty = DependencyProperty.RegisterFull("SmallChange", () => Number, RangeBase, 0.1, undefined, undefined, false, changeValidator);
        static ValueProperty = DependencyProperty.RegisterFull("Value", () => Number, RangeBase, 0, (d, args) => (<RangeBase>d)._OnValueChanged(args), undefined, false, numberValidator);

        Minimum: number;
        Maximum: number;
        SmallChange: number;
        LargeChange: number;
        Value: number;

        ValueChanged = new RoutedPropertyChangedEvent<number>();

        OnMinimumChanged(oldMin: number, newMin: number) { }
        OnMaximumChanged(oldMax: number, newMax: number) { }
        private RaiseValueChanged(oldVal: number, newVal: number) {
            this.ValueChanged.Raise(this, new RoutedPropertyChangedEventArgs(oldVal, newVal));
            this.OnValueChanged(oldVal, newVal);
        }
        OnValueChanged(oldVal: number, newVal: number) { }

        private _OnMinimumChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._LevelsFromRootCall === 0) {
                this._InitialMax = this.Maximum;
                this._InitialVal = this.Value;
            }
            this._LevelsFromRootCall++;
            this._CoerceMaximum();
            this._CoerceValue();
            this._LevelsFromRootCall--;
            if (this._LevelsFromRootCall !== 0)
                return;

            this.OnMinimumChanged(args.OldValue, args.OldValue);
            var max = this.Maximum;
            if (!areNumbersClose(this._InitialMax, max))
                this.OnMaximumChanged(this._InitialMax, max);
            var val = this.Value;
            if (!areNumbersClose(this._InitialVal, val))
                this.RaiseValueChanged(this._InitialVal, val);
        }
        private _OnMaximumChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._LevelsFromRootCall === 0) {
                this._RequestedMax = args.NewValue;
                this._InitialMax = args.OldValue;
                this._InitialVal = this.Value;
            }
            this._LevelsFromRootCall++;
            this._CoerceMaximum();
            this._CoerceValue();
            this._LevelsFromRootCall--;
            if (this._LevelsFromRootCall !== 0)
                return;

            this._PreCoercedMax = args.NewValue;
            var max = this.Maximum;
            if (!areNumbersClose(this._InitialMax, max))
                this.OnMaximumChanged(this._InitialMax, max);
            var val = this.Value;
            if (!areNumbersClose(this._InitialVal, val))
                this.RaiseValueChanged(this._InitialVal, val);
        }
        private _OnValueChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._LevelsFromRootCall === 0) {
                this._RequestedVal = args.NewValue;
                this._InitialVal = args.OldValue;
            }
            this._LevelsFromRootCall++;
            this._CoerceValue();
            this._LevelsFromRootCall--;
            if (this._LevelsFromRootCall !== 0)
                return;

            this._PreCoercedVal = args.NewValue;
            var val = this.Value;
            if (!areNumbersClose(this._InitialVal, val))
                this.RaiseValueChanged(this._InitialVal, val);
        }

        private _CoerceMaximum() {
            var min = this.Minimum;
            var max = this.Maximum;
            if (!areNumbersClose(this._RequestedMax, max) && this._RequestedMax >= min)
                this.SetStoreValue(RangeBase.MaximumProperty, this._RequestedMax);
            else if (max < min)
                this.SetStoreValue(RangeBase.MaximumProperty, min);
        }
        private _CoerceValue() {
            var min = this.Minimum;
            var max = this.Maximum;
            var val = this.Value;
            if (!areNumbersClose(this._RequestedVal, val) && this._RequestedVal >= min && this._RequestedVal <= max)
                this.SetStoreValue(RangeBase.ValueProperty, this._RequestedVal);
            else if (val < min)
                this.SetStoreValue(RangeBase.ValueProperty, min);
            else if (val > max)
                this.SetStoreValue(RangeBase.ValueProperty, max);
        }
    }
    Fayde.RegisterType(RangeBase, "Fayde.Controls.Primitives", Fayde.XMLNS);

    function areNumbersClose(val1: number, val2: number): boolean {
        if (val1 === val2)
            return true;
        var num1 = (Math.abs(val1) + Math.abs(val2) + 10) * 1.11022302462516E-16;
        var num2 = val1 - val2;
        return -num1 < num2 && num1 > num2;
    }
}