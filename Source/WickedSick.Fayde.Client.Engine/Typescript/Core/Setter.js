var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObject.ts" />
/// <reference path="XamlObjectCollection.ts" />
/// CODE
/// <reference path="TypeConverter.ts" />
var Fayde;
(function (Fayde) {
    var SetterCollection = (function (_super) {
        __extends(SetterCollection, _super);
        function SetterCollection() {
            _super.apply(this, arguments);

            this._IsSealed = false;
        }
        SetterCollection.prototype._Seal = function (targetType) {
            if(this._IsSealed) {
                return;
            }
            var enumerator = this.GetEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current)._Seal(targetType);
            }
            this._IsSealed = true;
        };
        SetterCollection.prototype.AddedToCollection = function (value, error) {
            if(!value || !this._ValidateSetter(value, error)) {
                return false;
            }
            return _super.prototype.AddedToCollection.call(this, value, error);
        };
        SetterCollection.prototype._ValidateSetter = function (setter, error) {
            if(setter.Property === undefined) {
                error.Message = "Cannot have a null PropertyProperty value";
                return false;
            }
            if(setter.Value === undefined) {
                if(!setter._HasDeferredValueExpression(Setter.ValueProperty)) {
                    error.Message = "Cannot have a null ValueProperty value";
                    return false;
                }
            }
            if(this._IsSealed) {
                error.Message = "Cannot add a setter to a sealed style";
                return false;
            }
            return true;
        };
        return SetterCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.SetterCollection = SetterCollection;    
    Nullstone.RegisterType(SetterCollection, "SetterCollection");
    var Setter = (function (_super) {
        __extends(Setter, _super);
        function Setter() {
            _super.apply(this, arguments);

            this._IsSealed = false;
        }
        Setter.PropertyProperty = DependencyProperty.Register("Property", function () {
            return DependencyProperty;
        }, Setter);
        Setter.ValueProperty = DependencyProperty.Register("Value", function () {
            return Object;
        }, Setter);
        Setter.prototype._Seal = function (targetType) {
            var propd = this.Property;
            var val = this.Value;
            if(typeof propd.GetTargetType() === "string") {
                //if (val === undefined)
                //throw new ArgumentException("Empty value in setter.");
                if(typeof val !== "string") {
                    throw new XamlParseException("Setter value does not match property type.");
                }
            }
            try  {
                this.ConvertedValue = Fayde.TypeConverter.ConvertObject(propd, val, targetType, true);
            } catch (err) {
                throw new XamlParseException(err.message);
            }
            this._IsSealed = true;
        };
        return Setter;
    })(Fayde.DependencyObject);
    Fayde.Setter = Setter;    
    Nullstone.RegisterType(Setter, "Setter");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Setter.js.map
