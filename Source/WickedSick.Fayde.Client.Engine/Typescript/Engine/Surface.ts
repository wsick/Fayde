/// CODE
/// <reference path="App.ts" />
/// <reference path="RenderContext.ts" />
/// <reference path="../Core/UIElement.ts" />
/// <reference path="Dirty.ts" />
/// <reference path="../Input/KeyInterop.ts" />
/// <reference path="../Input/Keyboard.ts" />
/// <reference path="../Core/Walkers.ts" />
/// <reference path="../Input/MouseEventArgs.ts" />

declare var Warn;

var resizeTimeout: number;

interface IFocusChangedEvents {
    GotFocus: Fayde.UINode[];
    LostFocus: Fayde.UINode[];
}

class Surface {
    static TestCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");

    private _App: App;
    _TopLevel: Fayde.UIElement;
    private _Layers: Fayde.UINode[] = [];
    private _UpDirty: Fayde.LayoutUpdater[] = [];
    private _DownDirty: Fayde.LayoutUpdater[] = [];
    private _Canvas: HTMLCanvasElement = null;
    private _Ctx: CanvasRenderingContext2D = null;
    private _PercentageWidth: number = 0;
    private _PercentageHeight: number = 0;
    private _CanvasOffset: any = null;
    private _Extents: size = null;
    private _KeyInterop: Fayde.Input.KeyInterop;
    private _InputList: Fayde.UINode[] = [];
    private _FocusedNode: Fayde.UINode = null;
    private _FocusChangedEvents: IFocusChangedEvents[] = [];
    private _FirstUserInitiatedEvent: bool = false;
    private _UserInitiatedEvent: bool = false;
    private _Captured: Fayde.UINode = null;
    private _PendingCapture: Fayde.UINode = null;
    private _PendingReleaseCapture: bool = false;
    private _CurrentPos: Point = null;
    private _EmittingMouseEvent: bool = false;
    private _Cursor: string = Fayde.CursorType.Default;
    constructor(app: App) {
        this._App = app;
        this._KeyInterop = Fayde.Input.KeyInterop.CreateInterop(this);
    }

    get Extents(): size {
        if (!this._Extents)
            this._Extents = size.fromRaw(this._Canvas.offsetWidth, this._Canvas.offsetHeight);
        return this._Extents;
    }

