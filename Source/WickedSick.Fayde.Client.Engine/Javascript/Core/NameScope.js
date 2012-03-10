/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE

//#region NameScope

function NameScope() {
    if (!Nullstone.IsReady)
        return;
    this.$super();

    this._IsLocked = false;
    this._Names = null;
    this._Temporary = false;
}
Nullstone.Extend(NameScope, "NameScope", DependencyObject);

//#region DEPENDENCY PROPERTIES

NameScope.NameScopeProperty = DependencyProperty.RegisterAttached("NameScope", function () { return NameScope; }, NameScope);
NameScope.GetNameScope = function (d) {
    /// <param name="d" type="DependencyObject"></param>
    /// <returns type="NameScope" />
    return d.GetValue(NameScope.NameScopeProperty);
};
NameScope.SetNameScope = function (d, value) {
    /// <param name="d" type="DependencyObject"></param>
    /// <param name="value" type="NameScope"></param>
    d.SetValue(NameScope.NameScopeProperty, value);
};

//#endregion

NameScope.prototype.GetIsLocked = function () {
    /// <returns type="Boolean" />
    return this._IsLocked;
};
NameScope.prototype.Lock = function () {
    this._IsLocked = true;
};

NameScope.prototype.RegisterName = function (name, obj) {
    if (this.GetIsLocked())
        return;
    if (!this._Names)
        this._Names = new Array();

    var existingObj = this._Names[name];
    if (existingObj == obj)
        return;

    if (existingObj) {
        //TODO: Remove Handler - Destroyed Event (existingObj)
    }

    //TODO: Add Handler - Destroyed Event (obj)
    this._Names[name] = obj;
};
NameScope.prototype.UnregisterName = function (name) {
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
NameScope.prototype.FindName = function (name) {
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

NameScope.prototype._MergeTemporaryScope = function (temp, error) {
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
NameScope.prototype._GetTemporary = function () {
    return this._Temporary;
};
NameScope.prototype._SetTemporary = function (value) {
    this._Temporary = value;
};

//#endregion
