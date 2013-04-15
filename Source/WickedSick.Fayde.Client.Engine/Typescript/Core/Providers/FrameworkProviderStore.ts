/// <reference path="InheritedProviderStore.ts" />
/// CODE
/// <reference path="../FrameworkElement.ts" />

module Fayde.Providers {
    declare var App;

    export interface ILocalStylesProvider extends IPropertyProvider {
        UpdateStyle(style: Style, error: BError);
    }
    export interface IImplicitStylesProvider extends IPropertyProvider {
        SetStyles(styleMask: _StyleMask, styles: Style[], error: BError);
        ClearStyles(styleMask: _StyleMask, error: BError);
    }
    export interface IInheritedDataContextProvider extends IPropertyProvider {
        EmitChanged();
        SetDataSource(source: FrameworkElement);
    }

    export class FrameworkProviderStore extends InheritedProviderStore {
        SetProviders(providerArr: IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._DynamicValueProvider = this._Providers[2] = providerArr[2];
            this._LocalStyleProvider = this._Providers[3] = <ILocalStylesProvider>providerArr[3];
            this._ImplicitStyleProvider = this._Providers[4] = <IImplicitStylesProvider>providerArr[4];
            this._InheritedProvider = this._Providers[5] = <IInheritedProvider>providerArr[5];
            this._InheritedDataContextProvider = this._Providers[6] = <IInheritedDataContextProvider>providerArr[6];
            this._DefaultValueProvider = this._Providers[7] = <DefaultValueProvider>providerArr[7];
            this._AutoCreateProvider = this._Providers[8] = <AutoCreateProvider>providerArr[8];
        }

        private _Providers: IPropertyProvider[];
        private _LocalValueProvider: LocalValueProvider;
        private _DynamicValueProvider: IPropertyProvider;
        private _LocalStyleProvider: ILocalStylesProvider;
        private _ImplicitStyleProvider: IImplicitStylesProvider;
        private _InheritedProvider: IInheritedProvider;
        private _InheritedDataContextProvider: IInheritedDataContextProvider;
        private _DefaultValueProvider: DefaultValueProvider;
        private _AutoCreateProvider: AutoCreateProvider;

        SetImplicitStyles(styleMask: _StyleMask, styles?: Style[]) {
            var app;
            if (!styles && App && (app = App.Instance))
                styles = app._GetImplicitStyles(this, styleMask);
            if (styles) {
                var error = new BError();
                var len = Providers._StyleIndex.Count;
                for (var i = 0; i < len; i++) {
                    var style = styles[i];
                    if (!style)
                        continue;
                    if (!style.Validate(this._Object, error)) {
                        error.ThrowException();
                        //Warn("Style validation failed. [" + error.Message + "]");
                        return;
                    }
                }
            }

            this._ImplicitStyleProvider.SetStyles(styleMask, styles, error);
        }
        ClearImplicitStyles(styleMask: _StyleMask) {
            var error = new BError();
            this._ImplicitStyleProvider.ClearStyles(styleMask, error);
        }
        SetLocalStyle(style: Style, error: BError) {
            this._LocalStyleProvider.UpdateStyle(style, error);
        }
        EmitDataContextChanged() {
            this._InheritedDataContextProvider.EmitChanged();
        }
        SetDataContextSource(source: FrameworkElement) {
            this._InheritedDataContextProvider.SetDataSource(source);
        }
    }
}