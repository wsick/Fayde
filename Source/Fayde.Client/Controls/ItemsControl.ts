/// <reference path="Control.ts" />

module Fayde.Controls {
    export class ItemsControlNode extends ControlNode {
        XObject: ItemsControl;
        constructor(xobj: ItemsControl) {
            super(xobj);
        }

        GetDefaultVisualTree(): UIElement {
            var presenter = this._ItemsPresenter;
            if (!presenter)
                (presenter = new ItemsPresenter()).TemplateOwner = this.XObject;
            return presenter;
        }
        
        private _ItemsPresenter: ItemsPresenter;
        get ItemsPresenter(): ItemsPresenter { return this._ItemsPresenter; }
        set ItemsPresenter(presenter: ItemsPresenter) {
            this.RemoveItemsFromPresenter(0);
            this._ItemsPresenter = presenter;
            this.AddItemsToPresenter(0, this.XObject.Items.Count);
        }

        get Panel(): Panel {
            var panel = this._ItemsPresenter ? this._ItemsPresenter.ElementRoot : undefined;
            return panel instanceof Panel ? panel : undefined;
        }
        
        AddItemsToPresenter(index: number, count: number) {
            var panel = this.Panel;
            if (!panel || panel instanceof VirtualizingPanel)
                return;
            var xobj = this.XObject;
            for (var i = 0, children = panel.Children, generator = xobj.ItemContainersManager.CreateGenerator(index, count); generator.Generate() && i < count; i++) {
                var container = generator.Current;
                //if (container instanceof DependencyObject && !(item instanceof DependencyObject))
                    //container.DataContext = item;
                children.Insert(index + i, <UIElement>container);
                xobj.PrepareContainerForItem(container, generator.CurrentItem);
            }
        }
        RemoveItemsFromPresenter(index: number, count?: number) {
            var panel = this.Panel;
            if (!panel || panel instanceof VirtualizingPanel)
                return;
            var children = panel.Children;
            if (count == null || count == children.Count) {
                children.Clear();
            } else {
                while (count > 0) {
                    children.RemoveAt(index);
                    count--;
                }
            }
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
            this._DisplayMemberTemplate = null;
            var enumerator = this.ItemContainersManager.GetEnumerator();
            while (enumerator.MoveNext()) {
                this.UpdateContentTemplateOnContainer(enumerator.Current, enumerator.CurrentItem);
            }
        }
        OnItemsSourceChanged(e: IDependencyPropertyChangedEventArgs) {
            this._ItemContainersManager.ItemsSource = e.NewValue;
        }
        OnItemTemplateChanged(e: IDependencyPropertyChangedEventArgs) {
            var icm = this._ItemContainersManager;
            var enumerator = this.ItemContainersManager.GetEnumerator();
            while (enumerator.MoveNext()) {
                this.UpdateContentTemplateOnContainer(enumerator.Current, enumerator.CurrentItem);
            }
        }

        private _ItemContainersManager: Internal.IItemContainersManager;
        get ItemContainersManager(): Internal.IItemContainersManager { return this._ItemContainersManager; }

        static GetItemsOwner(uie: UIElement): ItemsControl {
            if (!(uie instanceof Panel))
                return null;
            var presenter = ItemsPresenter.Get(<Panel>uie);
            var ic = presenter ? presenter.ItemsControl : null;
            return ic instanceof ItemsControl ? ic : null;
        }
        static ItemsControlFromItemContainer(container: DependencyObject) {
            if (!(container instanceof FrameworkElement))
                return null;

            var fe = <FrameworkElement>container;
            var parentNode = fe.XamlNode.ParentNode;
            var parent = (parentNode) ? parentNode.XObject : null;
            var itctl: ItemsControl;
            if (parent instanceof ItemsControl)
                itctl = <ItemsControl>parent;

            if (itctl == null)
                return ItemsControl.GetItemsOwner(<UIElement>parent);
            if (itctl.IsItemItsOwnContainer(fe))
                return itctl;
            return null;
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this._ItemContainersManager = new Internal.ItemContainersManager(this);
            this._ItemContainersManager.Items = ItemsControl.ItemsProperty.Initialize(this);
            this._ItemContainersManager.ItemsChanged.Subscribe(this.OnICGItemsChanged, this);
        }

        PrepareContainerForItem(container: DependencyObject, item: any) {
            if (this.DisplayMemberPath != null && this.ItemTemplate != null)
                throw new InvalidOperationException("Cannot set 'DisplayMemberPath' and 'ItemTemplate' simultaenously");
            this.UpdateContentTemplateOnContainer(container, item);
        }
        ClearContainerForItem(container: DependencyObject, item: any) { }
        GetContainerForItem(): DependencyObject { return new ContentPresenter(); }
        IsItemItsOwnContainer(item: any): boolean { return item instanceof FrameworkElement; }

        private OnICGItemsChanged(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            var node = this.XamlNode;
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Reset:
                    node.RemoveItemsFromPresenter(0);
                    break;
                case Collections.NotifyCollectionChangedAction.Add:
                    node.AddItemsToPresenter(e.NewStartingIndex, e.NewItems.length);
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    node.RemoveItemsFromPresenter(e.OldStartingIndex, e.OldItems.length);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    node.RemoveItemsFromPresenter(e.NewStartingIndex, 1);
                    node.AddItemsToPresenter(e.NewStartingIndex, 1);
                    break;
            }
            this.OnItemsChanged(e);
        }
        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) { }
        private UpdateContentTemplateOnContainer(element: DependencyObject, item: any) {
            if (!element)
                return;
            if (element === item)
                return;

            var presenter: ContentPresenter;
            if (element instanceof ContentPresenter) presenter = <ContentPresenter>element;
            var control: ContentControl;
            if (element instanceof ContentControl) control = <ContentControl>element;

            var template: DataTemplate;
            if (!(item instanceof UIElement))
                template = this.ItemTemplate || this._GetDisplayMemberTemplate();

            if (presenter != null) {
                presenter.ContentTemplate = template;
                presenter.Content = item;
            } else if (control != null) {
                control.ContentTemplate = template;
                control.Content = item;
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