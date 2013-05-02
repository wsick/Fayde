var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../../Core/RoutedEventArgs.ts" />
        /// CODE
        (function (Primitives) {
            var DragCompletedEventArgs = (function (_super) {
                __extends(DragCompletedEventArgs, _super);
                function DragCompletedEventArgs(horizontal, vertical, canceled) {
                                _super.call(this);
                    this._HorizontalChange = horizontal;
                    this._VerticalChange = vertical;
                    this._Canceled = canceled;
                }
                Object.defineProperty(DragCompletedEventArgs.prototype, "HorizontalChange", {
                    get: function () {
                        return this._HorizontalChange;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DragCompletedEventArgs.prototype, "VerticalChange", {
                    get: function () {
                        return this._VerticalChange;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DragCompletedEventArgs.prototype, "Canceled", {
                    get: function () {
                        return this._Canceled;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DragCompletedEventArgs;
            })(Fayde.RoutedEventArgs);
            Primitives.DragCompletedEventArgs = DragCompletedEventArgs;            
            Nullstone.RegisterType(DragCompletedEventArgs, "DragCompletedEventArgs");
            var DragDeltaEventArgs = (function (_super) {
                __extends(DragDeltaEventArgs, _super);
                function DragDeltaEventArgs(horizontal, vertical) {
                                _super.call(this);
                    this._HorizontalChange = horizontal;
                    this._VerticalChange = vertical;
                }
                Object.defineProperty(DragDeltaEventArgs.prototype, "HorizontalChange", {
                    get: function () {
                        return this._HorizontalChange;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DragDeltaEventArgs.prototype, "VerticalChange", {
                    get: function () {
                        return this._VerticalChange;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DragDeltaEventArgs;
            })(Fayde.RoutedEventArgs);
            Primitives.DragDeltaEventArgs = DragDeltaEventArgs;            
            Nullstone.RegisterType(DragDeltaEventArgs, "DragDeltaEventArgs");
            var DragStartedEventArgs = (function (_super) {
                __extends(DragStartedEventArgs, _super);
                function DragStartedEventArgs(horizontal, vertical) {
                                _super.call(this);
                    this._HorizontalOffset = horizontal;
                    this._VerticalOffset = vertical;
                }
                Object.defineProperty(DragStartedEventArgs.prototype, "HorizontalOffset", {
                    get: function () {
                        return this._HorizontalOffset;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DragStartedEventArgs.prototype, "VerticalOffset", {
                    get: function () {
                        return this._VerticalOffset;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DragStartedEventArgs;
            })(Fayde.RoutedEventArgs);
            Primitives.DragStartedEventArgs = DragStartedEventArgs;            
            Nullstone.RegisterType(DragStartedEventArgs, "DragStartedEventArgs");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DragEventArgs.js.map
