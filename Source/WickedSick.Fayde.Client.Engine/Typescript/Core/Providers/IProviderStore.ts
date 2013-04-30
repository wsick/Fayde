/// CODE
/// <reference path="Enums.ts" />
/// <reference path="../../Runtime/BError.ts" />
/// <reference path="../DependencyProperty.ts" />

module Fayde.Providers {
    export interface IPropertyProvider {
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any;
    }
    export interface IPropertyChangedListener {
        Property: DependencyProperty;
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs);
        Detach();
    }
    export interface IProviderStore {
        GetValue(propd: DependencyProperty): any;
        GetValueSpec(propd: DependencyProperty, startingPrecedence?, endingPrecedence?): any;
        SetValue(propd: DependencyProperty, value: any);
        ClearValue(propd: DependencyProperty, notifyListeners?: bool);
        ReadLocalValue(propd: DependencyProperty): any;
        _Object: DependencyObject;
        _ProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldProviderValue: any, newProviderValue: any, notifyListeners: bool, error: BError);
    }
}