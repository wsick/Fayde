/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="../Data/PropertyPath.js"/>
/// <reference path="../Core/Collections/Collection.js"/>
/// <reference path="../Controls/TextBlock.js"/>
/// <reference path="UnsetValue.js"/>

//#region DependencyProperty
var DependencyProperty = Nullstone.Create("DependencyProperty", null, 10);

DependencyProperty.Instance.Init = function (name, getTargetType, ownerType, defaultValue, autoCreator, coercer, alwaysChange, validator, isCustom, changedCallback) {
    this.Name = name;
    this.GetTargetType = getTargetType;
    this.OwnerType = ownerType;
    this.DefaultValue = defaultValue;
    this._AutoCreator = autoCreator;
    this._Coercer = coercer;
    this._AlwaysChange = alwaysChange;
    this._Validator = validator;
    this._IsCustom = isCustom;
    this._ChangedCallback = changedCallback;
};

DependencyProperty.Instance.toString = function () {
    var ownerTypeName = this.OwnerType._TypeName;
    return ownerTypeName + "." + this.Name.toString();
};
DependencyProperty.Instance.GetDefaultValue = function (obj) {
    if (this._HasDefaultValue)
        return this.DefaultValue;
    return this._GetAutoCreatedValue(obj);
};
DependencyProperty.Instance._HasDefaultValue = function () {
    return this.DefaultValue != null;
};
DependencyProperty.Instance._IsAutoCreated = function () {
    return this._AutoCreator != undefined && this._AutoCreator != null;
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
    if (!propd && ownerType != null && ownerType._IsNullstone) {
        propd = DependencyProperty.GetDependencyProperty(ownerType._BaseClass, name);
    }
    return propd;
};

DependencyProperty.ResolvePropertyPath = function (refobj, propertyPath, promotedValues) {
    /// <param name="refobj" type="Object"></param>
    /// <param name="propertyPath" type="_PropertyPath"></param>
    /// <returns type="DependencyProperty" />

    if (propertyPath.HasDependencyProperty())
        return propertyPath.GetDependencyProperty();

    var path = propertyPath.GetPath();
    if (propertyPath.GetExpandedPath() != null)
        path = propertyPath.GetExpandedPath();

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
            if (propertyPath.GetExpandedPath() == null)
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
        var newLu = null;
        if ((value = data.lu.GetValue(data.res)) == null)
            return false;
        if ((newLu = Nullstone.As(value, DependencyObject)) == null)
            return false;

        if (data.promotedValues != null && !cloned && data.promotedValues[value._ID] == null && !(value instanceof UIElement)) {
            var clonedValue = Object.Clone(value);
            var clonedDo = Nullstone.As(clonedValue, DependencyObject);
            if (clonedDo != null) {
                newLu = clonedDo;
                data.lu.SetValue(data.res, clonedValue);
                clonedValue = data.lu.GetValue(data.res);
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
        if ((value = data.lu.GetValue(data.res)) == null)
            return false;
    }

    if ((data.collection = Nullstone.As(value, Collection)) == null)
        return false;
    if ((value = data.collection.GetValueAt(data.i)) == null)
        return false;
    if ((data.lu = Nullstone.As(value, DependencyObject)) == null)
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

    if (data.index === data.end)
        return false;

    c = data.path.charAt(data.index);
    if (c === '.') {
        // we found a type name, now find the property name
        if ((data.index - start) === 11 && data.path.substr(start, 11).toLowerCase() === "textelement") { //bug workaround from Blend
            data.type = TextBlock;
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
DependencyProperty._LookupType = function (name) {
    return eval(name);
};

Nullstone.FinishCreate(DependencyProperty);
//#endregion