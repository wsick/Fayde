/// <reference path="RoutedEvent.ts" />

module Fayde {
    export class RoutedPropertyChangedEvent<T> extends RoutedEvent<RoutedPropertyChangedEventArgs<T>> {
    }
    Fayde.RegisterType(RoutedPropertyChangedEvent, {
    	Name: "RoutedPropertyChangedEvent",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });

    export class RoutedPropertyChangedEventArgs<T> extends RoutedEventArgs {
        OldValue: T;
        NewValue: T;
        constructor(oldValue: T, newValue: T) {
            super();
            Object.defineProperty(this, "OldValue", { value: oldValue, writable: false });
            Object.defineProperty(this, "NewValue", { value: newValue, writable: false });
        }
    }
    Fayde.RegisterType(RoutedPropertyChangedEventArgs, {
    	Name: "RoutedPropertyChangedEventArgs",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}