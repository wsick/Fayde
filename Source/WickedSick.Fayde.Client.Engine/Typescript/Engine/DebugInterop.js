/// <reference path="App.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var DebugInterop = (function () {
        function DebugInterop(app) {
            this.NumFrames = 0;
            this.App = app;
            this.Surface = app.MainSurface;
            this.RegisterHitTestDebugService();
        }
        DebugInterop.prototype.LayoutUpdated = function () {
            this._Cache = null;
        };
        Object.defineProperty(DebugInterop.prototype, "IsCacheInvalidated", {
            get: function () {
                return this._Cache == null;
            },
            enumerable: true,
            configurable: true
        });
        DebugInterop.prototype.InvalidateCache = function () {
            this._Cache = null;
            this._DPCache = null;
        };
        DebugInterop.prototype.GetCache = function () {
            if(!this._Cache) {
                this.GenerateCache();
            }
            return JSON.stringify(this._Cache, function (key, value) {
                if(value instanceof Fayde.XamlNode || value instanceof Fayde.XamlObject) {
                    return undefined;
                }
                return value;
            });
        };
        DebugInterop.prototype.GenerateCache = function () {
            this._Cache = {
                Node: null,
                Visual: null,
                Children: [],
                ID: 0,
                Name: "",
                TypeName: "Surface"
            };
            var surface = this.Surface;
            var layers = (surface)._Layers;
            var layerCount = layers.length;
            var children;
            for(var i = 0; i < layerCount; i++) {
                var cur = layers[i];
                var item = this.CreateDebugInteropCacheItem(cur);
                this._Cache.Children.push(item);
                this.PopulateCacheChildren(item);
            }
        };
        DebugInterop.prototype.PopulateCacheChildren = function (item) {
            var arr = [];
            var enumerator = item.Node.GetVisualTreeEnumerator();
            var cur;
            var children;
            while(enumerator.MoveNext()) {
                cur = enumerator.Current;
                var childItem = this.CreateDebugInteropCacheItem(cur);
                item.Children.push(childItem);
                this.PopulateCacheChildren(childItem);
            }
            return arr;
        };
        DebugInterop.prototype.CreateDebugInteropCacheItem = function (node) {
            var uie = node.XObject;
            return {
                Node: node,
                Visual: uie,
                Children: [],
                ID: (uie)._ID,
                TypeName: (uie).constructor._TypeName,
                Name: uie.Name
            };
        };
        DebugInterop.prototype.GetDPCache = function () {
            if(!this._DPCache) {
                this.GenerateDPCache();
            }
            return JSON.stringify(this._DPCache, function (key, value) {
                if(value instanceof DependencyProperty) {
                    var propd = value;
                    var ownerType = propd.OwnerType;
                    var targetType = propd.GetTargetType();
                    var targetTypeName;
                    if(targetType instanceof Enum) {
                        targetType = (targetType).Object;
                        targetTypeName = "Enum";
                        //targetTypeName = targetType ? ("Enum: " + targetType._TypeName) : null;
                                            } else {
                        targetTypeName = targetType ? targetType._TypeName : null;
                    }
                    return {
                        ID: propd._ID,
                        Name: propd.Name,
                        OwnerTypeName: ownerType ? ownerType._TypeName : null,
                        TargetTypeName: targetTypeName,
                        IsReadOnly: propd.IsReadOnly === true,
                        IsAttached: propd.IsAttached === true
                    };
                }
                return value;
            });
        };
        DebugInterop.prototype.GenerateDPCache = function () {
            var dpCache = [];
            var reg = (DependencyProperty)._IDs;
            for(var id in reg) {
                dpCache.push(reg[id]);
            }
            this._DPCache = dpCache;
        };
        DebugInterop.prototype.GetById = function (id, cur) {
            var children = cur ? cur.Children : this._Cache.Children;
            var len = children.length;
            var found;
            var child;
            for(var i = 0; i < len; i++) {
                child = children[i];
                if((child.Visual)._ID === id) {
                    return child;
                }
                found = this.GetById(id, child);
                if(found) {
                    return found;
                }
            }
            return undefined;
        };
        DebugInterop.prototype.GetResetPerfInfo = function () {
            var numFrames = this.NumFrames;
            this.NumFrames = 0;
            var oldFrameTime = this.LastFrameTime || new Date();
            this.LastFrameTime = new Date();
            var diff = this.LastFrameTime.getTime() - oldFrameTime.getTime();
            return numFrames.toString() + ";" + diff.toString();
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
