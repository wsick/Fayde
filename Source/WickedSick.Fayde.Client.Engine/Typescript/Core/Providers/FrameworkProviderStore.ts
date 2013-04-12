/// <reference path="InheritedProviderStore.ts" />
/// CODE

module Fayde.Providers {
    export class FrameworkProviderStore extends InheritedProviderStore {
        SetProviders(providerArr: IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._DynamicValueProvider = this._Providers[2] = providerArr[2];
            this._LocalStyleProvider = this._Providers[3] = providerArr[3];
            this._ImplicitStyleProvider = this._Providers[4] = providerArr[4];
            this._InheritedProvider = this._Providers[5] = <IInheritedProvider>providerArr[5];
            this._InheritedDataContextProvider = this._Providers[6] = providerArr[6];
            this._DefaultValueProvider = this._Providers[7] = <DefaultValueProvider>providerArr[7];
            this._AutoCreateProvider = this._Providers[8] = <AutoCreateProvider>providerArr[8];
        }

        private _Providers: IPropertyProvider[];
        private _LocalValueProvider: LocalValueProvider;
        private _DynamicValueProvider: IPropertyProvider;
        private _LocalStyleProvider: IPropertyProvider;
        private _ImplicitStyleProvider: IPropertyProvider;
        private _InheritedProvider: IInheritedProvider;
        private _InheritedDataContextProvider: IPropertyProvider;
        private _DefaultValueProvider: DefaultValueProvider;
        private _AutoCreateProvider: AutoCreateProvider;

        SetImplicitStyles(styleMask, styles) {
        }
        ClearImplicitStyles(styleMask) {
        }
        SetLocalStyle() {
        }
        EmitDataContextChanged() {
        }
        SetDataContextSource(source) {
        }
    }
}