    // INITIALIZATION
    Register(canvas: HTMLCanvasElement, width, widthType, height, heightType) {
        this._Canvas = canvas;
        this._Ctx = this._Canvas.getContext("2d");

        if (!width) {
            width = 100;
            widthType = "Percentage";
        } else if (!widthType) {
            widthType = "Percentage";
        }
        if (!height) {
            height = 100;
            heightType = "Percentage";
        } else if (!heightType) {
            heightType = "Percentage";
        }

        this._InitializeCanvas(canvas, width, widthType, height, heightType);
        this._CalculateOffset();
        this._RegisterEvents();
    }
    private _InitializeCanvas(canvas: HTMLCanvasElement, width, widthType, height, heightType) {
        var resizesWithWindow = false;

        if (widthType === "Percentage") {
            resizesWithWindow = true;
            this._PercentageWidth = width;
        } else {
            canvas.width = width;
        }

        if (heightType === "Percentage") {
            resizesWithWindow = true;
            this._PercentageHeight = height;
        } else {
            canvas.height = height;
        }

        if (resizesWithWindow) {
            this._ResizeCanvas();
            window.onresize = (e) => this._HandleResize(window.event ? <any>window.event : e);
        }
    }
    private _CalculateOffset() {
        var left = 0;
        var top = 0;
        var cur: HTMLElement = this._Canvas;
        if (cur.offsetParent) {
            do {
                left += cur.offsetLeft;
                top += cur.offsetTop;
            } while (cur = <HTMLElement>cur.offsetParent);
        }
        this._CanvasOffset = { left: left, top: top };
    }
    private _RegisterEvents() {
        var canvas = this._Canvas;
        canvas.addEventListener("mousedown", (e) => this._HandleButtonPress(window.event ? <any>window.event : e));
        canvas.addEventListener("mouseup", (e) => this._HandleButtonRelease(window.event ? <any>window.event : e));
        canvas.addEventListener("mouseout", (e) => this._HandleOut(window.event ? <any>window.event : e));
        canvas.addEventListener("mousemove", (e) => this._HandleMove(window.event ? <any>window.event : e));

        //IE9, Chrome, Safari, Opera
        canvas.addEventListener("mousewheel", (e) => this._HandleWheel(window.event ? <any>window.event : e));
        //Firefox
        canvas.addEventListener("DOMMouseScroll", (e) => this._HandleWheel(window.event ? <any>window.event : e));

        this._KeyInterop.RegisterEvents();
    }
    Attach(uie: Fayde.UIElement) {
        if (this._TopLevel)
            this._DetachLayer(this._TopLevel);

        if (!uie) {
            this._Invalidate();
            return;
        }

        if (!(uie instanceof Fayde.UIElement))
            throw new Exception("Unsupported top level element.");

        var un = uie.XamlNode;
        if (un.NameScope == null)
            un.NameScope = new Fayde.NameScope(true);
        else if (!un.NameScope.IsRoot)
            un.NameScope.IsRoot = true;

        this._TopLevel = uie;
        this._AttachLayer(uie);
    }
    private _AttachLayer(layer: Fayde.UIElement) {
        var n = layer.XamlNode;
        this._Layers.unshift(n);
        n.IsTopLevel = true;
        var lu = n.LayoutUpdater;
        lu.SetSurface(this);
        lu.FullInvalidate(true);
        lu.InvalidateMeasure();
        n.SetIsAttached(true);
        n.SetIsLoaded(true);
    }
    private _DetachLayer(layer: Fayde.UIElement) {
        var n = layer.XamlNode;
        n.IsTopLevel = false;

        var il = this._InputList;
        if (il[il.length - 1] === n)
            this._InputList = [];

        var f = this._FocusedNode;
        if (f) {
            while (f) {
                if (f === n) {
                    this._FocusNode();
                    break;
                }
                f = f.VisualParentNode;
            }
        }

        var index = this._Layers.indexOf(layer.XamlNode);
        if (index > -1)
            this._Layers.splice(index, 1);
        n.SetIsLoaded(false);
        n.SetIsAttached(false);
        this._Invalidate(n.LayoutUpdater.SubtreeBounds);
    }

