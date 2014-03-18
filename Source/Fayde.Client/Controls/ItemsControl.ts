/// <reference path="Control.ts" />

module Fayde.Controls {
    export class ItemsControlNode extends ControlNode {
        XObject: ItemsControl;
        constructor(xobj: ItemsControl) {
            super(xobj);
        }
        
        ItemsPresenter: ItemsPresenter = null;
        GetDefaultVisualTree(): UIElement {
            var presenter = this.ItemsPresenter;
            if (!presenter)
                (presenter = new ItemsPresenter()).TemplateOwner = this.XObject;
            return presenter;
        }
    }
    Fayde.RegisterType(ItemsControlNode, "Fayde.Controls");

    export class ItemsControl extends Control {
        XamlNode: ItemsControlNode;
        CreateNode(): ItemsControlNode { return new ItemsControlNode(this); }

        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, ItemsControl, null, (d, args) => (<ItemsControl>d).OnDisplayMemberPathChanged(args));
        static ItemsPanelProperty = DependencyProperty.Register("ItemsPanel", () => ItemsPanelTemplate, ItemsControl);
        static ItemsSourceProperty = DependencyProperty.RegisterFull("ItemsSource", () => IEnumerable_, ItemsControl, null, (d, args) => (<ItemsControl>d).OnItemsSourceChanged(args));
        static ItemsProperty = DependencyProperty.RegisterImmutable<ItemCollection>("Items", () => ItemCollection, ItemsControl);
        static ItemTemplateProperty = DependencyProperty.Register("ItemTemplate", () => DataTemplate, ItemsControl, undefined, (d, args) => (<ItemsControl>d).OnItemTemplateChanged(args));
        
        static IsItemsHostProperty = DependencyProperty.RegisterAttached("IsItemsHost", () => Boolean, ItemsControl, false);
        static GetIsItemsHost(d: DependencyObject): boolean { return d.GetValue(ItemsControl.IsItemsHostProperty) === true; }
        static SetIsItemsHost(d: DependencyObject, value: boolean) { d.SetValue(ItemsControl.IsItemsHostProperty, value === true); }

        DisplayMemberPath: string;
        ItemsPanel: ItemsPanelTemplate;
        ItemsSource: IEnumerable<any>;
        Items: ItemCollection;
        ItemTemplate: DataTemplate;

        OnDisplayMemberPathChanged(e: IDependencyPropertyChangedEventArgs) {
            var enumerator = this.ItemContainersManager.GetEnumerator();
            while (enumerator.MoveNext()) {
                this.UpdateContainerTemplate(enumerator.Current, enumerator.CurrentItem);
            }
        }
        OnItemsSourceChanged(e: IDependencyPropertyChangedEventArgs) {
            var nc = Collections.INotifyCollectionChanged_.As(e.OldValue);
            if (nc)
                nc.CollectionChanged.Unsubscribe(this._OnItemsSourceUpdated, this);
            var items = this.Items;
            if (e.OldValue)
                this.OnItemsRemoved(0, items.ToArray());
            try {
                this._SuspendItemsChanged = true;
                items.Clear();
                this._IsDataBound = !!e.NewValue;
                if (e.NewValue) {
                    var arr = Enumerable.ToArray(e.NewValue);
                    items.AddRange(arr);
                    this.OnItemsAdded(0, arr);
                }
            } finally {
                this._SuspendItemsChanged = false;
            }
            var nc = Collections.INotifyCollectionChanged_.As(e.NewValue);
            if (nc)
                nc.CollectionChanged.Subscribe(this._OnItemsSourceUpdated, this);
        }
        OnItemTemplateChanged(e: IDependencyPropertyChangedEventArgs) {
            var enumerator = this.ItemContainersManager.GetEnumerator();
            while (enumerator.MoveNext()) {
                this.UpdateContainerTemplate(enumerator.Current, enumerator.CurrentItem);
            }
        }

        private _ItemContainersManager: Internal.IItemContainersManager;
        get ItemContainersManager(): Internal.IItemContainersManager { return this._ItemContainersManager; }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            var coll = <ItemCollection>ItemsControl.ItemsProperty.Initialize(this);
            coll.ItemsChanged.Subscribe(this._OnItemsUpdated, this);

