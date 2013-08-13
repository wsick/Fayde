/// <reference path="PropertyStore.ts" />
/// CODE

module Fayde.Providers {
    export interface IDataContextStorage extends IPropertyStorage {
        InheritedValue: any;
    }

    export class DataContextStore extends PropertyStore {
        static Instance: DataContextStore;
        GetValue(storage: IDataContextStorage): any {
            var val = super.GetValue(storage);
            if (val === undefined)
                val = storage.InheritedValue;
            return val;
        }
        GetValuePrecedence(storage: IDataContextStorage): PropertyPrecedence {
            var prec = super.GetValuePrecedence(storage);
            if (prec < PropertyPrecedence.InheritedDataContext)
                return prec;
            if (storage.InheritedValue !== undefined)
                return PropertyPrecedence.InheritedDataContext;
            return PropertyPrecedence.DefaultValue;
        }
        EmitInheritedChanged(storage: IDataContextStorage, newInherited?: any) {
            var oldInherited = storage.InheritedValue;
            storage.InheritedValue = newInherited;

            if (storage.Precedence >= PropertyPrecedence.InheritedDataContext && oldInherited !== newInherited)
                this.OnPropertyChanged(storage, PropertyPrecedence.InheritedDataContext, oldInherited, newInherited);
        }

        CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IDataContextStorage {
            return {
                OwnerNode: dobj.XamlNode,
                Property: propd,
                Precedence: PropertyPrecedence.DefaultValue,
                Animations: undefined,
                Local: undefined,
                LocalStyleValue: undefined,
                ImplicitStyleValue: undefined,
                InheritedValue: undefined,
                PropListeners: undefined,
            };
        }

        OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any): IDependencyPropertyChangedEventArgs {
            var args = super.OnPropertyChanged(storage, effectivePrecedence, oldValue, newValue);
            if (args)
                storage.OwnerNode._DataContextPropertyChanged(storage.Precedence < PropertyPrecedence.InheritedDataContext, args);
            return args;
        }
    }
    DataContextStore.Instance = new DataContextStore();
}