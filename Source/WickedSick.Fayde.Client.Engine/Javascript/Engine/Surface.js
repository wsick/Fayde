/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/LinkedList.js"/>
/// CODE
/// <reference path="Dirty.js"/>
/// <reference path="Debug.js"/>
/// <reference path="../Core/LayoutInformation.js"/>
/// <reference path="../Runtime/Collection.js"/>
/// <reference path="../Runtime/EventArgs.js"/>
/// <reference path="DirtyNode.js"/>
/// <reference path="Clock.js"/>
/// <reference path="../Primitives/Font.js"/>

//#region Surface
var Surface = Nullstone.Create("Surface", null, 1);

Surface.Instance.Init = function (app) {
    this._App = app;
    this._Clock = new Clock();
    this._InputList = new LinkedList();
    this._FocusChangedEvents = new LinkedList();
    this._FirstUserInitiatedEvent = false;
    this._UserInitiatedEvent = false;
    this._Cursor = CursorType.Default;
};

//#region Initialization

Surface.Instance.Register = function (jCanvas) {
    Surface._TestCanvas = document.createElement('canvas');
    this._Layers = new Collection();
    this._DownDirty = new _DirtyList();
    this._UpDirty = new _DirtyList();

    this._jCanvas = jCanvas;
    this._Ctx = this._jCanvas[0].getContext('2d');
    this._CanvasOffset = this._jCanvas.offset();
    this.RegisterEvents();
};
Surface.Instance.RegisterEvents = function () {
    var surface = this;
    var canvas = this.GetCanvas();

    canvas.addEventListener("mousedown", function (e) { surface._HandleButtonPress(window.event ? window.event : e); });
    canvas.addEventListener("mouseup", function (e) { surface._HandleButtonRelease(window.event ? window.event : e); });
    canvas.addEventListener("mouseout", function (e) { surface._HandleOut(window.event ? window.event : e); });
    canvas.addEventListener("mousemove", function (e) { surface._HandleMove(window.event ? window.event : e); });
    //canvas.addEventListener("mousewheel", function (e) { surface._HandleWheel(surface._GetMousePosition(event)); });
    document.onkeypress = function (e) { surface._HandleKeyPress(window.event ? window.event : e); };
    document.onkeydown = function (e) {
        e = window.event ? window.event : e;
        if (e.keyCode === 8 || e.keyCode === 46) {
            surface._HandleKeyPress(e);
            return false;
        }
    };
};
Surface.Instance._Attach = function (element) {
    /// <param name="element" type="UIElement"></param>
    if (this._TopLevel) {
        this._DetachLayer(this._TopLevel);
    }

    if (!element) {
        this._Invalidate();
        return;
    }

    if (!(element instanceof UIElement)) {
        _Console.WriteLine("Unsupported top level element.");
        return;
    }

    if (!NameScope.GetNameScope(element)) {
        NameScope.SetNameScope(element, new NameScope());
    }

    this._TopLevel = element;

    this._TopLevel.Loaded.Subscribe(this._HandleTopLevelLoaded, this);
    this._AttachLayer(this._TopLevel);
    var surface = this;
    var postAttach = function () {
        surface._TopLevel._SetIsAttached(true);
        surface._TopLevel._SetIsLoaded(true);
        surface._App.OnLoaded();
    };
    setTimeout(postAttach, 1);
};
Surface.Instance._AttachLayer = function (layer) {
    /// <param name="layer" type="UIElement"></param>
    if (Nullstone.RefEquals(layer, this._TopLevel))
        this._Layers.Insert(0, layer);
    else
        this._Layers.Add(layer);

    layer._FullInvalidate(true);
    layer._InvalidateMeasure();
    layer._SetIsAttached(true);
    layer._SetIsLoaded(true);
};
Surface.Instance._DetachLayer = function (layer) {
    /// <param name="layer" type="UIElement"></param>
    //TODO: Implement
};

//#endregion

//#region Properties

