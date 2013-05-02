var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../ItemsControl.ts" />
        /// CODE
        /// <reference path="../ListBoxItem.ts" />
        (function (Primitives) {
            var Selector = (function (_super) {
                __extends(Selector, _super);
                function Selector() {
                    _super.apply(this, arguments);

                }
                Selector.prototype.NotifyListItemClicked = function (lbi) {
                    //TODO: Implement
                                    };
                Selector.prototype.NotifyListItemGotFocus = function (lbi) {
                };
                Selector.prototype.NotifyListItemLostFocus = function (lbi) {
                };
                return Selector;
            })(Controls.ItemsControl);
            Primitives.Selector = Selector;            
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Selector.js.map
