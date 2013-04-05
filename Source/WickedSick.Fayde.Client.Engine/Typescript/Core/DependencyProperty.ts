/// CODE
/// <reference path="DependencyObject.ts" />

interface IAutoCreator {
    GetValue(propd: DependencyProperty, dobj: Fayde.DependencyObject): any;
}
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
    private static _Inherited: DependencyProperty[][] = [];
    private static _LastID: number = 0;

    _ID: number;
    Name: string;
    GetTargetType: () => Function;
    OwnerType: Function;
    DefaultValue: any;
    IsReadOnly: bool;
    IsCustom: bool;

    _HasDefaultValue: bool;
    _ChangedCallback: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void;
    _AutoCreator: IAutoCreator;
    _IsAutoCreated: bool;
    private _Coercer: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any;
    _AlwaysChange: bool;
    private _Validator: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => bool;
    private _IsAttached: bool;
    _BitmaskCache: number;
    _Inheritable: number;

    static Register(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback);
    }
    static RegisterReadOnly(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, undefined, true);
    }
    static RegisterAttached(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, undefined, undefined, true);
    }
    
    static RegisterCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true);
    }
    static RegisterReadOnlyCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, true);
    }
    static RegisterAttachedCore(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, undefined, true);
    }
    
    static RegisterInheritable(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void , autocreator?: IAutoCreator, inheritable?) {
        return RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, undefined, undefined, undefined, undefined, undefined, undefined, inheritable);
    }

    static RegisterFull(name: string, getTargetType: () => Function, ownerType: Function, defaultValue?: any, changedCallback?: (dobj: Fayde.DependencyObject, args: IDependencyPropertyChangedEventArgs) => void, autocreator?: IAutoCreator, coercer?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => any, alwaysChange?: bool, validator?: (dobj: Fayde.DependencyObject, propd: DependencyProperty, value: any) => bool, isCustom?: bool, isReadOnly?: bool, isAttached?: bool, inheritable?): DependencyProperty {
        var registeredDPs = (<any>ownerType)._RegisteredDPs;
        if (!registeredDPs)
            (<any>ownerType)._RegisteredDPs = registeredDPs = [];
        if (registeredDPs[name] !== undefined)
            throw new InvalidOperationException("Dependency Property is already registered. [" + (<any>ownerType)._TypeName + "." + name + "]");

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
        propd._ID = _LastID = _LastID + 1;
        propd._BitmaskCache = Fayde.Provider.ProviderStore.BuildBitmask(propd);
        propd._Inheritable = inheritable;
        
        if (inheritable !== undefined) {
            var i = _Inherited;
            if (!i[inheritable])
                i[inheritable] = [];
            i[inheritable].push(propd);
        }

        registeredDPs[name] = propd;
        _IDs[propd._ID] = propd;
        return propd;
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
}