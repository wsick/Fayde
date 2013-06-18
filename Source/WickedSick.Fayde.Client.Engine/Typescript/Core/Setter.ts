/// <reference path="XamlObject.ts" />
/// <reference path="XamlObjectCollection.ts" />
/// CODE
/// <reference path="TypeConverter.ts" />

module Fayde {
    export class SetterCollection extends XamlObjectCollection {
        private _IsSealed: bool = false;

        _Seal(targetType: Function) {
            if (this._IsSealed)
                return;
            var enumerator = this.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Setter>enumerator.Current)._Seal(targetType);
            }
            this._IsSealed = true;
        }
        
        AddingToCollection(value: XamlObject, error: BError): bool {
            if (!value || !this._ValidateSetter(<Setter>value, error))
                return false;
            return super.AddingToCollection(value, error);
        }

        private _ValidateSetter(setter: Setter, error: BError) {

            if (setter.Property === undefined) {
                error.Message = "Cannot have a null PropertyProperty value";
                return false;
            }
            if (setter.Value === undefined) {
                if (!setter._HasDeferredValueExpression(Setter.ValueProperty)) {
                    error.Message = "Cannot have a null ValueProperty value";
                    return false;
                }
            }
            if (this._IsSealed) {
                error.Message = "Cannot add a setter to a sealed style";
                return false;
            }
            return true;
        }
    }
    Nullstone.RegisterType(SetterCollection, "SetterCollection");

    export class Setter extends DependencyObject {
        private _IsSealed: bool = false;
        static PropertyProperty: DependencyProperty = DependencyProperty.Register("Property", () => DependencyProperty, Setter);
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Object, Setter);
        Property: DependencyProperty;
        Value: any;
        ConvertedValue: any;

        _Seal(targetType: Function) {
            var propd = this.Property;
            var val = this.Value;

            if (typeof propd.GetTargetType() === "string") {
                //if (val === undefined)
                //throw new ArgumentException("Empty value in setter.");
                if (typeof val !== "string")
                    throw new XamlParseException("Setter value does not match property type.");
            }

            try {
                this.ConvertedValue = TypeConverter.ConvertObject(propd, val, targetType, true);
            } catch (err) {
                throw new XamlParseException(err.message);
            }
            this._IsSealed = true;
        }
    }
    Nullstone.RegisterType(Setter, "Setter");
}