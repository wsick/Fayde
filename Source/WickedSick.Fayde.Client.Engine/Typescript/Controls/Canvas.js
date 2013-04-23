var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Panel.ts" />
    /// CODE
    (function (Controls) {
        var Canvas = (function (_super) {
            __extends(Canvas, _super);
            function Canvas() {
                _super.apply(this, arguments);

            }
            return Canvas;
        })(Controls.Panel);
        Controls.Canvas = Canvas;        
        Nullstone.RegisterType(Canvas, "Canvas");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Canvas.js.map
