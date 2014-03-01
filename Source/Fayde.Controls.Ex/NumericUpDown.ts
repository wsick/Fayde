/// <reference path="UpDownBase.ts" />
/// <reference path="Spinner.ts" />

module Fayde.Controls {
    export class NumericUpDown extends Control {
        static MinimumProperty = DependencyProperty.Register("Minimum", () => Number, NumericUpDown, 0.0, (d, args) => (<NumericUpDown>d)._Coercer.OnMinimumChanged(args.OldValue, args.NewValue));
        static MaximumProperty = DependencyProperty.Register("Maximum", () => Number, NumericUpDown, 100.0, (d, args) => (<NumericUpDown>d)._Coercer.OnMaximumChanged(args.OldValue, args.NewValue));
        static ValueProperty = DependencyProperty.Register("Value", () => Number, NumericUpDown, 0.0, (d, args) => (<NumericUpDown>d)._Coercer.OnValueChanged(args.OldValue, args.NewValue));
        static IncrementProperty = DependencyProperty.Register("Increment", () => Number, NumericUpDown, 1.0, (d, args) => (<NumericUpDown>d).OnIncrementChanged(args.OldValue, args.NewValue));
        static DecimalPlacesProperty = DependencyProperty.Register("DecimalPlaces", () => Number, NumericUpDown, 0, (d, args) => (<NumericUpDown>d)._Coercer.OnDecimalPlacesChanged(args.OldValue, args.NewValue));
        static SpinnerStyleProperty = DependencyProperty.Register("SpinnerStyle", () => Style, NumericUpDown);
        static IsEditableProperty = DependencyProperty.Register("IsEditable", () => Boolean, NumericUpDown, true, (d, args) => (<NumericUpDown>d)._OnIsEditableChanged(args));

        Minimum: number;
        Maximum: number;
        Value: number;
        Increment: number;
        DecimalPlaces: number;
        SpinnerStyle: Style;
        IsEditable: boolean;

        OnMinimumChanged(oldMinimum: number, newMinimum: number) {
            this.UpdateValidSpinDirection();
        }
        OnMaximumChanged(oldMaximum: number, newMaximum: number) {
            this.UpdateValidSpinDirection();
        }
        OnValueChanged(oldValue: number, newValue: number) {
            this.UpdateValidSpinDirection();
            this._Formatter.UpdateTextBoxText();
        }
        OnIncrementChanged(oldIncrement: number, newIncrement: number) { }
        OnDecimalPlacesChanged(oldDecimalPlaces: number, newDecimalPlaces: number) { }
        private _OnIsEditableChanged(args: IDependencyPropertyChangedEventArgs) {
            this._Formatter.UpdateIsEditable();
        }
        
        ValueChanging = new RoutedPropertyChangingEvent<number>();
        Parsing = new RoutedEvent<UpDownParsingEventArgs<number>>();
        ParseError = new RoutedEvent<UpDownParseErrorEventArgs>();

        private _Coercer: Internal.IFormattedRangeCoercer;
        private _Formatter: Internal.ITextBoxFormatter;
        private _Spinner: Spinner = null;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this._Coercer = new Internal.FormattedRangeCoercer(this,
                (val) => this.SetCurrentValue(NumericUpDown.MaximumProperty, val),
                (val) => this.SetCurrentValue(NumericUpDown.ValueProperty, val),
                () => this._Formatter.UpdateTextBoxText());
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();

            if (this._Spinner)
                this._Spinner.Spin.Unsubscribe(this.Spinner_Spin, this);
            this._Spinner = <Spinner>this.GetTemplateChild("Spinner", Spinner);
            if (this._Spinner)
                this._Spinner.Spin.Subscribe(this.Spinner_Spin, this);

            if (this._Formatter)
                this._Formatter.Dispose();
            this._Formatter = new Internal.TextBoxFormatter<number>(this, <TextBox>this.GetTemplateChild("Text", TextBox),
                (val) => this.SetCurrentValue(NumericUpDown.ValueProperty, val));

            this.UpdateValidSpinDirection();
            this.UpdateVisualState(false);
        }
        
        OnKeyDown(e: Fayde.Input.KeyEventArgs) {
            super.OnKeyDown(e);
            if (e.Handled)
                return;
            switch (e.Key) {
                case Fayde.Input.Key.Enter:
                    this._Formatter.ProcessUserInput();
                    e.Handled = true;
                    break;
                case Fayde.Input.Key.Up:
                    this.DoIncrement();
                    e.Handled = true;
                    break;
                case Fayde.Input.Key.Down:
                    this.DoDecrement();
                    e.Handled = true;
                    break;
            }
        }
        OnMouseWheel(e: Fayde.Input.MouseWheelEventArgs) {
            super.OnMouseWheel(e);
            if (e.Handled)
                return;
            if (e.Delta < 0)
                this.DoDecrement();
            else if (0 < e.Delta)
                this.DoIncrement();
            e.Handled = true;
        }

        private Spinner_Spin(sender: any, e: SpinEventArgs) {
            this._Formatter.ProcessUserInput();
            if (!this._Spinner)
                return;
            if (e.Direction === SpinDirection.Increase)
                this.DoIncrement();
            else
                this.DoDecrement();
        }

        private UpdateValidSpinDirection() {
            var validSpinDirections = ValidSpinDirections.None;
            if (this.Value < this.Maximum)
                validSpinDirections |= ValidSpinDirections.Increase;
            if (this.Value > this.Minimum)
                validSpinDirections |= ValidSpinDirections.Decrease;
            if (this._Spinner)
                this._Spinner.ValidSpinDirection = validSpinDirections;
        }

        ParseValue(text: string): number {
            return parseFloat(text);
        }
        FormatValue(val: number): string {
            return val.toFixed(this.DecimalPlaces);
        }

        private DoIncrement() {
            if (this._Spinner && (this._Spinner.ValidSpinDirection & ValidSpinDirections.Increase) === ValidSpinDirections.Increase)
                this.OnIncrement();
        }
        OnIncrement() {
            this.Value = this.Value + this.Increment;
            (<any>this._Coercer).RequestedVal = this.Value;
        }
        private DoDecrement() {
            if (this._Spinner && (this._Spinner.ValidSpinDirection & ValidSpinDirections.Decrease) === ValidSpinDirections.Decrease)
                this.OnDecrement();
        }
        OnDecrement() {
            this.Value = this.Value - this.Increment;
            (<any>this._Coercer).RequestedVal = this.Value;
        }
    }
    TemplateVisualStates(NumericUpDown,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Pressed" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "FocusStates", Name: "Unfocused" },
        { GroupName: "FocusStates", Name: "Focused" },
        { GroupName: "ValidationStates", Name: "Valid" },
        { GroupName: "ValidationStates", Name: "InvalidUnfocused" },
        { GroupName: "ValidationStates", Name: "InvalidFocused" });
    TemplateParts(NumericUpDown,
        { Name: "Text", Type: TextBox },
        { Name: "Spinner", Type: Spinner });

    function numberValidator(d: DependencyObject, propd: DependencyProperty, value: any): boolean {
        if (typeof value !== "number")
            return false;
        if (isNaN(value))
            return false;
        if (!isFinite(value))
            return false;
        return true;
    }
    function decimalPlacesValidator(d: DependencyObject, propd: DependencyProperty, value: any): boolean {
        if (!numberValidator(d, propd, value))
            return false;
        return value >= 0 && value <= 15;
    }
}