var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    (function (Controls) {
        var MENode = (function (_super) {
            __extends(MENode, _super);
            function MENode(xobj) {
                        _super.call(this, xobj);
            }
            MENode.prototype._InsideObject = function (ctx, lu, x, y) {
                //TODO: Implement
                return false;
            };
            return MENode;
        })(Fayde.FENode);
        Controls.MENode = MENode;        
        Nullstone.RegisterType(MENode, "MENode");
        var MediaElement = (function (_super) {
            __extends(MediaElement, _super);
            function MediaElement() {
                _super.apply(this, arguments);

            }
            MediaElement.prototype.CreateNode = function () {
                return new MENode(this);
            };
            return MediaElement;
        })(Fayde.FrameworkElement);
        Controls.MediaElement = MediaElement;        
        Nullstone.RegisterType(MediaElement, "MediaElement");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=MediaElement.js.map
