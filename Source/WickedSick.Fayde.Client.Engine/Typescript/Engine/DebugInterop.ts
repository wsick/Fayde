/// <reference path="App.ts" />
/// CODE

module Fayde {
    export interface IDebugInteropCache {
        Visual: UINode;
        Children: IDebugInteropCache[];
        Serialized: string;
    }

    export class DebugInterop {
        private _Cache: IDebugInteropCache;
        private _CachedHitTest: UINode[];
        private _DPCache: DependencyProperty[];
        private _IsCacheInvalidated: bool = true;
        App: App;
        Surface: Surface;
        
        constructor(app: App) {
            this.App = app;
            this.Surface = app.MainSurface;
        }

        LayoutUpdated() {
            this._IsCacheInvalidated = true;
        }

        GenerateCache(): string {
            this._Cache = {
                Visual: null,
                Children: [],
                Serialized: ""
            };

            var surface = this.Surface;
            var layers: UINode[] = (<any>surface)._Layers;
            var layerCount = layers.length;
            var children: IDebugInteropCache[];
            for (var i = 0; i < layerCount; i++) {
                var cur = layers[i];
                children = this.GetCacheChildren(cur);
                var item: IDebugInteropCache = {
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
        }
        private SerializeUINode(uin: UINode, len: number): string {
            return (<any>uin.XObject)._ID + "~|~" + uin.Name + "~|~" + (<any>uin.XObject).constructor._TypeName + "~|~" + len;
        }
        GenerateDPCache() {
            var dpCache = [];
            var reg: DependencyProperty[][] = (<any>DependencyProperty)._Registered;
            var curReg: DependencyProperty[];
            var propd: DependencyProperty;
            for (var tn in reg) {
                curReg = reg[tn];
                for (var name in curReg) {
                    dpCache[propd._ID] = curReg[name];
                }
            }
            this._DPCache = dpCache;
        }
        GetCacheChildren(visual: UINode): IDebugInteropCache[] {
            var arr = [];
            var enumerator = visual.GetVisualTreeEnumerator();
            var cur: UINode;
            var children: IDebugInteropCache[];
            while (enumerator.MoveNext()) {
                cur = enumerator.Current;
                children = this.GetCacheChildren(cur);
                arr.push({
                    Visual: cur,
                    Children: children,
                    Serialized: this.SerializeUINode(cur, children.length)
                });
            }
            return arr;
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