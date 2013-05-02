var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/EventArgs.ts" />
    /// CODE
    (function (Collections) {
        (function (NotifyCollectionChangedAction) {
            NotifyCollectionChangedAction._map = [];
            NotifyCollectionChangedAction.Add = 1;
            NotifyCollectionChangedAction.Remove = 2;
            NotifyCollectionChangedAction.Replace = 3;
            NotifyCollectionChangedAction.Reset = 4;
        })(Collections.NotifyCollectionChangedAction || (Collections.NotifyCollectionChangedAction = {}));
        var NotifyCollectionChangedAction = Collections.NotifyCollectionChangedAction;
        var NotifyCollectionChangedEventArgs = (function (_super) {
            __extends(NotifyCollectionChangedEventArgs, _super);
            function NotifyCollectionChangedEventArgs() {
                _super.apply(this, arguments);

                this._OldStartingIndex = -1;
                this._NewStartingIndex = -1;
                this._OldItems = null;
                this._NewItems = null;
            }
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "Action", {
                get: function () {
                    return this._Action;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "OldStartingIndex", {
                get: function () {
                    return this._OldStartingIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "NewStartingIndex", {
                get: function () {
                    return this._NewStartingIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "OldItems", {
                get: function () {
                    return this._OldItems;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "NewItems", {
                get: function () {
                    return this._NewItems;
                },
                enumerable: true,
                configurable: true
            });
            NotifyCollectionChangedEventArgs.Reset = function Reset() {
                var args = new NotifyCollectionChangedEventArgs();
                args._Action = NotifyCollectionChangedAction.Reset;
                return args;
            };
            NotifyCollectionChangedEventArgs.Replace = function Replace(newValue, oldValue, index) {
                var args = new NotifyCollectionChangedEventArgs();
                args._Action = NotifyCollectionChangedAction.Replace;
                args._NewItems = [
                    newValue
                ];
                args._OldItems = [
                    oldValue
                ];
                args._NewStartingIndex = index;
                return args;
            };
            NotifyCollectionChangedEventArgs.Add = function Add(newValue, index) {
                var args = new NotifyCollectionChangedEventArgs();
                args._Action = NotifyCollectionChangedAction.Add;
                args._NewItems = [
                    newValue
                ];
                args._NewStartingIndex = index;
                return args;
            };
            NotifyCollectionChangedEventArgs.AddRange = function AddRange(newValues, index) {
                var args = new NotifyCollectionChangedEventArgs();
                args._Action = NotifyCollectionChangedAction.Add;
                args._NewItems = newValues;
                args._NewStartingIndex = index;
                return args;
            };
            NotifyCollectionChangedEventArgs.Remove = function Remove(oldValue, index) {
                var args = new NotifyCollectionChangedEventArgs();
                args._Action = NotifyCollectionChangedAction.Remove;
                args._OldItems = [
                    oldValue
                ];
                args._OldStartingIndex = index;
                return args;
            };
            return NotifyCollectionChangedEventArgs;
        })(EventArgs);
        Collections.NotifyCollectionChangedEventArgs = NotifyCollectionChangedEventArgs;        
    })(Fayde.Collections || (Fayde.Collections = {}));
    var Collections = Fayde.Collections;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=NotifyCollectionChangedEventArgs.js.map