Surface.Instance.GetCanvas = function () { return this._jCanvas[0]; };
Surface.Instance.GetExtents = function () {
    if (!this._Extents)
        this._Extents = new Size(this.GetWidth(), this.GetHeight());
    return this._Extents;
};
Surface.Instance.InvalidateExtents = function () {
    delete this._Extents;
};
Surface.Instance.GetWidth = function () {
    return this._jCanvas.width();
};
Surface.Instance.GetHeight = function () {
    return this._jCanvas.height();
};

//#endregion

//#region Render

Surface.Instance._Invalidate = function (rect) {
    if (!rect) {
        var extents = this.GetExtents();
        rect = new Rect(0, 0, extents.Width, extents.Height);
    }
    if (!this._InvalidatedRect)
        this._InvalidatedRect = rect;
    else
        this._InvalidatedRect = this._InvalidatedRect.Union(rect);

    if (this._IsRenderQueued)
        return;
    this._IsRenderQueued = true;
    if (!Surface._Invalidations)
        Surface._Invalidations = [];
    Surface._Invalidations.push(this);
    setTimeout(Surface.StaticRender, 1);
};
Surface.StaticRender = function () {
    var cur;
    while (cur = Surface._Invalidations.pop()) {
        var rect2 = cur._InvalidatedRect;
        cur._InvalidatedRect = null;
        cur._IsRenderQueued = false;
        cur.Render(rect2);
    }
};
Surface.Instance.Render = function (region) {
    var ctx = new _RenderContext(this);

    var layers = this._Layers;
    var layerCount = layers ? layers.GetCount() : 0;

    ctx.Clear(region);
    for (var i = 0; i < layerCount; i++) {
        layers.GetValueAt(i)._DoRender(ctx, region);
    }
};

//#endregion

//#region Update

