var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var MVVM = Fayde.MVVM;
    var FilteredCollection = Fayde.Collections.FilteredCollection;
    var FilterObject = (function (_super) {
        __extends(FilterObject, _super);
        function FilterObject(source) {
            var _this = this;
            _super.call(this);
            this.IsAll = true;
            this.IsActive = false;
            this.IsCompleted = false;
            var items = new FilteredCollection(function (item) { return _this.FilterItem(item); }, source);
            Object.defineProperty(this, "Items", { value: items, writable: false });
        }
        FilterObject.prototype.FilterItem = function (item) {
            if (this.IsActive)
                return !item.IsComplete;
            if (this.IsCompleted)
                return item.IsComplete;
            return true;
        };
        FilterObject.prototype.OnPropertyChanged = function (propertyName) {
            _super.prototype.OnPropertyChanged.call(this, propertyName);
            if (this.Items)
                this.Items.Update();
        };
        return FilterObject;
    })(MVVM.ObservableObject);
    MVVM.NotifyProperties(FilterObject, ["IsAll", "IsActive", "IsCompleted"]);
    return FilterObject;
});
//# sourceMappingURL=FilterObject.js.map