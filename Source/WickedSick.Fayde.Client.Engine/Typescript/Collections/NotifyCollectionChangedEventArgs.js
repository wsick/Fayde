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

            }
            NotifyCollectionChangedEventArgs.Reset = function Reset() {
                var args = new NotifyCollectionChangedEventArgs();
                Object.defineProperty(args, "Action", {
                    value: NotifyCollectionChangedAction.Reset,
                    writable: false
                });
                Object.defineProperty(args, "OldStartingIndex", {
                    value: -1,
                    writable: false
                });
                Object.defineProperty(args, "NewStartingIndex", {
                    value: -1,
                    writable: false
                });
                Object.defineProperty(args, "OldItems", {
                    value: null,
                    writable: false
                });
                Object.defineProperty(args, "NewItems", {
                    value: null,
                    writable: false
                });
                return args;
            };
            NotifyCollectionChangedEventArgs.Replace = function Replace(newValue, oldValue, index) {
                var args = new NotifyCollectionChangedEventArgs();
                Object.defineProperty(args, "Action", {
                    value: NotifyCollectionChangedAction.Replace,
                    writable: false
                });
                Object.defineProperty(args, "OldStartingIndex", {
                    value: -1,
                    writable: false
                });
                Object.defineProperty(args, "NewStartingIndex", {
                    value: index,
                    writable: false
                });
                Object.defineProperty(args, "OldItems", {
                    value: [
                        oldValue
                    ],
                    writable: false
                });
                Object.defineProperty(args, "NewItems", {
                    value: [
                        newValue
                    ],
                    writable: false
                });
                return args;
            };
            NotifyCollectionChangedEventArgs.Add = function Add(newValue, index) {
                var args = new NotifyCollectionChangedEventArgs();
                Object.defineProperty(args, "Action", {
                    value: NotifyCollectionChangedAction.Add,
                    writable: false
                });
                Object.defineProperty(args, "OldStartingIndex", {
                    value: -1,
                    writable: false
                });
                Object.defineProperty(args, "NewStartingIndex", {
                    value: index,
                    writable: false
                });
                Object.defineProperty(args, "OldItems", {
                    value: null,
                    writable: false
                });
                Object.defineProperty(args, "NewItems", {
                    value: [
                        newValue
                    ],
                    writable: false
                });
                return args;
            };
            NotifyCollectionChangedEventArgs.AddRange = function AddRange(newValues, index) {
                var args = new NotifyCollectionChangedEventArgs();
                Object.defineProperty(args, "Action", {
                    value: NotifyCollectionChangedAction.Add,
                    writable: false
                });
                Object.defineProperty(args, "OldStartingIndex", {
                    value: -1,
                    writable: false
                });
                Object.defineProperty(args, "NewStartingIndex", {
                    value: index,
                    writable: false
                });
                Object.defineProperty(args, "OldItems", {
                    value: null,
                    writable: false
                });
                Object.defineProperty(args, "NewItems", {
                    value: newValues,
                    writable: false
                });
                return args;
            };
            NotifyCollectionChangedEventArgs.Remove = function Remove(oldValue, index) {
                var args = new NotifyCollectionChangedEventArgs();
                Object.defineProperty(args, "Action", {
                    value: NotifyCollectionChangedAction.Remove,
                    writable: false
                });
                Object.defineProperty(args, "OldStartingIndex", {
                    value: index,
                    writable: false
                });
                Object.defineProperty(args, "NewStartingIndex", {
                    value: -1,
                    writable: false
                });
                Object.defineProperty(args, "OldItems", {
                    value: [
                        oldValue
                    ],
                    writable: false
                });
                Object.defineProperty(args, "NewItems", {
                    value: null,
                    writable: false
                });
                return args;
            };
            return NotifyCollectionChangedEventArgs;
        })(EventArgs);
        Collections.NotifyCollectionChangedEventArgs = NotifyCollectionChangedEventArgs;        
    })(Fayde.Collections || (Fayde.Collections = {}));
    var Collections = Fayde.Collections;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=NotifyCollectionChangedEventArgs.js.map
