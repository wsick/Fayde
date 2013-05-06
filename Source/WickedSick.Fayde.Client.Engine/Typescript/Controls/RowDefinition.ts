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
        static HeightProperty: DependencyProperty = DependencyProperty.RegisterCore("Height", () => GridLength, RowDefinition, undefined, (d, args) => (<RowDefinition>d)._HeightsChanged(args));
        static MaxHeightProperty: DependencyProperty = DependencyProperty.RegisterCore("MaxHeight", () => Number, RowDefinition, Number.POSITIVE_INFINITY, (d, args) => (<RowDefinition>d)._HeightsChanged(args));
        static MinHeightProperty: DependencyProperty = DependencyProperty.RegisterCore("MinHeight", () => Number, RowDefinition, 0.0, (d, args) => (<RowDefinition>d)._HeightsChanged(args));
        static ActualHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", () => Number, RowDefinition, 0.0, (d, args) => (<RowDefinition>d)._HeightsChanged(args));
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
    Nullstone.RegisterType(RowDefinition, "RowDefinition");

    export interface IRowDefinitionsListener {
        RowDefinitionsChanged(rowDefinitions: RowDefinitionCollection);
    }

    export class RowDefinitionCollection extends XamlObjectCollection implements IRowDefinitionListener {
        private _Listener: IRowDefinitionsListener;
        Listen(listener: IRowDefinitionsListener) { this._Listener = listener; }
        Unlisten(listener: IRowDefinitionsListener) { if (this._Listener === listener) this._Listener = null; }
        RowDefinitionChanged(rowDefinition: RowDefinition) {
            var listener = this._Listener;
            if (listener) listener.RowDefinitionsChanged(this);
        }

        AddedToCollection(value: RowDefinition, error: BError): bool {
            if (!super.AddedToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.RowDefinitionsChanged(this);
            return true;
        }
        RemovedFromCollection(value: RowDefinition, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.RowDefinitionsChanged(this);
        }
    }
    Nullstone.RegisterType(RowDefinitionCollection, "RowDefinitionCollection");
}