/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE
/// <reference path="GridLength.ts" />

module Fayde.Controls {
    export interface IColumnDefinitionListener {
        ColumnDefinitionChanged(colDefinition: ColumnDefinition);
    }

    export class ColumnDefinition extends DependencyObject {
        //NOTE: Will not receive property changes from GridLength
        static WidthProperty: DependencyProperty = DependencyProperty.RegisterCore("Width", () => GridLength, ColumnDefinition, undefined, (d, args) => (<ColumnDefinition>d)._WidthsChanged(args));
        static MaxWidthProperty: DependencyProperty = DependencyProperty.RegisterCore("MaxWidth", () => Number, ColumnDefinition, Number.POSITIVE_INFINITY, (d, args) => (<ColumnDefinition>d)._WidthsChanged(args));
        static MinWidthProperty: DependencyProperty = DependencyProperty.RegisterCore("MinWidth", () => Number, ColumnDefinition, 0.0, (d, args) => (<ColumnDefinition>d)._WidthsChanged(args));
        static ActualWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", () => Number, ColumnDefinition, 0.0);
        Width: GridLength;
        MaxWidth: number;
        MinWidth: number;
        ActualWidth: number;

        private _Listener: IColumnDefinitionListener;
        Listen(listener: IColumnDefinitionListener) { this._Listener = listener; }
        Unlisten(listener: IColumnDefinitionListener) { if (this._Listener === listener) this._Listener = null; }

        private _WidthsChanged(args: IDependencyPropertyChangedEventArgs) {
            var listener = this._Listener;
            if (listener) listener.ColumnDefinitionChanged(this);
        }
    }
    Nullstone.RegisterType(ColumnDefinition, "ColumnDefinition");
    
    export interface IColumnDefinitionsListener {
        ColumnDefinitionsChanged(colDefinitions: ColumnDefinitionCollection);
    }

    export class ColumnDefinitionCollection extends XamlObjectCollection implements IColumnDefinitionListener {
        private _Listener: IColumnDefinitionsListener;
        Listen(listener: IColumnDefinitionsListener) { this._Listener = listener; }
        Unlisten(listener: IColumnDefinitionsListener) { if (this._Listener === listener) this._Listener = null; }
        ColumnDefinitionChanged(colDefinition: ColumnDefinition) {
            var listener = this._Listener;
            if (listener) listener.ColumnDefinitionsChanged(this);
        }

        AddingToCollection(value: ColumnDefinition, error: BError): bool {
            if (!super.AddingToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.ColumnDefinitionsChanged(this);
            return true;
        }
        RemovedFromCollection(value: ColumnDefinition, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.ColumnDefinitionsChanged(this);
        }
    }
    Nullstone.RegisterType(ColumnDefinitionCollection, "ColumnDefinitionCollection");
}