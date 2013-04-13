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
    export enum _StyleIndex {
        VisualTree = 0,
        ApplicationResources = 1,
        GenericXaml = 2,
        Count = 3,
    }
    export enum _StyleMask {
        None = 0,
        VisualTree = 1 << _StyleIndex.VisualTree,
        ApplicationResources = 1 << _StyleIndex.ApplicationResources,
        GenericXaml = 1 << _StyleIndex.GenericXaml,
        All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml,
    }
    export interface IPropertyProvider {
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any;
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
        _ProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldProviderValue: any, newProviderValue: any, notifyListeners: bool, error: BError);
    }
}