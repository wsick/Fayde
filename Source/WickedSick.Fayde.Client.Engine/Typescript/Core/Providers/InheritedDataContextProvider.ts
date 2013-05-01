/// <reference path="IProviderStore.ts" />
/// <reference path="../../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../FrameworkElement.ts" />
/// <reference path="../PropertyChangedListener.ts" />

module Fayde.Providers {
    export class InheritedDataContextProvider implements IPropertyProvider, IInheritedDataContextProvider {
        private _SourceNode: XamlNode;
        private _Store: IProviderStore;
        constructor(store: IProviderStore) {
            this._Store = store;
        }
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            var sourceNode = this._SourceNode;
            if (!sourceNode)
                return;
            if (propd !== DependencyObject.DataContextProperty)
                return;
            return sourceNode.DataContext;
        }
        SetDataSourceNode(sourceNode: XamlNode) {
            var oldSourceNode = this._SourceNode;
            if (oldSourceNode === sourceNode)
                return;

            var oldValue: any = undefined;
            var newValue: any = undefined;
            if (oldSourceNode) oldValue = oldSourceNode.DataContext;
            this._SourceNode = sourceNode;
            if (sourceNode) newValue = sourceNode.DataContext;

            if (!Nullstone.Equals(oldValue, newValue)) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, DependencyObject.DataContextProperty, oldValue, newValue, false, error);
            }
        }
        private EmitChanged() {
            var sourceNode = this._SourceNode;
            if (!sourceNode)
                return;
            var error = new BError();
            this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, DependencyObject.DataContextProperty, undefined, sourceNode.DataContext, true, error);
        }
    }
    Nullstone.RegisterType(InheritedDataContextProvider, "InheritedDataContextProvider");
}