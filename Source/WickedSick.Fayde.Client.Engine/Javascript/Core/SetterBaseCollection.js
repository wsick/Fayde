/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="SetterBase.js"/>

//#region SetterBaseCollection
var SetterBaseCollection = Nullstone.Create("SetterBaseCollection", DependencyObjectCollection);

//#region DEPENDENCY PROPERTIES

SetterBaseCollection.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBaseCollection);
SetterBaseCollection.Instance.GetIsSealed = function () {
    /// <returns type="Boolean" />
    return this.GetValue(SetterBaseCollection.IsSealedProperty);
};
SetterBaseCollection.Instance.SetIsSealed = function (value) {
    /// <param name="value" type="Boolean"></param>
    this.SetValue(SetterBaseCollection.IsSealedProperty, value);
};

//#endregion

SetterBaseCollection.Instance._Seal = function () {
    this.SetIsSealed(true);

    var error = new BError();
    var iterator = this.GetIterator();
    var setter;
    while (iterator.Next(error) && (setter = iterator.GetCurrent(error))) {
        setter._Seal();
    }
};

SetterBaseCollection.Instance.AddedToCollection = function (value, error) {
    if (!value || !this._ValidateSetter(value, error))
        return false;
    if (value instanceof SetterBase) {
        value.SetAttached(true);
        value._Seal();
    }
    return this.AddedToCollection$super(value, error);
};
SetterBaseCollection.Instance.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof SetterBase)
            value.SetAttached(false);
    }
    this.RemovedFromCollection$super(value, isValueSafe);
};

SetterBaseCollection.Instance.IsElementType = function (value) {
    return value instanceof SetterBase;
};

SetterBaseCollection.Instance._ValidateSetter = function (value, error) {
    var s;
    if (value instanceof Setter) {
        s = Nullstone.As(value, Setter);
        if (s.GetValue(Setter.PropertyProperty) == null) {
            error.SetErrored(BError.Exception, "Cannot have a null PropertyProperty value");
            return false;
        }
        if (s.ReadLocalValue(Setter.ValueProperty) == null) {
            error.SetErrored(BError.Exception, "Cannot have a null ValueProperty value");
            return false;
        }
    }

    if (value instanceof SetterBase) {
        s = Nullstone.As(value, SetterBase);
        if (s.GetAttached()) {
            error.SetErrored(BError.InvalidOperation, "Setter is currently attached to another style");
            return false;
        }
    }

    if (this.GetIsSealed()) {
        error.SetErrored(BError.Exception, "Cannot add a setter to a sealed style");
        return false;
    }

    return true;
};

Nullstone.FinishCreate(SetterBaseCollection);
//#endregion