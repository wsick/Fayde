/// <reference path="Application.ts" />
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
            if (!this._Cache)
                this.GenerateCache();
            var visited = [];
            return JSON.stringify(this._Cache, function (key, value) {
                return DebugInterop._StringifyReplacer(key, value, visited);
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
            for (var i = 0; i < layerCount; i++) {
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
            while (enumerator.MoveNext()) {
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
            if (!this._DPCache)
                this.GenerateDPCache();

            var visited = [];
            return JSON.stringify(this._DPCache, function (key, value) {
                return DebugInterop._StringifyReplacer(key, value, visited);
            });
        };
        DebugInterop.prototype.GenerateDPCache = function () {
            var dpCache = [];
            var reg = (DependencyProperty)._IDs;
            for (var id in reg) {
                dpCache.push(reg[id]);
            }
            this._DPCache = dpCache;
        };

        DebugInterop.prototype.GetStorages = function (id) {
            var c = this.GetById(id);
            var uie = c.Visual;
            var storage = (uie)._PropertyStorage;
            var value;
            var arr = [];
            for (var key in storage) {
                value = storage[key];
                if (value == null)
                    continue;
                arr.push(value);
            }
            var arr2 = arr.map(function (s) {
                return {
                    PropertyID: s.Property._ID,
                    Precedence: s.Precedence,
                    Local: s.Local,
                    LocalStyleValue: s.LocalStyleValue,
                    ImplicitStyleValue: s.ImplicitStyleValue,
                    InheritedValue: (s).InheritedValue
                };
            });
            var visited = [];
            return JSON.stringify(arr2, function (key, value) {
                return DebugInterop._StringifyReplacer(key, value, visited);
            });
        };
        DebugInterop.prototype.GetLayoutMetrics = function (id) {
            var c = this.GetById(id);
            var uie = c.Visual;
            var lu = uie.XamlNode.LayoutUpdater;

            var metrics = {
                ActualHeight: lu.ActualHeight,
                ActualWidth: lu.ActualWidth,
                LayoutSlot: lu.LayoutSlot,
                VisualOffset: lu.VisualOffset,
                LayoutClip: lu.LayoutClip,
                HiddenDesire: lu.HiddenDesire,
                DesiredSize: lu.DesiredSize,
                RenderSize: lu.RenderSize,
                AbsoluteXform: Array.prototype.slice.call(lu.AbsoluteXform),
                LayoutXform: Array.prototype.slice.call(lu.LayoutXform),
                LocalXform: Array.prototype.slice.call(lu.LocalXform),
                RenderXform: Array.prototype.slice.call(lu.RenderXform),
                TotalOpacity: lu.TotalOpacity,
                TotalIsRenderVisible: lu.TotalIsRenderVisible,
                TotalIsHitTestVisible: lu.TotalIsHitTestVisible,
                TotalRenderProjection: lu.TotalRenderProjection
            };
            return JSON.stringify(metrics);
        };

        DebugInterop.prototype.GetById = function (id, cur) {
            var children = cur ? cur.Children : this._Cache.Children;
            var len = children.length;
            var found;
            var child;
            for (var i = 0; i < len; i++) {
                child = children[i];
                if ((child.Visual)._ID === id)
                    return child;
                found = this.GetById(id, child);
                if (found)
                    return found;
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

        DebugInterop.prototype.RegisterHitTestDebugService = function () {
            var _this = this;
            this.Surface.HitTestCallback = function (inputList) {
                return _this._CachedHitTest = inputList;
            };
        };
        DebugInterop.prototype.GetVisualIDsInHitTest = function () {
            if (!this._CachedHitTest)
                return "[]";
            var mapped = this._CachedHitTest.map(function (uin) {
                return (uin.XObject)._ID;
            });
            return JSON.stringify(mapped);
        };

        DebugInterop._StringifyReplacer = function (key, value, visited) {
            if (value instanceof Fayde.Media.SolidColorBrush) {
                var color = (value).Color;
                return {
                    Color: color.toString()
                };
            }
            if (value instanceof Fayde.XamlNode || value instanceof Fayde.XamlObject)
                return undefined;
            if (value instanceof DependencyProperty) {
                var propd = value;
                var ownerType = propd.OwnerType;
                var targetType = propd.GetTargetType();
                var targetTypeName;
                if (targetType instanceof Enum) {
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
            if (value == null)
                return value;
            if (visited && value instanceof Object) {
                if (visited.indexOf(value) > -1)
                    return undefined;
                visited.push(value);
            }
            return value;
        };
        return DebugInterop;
    })();
    Fayde.DebugInterop = DebugInterop;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=DebugInterop.js.map
