/// <reference path="/Scripts/kinetic-v2.3.2.js"/>
/// <reference path="Primitives.js"/>
/// <reference path="Brush.js"/>
/// <reference path="Collection.js"/>
/// <reference path="LayoutInformation.js"/>
/// <reference path="Dirty.js"/>
/// <reference path="Debug.js"/>

Surface.prototype = new Object;
Surface.prototype.constructor = Surface;
/*
function Surface(containerId, width, height) {
    this._Stage = new Kinetic.Stage(containerId, width, height);
}
*/
function Surface() {
}
Surface.prototype.Init = function (jCanvas) {
    this._jCanvas = jCanvas;
    this._Canvas = jCanvas[0];
    this._Ctx = this._Canvas.getContext("2d");
    this._Layers = new Collection();
    this._DownDirty = new _DirtyList();
    this._UpDirty = new _DirtyList();
};
Surface.prototype.GetExtents = function () {
    return new Size(this.GetWidth(), this.GetHeight());
};
Surface.prototype.GetWidth = function () {
    return this._jCanvas.width();
};
Surface.prototype.GetHeight = function () {
    return this._jCanvas.height();
};
Surface.prototype.Render = function (region) {
    var ctx = new _RenderContext(this);

    var renderList = new Array();
    var layerCount = 0;
    if (this._Layers)
        layerCount = this._Layers.GetCount();

    for (var i = 0; i < layerCount; i++) {
        var layer = this._Layers.GetValueAt(i);
        layer._DoRender(ctx, region);
    }
};
Surface.prototype._Attach = function (/* UIElement */element) {
    if (this._TopLevel) {
        //TODO: Detach previous layer
    }

    if (!element) {
        this._Invalidate();
        return;
    }

    if (!(element instanceof UIElement)) {
        _Console.WriteLine("Unsupported top level element.");
        return;
    }

    //TODO: Prepare namescope
    //TODO: Enable events

    this._TopLevel = element;

    //TODO: Subscribe Loaded event

    this._TopLevel.Loaded.Subscribe(this._HandleTopLevelLoaded);
    this._AttachLayer(this._TopLevel);
    var surface = this;
    var postAttach = function () {
        surface._TopLevel._SetIsAttached(true);
        surface._TopLevel._SetIsLoaded(true);
        //TODO: App Loaded event
    };
    setTimeout(postAttach, 1);
};
Surface.prototype._AttachLayer = function (/* UIElement */layer) {
    if (layer === this._TopLevel)
        this._Layers.Insert(0, layer);
    else
        this._Layers.Add(layer);

    layer._FullInvalidate(true);
    layer._InvalidateMeasure();
    layer._SetIsAttached(true);
    layer._SetIsLoaded(true);
    //TODO: App Loaded event
};
Surface.prototype._HandleTopLevelLoaded = function (sender, args) {
    var element = sender;
    var topLevel = App.Instance.MainSurface._TopLevel;
    topLevel.Loaded.Unsubscribe(this._HandleTopLevelLoaded);
    if (element === topLevel) {
        //TODO: this.Resize.Raise(this, null);

        //element._UpdateTotalRenderVisibility();
        //element._UpdateTotalHitTestVisibility();
        element._FullInvalidate(true);

        element._InvalidateMeasure();
    }
};
Surface.prototype._IsTopLevel = function (/* UIElement */top) {
    if (!top || !this._Layers)
        return false;
    var ret = false; //TODO: full-screen message
    var count = this._Layers.GetCount();
    for (var i = 0; i < count && !ret; i++) {
        ret = this._Layers.GetValueAt(i) === top;
    }
    return ret;
};
Surface.prototype.ProcessDirtyElements = function () {
    var error = new BError();
    return this._UpdateLayout(error);
};
Surface.prototype._Invalidate = function (rect) {
    if (!rect)
        rect = new Rect(0, 0, this.GetWidth(), this.GetHeight());
    var surface = this;
    setTimeout(function () { surface.Render(rect); }, 1);
};

