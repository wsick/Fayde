/// <reference path="PropertyStore.ts" />
/// CODE

module Fayde.Providers {
    export interface IIsEnabledStorage extends IPropertyStorage {
        InheritedValue: bool;
    }

    export class IsEnabledStore extends PropertyStore {
        static Instance: IsEnabledStore;
        GetValue(storage: IIsEnabledStorage): bool {
            if (storage.InheritedValue === false)
                return false;
            return super.GetValue(storage);
        }
        GetValuePrecedence(storage: IIsEnabledStorage): PropertyPrecedence {
            if (storage.InheritedValue === false)
                return PropertyPrecedence.IsEnabled;
            return super.GetValuePrecedence(storage);
        }

        SetLocalValue(storage: IIsEnabledStorage, newValue: bool) {
            var oldValue = storage.Local;
            storage.Local = newValue;
            if (oldValue === newValue || storage.InheritedValue === false)
                return;
            this.OnPropertyChanged(storage, PropertyPrecedence.LocalValue, oldValue, newValue);
        }

        OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any) {
            super.OnPropertyChanged(storage, effectivePrecedence, oldValue, newValue);
            storage.OwnerNode.OnIsEnabledChanged(oldValue, newValue);
        }

        CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IIsEnabledStorage {
            return {
                OwnerNode: dobj.XamlNode,
                Property: propd,
                Precedence: PropertyPrecedence.DefaultValue,
                InheritedValue: true,
                Animations: undefined,
                Local: undefined,
                LocalStyleValue: undefined,
                ImplicitStyleValue: undefined,
                PropListeners: undefined,
            };
        }
        
        EmitInheritedChanged(storage: IIsEnabledStorage, newInherited: bool) {
            var oldInherited = storage.InheritedValue;
            if (newInherited !== false) {
                storage.Precedence = super.GetValuePrecedence(storage);
                storage.InheritedValue = true;
            } else {
                storage.InheritedValue = false;
            }
            if (oldInherited === newInherited)
                return;
            this.OnPropertyChanged(storage, PropertyPrecedence.IsEnabled, oldInherited, newInherited);
        }
        static EmitInheritedChanged(cn: Controls.ControlNode, value: bool) {
            var propd = Controls.Control.IsEnabledProperty;
            var storage = <Providers.IIsEnabledStorage>Providers.GetStorage(cn.XObject, propd);
            (<Providers.IsEnabledStore>propd.Store).EmitInheritedChanged(storage, value);
        }
    }
    IsEnabledStore.Instance = new IsEnabledStore();
}