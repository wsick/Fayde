/// <reference path="Fayde.d.ts" />
/// <reference path="_.ts" />

module Fayde.Controls.Input {
    export class Spinner extends Control {
        static ValidSpinDirectionProperty = DependencyProperty.Register("ValidSpinDirection", () => new Enum(ValidSpinDirections), Spinner, ValidSpinDirections.Increase, (d, args) => (<Spinner>d).OnValidSpinDirectionChanged(args));
        ValidSpinDirection: ValidSpinDirections;
        OnValidSpinDirectionChanged(args: IDependencyPropertyChangedEventArgs) {
            this.UpdateVisualState(true);
        }

        Spin = new RoutedEvent<SpinEventArgs>();
        OnSpin(e: SpinEventArgs) {
            var valid = e.Direction === SpinDirection.Increase ? ValidSpinDirections.Increase : ValidSpinDirections.Decrease;
            if ((this.ValidSpinDirection & valid) !== valid)
                throw new InvalidOperationException("Invalid Spin Direction");
            this.Spin.Raise(this, e);
        }

        GetVisualStateNamesToActivate(): string[] {
            var names = super.GetVisualStateNamesToActivate();
            var vsp = this.ValidSpinDirection;
            names.push(((vsp & ValidSpinDirections.Increase) === ValidSpinDirections.Increase) ? "IncreaseEnabled" : "IncreaseDisabled");
            names.push(((vsp & ValidSpinDirections.Decrease) === ValidSpinDirections.Decrease) ? "DecreaseEnabled" : "DecreaseDisabled");
            return names;
        }
    }
    Fayde.RegisterType(Spinner, {
        Name: "Spinner",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: Input.XMLNS
    });
}