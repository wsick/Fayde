/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../Data/PropertyPath.js"/>
/// <reference path="../Core/Collections/InternalCollection.js"/>
/// <reference path="../Controls/TextBlock.js"/>
/// <reference path="UnsetValue.js"/>

(function (namespace) {
    var DependencyProperty = Nullstone.Create("DependencyProperty", undefined, 13);

    DependencyProperty._LastID = 0;
    DependencyProperty._Inherited = {};
    DependencyProperty.Instance.Init = function (name, getTargetType, ownerType, defaultValue, autoCreator, coercer, alwaysChange, validator, isCustom, changedCallback, isReadOnly, isAttached, inheritable) {
        this.Name = name;
        this.GetTargetType = getTargetType;
        this.OwnerType = ownerType;
        this.DefaultValue = defaultValue;
        this._HasDefaultValue = defaultValue !== undefined;
        this._AutoCreator = autoCreator;
        this._IsAutoCreated = autoCreator != null;
        this._Coercer = coercer;
        this._AlwaysChange = alwaysChange;
        this._Validator = validator;
        this._IsCustom = isCustom;
        this._ChangedCallback = changedCallback;
        this.IsReadOnly = isReadOnly === true;
        this._IsAttached = isAttached;
        DependencyProperty._LastID = this._ID = DependencyProperty._LastID + 1;

        var propPrecEnum = _PropertyPrecedence;
        var bitmask = (1 << propPrecEnum.Inherited) | (1 << propPrecEnum.DynamicValue);
        if (this._IsAutoCreated)
            bitmask |= (1 << propPrecEnum.AutoCreate);
        if (this._HasDefaultValue)
            bitmask |= (1 << propPrecEnum.DefaultValue);
        this._BitmaskCache = bitmask;

        this._Inheritable = inheritable;
        if (inheritable !== undefined) {
            var i = DependencyProperty._Inherited;
            if (!i[inheritable])
                i[inheritable] = [];
            i[inheritable].push(this);
        }
    };

    DependencyProperty.Instance.toString = function () {
        return this._ID;
        //var ownerTypeName = this.OwnerType._TypeName;
        //return ownerTypeName + "." + this.Name.toString();
    };
    DependencyProperty.Instance.GetDefaultValue = function (obj) {
        if (this._HasDefaultValue)
            return this.DefaultValue;
        return this._GetAutoCreatedValue(obj);
    };
    DependencyProperty.Instance._GetAutoCreatedValue = function (obj) {
        return this._AutoCreator.GetValue(this, obj);
    };
    DependencyProperty.Instance._HasCoercer = function () {
        return this._Coercer != null;
    };
    DependencyProperty.Instance._Coerce = function (instance, value, error) {
        if (!this._Coercer)
            return value;
        return this._Coercer.GetValue(instance, this, value, error);
    };
    DependencyProperty.Instance._Validate = function (instance, propd, value, error) {
        if (!this._Validator)
            return true;
        return this._Validator(instance, propd, value, error);
    };

    DependencyProperty.Register = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true);
    };
    DependencyProperty.RegisterReadOnly = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, true);
    };
    DependencyProperty.RegisterAttached = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, true, false, true);
    }

    DependencyProperty.RegisterCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, false);
    };
    DependencyProperty.RegisterReadOnlyCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, false, true);
    };
    DependencyProperty.RegisterAttachedCore = function (name, getTargetType, ownerType, defaultValue, changedCallback) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, undefined, undefined, undefined, undefined, false, false, true);
    };

    DependencyProperty.RegisterInheritable = function (name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, inheritable) {
        return DependencyProperty.RegisterFull(name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, undefined, undefined, undefined, false, undefined, true, inheritable);
    };

    DependencyProperty.RegisterFull = function (name, getTargetType, ownerType, defaultValue, changedCallback, autocreator, coercer, alwaysChange, validator, isCustom, isReadOnly, isAttached, inheritable) {
        if (!DependencyProperty._IDs)
            DependencyProperty._IDs = [];
        if (!DependencyProperty._Registered)
            DependencyProperty._Registered = [];
        if (!DependencyProperty._Registered[ownerType._TypeName])
            DependencyProperty._Registered[ownerType._TypeName] = [];
        var propd = new DependencyProperty(name, getTargetType, ownerType, defaultValue, autocreator, coercer, alwaysChange, validator, isCustom, changedCallback, isReadOnly, isAttached, inheritable);
        if (DependencyProperty._Registered[ownerType._TypeName][name] !== undefined)
            throw new InvalidOperationException("Dependency Property is already registered. [" + ownerType._TypeName + "." + name + "]");
        DependencyProperty._Registered[ownerType._TypeName][name] = propd;
        DependencyProperty._IDs[propd._ID] = propd;
        return propd;
    };
    DependencyProperty.GetDependencyProperty = function (ownerType, name) {
        var reg = DependencyProperty._Registered;
        if (!reg)
            return null;
        if (!ownerType)
            return null;
        var reg = reg[ownerType._TypeName];
        var propd;
        if (reg)
            propd = reg[name];
        if (!propd && ownerType && ownerType._IsNullstone) {
            propd = DependencyProperty.GetDependencyProperty(ownerType._BaseClass, name);
        }
        return propd;
    };

    DependencyProperty.ResolvePropertyPath = function (refobj, propertyPath, promotedValues) {
        /// <param name="refobj" type="Object"></param>
        /// <param name="propertyPath" type="PropertyPath"></param>
        /// <returns type="DependencyProperty" />

        if (propertyPath.HasDependencyProperty)
            return propertyPath.DependencyProperty;

        var path = propertyPath.Path;
        if (propertyPath.ExpandedPath != null)
            path = propertyPath.ExpandedPath;

        var data = {
            index: 0,
            end: path.length,
            path: path,
            parenOpen: false,
            tickOpen: false,
            start: path,
            prop: path,
            res: null,
            cloned: false,
            expressionFound: false,
            lu: refobj.Value,
            collection: null,
            promotedValues: promotedValues
        };

        var success;
        while (data.index < data.end) {
            success = true;
            var c = data.path.charAt(data.index);
            data.index++;
            if (c === '(') {
                data.parenOpen = true;
            } else if (c === ')') {
                data.parenOpen = false;
            } else if (c === '\'') {//Ticks only legal in expanded path
                if (propertyPath.ExpandedPath == null)
                    Warn("The ' character is not legal in property paths.");
                else
                    data.tickOpen = !data.tickOpen;
            } else if (c === '.') {
                success = DependencyProperty._HandlePeriod(data);
            } else if (c === '[') {
                success = DependencyProperty._HandleLeftBracket(data);
            } else {
                success = DependencyProperty._HandleDefault(data);
            }
            if (!success) {
                refobj.Value = null;
                return null;
            }
        }
        refobj.Value = data.lu;
        return data.res;
    };

    DependencyProperty._HandlePeriod = function (data) {
        if (data.tickOpen)
            return true;
        if (data.res != null) {
            var value = null;
            if ((value = data.lu._GetValue(data.res)) == null)
                return false;
            if (!(value instanceof Fayde.DependencyObject))
                return false;

            var newLu = value;
            if (data.promotedValues != null && data.promotedValues[value._ID] == null && !(value instanceof Fayde.UIElement)) {
                var clonedValue = Fayde.Clone(value);
                if (clonedValue instanceof Fayde.DependencyObject) {
                    newLu = clonedValue;
                    data.lu._SetValue(data.res, clonedValue);
                    clonedValue = data.lu._GetValue(data.res);
                    data.promotedValues[clonedValue._ID] = clonedValue;
                }
            }

            data.lu = newLu;
        }
        data.expressionFound = false;
        data.prop = data.path.substr(data.index);
        return true;
    };
    DependencyProperty._HandleLeftBracket = function (data) {
        if (data.index >= data.end)
            return;

        var hasLeadingZeroes = false;
        while (data.path.charAt(data.index) === '0') {
            hasLeadingZeroes = true;
            data.index++;
        }
        data.i = parseInt(data.path.substr(data.index), 10);
        if (!isNaN(data.i))
            data.index += data.i.toString().length;
        if (isNaN(data.i) && hasLeadingZeroes)
            data.i = 0;

        if (data.path.charAt(data.index) !== ']' || data.path.charAt(data.index + 1) !== '.')
            return true;

        data.prop = data.path = data.path.substr(data.index + 2);
        data.index = 0;
        data.end = data.path.length;

        var value = null;
        if (data.expressionFound) {
            data.expressionFound = false;
            if ((value = data.lu.$GetValue(data.res)) == null)
                return false;
        }

        if ((data.collection = Nullstone.As(value, Fayde.InternalCollection)) == null)
            return false;
        if ((value = data.collection.GetValueAt(data.i)) == null)
            return false;
        if ((data.lu = Nullstone.As(value, Fayde.DependencyObject)) == null)
            return false;
        return true;
    };
    DependencyProperty._HandleDefault = function (data) {
        var explicitType = false;
        data.expressionFound = true;
        var start = data.index - 1;

        var c;
        while (data.index < data.end) {
            c = data.path.charAt(data.index);
            if (!((c !== '.' || data.tickOpen) && (!data.parenOpen || c !== ')') && c !== '['))
                break;
            data.index++;
            if (c === '\'') {
                data.tickOpen = !data.tickOpen;
                if (!data.tickOpen)
                    break;
            }
        }

        if (data.index === data.end) {
            // This happened because a property at the end of the path ended like this: '.Property'
            // We only fail if we can't find the property
            data.type = data.lu.constructor;
        } else {
            c = data.path.charAt(data.index);
            if (c === '.') {
                // we found a type name, now find the property name
                if ((data.index - start) === 11 && data.path.substr(start, 11).toLowerCase() === "textelement") { //bug workaround from Blend
                    data.type = Fayde.Controls.TextBlock;
                    data.explicitType = true;
                } else {
                    var s = data.index;
                    if (data.path.charAt(data.index - 1) === '\'' && !data.tickOpen) {
                        s = data.index - 1;
                    }
                    var name = data.path.slice(start, s);
                    data.type = DependencyProperty._LookupType(name);
                    data.explicitType = true;
                    if (data.type == null)
                        data.type = data.lu.constructor;
                }
                data.index++;
                start = data.index;
                while (data.index < data.end) {
                    c = data.path.charAt(data.index);
                    if (!((!data.parenOpen || c !== ')') && (c !== '.' || data.tickOpen)))
                        break;
                    data.index++;
                    if (c === '\'') {
                        data.tickOpen = !data.tickOpen;
                        if (!data.tickOpen)
                            break;
                    }
                }
                if (data.index === start)
                    return false;
            } else {
                data.type = data.lu.constructor;
                data.explicitType = false;
            }

            c = data.path.charAt(data.index);
            if ((c !== ')' && data.parenOpen) || data.type == null)
                return false;
        }
        name = data.path.slice(start, data.index);
        if ((data.res = DependencyProperty.GetDependencyProperty(data.type, name)) == null && data.lu)
            data.res = DependencyProperty.GetDependencyProperty(data.lu.constructor, name);

        if (data.res == null)
            return false;

        if (!data.res._IsAttached && !(data.lu instanceof data.type)) {
            if ((data.res = DependencyProperty.GetDependencyProperty(data.lu.constructor, name)) == null)
                return false;
        }

        if (data.res._IsAttached && data.explicitType && !data.parenOpen)
            return false;

        return true;
    };
    var lookupNamespaces = [];
    DependencyProperty._LookupType = function (name) {
        lookupNamespaces.push(Fayde);
        lookupNamespaces.push(Fayde.Controls);
        lookupNamespaces.push(Fayde.Media);
        lookupNamespaces.push(Fayde.Controls.Primitives);
        lookupNamespaces.push(window);

        var len = lookupNamespaces.length;
        for (var i = 0; i < len; i++) {
            var potentialType = lookupNamespaces[i][name];
            if (potentialType)
                return potentialType;
        }
        return eval(name);
    };

    namespace.DependencyProperty = Nullstone.FinishCreate(DependencyProperty);
})(window);