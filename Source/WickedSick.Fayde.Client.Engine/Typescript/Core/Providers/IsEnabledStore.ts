/// <reference path="PropertyStore.ts" />
/// CODE

module Fayde.Providers {
    export interface IIsEnabledStorage extends IPropertyStorage {
        InheritedValue: bool;
        SourceNode: Controls.ControlNode;
        Listener: Controls.IIsEnabledListener;
    }

    export class IsEnabledStore extends PropertyStore {
        static Instance: IsEnabledStore;
        GetValue(storage: IIsEnabledStorage): bool {
            if (storage.SourceNode)
                return storage.InheritedValue;
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
        SetInheritedSource(storage: IIsEnabledStorage, sourceNode: XamlNode) {
            while (sourceNode) {
                if (sourceNode instanceof Controls.ControlNode)
                    break;
                else if (sourceNode instanceof FENode)
                    sourceNode = sourceNode.ParentNode;
                else
                    sourceNode = null;
            }

            if (storage.SourceNode !== sourceNode) {
                if (storage.Listener) {
                    storage.Listener.Detach();
                    storage.Listener = null;
                }
                storage.SourceNode = <Controls.ControlNode>sourceNode;
                if (sourceNode)
                    storage.Listener = storage.SourceNode.MonitorIsEnabled((newIsEnabled) => this.InheritedValueChanged(storage, newIsEnabled));
            }
            if (!sourceNode && (storage.OwnerNode.IsAttached))
                this.InheritedValueChanged(storage);

        }

        CreateStorage(dobj: DependencyObject, propd: DependencyProperty): IIsEnabledStorage {
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
                Listener: undefined,
                PropListeners: undefined,
            };
        }
        
        private InheritedValueChanged(storage: IIsEnabledStorage, newIsEnabled?: bool): bool {
            var localIsEnabled = super.GetValue(storage);
            var parentEnabled = false;
            var sourceNode = storage.SourceNode;
            if (sourceNode && (<UINode>storage.OwnerNode).VisualParentNode)
                parentEnabled = sourceNode.XObject.IsEnabled === true;
            var newValue = localIsEnabled === true && parentEnabled;

            var oldValue = storage.InheritedValue;
            if (oldValue === newValue)
                return false;
            storage.InheritedValue = newValue;
            this.OnPropertyChanged(storage, PropertyPrecedence.IsEnabled, oldValue, newValue);
            return true;
        }
        static InitIsEnabledSource(cn: Controls.ControlNode) {
            var propd = Controls.Control.IsEnabledProperty;
            var storage = <IIsEnabledStorage>GetStorage(cn.XObject, propd);
            (<IsEnabledStore>propd.Store).SetInheritedSource(storage, cn.ParentNode);
        }
    }
    IsEnabledStore.Instance = new IsEnabledStore();
}