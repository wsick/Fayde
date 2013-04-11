/// CODE
/// <reference path="../../Runtime/BError.ts" />
/// <reference path="../DependencyProperty.ts" />

module Fayde.Providers {
    export enum _PropertyPrecedence {
        IsEnabled = 0,
        LocalValue = 1,
        DynamicValue = 2,

        LocalStyle = 3,
        ImplicitStyle = 4,

        Inherited = 5,
        InheritedDataContext = 6,
        DefaultValue = 7,
        AutoCreate = 8,
        Lowest = 8,
        Highest = 0,
        Count = 9,
    }
    export interface IPropertyProvider {
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any;
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError);
        RecomputePropertyValueOnLower(propd: DependencyProperty, error: BError);
    }
    export interface IPropertyChangedListener {
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs);
    }
    export interface IProviderStore {
        GetValue(propd: DependencyProperty): any;
        GetValueSpec(propd: DependencyProperty, startingPrecedence?, endingPrecedence?): any;
        SetValue(propd: DependencyProperty, value: any);
        ClearValue(propd: DependencyProperty, notifyListeners?: bool);
        ReadLocalValue(propd: DependencyProperty): any;
        _Object: DependencyObject;
        _ProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldProviderValue: any, newProviderValue: any, notifyListeners: bool, setParent: bool, mergeNamesOnSetParent: bool, error: BError);
    }
}