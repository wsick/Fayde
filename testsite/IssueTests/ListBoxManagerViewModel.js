var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './Item'], function(require, exports, Item) {
    var RelayCommand = Fayde.MVVM.RelayCommand;
    var ObservableCollection = Fayde.Collections.ObservableCollection;

    var ListBoxManagerViewModel = (function (_super) {
        __extends(ListBoxManagerViewModel, _super);
        function ListBoxManagerViewModel() {
            var _this = this;
            _super.call(this);
            this.Items = new ObservableCollection();
            this.Items.AddRange([
                new Item("Item 1"),
                new Item("Item 2"),
                new Item("Item 3"),
                new Item("Item 4"),
                new Item("Item 5"),
                new Item("Item 6"),
                new Item("Item 7"),
                new Item("Item 8"),
                new Item("Item 9"),
                new Item("Item 10")
            ]);
            this.RemoveCommand = new RelayCommand(function (par) {
                _this.Items.Remove(par);
            });
            this.HideCommand = new RelayCommand(function (par) {
                par.Visible = false;
            });
        }
        return ListBoxManagerViewModel;
    })(Fayde.MVVM.ViewModelBase);
    
    return ListBoxManagerViewModel;
});
