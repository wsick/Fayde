/// <reference path="DependencyObject.ts" />
/// <reference path="XamlObjectCollection.ts" />

module Fayde {
    export class SetterCollection extends XamlObjectCollection<Setter> {
        private _IsSealed: boolean = false;

        _Seal(targetType: Function) {
            if (this._IsSealed)
                return;
            var enumerator = this.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<Setter>enumerator.Current)._Seal(targetType);
            }
            this._IsSealed = true;
        }
        
        AddingToCollection(value: Setter, error: BError): boolean {
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
    Fayde.RegisterType(SetterCollection, {
    	Name: "SetterCollection",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });

    export class Setter extends DependencyObject {
        private _IsSealed: boolean = false;
        static PropertyProperty: DependencyProperty = DependencyProperty.Register("Property", () => DependencyProperty, Setter);
        static ValueProperty: DependencyProperty = DependencyProperty.Register("Value", () => Object, Setter);
        Property: DependencyProperty;
        Value: any;
        ConvertedValue: any;

        _Seal(targetType: Function) {
            var propd = this.Property;
            var val = this.Value;

            var propTargetType = <Function>propd.GetTargetType();
            try {
                this.ConvertedValue = Fayde.ConvertAnyToType(val, propTargetType);
            } catch (err) {
                throw new XamlParseException(err.message);
            }
            this._IsSealed = true;
        }
    }
    Fayde.RegisterType(Setter, {
    	Name: "Setter",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}