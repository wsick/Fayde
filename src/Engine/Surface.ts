/// <reference path="../Runtime/TypeManagement.ts" />

var resizeTimeout: number;

module Fayde {
    export class Surface extends minerva.engine.Surface {
        static TestCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");

        App: Application;
        private $$root: UIElement = null;
        private $$inputMgr: Engine.InputManager;

        HitTestCallback: (inputList: Fayde.UINode[]) => void;

        constructor (app: Application) {
            super();
            Object.defineProperty(this, "App", { value: app, writable: false });
            this.$$inputMgr = new Engine.InputManager(this);
        }

        init (canvas: HTMLCanvasElement) {
            super.init(canvas);

            this.$$stretchCanvas();
            document.body.onresize = (e) => this.$$handleResize(window.event ? <any>window.event : e);
            window.onresize = (e) => this.$$handleResize(window.event ? <any>window.event : e);

            this.$$inputMgr.Register(canvas);
        }

        Attach (uie: UIElement, root?: boolean) {
            if (root === true) {
                if (!(uie instanceof UIElement))
                    throw new Exception("Unsupported top level element.");
                if (this.$$root)
                    this.detachLayer(this.$$root.XamlNode.LayoutUpdater);
                this.$$root = uie;
            }
            this.attachLayer(uie.XamlNode.LayoutUpdater, root);
        }

        Detach (uie: UIElement) {
            this.detachLayer(uie.XamlNode.LayoutUpdater);
        }

        Focus (node: Controls.ControlNode, recurse?: boolean): boolean {
            return this.$$inputMgr.Focus(node, recurse);
        }

        static HasFocus (uie: UIElement): boolean {
            var uin = uie.XamlNode;
            var surface = <Surface>uin.LayoutUpdater.tree.surface;
            if (!surface)
                return false;
            var curNode = surface.$$inputMgr.FocusedNode;
            while (curNode) {
                if (curNode === uin)
                    return true;
                curNode = curNode.VisualParentNode;
            }
            return false;
        }

        static Focus(uie: Controls.Control, recurse?: boolean): boolean {
            var uin = uie.XamlNode;
            var surface = <Surface>uin.LayoutUpdater.tree.surface;
            if (!surface)
                return false;
            return surface.$$inputMgr.Focus(uin, recurse);
        }

        static GetFocusedElement (uie: UIElement): UIElement {
            var uin = uie.XamlNode;
            var surface = <Surface>uin.LayoutUpdater.tree.surface;
            if (!surface)
                return null;
            var curNode = surface.$$inputMgr.FocusedNode;
            return curNode.XObject;
        }

        static RemoveFocusFrom (uie: UIElement): boolean {
            var node = uie.XamlNode;
            var surface = <Surface>node.LayoutUpdater.tree.surface;
            if (!surface)
                return false;
            surface.$$inputMgr.OnNodeDetached(node);
            return true;
        }

        HitTestPoint (pos: Point): UINode[] {
            return [];
            /*
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
             */
        }

        static SetMouseCapture (uin: Fayde.UINode): boolean {
            var surface = <Surface>uin.LayoutUpdater.tree.surface;
            if (!surface)
                return false;
            return surface.$$inputMgr.SetMouseCapture(uin);
        }

        static ReleaseMouseCapture (uin: Fayde.UINode) {
            var surface = <Surface>uin.LayoutUpdater.tree.surface;
            if (!surface)
                return;
            surface.$$inputMgr.ReleaseMouseCapture(uin);
        }

        static MeasureWidth (text: string, font: Font): number {
            var ctx = Surface.TestCanvas.getContext("2d");
            ctx.font = font.ToHtml5Object();
            return ctx.measureText(text).width;
        }

        private $$handleResize (evt) {
            if (resizeTimeout)
                clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.$$stretchCanvas();
                resizeTimeout = null;
            }, 15);
        }

        private $$stretchCanvas () {
            this.resize(window.innerWidth, window.innerHeight);
        }
    }
}