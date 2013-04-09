/// <reference path="XamlObjectCollection.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />

module Fayde {
    export class DependencyObjectCollection extends XamlObjectCollection {
        AddedToCollection(value: DependencyObject, error: BError): bool {
            super.AddedToCollection(value, error);
            //TODO: On added, subscribe to item property changed
            return true;
        }
        RemovedFromCollection(value: DependencyObject, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            //TODO: On removed, unsubscribe to item property changed
        }
        _RaiseItemChanged(item, propd: DependencyProperty, oldValue: DependencyObject, newValue: DependencyObject) { }
    }
}