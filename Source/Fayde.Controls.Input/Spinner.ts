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
        
        GoToStates(gotoFunc: (state: string) => boolean) {
            super.GoToStates(gotoFunc);
            this.GoToStateIncrease(gotoFunc);
            this.GoToStateDecrease(gotoFunc);
        }
        GoToStateIncrease(gotoFunc: (state: string) => boolean): boolean {
            return gotoFunc(((this.ValidSpinDirection & ValidSpinDirections.Increase) === ValidSpinDirections.Increase) ? "IncreaseEnabled" : "IncreaseDisabled");
        }
        GoToStateDecrease(gotoFunc: (state: string) => boolean): boolean {
            return gotoFunc(((this.ValidSpinDirection & ValidSpinDirections.Decrease) === ValidSpinDirections.Decrease) ? "DecreaseEnabled" : "DecreaseDisabled");
        }
    }
    Fayde.RegisterType(Spinner, {
        Name: "Spinner",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: Input.XMLNS
    });
}