    // UPDATE
    ProcessDirtyElements(): bool {
        var error = new BError();
        var dirty = this._UpdateLayout(error);
        if (error.Message)
            error.ThrowException();
        if (!dirty)
            return false;
        //this.LayoutUpdated.Raise(this, new EventArgs());
        return true;
    }
    private _UpdateLayout(error: BError): bool {
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
                var available = size.clone(this.Extents);
                if (lu.IsContainer() && (!last || (!size.isEqual(last, available)))) {
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
    _AddDirtyElement(lu: Fayde.LayoutUpdater, dirt) {
        if (lu.Node.VisualParentNode == null && !lu.Node.IsTopLevel)
            return;

        lu.DirtyFlags |= dirt;
        if (dirt & _Dirty.DownDirtyState && !lu.InDownDirty) {
            this._DownDirty.push(lu);
            lu.InDownDirty = true;
        }
        if (dirt & _Dirty.UpDirtyState && !lu.InUpDirty) {
            this._UpDirty.push(lu);
            lu.InUpDirty = true;
        }
    }
    private _RemoveDirtyElement(lu: Fayde.LayoutUpdater) {
        lu.InUpDirty = false;
        lu.InDownDirty = false;
    }
    OnNodeDetached(lu: Fayde.LayoutUpdater) {
        this._RemoveDirtyElement(lu);
        this._RemoveFocusFrom(lu);
    }

    // RENDER
    _Invalidate(r?: rect) {
        //TODO: Implement
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
        var width = this._PercentageWidth;
        var height = this._PercentageHeight;
        if (width != null)
            this._Canvas.width = window.innerWidth * width / 100.0;
        if (height != null)
            this._Canvas.height = window.innerHeight * height / 100.0;
    }

    // CURSOR
    private _UpdateCursorFromInputList() {
        var newCursor = Fayde.CursorType.Default;
        var list = this._InputList;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            newCursor = list[i].XObject.Cursor;
            if (newCursor !== Fayde.CursorType.Default)
                break;
        }
        this._SetCursor(newCursor);
    }
    private _SetCursor(cursor: string) {
        this._Cursor = cursor;
        this._Canvas.style.cursor = cursor;
    }

    // INPUT
    _HandleKeyDown(args): bool {
        this._SetUserInitiatedEvent(true);
        Fayde.Input.Keyboard.RefreshModifiers(args);
        var handled = false;
        if (this._FocusedNode) {
            var focusToRoot = Surface._ElementPathToRoot(this._FocusedNode);
            handled = this._EmitKeyDown(focusToRoot, args);
        }

        if (!handled && args.Key === Fayde.Input.Key.Tab) {
            if (this._FocusedNode)
                Fayde.TabNavigationWalker.Focus(this._FocusedNode, args.Shift);
            else
                this._EnsureElementFocused();
        }
        this._SetUserInitiatedEvent(false);
        return handled;
    }
    private _EmitKeyDown(list: Fayde.UINode[], args, endIndex?: number) {
        if (endIndex === 0)
            return;
        if (!endIndex || endIndex === -1)
            endIndex = list.length;

        var i = 0;
        var cur = list.shift();
        while (cur && i < endIndex) {
            cur._EmitKeyDown(args);
            cur = list.shift();
            i++;
        }
        return args.Handled;
    }

    private _HandleButtonPress(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var button = evt.which ? evt.which : evt.button;
        var pos = this._GetMousePosition(evt);

        this._SetUserInitiatedEvent(true);
        this._HandleMouseEvent("down", button, pos);
        this._UpdateCursorFromInputList();
        this._SetUserInitiatedEvent(false);
    }
    private _HandleButtonRelease(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var button = evt.which ? evt.which : evt.button;
        var pos = this._GetMousePosition(evt);

        this._SetUserInitiatedEvent(true);
        this._HandleMouseEvent("up", button, pos);
        this._UpdateCursorFromInputList();
        this._SetUserInitiatedEvent(false);
        if (this._Captured)
            this._PerformReleaseCapture();
    }
    private _HandleOut(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var pos = this._GetMousePosition(evt);
        this._HandleMouseEvent("out", null, pos);
    }
    private _HandleMove(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var pos = this._GetMousePosition(evt);
        this._HandleMouseEvent("move", null, pos);
        this._UpdateCursorFromInputList();
    }
    private _HandleWheel(evt) {
        Fayde.Input.Keyboard.RefreshModifiers(evt);
        var delta = 0;
        if (evt.wheelDelta)
            delta = evt.wheelDelta / 120;
        else if (evt.detail)
            delta = -evt.detail / 3;
        if (evt.preventDefault)
            evt.preventDefault();
        evt.returnValue = false;
        this._HandleMouseEvent("wheel", null, this._GetMousePosition(evt), delta);
        this._UpdateCursorFromInputList();
    }
    private _HandleMouseEvent(type: string, button: number, pos: Point, delta?: number, emitLeave?: bool, emitEnter?: bool) {
        //var app = this._App;
        //app._NotifyDebugCoordinates(pos);
        this._CurrentPos = pos;
        if (this._EmittingMouseEvent)
            return false;
        if (this._TopLevel == null)
            return false;

        this._EmittingMouseEvent = true;
        if (this._Captured) {
            this._EmitMouseList(type, button, pos, delta, this._InputList);
        } else {
            this.ProcessDirtyElements();
            var ctx = new Fayde.RenderContext(this);
            var newInputList: Fayde.UINode[] = [];
            var layers = this._Layers;
            var layerCount = layers.length;

            //var startTime = new Date().getTime();
            for (var i = layerCount - 1; i >= 0 && newInputList.length === 0; i--) {
                var layer = layers[i];
                layer._HitTestPoint(ctx, pos, newInputList);
            }

            var indices = { Index1: -1, Index2: -1 };
            this._FindFirstCommonElement(this._InputList, newInputList, indices);
            if (emitLeave === undefined || emitLeave === true)
                this._EmitMouseList("leave", button, pos, delta, this._InputList, indices.Index1);
            if (emitEnter === undefined || emitEnter === true)
                this._EmitMouseList("enter", button, pos, delta, newInputList, indices.Index2);
            if (type !== "noop")
                this._EmitMouseList(type, button, pos, delta, newInputList);

            //app._NotifyDebugHitTest(newInputList, new Date().getTime() - startTime);
            this._InputList = newInputList;
        }

        if (this._PendingCapture)
            this._PerformCapture(this._PendingCapture);
        if (this._PendingReleaseCapture || (this._Captured && !this._Captured.CanCaptureMouse()))
            this._PerformReleaseCapture();
        this._EmittingMouseEvent = false;
    }
    private _GetMousePosition(evt): Point {
        return new Point(
            evt.clientX + window.pageXOffset + this._CanvasOffset.left,
            evt.clientY + window.pageYOffset + this._CanvasOffset.top);
    }

    private _FindFirstCommonElement(list1: Fayde.UINode[], list2: Fayde.UINode[], outObj) {
        var len1 = list1.length;
        var len2 = list2.length;

        outObj.Index1 = -1;
        outObj.Index2 = -1;
        var i = 0;
        var j = 0;
        for (i = 0; i < len1 && j < len2; i++, j++) {
            var n1 = list1[i];
            var n2 = list2[i];
            if (n1 !== n2)
                return;
            outObj.Index1 = i;
            outObj.Index2 = j;
        }
    }
    private _EmitMouseList(type: string, button: number, pos: Point, delta: number, list: Fayde.UINode[], endIndex?: number) {
        var handled = false;
        if (endIndex === 0)
            return handled;
        if (!endIndex || endIndex === -1)
            endIndex = list.length;
        var args = this._CreateEventArgs(type, pos, delta);
        var node = list[0];
        if (node && args instanceof Fayde.RoutedEventArgs)
            args.Source = node.XObject;
        var isL = Surface.IsLeftButton(button);
        var isR = Surface.IsRightButton(button);
        for (var i = 0; i < endIndex; i++) {
            node = list[i];
            if (type === "leave")
                args.Source = node.XObject;
            if (node._EmitMouseEvent(type, isL, isR, args))
                handled = true;
            if (type === "leave") //MouseLeave gets new event args on each emit
                args = this._CreateEventArgs(type, pos, delta);
        }
        return handled;
    }
    private _CreateEventArgs(type: string, pos: Point, delta: number): Fayde.Input.MouseEventArgs {
        if (type === "up") {
            return new Fayde.Input.MouseButtonEventArgs(pos);
        } else if (type === "down") {
            return new Fayde.Input.MouseButtonEventArgs(pos);
        } else if (type === "leave") {
            return new Fayde.Input.MouseEventArgs(pos);
        } else if (type === "enter") {
            return new Fayde.Input.MouseEventArgs(pos);
        } else if (type === "move") {
            return new Fayde.Input.MouseEventArgs(pos);
        } else if (type === "wheel") {
            return new Fayde.Input.MouseWheelEventArgs(pos, delta);
        }
    }

    SetMouseCapture(uin: Fayde.UINode) {
        if (this._Captured || this._PendingCapture)
            return uin === this._Captured || uin === this._PendingCapture;
        if (!this._EmittingMouseEvent)
            return false;
        this._PendingCapture = uin;
        return true;
    }
    ReleaseMouseCapture(uin: Fayde.UINode) {
        if (uin !== this._Captured && uin !== this._PendingCapture)
            return;
        if (this._EmittingMouseEvent)
            this._PendingReleaseCapture = true;
        else
            this._PerformReleaseCapture();
    }
    private _PerformCapture(uin: Fayde.UINode) {
        this._Captured = uin;
        var newInputList = [];
        while (uin != null) {
            newInputList.push(uin);
            uin = uin.VisualParentNode;
        }
        this._InputList = newInputList;
        this._PendingCapture = null;
    }
    private _PerformReleaseCapture() {
        var oldCaptured = this._Captured;
        this._Captured = null;
        this._PendingReleaseCapture = false;
        oldCaptured._EmitLostMouseCapture(this._CurrentPos);
        //force "MouseEnter" on any new elements
        this._HandleMouseEvent("noop", null, this._CurrentPos, undefined, false, true);
    }
    private _SetUserInitiatedEvent(val: bool) {
        this._EmitFocusChangeEvents();
        this._FirstUserInitiatedEvent = this._FirstUserInitiatedEvent || val;
        this._UserInitiatedEvent = val;
    }

    // FOCUS
    Focus(ctrl: Fayde.Controls.Control, recurse?: bool): bool {
        recurse = recurse === undefined || recurse === true;
        if (!ctrl.XamlNode.IsAttached)
            return false;

        var surface = App.Instance.MainSurface;
        var walker = Fayde.DeepTreeWalker(ctrl);
        var uin: Fayde.UINode;
        while (uin = walker.Step()) {
            if (uin.XObject.Visibility !== Fayde.Visibility.Visible) {
                walker.SkipBranch();
                continue;
            }

            if (!(uin instanceof Fayde.Controls.ControlNode))
                continue;

            var cn = <Fayde.Controls.ControlNode>uin;
            var c = cn.XObject;
            if (!c.IsEnabled) {
                if (!recurse)
                    return false;
                walker.SkipBranch();
                continue;
            }

            var loaded = false;
            for (var check = <Fayde.UINode>ctrl.XamlNode; !loaded && check != null; check = check.VisualParentNode)
                loaded = loaded || check.IsLoaded;

            if (loaded && cn.LayoutUpdater.GetRenderVisible() && c.IsTabStop)
                return this._FocusNode(cn);

            if (!recurse)
                return false;
        }
        return false;
    }
    private _FocusNode(uin?: Fayde.UINode) {
        if (uin === this._FocusedNode)
            return true;
        var fn = this._FocusedNode;
        if (fn) {
            this._FocusChangedEvents.push({
                LostFocus: Surface._ElementPathToRoot(fn),
                GotFocus: null
            });
        }
        this._FocusedNode = uin;
        if (uin) {
            this._FocusChangedEvents.push({
                LostFocus: null,
                GotFocus: Surface._ElementPathToRoot(uin)
            });
        }

        if (this._FirstUserInitiatedEvent)
            this._EmitFocusChangeEventsAsync();

        return true;
    }
    private _EnsureElementFocused() {
        var layers = this._Layers;
        if (!this._FocusedNode) {
            var last = layers.length - 1;
            for (var i = last; i >= 0; i--) {
                if (Fayde.TabNavigationWalker.Focus(layers[i]))
                    break;
            }
            if (!this._FocusedNode && last !== -1)
                this._FocusNode(layers[last]);
        }
        if (this._FirstUserInitiatedEvent)
            this._EmitFocusChangeEventsAsync();
    }
    private _RemoveFocusFrom(lu: Fayde.LayoutUpdater) {
        if (this._FocusedNode === lu.Node)
            this._FocusNode(null);
    }
    private _EmitFocusChangeEventsAsync() {
        setTimeout(() => this._EmitFocusChangeEvents(), 1);
    }
    private _EmitFocusChangeEvents() {
        var evts = this._FocusChangedEvents;
        var cur = evts.shift();
        while (cur) {
            this._EmitFocusList("lost", cur.LostFocus);
            this._EmitFocusList("got", cur.GotFocus);
            cur = evts.shift();
        }
    }
    private _EmitFocusList(type: string, list: Fayde.UINode[]) {
        if (!list)
            return;
        var cur = list.shift();
        while (cur) {
            cur._EmitFocusChange(type);
            cur = list.shift();
        }
    }

    private static _ElementPathToRoot(source: Fayde.UINode): Fayde.UINode[] {
        var list: Fayde.UINode[] = [];
        while (source) {
            list.push(source);
            source = source.VisualParentNode;
        }
        return list;
    }
    private static IsLeftButton(button: number): bool {
        return button === 1;
    }
    private static IsRightButton(button: number): bool {
        return button === 2;
    }
}