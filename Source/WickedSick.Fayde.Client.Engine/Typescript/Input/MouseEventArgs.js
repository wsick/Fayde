var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/RoutedEventArgs.ts" />
    /// CODE
    /// <reference path="../Primitives/Point.ts" />
    /// <reference path="../Core/UIElement.ts" />
    (function (Input) {
        var MouseEventArgs = (function (_super) {
            __extends(MouseEventArgs, _super);
            function MouseEventArgs(absolutePos) {
                        _super.call(this);
                this._AbsolutePos = absolutePos;
            }
            MouseEventArgs.prototype.GetPosition = function (relativeTo) {
                //TODO: Implement
                return new Point();
            };
            return MouseEventArgs;
        })(Fayde.RoutedEventArgs);
        Input.MouseEventArgs = MouseEventArgs;        
        Nullstone.RegisterType(MouseEventArgs, "MouseEventArgs");
        var MouseButtonEventArgs = (function (_super) {
            __extends(MouseButtonEventArgs, _super);
            function MouseButtonEventArgs(absolutePos) {
                        _super.call(this, absolutePos);
            }
            return MouseButtonEventArgs;
        })(MouseEventArgs);
        Input.MouseButtonEventArgs = MouseButtonEventArgs;        
        Nullstone.RegisterType(MouseButtonEventArgs, "MouseButtonEventArgs");
        var MouseWheelEventArgs = (function (_super) {
            __extends(MouseWheelEventArgs, _super);
            function MouseWheelEventArgs(absolutePos, delta) {
                        _super.call(this, absolutePos);
                this.Delta = delta;
            }
            return MouseWheelEventArgs;
        })(MouseEventArgs);
        Input.MouseWheelEventArgs = MouseWheelEventArgs;        
        Nullstone.RegisterType(MouseWheelEventArgs, "MouseWheelEventArgs");
    })(Fayde.Input || (Fayde.Input = {}));
    var Input = Fayde.Input;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=MouseEventArgs.js.map
