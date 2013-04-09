/// <reference path="InternalCollection.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />

module Fayde.Core {
    export class DependencyObjectCollection extends InternalCollection {
        AddedToCollection(value: any, error: BError): bool {
            //TODO: On added, subscribe to item property changed
            return true;
        }
        RemovedFromCollection(value: any, isValueSafe: bool) {
            //TODO: On removed, unsubscribe to item property changed
        }
        _RaiseItemChanged(item, propd: DependencyProperty, oldValue: any, newValue: any) { }
    }
}