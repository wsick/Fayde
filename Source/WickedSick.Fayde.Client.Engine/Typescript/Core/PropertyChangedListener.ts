/// CODE
/// <reference path="DependencyObject.ts" />

module Fayde {
    export function CreatePropertyChangedListener(property: DependencyProperty, func: (sender, args: IDependencyPropertyChangedEventArgs) => void , closure: any): Providers.IPropertyChangedListener {
        return {
            Detach: function () { },
            Property: property,
            OnPropertyChanged: function (sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) { func.call(closure, sender, args); }
        };
    }
    export function ListenToPropertyChanged(target: DependencyObject, property: DependencyProperty, func: (sender, args: IDependencyPropertyChangedEventArgs) => void , closure: any): Providers.IPropertyChangedListener {
        var listener = CreatePropertyChangedListener(property, func, closure);
        listener.Detach = function () { target._Store._UnsubscribePropertyChanged(listener); };
        target._Store._SubscribePropertyChanged(listener);
        return listener;
    }
}