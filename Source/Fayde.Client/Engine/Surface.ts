/// <reference path="../Runtime/TypeManagement.ts" />

var resizeTimeout: number;

module Fayde {
    export class Surface {
        static TestCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
        TestRenderContext = Fayde.ExtendRenderContext(Surface.TestCanvas.getContext("2d"));

        private _App: Application;
        _RootLayer: Fayde.UIElement;
        private _Layers: Fayde.UINode[] = [];
        private _UpDirty: Fayde.LayoutUpdater[] = [];
        private _DownDirty: Fayde.LayoutUpdater[] = [];
        private _Canvas: HTMLCanvasElement = null;
        private _Ctx: CanvasRenderingContext2D = null;
        private _PercentageWidth: number = 0;
        private _PercentageHeight: number = 0;
        private _Extents: size = null;
        private _InvalidatedRect: rect;
        private _RenderContext: RenderContextEx;

        private _InputMgr: Engine.InputManager;

        HitTestCallback: (inputList: Fayde.UINode[]) => void;

        constructor(app: Application) {
            this._App = app;
            this._InputMgr = new Engine.InputManager(this);
        }

        get Extents(): size {
            if (!this._Extents)
                this._Extents = size.fromRaw(this._Canvas.offsetWidth, this._Canvas.offsetHeight);
            return this._Extents;
        }

        // INITIALIZATION
        Register(canvas: HTMLCanvasElement, width?: number, widthType?: string, height?: number, heightType?: string) {
            this._Canvas = canvas;
            this._Ctx = this._Canvas.getContext("2d");
            this._RenderContext = Fayde.ExtendRenderContext(this._Ctx);

            this._ResizeCanvas();
            document.body.onresize = (e) => this._HandleResize(window.event ? <any>window.event : e);
            window.onresize = (e) => this._HandleResize(window.event ? <any>window.event : e);

            this._InputMgr.Register(this._Canvas);
        }
        Attach(uie: Fayde.UIElement) {
            if (this._RootLayer)
                this.DetachLayer(this._RootLayer);

            if (!uie) {
                this._Invalidate();
                return;
            }

            if (!(uie instanceof Fayde.UIElement))
                throw new Exception("Unsupported top level element.");
            this._RootLayer = uie;
            this.AttachLayer(uie);
        }
        GetLayers(): UINode[] { return this._Layers.slice(0); }
        AttachLayer(layer: Fayde.UIElement) {
            var node = layer.XamlNode;
            if (this._RootLayer === layer)
                this._Layers.unshift(node);
            else
                this._Layers.push(node);
            node.IsTopLevel = true;
            node.SetSurface(this);
            var lu = node.LayoutUpdater;
            lu.FullInvalidate(true);
            lu.InvalidateMeasure();
            node.SetIsAttached(true);
            node.SetIsLoaded(true);
        }
        DetachLayer(layer: Fayde.UIElement) {
            var node = layer.XamlNode;
            node.IsTopLevel = false;

            this._InputMgr.OnNodeDetached(node);

            var index = this._Layers.indexOf(layer.XamlNode);
            if (index > -1)
                this._Layers.splice(index, 1);
            node.SetIsLoaded(false);
            node.SetIsAttached(false);
            this._Invalidate(node.LayoutUpdater.SurfaceBoundsWithChildren);
        }

