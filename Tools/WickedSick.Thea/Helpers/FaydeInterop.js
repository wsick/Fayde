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
        item.Serialized = cur.constructor._TypeName + "~|~" + cur.Name + "~|~" + item.Children.length;
        this._Cache.Children.push(item);
    }

    this._Cache.Serialized = "Surface" +  "~|~" + "~|~" + layerCount;
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
        item.Serialized = cur.constructor._TypeName + "~|~" + cur.Name + "~|~" + item.Children.length;
        arr.push(item);
    }
    return arr;
};