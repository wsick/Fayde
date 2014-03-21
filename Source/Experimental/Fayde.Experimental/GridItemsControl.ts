/// <reference path="Fayde.d.ts" />

module Fayde.Experimental {
    export class GridItemsControlNode extends Fayde.Controls.ControlNode {
        XObject: GridItemsControl;
        constructor(xobj: GridItemsControl) {
            super(xobj);
        }

        ItemsPresenter: GridItemsPresenter = null;
        GetDefaultVisualTree(): UIElement {
            var presenter = this.ItemsPresenter;
            if (!presenter)
                (presenter = new GridItemsPresenter()).TemplateOwner = this.XObject;
            return presenter;
        }
    }

    export class GridItemsControl extends Fayde.Controls.Control {
        XamlNode: GridItemsControlNode;
        CreateNode(): GridItemsControlNode { return new GridItemsControlNode(this); }

        static ItemsSourceProperty = DependencyProperty.Register("ItemsSource", () => IEnumerable_, GridItemsControl, null, (d, args) => (<GridItemsControl>d).OnItemsSourceChanged(args.OldValue, args.NewValue));
        ItemsSource: IEnumerable<any>;
        OnItemsSourceChanged(oldItemsSource: IEnumerable<any>, newItemsSource: IEnumerable<any>) {
            var nc = Collections.INotifyCollectionChanged_.As(oldItemsSource);
            if (nc)
                nc.CollectionChanged.Unsubscribe(this._OnItemsSourceUpdated, this);
            if (oldItemsSource)
                this._RemoveItems(0, this._Items);
            if (newItemsSource)
                this._AddItems(0, Enumerable.ToArray(newItemsSource));
            var nc = Collections.INotifyCollectionChanged_.As(newItemsSource);
            if (nc)
                nc.CollectionChanged.Subscribe(this._OnItemsSourceUpdated, this);
        }
        private _OnItemsSourceUpdated(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    this._AddItems(e.NewStartingIndex, e.NewItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    this._RemoveItems(e.OldStartingIndex, e.OldItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    this._RemoveItems(e.NewStartingIndex, e.OldItems);
                    this._AddItems(e.NewStartingIndex, e.NewItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    this._RemoveItems(0, e.OldItems);
                    break;
            }
        }

        static ColumnsProperty = DependencyProperty.RegisterImmutable<GridColumnCollection>("Columns", () => GridColumnCollection, GridItemsControl);
        Columns: GridColumnCollection;

        private _Items: any[] = [];
        get Items(): any[] { return this._Items; }
        private _AddItems(index: number, newItems: any[]) {
            var items = this._Items;
            for (var i = 0, len = newItems.length; i < len; i++) {
                items.splice(index + i, 0, newItems[i]);
            }
            this.OnItemsAdded(index, newItems);
        }
        private _RemoveItems(index: number, oldItems: any[]) {
            this._Items.splice(index, oldItems.length);
            this.OnItemsRemoved(index, oldItems);
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            var coll = GridItemsControl.ColumnsProperty.Initialize(this);
            coll.CollectionChanged.Subscribe(this._ColumnsChanged, this);
        }

        OnItemsAdded(index: number, newItems: any[]) {
            var presenter = this.XamlNode.ItemsPresenter;
            if (presenter)
                presenter.OnItemsAdded(index, newItems);
        }
        OnItemsRemoved(index: number, oldItems: any[]) {
            var presenter = this.XamlNode.ItemsPresenter;
            if (presenter)
                presenter.OnItemsRemoved(index, oldItems);
        }

        private _ColumnsChanged(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            var presenter = this.XamlNode.ItemsPresenter;
            if (!presenter)
                return;
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    for (var i = 0, len = e.NewItems.length; i < len; i++) {
                        presenter.OnColumnAdded(e.NewStartingIndex + i, e.NewItems[i]);
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    for (var i = 0, len = e.OldItems.length; i < len; i++) {
                        presenter.OnColumnRemoved(e.OldStartingIndex + i);
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    presenter.OnColumnRemoved(e.NewStartingIndex);
                    presenter.OnColumnAdded(e.NewStartingIndex, e.NewItems[i]);
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    presenter.OnColumnsCleared();
                    break;
            }
        }
    }
}