/// <reference path="FrameworkProviderStore.ts" />
/// CODE

module Fayde.Providers {
    export interface IInheritedIsEnabledProvider extends IPropertyProvider {
        LocalValueChanged(propd?: DependencyProperty): bool;
        SetDataSource(source: DependencyObject);
    }

    export class ControlProviderStore extends FrameworkProviderStore {
        constructor(dobj: DependencyObject) {
            super(dobj);
        }
        SetProviders(providerArr: IPropertyProvider[]) {
            this._InheritedIsEnabledProvider = this._Providers[0] = <IInheritedIsEnabledProvider>providerArr[0];
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._LocalStyleProvider = this._Providers[2] = providerArr[2];
            this._ImplicitStyleProvider = this._Providers[3] = providerArr[3];
            this._InheritedProvider = this._Providers[4] = <IInheritedProvider>providerArr[4];
            this._InheritedDataContextProvider = this._Providers[5] = providerArr[5];
            this._DefaultValueProvider = this._Providers[6] = <DefaultValueProvider>providerArr[6];
        }

        private _Providers: IPropertyProvider[];
        private _InheritedIsEnabledProvider: IInheritedIsEnabledProvider;
        private _LocalValueProvider: LocalValueProvider;
        private _LocalStyleProvider: IPropertyProvider;
        private _ImplicitStyleProvider: IPropertyProvider;
        private _InheritedProvider: IInheritedProvider;
        private _InheritedDataContextProvider: IPropertyProvider;
        private _DefaultValueProvider: DefaultValueProvider;

        _PostProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldValue: any, newValue: any, notifyListeners: bool, error: BError) {
            var iiep: IInheritedIsEnabledProvider;
            if (providerPrecedence !== _PropertyPrecedence.IsEnabled && (iiep = this._InheritedIsEnabledProvider) && iiep.LocalValueChanged(propd))
                return;
            super._PostProviderValueChanged(providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
        }

        SetIsEnabledSource(source: DependencyObject) {
            this._InheritedIsEnabledProvider.SetDataSource(source);
        }
    }
    Nullstone.RegisterType(ControlProviderStore, "ControlProviderStore");
}