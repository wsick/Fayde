var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Models/TodoItem", "../ViewModels/FilterObject"], function (require, exports, TodoItem, FilterObject) {
    var MVVM = Fayde.MVVM;
    var DeepObservableCollection = Fayde.Collections.DeepObservableCollection;
    var MainViewModel = (function (_super) {
        __extends(MainViewModel, _super);
        function MainViewModel() {
            _super.call(this);
            this.Items = new DeepObservableCollection();
            this.ActiveText = "";
            Object.defineProperty(this, "Filter", { value: new FilterObject(this.Items), writable: false });
            this.Items.ItemPropertyChanged.on(this._OnItemPropertyChanged, this);
        }
        Object.defineProperty(MainViewModel.prototype, "NumItemsLeft", {
            get: function () {
                return ex(this.Items).count(function (i) { return i.IsComplete; });
            },
            enumerable: true,
            configurable: true
        });
        MainViewModel.prototype._OnItemPropertyChanged = function (sender, e) {
            this.OnPropertyChanged("NumItemsLeft");
            this.OnPropertyChanged("IsAllComplete");
        };
        Object.defineProperty(MainViewModel.prototype, "IsAllComplete", {
            get: function () {
                return ex(this.Items).all(function (i) { return i.IsComplete; });
            },
            set: function (value) {
                ex(this.Items).forEach(function (i) { return i.IsComplete = value; });
            },
            enumerable: true,
            configurable: true
        });
        MainViewModel.prototype.AddTodo = function (e) {
            if (e.args.Key !== Fayde.Input.Key.Enter)
                return;
            if (!this.ActiveText)
                return;
            var item = new TodoItem();
            item.Text = this.ActiveText;
            this.Items.Add(item);
            this.ActiveText = "";
            this.OnPropertyChanged("NumItemsLeft");
            this.OnPropertyChanged("IsAllComplete");
        };
        return MainViewModel;
    })(MVVM.ViewModelBase);
    MVVM.NotifyProperties(MainViewModel, ["Items", "ActiveText"]);
    return MainViewModel;
});
//# sourceMappingURL=MainViewModel.js.map