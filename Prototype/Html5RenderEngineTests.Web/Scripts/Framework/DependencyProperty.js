/// <reference path="RefObject.js"/>

//#region DependencyProperty

function DependencyProperty(name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback) {
    RefObject.call(this);
    this.Name = name;
    this.GetTargetType = getTargetType;
    this.OwnerType = ownerType;
    this.DefaultValue = defaultValue;
    this._AutoCreator = autocreator;
    this._Coercer = coercer;
    this._AlwaysChange = alwaysChange;
    this._Validator = validator;
    this._IsCustom = isCustom;
    this._ChangedCallback = changedCallback;
}
RefObject.Register(DependencyProperty, RefObject);

DependencyProperty.prototype.toString = function () {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(this.OwnerType.toString());
    var ownerTypeName = (results && results.length > 1) ? results[1] : "";
    return ownerTypeName + "." + this.Name.toString();
};
DependencyProperty.prototype._HasDefaultValue = function () {
    return this.DefaultValue != null;
};
DependencyProperty.prototype._IsAutoCreated = function () {
    return this._AutoCreator != undefined && this._AutoCreator != null;
};
DependencyProperty.prototype._GetAutoCreatedValue = function (obj) {
    return this._AutoCreator.GetValue(this, obj);
};
DependencyProperty.prototype._HasCoercer = function () {
    return this._Coercer != null;
};
DependencyProperty.prototype._Coerce = function (instance, value, error) {
    if (!this._Coercer)
        return value;
    return this._Coercer.GetValue(instance, this, value, error);
};
DependencyProperty.prototype._Validate = function (instance, propd, value, error) {
    if (!this._Validator)
        return true;
    return this._Validator(instance, propd, value, error);
};

DependencyProperty.Register = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
    return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, null, null, null, null, true, changedCallback);
};
DependencyProperty.RegisterFull = function (name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback) {
    if (!DependencyProperty._Registered)
        DependencyProperty._Registered = new Array();
    if (!DependencyProperty._Registered[ownerType])
        DependencyProperty._Registered[ownerType] = new Array();
    var propd = new DependencyProperty(name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback);
    DependencyProperty._Registered[ownerType][name] = propd;
    return propd;
}
DependencyProperty.RegisterAttached = function (name, getTargetType, ownerType, defaultValue) {
    if (!DependencyProperty._Registered)
        DependencyProperty._Registered = new Array();
    if (!DependencyProperty._Registered[ownerType])
        DependencyProperty._Registered[ownerType] = new Array();
    var propd = new DependencyProperty(name, getTargetType, ownerType, defaultValue);
    propd._IsAttached = true;
    DependencyProperty._Registered[ownerType][name] = propd;
    return propd;
}
DependencyProperty.GetDependencyProperty = function (ownerType, name) {
    var reg = DependencyProperty._Registered;
    if (!reg)
        return null;
    var reg = reg[ownerType];
    var propd;
    if (reg)
        propd = reg[name];
    if (!propd && ownerType !== RefObject) {
        propd = DependencyProperty.GetDependencyProperty(ownerType.GetBaseClass(), name);
    }
    return propd;
};

//#endregion

//#region UnsetValue

function UnsetValue() {
    RefObject.call(this);
}
RefObject.Register(UnsetValue, RefObject);

//#endregion