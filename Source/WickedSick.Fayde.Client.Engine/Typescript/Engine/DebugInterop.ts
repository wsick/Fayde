/// <reference path="App.ts" />
/// CODE

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
        App: App;
        Surface: Surface;
        
        constructor(app: App) {
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
            return JSON.stringify(this._Cache, (key, value) => {
                if (value instanceof XamlNode || value instanceof XamlObject)
                    return undefined;
                return value;
            });
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
                var childItem = this.CreateDebugInteropCacheItem(<UINode>cur);
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
                TypeName: (<any>uie).constructor._TypeName,
                Name: uie.Name,
            };
        }

        GetDPCache(): string {
            if (!this._DPCache)
                this.GenerateDPCache();

            return JSON.stringify(this._DPCache, (key, value) => {
                if (value instanceof DependencyProperty) {
                    var propd = <DependencyProperty>value;
                    var ownerType = <any>propd.OwnerType;
                    var targetType = <any>propd.GetTargetType();
                    var targetTypeName: string;
                    if (targetType instanceof Enum) {
                        targetType = (<Enum>targetType).Object;
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
                        IsAttached: propd.IsAttached === true,
                    };
                }
                return value;
            });
        }
        private GenerateDPCache() {
            var dpCache = [];
            var reg: DependencyProperty[][] = (<any>DependencyProperty)._IDs;
            for (var id in reg) {
                dpCache.push(reg[id]);
            }
            this._DPCache = dpCache;
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
        
        /*
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

        RegisterHitTestDebugService() {
            this.Surface.HitTestCallback = (inputList) => this._CachedHitTest = inputList;
        }
        GetVisualIDsInHitTest(): string {
            var rv = "[";
            if (this._CachedHitTest)
                rv += this._CachedHitTest.map(function (uin) { return (<any>uin.XObject)._ID; }).join(",");
            rv += "]";
            return rv;
        }
    }
}