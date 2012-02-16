/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="SetterBase.js"/>

//#region SetterBaseCollection

function SetterBaseCollection() {
    DependencyObjectCollection.call(this);
}
SetterBaseCollection.InheritFrom(DependencyObjectCollection);

//#region DEPENDENCY PROPERTIES

SetterBaseCollection.IsSealedProperty = DependencyProperty.Register("IsSealed", function () { return Boolean; }, SetterBaseCollection);
SetterBaseCollection.prototype.GetIsSealed = function () {
    /// <returns type="Boolean" />
    return this.GetValue(SetterBaseCollection.IsSealedProperty);
};
SetterBaseCollection.prototype.SetIsSealed = function (value) {
    /// <param name="value" type="Boolean"></param>
    this.SetValue(SetterBaseCollection.IsSealedProperty, value);
};

//#endregion

SetterBaseCollection.prototype._Seal = function () {
    this.SetIsSealed(true);

    var error = new BError();
    var iterator = this.GetIterator();
    var setter;
    while (iterator.Next(error) && (setter = iterator.GetCurrent(error))) {
        setter._Seal();
    }
};

SetterBaseCollection.prototype.AddedToCollection = function (value, error) {
    if (!value || !this._ValidateSetter(value, error))
        return false;
    if (value instanceof SetterBase) {
        value.SetAttached(true);
        value._Seal();
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};
SetterBaseCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
    if (isValueSafe) {
        if (value instanceof SetterBase)
            value.SetAttached(false);
    }
    DependencyObjectCollection.prototype.RemovedFromCollection.call(this, value, isValueSafe);
};

SetterBaseCollection.prototype.IsElementType = function (value) {
    return value instanceof SetterBase;
};

SetterBaseCollection.prototype._ValidateSetter = function (value, error) {
    NotImplemented("SetterBaseCollection._ValidateSetter");
    return true;
};

//#endregion
