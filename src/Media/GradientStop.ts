/// <reference path="../Core/DependencyObject.ts" />
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Media {
    export class GradientStop extends DependencyObject {
        static ColorProperty = DependencyProperty.Register("Color", () => Color, GradientStop, undefined, Incite);
        static OffsetProperty = DependencyProperty.Register("Offset", () => Number, GradientStop, 0.0, Incite);
        Color: Color;
        Offset: number;

        toString (): string {
            return this.Color.toString() + " @ " + this.Offset.toString();
        }
    }
    Fayde.RegisterType(GradientStop, "Fayde.Media", Fayde.XMLNS);

    export class GradientStopCollection extends XamlObjectCollection<GradientStop> {
        AddingToCollection (value: GradientStop, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            ReactTo(value, this, () => Incite(this));
            Incite(this);
            return true;
        }

        RemovedFromCollection (value: GradientStop, isValueSafe: boolean) {
            if (!super.RemovedFromCollection(value, isValueSafe))
                return false;
            UnreactTo(value, this);
            Incite(this);
        }
    }
    Fayde.RegisterType(GradientStopCollection, "Fayde.Media", Fayde.XMLNS);
}