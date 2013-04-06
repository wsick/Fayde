/// CODE
/// <reference path="DependencyObject.ts" />
/// <reference path="../Runtime/BError.ts" />
/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="InheritedProvider.ts" />

/// <reference path="../Controls/Control.ts" />

module Fayde.Provider {
    export enum _PropertyPrecedence {
        IsEnabled = 0,
        LocalValue = 1,
        DynamicValue = 2,

        LocalStyle = 3,
        ImplicitStyle = 4,

        Inherited = 5,
        InheritedDataContext = 6,
        DefaultValue = 7,
        AutoCreate = 8,
        Lowest = 8,
        Highest = 0,
        Count = 9,
    }

    export class PropertyProvider {
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any { }
        RecomputePropertyValueOnClear(propd: DependencyProperty) { }
        RecomputePropertyValueOnLower(propd: DependencyProperty) { }
    }
    export class AutoCreateProvider extends PropertyProvider {
        private _ht: any[] = [];
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any {
            var value = this.ReadLocalValue(propd);
            if (value !== undefined)
                return value;

            value = propd._IsAutoCreated ? propd._AutoCreator.GetValue(propd, store._Object) : undefined;
            if (value === undefined)
                return undefined;

            this._ht[propd._ID] = value;
            var error = new BError();
            store._ProviderValueChanged(_PropertyPrecedence.AutoCreate, propd, undefined, value, false, true, false, error);
            return value;
        }
        ReadLocalValue(propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty) {
            this._ht[propd._ID] = undefined;
        }
        ClearValue(propd: DependencyProperty) {
            this._ht[propd._ID] = undefined;
        }
    }
    export class LocalValueProvider extends PropertyProvider {
        private _ht: any[] = [];
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        SetValue(propd: DependencyProperty, value: any) {
            this._ht[propd._ID] = value;
        }
        ClearValue(propd: DependencyProperty) {
            this._ht[propd._ID] = undefined;
        }
    }
    export class InheritedIsEnabledProvider extends PropertyProvider {
        private _Source: Controls.Control;
        private _CurrentValue: bool = true;
        private _Store: ProviderStore;
        constructor(store: ProviderStore) {
            super();
            this._Store = store;
        }
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any {
            if (propd._ID === Controls.Control.IsEnabledProperty._ID)
                return this._CurrentValue;
            return undefined;
        }
        SetDataSource(source: DependencyObject) {
            if (source) {
                var curNode = source.XamlNode;
                while (curNode) {
                    if (curNode.XObject instanceof Controls.Control)
                        break;
                    else if (curNode.XObject instanceof FrameworkElement)
                        curNode = curNode.ParentNode;
                    else
                        curNode = null;
                }
                source = (curNode) ? (<DependencyObject>curNode.XObject) : null;
            }
            if (this._Source !== source) {
                this._DetachListener(<Controls.Control>this._Source);
                this._Source = <Controls.Control>source;
                this._AttachListener(<Controls.Control>source);
            }
            if (!source && (this._Store._Object.XamlNode.IsAttached))
                this.LocalValueChanged();
        }
        private _AttachListener(source: Controls.Control) {
            if (!source)
                return;
            var matchFunc = function (sender, args) {
                return this === args.Property; //Closure - Control.IsEnabledProperty
            };
            (<any>source).PropertyChanged.SubscribeSpecific(this._IsEnabledChanged, this, matchFunc, Fayde.Controls.Control.IsEnabledProperty);
            //TODO: Add Handler - Destroyed Event
        }
        private _DetachListener(source: Controls.Control) {
            if (!source)
                return;
            (<any>source).PropertyChanged.Unsubscribe(this._IsEnabledChanged, this, Fayde.Controls.Control.IsEnabledProperty);
            //TODO: Remove Handler - Destroyed Event
        }
        private _IsEnabledChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            this.LocalValueChanged();
        }
        LocalValueChanged(propd?: DependencyProperty) {
            if (propd && propd._ID !== Controls.Control.IsEnabledProperty._ID)
                return false;

            var store = this._Store;
            var localEnabled = store.GetValueSpec(Controls.Control.IsEnabledProperty, _PropertyPrecedence.LocalValue);
            var parentEnabled = false; 
            var source = this._Source;
            if (source && (<UINode>store._Object.XamlNode).VisualParentNode)
                parentEnabled = source.GetValue(Controls.Control.IsEnabledProperty) === true;
            var newValue = localEnabled === true && parentEnabled;
            if (newValue !== this._CurrentValue) {
                var oldValue = this._CurrentValue;
                this._CurrentValue = newValue;

                var error = new BError();
                store._ProviderValueChanged(_PropertyPrecedence.IsEnabled, Controls.Control.IsEnabledProperty, oldValue, newValue, true, false, false, error);
                return true;
            }
            return false;
        }
    }
    export class InheritedDataContextProvider extends PropertyProvider {
        private _Source: FrameworkElement;
        private _Store: ProviderStore;
        constructor(store: ProviderStore) {
            super();
            this._Store = store;
        }
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any {
            var source = this._Source;
            if (!source)
                return;
            if (propd._ID !== FrameworkElement.DataContextProperty._ID)
                return;
            return source._Store.GetValue(FrameworkElement.DataContextProperty);
        }
        SetDataSource(source: FrameworkElement) {
            var oldSource = this._Source;
            if (oldSource === source)
                return;

            var oldValue = oldSource ? oldSource._Store.GetValue(FrameworkElement.DataContextProperty) : undefined;
            var newValue = source ? source._Store.GetValue(FrameworkElement.DataContextProperty) : undefined;

            this._DetachListener(oldSource);
            this._Source = source;
            this._AttachListener(source);

            if (!Nullstone.Equals(oldValue, newValue)) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, oldValue, newValue, false, false, false, error);
            }
        }
        private _AttachListener(source: FrameworkElement) {
            if (!source)
                return;
            var matchFunc = function (sender, args) {
                return this === args.Property; //Closure - FrameworkElement.DataContextProperty
            };
            (<any>source).PropertyChanged.SubscribeSpecific(this._SourceDataContextChanged, this, matchFunc, FrameworkElement.DataContextProperty);
            //TODO: Add Handler - Destroyed Event
        }
        private _DetachListener(source: FrameworkElement) {
            if (!source)
                return;
            (<any>source).PropertyChanged.Unsubscribe(this._SourceDataContextChanged, this, FrameworkElement.DataContextProperty);
            //TODO: Remove Handler - Destroyed Event
        }
        private _SourceDataContextChanged(sender, args) {
            var error = new BError();
            this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, args.OldValue, args.NewValue, true, false, false, error);
        }
        private EmitChanged() {
            if (this._Source) {
                var error = new BError();
                this._Store._ProviderValueChanged(_PropertyPrecedence.InheritedDataContext, FrameworkElement.DataContextProperty, undefined, this._Source._Store.GetValue(FrameworkElement.DataContextProperty), true, false, false, error);
            }
        }
    }

    export class ProviderStore {
        _Object: DependencyObject;
        private _Providers: PropertyProvider[] = [null, null, null, null, null, null, null, null, null];
        _ProviderBitmasks: number[] = [];
        private _AnimStorage: any[][] = [];
        
        private _InheritedIsEnabledProvider: InheritedIsEnabledProvider;
        private _LocalValueProvider: LocalValueProvider;
        private _DynamicValueProvider: PropertyProvider;
        private _LocalStyleProvider: PropertyProvider;
        private _ImplicitStyleProvider: PropertyProvider;
        private _InheritedProvider: Inherited.InheritedProvider;
        private _InheritedDataContextProvider: InheritedDataContextProvider;
        private _DefaultValueProvider: PropertyProvider;
        private _AutoCreateProvider: AutoCreateProvider;

        constructor(dobj: DependencyObject) {
            this._Object = dobj;
        }

        static BuildBitmask(propd: DependencyProperty): number {
            var bitmask = (1 << _PropertyPrecedence.Inherited) | (1 << _PropertyPrecedence.DynamicValue);
            if (propd._IsAutoCreated)
                bitmask |= (1 << _PropertyPrecedence.AutoCreate);
            if (propd._HasDefaultValue)
                bitmask |= (1 << _PropertyPrecedence.DefaultValue);
            return bitmask;
        }

        GetValue(propd: DependencyProperty) {
            var startingPrecedence = _PropertyPrecedence.Highest;
            var endingPrecedence = _PropertyPrecedence.Lowest;

            //Establish providers used
            var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;

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
            var bitmask = this._ProviderBitmasks[propd._ID] | propd._BitmaskCache;

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
            if (!isValidOut)
                return;

            var currentValue;
            var equal = false;

            if ((currentValue = this.ReadLocalValue(propd)) === undefined)
                if (propd._IsAutoCreated)
                    currentValue = this._AutoCreateProvider.ReadLocalValue(propd);

            if (currentValue !== undefined && value !== undefined)
                equal = !propd._AlwaysChange && Nullstone.Equals(currentValue, value);
            else
                equal = currentValue === undefined && value === undefined;

            if (!equal) {
                var newValue;
                this._LocalValueProvider.ClearValue(propd);
                if (propd._IsAutoCreated)
                    this._AutoCreateProvider.ClearValue(propd);

                newValue = value;

                if (newValue !== undefined) {
                    this._LocalValueProvider.SetValue(propd, newValue);
                }
                var error = new BError();
                this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, currentValue, newValue, true, true, true, error);
                if (error.Message)
                    throw new Exception(error.Message);
            }
        }

        ClearValue(propd: DependencyProperty, notifyListeners?: bool) {
            if (notifyListeners === undefined)
                notifyListeners = true;

            if (this._GetAnimationStorageFor(propd))
                return;

            var oldLocalValue;
            if ((oldLocalValue = this.ReadLocalValue(propd)) === undefined) {
                if (propd._IsAutoCreated)
                    oldLocalValue = this._AutoCreateProvider.ReadLocalValue(propd);
            }

            if (oldLocalValue !== undefined) {
                this._DetachValue(oldLocalValue);
                this._LocalValueProvider.ClearValue(propd);
                if (propd._IsAutoCreated)
                    this._AutoCreateProvider.ClearValue(propd);
            }

            var count = _PropertyPrecedence.Count;
            for (var i = _PropertyPrecedence.LocalValue + 1; i < count; i++) {
                var provider = this._Providers[i];
                if (provider)
                    provider.RecomputePropertyValueOnClear(propd);
            }

            if (oldLocalValue !== undefined) {
                var error = new BError();
                this._ProviderValueChanged(_PropertyPrecedence.LocalValue, propd, oldLocalValue, undefined, notifyListeners, true, false, error);
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

        _ProviderValueChanged(providerPrecedence: number, propd: DependencyProperty, oldProviderValue: any, newProviderValue: any, notifyListeners: bool, setParent: bool, mergeNamesOnSetParent: bool, error: BError) {
            delete this._Object._CachedValues[propd._ID];

            var bitmask = this._ProviderBitmasks[propd._ID] | 0;
            if (newProviderValue !== undefined)
                bitmask |= 1 << providerPrecedence;
            else
                bitmask &= ~(1 << providerPrecedence);
            this._ProviderBitmasks[propd._ID] = bitmask;

            var higher = (((1 << (providerPrecedence + 1)) - 2) & bitmask) | propd._BitmaskCache;

            var propPrecHighest = _PropertyPrecedence.Highest;
            for (var j = providerPrecedence - 1; j >= propPrecHighest; j--) {
                if (!(higher & (1 << j)))
                    continue;
                var provider = this._Providers[j];
                if (!provider)
                    continue;
                if (provider.GetPropertyValue(this, propd) !== undefined) {
                    this._CallRecomputePropertyValueForProviders(propd, providerPrecedence);
                    return;
                }
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
                return;
            if (oldValue === undefined && newValue === undefined)
                return;
            if (!propd._AlwaysChange && Nullstone.Equals(oldValue, newValue))
                return;

            var iiep;
            if (providerPrecedence !== _PropertyPrecedence.IsEnabled && (iiep = this._InheritedIsEnabledProvider) && iiep.LocalValueChanged(propd))
                return;

            this._CallRecomputePropertyValueForProviders(propd, providerPrecedence);

            var setsParent = setParent && !propd.IsCustom;

            this._DetachValue(oldValue);
            this._AttachValue(newValue);

            //Construct property changed event args and raise
            if (notifyListeners) {
                var args = {
                    Property: propd,
                    OldValue: oldValue,
                    NewValue: newValue
                };
                try { this._Object._OnPropertyChanged(args); }
                catch (err) { error.Message = err.Message; }

                if (propd && propd._ChangedCallback)
                    propd._ChangedCallback(this._Object, args);

                if (propd._Inheritable > 0 && providerPrecedence !== _PropertyPrecedence.Inherited) {
                    // NOTE: We only propagate if inherited exists and has the highest priority in the bitmask
                    var inheritedProvider = this._InheritedProvider;
                    // GetPropertyValueProvider(propd) < _PropertyPrecedence.Inherited
                    if (inheritedProvider && ((this._ProviderBitmasks[propd._ID] & ((1 << _PropertyPrecedence.Inherited) - 1)) !== 0))
                        inheritedProvider.PropagateInheritedProperty(this, propd, this._Object, this._Object);
                }
            }
        }

        private _GetAnimationStorageFor(propd: DependencyProperty): any {
            var list = this._AnimStorage[propd._ID];
            if (list && list.length > 0)
                return list[list.length - 1];
            return undefined;
        }
        private _CloneAnimationStorage(sourceStore: ProviderStore) {
            var srcRepo = sourceStore._AnimStorage;
            var thisRepo = this._AnimStorage;
            var list;
            for (var key in srcRepo) {
                thisRepo[key] = srcRepo[0].slice(0);
            }
        }
        private _AttachAnimationStorage(propd: DependencyProperty, storage) {
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
        private _DetachAnimationStorage(propd: DependencyProperty, storage) {
            var list = this._AnimStorage[propd._ID];
            if (!list)
                return;

            var len = list.length;
            if (len < 1)
                return;

            var i;
            var cur;
            for (i = len - 1; i >= 0; i++) {
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

        private _CallRecomputePropertyValueForProviders(propd: DependencyProperty, providerPrecedence: _PropertyPrecedence) {
            for (var i = 0; i < providerPrecedence; i++) {
                var provider = this._Providers[i];
                if (provider)
                    provider.RecomputePropertyValueOnLower(propd);
            }
        }
        
        private _AttachValue(value: any) {
            if (!value)
                return;
            if (value instanceof DependencyObject) {
                (<XamlObject>value).XamlNode.AttachTo(this._Object.XamlNode);
                //TODO: 
                //  AddPropertyChangedListener (SubPropertyChanged)
                //  If (is collection)
                //      Subscribe Changed
                //      Subscribe ItemChanged
            } else if (value instanceof XamlObject) {
                (<XamlObject>value).XamlNode.AttachTo(this._Object.XamlNode);
            }
        }
        private _DetachValue(value: any) {
            if (!value)
                return;
            if (value instanceof DependencyObject) {
                (<XamlObject>value).XamlNode.Detach();
                //TODO: 
                //  RemovePropertyChangedListener (SubPropertyChanged)
                //  If (is collection)
                //      Unsubscribe Changed
                //      Unsubscribe ItemChanged
            } else if (value instanceof XamlObject) {
                (<XamlObject>value).XamlNode.Detach();
            }
        }
    }
}