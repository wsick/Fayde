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
            (function (ScrollEventType) {
                ScrollEventType._map = [];
                ScrollEventType.SmallDecrement = 0;
                ScrollEventType.SmallIncrement = 1;
                ScrollEventType.LargeDecrement = 2;
                ScrollEventType.LargeIncrement = 3;
                ScrollEventType.ThumbPosition = 4;
                ScrollEventType.ThumbTrack = 5;
                ScrollEventType.First = 6;
                ScrollEventType.Last = 7;
                ScrollEventType.EndScroll = 8;
            })(Primitives.ScrollEventType || (Primitives.ScrollEventType = {}));
            var ScrollEventType = Primitives.ScrollEventType;
            var ScrollEventArgs = (function (_super) {
                __extends(ScrollEventArgs, _super);
                function ScrollEventArgs(scrollEventType, value) {
                                _super.call(this);
                    this._ScrollEventType = scrollEventType;
                    this._Value = value;
                }
                Object.defineProperty(ScrollEventArgs.prototype, "ScrollEventType", {
                    get: function () {
                        return this._ScrollEventType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ScrollEventArgs.prototype, "Value", {
                    get: function () {
                        return this._Value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ScrollEventArgs;
            })(Fayde.RoutedEventArgs);
            Primitives.ScrollEventArgs = ScrollEventArgs;            
            Nullstone.RegisterType(ScrollEventArgs, "ScrollEventArgs");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ScrollEventArgs.js.map
