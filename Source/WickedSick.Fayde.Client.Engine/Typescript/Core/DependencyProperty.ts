/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />
/// <reference path="Providers/PropertyStore.ts" />
/// <reference path="Providers/InheritedStore.ts" />

interface IDependencyPropertyChangedEventArgs {
    Property: DependencyProperty;
    OldValue: any;
    NewValue: any;
}
interface IOutIsValid {
    IsValid: bool;
}
class DependencyProperty {
    private static _IDs: DependencyProperty[] = [];
    private static _LastID: number = 0;

    _ID: number;
    Name: string;
    GetTargetType: () => Function;
    OwnerType: Function;
    DefaultValue: any;
    IsReadOnly: bool = false;
    IsCustom: bool = true;
    IsAttached: bool = false;
    IsInheritable: bool = false;
    ChangedCallback: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void;
    AlwaysChange: bool = false;
    Store: Fayde.Providers.PropertyStore;
    private _Coercer: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any = null;
    private _Validator: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => bool = null;

    static Register(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        var propd = new DependencyProperty();
        propd.Name = name;
        propd.GetTargetType = getTargetType;
        propd.OwnerType = ownerType;
        propd.DefaultValue = defaultValue;
        propd.ChangedCallback = changedCallback;
        propd.Store = Fayde.Providers.PropertyStore.Instance;
        propd.FinishRegister();
        return propd;
    }
    static RegisterReadOnly(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
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
    }
    static RegisterAttached(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
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
    }
    
    static RegisterCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
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
    }
    static RegisterReadOnlyCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
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
    }
    static RegisterAttachedCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void ) {
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
    }
    
    static RegisterInheritable(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
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
    }

    static RegisterFull(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void, coercer?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any, alwaysChange?: bool, validator?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => bool, isCustom?: bool, isReadOnly?: bool, isAttached?: bool): DependencyProperty {
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
    }

    private FinishRegister() {
        var name = this.Name;
        var ownerType = this.OwnerType;
        var registeredDPs: DependencyProperty[] = (<any>ownerType)._RegisteredDPs;
        if (!registeredDPs)
            (<any>ownerType)._RegisteredDPs = registeredDPs = [];
        if (registeredDPs[name] !== undefined)
            throw new InvalidOperationException("Dependency Property is already registered. [" + (<any>ownerType)._TypeName + "." + name + "]");
        if (!ownerType || typeof ownerType !== "function")
            throw new InvalidOperationException("DependencyProperty does not have a valid OwnerType.");
        registeredDPs[name] = this;
        this._ID = DependencyProperty._LastID = DependencyProperty._LastID + 1;
        DependencyProperty._IDs[this._ID] = this;

        var propd = this;
        var getter = function () { return (<Fayde.DependencyObject>this).GetValue(propd); };
        var setter = function (value) { (<Fayde.DependencyObject>this).SetValue(propd, value); };
        Object.defineProperty(ownerType.prototype, this.Name, {
            get: getter,
            set: setter,
            configurable: true
        });
    }

    ValidateSetValue(dobj: Fayde.DependencyObject, value: any, isValidOut: IOutIsValid) {
        isValidOut.IsValid = false;
        var coerced = value;
        if (this._Coercer && !(coerced = this._Coercer(dobj, this, coerced)))
            return coerced;
        /* TODO: Handle Type Problems
        if (!this._IsValueValid(dobj, coerced))
            return coerced;
        */
        if (this._Validator && !this._Validator(dobj, this, coerced))
            return coerced;
        isValidOut.IsValid = true;
        return coerced;
    }

    static GetDependencyProperty(ownerType: Function, name: string, noError?: bool): DependencyProperty {
        if (!ownerType)
            return undefined;
        var reg: DependencyProperty[] = (<any>ownerType)._RegisteredDPs;
        var propd: DependencyProperty;
        if (reg)
            propd = reg[name];
        if (!propd)
            propd = DependencyProperty.GetDependencyProperty((<any>ownerType)._BaseClass, name, true);
        if (!propd && !noError)
            throw new Exception("Cannot locate dependency property [" + (<any>ownerType)._TypeName + "].[" + name + "]");
        return propd;
    }
}
Nullstone.RegisterType(DependencyProperty, "DependencyProperty");