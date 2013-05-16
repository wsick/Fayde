/// <reference path="PropertyStore.ts" />
/// CODE

module Fayde.Providers {
    export interface IDataContextStorage extends IPropertyStorage {
        InheritedValue: any;
        SourceNode: XamlNode;
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

        SetInheritedSource(storage: IDataContextStorage, sourceNode: XamlNode) {
            var oldSourceNode = storage.SourceNode;
            if (oldSourceNode === sourceNode)
                return;

            var oldValue: any = undefined;
            var newValue: any = undefined;
            if (oldSourceNode) oldValue = oldSourceNode.DataContext;
            storage.SourceNode = sourceNode;
            if (sourceNode) newValue = sourceNode.DataContext;
            
            if (oldValue === newValue)
                this.EmitInheritedChanged(storage, oldValue, newValue);
        }
        EmitInheritedChanged(storage: IDataContextStorage, oldInherited?: any, newInherited?: any) {
            if (oldInherited === undefined)
                oldInherited = storage.InheritedValue;
            var sourceNode = storage.SourceNode;
            if (sourceNode && newInherited === undefined)
                newInherited = sourceNode.DataContext;
            storage.InheritedValue = newInherited

            if (storage.Precedence >= PropertyPrecedence.InheritedDataContext && oldInherited !== newInherited)
                this.OnPropertyChanged(storage, PropertyPrecedence.InheritedDataContext, oldInherited, newInherited);
        }

        CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IDataContextStorage {
            return {
                OwnerNode: dobj.XamlNode,
                Property: propd,
                Precedence: PropertyPrecedence.DefaultValue,
                Animation: undefined,
                Local: undefined,
                LocalStyleValue: undefined,
                ImplicitStyleValue: undefined,
                InheritedValue: undefined,
                SourceNode: undefined,
                PropListeners: undefined,
            };
        }

        static EmitDataContextChanged(dobj: DependencyObject) {
            var propd = DependencyObject.DataContextProperty;
            var storage = <IDataContextStorage>GetStorage(dobj, propd);
            (<DataContextStore>propd.Store).EmitInheritedChanged(storage);
        }
    }
    DataContextStore.Instance = new DataContextStore();
}