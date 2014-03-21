/// <reference path="Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridItemsControl = (function (_super) {
            __extends(GridItemsControl, _super);
            function GridItemsControl() {
                _super.call(this);
                this._Items = [];
                this.DefaultStyleKey = this.constructor;
            }
            GridItemsControl.prototype.OnItemsSourceChanged = function (oldItemsSource, newItemsSource) {
                var nc = Fayde.Collections.INotifyCollectionChanged_.As(oldItemsSource);
                if (nc)
                    nc.CollectionChanged.Unsubscribe(this._OnItemsSourceUpdated, this);
                if (oldItemsSource)
                    this.OnItemsRemoved(0, this._Items);
                if (newItemsSource)
                    this.OnItemsAdded(0, Fayde.Enumerable.ToArray(newItemsSource));
                var nc = Fayde.Collections.INotifyCollectionChanged_.As(newItemsSource);
                if (nc)
                    nc.CollectionChanged.Subscribe(this._OnItemsSourceUpdated, this);
            };
            GridItemsControl.prototype._OnItemsSourceUpdated = function (sender, e) {
                switch (e.Action) {
                    case 1 /* Add */:
                        this.OnItemsAdded(e.NewStartingIndex, e.NewItems);
                        break;
                    case 2 /* Remove */:
                        this.OnItemsRemoved(e.OldStartingIndex, e.OldItems);
                        break;
                    case 3 /* Replace */:
                        this.OnItemsRemoved(e.NewStartingIndex, e.OldItems);
                        this.OnItemsAdded(e.NewStartingIndex, e.NewItems);
                        break;
                    case 4 /* Reset */:
                        this.OnItemsRemoved(0, e.OldItems);
                        break;
                }
            };

            GridItemsControl.prototype.OnItemsAdded = function (index, newItems) {
                var items = this._Items;
                for (var i = 0, len = newItems.length; i < len; i++) {
                    items.splice(index + i, 0, newItems[i]);
                }
            };
            GridItemsControl.prototype.OnItemsRemoved = function (index, oldItems) {
                this._Items.splice(index, oldItems.length);
            };
            GridItemsControl.ItemsSourceProperty = DependencyProperty.Register("ItemsSource", function () {
                return Fayde.IEnumerable_;
            }, GridItemsControl, null, function (d, args) {
                return d.OnItemsSourceChanged(args.OldValue, args.NewValue);
            });
            return GridItemsControl;
        })(Fayde.Controls.Control);
        Experimental.GridItemsControl = GridItemsControl;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=GridItemsControl.js.map