Surface.Instance._HandleTopLevelLoaded = function (sender, args) {
    var element = sender;
    this._TopLevel.Loaded.Unsubscribe(this._HandleTopLevelLoaded, this);
    if (Nullstone.RefEquals(element, this._TopLevel)) {
        //TODO: Resize canvas based on top level

        element._UpdateTotalRenderVisibility();
        element._UpdateTotalHitTestVisibility();
        element._FullInvalidate(true);

        element._InvalidateMeasure();
    }
};
Surface.Instance.ProcessDirtyElements = function () {
    var error = new BError();
    var dirty = this._UpdateLayout(error);
    if (error.IsErrored()) {
        throw error.CreateException();
    }
    return dirty;
};
Surface.Instance._UpdateLayout = function (error) {
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
Surface.Instance._ProcessDownDirtyElements = function () {
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
Surface.Instance._ProcessUpDirtyElements = function () {
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
Surface.Instance._PropagateDirtyFlagToChildren = function (element, dirt) {
    var walker = new _VisualTreeWalker(element, _VisualTreeWalkerDirection.Logical);
    var child;
    while (child = walker.Step()) {
        this._AddDirtyElement(child, dirt);
    }
};
Surface.Instance._AddDirtyElement = function (element, dirt) {
    /// <param name="element" type="UIElement"></param>
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
    this._Invalidate();
};
Surface.Instance._RemoveDirtyElement = function (element) {
    /// <param name="element" type="UIElement"></param>
    if (element._UpDirtyNode)
        this._UpDirty.RemoveDirtyNode(element._UpDirtyNode);
    if (element._DownDirtyNode)
        this._DownDirty.RemoveDirtyNode(element._DownDirtyNode);
    element._UpDirtyNode = null;
    element._DownDirtyNode = null;
};
Surface.Instance._IsTopLevel = function (top) {
    /// <param name="top" type="UIElement"></param>
    if (!top || !this._Layers)
        return false;
    var ret = false; //TODO: full-screen message
    var count = this._Layers.GetCount();
    for (var i = 0; i < count && !ret; i++) {
        var layer = this._Layers.GetValueAt(i);
        ret = Nullstone.RefEquals(top, layer);
    }
    return ret;
};

//#endregion

//#region Cursor

Surface.Instance._UpdateCursorFromInputList = function () {
    var newCursor = CursorType.Default;
    for (var node = this._InputList.First(); node; node = node.Next) {
        newCursor = node.UIElement.GetCursor();
        if (newCursor !== CursorType.Default)
            break;
    }
    this._SetCursor(newCursor);
};
Surface.Instance._SetCursor = function (cursor) {
    this._Cursor = cursor;
    this._jCanvas.css("cursor", cursor);
};

//#endregion

//#region Mouse

Surface.Instance._HandleButtonRelease = function (evt) {
    var button = evt.which ? evt.which : evt.button;
    var pos = this._GetMousePosition(evt);

    this._SetUserInitiatedEvent(true);
    this._HandleMouseEvent("up", button, pos);
    this._SetUserInitiatedEvent(false);
    this._UpdateCursorFromInputList();
    if (this._Captured)
        this._PerformReleaseCapture();
};
Surface.Instance._HandleButtonPress = function (evt) {
    var button = evt.which ? evt.which : evt.button;
    var pos = this._GetMousePosition(evt);

    this._SetUserInitiatedEvent(true);
    this._HandleMouseEvent("down", button, pos);
    this._SetUserInitiatedEvent(false);
    this._UpdateCursorFromInputList();
};
Surface.Instance._HandleWheel = function (pos) {
    this._HandleMouseEvent("wheel", null, pos);
    this._UpdateCursorFromInputList();
};
Surface.Instance._HandleMove = function (evt) {
    var pos = this._GetMousePosition(evt);
    this._HandleMouseEvent("move", null, pos);
    this._UpdateCursorFromInputList();
};
Surface.Instance._HandleOut = function (evt) {
    var pos = this._GetMousePosition(evt);
    this._HandleMouseEvent("out", null, pos);
};
Surface.Instance._HandleMouseEvent = function (type, button, pos, emitLeave, emitEnter) {
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

Surface.Instance._GetMousePosition = function (evt) {
    return new Point(
        evt.clientX + window.pageXOffset + this._CanvasOffset.left,
        evt.clientY + window.pageYOffset + this._CanvasOffset.top);
};
Surface.Instance._FindFirstCommonElement = function (list1, list2, outObj) {
    var ui1 = list1.Last();
    var i1 = list1._Count - 1;
    var ui2 = list2.Last();
    var i2 = list2._Count - 1;

    outObj.Index1 = -1;
    outObj.Index2 = -1;

    while (ui1 != null && ui2 != null) {
        if (Nullstone.RefEquals(ui1.UIElement, ui2.UIElement)) {
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
Surface.Instance._EmitMouseList = function (type, button, pos, list, endIndex) {
    if (endIndex === 0)
        return;
    if (!endIndex || endIndex === -1)
        endIndex = list._Count;
    var i = 0;
    for (var node = list.First(); node && i < endIndex; node = node.Next, i++) {
        node.UIElement._EmitMouseEvent(type, button, pos);
    }
};

Surface.Instance.SetMouseCapture = function (uie) {
    /// <param name="uie" type="UIElement"></param>
    if (this._Captured || this._PendingCapture)
        return Nullstone.RefEquals(uie, this._Captured) || Nullstone.RefEquals(uie, this._PendingCapture);
    if (!this._EmittingMouseEvent)
        return false;
    this._PendingCapture = uie;
    return true;
};
Surface.Instance.ReleaseMouseCapture = function (uie) {
    /// <param name="uie" type="UIElement"></param>
    if (!Nullstone.RefEquals(uie, this._Captured) && !Nullstone.RefEquals(uie, this._PendingCapture))
        return;
    if (this._EmittingMouseEvent)
        this._PendingReleaseCapture = true;
    else
        this._PerformReleaseCapture();
};
Surface.Instance._PerformCapture = function (uie) {
    /// <param name="uie" type="UIElement"></param>
    this._Captured = uie;
    var newInputList = new LinkedList();
    while (uie != null) {
        newInputList.Append(new UIElementNode(uie));
        uie = uie.GetVisualParent();
    }
    this._InputList = newInputList;
    this._PendingCapture = null;
};
Surface.Instance._PerformReleaseCapture = function () {
    var oldCaptured = this._Captured;
    this._Captured = null;
    this._PendingReleaseCapture = false;
    oldCaptured._EmitLostMouseCapture(this._CurrentPos);
    //force "MouseEnter" on any new elements
    this._HandleMouseEvent("noop", null, this._CurrentPos, false, true);
};

//#endregion

//#region Keyboard

Surface.Instance._HandleKeyPress = function (eve) {
    this._SetUserInitiatedEvent(true);
    var handled = false;
    if (this._FocusedElement != null) {
        var focusToRoot = Surface._ElementPathToRoot(this._FocusedElement);
        var modifiers = {
            Shift: eve.shiftKey,
            Ctrl: eve.ctrlKey,
            Alt: eve.altKey
        };
        handled = this._EmitKeyDown(focusToRoot, modifiers, eve.keyCode);
    }
    if (!handled && eve.keyCode === 9) { //Tab
        if (this._FocusedElement != null)
            TabNavigationWalker.Focus(this._FocusedElement, eve.shiftKey);
        else
            this._EnsureElementFocused();
    }
    this._SetUserInitiatedEvent(false);
    return handled;
};
Surface.Instance._EmitKeyDown = function (list, modifiers, keyCode, endIndex) {
    if (endIndex === 0)
        return;
    if (!endIndex || endIndex === -1)
        endIndex = list._Count;
    var i = 0;
    var args = new KeyEventArgs(modifiers, keyCode);
    for (var node = list.First(); node && i < endIndex; node = node.Next, i++) {
        node.UIElement._EmitKeyDown(args);
    }
};

//#endregion

//#region Focus

Surface.Instance._FocusElement = function (uie) {
    /// <param name="uie" type="UIElement"></param>
    if (Nullstone.RefEquals(uie, this._FocusedElement))
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
Surface.Instance._RemoveFocus = function (uie) {
    if (Nullstone.RefEquals(this._FocusedElement, uie))
        this._FocusElement(null);
};
Surface.Instance._EnsureElementFocused = function () {
};
Surface.Instance._EmitFocusChangeEventsAsync = function () {
    var surface = this;
    window.setTimeout(function () { surface._EmitFocusChangeEvents(); }, 1);
};
Surface.Instance._EmitFocusChangeEvents = function () {
    var node;
    while (node = this._FocusChangedEvents.First()) {
        this._FocusChangedEvents.Remove(node);
        this._EmitFocusList("lost", node.LostFocus);
        this._EmitFocusList("got", node.GotFocus);
    }
};
Surface.Instance._EmitFocusList = function (type, list) {
    if (list == null)
        return;
    for (var node = list.First(); node; node = node.Next) {
        node.UIElement._EmitFocusChange(type);
    }
};

//#endregion

Surface.Instance._SetUserInitiatedEvent = function (val) {
    this._EmitFocusChangeEvents();
    this._FirstUserInitiatedEvent = this._FirstUserInitiatedEvent || val;
    this._UserInitiatedEvent = val;
};


Surface.MeasureText = function (text, font) {
    return new Size(Surface._MeasureWidth(text, font), Surface._MeasureHeight(font));
};
Surface._MeasureWidth = function (text, font) {
    /// <param name="text" type="String"></param>
    /// <param name="font" type="Font"></param>
    var test = Surface._EnsureTestCanvas();
    test.Context.font = font.ToHtml5Object();
    return test.Context.measureText(text).width;
};
Surface._MeasureHeight = function (font) {
    /// <param name="font" type="Font"></param>
    if (font._CachedHeight)
        return font._CachedHeight;

    var body = document.getElementsByTagName("body")[0];
    var dummy = document.createElement("div");
    var dummyText = document.createTextNode("M");
    dummy.appendChild(dummyText);
    dummy.setAttribute("style", "font: " + font.ToHtml5Object() + ";");
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
Surface._EnsureTestCanvas = function () {
    var canvas = Surface._TestCanvas;
    var ctx = Surface._TestCanvasContext;
    if (!ctx) {
        if (!canvas)
            canvas = Surface._TestCanvas = document.createElement('canvas');
        ctx = Surface._TestCanvasContext = canvas.getContext('2d');
    }
    return {
        Canvas: canvas,
        Context: ctx
    };
};

Nullstone.FinishCreate(Surface);
//#endregion