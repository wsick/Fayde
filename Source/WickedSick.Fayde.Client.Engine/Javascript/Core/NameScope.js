/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE

//#region NameScope
var NameScope = Nullstone.Create("NameScope", DependencyObject);

NameScope.Instance.Init = function () {
    this.Init$DependencyObject();
    this._IsLocked = false;
    this._Names = null;
    this._Temporary = false;
};

//#region DEPENDENCY PROPERTIES

NameScope.NameScopeProperty = DependencyProperty.RegisterAttached("NameScope", function () { return NameScope; }, NameScope);
NameScope.GetNameScope = function (d) {
    /// <param name="d" type="DependencyObject"></param>
    /// <returns type="NameScope" />
    return d.$GetValue(NameScope.NameScopeProperty);
};
NameScope.SetNameScope = function (d, value) {
    /// <param name="d" type="DependencyObject"></param>
    /// <param name="value" type="NameScope"></param>
    d.SetValue(NameScope.NameScopeProperty, value);
};

//#endregion

NameScope.Instance.GetIsLocked = function () {
    /// <returns type="Boolean" />
    return this._IsLocked;
};
NameScope.Instance.Lock = function () {
    this._IsLocked = true;
};

NameScope.Instance.RegisterName = function (name, obj) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        this._Names = [];

    var existingObj = this._Names[name];
    if (existingObj == obj)
        return;

    if (existingObj) {
        //TODO: Remove Handler - Destroyed Event (existingObj)
    }

    //TODO: Add Handler - Destroyed Event (obj)
    this._Names[name] = obj;
};
NameScope.Instance.UnregisterName = function (name) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        return;

    var objd = this._Names[name];
    if (objd instanceof DependencyObject) {
        //TODO: Remove handler - Destroyed Event
        delete this._Names[name];
    }
};
NameScope.Instance.FindName = function (name) {
    /// <param name="name" type="String"></param>
    /// <returns type="DependencyObject" />
    if (!this._Names)
        return undefined;
    if (name == null) {
        Warn("(null) name specified in NameScope.FindName.");
        return undefined;
    }
    return this._Names[name];
};

NameScope.Instance._MergeTemporaryScope = function (temp, error) {
    if (!temp || !temp._Names)
        return;

    for (var name in temp._Names) {
        var value = temp._Names[name];
        var o = this.FindName(name);
        if (o && o !== value) {
            error.SetErrored(BError.Argument, "The name already exists in the tree.");
            return;
        }
    }

    for (var name in temp._Names) {
        this.RegisterName(name, temp._Names[name]);
    }
};
NameScope.Instance._GetTemporary = function () {
    return this._Temporary;
};
NameScope.Instance._SetTemporary = function (value) {
    this._Temporary = value;
};

Nullstone.FinishCreate(NameScope);
//#endregion