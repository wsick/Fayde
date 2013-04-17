/// <reference path="Interfaces.ts" />
/// CODE
/// <reference path="Surface.ts" />
var Fayde;
(function (Fayde) {
    var RenderContext = (function () {
        function RenderContext(surface) {
            this.Surface = surface;
        }
        return RenderContext;
    })();
    Fayde.RenderContext = RenderContext;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RenderContext.js.map
