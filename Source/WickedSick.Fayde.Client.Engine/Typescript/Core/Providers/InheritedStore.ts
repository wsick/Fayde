/// <reference path="PropertyStore.ts" />
/// CODE

module Fayde.Providers {
    export interface IInheritedStorage extends IPropertyStorage {
        InheritedValue: any;
    }

    export class InheritedStore extends PropertyStore {
        static Instance: InheritedStore;
        GetValue(storage: IInheritedStorage): any {
            var val: any;
            if ((val = storage.Local) !== undefined)
                return val;
            if ((val = storage.LocalStyleValue) !== undefined)
                return val;
            if ((val = storage.ImplicitStyleValue) !== undefined)
                return val;
            if ((val = storage.InheritedValue) !== undefined)
                return val;
            return storage.Property.DefaultValue;
        }
        GetValuePrecedence(storage: IInheritedStorage): PropertyPrecedence {
            var prec = super.GetValuePrecedence(storage);
            if (prec < PropertyPrecedence.Inherited)
                return prec;
            if (storage.InheritedValue !== undefined)
                return PropertyPrecedence.Inherited;
            return PropertyPrecedence.DefaultValue;
        }

        OnPropertyChanged(storage: IPropertyStorage, effectivePrecedence: PropertyPrecedence, oldValue: any, newValue: any) {
            super.OnPropertyChanged(storage, effectivePrecedence, oldValue, newValue);
            if (effectivePrecedence <= PropertyPrecedence.Inherited)
                this.Propagate(storage.OwnerNode, storage.Property, newValue);
        }

        CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IInheritedStorage {
            return {
                OwnerNode: dobj.XamlNode,
                Property: propd,
                Precedence: PropertyPrecedence.DefaultValue,
                Animation: undefined,
                Local: undefined,
                LocalStyleValue: undefined,
                ImplicitStyleValue: undefined,
                InheritedValue: undefined,
                PropListeners: undefined,
            };
        }

        static PropagateInheritedOnAdd(dobj: DependencyObject, subtreeNode: DONode) {
            var store: InheritedStore = InheritedStore.Instance;
            var arr = (<IPropertyStorageOwner>dobj)._PropertyStorage;
            var storage: IPropertyStorage;

            var allProps = InheritableOwner.AllInheritedProperties;
            var len = allProps.length;
            var propd: DependencyProperty;
            var newValue: any;
            for (var i = 0; i < len; i++) {
                propd = allProps[i];
                storage = arr[propd._ID];
                if (!storage) storage = arr[propd._ID] = store.CreateStorage(dobj, propd);
                newValue = store.GetValue(<IInheritedStorage>storage);
                store.SetInheritedValue(subtreeNode, propd, newValue);
            }
        }
        static ClearInheritedOnRemove(dobj: DependencyObject, subtreeNode: DONode) {
            var store: InheritedStore = InheritedStore.Instance;
            var allProps = InheritableOwner.AllInheritedProperties;
            var len = allProps.length;
            var prop: DependencyProperty;
            for (var i = 0; i < len; i++) {
                store.Propagate(subtreeNode, allProps[i], undefined);
            }
        }
        private Propagate(ownerNode: XamlNode, propd: DependencyProperty, newValue: any) {
            var enumerator = ownerNode.GetInheritedEnumerator();
            var uin: UINode;
            while (enumerator.MoveNext()) {
                uin = <UINode>enumerator.Current;
                this.SetInheritedValue(uin, propd, newValue);
            }
        }
        private SetInheritedValue(don: DONode, propd: DependencyProperty, newValue: any) {
            var dobj = don.XObject;
            var storage = <IInheritedStorage>GetStorage(dobj, propd);
            if (storage.Precedence < PropertyPrecedence.Inherited) {
                //Overriden locally, don't propagate
                storage.InheritedValue = newValue;
                return;
            }
            var oldValue = storage.InheritedValue;
            if (oldValue === undefined) oldValue = propd.DefaultValue;
            storage.InheritedValue = newValue;
            storage.Precedence = PropertyPrecedence.Inherited;
            this.OnPropertyChanged(storage, PropertyPrecedence.Inherited, oldValue, newValue);
        }
    }
    InheritedStore.Instance = new InheritedStore();
}