        // UPDATE
        ProcessDirtyElements(): boolean {
            var error = new BError();
            var dirty = this._UpdateLayout(error);
            if (error.Message)
                error.ThrowException();
            if (!dirty)
                return false;
            //this.LayoutUpdated.Raise(this, new EventArgs());
            if (this._App.DebugInterop)
                this._App.DebugInterop.LayoutUpdated();
            return true;
        }
        _UpdateLayout(error: BError): boolean {
            TimelineProfile.LayoutPass(true);
            //var startTime;
            var maxPassCount = 250;
            var layers = this._Layers;
            if (!layers)
                return false;
            var pass = {
                MeasureList: [],
                ArrangeList: [],
                SizeList: [],
                Count: 0,
                Updated: true
            };
            var dirty = false;
            var updatedLayout = false;
            while (pass.Count < maxPassCount && pass.Updated) {
                pass.Updated = false;
                for (var i = 0; i < layers.length; i++) {
                    var node = layers[i];
                    var lu = node.LayoutUpdater;
                    if (!lu.HasMeasureArrangeHint())
                        continue;

                    var last = lu.PreviousConstraint;
                    var available = size.copyTo(this.Extents);
                    if (lu.IsContainer && (!last || (!size.isEqual(last, available)))) {
                        lu.InvalidateMeasure();
                        lu.PreviousConstraint = available;
                    }

                    lu.UpdateLayer(pass, error);
                }

                dirty = dirty || this._DownDirty.length > 0 || this._UpDirty.length > 0;

                //startTime = new Date().getTime();
                this._ProcessDownDirtyElements();
                //var elapsed = new Date().getTime() - startTime;
                //if (elapsed > 0)
                //DirtyDebug.DownTiming.push(elapsed);

                //startTime = new Date().getTime();
                this._ProcessUpDirtyElements();
                //var elapsed = new Date().getTime() - startTime;
                //if (elapsed > 0)
                //DirtyDebug.UpTiming.push(elapsed);

                if (pass.Updated || dirty)
                    updatedLayout = true;
            }

            if (pass.Count >= maxPassCount) {
                if (error)
                    error.Message = "UpdateLayout has entered infinite loop and has been aborted.";
            }

            TimelineProfile.LayoutPass(false);
            return updatedLayout;
        }
        //Down --> RenderVisibility, HitTestVisibility, Transformation, Clip, ChildrenZIndices
        private _ProcessDownDirtyElements() {
            var list = this._DownDirty;
            var lu: Fayde.LayoutUpdater;
            while ((lu = list[0])) {
                if (!lu.InDownDirty) {
                    list.shift();
                    continue;
                }
                var vp = lu.Node.VisualParentNode;
                if (vp && vp.LayoutUpdater.InDownDirty) {
                    //OPTIMIZATION: uie is overzealous. His parent will invalidate him later
                    list.push(list.shift());
                    continue;
                }

                if (lu.ProcessDown()) {
                    lu.InDownDirty = false;
                    list.shift();
                }
            }

            if (list.length > 0) {
                Warn("Finished DownDirty pass, not empty.");
            }
        }
        //Up --> Bounds, Invalidation
        private _ProcessUpDirtyElements() {
            var list = this._UpDirty;
            var lu: Fayde.LayoutUpdater;
            while ((lu = list[0])) {
                if (!lu.InUpDirty) {
                    list.shift();
                    continue;
                }
                var childNodeIndex = this._GetChildNodeInUpListIndex(lu);
                if (childNodeIndex > -1) {
                    // OPTIMIZATION: Parent is overzealous, children will invalidate him
                    list.splice(childNodeIndex + 1, 0, list.shift());
                    //this._UpDirty.Remove(node);
                    //this._UpDirty.InsertAfter(node, childNode);
                    continue;
                }
                if (lu.ProcessUp()) {
                    lu.InUpDirty = false;
                    list.shift();
                }
            }

            if (list.length > 0) {
                Warn("Finished UpDirty pass, not empty.");
            }
        }
        private _GetChildNodeInUpListIndex(lu: Fayde.LayoutUpdater): number {
            var list = this._UpDirty;
            var len = list.length;
            var node = lu.Node;
            for (var i = len - 1; i >= 0; i--) {
                var cur = list[i];
                if (cur.InUpDirty && cur.Node.VisualParentNode === node)
                    return i;
            }
            return -1;
        }
        private _PropagateDirtyFlagToChildren(element, dirt) {

        }

        // DIRTY
        private _RemoveDirtyElement(lu: Fayde.LayoutUpdater) {
            lu.InUpDirty = false;
            lu.InDownDirty = false;
        }
        OnNodeDetached(lu: Fayde.LayoutUpdater) {
            this._RemoveDirtyElement(lu);
            this._InputMgr.OnNodeDetached(lu.Node);
        }

