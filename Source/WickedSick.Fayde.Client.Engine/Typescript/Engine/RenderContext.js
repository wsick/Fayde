/// <reference path="Interfaces.ts" />
/// CODE
/// <reference path="Surface.ts" />
var Fayde;
(function (Fayde) {
    var RenderContext = (function () {
        function RenderContext(surface) {
            this.Surface = surface;
        }
        RenderContext.prototype.Clear = function (r) {
            //TODO: Implement
                    };
        RenderContext.prototype.Clip = function (r) {
            //TODO: Implement
                    };
        RenderContext.prototype.DoRender = function (layers, r) {
            this.Clear(r);
            this.CanvasContext.save();
            this.Clip(r);
            if(layers) {
                var len = layers.length;
                for(var i = 0; i < len; i++) {
                    layers[i].LayoutUpdater.DoRender(this, r);
                }
            }
            this.CanvasContext.restore();
        };
        return RenderContext;
    })();
    Fayde.RenderContext = RenderContext;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RenderContext.js.map
