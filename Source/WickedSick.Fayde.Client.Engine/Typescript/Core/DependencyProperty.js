var DependencyProperty = (function () {
    function DependencyProperty() { }
    DependencyProperty._IDs = [];
    DependencyProperty._Inherited = [];
    DependencyProperty._LastID = 0;
    DependencyProperty.Register = function Register(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback);
    };
    DependencyProperty.RegisterReadOnly = function RegisterReadOnly(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, undefined, true);
    };
    DependencyProperty.RegisterAttached = function RegisterAttached(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, undefined, undefined, true);
    };
    DependencyProperty.RegisterCore = function RegisterCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true);
    };
    DependencyProperty.RegisterReadOnlyCore = function RegisterReadOnlyCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, true);
    };
    DependencyProperty.RegisterAttachedCore = function RegisterAttachedCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, undefined, true);
    };
    DependencyProperty.RegisterInheritable = function RegisterInheritable(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, inheritable) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, undefined, undefined, undefined, undefined, undefined, undefined, inheritable);
    };
    DependencyProperty.RegisterFull = function RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, coercer, alwaysChange, validator, isCustom, isReadOnly, isAttached, inheritable) {
        var registeredDPs = (ownerType)._RegisteredDPs;
        if(!registeredDPs) {
            (ownerType)._RegisteredDPs = registeredDPs = [];
        }
        if(registeredDPs[name] !== undefined) {
            throw new InvalidOperationException("Dependency Property is already registered. [" + (ownerType)._TypeName + "." + name + "]");
        }
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd._HasDefaultValue = defaultValue !== undefined;
        propd._ChangedCallback = changedCallback;
        propd._AutoCreator = autocreator;
        propd._IsAutoCreated = autocreator != null;
        propd._Coercer = coercer;
        propd._AlwaysChange = alwaysChange;
        propd._Validator = validator;
        propd.IsCustom = isCustom;
        propd.IsReadOnly = isReadOnly === true;
        propd._IsAttached = isAttached === true;
        propd._ID = DependencyProperty._LastID = DependencyProperty._LastID + 1;
        propd._BitmaskCache = Fayde.Providers.ProviderStore.BuildBitmask(propd);
        propd._Inheritable = inheritable;
        if(inheritable !== undefined) {
            var i = DependencyProperty._Inherited;
            if(!i[inheritable]) {
                i[inheritable] = [];
            }
            i[inheritable].push(propd);
        }
        registeredDPs[name] = propd;
        DependencyProperty._IDs[propd._ID] = propd;
        return propd;
    };
    DependencyProperty.prototype.ValidateSetValue = function (dobj, value, isValidOut) {
        isValidOut.IsValid = false;
        var coerced = value;
        if(this._Coercer && !(coerced = this._Coercer(dobj, this, coerced))) {
            return coerced;
        }
        /* TODO: Handle Type Problems
        if (!this._IsValueValid(dobj, coerced))
        return coerced;
        */
        if(this._Validator && !this._Validator(dobj, this, coerced)) {
            return coerced;
        }
        isValidOut.IsValid = true;
        return coerced;
    };
    return DependencyProperty;
})();
//@ sourceMappingURL=DependencyProperty.js.map