        // RENDER
        _Invalidate(r?: rect) {
            if (!r)
                r = rect.fromSize(this.Extents);
            if (!this._InvalidatedRect)
                this._InvalidatedRect = rect.copyTo(r);
            else
                rect.union(this._InvalidatedRect, r);
        }
        Render() {
            var r = this._InvalidatedRect;
            if (!r)
                return;
            this._InvalidatedRect = null;
            if (!(r.Width > 0 && r.Height > 0))
                return;
            rect.roundOut(r);

            //var startRenderTime;
            //var isRenderPassTimed;
            //if (isRenderPassTimed = (this._App._DebugFunc[4] != null))
            //startRenderTime = new Date().getTime();

            //if (window.RenderDebug) RenderDebug.Count = 0;
            {
                var ctx = this._RenderContext;
                ctx.clear(r);
                ctx.save();
                ctx.clipRect(r);
                var layers = this._Layers;
                if (layers) {
                    for (var i = 0, len = layers.length; i < len; i++) {
                        layers[i].LayoutUpdater.DoRender(ctx, r);
                    }
                }
                ctx.restore();
            }
            //if (window.RenderDebug) RenderDebug("UIElement Count: " + RenderDebug.Count);

            //if (isRenderPassTimed)
            //this._App._NotifyDebugRenderPass(new Date().getTime() - startRenderTime);
        }

        // RESIZE
        private _HandleResize(evt) {
            if (resizeTimeout)
                clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this._HandleResizeTimeout(evt), 20);
        }
        private _HandleResizeTimeout(evt) {
            this._ResizeCanvas();
            this._Extents = null;

            var layers = this._Layers;
            var len = layers.length;
            var node: Fayde.UINode;
            for (var i = 0; i < len; i++) {
                node = layers[i];
                //layer._FullInvalidate(true);
                node.LayoutUpdater.InvalidateMeasure();
            }
            resizeTimeout = null;
        }
        private _ResizeCanvas() {
            var canvas = this._Canvas;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        get FocusedNode(): UINode { return this._InputMgr.FocusedNode; }
        Focus(node: Controls.ControlNode, recurse?: boolean): boolean {
            return this._InputMgr.Focus(node, recurse);
        }
        RemoveFocusFrom(lu: LayoutUpdater) {
            this._InputMgr.OnNodeDetached(lu.Node);
        }

        HitTestPoint(pos: Point): UINode[] {
            if (!this._RootLayer)
                return null;
            var list: UINode[] = [];
            var layers = this._Layers;
            var layerCount = layers.length;
            for (var i = layerCount - 1; i >= 0 && list.length === 0; i--) {
                var layer = layers[i];
                layer.LayoutUpdater.HitTestPoint(this._RenderContext, pos, list);
            }
            return list;
        }

        SetMouseCapture(uin: Fayde.UINode):boolean {
            return this._InputMgr.SetMouseCapture(uin);
        }
        ReleaseMouseCapture(uin: Fayde.UINode) {
            this._InputMgr.ReleaseMouseCapture(uin);
        }

        static MeasureWidth(text: string, font: Font): number {
            var ctx = Surface.TestCanvas.getContext("2d");
            ctx.font = font.ToHtml5Object();
            return ctx.measureText(text).width;
        }

        __DebugLayers(): string {
            var vth = Fayde.VisualTreeHelper;
            var layers = this._Layers;
            var len = layers.length;
            var str = "";
            for (var i = 0; i < len; i++) {
                str += vth.__Debug(layers[i]);
            }
            return str;
        }
        __GetById(id: number): Fayde.UIElement {
            //Find top level
            var layers = this._Layers;
            var len = layers.length;
            for (var i = 0; i < len; i++) {
                var walker = Fayde.DeepTreeWalker(layers[i]);
                var curNode: Fayde.UINode;
                while (curNode = walker.Step()) {
                    if ((<any>curNode.XObject)._ID === id)
                        return curNode.XObject;
                }
            }
        }
    }
}