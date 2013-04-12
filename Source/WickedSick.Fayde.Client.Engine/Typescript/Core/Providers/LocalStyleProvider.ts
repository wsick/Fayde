/// <reference path="IProviderStore.ts" />
/// CODE
/// <reference path="../Setter.ts" />
/// <reference path="../Style.ts" />
/// <reference path="../Walkers.ts" />

module Fayde.Providers {
    export class LocalStyleProvider implements IPropertyProvider {
        private _ht: any[] = [];
        private _Style: Style;
        private _Store: IProviderStore;
        constructor(store: IProviderStore) {
            this._Store = store;
        }
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError) {
            var oldValue;
            var newValue;
            var walkPropd;

            var walker = SingleStyleWalker(this._Style);
            var setter: Setter;
            while (setter = walker.Step()) {
                walkPropd = setter.Property;
                if (walkPropd._ID !== propd._ID)
                    continue;

                newValue = setter.ConvertedValue;
                oldValue = this._ht[propd._ID];
                this._ht[propd._ID] = newValue;
                this._Store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, propd, oldValue, newValue, true, error);
                if (error.Message)
                    return;
            }
        }
        UpdateStyle(style: Style, error: BError) {
            var store = this._Store;
            var oldValue = undefined;
            var newValue = undefined;

            var oldWalker = SingleStyleWalker(this._Style);
            var newWalker = SingleStyleWalker(style);
            style.Seal();

            var oldSetter = oldWalker.Step();
            var newSetter = newWalker.Step();
            var oldProp: DependencyProperty;
            var newProp: DependencyProperty;

            while (oldSetter || newSetter) {
                if (oldSetter)
                    oldProp = oldSetter.Property;
                if (newSetter)
                    newProp = newSetter.Property;
                if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
                    //Property in old style, not in new style
                    oldValue = oldSetter.ConvertedValue;
                    newValue = undefined;
                    this._ht[oldProp._ID] = undefined;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, error);
                    oldSetter = oldWalker.Step();
                } else if (oldProp === newProp) {
                    //Property in both styles
                    oldValue = oldSetter.ConvertedValue;
                    newValue = newSetter.ConvertedValue;
                    this._ht[oldProp._ID] = newValue;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, error);
                    oldSetter = oldWalker.Step();
                    newSetter = newWalker.Step();
                } else {
                    //Property in new style, not in old style
                    oldValue = undefined;
                    newValue = newSetter.ConvertedValue;
                    this._ht[newProp._ID] = newValue;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, newProp, oldValue, newValue, true, error);
                    newSetter = newWalker.Step();
                }
            }

            this._Style = style;
        }
    }
}