            this._ItemContainersManager = new Internal.ItemContainersManager(this);
        }

        PrepareContainerForItem(container: UIElement, item: any) {
            if (this.DisplayMemberPath != null && this.ItemTemplate != null)
                throw new InvalidOperationException("Cannot set 'DisplayMemberPath' and 'ItemTemplate' simultaneously");
            this.UpdateContainerTemplate(container, item);
        }
        ClearContainerForItem(container: UIElement, item: any) {
            if (container instanceof ContentPresenter) {
                var cp = <ContentPresenter>container;
                if (cp.Content === item)
                    cp.Content = null;
            } else if (container instanceof ContentControl) {
                var cc = <ContentControl>container;
                if (cc.Content === item)
                    cc.Content = null;
            }
        }
        GetContainerForItem(): UIElement { return new ContentPresenter(); }
        IsItemItsOwnContainer(item: any): boolean { return item instanceof UIElement; }
        
        private _IsDataBound = false;
        private _SuspendItemsChanged = false;
        private _OnItemsUpdated(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            if (this._SuspendItemsChanged) //Ignore OnItemsSourceChanged operations
                return;
            if (this._IsDataBound)
                throw new InvalidOperationException("Cannot modify Items while bound to ItemsSource.");
            this.OnItemsChanged(e);
        }
        private _OnItemsSourceUpdated(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            var items = this.Items;
            try {
                this._SuspendItemsChanged = true;
                switch (e.Action) {
                    case Collections.NotifyCollectionChangedAction.Add:
                        for (var i = 0, len = e.NewItems.length; i < len; i++) {
                            items.Insert(e.NewStartingIndex + i, e.NewItems[i]);
                        }
                        break;
                    case Collections.NotifyCollectionChangedAction.Remove:
                        for (var i = 0, len = e.OldItems.length; i < len; i++) {
                            items.RemoveAt(e.OldStartingIndex);
                        }
                        break;
                    case Collections.NotifyCollectionChangedAction.Replace:
                        items[e.NewStartingIndex] = e.NewItems[0];
                        break;
                    case Collections.NotifyCollectionChangedAction.Reset:
                        items.Clear();
                        break;
                }
            } finally {
                this._SuspendItemsChanged = false;
            }
            this.OnItemsChanged(e);
        }
        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) {
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
        OnItemsAdded(index: number, newItems: any[]) {
            this._ItemContainersManager.OnItemsAdded(index, newItems);
            var presenter = this.XamlNode.ItemsPresenter;
            if (presenter)
                presenter.OnItemsAdded(index, newItems);
        }
        OnItemsRemoved(index: number, oldItems: any[]) {
            this._ItemContainersManager.OnItemsRemoved(index, oldItems);
            var presenter = this.XamlNode.ItemsPresenter;
            if (presenter)
                presenter.OnItemsRemoved(index, oldItems);
        }

        private UpdateContainerTemplate(container: UIElement, item: any) {
            if (!container || container === item)
                return;

            var template: DataTemplate;
            if (!(item instanceof UIElement))
                template = this.ItemTemplate || this._GetDisplayMemberTemplate();

            if (container instanceof ContentPresenter) {
                var cp = <ContentPresenter>container;
                cp.ContentTemplate = template;
                cp.Content = item;
            } else if (container instanceof ContentControl) {
                var cc = <ContentControl>container;
                cc.ContentTemplate = template;
                cc.Content = item;
            }
        }
        private _DisplayMemberTemplate: DataTemplate = null;
        private _GetDisplayMemberTemplate(): DataTemplate {
            if (!this._DisplayMemberTemplate) {
                var dmp = this.DisplayMemberPath || "";
                var xd = new Xaml.XamlDocument("<DataTemplate xmlns=\"" + Fayde.XMLNS + "\"><Grid><TextBlock Text=\"{Binding " + dmp + "}\" /></Grid></DataTemplate>");
                this._DisplayMemberTemplate = <DataTemplate>Xaml.Load(xd.Document);
            }
            return this._DisplayMemberTemplate;
        }
    }
    Fayde.RegisterType(ItemsControl, "Fayde.Controls", Fayde.XMLNS);
    Xaml.Content(ItemsControl, ItemsControl.ItemsProperty);
}