/// <reference path="Application.ts" />

module Fayde {
    export interface IDebugInteropCache {
        Node: UINode;
        Visual: UIElement;
        Children: IDebugInteropCache[];
        ID: number;
        Name: string;
        TypeName: string;
    }

    export class DebugInterop {
        private _Cache: IDebugInteropCache;
        private _CachedHitTest: UINode[];
        private _DPCache: DependencyProperty[];
        LastFrameTime: Date;
        NumFrames: number = 0;
        App: Application;
        Surface: Surface;

        constructor(app: Application) {
            this.App = app;
            this.Surface = app.MainSurface;
            this.RegisterHitTestDebugService();
        }

        LayoutUpdated() {
            this._Cache = null;
        }

        get IsCacheInvalidated() { return this._Cache == null; }
        InvalidateCache() {
            this._Cache = null;
            this._DPCache = null;
        }

        GetCache(): string {
            if (!this._Cache)
                this.GenerateCache();
            var visited = [];
            return JSON.stringify(this._Cache, (key, value) => DebugInterop._StringifyReplacer(key, value, visited));
        }
        private GenerateCache() {
            this._Cache = {
                Node: null,
                Visual: null,
                Children: [],
                ID: 0,
                Name: "",
                TypeName: "Surface",
            };

            var surface = this.Surface;
            var layers: UINode[] = (<any>surface)._Layers;
            var layerCount = layers.length;
            var children: IDebugInteropCache[];
            for (var i = 0; i < layerCount; i++) {
                var cur = layers[i];
                var item = this.CreateDebugInteropCacheItem(cur);
                this._Cache.Children.push(item);
                this.PopulateCacheChildren(item);
            }
        }
        private PopulateCacheChildren(item: IDebugInteropCache) {
            var arr = [];
            var enumerator = item.Node.GetVisualTreeEnumerator();
            var cur: UINode;
            var children: IDebugInteropCache[];
            while (enumerator.MoveNext()) {
                cur = enumerator.Current;
                var childItem = this.CreateDebugInteropCacheItem(cur);
                item.Children.push(childItem);
                this.PopulateCacheChildren(childItem);
            }
            return arr;
        }
        private CreateDebugInteropCacheItem(node: UINode): IDebugInteropCache {
            var uie = <UIElement>node.XObject;
            return {
                Node: node,
                Visual: uie,
                Children: [],
                ID: (<any>uie)._ID,
                TypeName: (<any>uie).constructor.name,
                Name: uie.Name,
            };
        }

        GetDPCache(): string {
            if (!this._DPCache)
                this.GenerateDPCache();
            
            var visited = [];
            return JSON.stringify(this._DPCache, (key, value) => DebugInterop._StringifyReplacer(key, value, visited));
        }
        private GenerateDPCache() {
            var dpCache = [];
            var reg: DependencyProperty[][] = (<any>DependencyProperty)._IDs;
            for (var id in reg) {
                dpCache.push(reg[id]);
            }
            this._DPCache = dpCache;
        }

        GetStorages(id: number): string {
            var c = this.GetById(id);
            var uie = c.Visual;
            var storage = (<Providers.IPropertyStorageOwner>uie)._PropertyStorage;
            var value: Providers.IPropertyStorage;
            var arr: Providers.IPropertyStorage[] = [];
            for (var key in storage) {
                value = storage[key];
                if (value == null)
                    continue;
                arr.push(value);
            }
            var arr2 = arr.map((s) => {
                return {
                    PropertyID: s.Property._ID,
                    Precedence: s.Precedence,
                    Local: s.Local,
                    LocalStyleValue: s.LocalStyleValue,
                    ImplicitStyleValue: s.ImplicitStyleValue,
                    InheritedValue: (<any>s).InheritedValue,
                };
            });
            var visited = [];
            return JSON.stringify(arr2, (key, value) => DebugInterop._StringifyReplacer(key, value, visited));
        }
        GetLayoutMetrics(id: number): string {
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
                TotalRenderProjection: lu.TotalRenderProjection,
            };
            return JSON.stringify(metrics);
        }

        GetById(id: number, cur?: IDebugInteropCache): IDebugInteropCache {
            var children = cur ? cur.Children : this._Cache.Children;
            var len = children.length;
            var found: IDebugInteropCache;
            var child: IDebugInteropCache;
            for (var i = 0; i < len; i++) {
                child = children[i];
                if ((<any>child.Visual)._ID === id)
                    return child;
                found = this.GetById(id, child);
                if (found)
                    return found;
            }
            return undefined;
        }

        GetResetPerfInfo(): string {
            var numFrames = this.NumFrames;
            this.NumFrames = 0;

            var oldFrameTime = this.LastFrameTime || new Date();
            this.LastFrameTime = new Date();
            var diff = this.LastFrameTime.getTime() - oldFrameTime.getTime();

            return numFrames.toString() + ";" + diff.toString();
        }

        RegisterHitTestDebugService() {
            this.Surface.HitTestCallback = (inputList) => this._CachedHitTest = inputList;
        }
        GetVisualIDsInHitTest(): string {
            if (!this._CachedHitTest)
                return "[]";
            var mapped = this._CachedHitTest.map((uin) => (<any>uin.XObject)._ID);
            return JSON.stringify(mapped);
        }

        private static _StringifyReplacer(key: any, value: any, visited?: any[]): any {
            if (value instanceof Media.SolidColorBrush) {
                var color = (<Media.SolidColorBrush>value).Color;
                return {
                    Color: color.toString(),
                };
            }
            if (value instanceof XamlNode || value instanceof XamlObject)
                return undefined;
            if (value instanceof DependencyProperty) {
                var propd = <DependencyProperty>value;
                var ownerType = <any>propd.OwnerType;
                var targetType = <any>propd.GetTargetType();
                var targetTypeName: string;
                if (targetType instanceof Enum) {
                    targetType = (<Enum>targetType).Object;
                    targetTypeName = "Enum";
                    //targetTypeName = targetType ? ("Enum: " + targetType.name) : null;
                } else {
                    targetTypeName = targetType ? targetType.name : null;
                }
                return {
                    ID: propd._ID,
                    Name: propd.Name,
                    OwnerTypeName: ownerType ? ownerType.name : null,
                    TargetTypeName: targetTypeName,
                    IsReadOnly: propd.IsReadOnly === true,
                    IsAttached: propd.IsAttached === true,
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
        }
    }
}