/// <reference path="Fayde.d.ts" />

module Fayde.Experimental {
    export class GridItemsControl extends Fayde.Controls.Control {
        static ItemsSourceProperty = DependencyProperty.Register("ItemsSource", () => IEnumerable_, GridItemsControl, null, (d, args) => (<GridItemsControl>d).OnItemsSourceChanged(args.OldValue, args.NewValue));
        ItemsSource: IEnumerable<any>;
        OnItemsSourceChanged(oldItemsSource: IEnumerable<any>, newItemsSource: IEnumerable<any>) {
            var nc = Collections.INotifyCollectionChanged_.As(oldItemsSource);
            if (nc)
                nc.CollectionChanged.Unsubscribe(this._OnItemsSourceUpdated, this);
            if (oldItemsSource)
                this.OnItemsRemoved(0, this._Items);
            if (newItemsSource)
                this.OnItemsAdded(0, Enumerable.ToArray(newItemsSource));
            var nc = Collections.INotifyCollectionChanged_.As(newItemsSource);
            if (nc)
                nc.CollectionChanged.Subscribe(this._OnItemsSourceUpdated, this);
        }
        private _OnItemsSourceUpdated(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    this.OnItemsAdded(e.NewStartingIndex, e.NewItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    this.OnItemsRemoved(e.OldStartingIndex, e.OldItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    this.OnItemsRemoved(e.NewStartingIndex, e.OldItems);
                    this.OnItemsAdded(e.NewStartingIndex, e.NewItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    this.OnItemsRemoved(0, e.OldItems);
                    break;
            }
        }

        private _Items: any[] = [];

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnItemsAdded(index: number, newItems: any[]) {
            var items = this._Items;
            for (var i = 0, len = newItems.length; i < len; i++) {
                items.splice(index + i, 0, newItems[i]);
            }
        }
        OnItemsRemoved(index: number, oldItems: any[]) {
            this._Items.splice(index, oldItems.length);
        }
    }
}