/// <reference path="XamlObjectCollection.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />

module Fayde {
    export class DependencyObjectCollection extends XamlObjectCollection implements Provider.IPropertyChangedListener {
        private _HandleItemChanged: bool;
        constructor(handleItemChanged: bool) {
            super();
            this._HandleItemChanged = handleItemChanged;
        }
        AddedToCollection(value: DependencyObject, error: BError): bool {
            super.AddedToCollection(value, error);
            if (this._HandleItemChanged)
                value._Store._SubscribePropertyChanged(this);
            return true;
        }
        RemovedFromCollection(value: DependencyObject, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            if (this._HandleItemChanged)
                value._Store._UnsubscribePropertyChanged(this);
        }
        OnPropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            this._RaiseItemChanged(sender, args.Property, args.OldValue, args.NewValue);
        }
        _RaiseItemChanged(item, propd: DependencyProperty, oldValue: DependencyObject, newValue: DependencyObject) { }
    }
}