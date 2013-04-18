/// <reference path="BasicProviderStore.ts" />
/// CODE

module Fayde.Providers {
    export interface IInheritedProvider extends IPropertyProvider {
        PropagateInheritedProperty(store: IProviderStore, propd: DependencyProperty, source: DependencyObject, subtree: DependencyObject);
        PropagateInheritedPropertiesOnAddingToTree(store: IProviderStore, subtree: DependencyObject);
        ClearInheritedPropertiesOnRemovingFromTree(store: IProviderStore, subtree: DependencyObject);
    }

    export class InheritedProviderStore extends BasicProviderStore {
        constructor(dobj: DependencyObject) {
            super(dobj);
        }

        SetProviders(providerArr: Providers.IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._InheritedProvider = this._Providers[5] = <IInheritedProvider>providerArr[5];
            this._DefaultValueProvider = this._Providers[7] = <DefaultValueProvider>providerArr[7];
            this._AutoCreateProvider = this._Providers[8] = <AutoCreateProvider>providerArr[8];
        }

        private _Providers: IPropertyProvider[];
        private _LocalValueProvider: LocalValueProvider;
        private _InheritedProvider: IInheritedProvider;
        private _DefaultValueProvider: DefaultValueProvider;
        private _AutoCreateProvider: AutoCreateProvider;

        _PostProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldValue: any, newValue: any, notifyListeners: bool, error: BError) {
            super._PostProviderValueChanged(providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
            if (!notifyListeners)
                return;
            if (propd._Inheritable > 0 && providerPrecedence !== _PropertyPrecedence.Inherited) {
                // NOTE: We only propagate if inherited exists and has the highest priority in the bitmask
                var inheritedProvider = this._InheritedProvider;
                // GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited
                if (inheritedProvider && ((this._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0))
                    inheritedProvider.PropagateInheritedProperty(this, propd, this._Object, this._Object);
            }
        }

        PropagateInheritedOnAdd(subtree: DependencyObject) {
            this._InheritedProvider.PropagateInheritedPropertiesOnAddingToTree(this, subtree);
        }
        ClearInheritedOnRemove(subtree: DependencyObject) {
            this._InheritedProvider.ClearInheritedPropertiesOnRemovingFromTree(this, subtree);
        }
    }
    Nullstone.RegisterType(InheritedProviderStore, "InheritedProviderStore");
}