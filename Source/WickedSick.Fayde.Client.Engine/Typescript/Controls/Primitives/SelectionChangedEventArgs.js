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
        (function (Primitives) {
            var SelectionChangedEventArgs = (function (_super) {
                __extends(SelectionChangedEventArgs, _super);
                function SelectionChangedEventArgs(oldValues, newValues) {
                                _super.call(this);
                    this._OldValues = oldValues.slice(0);
                    this._NewValues = newValues.slice(0);
                }
                Object.defineProperty(SelectionChangedEventArgs.prototype, "OldValues", {
                    get: function () {
                        return this._OldValues;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectionChangedEventArgs.prototype, "NewValues", {
                    get: function () {
                        return this._NewValues;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SelectionChangedEventArgs;
            })(EventArgs);
            Primitives.SelectionChangedEventArgs = SelectionChangedEventArgs;            
            Nullstone.RegisterType(SelectionChangedEventArgs, "SelectionChangedEventArgs");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=SelectionChangedEventArgs.js.map
