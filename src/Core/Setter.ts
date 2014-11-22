/// <reference path="DependencyObject.ts" />
/// <reference path="XamlObjectCollection.ts" />

module Fayde {
    export class SetterCollection extends XamlObjectCollection<Setter> {
        private _IsSealed: boolean = false;
        XamlNode: XamlNode;

        _Seal(targetType: Function) {
            if (this._IsSealed)
                return;
            var enumerator = this.getEnumerator();
            while (enumerator.moveNext()) {
                (<Setter>enumerator.current)._Seal(targetType);
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
    Fayde.CoreLibrary.add(SetterCollection);

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
                this.ConvertedValue = nullstone.convertAnyToType(val, propTargetType);
            } catch (err) {
                throw new XamlParseException(err.message);
            }
            this._IsSealed = true;
        }

        static Compare(setter1: Setter, setter2: Setter): number {
            var a = setter1.Property;
            var b = setter2.Property;
            return (a === b) ? 0 : ((a._ID > b._ID) ? 1 : -1);
        }
    }
    Fayde.CoreLibrary.add(Setter);
}