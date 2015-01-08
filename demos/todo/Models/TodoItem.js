var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var MVVM = Fayde.MVVM;
    var TodoItem = (function (_super) {
        __extends(TodoItem, _super);
        function TodoItem() {
            _super.apply(this, arguments);
            this.Text = "";
            this.IsComplete = false;
        }
        TodoItem.prototype.ToggleComplete = function (e) {
            this.IsComplete = !this.IsComplete;
        };
        return TodoItem;
    })(MVVM.ObservableObject);
    MVVM.NotifyProperties(TodoItem, ["Text", "IsComplete"]);
    return TodoItem;
});
//# sourceMappingURL=TodoItem.js.map