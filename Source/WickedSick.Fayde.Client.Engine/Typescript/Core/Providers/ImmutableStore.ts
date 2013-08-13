/// <reference path="PropertyStore.ts" />
/// CODE

module Fayde.Providers {
    export class ImmutableStore extends PropertyStore {
        static Instance: ImmutableStore;

        GetValue(storage: IPropertyStorage): any {
            return storage.Local;
        }
        GetValuePrecedence(storage: IPropertyStorage): PropertyPrecedence {
            return PropertyPrecedence.LocalValue;
        }
        SetLocalValue(storage: Providers.IPropertyStorage, newValue: any) {
            console.warn("Trying to set value for immutable property.");
        }
        ClearValue(storage: Providers.IPropertyStorage) {
            console.warn("Trying to clear value for immutable property.");
        }
        ListenToChanged(target: DependencyObject, propd: DependencyProperty, func: (sender, args: IDependencyPropertyChangedEventArgs) => void, closure: any): Providers.IPropertyChangedListener {
            return {
                Property: propd,
                OnPropertyChanged: function (sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) { },
                Detach: function () { }
            };
        }
    }
    ImmutableStore.Instance = new ImmutableStore();
}