/// <reference path="UpDownBase.ts" />

module Fayde.Controls {
    export class NumericUpDown extends UpDownBase<number> {
        private _LevelsFromRootCall: number = 0;
        private _InitialMin: number = 0.0;
        private _InitialMax: number = 100.0;
        private _InitialVal: number = 0.0;
        private _InitialInc: number = 1.0;
        private _RequestedMin: number = 0.0;
        private _RequestedMax: number = 100.0;
        private _RequestedVal: number = 0.0;
        private _RequestedInc: number = 1.0;

        private _Interaction: Internal.InteractionHelper;

        static ValueProperty = DependencyProperty.Register("Value", () => Number, NumericUpDown, 0.0, (d, args) => (<NumericUpDown>d)._OnValueChanged(args));

        static MinimumProperty = DependencyProperty.Register("Minimum", () => Number, NumericUpDown, 0.0, (d, args) => (<NumericUpDown>d)._OnMinimumChanged(args));
        Minimum: number;
        private _OnMinimumChanged(args: IDependencyPropertyChangedEventArgs) {
            this._EnsureValidDoubleValue(args.Property, args.OldValue, args.NewValue);
            if (this._LevelsFromRootCall === 0) {
                this._RequestedMin = <number>args.NewValue;
                this._InitialMin = <number>args.OldValue;
                this._InitialMax = this.Maximum;
                this._InitialVal = this.Value;
                ++this._LevelsFromRootCall;
                if (this.Minimum != this._RequestedMin)
                    this.Minimum = this._RequestedMin;
                --this._LevelsFromRootCall;
            }
            ++this._LevelsFromRootCall;
            this.CoerceMaximum();
            this.CoerceValue();
            --this._LevelsFromRootCall;
            if (this._LevelsFromRootCall != 0)
                return;
            var minimum = this.Minimum;
            if (this._InitialMin !== minimum) {
                this.OnMinimumChanged(this._InitialMin, minimum);
            }
            var maximum = this.Maximum;
            if (this._InitialMax !== maximum) {
                this.OnMaximumChanged(this._InitialMax, maximum);
            }
            this.SetValidSpinDirection();
        }
        OnMinimumChanged(oldMinimum: number, newMinimum: number) { }

        static MaximumProperty = DependencyProperty.Register("Maximum", () => Number, NumericUpDown, 100.0, (d, args) => (<NumericUpDown>d)._OnMaximumChanged(args));
        Maximum: number;
        private _OnMaximumChanged(args: IDependencyPropertyChangedEventArgs) {
            this._EnsureValidDoubleValue(args.Property, args.OldValue, args.NewValue);
            if (this._LevelsFromRootCall === 0) {
                this._RequestedMax = <number>args.NewValue;
                this._InitialMax = <number>args.OldValue;
                this._InitialVal = this.Value;
            }
            ++this._LevelsFromRootCall;
            this.CoerceMaximum();
            this.CoerceValue();
            --this._LevelsFromRootCall;
            if (this._LevelsFromRootCall !== 0)
                return;
            var maximum = this.Maximum;
            if (this._InitialMax !== maximum) {
                this.OnMaximumChanged(this._InitialMax, maximum);
            }
            this.SetValidSpinDirection();
        }
        OnMaximumChanged(oldMaximum: number, newMaximum: number) { }

        static IncrementProperty = DependencyProperty.Register("Increment", () => Number, NumericUpDown, 1.0, (d, args) => (<NumericUpDown>d)._OnIncrementChanged(args));
        Increment: number;
        private _OnIncrementChanged(args: IDependencyPropertyChangedEventArgs) {
            this._EnsureValidIncrementValue(args);
            if (this._LevelsFromRootCall === 0) {
                this._RequestedInc = <number>args.NewValue;
                this._InitialInc = <number>args.OldValue;
                ++this._LevelsFromRootCall;
                if (this.Increment !== this._RequestedInc)
                    this.Increment = this._RequestedInc;
                --this._LevelsFromRootCall;
            }
            if (this._LevelsFromRootCall !== 0)
                return;
            var increment = this.Increment;
            if (this._InitialInc !== increment) {
                this.OnIncrementChanged(this._InitialInc, increment);
            }
        }
        OnIncrementChanged(oldIncrement: number, newIncrement: number) { }

        static DecimalPlacesProperty = DependencyProperty.Register("DecimalPlaces", () => Number, NumericUpDown, 0, (d, args) => (<NumericUpDown>d)._OnDecimalPlacesChanged(args));
        DecimalPlaces: number;
        private _OnDecimalPlacesChanged(args: IDependencyPropertyChangedEventArgs) {
            this._EnsureValidDecimalPlacesValue(args);
            this.OnDecimalPlacesChanged(args.OldValue, args.NewValue);
        }
        OnDecimalPlacesChanged(oldDecimalPlaces: number, newDecimalPlaces: number) {
            ++this._LevelsFromRootCall;
            this.SetTextBoxText();
            --this._LevelsFromRootCall;
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this._Interaction = new Internal.InteractionHelper(this);
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.SetValidSpinDirection();
        }

