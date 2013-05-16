var DependencyProperty = (function () {
    function DependencyProperty() {
        this.IsReadOnly = false;
        this.IsCustom = true;
        this.IsAttached = false;
        this.IsInheritable = false;
        this.AlwaysChange = false;
        this._Coercer = null;
        this._Validator = null;
    }
    DependencyProperty._IDs = [];
    DependencyProperty._LastID = 0;
    DependencyProperty.Register = function Register(name, getTargetType, ownerType, defaultValue, changedCallback) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd.Store = Fayde.Providers.PropertyStore.Instance;
        propd.FinishRegister();
        return propd;
    };
    DependencyProperty.RegisterReadOnly = function RegisterReadOnly(name, getTargetType, ownerType, defaultValue, changedCallback) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd.IsReadOnly = true;
        propd.Store = Fayde.Providers.PropertyStore.Instance;
        propd.FinishRegister();
        return propd;
    };
    DependencyProperty.RegisterAttached = function RegisterAttached(name, getTargetType, ownerType, defaultValue, changedCallback) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd.IsAttached = true;
        propd.Store = Fayde.Providers.PropertyStore.Instance;
        propd.FinishRegister();
        return propd;
    };
    DependencyProperty.RegisterCore = function RegisterCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd.IsCustom = false;
        propd.Store = Fayde.Providers.PropertyStore.Instance;
        propd.FinishRegister();
        return propd;
    };
    DependencyProperty.RegisterReadOnlyCore = function RegisterReadOnlyCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd.IsCustom = false;
        propd.IsReadOnly = true;
        propd.Store = Fayde.Providers.PropertyStore.Instance;
        propd.FinishRegister();
        return propd;
    };
    DependencyProperty.RegisterAttachedCore = function RegisterAttachedCore(name, getTargetType, ownerType, defaultValue, changedCallback) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd.IsCustom = false;
        propd.IsAttached = true;
        propd.Store = Fayde.Providers.PropertyStore.Instance;
        propd.FinishRegister();
        return propd;
    };
    DependencyProperty.RegisterInheritable = function RegisterInheritable(name, getTargetType, ownerType, defaultValue, changedCallback) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd.IsCustom = true;
        propd.IsInheritable = true;
        propd.Store = Fayde.Providers.InheritedStore.Instance;
        propd.FinishRegister();
        return propd;
    };
    DependencyProperty.RegisterFull = function RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, coercer, alwaysChange, validator, isCustom, isReadOnly, isAttached) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd._Coercer = coercer;
        propd.AlwaysChange = alwaysChange;
        propd._Validator = validator;
        propd.IsCustom = isCustom !== false;
        propd.IsReadOnly = isReadOnly === true;
        propd.IsAttached = isAttached === true;
        propd.Store = Fayde.Providers.PropertyStore.Instance;
        propd.FinishRegister();
        return propd;
    };
    DependencyProperty.prototype.FinishRegister = function () {
        var name = this.Name;
        var ownerType = this.OwnerType;
        var registeredDPs = (ownerType)._RegisteredDPs;
        if(!registeredDPs) {
            (ownerType)._RegisteredDPs = registeredDPs = [];
        }
        if(registeredDPs[name] !== undefined) {
            throw new InvalidOperationException("Dependency Property is already registered. [" + (ownerType)._TypeName + "." + name + "]");
        }
        if(!ownerType || typeof ownerType !== "function") {
            throw new InvalidOperationException("DependencyProperty does not have a valid OwnerType.");
        }
        registeredDPs[name] = this;
        this._ID = DependencyProperty._LastID = DependencyProperty._LastID + 1;
        DependencyProperty._IDs[this._ID] = this;
        var propd = this;
        var getter = function () {
            return (this).GetValue(propd);
        };
        var setter = function (value) {
            (this).SetValue(propd, value);
        };
        Object.defineProperty(ownerType.prototype, this.Name, {
            get: getter,
            set: setter,
            configurable: true
        });
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
    DependencyProperty.GetDependencyProperty = function GetDependencyProperty(ownerType, name, noError) {
        if(!ownerType) {
            return undefined;
        }
        var reg = (ownerType)._RegisteredDPs;
        var propd;
        if(reg) {
            propd = reg[name];
        }
        if(!propd) {
            propd = DependencyProperty.GetDependencyProperty((ownerType)._BaseClass, name, true);
        }
        if(!propd && !noError) {
            throw new Exception("Cannot locate dependency property [" + (ownerType)._TypeName + "].[" + name + "]");
        }
        return propd;
    };
    return DependencyProperty;
})();
Nullstone.RegisterType(DependencyProperty, "DependencyProperty");
//@ sourceMappingURL=DependencyProperty.js.map
