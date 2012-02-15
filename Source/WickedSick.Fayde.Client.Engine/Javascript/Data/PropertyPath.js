/// CODE

//#region _PropertyPath

function _PropertyPath(path, expandedPath) {
    RefObject.call(this);
    this._Path = path;
    this._ExpandedPath = expandedPath;
}
_PropertyPath.InheritFrom(RefObject);

_PropertyPath.CreateFromParameter = function (parameter) {
    var p = new _PropertyPath();
    p._Propd = RefObject.As(parameter, DependencyProperty);
    p._Path = null;
    if (parameter instanceof String)
        p._Path = parameter;
    return p;
};

_PropertyPath.prototype.HasDependencyProperty = function () {
    return this._Propd != null;
};

//#region PROPERTIES

_PropertyPath.prototype.GetDP = function () {
    return this._Propd;
};
_PropertyPath.prototype.GetPath = function () {
    return this._Propd == null ? this._Path : "(0)";
};
_PropertyPath.prototype.GetExpandedPath = function () {
    return this._Propd == null ? this._ExpandedPath : "(0)";
};
_PropertyPath.prototype.GetParsePath = function () {
    if (this._Propd != null)
        return "(0)";
    if (this._ExpandedPath != null)
        return this._ExpandedPath;
    return this._Path;
};

//#endregion

//#endregion