        private SetValidSpinDirection() {
            var validSpinDirections = ValidSpinDirections.None;
            if (this.Value < this.Maximum)
                validSpinDirections |= ValidSpinDirections.Increase;
            if (this.Value > this.Minimum)
                validSpinDirections |= ValidSpinDirections.Decrease;
            if (!this._Spinner)
                return;
            this._Spinner.ValidSpinDirection = validSpinDirections;
        }

        OnValueChanging(e: RoutedPropertyChangingEventArgs<number>) {
            if (this._LevelsFromRootCall === 0) {
                this._EnsureValidDoubleValue(e.Property, e.OldValue, e.NewValue);
                this._InitialVal = e.OldValue;
                this._RequestedVal = e.NewValue;
                e.InCoercion = true;
            }
            ++this._LevelsFromRootCall;
            this.CoerceValue();
            --this._LevelsFromRootCall;
            if (this._LevelsFromRootCall != 0)
                return;
            e.InCoercion = false;
            if (this._InitialVal !== this.Value) {
                e.NewValue = this.Value;
                super.OnValueChanging(e);
            }
        }
        OnValueChanged(e: RoutedPropertyChangedEventArgs<number>) {
            this.SetValidSpinDirection();
            super.OnValueChanged(e);
        }

        ParseValue(text: string) {
            return parseFloat(text);
        }
        FormatValue(): string {
            return this.Value.toFixed(this.DecimalPlaces);
        }
        OnIncrement() {
            this.Value = this.Value + this.Increment;
            this._RequestedVal = this.Value;
        }
        OnDecrement() {
            this.Value = this.Value - this.Increment;
            this._RequestedVal = this.Value;
        }

        private CoerceMaximum() {
            var minimum = this.Minimum;
            var maximum = this.Maximum;
            if (this._RequestedMax !== maximum) {
                if (this._RequestedMax >= minimum) {
                    this.SetValue(NumericUpDown.MaximumProperty, this._RequestedMax);
                } else {
                    if (maximum === minimum)
                        return;
                    this.SetValue(NumericUpDown.MaximumProperty, minimum);
                }
            } else {
                if (maximum >= minimum)
                    return;
                this.SetValue(NumericUpDown.MaximumProperty, minimum);
            }
        }
        private CoerceValue() {
            var minimum = this.Minimum;
            var maximum = this.Maximum;
            var num = this.Value;
            if (this._RequestedVal !== num) {
                if (this._RequestedVal >= minimum && this._RequestedVal <= maximum) {
                    this.Value = this._RequestedVal;
                } else if (this._RequestedVal < minimum && num !== minimum) {
                    this.Value = minimum;
                } else {
                    if (this._RequestedVal <= maximum || num === maximum)
                        return;
                    this.Value = maximum;
                }
            } else if (num < minimum) {
                this.Value = minimum;
            } else {
                if (num <= maximum)
                    return;
                this.Value = maximum;
            }
        }

        private _EnsureValidDoubleValue(propd: DependencyProperty, oldValue: number, newValue: number) {
            var ov: IOutValue = { Value: 0.0 };
            if (isValidDoubleValue(newValue, ov))
                return;
            ++this._LevelsFromRootCall;
            this.SetValue(propd, oldValue);
            --this._LevelsFromRootCall;
            throw new ArgumentException("Invalid double value.");
        }
        private _EnsureValidIncrementValue(e: IDependencyPropertyChangedEventArgs) {
            var ov: IOutValue = { Value: 0 };
            if (isValidDoubleValue(e.NewValue, ov) && ov.Value > 0.0)
                return;
            ++this._LevelsFromRootCall;
            this.SetValue(e.Property, e.OldValue);
            --this._LevelsFromRootCall;
            throw new ArgumentException("Invalid increment value.");
        }
        private _EnsureValidDecimalPlacesValue(e: IDependencyPropertyChangedEventArgs) {
            var num = e.NewValue;
            if (num >= 0 && num <= 15)
                return;
            ++this._LevelsFromRootCall;
            this.DecimalPlaces = e.OldValue;
            --this._LevelsFromRootCall;
            throw new ArgumentException("Invalid decimal places value.");
        }
    }

    function isValidDoubleValue(value: any, outValue: IOutValue): boolean {
        return !isNaN(value) && isFinite(value) && value <= 7.92281625142643E+28 && value >= -7.92281625142643E+28;
    }
}