/// <reference path="Interfaces.ts" />
/// CODE
/// <reference path="Surface.ts" />

module Fayde {
    export class RenderContext implements IRenderContext {
        Surface: Surface;
        constructor(surface: Surface) {
            this.Surface = surface;
        }
    }
}