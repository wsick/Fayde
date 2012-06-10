function FaydeInterop(app) {
    if (FaydeInterop._LastID == null)
        FaydeInterop._LastID = -1;
    FaydeInterop._LastID = FaydeInterop._LastID + 1;
    this._ID = FaydeInterop._LastID;
    if (!FaydeInterop.Reg)
        FaydeInterop.Reg = {};
    FaydeInterop.Reg[this._ID] = this;
    this.App = app;
}
FaydeInterop.prototype.GenerateCache = function () {
    this._Cache = {
        Visual: null,
        Children: []
    };

    var surface = this.App.MainSurface;
    var layers = surface._Layers;
    var layerCount = layers.GetCount();
    for (var i = 0; i < layerCount; i++) {
        var cur = layers.GetValueAt(i);
        var item = {
            Visual: cur,
            Children: this.GetCacheChildren(cur)
        };
        item.Serialized = cur.constructor._TypeName + "~|~" + cur.Name + "~|~" + cur._ID + "~|~" + item.Children.length;
        this._Cache.Children.push(item);
    }

    this._Cache.Serialized = "Surface" + "~|~" + "~|~" + surface._ID + "~|~" + layerCount;
};
FaydeInterop.prototype.GetCacheChildren = function (visual) {
    var arr = [];
    var childCount = VisualTreeHelper.GetChildrenCount(visual);
    for (var i = 0; i < childCount; i++) {
        var cur = VisualTreeHelper.GetChild(visual, i);
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
    var arr = [];

    var dps = this.GetDPs(visual.constructor);
    var dpCount = dps.length;
    for (var i = 0; i < dpCount; i++) {
        var dp = dps[i];
        var value = visual.$GetValue(dp);
        if (value === undefined)
            value = "\"(undefined)\"";
        else if (value === null)
            value = "null";
        else if (typeof value !== "number")
            value = '"' + value + '"';
        else if (value.constructor._IsNullstone)
            value = '"' + value.toString() + '"';

        var cur = "{ OwnerType: \"" + dp.OwnerType._TypeName + "\", Name: \"" + dp.Name + "\", Value: " + value + " }";
        arr.push(cur);
    }

    return "[" + arr.toString() + "]";
};

FaydeInterop.prototype.GetDPs = function (type) {
    /// <returns type="Array" />
    if (!Nullstone.DoesInheritFrom(type, DependencyObject))
        return [];
    var reg;
    var arr = [];
    var curType = type;
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