Surface.prototype._UpdateLayout = function (error) {
    if (!this._Layers)
        return false;
    var pass = new LayoutPass();
    var dirty = true;
    pass._Updated = true;
    while (pass._Count < LayoutPass.MaxCount && pass._Updated) {
        pass._Updated = false;
        for (var i = 0; i < this._Layers.GetCount(); i++) {
            var layer = this._Layers.GetValueAt(i);
            if (!layer._HasFlag(UIElementFlags.DirtyMeasureHint) && !layer._HasFlag(UIElementFlags.DirtyArrangeHint))
                continue;

            var last = LayoutInformation.GetPreviousConstraint(layer);
            var available = new Size(this.GetWidth(), this.GetHeight());
            if (layer.IsContainer() && (!last || (!last.Equals(available)))) {
                layer._InvalidateMeasure();
                LayoutInformation.SetPreviousConstraint(layer, available);
            }

            layer._UpdateLayer(pass, error);
        }

        dirty = dirty || this._DownDirty.IsEmpty() || !this._UpDirty.IsEmpty();
        this._ProcessDownDirtyElements();
        this._ProcessUpDirtyElements();

        if (pass._Updated && dirty) {
            //TODO: LayoutUpdated Event
        }
    }

    if (pass._Count >= LayoutPass.MaxCount) {
        if (error)
            error.SetErrored(BError.Exception, "UpdateLayout has entered infinite loop and has been aborted.");
    }

    return dirty;
};
Surface.prototype._ProcessDownDirtyElements = function () {
    var visualParent;
    var node;
    while (node = this._DownDirty.GetFirst()) {
        var uie = node.Element;

        if (uie._DirtyFlags & _Dirty.RenderVisibility) {
            uie._DirtyFlags &= ~_Dirty.RenderVisibility;

            var ovisible = uie._GetRenderVisible();

            uie._UpdateBounds();

            var visualParent = uie.GetVisualParent();
            if (visualParent)
                visualParent._UpdateBounds();

            uie._ComputeTotalRenderVisibility();

            if (!uie._GetRenderVisible())
                uie._CacheInvalidateHint();

            if (ovisible != uie._GetRenderVisible())
                this._AddDirtyElement(uie, _Dirty.NewBounds);

            this._PropagateDirtyFlagToChildren(uie, _Dirty.NewBounds);
        }

        if (uie._DirtyFlags & _Dirty.HitTestVisibility) {
            uie._DirtyFlags &= ~_Dirty.HitTestVisibility;
            uie._ComputeTotalHitTestVisibility();
            this._PropagateDirtyFlagToChildren(uie, _Dirty.HitTestVisibility);
        }

        if (uie._DirtyFlags & _Dirty.LocalTransform) {
            uie._DirtyFlags &= ~_Dirty.LocalTransform;
            uie._DirtyFlags |= _Dirty.Transform;
            uie._ComputeLocalTransform();
        }
        if (uie._DirtyFlags & _Dirty.LocalProjection) {
            uie._DirtyFlags &= ~_Dirty.LocalProjection;
            uie._DirtyFlags |= _Dirty.Transform;
            uie._ComputeLocalProjection();
        }
        if (uie._DirtyFlags & _Dirty.Transform) {
            uie._DirtyFlags &= ~_Dirty.Transform;
            uie._ComputeTransform();
            visualParent = uie.GetVisualParent();
            if (visualParent)
                visualParent._UpdateBounds();
            this._PropagateDirtyFlagToChildren(uie, _Dirty.Transform);
        }

        if (uie._DirtyFlags & _Dirty.LocalClip) {
            uie._DirtyFlags &= ~_Dirty.LocalClip;
            uie._DirtyFlags |= _Dirty.Clip;
        }
        if (uie._DirtyFlags & _Dirty.Clip) {
            uie._DirtyFlags &= ~_Dirty.Clip;
            this._PropagateDirtyFlagToChildren(uie, _Dirty.Clip);
        }

        if (uie._DirtyFlags & _Dirty.ChildrenZIndices) {
            uie._DirtyFlags &= ~_Dirty.ChildrenZIndices;
            if (~(uie instanceof Panel)) {
                //Warning: Only applicable to Panel subclasses
            } else {
                uie.GetChildren().ResortByZIndex();
            }
        }

        if (!(uie._DirtyFlags & _Dirty.DownDirtyState) && uie._DownDirtyNode) {
            this._DownDirtyNode.RemoveDirtyNode(uie._DownDirtyNode);
            uie._DownDirtyNode = null;
        }
    }

    if (!this._DownDirty.IsEmpty()) {
        //TODO: Warning
    }
};
Surface.prototype._ProcessUpDirtyElements = function () {
    var visualParent;
    var node;
    while (node = this._UpDirty.GetFirst()) {
        var uie = node.Element;
        if (uie._DirtyFlags & _Dirty.Bounds) {
            uie._DirtyFlags &= ~_Dirty.Bounds;

            var oextents = uie._GetSubtreeExtents();
            var oglobalbounds = uie._GetGlobalBounds();
            var osubtreebounds = uie._GetSubtreeBounds();

            uie._ComputeBounds();

            if (!Rect.Equals(oglobalbounds, uie._GetGlobalBounds())) {
                visualParent = uie.GetVisualParent();
                if (visualParent) {
                    visualParent._UpdateBounds();
                    visualParent._Invalidate(osubtreebounds);
                    visualParent._Invalidate(uie._GetSubtreeBounds());
                }
            }

            if (!Rect.Equals(oextents, uie._GetSubtreeExtents())) {
                uie._Invalidate(uie._GetSubtreeBounds());
            }

            if (uie._ForceInvalidateOfNewBounds) {
                uie._ForceInvalidateOfNewBounds = false;
                uie._InvalidateSubtreePaint();
            }
        }

        if (uie._DirtyFlags & _Dirty.NewBounds) {
            visualParent = uie.GetVisualParent();
            if (visualParent)
                visualParent._Invalidate(uie._GetSubtreeBounds());
            else if (this._IsTopLevel(uie))
                uie._InvalidateSubtreePaint();
            uie._DirtyFlags &= ~_Dirty.NewBounds;
        }

        if (uie._DirtyFlags & _Dirty.Invalidate) {
            uie._DirtyFlags &= ~_Dirty.Invalidate;
            var dirty = uie._DirtyRegion;
            visualParent = uie.GetVisualParent();
            if (visualParent) {
                visualParent._Invalidate(dirty);
            } else {
                if (uie._IsAttached) {
                    this._Invalidate(dirty);
                    /*
                    OPTIMIZATION NOT IMPLEMENTED
                    var count = dirty.GetRectangleCount();
                    for (var i = count - 1; i >= 0; i--) {
                    this._Invalidate(dirty.GetRectangle(i));
                    }
                    */
                }
            }
        }

        if (!(uie._DirtyFlags & _Dirty.UpDirtyState)) {
            this._UpDirty.RemoveDirtyNode(uie._UpDirtyNode);
            uie._UpDirtyNode = null;
        }
    }

    if (!this._UpDirty.IsEmpty()) {
        //TODO: Warning
    }
};
Surface.prototype._PropagateDirtyFlagToChildren = function (element, dirt) {
    var walker = new _VisualTreeWalker(element, _VisualTreeWalkerDirection.Logical);
    var child;
    while (child = walker.Step()) {
        this._AddDirtyElement(child, dirt);
    }
};
Surface.prototype._AddDirtyElement = function (/* UIElement */element, dirt) {
    if (element.GetVisualParent() == null && !this._IsTopLevel(element))
        return;

    element._DirtyFlags |= dirt;

    if (dirt & _Dirty.DownDirtyState) {
        if (element._DownDirtyNode)
            return;
        element._DownDirtyNode = new DirtyNode(element);
        this._DownDirty.AddDirtyNode(element._DownDirtyNode);
    }
    if (dirt & _Dirty.UpDirtyState) {
        if (element._UpDirtyNode)
            return;
        element._UpDirtyNode = new DirtyNode(element);
        this._UpDirty.AddDirtyNode(element._UpDirtyNode);
    }
    //TODO: Alert redraw needed
};
Surface.prototype._RemoveDirtyElement = function (/* UIElement */element) {
    if (element._UpDirtyNode)
        this._UpDirtyNode.RemoveDirtyNode(element._UpDirtyNode);
    if (element._DownDirtyNode)
        this._DownDirtyNode.RemoveDirtyNode(element._DownDirtyNode);
    element._UpDirtyNode = null;
    element._DownDirtyNode = null;
};


