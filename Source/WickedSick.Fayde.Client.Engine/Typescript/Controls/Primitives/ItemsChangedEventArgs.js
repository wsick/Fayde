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
                    this.Action = action;
                    this.ItemCount = itemCount;
                    this.ItemUICount = itemUICount;
                    this.OldPosition = oldPosition;
                    this.Position = position;
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
