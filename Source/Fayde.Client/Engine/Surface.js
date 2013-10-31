/// <reference path="../Runtime/TypeManagement.ts" />
var resizeTimeout;

var Fayde;
(function (Fayde) {
    var Surface = (function () {
        function Surface(app) {
            this.TestRenderContext = new Fayde.RenderContext(Surface.TestCanvas.getContext("2d"));
            this._Layers = [];
            this._UpDirty = [];
            this._DownDirty = [];
            this._Canvas = null;
            this._Ctx = null;
            this._PercentageWidth = 0;
            this._PercentageHeight = 0;
            this._Extents = null;
            this._App = app;
            this._InputMgr = new Fayde.Engine.InputManager(this);
        }
        Object.defineProperty(Surface.prototype, "Extents", {
            get: function () {
                if (!this._Extents)
                    this._Extents = size.fromRaw(this._Canvas.offsetWidth, this._Canvas.offsetHeight);
                return this._Extents;
            },
            enumerable: true,
            configurable: true
        });

        // INITIALIZATION
        Surface.prototype.Register = function (canvas, width, widthType, height, heightType) {
            var _this = this;
            this._Canvas = canvas;
            this._Ctx = this._Canvas.getContext("2d");
            this._RenderContext = new Fayde.RenderContext(this._Ctx);

            this._ResizeCanvas();
            document.body.onresize = function (e) {
                return _this._HandleResize(window.event ? window.event : e);
            };
            window.onresize = function (e) {
                return _this._HandleResize(window.event ? window.event : e);
            };

            this._InputMgr.Register(this._Canvas);
        };
        Surface.prototype.Attach = function (uie) {
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
        };
        Surface.prototype.GetLayers = function () {
            return this._Layers.slice(0);
        };
        Surface.prototype.AttachLayer = function (layer) {
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
        };
        Surface.prototype.DetachLayer = function (layer) {
            var node = layer.XamlNode;
            node.IsTopLevel = false;

            this._InputMgr.OnNodeDetached(node);

            var index = this._Layers.indexOf(layer.XamlNode);
            if (index > -1)
                this._Layers.splice(index, 1);
            node.SetIsLoaded(false);
            node.SetIsAttached(false);
            this._Invalidate(node.LayoutUpdater.SurfaceBoundsWithChildren);
        };

        // UPDATE
        Surface.prototype.ProcessDirtyElements = function () {
            var error = new BError();
            var dirty = this._UpdateLayout(error);
            if (error.Message)
                error.ThrowException();
            if (!dirty)
                return false;

            if (this._App.DebugInterop)
                this._App.DebugInterop.LayoutUpdated();
            return true;
        };
        Surface.prototype._UpdateLayout = function (error) {
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

                if (pass.Updated || dirty)
                    updatedLayout = true;
            }

            if (pass.Count >= maxPassCount) {
                if (error)
                    error.Message = "UpdateLayout has entered infinite loop and has been aborted.";
            }

            TimelineProfile.LayoutPass(false);
            return updatedLayout;
        };

        //Down --> RenderVisibility, HitTestVisibility, Transformation, Clip, ChildrenZIndices
        Surface.prototype._ProcessDownDirtyElements = function () {
            var list = this._DownDirty;
            var lu;
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
        };

        //Up --> Bounds, Invalidation
        Surface.prototype._ProcessUpDirtyElements = function () {
            var list = this._UpDirty;
            var lu;
            while ((lu = list[0])) {
                if (!lu.InUpDirty) {
                    list.shift();
                    continue;
                }
                var childNodeIndex = this._GetChildNodeInUpListIndex(lu);
                if (childNodeIndex > -1) {
                    // OPTIMIZATION: Parent is overzealous, children will invalidate him
                    list.splice(childNodeIndex + 1, 0, list.shift());

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
        };
        Surface.prototype._GetChildNodeInUpListIndex = function (lu) {
            var list = this._UpDirty;
            var len = list.length;
            var node = lu.Node;
            for (var i = len - 1; i >= 0; i--) {
                var cur = list[i];
                if (cur.InUpDirty && cur.Node.VisualParentNode === node)
                    return i;
            }
            return -1;
        };
        Surface.prototype._PropagateDirtyFlagToChildren = function (element, dirt) {
        };

        // DIRTY
        Surface.prototype._RemoveDirtyElement = function (lu) {
            lu.InUpDirty = false;
            lu.InDownDirty = false;
        };
        Surface.prototype.OnNodeDetached = function (lu) {
            this._RemoveDirtyElement(lu);
            this._InputMgr.OnNodeDetached(lu.Node);
        };

        // RENDER
        Surface.prototype._Invalidate = function (r) {
            if (!r)
                r = rect.fromSize(this.Extents);
            if (!this._InvalidatedRect)
                this._InvalidatedRect = rect.copyTo(r);
else
                rect.union(this._InvalidatedRect, r);
        };
        Surface.prototype.Render = function () {
            var r = this._InvalidatedRect;
            if (!r)
                return;
            this._InvalidatedRect = null;
            if (!(r.Width > 0 && r.Height > 0))
                return;

            //var startRenderTime;
            //var isRenderPassTimed;
            //if (isRenderPassTimed = (this._App._DebugFunc[4] != null))
            //startRenderTime = new Date().getTime();
            //if (window.RenderDebug) RenderDebug.Count = 0;
            this._RenderContext.DoRender(this._Layers, r);
            //if (window.RenderDebug) RenderDebug("UIElement Count: " + RenderDebug.Count);
            //if (isRenderPassTimed)
            //this._App._NotifyDebugRenderPass(new Date().getTime() - startRenderTime);
        };

        // RESIZE
        Surface.prototype._HandleResize = function (evt) {
            var _this = this;
            if (resizeTimeout)
                clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                return _this._HandleResizeTimeout(evt);
            }, 20);
        };
        Surface.prototype._HandleResizeTimeout = function (evt) {
            this._ResizeCanvas();
            this._Extents = null;

            var layers = this._Layers;
            var len = layers.length;
            var node;
            for (var i = 0; i < len; i++) {
                node = layers[i];

                //layer._FullInvalidate(true);
                node.LayoutUpdater.InvalidateMeasure();
            }
            resizeTimeout = null;
        };
        Surface.prototype._ResizeCanvas = function () {
            var canvas = this._Canvas;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        Object.defineProperty(Surface.prototype, "FocusedNode", {
            get: function () {
                return this._InputMgr.FocusedNode;
            },
            enumerable: true,
            configurable: true
        });
        Surface.prototype.Focus = function (node, recurse) {
            return this._InputMgr.Focus(node, recurse);
        };
        Surface.prototype.RemoveFocusFrom = function (lu) {
            this._InputMgr.OnNodeDetached(lu.Node);
        };

        Surface.prototype.HitTestPoint = function (newInputList, pos) {
            if (!this._RootLayer)
                return false;
            var layers = this._Layers;
            var layerCount = layers.length;
            for (var i = layerCount - 1; i >= 0 && newInputList.length === 0; i--) {
                var layer = layers[i];
                layer.LayoutUpdater.HitTestPoint(this._RenderContext, pos, newInputList);
            }
            return true;
        };

        Surface.prototype.SetMouseCapture = function (uin) {
            return this._InputMgr.SetMouseCapture(uin);
        };
        Surface.prototype.ReleaseMouseCapture = function (uin) {
            this._InputMgr.ReleaseMouseCapture(uin);
        };

        Surface.MeasureWidth = function (text, font) {
            var ctx = Surface.TestCanvas.getContext("2d");
            ctx.font = font.ToHtml5Object();
            return ctx.measureText(text).width;
        };

        Surface.prototype.__DebugLayers = function () {
            var vth = Fayde.VisualTreeHelper;
            var layers = this._Layers;
            var len = layers.length;
            var str = "";
            for (var i = 0; i < len; i++) {
                str += vth.__Debug(layers[i]);
            }
            return str;
        };
        Surface.prototype.__GetById = function (id) {
            //Find top level
            var layers = this._Layers;
            var len = layers.length;
            for (var i = 0; i < len; i++) {
                var walker = Fayde.DeepTreeWalker(layers[i]);
                var curNode;
                while (curNode = walker.Step()) {
                    if ((curNode.XObject)._ID === id)
                        return curNode.XObject;
                }
            }
        };
        Surface.TestCanvas = document.createElement("canvas");
        return Surface;
    })();
    Fayde.Surface = Surface;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Surface.js.map
