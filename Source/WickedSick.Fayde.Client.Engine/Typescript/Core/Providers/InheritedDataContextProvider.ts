/// <reference path="IProviderStore.ts" />
/// CODE
/// <reference path="../FrameworkElement.ts" />

module Fayde.Providers {
    export class InheritedDataContextProvider implements IPropertyProvider {
        private _Source: FrameworkElement;
        private _Store: IProviderStore;
        constructor(store: IProviderStore) {
            this._Store = store;
        }
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            var source = this._Source;
            if (!source)
                return;
            if (propd._ID !== FrameworkElement.DataContextProperty._ID)
                return;
            return source._Store.GetValue(FrameworkElement.DataContextProperty);
        }
        SetDataSource(source: FrameworkElement) {
            var oldSource = this._Source;
            if (oldSource === source)
                return;

            var oldValue = oldSource ? oldSource._Store.GetValue(FrameworkElement.DataContextProperty) : undefined;
            var newValue = source ? source._Store.GetValue(FrameworkElement.DataContextProperty) : undefined;

            this._DetachListener(oldSource);
            this._Source = source;
            this._AttachListener(source);

            if (!Nullstone.Equals(oldValue, newValue)) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
            }
        }
        private _AttachListener(source: FrameworkElement) {
            if (!source)
                return;
            var matchFunc = function (sender, args) {
                return this === args.Property; //Closure - FrameworkElement.DataContextProperty
            };
            (<any>source).PropertyChanged.SubscribeSpecific(this._SourceDataContextChanged, this, matchFunc, FrameworkElement.DataContextProperty);
            //TODO: Add Handler - Destroyed Event
        }
        private _DetachListener(source: FrameworkElement) {
            if (!source)
                return;
            (<any>source).PropertyChanged.Unsubscribe(this._SourceDataContextChanged, this, FrameworkElement.DataContextProperty);
            //TODO: Remove Handler - Destroyed Event
        }
        private _SourceDataContextChanged(sender, args) {
            var error = new BError();
            this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, args.OldValue, args.NewValue, true, false, false, error);
        }
        private EmitChanged() {
            if (this._Source) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, undefined, this._Source._Store.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
            }
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError) { }
        RecomputePropertyValueOnLower(propd: DependencyProperty, error: BError) { }
    }
}