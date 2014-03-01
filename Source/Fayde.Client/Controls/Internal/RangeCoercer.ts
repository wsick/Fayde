module Fayde.Controls.Internal {
    export interface IRange {
        Minimum: number;
        Maximum: number;
        Value: number;
        OnMinimumChanged(oldMin: number, newMin: number);
        OnMaximumChanged(oldMax: number, newMax: number);
        OnValueChanged(oldVal: number, newVal: number);
    }

    export interface IRangeCoercer {
        OnMinimumChanged(oldMinimum: number, newMinimum: number): boolean;
        OnMaximumChanged(oldMaximum: number, newMaximum: number): boolean;
        OnValueChanged(oldValue: number, newValue: number): boolean;
    }
    export class RangeCoercer implements IRangeCoercer {
        InitialMax: number = 1;
        InitialVal: number = 0;
        RequestedMax: number = 1;
        RequestedVal: number = 0;
        PreCoercedMax: number = 1;
        PreCoercedVal: number = 0;
        CoerceDepth = 0;

        get Minimum(): number { return this.Range.Minimum; }
        get Maximum(): number { return this.Range.Maximum; }
        get Value(): number { return this.Range.Value; }

        constructor(public Range: IRange, public OnCoerceMaximum: (val: any) => void, public OnCoerceValue: (val: any) => void) { }

        OnMinimumChanged(oldMinimum: number, newMinimum: number): boolean {
            if (this.CoerceDepth === 0) {
                this.InitialMax = this.Maximum;
                this.InitialVal = this.Value;
            }
            this.CoerceDepth++;
            this.CoerceMaximum();
            this.CoerceValue();
            this.CoerceDepth--;
            if (this.CoerceDepth > 0)
                return false;

            this.OnMinimumChanged(oldMinimum, newMinimum);
            var max = this.Maximum;
            if (!NumberEx.AreClose(this.InitialMax, max))
                this.Range.OnMaximumChanged(this.InitialMax, max);
            var val = this.Value;
            if (!NumberEx.AreClose(this.InitialVal, val))
                this.Range.OnValueChanged(this.InitialVal, val);
            return true;
        }
        OnMaximumChanged(oldMaximum: number, newMaximum: number): boolean {
            if (this.CoerceDepth === 0) {
                this.RequestedMax = newMaximum;
                this.InitialMax = oldMaximum;
                this.InitialVal = this.Value;
            }
            this.CoerceDepth++;
            this.CoerceMaximum();
            this.CoerceValue();
            this.CoerceDepth--;
            if (this.CoerceDepth !== 0)
                return false;

            this.PreCoercedMax = newMaximum;
            var max = this.Maximum;
            if (!NumberEx.AreClose(this.InitialMax, max))
                this.OnMaximumChanged(this.InitialMax, max);
            var val = this.Value;
            if (!NumberEx.AreClose(this.InitialVal, val))
                this.OnValueChanged(this.InitialVal, val);
            return true;
        }
        OnValueChanged(oldValue: number, newValue: number): boolean {
            if (this.CoerceDepth === 0) {
                this.RequestedVal = newValue;
                this.InitialVal = oldValue;
            }
            this.CoerceDepth++;
            this.CoerceValue();
            this.CoerceDepth--;
            if (this.CoerceDepth !== 0)
                return false;

            this.PreCoercedVal = newValue;
            var val = this.Value;
            if (!NumberEx.AreClose(this.InitialVal, val))
                this.Range.OnValueChanged(this.InitialVal, val);
            return true;
        }

        CoerceMaximum() {
            var min = this.Minimum;
            var max = this.Maximum;
            if (!NumberEx.AreClose(this.RequestedMax, max) && this.RequestedMax >= min)
                this.OnCoerceMaximum(this.RequestedMax);
            else if (max < min)
                this.OnCoerceMaximum(min);
        }
        CoerceValue() {
            var min = this.Minimum;
            var max = this.Maximum;
            var val = this.Value;
            if (!NumberEx.AreClose(this.RequestedVal, val) && this.RequestedVal >= min && this.RequestedVal <= max)
                this.OnCoerceValue(this.RequestedVal);
            else if (val < min)
                this.OnCoerceValue(min);
            else if (val > max)
                this.OnCoerceValue(max);
        }
    }
}