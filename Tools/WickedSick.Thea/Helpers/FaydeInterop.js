function FaydeInterop(app) {
    if (FaydeInterop._LastID == null)
        FaydeInterop._LastID = -1;
    FaydeInterop._LastID = FaydeInterop._LastID + 1;
    this._ID = FaydeInterop._LastID;
    if (!FaydeInterop.Reg)
        FaydeInterop.Reg = {};
    FaydeInterop.Reg[this._ID] = this;
    this.App = app;
    this.RegisterHitTestDebugService();
    this.RegisterLayerDebugService();
}
FaydeInterop.prototype.GenerateCache = function () {
    this._Cache = {
        Visual: null,
        Children: []
    };

    var surface = this.App.MainSurface;
    var layers = surface._Layers;
    var layerCount = layers.length;
    for (var i = 0; i < layerCount; i++) {
        var cur = layers[i];
        var item = {
            Visual: cur,
            Children: this.GetCacheChildren(cur)
        };
        item.Serialized = cur.constructor._TypeName + "~|~" + cur.Name + "~|~" + cur._ID + "~|~" + item.Children.length;
        this._Cache.Children.push(item);
    }

    this._Cache.Serialized = "Surface" + "~|~" + "~|~" + surface._ID + "~|~" + layerCount;
    this.GenerateDPCache();
    delete this._InvalidatedCache;
};
FaydeInterop.prototype.GenerateDPCache = function () {
    var dpCache = [];
    for (var tn in DependencyProperty._Registered) {
        for (var name in DependencyProperty._Registered[tn]) {
            var propd = DependencyProperty._Registered[tn][name];
            dpCache[propd._ID] = propd;
        }
    }
    this._DPCache = dpCache;
};
FaydeInterop.prototype.GetCacheChildren = function (visual) {
    var arr = [];
    var childCount = Fayde.VisualTreeHelper.GetChildrenCount(visual);
    for (var i = 0; i < childCount; i++) {
        var cur = Fayde.VisualTreeHelper.GetChild(visual, i);
        var item = {
            Visual: cur,
            Children: this.GetCacheChildren(cur)
        };
        item.Serialized = cur.constructor._TypeName + "~|~" + cur.Name + "~|~" + cur._ID + "~|~" + item.Children.length;
        arr.push(item);
    }
    return arr;
};
FaydeInterop.prototype.GetProperties = function (visual) {
    var dps = this.GetDPs(visual);
    var dpCount = dps.length;
    var arr = [];
    for (var i = 0; i < dpCount; i++) {
        arr.push(this.SerializeDependencyValue(visual, dps[i]));
    }
    var adps = this.GetAttachedDPs(visual);
    var adpCount = adps.length;
    for (var i = 0; i < adpCount; i++) {
        arr.push(this.SerializeDependencyValue(visual, adps[i]));
    }
    return "[" + arr.toString() + "]";
};

FaydeInterop.prototype.GetDPs = function (dobj) {
    /// <returns type="Array" />
    if (!(dobj instanceof DependencyObject))
        return [];
    var reg;
    var arr = [];
    var curType = dobj.constructor;
    while (curType) {
        reg = DependencyProperty._Registered[curType._TypeName];
        for (var h in reg) {
            var dp = reg[h];
            if (!dp._IsAttached)
                arr.push(dp);
        }
        curType = curType._BaseClass;
    }
    return arr;
};
FaydeInterop.prototype.GetAttachedDPs = function (dobj) {
    /// <returns type="Array" />
    if (!(dobj instanceof DependencyObject))
        return [];
    var arr = [];
    var localProvider = dobj._Providers[_PropertyPrecedence.LocalValue];
    var dpCache = this._DPCache;
    for (var dpid in localProvider._ht) {
        var dp = dpCache[dpid];
        if (dp._IsAttached)
            arr.push(dp);
    }
    return arr;
};

FaydeInterop.prototype.RegisterHitTestDebugService = function () {
    var fi = this;
    this.App.MainSurface.HitTestCallback = function (inputList) {
        fi._CachedHitTest = inputList;
    };
};
FaydeInterop.prototype.GetVisualIDsInHitTest = function () {
    var rv = "[";
    if (this._CachedHitTest)
        rv += this._CachedHitTest.map(function (uin) { return uin.XObject._ID; }).join(",");
    rv += "]";
};

FaydeInterop.prototype.RegisterLayerDebugService = function () {
    /*
    var fi = this;
    this.App._SubscribeDebugService("Layer", function (isAdd, layer) {
        fi._InvalidatedCache = true;
    });
    */
};

FaydeInterop.prototype.SerializeDependencyValue = function (dobj, dp) {
    var value = this.SerializeValue(dobj.$GetValue(dp));
    return "{ OwnerType: \"" + dp.OwnerType._TypeName + "\", Name: \"" + dp.Name + "\", Value: " + value + " }";
};
FaydeInterop.prototype.SerializeValue = function (value) {
    if (value === undefined)
        return "\"(undefined)\"";
    if (value === null)
        return "null";
    if (typeof value !== "number")
        return '"' + value + '"';
    if (value.constructor._IsNullstone)
        return '"' + value.toString() + '"';
    return value;
};

FaydeInterop.StringifyEx = function (a) {
    function censor(censor) {
        //debugger;
        return (function () {
            var visited = [];
            return function (key, value) {
                if (!value)
                    return;
                if (key === "_Providers")
                    return "[_Providers]";
                if (key === "_ProviderBitmasks")
                    return "[_ProviderBitmasks]";
                if (key === "_Expressions")
                    return "[_Expressions]";
                if (value instanceof MulticastEvent)
                    return "{MulticastEvent}";

                if (value && value._ID != null) {
                    if (visited.indexOf(value._ID) !== -1)
                        return "[Already Visited]";
                    visited.push(value._ID);
                }
                return value;
            }
        })(censor);
    }

    return JSON.stringify(a, censor(a));
};