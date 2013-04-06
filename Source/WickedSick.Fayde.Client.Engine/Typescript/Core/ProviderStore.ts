/// CODE
/// <reference path="DependencyObject.ts" />
/// <reference path="../Runtime/BError.ts" />
/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="InheritedProvider.ts" />

/// <reference path="../Controls/Control.ts" />
/// <reference path="Style.ts" />

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
    export enum _StyleIndex {
        VisualTree = 0,
        ApplicationResources = 1,
        GenericXaml = 2,
        Count = 3,
    }
    export enum _StyleMask {
        None = 0,
        VisualTree = 1 << _StyleIndex.VisualTree,
        ApplicationResources = 1 << _StyleIndex.ApplicationResources,
        GenericXaml = 1 << _StyleIndex.GenericXaml,
        All = _StyleMask.VisualTree | _StyleMask.ApplicationResources | _StyleMask.GenericXaml,
    }

    export class PropertyProvider {
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any { }
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError) { }
        RecomputePropertyValueOnLower(propd: DependencyProperty, error: BError) { }
    }
    export class DefaultValueProvider extends PropertyProvider {
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any {
            return propd.DefaultValue;
        }
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
    export class LocalStyleProvider extends PropertyProvider {
        private _ht: any[] = [];
        private _Style: Style;
        private _Store: ProviderStore;
        constructor(store: ProviderStore) {
            super();
            this._Store = store;
        }
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError) {
            var oldValue;
            var newValue;
            var walkPropd;

            var walker = DeepStyleWalker.Single(this._Style);
            var setter;
            while (setter = walker.Step()) {
                walkPropd = setter.Property;
                if (walkPropd._ID !== propd._ID)
                    continue;

                newValue = setter.ConvertedValue;
                oldValue = this._ht[propd._ID];
                this._ht[propd._ID] = newValue;
                this._Store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, propd, oldValue, newValue, true, true, true, error);
                if (error.Message)
                    return;
            }
        }
        UpdateStyle(style: Style, error: BError) {
            var store = this._Store;
            var oldValue = undefined;
            var newValue = undefined;

            var oldWalker = DeepStyleWalker.Single(this._Style);
            var newWalker = DeepStyleWalker.Single(style);
            style.Seal();

            var oldSetter = oldWalker.Step();
            var newSetter = newWalker.Step();
            var oldProp;
            var newProp;

            while (oldSetter || newSetter) {
                if (oldSetter)
                    oldProp = oldSetter.Property;
                if (newSetter)
                    newProp = newSetter.Property;
                if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
                    //Property in old style, not in new style
                    oldValue = oldSetter.ConvertedValue;
                    newValue = undefined;
                    this._ht[oldProp._ID] = undefined;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, true, false, error);
                    oldSetter = oldWalker.Step();
                } else if (oldProp === newProp) {
                    //Property in both styles
                    oldValue = oldSetter.ConvertedValue;
                    newValue = newSetter.ConvertedValue;
                    this._ht[oldProp._ID] = newValue;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, oldProp, oldValue, newValue, true, true, false, error);
                    oldSetter = oldWalker.Step();
                    newSetter = newWalker.Step();
                } else {
                    //Property in new style, not in old style
                    oldValue = undefined;
                    newValue = newSetter.ConvertedValue;
                    this._ht[newProp._ID] = newValue;
                    store._ProviderValueChanged(_PropertyPrecedence.LocalStyle, newProp, oldValue, newValue, true, true, false, error);
                    newSetter = newWalker.Step();
                }
            }

            this._Style = style;
        }
    }
    export class ImplicitStyleProvider extends PropertyProvider {
        private _ht: any[] = [];
        private _Styles: any[] = [null, null, null];
        private _StyleMask: _StyleMask = _StyleMask.None;
        private _Store: ProviderStore;
        constructor(store: ProviderStore) {
            super();
            this._Store = store;
        }
        GetPropertyValue(store: ProviderStore, propd: DependencyProperty): any {
            return this._ht[propd._ID];
        }
        RecomputePropertyValueOnClear(propd: DependencyProperty, error: BError) {
            if (!this._Styles)
                return;

            var oldValue;
            var newValue;
            var prop;

            var walker = DeepStyleWalker.Multiple(this._Styles);
            var setter;
            while (setter = walker.Step()) {
                prop = setter.Property;
                if (prop._ID !== propd._ID)
                    continue;

                newValue = setter.ConvertedValue;
                oldValue = this._ht[propd._ID];
                this._ht[propd._ID] = newValue;
                this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, propd, oldValue, newValue, true, true, true, error);
                if (error.Message)
                    return;
            }
        }
        SetStyles(styleMask: _StyleMask, styles: Style[], error: BError) {
            if (!styles)
                return;

            var newStyles = [null, null, null];
            if (this._Styles) {
                newStyles[_StyleIndex.GenericXaml] = this._Styles[_StyleIndex.GenericXaml];
                newStyles[_StyleIndex.ApplicationResources] = this._Styles[_StyleIndex.ApplicationResources];
                newStyles[_StyleIndex.VisualTree] = this._Styles[_StyleIndex.VisualTree];
            }
            if (styleMask & _StyleMask.GenericXaml)
                newStyles[_StyleIndex.GenericXaml] = styles[_StyleIndex.GenericXaml];
            if (styleMask & _StyleMask.ApplicationResources)
                newStyles[_StyleIndex.ApplicationResources] = styles[_StyleIndex.ApplicationResources];
            if (styleMask & _StyleMask.VisualTree)
                newStyles[_StyleIndex.VisualTree] = styles[_StyleIndex.VisualTree];

            this._ApplyStyles(this._StyleMask | styleMask, newStyles, error);
        }
        ClearStyles(styleMask: _StyleMask, error: BError) {
            if (!this._Styles)
                return;

            var newStyles = this._Styles.slice(0);
            //TODO: Do we need a deep copy?
            if (styleMask & _StyleMask.GenericXaml)
                newStyles[_StyleIndex.GenericXaml] = null;
            if (styleMask & _StyleMask.ApplicationResources)
                newStyles[_StyleIndex.ApplicationResources] = null;
            if (styleMask & _StyleMask.VisualTree)
                newStyles[_StyleIndex.VisualTree] = null;

            this._ApplyStyles(this._StyleMask & ~styleMask, newStyles, error);
        }
        private _ApplyStyles(styleMask: _StyleMask, styles: Style[], error: BError) {
            var isChanged = !this._Styles || styleMask !== this._StyleMask;
            if (!isChanged) {
                for (var i = 0; i < _StyleIndex.Count; i++) {
                    if (styles[i] !== this._Styles[i]) {
                        isChanged = true;
                        break;
                    }
                }
            }
            if (!isChanged)
                return;

            var oldValue;
            var newValue;

            var oldWalker = DeepStyleWalker.Multiple(this._Styles);
            var newWalker = DeepStyleWalker.Multiple(styles);

            var oldSetter = oldWalker.Step();
            var newSetter = newWalker.Step();

            while (oldSetter || newSetter) {
                var oldProp;
                var newProp;
                if (oldSetter)
                    oldProp = oldSetter.Property;
                if (newSetter)
                    newProp = newSetter.Property;

                if (oldProp && (oldProp < newProp || !newProp)) { //WTF: Less than?
                    //Property in old style, not in new style
                    oldValue = oldSetter.ConvertedValue;
                    newValue = undefined;
                    this._ht[oldProp._ID] = undefined;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, true, false, error);
                    oldSetter = oldWalker.Step();
                }
                else if (oldProp == newProp) {
                    //Property in both styles
                    oldValue = oldSetter.ConvertedValue;
                    newValue = newSetter.ConvertedValue;
                    this._ht[oldProp._ID] = newValue;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, oldProp, oldValue, newValue, true, true, false, error);
                    oldSetter = oldWalker.Step();
                    newSetter = newWalker.Step();
                } else {
                    //Property in new style, not in old style
                    oldValue = undefined;
                    newValue = newSetter.ConvertedValue;
                    this._ht[newProp._ID] = newValue;
                    this._Store._ProviderValueChanged(_PropertyPrecedence.ImplicitStyle, newProp, oldValue, newValue, true, true, false, error);
                    newSetter = newWalker.Step();
                }
            }

            this._Styles = styles;
            this._StyleMask = styleMask;
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
        private _LocalStyleProvider: LocalStyleProvider;
        private _ImplicitStyleProvider: ImplicitStyleProvider;
        private _InheritedProvider: Inherited.InheritedProvider;
        private _InheritedDataContextProvider: InheritedDataContextProvider;
        private _DefaultValueProvider: DefaultValueProvider;
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

            var error = new BError();
            var count = _PropertyPrecedence.Count;
            for (var i = _PropertyPrecedence.LocalValue + 1; i < count; i++) {
                var provider = this._Providers[i];
                if (provider)
                    provider.RecomputePropertyValueOnClear(propd, error);
            }

            if (oldLocalValue !== undefined) {
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
            var error = new BError();
            for (var i = 0; i < providerPrecedence; i++) {
                var provider = this._Providers[i];
                if (provider)
                    provider.RecomputePropertyValueOnLower(propd, error);
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