/// <reference path="../Runtime/LinkedList.js"/>
/// CODE
/// <reference path="Dirty.js"/>
/// <reference path="Debug.js"/>
/// <reference path="../Core/LayoutInformation.js"/>
/// <reference path="../Runtime/Collection.js"/>
/// <reference path="../Runtime/EventArgs.js"/>
/// <reference path="DirtyNode.js"/>

//#region Surface

function Surface() {
    RefObject.call(this);
    this._InputList = new LinkedList();
    this._FocusChangedEvents = new LinkedList();
    this._FirstUserInitiatedEvent = false;
    this._UserInitiatedEvent = false;
    this._Cursor = CursorType.Default;
}
Surface.InheritFrom(RefObject);

Surface.prototype.Init = function (jCanvas) {
    Surface._TestCanvas = document.createElement('canvas');
    this._Layers = new Collection();
    this._DownDirty = new _DirtyList();
    this._UpDirty = new _DirtyList();

    this._jCanvas = jCanvas;
    this._Ctx = this._jCanvas[0].getContext('2d');
    this._CanvasOffset = this._jCanvas.offset();
    this.RegisterEvents();
};
Surface.prototype.GetCanvas = function () { return this._jCanvas[0]; };
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

    var layerCount = 0;
    if (this._Layers)
        layerCount = this._Layers.GetCount();

    ctx.Clear(region);
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

    if (NameScope.GetNameScope(element) == null) {
        NameScope.SetNameScope(element, new NameScope());
    }

    //TODO: Enable events

    this._TopLevel = element;

    //TODO: Subscribe Loaded event

    this._TopLevel.Loaded.Subscribe(this._HandleTopLevelLoaded, this);
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
    if (RefObject.RefEquals(layer, this._TopLevel))
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
    this._TopLevel.Loaded.Unsubscribe(this._HandleTopLevelLoaded);
    if (RefObject.RefEquals(element, this._TopLevel)) {
        //TODO: this.Resize.Raise(this, null);

        element._UpdateTotalRenderVisibility();
        element._UpdateTotalHitTestVisibility();
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
        var layer = this._Layers.GetValueAt(i);
        ret = RefObject.RefEquals(top, layer);
    }
    return ret;
};
Surface.prototype.ProcessDirtyElements = function () {
    var error = new BError();
    var dirty = this._UpdateLayout(error);
    if (error.IsErrored()) {
        Fatal(error);
    }
    return dirty;
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
            var element = layer;
            if (!element._HasFlag(UIElementFlags.DirtyMeasureHint) && !element._HasFlag(UIElementFlags.DirtyArrangeHint))
                continue;

            var last = LayoutInformation.GetPreviousConstraint(element);
            var available = new Size(this.GetWidth(), this.GetHeight());
            if (element.IsContainer() && (!last || (!last.Equals(available)))) {
                element._InvalidateMeasure();
                LayoutInformation.SetPreviousConstraint(element, available);
            }

            element._UpdateLayer(pass, error);
        }

        //dirty = dirty || !this._DownDirty.IsEmpty() || !this._UpDirty.IsEmpty();
        this._ProcessDownDirtyElements();
        this._ProcessUpDirtyElements();

        if (pass._Updated/* && dirty*/) {
            //TODO: LayoutUpdated Event
        }
    }

    if (pass._Count >= LayoutPass.MaxCount) {
        if (error)
            error.SetErrored(BError.Exception, "UpdateLayout has entered infinite loop and has been aborted.");
    }

    return dirty;
};
//Down --> Transformation, Opacity
Surface.prototype._ProcessDownDirtyElements = function () {
    var visualParent;
    var node;
    while (node = this._DownDirty.GetFirst()) {
        var uie = node.Element;

        if (uie._DirtyFlags & _Dirty.RenderVisibility) {
            uie._DirtyFlags &= ~_Dirty.RenderVisibility;

            var ovisible = uie._GetRenderVisible();

            uie._UpdateBounds();

            visualParent = uie.GetVisualParent();
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
            this._DownDirty.RemoveDirtyNode(uie._DownDirtyNode);
            uie._DownDirtyNode = null;
        }
    }

    if (!this._DownDirty.IsEmpty()) {
        Warn("Finished DownDirty pass, not empty.");
    }
};
//Up --> Bounds, Invalidation
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
        Warn("Finished UpDirty pass, not empty.");
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
        this._UpDirty.RemoveDirtyNode(element._UpDirtyNode);
    if (element._DownDirtyNode)
        this._DownDirty.RemoveDirtyNode(element._DownDirtyNode);
    element._UpDirtyNode = null;
    element._DownDirtyNode = null;
};

