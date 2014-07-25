/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

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
    Fayde.RegisterType(RowDefinition, "Fayde.Controls", Fayde.XMLNS);

    function ConvertRowDefinition(o: any): RowDefinition {
        if (!o || o instanceof RowDefinition)
            return <RowDefinition>o;
        var s: string = o.toString();
        var rd = new RowDefinition();
        if (s.toLowerCase() === "auto") {
            rd.Height = new GridLength(0, GridUnitType.Auto);
            return rd;
        }
        if (s === "*") {
            rd.Height = new GridLength(1, GridUnitType.Star);
            return rd;
        }
        var v = parseFloat(s);
        if (isNaN(v))
            throw new XamlParseException("Invalid RowDefinition: '" + s + "'.");
        rd.Height = new GridLength(v, s[s.length - 1] === "*" ? GridUnitType.Star : GridUnitType.Pixel);
        return rd;
    }
    Fayde.RegisterTypeConverter(RowDefinition, ConvertRowDefinition);

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
    Fayde.RegisterType(RowDefinitionCollection, "Fayde.Controls", Fayde.XMLNS);

    function ConvertRowDefinitionCollection(o: any): RowDefinitionCollection {
        if (!o || o instanceof RowDefinitionCollection)
            return <RowDefinitionCollection>o;
        if (typeof o === "string") {
            var tokens = (<string>o).split(" ");
            var len = tokens.length;
            var rdc = new RowDefinitionCollection();
            var rd: RowDefinition;
            for (var i = 0; i < len; i++) {
                if (rd = ConvertRowDefinition(tokens[i]))
                    rdc.Add(rd);
            }
            return rdc;
        }
        return undefined;
    }
    Fayde.RegisterTypeConverter(RowDefinitionCollection, ConvertRowDefinitionCollection);
}