/// <reference path="BasicProviderStore.ts" />
/// CODE

module Fayde.Providers {
    export interface IInheritedProvider extends IPropertyProvider {
        PropagateInheritedProperty(store: IProviderStore, propd: DependencyProperty, source: DependencyObject);
        PropagateInheritedPropertiesOnAddingToTree(store: IProviderStore, subtreeNode: XamlNode);
        ClearInheritedPropertiesOnRemovingFromTree(store: IProviderStore, subtreeNode: XamlNode);
    }

    export class InheritedProviderStore extends BasicProviderStore {
        constructor(dobj: DependencyObject) {
            super(dobj);
        }

        SetProviders(providerArr: Providers.IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._InheritedProvider = this._Providers[4] = <IInheritedProvider>providerArr[4];
            this._InheritedDataContextProvider = this._Providers[5] = <IInheritedDataContextProvider>providerArr[5];
            this._DefaultValueProvider = this._Providers[6] = <DefaultValueProvider>providerArr[6];
        }

        private _Providers: IPropertyProvider[];
        private _LocalValueProvider: LocalValueProvider;
        private _InheritedProvider: IInheritedProvider;
        private _InheritedDataContextProvider: IInheritedDataContextProvider;
        private _DefaultValueProvider: DefaultValueProvider;

        _PostProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldValue: any, newValue: any, notifyListeners: bool, error: BError) {
            super._PostProviderValueChanged(providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
            if (!notifyListeners)
                return;
            if (propd.Inheritable > 0 && providerPrecedence !== _PropertyPrecedence.Inherited) {
                // NOTE: We only propagate if inherited exists and has the highest priority in the bitmask
                var inheritedProvider = this._InheritedProvider;
                // GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited
                if (inheritedProvider && ((this._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0))
                    inheritedProvider.PropagateInheritedProperty(this, propd, this._Object);
            }
        }

        PropagateInheritedOnAdd(subtreeNode: XamlNode) {
            this._InheritedProvider.PropagateInheritedPropertiesOnAddingToTree(this, subtreeNode);
        }
        ClearInheritedOnRemove(subtreeNode: XamlNode) {
            this._InheritedProvider.ClearInheritedPropertiesOnRemovingFromTree(this, subtreeNode);
        }
    }
    Nullstone.RegisterType(InheritedProviderStore, "InheritedProviderStore");
}