Surface.prototype._SetUserInitiatedEvent = function (val) {
    this._EmitFocusChangeEvents();
    this._FirstUserInitiatedEvent = this._FirstUserInitiatedEvent || val;
    this._UserInitiatedEvent = val;
};
Surface.prototype._UpdateCursorFromInputList = function () {
    var newCursor = CursorType.Default;
    for (var node = this._InputList.First(); node; node = node.Next) {
        newCursor = node.UIElement.GetCursor();
        if (newCursor !== CursorType.Default)
            break;
    }
    this._SetCursor(newCursor);
};
Surface.prototype._SetCursor = function (cursor) {
    this._Cursor = cursor;
    this._jCanvas.css("cursor", cursor);
};

Surface.prototype.RegisterEvents = function () {
    var surface = this;
    var canvas = this.GetCanvas();

    canvas.addEventListener("mousedown", function (e) { surface._HandleButtonPress(event.button, surface._GetMousePosition(event)); });
    canvas.addEventListener("mouseup", function (e) { surface._HandleButtonRelease(event.button, surface._GetMousePosition(event)); });
    canvas.addEventListener("mouseout", function (e) { surface._HandleOut(surface._GetMousePosition(event)); });
    canvas.addEventListener("mousemove", function (e) { surface._HandleMove(surface._GetMousePosition(event)); });
    canvas.addEventListener("mousewheel", function (e) { surface._HandleWheel(surface._GetMousePosition(event)); });
};

//#region MOUSE

Surface.prototype._HandleButtonRelease = function (button, pos) {
    this._SetUserInitiatedEvent(true);
    this._HandleMouseEvent("up", button, pos);
    this._SetUserInitiatedEvent(false);
    this._UpdateCursorFromInputList();
    if (this._Captured)
        this._PerformReleaseCapture();
};
Surface.prototype._HandleButtonPress = function (button, pos) {
    this._SetUserInitiatedEvent(true);
    this._HandleMouseEvent("down", button, pos);
    this._SetUserInitiatedEvent(false);
    this._UpdateCursorFromInputList();
};
Surface.prototype._HandleWheel = function (pos) {
    this._HandleMouseEvent("wheel", null, pos);
    this._UpdateCursorFromInputList();
};
Surface.prototype._HandleMove = function (pos) {
    this._HandleMouseEvent("move", null, pos);
    this._UpdateCursorFromInputList();
};
Surface.prototype._HandleOut = function (pos) {
    this._HandleMouseEvent("out", null, pos);
};
Surface.prototype._HandleMouseEvent = function (type, button, pos, emitLeave, emitEnter) {
    HUDUpdate("mouse", pos.toString());
    this._CurrentPos = pos;
    if (this._EmittingMouseEvent)
        return false;
    if (this._TopLevel == null)
        return false;

    this._EmittingMouseEvent = true;
    if (this._Captured) {
        this._EmitMouseList(type, button, pos, this._InputList);
    } else {
        this.ProcessDirtyElements();
        var ctx = new _RenderContext(this);
        var newInputList = new LinkedList();
        var layerCount = this._Layers.GetCount();
        for (var i = layerCount - 1; i >= 0 && newInputList.IsEmpty(); i--) {
            var layer = this._Layers.GetValueAt(i);
            layer._HitTestPoint(ctx, pos, newInputList);
        }

        var indices = {};
        this._FindFirstCommonElement(this._InputList, newInputList, indices);
        if (emitLeave === undefined || emitLeave === true)
            this._EmitMouseList("leave", button, pos, this._InputList, indices.Index1);
        if (emitEnter === undefined || emitEnter === true)
            this._EmitMouseList("enter", button, pos, newInputList, indices.Index2);
        if (type !== "noop")
            this._EmitMouseList(type, button, pos, newInputList);

        HUDUpdate("els", "Elements Found: " + newInputList._Count.toString());
        this._InputList = newInputList;
    }

    if (this._PendingCapture)
        this._PerformCapture(this._PendingCapture);
    if (this._PendingReleaseCapture || (this._Captured && !this._Captured.CanCaptureMouse()))
        this._PerformReleaseCapture();
    this._EmittingMouseEvent = false;
};

