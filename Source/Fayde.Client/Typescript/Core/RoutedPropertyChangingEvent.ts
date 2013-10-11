/// <reference path="RoutedEvent.ts" />
/// CODE

module Fayde {
    export class RoutedPropertyChangingEvent<T> extends RoutedEvent<RoutedPropertyChangingEventArgs<T>> {
    }
    Fayde.RegisterType(RoutedPropertyChangingEvent, {
    	Name: "RoutedPropertyChangingEvent",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });

    export class RoutedPropertyChangingEventArgs<T> extends RoutedEventArgs {
        Property: DependencyProperty;
        OldValue: T;
        NewValue: T;
        private _IsCancelable: boolean;
        get IsCancellable() { return this._IsCancelable; }
        private _Cancel: boolean = false;
        get Cancel(): boolean { return this._Cancel; }
        set Cancel(value: boolean) {
            if (this._IsCancelable)
                this._Cancel = value;
            else if (value)
                throw new InvalidOperationException("Not cancelable.");
        }
        InCoercion: boolean = false;
        constructor(propd: DependencyProperty, oldValue: T, newValue: T, isCancelable: boolean) {
            super();
            this.Property = propd;
            this.OldValue = oldValue;
            this.NewValue = newValue;
            this._IsCancelable = isCancelable;
        }
    }
    Fayde.RegisterType(RoutedPropertyChangingEventArgs, {
    	Name: "RoutedPropertyChangingEventArgs",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}