/// <reference path="Interfaces.ts" />
/// CODE
/// <reference path="Surface.ts" />

module Fayde {
    export class RenderContext implements IRenderContext {
        Surface: Surface;
        CanvasContext: CanvasRenderingContext2D;
        constructor(surface: Surface) {
            this.Surface = surface;
        }
        Clear(r: rect) {
            //TODO: Implement
        }
        Clip(r: rect) {
            //TODO: Implement
        }
        DoRender(layers: Fayde.UINode[], r: rect) {
            this.Clear(r);
            this.CanvasContext.save();
            this.Clip(r);
            if (layers) {
                var len = layers.length;
                for (var i = 0; i < len; i++) {
                    layers[i].LayoutUpdater.DoRender(this, r);
                }
            }
            this.CanvasContext.restore();
        }
    }
}