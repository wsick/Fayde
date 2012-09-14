/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _PropertyPath
var _PropertyPath = Nullstone.Create("_PropertyPath", undefined, 2);

_PropertyPath.Instance.Init = function (path, expandedPath) {
    this._Path = path;
    this._ExpandedPath = expandedPath;
};

_PropertyPath.CreateFromParameter = function (parameter) {
    var p = new _PropertyPath();
    p._Propd = Nullstone.As(parameter, DependencyProperty);
    p._Path = null;
    if (parameter instanceof String)
        p._Path = parameter;
    return p;
};

_PropertyPath.Instance.TryResolveDependencyProperty = function (dobj) {
    /// <param name="dobj" type="DependencyObject"></param>
    if (this.HasDependencyProperty)
        return;
    if (dobj)
        this._Propd = dobj.GetDependencyProperty(this.Path);
};

//#region Properties

Nullstone.Property(_PropertyPath, "Path", {
    get: function () { return !this._Propd ? this._Path : "(0)"; }
});
Nullstone.Property(_PropertyPath, "ExpandedPath", {
    get: function () { return !this._Propd ? this._ExpandedPath : "(0)"; }
});
Nullstone.Property(_PropertyPath, "ParsePath", {
    get: function () {
        if (this._Propd)
            return "(0)";
        if (this._ExpandedPath)
            return this._ExpandedPath;
        return this._Path;
    }
});
Nullstone.Property(_PropertyPath, "HasDependencyProperty", {
    get: function () { return this._Propd != null; }
});
Nullstone.Property(_PropertyPath, "DependencyProperty", {
    get: function () { return this._Propd; }
});

//#endregion

Nullstone.FinishCreate(_PropertyPath);
//#endregion