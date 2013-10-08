/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE
/// <reference path="GridLength.ts" />

module Fayde.Controls {
    export interface IRowDefinitionListener {
        RowDefinitionChanged(rowDefinition: RowDefinition);
    }

    export class RowDefinition extends DependencyObject {
        //NOTE: Will not receive property changes from GridLength
        static HeightProperty: DependencyProperty = DependencyProperty.Register("Height", () => GridLength, RowDefinition, undefined, (d, args) => (<RowDefinition>d)._HeightsChanged(args));
        static MaxHeightProperty: DependencyProperty = DependencyProperty.Register("MaxHeight", () => Number, RowDefinition, Number.POSITIVE_INFINITY, (d, args) => (<RowDefinition>d)._HeightsChanged(args));
        static MinHeightProperty: DependencyProperty = DependencyProperty.Register("MinHeight", () => Number, RowDefinition, 0.0, (d, args) => (<RowDefinition>d)._HeightsChanged(args));
        static ActualHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("ActualHeight", () => Number, RowDefinition, 0.0);
        Height: GridLength;
        MaxHeight: number;
        MinHeight: number;
        ActualHeight: number;

        private _Listener: IRowDefinitionListener;
        Listen(listener: IRowDefinitionListener) { this._Listener = listener; }
        Unlisten(listener: IRowDefinitionListener) { if (this._Listener === listener) this._Listener = null; }

        private _HeightsChanged(args: IDependencyPropertyChangedEventArgs) {
            var listener = this._Listener;
            if (listener) listener.RowDefinitionChanged(this);
        }
    }
    Fayde.RegisterType(RowDefinition, {
    	Name: "RowDefinition",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });

    export interface IRowDefinitionsListener {
        RowDefinitionsChanged(rowDefinitions: RowDefinitionCollection);
    }

    export class RowDefinitionCollection extends XamlObjectCollection<RowDefinition> implements IRowDefinitionListener {
        private _Listener: IRowDefinitionsListener;
        Listen(listener: IRowDefinitionsListener) { this._Listener = listener; }
        Unlisten(listener: IRowDefinitionsListener) { if (this._Listener === listener) this._Listener = null; }
        RowDefinitionChanged(rowDefinition: RowDefinition) {
            var listener = this._Listener;
            if (listener) listener.RowDefinitionsChanged(this);
        }

        AddingToCollection(value: RowDefinition, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.RowDefinitionsChanged(this);
            return true;
        }
        RemovedFromCollection(value: RowDefinition, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.RowDefinitionsChanged(this);
        }
    }
    Fayde.RegisterType(RowDefinitionCollection, {
    	Name: "RowDefinitionCollection",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}