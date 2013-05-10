var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../../Runtime/EventArgs.ts" />
        /// CODE
        /// <reference path="../../Collections/NotifyCollectionChangedEventArgs.ts" />
        /// <reference path="../ItemContainerGenerator.ts" />
        (function (Primitives) {
            var ItemsChangedEventArgs = (function (_super) {
                __extends(ItemsChangedEventArgs, _super);
                function ItemsChangedEventArgs(action, itemCount, itemUICount, oldPosition, position) {
                                _super.call(this);
                    Object.defineProperty(this, "Action", {
                        value: action,
                        writable: false
                    });
                    Object.defineProperty(this, "ItemCount", {
                        value: itemCount,
                        writable: false
                    });
                    Object.defineProperty(this, "ItemUICount", {
                        value: itemUICount,
                        writable: false
                    });
                    Object.defineProperty(this, "OldPosition", {
                        value: oldPosition,
                        writable: false
                    });
                    Object.defineProperty(this, "Position", {
                        value: position,
                        writable: false
                    });
                }
                return ItemsChangedEventArgs;
            })(EventArgs);
            Primitives.ItemsChangedEventArgs = ItemsChangedEventArgs;            
            Nullstone.RegisterType(ItemsChangedEventArgs, "ItemsChangedEventArgs");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemsChangedEventArgs.js.map
