/// <reference path="../Runtime/TypeManagement.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DependencyProperty = (function () {
    function DependencyProperty() {
        this.IsReadOnly = false;
        this.IsCustom = true;
        this.IsAttached = false;
        this.IsInheritable = false;
        this.IsImmutable = false;
        this.AlwaysChange = false;
        this._Coercer = null;
        this._Validator = null;
    }
    DependencyProperty.Register = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
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
    DependencyProperty.RegisterReadOnly = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
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
    DependencyProperty.RegisterAttached = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
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

    DependencyProperty.RegisterCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
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
    DependencyProperty.RegisterReadOnlyCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
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
    DependencyProperty.RegisterAttachedCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
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

    DependencyProperty.RegisterImmutable = function (name, getTargetType, ownerType) {
        var propd = new ImmutableDependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = undefined;
        propd.IsImmutable = true;
        propd.Store = Fayde.Providers.ImmutableStore.Instance;
        propd.FinishRegister();
        return propd;
    };

    DependencyProperty.RegisterInheritable = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
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

    DependencyProperty.RegisterFull = function (name, getTargetType, ownerType, defaultValue, changedCallback, coercer, alwaysChange, validator, isCustom, isReadOnly, isAttached) {
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
        if (!ownerType || typeof ownerType !== "function")
            throw new InvalidOperationException("DependencyProperty does not have a valid OwnerType.");
        var registeredDPs = (ownerType)._RegisteredDPs;
        if (!registeredDPs) {
            var registeredDPs = {};
            Object.defineProperty(ownerType, "_RegisteredDPs", {
                value: registeredDPs,
                enumerable: false,
                writable: false
            });
        }
        if (registeredDPs[name] !== undefined)
            throw new InvalidOperationException("Dependency Property is already registered. [" + name + "]");
        registeredDPs[name] = this;
        this._ID = DependencyProperty._LastID = DependencyProperty._LastID + 1;
        DependencyProperty._IDs[this._ID] = this;

        if (this.IsImmutable)
            return;

        var propd = this;
        var getter = function () {
            return (this).GetValue(propd);
        };
        var setter = function (value) {
            (this).SetValue(propd, value);
        };
        if (this.IsReadOnly)
            setter = function (value) {
                throw new Exception("Property [" + propd.Name + "] is readonly.");
            };
        Object.defineProperty(ownerType.prototype, this.Name, {
            get: getter,
            set: setter,
            configurable: true
        });
    };
    DependencyProperty.prototype.ExtendTo = function (type) {
        var registeredDPs = type._RegisteredDPs;
        if (!registeredDPs) {
            var registeredDPs = {};
            Object.defineProperty(type, "_RegisteredDPs", {
                value: registeredDPs,
                enumerable: false,
                writable: false
            });
        }
        registeredDPs[this.Name] = this;

        var propd = this;
        var getter = function () {
            return (this).GetValue(propd);
        };
        var setter = function (value) {
            (this).SetValue(propd, value);
        };
        Object.defineProperty(type.prototype, this.Name, {
            get: getter,
            set: setter,
            configurable: true
        });
        return this;
    };

    DependencyProperty.prototype.ValidateSetValue = function (dobj, value, isValidOut) {
        isValidOut.IsValid = false;
        var coerced = value;
        if (this._Coercer && !(coerced = this._Coercer(dobj, this, coerced)))
            return coerced;

        if (this._Validator && !this._Validator(dobj, this, coerced))
            return coerced;
        isValidOut.IsValid = true;
        return coerced;
    };

    DependencyProperty.GetDependencyProperty = function (ownerType, name, noError) {
        if (!ownerType)
            return undefined;
        var reg = (ownerType)._RegisteredDPs;
        var propd;
        if (reg)
            propd = reg[name];
        if (!propd)
            propd = DependencyProperty.GetDependencyProperty((ownerType)._BaseClass, name, true);
        if (!propd && !noError)
            throw new Exception("Cannot locate dependency property [" + (ownerType)._TypeName + "].[" + name + "]");
        return propd;
    };
    DependencyProperty.UnsetValue = {};

    DependencyProperty._IDs = [];
    DependencyProperty._LastID = 0;
    return DependencyProperty;
})();
Fayde.RegisterType(DependencyProperty, {
    Name: "DependencyProperty",
    Namespace: "Fayde"
});

var ImmutableDependencyProperty = (function (_super) {
    __extends(ImmutableDependencyProperty, _super);
    function ImmutableDependencyProperty() {
        _super.apply(this, arguments);
        this.IsImmutable = true;
    }
    ImmutableDependencyProperty.prototype.Initialize = function (dobj) {
        var storage = Fayde.Providers.GetStorage(dobj, this);
        storage.Precedence = Fayde.Providers.PropertyPrecedence.LocalValue;
        var obj = new (this.GetTargetType())();
        Object.defineProperty(dobj, this.Name, {
            value: obj,
            writable: false
        });
        return storage.Local = obj;
    };
    return ImmutableDependencyProperty;
})(DependencyProperty);
//# sourceMappingURL=DependencyProperty.js.map
