var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../../Core/FrameworkElement.ts" />
        /// CODE
        (function (Primitives) {
            var PopupNode = (function (_super) {
                __extends(PopupNode, _super);
                function PopupNode() {
                    _super.apply(this, arguments);

                }
                PopupNode.prototype.GetInheritedWalker = function () {
                    var popup = (this.XObject);
                    if(!popup) {
                        return;
                    }
                    var index = -1;
                    return {
                        MoveNext: function () {
                            index++;
                            return index === 0;
                        },
                        Current: popup.Child
                    };
                };
                return PopupNode;
            })(Fayde.FENode);
            Primitives.PopupNode = PopupNode;            
            Nullstone.RegisterType(PopupNode, "PopupNode");
            var Popup = (function (_super) {
                __extends(Popup, _super);
                function Popup() {
                    _super.apply(this, arguments);

                }
                Popup.prototype.CreateNode = function () {
                    return new PopupNode(this);
                };
                return Popup;
            })(Fayde.FrameworkElement);
            Primitives.Popup = Popup;            
            Nullstone.RegisterType(Popup, "Popup");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Popup.js.map
