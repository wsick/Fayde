/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Primitives/Color.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />
/// CODE

module Fayde.Media {
    export interface IGradientStopListener {
        GradientStopChanged(newGradientStop: GradientStop);
    }

    export class GradientStop extends DependencyObject {
        private _Listener: IGradientStopListener;
        static ColorProperty: DependencyProperty = DependencyProperty.Register("Color", () => Color, GradientStop, undefined, (d, args) => (<GradientStop>d)._GradientStopChanged());
        static OffsetProperty: DependencyProperty = DependencyProperty.Register("Offset", () => Number, GradientStop, 0.0, (d, args) => (<GradientStop>d)._GradientStopChanged());
        Color: Color;
        Offset: number;

        Listen(listener: IGradientStopListener) { this._Listener = listener; }
        Unlisten(listener: IGradientStopListener) { if (this._Listener === listener) this._Listener = null; }

        private _GradientStopChanged() {
            var listener = this._Listener;
            if (listener) listener.GradientStopChanged(this);
        }

        toString(): string { return this.Color.toString() + " @ " + this.Offset.toString(); }
    }
    Fayde.RegisterType(GradientStop, {
    	Name: "GradientStop",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });
    
    export interface IGradientStopsListener {
        GradientStopsChanged(newGradientStops: GradientStopCollection);
    }

    export class GradientStopCollection extends XamlObjectCollection<GradientStop> implements IGradientStopListener {
        private _Listener: IGradientStopsListener;

        Listen(listener: IGradientStopsListener) { this._Listener = listener; }
        Unlisten(listener: IGradientStopsListener) { if (this._Listener === listener) this._Listener = null; }
        
        AddingToCollection(value: GradientStop, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            value.Listen(this);
            var listener = this._Listener;
            if (listener) listener.GradientStopsChanged(this);
            return true;
        }
        RemovedFromCollection(value: GradientStop, isValueSafe: boolean) {
            if (!super.RemovedFromCollection(value, isValueSafe))
                return false;
            value.Unlisten(this);
            var listener = this._Listener;
            if (listener) listener.GradientStopsChanged(this);
        }
        GradientStopChanged(newGradientStop: GradientStop) {
            var listener = this._Listener;
            if (listener) listener.GradientStopsChanged(this);
        }
    }
    Fayde.RegisterType(GradientStopCollection, {
    	Name: "GradientStopCollection",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });
}