Surface.prototype._GetMousePosition = function (evt) {
    return new Point(
        evt.clientX - this._CanvasOffset.left,
        evt.clientY - this._CanvasOffset.top);
};
Surface.prototype._FindFirstCommonElement = function (list1, list2, outObj) {
    var ui1 = list1.Last();
    var i1 = list1._Count - 1;
    var ui2 = list2.Last();
    var i2 = list2._Count - 1;

    outObj.Index1 = -1;
    outObj.Index2 = -1;

    while (ui1 != null && ui2 != null) {
        if (RefObject.RefEquals(ui1.UIElement, ui2.UIElement)) {
            outObj.Index1 = i1;
            outObj.Index2 = i2;
        } else {
            return;
        }
        ui1 = ui1.Previous;
        ui2 = ui2.Previous;
        i1--;
        i2--;
    }
};
Surface.prototype._EmitMouseList = function (type, button, pos, list, endIndex) {
    if (endIndex === 0)
        return;
    var i = 0;
    if (!endIndex || endIndex === -1)
        endIndex = list._Count;
    for (var node = list.First(); node && i < endIndex; node = node.Next, i++) {
        node.UIElement._EmitMouseEvent(type, button, pos);
    }
};

Surface.prototype.SetMouseCapture = function (/* UIElement */uie) {
    if (this._Captured || this._PendingCapture)
        return RefObject.RefEquals(uie, this._Captured) || RefObject.RefEquals(uie, this._PendingCapture);
    if (!this._EmittingMouseEvent)
        return false;
    this._PendingCapture = uie;
    return true;
};
Surface.prototype.ReleaseMouseCapture = function (/* UIElement */uie) {
    if (!RefObject.RefEquals(uie, this._Captured) && !RefObject.RefEquals(uie, this._PendingCapture))
        return;
    if (this._EmittingMouseEvent)
        this._PendingReleaseCapture = true;
    else
        this._PerformReleaseCapture();
};
Surface.prototype._PerformCapture = function (/* UIElement */uie) {
    this._Captured = uie;
    var newInputList = new LinkedList();
    while (uie != null) {
        newInputList.Append(new UIElementNode(uie));
        uie = uie.GetVisualParent();
    }
    this._InputList = newInputList;
    this._PendingCapture = null;
};
Surface.prototype._PerformReleaseCapture = function () {
    var oldCaptured = this._Captured;
    this._Captured = null;
    this._PendingReleaseCapture = false;
    oldCaptured._EmitLostMouseCapture(this._CurrentPos);
    //force "MouseEnter" on any new elements
    this._HandleMouseEvent("noop", null, this._CurrentPos, false, true);
};

//#endregion

//#region FOCUS

Surface.prototype._FocusElement = function (/* UIElement */uie) {
    if (RefObject.RefEquals(uie, this._FocusedElement))
        return true;

    if (this._FocusedElement != null)
        this._FocusChangedEvents.Append(new FocusChangedNode(Surface._ElementPathToRoot(this._FocusedElement), null));

    this._FocusedElement = uie;

    if (uie)
        this._FocusChangedEvents.Append(new FocusChangedNode(null, Surface._ElementPathToRoot(uie)));

    if (this._FirstUserInitiatedEvent)
        this._EmitFocusChangeEventsAsync();

    return true;
};
Surface.prototype._EmitFocusChangeEventsAsync = function () {
    var surface = this;
    window.setTimeout(function () { surface._EmitFocusChangeEvents(); }, 1);
};
Surface.prototype._EmitFocusChangeEvents = function () {
    var node;
    while (node = this._FocusChangedEvents.First()) {
        this._FocusChangedEvents.Remove(node);
        this._EmitFocusList("lost", node.LostFocus);
        this._EmitFocusList("got", node.GotFocus);
    }
};
Surface.prototype._EmitFocusList = function (type, list) {
    if (list == null)
        return;
    for (var node = list.First(); node; node = node.Next) {
        node.UIElement._EmitFocusChange(type);
    }
};

//#endregion

Surface.MeasureText = function (text, font) {
    if (!Surface._TestCanvas)
        Surface._TestCanvas = document.createElement('canvas');
    var ctx = Surface._TestCanvas.getContext('2d');
    ctx.font = font._Translate();
    return new Size(ctx.measureText(text).width, Surface._MeasureHeight(font));
};
Surface._MeasureHeight = function (font) {
    if (font._CachedHeight)
        return font._CachedHeight;

    var body = document.getElementsByTagName("body")[0];
    var dummy = document.createElement("div");
    var dummyText = document.createTextNode("M");
    dummy.appendChild(dummyText);
    dummy.setAttribute("style", "font: " + font._Translate() + ";");
    body.appendChild(dummy);
    var result = dummy.offsetHeight;
    body.removeChild(dummy);

    font._CachedHeight = result;
    return result;
};
Surface.IsLeftButton = function (button) {
    return button === 1;
};
Surface.IsRightButton = function (button) {
    return button === 2;
};
Surface._ElementPathToRoot = function (source) {
    var list = new LinkedList();
    while (source) {
        list.Append(new UIElementNode(source));
        source = source.GetVisualParent();
    }
    return list;
};

//#endregion