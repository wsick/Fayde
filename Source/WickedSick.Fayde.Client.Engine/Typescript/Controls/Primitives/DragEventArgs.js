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
                    Object.defineProperty(this, "HorizontalChange", {
                        value: horizontal,
                        writable: false
                    });
                    Object.defineProperty(this, "VerticalChange", {
                        value: vertical,
                        writable: false
                    });
                    Object.defineProperty(this, "Canceled", {
                        value: canceled,
                        writable: false
                    });
                }
                return DragCompletedEventArgs;
            })(Fayde.RoutedEventArgs);
            Primitives.DragCompletedEventArgs = DragCompletedEventArgs;            
            Nullstone.RegisterType(DragCompletedEventArgs, "DragCompletedEventArgs");
            var DragDeltaEventArgs = (function (_super) {
                __extends(DragDeltaEventArgs, _super);
                function DragDeltaEventArgs(horizontal, vertical) {
                                _super.call(this);
                    Object.defineProperty(this, "HorizontalChange", {
                        value: horizontal,
                        writable: false
                    });
                    Object.defineProperty(this, "VerticalChange", {
                        value: vertical,
                        writable: false
                    });
                }
                return DragDeltaEventArgs;
            })(Fayde.RoutedEventArgs);
            Primitives.DragDeltaEventArgs = DragDeltaEventArgs;            
            Nullstone.RegisterType(DragDeltaEventArgs, "DragDeltaEventArgs");
            var DragStartedEventArgs = (function (_super) {
                __extends(DragStartedEventArgs, _super);
                function DragStartedEventArgs(horizontal, vertical) {
                                _super.call(this);
                    Object.defineProperty(this, "HorizontalOffset", {
                        value: horizontal,
                        writable: false
                    });
                    Object.defineProperty(this, "VerticalOffset", {
                        value: vertical,
                        writable: false
                    });
                }
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