_RenderContext.prototype = new Object;
_RenderContext.prototype.constructor = _RenderContext;
function _RenderContext(surface) {
    this._Surface = surface;
}
_RenderContext.prototype.GetSurface = function () {
    return this._Surface;
};
_RenderContext.prototype.Clip = function (clip) {
    if (clip instanceof Rect) {
        this._Surface._Ctx.rect(rect.X, rect.Y, rect.Width, rect.Height);
        this._Surface._Ctx.clip();
    } else if (clip instanceof Geometry) {
        clip.Draw(this._Surface._Ctx);
        this._Surface._Ctx.clip();
    }
};
_RenderContext.prototype.Transform = function (matrix) {
    matrix.Apply(this._Surface._Ctx);
};
_RenderContext.prototype.Save = function () {
    this._Surface._Ctx.save();
}
_RenderContext.prototype.Restore = function () {
    this._Surface._Ctx.restore();
};
_RenderContext.prototype.Fill = function (region, brush) {
    if (region instanceof Rect) {
        this._Surface._Ctx.fillStyle = brush._Translate();
        this._Surface._Ctx.fillRect(region.X, region.Y, region.Width, region.Height);
    }
};
_RenderContext.prototype.CustomRender = function (painterFunc) {
    var args = toArray.call(arguments);
    args.shift(); //remove painterFunc
    args.unshift(this._Surface._Ctx); //prepend canvas context
    painterFunc.apply(this, args);
};
function toArray() {
    var arr = new Array();
    for (var i in this)
        arr.push(this[i]);
    return arr;
};