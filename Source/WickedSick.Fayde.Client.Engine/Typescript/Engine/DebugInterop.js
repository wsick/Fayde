/// <reference path="App.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var DebugInterop = (function () {
        function DebugInterop(app) {
            this._IsCacheInvalidated = true;
            this.App = app;
            this.Surface = app.MainSurface;
        }
        DebugInterop.prototype.LayoutUpdated = function () {
            this._IsCacheInvalidated = true;
        };
        DebugInterop.prototype.GenerateCache = function () {
            this._Cache = {
                Visual: null,
                Children: [],
                Serialized: ""
            };
            var surface = this.Surface;
            var layers = (surface)._Layers;
            var layerCount = layers.length;
            var children;
            for(var i = 0; i < layerCount; i++) {
                var cur = layers[i];
                children = this.GetCacheChildren(cur);
                var item = {
                    Visual: cur,
                    Children: children,
                    Serialized: this.SerializeUINode(cur, children.length)
                };
                this._Cache.Children.push(item);
            }
            this._Cache.Serialized = "Surface~|~" + layerCount;
            this.GenerateDPCache();
            this._IsCacheInvalidated = false;
            return this._Cache.Serialized;
        };
        DebugInterop.prototype.SerializeUINode = function (uin, len) {
            return (uin.XObject)._ID + "~|~" + uin.Name + "~|~" + (uin.XObject).constructor._TypeName + "~|~" + len;
        };
        DebugInterop.prototype.GenerateDPCache = function () {
            var dpCache = [];
            var reg = (DependencyProperty)._Registered;
            var curReg;
            var propd;
            for(var tn in reg) {
                curReg = reg[tn];
                for(var name in curReg) {
                    dpCache[propd._ID] = curReg[name];
                }
            }
            this._DPCache = dpCache;
        };
        DebugInterop.prototype.GetCacheChildren = function (visual) {
            var arr = [];
            var enumerator = visual.GetVisualTreeEnumerator();
            var cur;
            var children;
            while(enumerator.MoveNext()) {
                cur = enumerator.Current;
                children = this.GetCacheChildren(cur);
                arr.push({
                    Visual: cur,
                    Children: children,
                    Serialized: this.SerializeUINode(cur, children.length)
                });
            }
            return arr;
        };
        DebugInterop.prototype.RegisterHitTestDebugService = /*
        GetProperties(visual: UIElement): string {
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
        }
        
        GetDPs(dobj: DependencyObject): DependencyProperty[] {
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
        }
        GetAttachedDPs(dobj: DependencyObject): DependencyProperty[] {
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
        }
        */
        function () {
            var _this = this;
            this.Surface.HitTestCallback = function (inputList) {
                return _this._CachedHitTest = inputList;
            };
        };
        DebugInterop.prototype.GetVisualIDsInHitTest = function () {
            var rv = "[";
            if(this._CachedHitTest) {
                rv += this._CachedHitTest.map(function (uin) {
                    return (uin.XObject)._ID;
                }).join(",");
            }
            rv += "]";
            return rv;
        };
        return DebugInterop;
    })();
    Fayde.DebugInterop = DebugInterop;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DebugInterop.js.map
