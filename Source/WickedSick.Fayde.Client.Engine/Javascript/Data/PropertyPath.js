/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
    var PropertyPath = Nullstone.Create("PropertyPath", undefined, 2);

    PropertyPath.Instance.Init = function (path, expandedPath) {
        this._Path = path;
        this._ExpandedPath = expandedPath;
    };

    PropertyPath.CreateFromParameter = function (parameter) {
        var p = new PropertyPath();
        p._Propd = Nullstone.As(parameter, DependencyProperty);
        p._Path = null;
        if (parameter instanceof String)
            p._Path = parameter;
        return p;
    };

    PropertyPath.Instance.TryResolveDependencyProperty = function (dobj) {
        /// <param name="dobj" type="DependencyObject"></param>
        if (this.HasDependencyProperty)
            return;
        if (dobj)
            this._Propd = dobj.GetDependencyProperty(this.Path);
    };

    //#region Properties

    Nullstone.Property(PropertyPath, "Path", {
        get: function () { return !this._Propd ? this._Path : "(0)"; }
    });
    Nullstone.Property(PropertyPath, "ExpandedPath", {
        get: function () { return !this._Propd ? this._ExpandedPath : "(0)"; }
    });
    Nullstone.Property(PropertyPath, "ParsePath", {
        get: function () {
            if (this._Propd)
                return "(0)";
            if (this._ExpandedPath)
                return this._ExpandedPath;
            return this._Path;
        }
    });
    Nullstone.Property(PropertyPath, "HasDependencyProperty", {
        get: function () { return this._Propd != null; }
    });
    Nullstone.Property(PropertyPath, "DependencyProperty", {
        get: function () { return this._Propd; }
    });

    //#endregion

    namespace.PropertyPath = Nullstone.FinishCreate(PropertyPath);
})(Nullstone.Namespace("Fayde.Data"));