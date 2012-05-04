/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region _PropertyPath
var _PropertyPath = Nullstone.Create("_PropertyPath", null, 2);

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

_PropertyPath.Instance.HasDependencyProperty = function () {
    return this._Propd != null;
};

_PropertyPath.Instance.TryResolveDependencyProperty = function (dobj) {
    /// <param name="dobj" type="DependencyObject"></param>
    if (this.HasDependencyProperty())
        return;
    if (dobj)
        this._Propd = dobj.GetDependencyProperty(this.GetPath());
};

//#region PROPERTIES

_PropertyPath.Instance.GetDependencyProperty = function () {
    /// <returns type="DependencyProperty" />
    return this._Propd;
};
_PropertyPath.Instance.GetPath = function () {
    /// <returns type="String" />
    return !this._Propd ? this._Path : "(0)";
};
_PropertyPath.Instance.GetExpandedPath = function () {
    return !this._Propd ? this._ExpandedPath : "(0)";
};
_PropertyPath.Instance.GetParsePath = function () {
    if (this._Propd)
        return "(0)";
    if (this._ExpandedPath)
        return this._ExpandedPath;
    return this._Path;
};

//#endregion

Nullstone.FinishCreate(_PropertyPath);
//#endregion