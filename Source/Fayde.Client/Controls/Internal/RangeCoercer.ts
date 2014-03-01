module Fayde.Controls.Internal {
    export interface IRange {
        Minimum: number;
        Maximum: number;
        Value: number;
        OnMinimumChanged(oldMin: number, newMin: number);
        OnMaximumChanged(oldMax: number, newMax: number);
        OnValueChanged(oldVal: number, newVal: number);
    }

    export class RangeCoercer {
        private _InitialMax: number = 1;
        private _InitialVal: number = 0;
        private _RequestedMax: number = 1;
        private _RequestedVal: number = 0;
        private _PreCoercedMax: number = 1;
        private _PreCoercedVal: number = 0;
        private _CoerceDepth = 0;

        get Minimum(): number { return this.Range.Minimum; }
        get Maximum(): number { return this.Range.Maximum; }
        get Value(): number { return this.Range.Value; }

        constructor(public Range: IRange, public OnCoerceMaximum: (val: any) => void, public OnCoerceValue: (val: any) => void) { }

        OnMinimumChanged(oldMinimum: number, newMinimum: number) {
            if (this._CoerceDepth === 0) {
                this._InitialMax = this.Maximum;
                this._InitialVal = this.Value;
            }
            this._CoerceDepth++;
            this.CoerceMaximum();
            this.CoerceValue();
            this._CoerceDepth--;
            if (this._CoerceDepth > 0)
                return;

            this.OnMinimumChanged(oldMinimum, newMinimum);
            var max = this.Maximum;
            if (!NumberEx.AreClose(this._InitialMax, max))
                this.Range.OnMaximumChanged(this._InitialMax, max);
            var val = this.Value;
            if (!NumberEx.AreClose(this._InitialVal, val))
                this.Range.OnValueChanged(this._InitialVal, val);
        }
        OnMaximumChanged(oldMaximum: number, newMaximum: number) {
            if (this._CoerceDepth === 0) {
                this._RequestedMax = newMaximum;
                this._InitialMax = oldMaximum;
                this._InitialVal = this.Value;
            }
            this._CoerceDepth++;
            this.CoerceMaximum();
            this.CoerceValue();
            this._CoerceDepth--;
            if (this._CoerceDepth !== 0)
                return;

            this._PreCoercedMax = newMaximum;
            var max = this.Maximum;
            if (!NumberEx.AreClose(this._InitialMax, max))
                this.OnMaximumChanged(this._InitialMax, max);
            var val = this.Value;
            if (!NumberEx.AreClose(this._InitialVal, val))
                this.OnValueChanged(this._InitialVal, val);
        }
        OnValueChanged(oldValue: number, newValue: number) {
            if (this._CoerceDepth === 0) {
                this._RequestedVal = newValue;
                this._InitialVal = oldValue;
            }
            this._CoerceDepth++;
            this.CoerceValue();
            this._CoerceDepth--;
            if (this._CoerceDepth !== 0)
                return;

            this._PreCoercedVal = newValue;
            var val = this.Value;
            if (!NumberEx.AreClose(this._InitialVal, val))
                this.Range.OnValueChanged(this._InitialVal, val);
        }

        CoerceMaximum() {
            var min = this.Minimum;
            var max = this.Maximum;
            if (!NumberEx.AreClose(this._RequestedMax, max) && this._RequestedMax >= min)
                this.OnCoerceMaximum(this._RequestedMax);
            else if (max < min)
                this.OnCoerceMaximum(min);
        }
        CoerceValue() {
            var min = this.Minimum;
            var max = this.Maximum;
            var val = this.Value;
            if (!NumberEx.AreClose(this._RequestedVal, val) && this._RequestedVal >= min && this._RequestedVal <= max)
                this.OnCoerceValue(this._RequestedVal);
            else if (val < min)
                this.OnCoerceValue(min);
            else if (val > max)
                this.OnCoerceValue(max);
        }
    }
}