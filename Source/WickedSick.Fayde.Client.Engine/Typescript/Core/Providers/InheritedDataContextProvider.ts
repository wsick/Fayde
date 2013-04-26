/// <reference path="IProviderStore.ts" />
/// <reference path="../../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../FrameworkElement.ts" />
/// <reference path="../PropertyChangedListener.ts" />

module Fayde.Providers {
    export class InheritedDataContextProvider implements IPropertyProvider, IInheritedDataContextProvider {
        private _Source: FrameworkElement;
        private _Store: IProviderStore;
        private _Listener = null;
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
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, oldValue, newValue, false, error);
            }
        }
        private _AttachListener(source: FrameworkElement) {
            if (!source)
                return;
            var listener = Fayde.CreatePropertyChangedListener(this._SourceDataContextChanged, this);
            this._Listener = listener;
            source._Store._SubscribePropertyChanged(listener);
            //TODO: Add Handler - Destroyed Event
        }
        private _DetachListener(source: FrameworkElement) {
            if (!source)
                return;
            if (this._Listener) {
                source._Store._UnsubscribePropertyChanged(this._Listener);
                this._Listener = null;
            }
            //TODO: Remove Handler - Destroyed Event
        }
        private _SourceDataContextChanged(sender, args) {
            var propd = args.Property;
            if (propd !== FrameworkElement.DataContextProperty)
                return;
            var error = new BError();
            this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, propd, args.OldValue, args.NewValue, true, error);
        }
        private EmitChanged() {
            if (this._Source) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, undefined, this._Source._Store.GetValue(FrameworkElement.DataContextProperty), true, error);
            }
        }
    }
    Nullstone.RegisterType(InheritedDataContextProvider, "InheritedDataContextProvider");
}