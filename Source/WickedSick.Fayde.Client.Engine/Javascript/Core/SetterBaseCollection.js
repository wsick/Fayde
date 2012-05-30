/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="SetterBase.js"/>

//#region SetterBaseCollection
var SetterBaseCollection = Nullstone.Create("SetterBaseCollection", DependencyObjectCollection);

//#region Dependency Properties

SetterBaseCollection.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBaseCollection);

Nullstone.AutoProperties(SetterBaseCollection, [
    SetterBaseCollection.IsSealedProperty
]);

//#endregion

SetterBaseCollection.Instance._Seal = function () {
    this.IsSealed = true;

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
        value._Attached = true;
        value._Seal();
    }
    return this.AddedToCollection$DependencyObjectCollection(value, error);
};
SetterBaseCollection.Instance.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof SetterBase)
            value._Attached = false;
    }
    this.RemovedFromCollection$DependencyObjectCollection(value, isValueSafe);
};

SetterBaseCollection.Instance.IsElementType = function (value) {
    return value instanceof SetterBase;
};

SetterBaseCollection.Instance._ValidateSetter = function (value, error) {
    var s = Nullstone.As(value, Setter);
    if (s) {
        if (s._GetValue(Setter.PropertyProperty) === undefined) {
            error.SetErrored(BError.Exception, "Cannot have a null PropertyProperty value");
            return false;
        }
        if (s._ReadLocalValue(Setter.ValueProperty) === undefined) {
            error.SetErrored(BError.Exception, "Cannot have a null ValueProperty value");
            return false;
        }
    }

    var sb = Nullstone.As(value, SetterBase);
    if (sb) {
        if (sb._Attached) {
            error.SetErrored(BError.InvalidOperation, "Setter is currently attached to another style");
            return false;
        }
    }

    if (this.IsSealed) {
        error.SetErrored(BError.Exception, "Cannot add a setter to a sealed style");
        return false;
    }

    return true;
};

Nullstone.FinishCreate(SetterBaseCollection);
//#endregion