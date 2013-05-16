/// <reference path="IProviderStore.ts" />
/// <reference path="../../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../DependencyObject.ts" />
/// <reference path="../../Runtime/BError.ts" />
/// <reference path="../../Runtime/Nullstone.ts" />
/// <reference path="../../Media/Animation/AnimationStorage.ts" />

module Fayde.Providers {
    export class DefaultValueProvider implements IPropertyProvider {
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            return propd.DefaultValue;
        }
    }
    Nullstone.RegisterType(DefaultValueProvider, "DefaultValueProvider");

    export class LocalValueProvider implements IPropertyProvider {
        private _ht: any[] = [];
        GetPropertyValue(store: IProviderStore, propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        SetValue(propd: DependencyProperty, value: any) {
            this._ht[propd._ID] = value;
        }
        ClearValue(propd: DependencyProperty) {
            this._ht[propd._ID] = undefined;
        }
    }
    Nullstone.RegisterType(LocalValueProvider, "LocalValueProvider");
    
    export interface IInheritedDataContextProvider extends IPropertyProvider {
        EmitChanged();
        SetDataSourceNode(sourceNode: XamlNode);
    }

    export class BasicProviderStore {
        _Object: DependencyObject;
        private _Providers: IPropertyProvider[] = [null, null, null, null, null, null, null, null, null];
        private _PropertyChangedListeners: IPropertyChangedListener[] = [];
        _ProviderBitmasks: number[] = [];
        private _AnimStorage: Media.Animation.AnimationStorage[][] = [];

        private _LocalValueProvider: LocalValueProvider;
        private _InheritedDataContextProvider: IInheritedDataContextProvider;
        private _DefaultValueProvider: DefaultValueProvider;

        constructor(dobj: DependencyObject) {
            this._Object = dobj;
        }

        SetProviders(providerArr: Providers.IPropertyProvider[]) {
            this._LocalValueProvider = this._Providers[1] = <LocalValueProvider>providerArr[1];
            this._InheritedDataContextProvider = this._Providers[5] = <IInheritedDataContextProvider>providerArr[5];
            this._DefaultValueProvider = this._Providers[6] = <DefaultValueProvider>providerArr[6];
        }

        GetValue(propd: DependencyProperty):any {
            var startingPrecedence = _PropertyPrecedence.Highest;
            var endingPrecedence = _PropertyPrecedence.Lowest;

            //Establish providers used
            var bitmask = this._ProviderBitmasks[propd._ID] | (1 << _PropertyPrecedence.DefaultValue);

            //Loop through providers and find the first provider that is on and contains the property value
            for (var i = startingPrecedence; i <= endingPrecedence; i++) {
                if (!(bitmask & (1 << i)))
                    continue;
                var provider = this._Providers[i];
                if (!provider)
                    continue;
                var val = provider.GetPropertyValue(this, propd);
                if (val === undefined)
                    continue;
                return val;
            }
            return undefined;
        }
        GetValueSpec(propd: DependencyProperty, startingPrecedence?, endingPrecedence?): any {
            if (startingPrecedence === undefined)
                startingPrecedence = _PropertyPrecedence.Highest;
            if (endingPrecedence === undefined)
                endingPrecedence = _PropertyPrecedence.Lowest;

            //Establish providers used
            var bitmask = this._ProviderBitmasks[propd._ID] | (1 << _PropertyPrecedence.DefaultValue);

            //Loop through providers and find the first provider that is on and contains the property value
            for (var i = startingPrecedence; i <= endingPrecedence; i++) {
                if (!(bitmask & (1 << i)))
                    continue;
                var provider = this._Providers[i];
                if (!provider)
                    continue;
                var val = provider.GetPropertyValue(this, propd);
                if (val === undefined)
                    continue;
                return val;
            }
            return undefined;
        }

        SetValue(propd: DependencyProperty, value: any) {
            if (value instanceof Fayde.UnsetValue) {
                this.ClearValue(propd, true);
                return;
            }

            if (value && propd.GetTargetType() === String) {
                if (typeof value !== "string")
                    value = value.toString();
                //TODO: More type checks
            }

            var isValidOut = { IsValid: false };
            value = propd.ValidateSetValue(this._Object, value, isValidOut);
            if (!isValidOut.IsValid)
                return;

            var currentValue;
            var equal = false;

            if ((currentValue = this._LocalValueProvider.GetPropertyValue(this, propd)) === undefined)

            if (currentValue !== undefined && value !== undefined)
                equal = !propd.AlwaysChange && Nullstone.Equals(currentValue, value);
            else
                equal = currentValue === undefined && value === undefined;

            if (!equal) {
                var newValue;
                this._LocalValueProvider.ClearValue(propd);

                newValue = value;

                if (newValue !== undefined) {
                    this._LocalValueProvider.SetValue(propd, newValue);
                }
                var error = new BError();
                this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, error);
                if (error.Message)
                    throw new Exception(error.Message);
            }
        }

        ClearValue(propd: DependencyProperty, notifyListeners?: bool) {
            if (notifyListeners === undefined)
                notifyListeners = true;

            if (this._GetAnimationStorageFor(propd))
                return;

            var oldLocalValue = this._LocalValueProvider.GetPropertyValue(this, propd);

            var error = new BError();
            if (oldLocalValue !== undefined) {
                this._DetachValue(oldLocalValue);
                this._LocalValueProvider.ClearValue(propd);
            }

            /*
            var count = _PropertyPrecedence.Count;
            for (var i = _PropertyPrecedence.LocalValue + 1; i < count; i++) {
                var provider = this._Providers[i];
                if (provider)
                    provider.RecomputePropertyValueOnClear(propd, error);
            }
            */

            if (oldLocalValue !== undefined) {
                this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, oldLocalValue, undefined, notifyListeners, error);
                if (error.Message)
                    throw new Exception(error.Message);
            }
        }

        ReadLocalValue(propd: DependencyProperty): any {
            var val = this._LocalValueProvider.GetPropertyValue(this, propd);
            if (val === undefined)
                return new UnsetValue();
            return val;
        }

        _ProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldProviderValue: any, newProviderValue: any, notifyListeners: bool, error: BError): bool {
            /// Returns true if effective value was changed
            var bitmask = this._ProviderBitmasks[propd._ID] | 0;
            if (newProviderValue !== undefined)
                bitmask |= 1 << providerPrecedence;
            else
                bitmask &= ~(1 << providerPrecedence);
            this._ProviderBitmasks[propd._ID] = bitmask;

            var higher = (((1 << (providerPrecedence + 1)) - 2) & bitmask);

            var propPrecHighest = _PropertyPrecedence.Highest;
            for (var j = providerPrecedence - 1; j >= propPrecHighest; j--) {
                if (!(higher & (1 << j)))
                    continue;
                var provider = this._Providers[j];
                if (!provider)
                    continue;
                if (provider.GetPropertyValue(this, propd) !== undefined)
                    return false;
            }

            var oldValue;
            var newValue;

            if (oldProviderValue === undefined || newProviderValue === undefined) {
                var lowerPriorityValue = this.GetValueSpec(propd, providerPrecedence + 1);
                if (newProviderValue === undefined) {
                    oldValue = oldProviderValue;
                    newValue = lowerPriorityValue;
                } else if (oldProviderValue === undefined) {
                    oldValue = lowerPriorityValue;
                    newValue = newProviderValue;
                }
            } else {
                oldValue = oldProviderValue;
                newValue = newProviderValue;
            }

            //INTENTIONAL: Below checks are different
            if (oldValue === null && newValue === null)
                return false;
            if (oldValue === undefined && newValue === undefined)
                return false;
            if (!propd.AlwaysChange && Nullstone.Equals(oldValue, newValue))
                return false;

            this._PostProviderValueChanged(providerPrecedence, propd, oldValue, newValue, notifyListeners, error);
            return true;
        }
        _PostProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldValue: any, newValue: any, notifyListeners: bool, error: BError) {
            if (!propd.IsCustom) {
                this._DetachValue(oldValue);
                this._AttachValue(newValue, error);
            }

            //Construct property changed event args and raise
            if (notifyListeners) {
                var args = {
                    Property: propd,
                    OldValue: oldValue,
                    NewValue: newValue
                };
                if (propd && propd.ChangedCallback)
                    propd.ChangedCallback(this._Object, args);
                try { this._Object._OnPropertyChanged(args); }
                catch (err) { error.Message = err.Message; }
                this._RaisePropertyChanged(args);
            }
        }

        private _GetAnimationStorageFor(propd: DependencyProperty): any {
            var list = this._AnimStorage[propd._ID];
            if (list && list.length > 0)
                return list[list.length - 1];
            return undefined;
        }
        private _CloneAnimationStorage(sourceStore: BasicProviderStore) {
            var srcRepo = sourceStore._AnimStorage;
            var thisRepo = this._AnimStorage;
            var list;
            for (var key in srcRepo) {
                thisRepo[key] = srcRepo[key].slice(0);
            }
        }
        _AttachAnimationStorage(propd: DependencyProperty, storage): Media.Animation.AnimationStorage {
            var list = this._AnimStorage[propd._ID];
            if (!list) {
                this._AnimStorage[propd._ID] = list = [storage];
                return undefined;
            }

            var attached = list[list.length - 1];
            if (attached)
                attached.Disable();
            list.push(storage);
            return attached;
        }
        _DetachAnimationStorage(propd: DependencyProperty, storage: Media.Animation.AnimationStorage) {
            var list = this._AnimStorage[propd._ID];
            if (!list)
                return;

            var len = list.length;
            if (len < 1)
                return;

            var i;
            var cur: Media.Animation.AnimationStorage;
            for (i = len - 1; i >= 0; i--) {
                cur = list[i];
                if (cur === storage)
                    break;
            }
            if (i === (len - 1)) {
                list.pop();
                if (len > 1)
                    list[len - 2].Enable();
            } else {
                list.splice(i, 1);
                if (i > 0)
                    list[i - 1].StopValue = storage.StopValue;
            }
        }

        _SubscribePropertyChanged(listener: Providers.IPropertyChangedListener) {
            var l = this._PropertyChangedListeners;
            if (l.indexOf(listener) < 0)
                l.push(listener);
        }
        _UnsubscribePropertyChanged(listener: Providers.IPropertyChangedListener) {
            var l = this._PropertyChangedListeners;
            var index = l.indexOf(listener);
            if (index > -1)
                l.splice(index, 1);
        }
        _RaisePropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            var l = this._PropertyChangedListeners;
            var len = l.length;
            for (var i = 0; i < len; i++) {
                l[i].OnPropertyChanged(this._Object, args);
            }
        }
        _AttachValue(value: any, error: BError): bool {
            if (!value)
                return true;
            if (value instanceof XamlObject) {
                return (<XamlObject>value).XamlNode.AttachTo(this._Object.XamlNode, error);
            }
        }
        _DetachValue(value: any) {
            if (!value)
                return;
            if (value instanceof XamlObject) {
                (<XamlObject>value).XamlNode.Detach();
            }
        }

        CloneCore(sourceStore: BasicProviderStore) {
            var dpIds = DependencyProperty._IDs;

            var localStorage = (<any>this._LocalValueProvider)._ht;
            for (var id in localStorage) {
                this.SetValue(dpIds[id], Fayde.Clone(localStorage[id]));
            }

            this._CloneAnimationStorage(sourceStore);
        }
        
        EmitDataContextChanged() { this._InheritedDataContextProvider.EmitChanged(); }
        SetDataContextSourceNode(sourceNode?: XamlNode) { this._InheritedDataContextProvider.SetDataSourceNode(sourceNode); }
    }
    Nullstone.RegisterType(BasicProviderStore, "BasicProviderStore");
}