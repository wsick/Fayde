/// <reference path="Control.ts" />

module Fayde.Controls {
    export class ItemsControlNode extends ControlNode {
        private _Presenter: ItemsPresenter;
        private static _DefaultPosition: IGeneratorPosition = { Index: -1, Offset: 1 };

        XObject: ItemsControl;
        constructor(xobj: ItemsControl) {
            super(xobj);
        }

        GetDefaultVisualTree(): UIElement {
            var presenter = this._Presenter;
            if (!presenter) {
                //TODO: How can we get the res chain in here?
                this._Presenter = presenter = new ItemsPresenter();
                presenter.TemplateOwner = this.XObject;
            }
            return presenter;
        }

        get ItemsPresenter(): ItemsPresenter { return this._Presenter; }
        _SetItemsPresenter(presenter: ItemsPresenter) {
            if (this._Presenter)
                this._Presenter.XamlNode.ElementRoot.Children.Clear();

            this._Presenter = presenter;
            var xobj = this.XObject;
            xobj.AddItemsToPresenter(ItemsControlNode._DefaultPosition, xobj.Items.Count);
        }
    }
    Fayde.RegisterType(ItemsControlNode, "Fayde.Controls");

    export class ItemsControl extends Control {
        XamlNode: ItemsControlNode;
        CreateNode(): ItemsControlNode { return new ItemsControlNode(this); }

        private static _ItemsSourceValidator(d: DependencyObject, propd: DependencyProperty, value: any): boolean {
            var ic = <ItemsControl>d;
            if (!ic.ItemsSource && ic._Manager.Items.Count > 0)
                throw new InvalidOperationException("Items collection must be empty before using ItemsSource");
            return true;
        }

        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, ItemsControl, null, (d, args) => (<ItemsControl>d).OnDisplayMemberPathChanged(args));
        static ItemsPanelProperty = DependencyProperty.Register("ItemsPanel", () => ItemsPanelTemplate, ItemsControl);
        static ItemsSourceProperty = DependencyProperty.RegisterFull("ItemsSource", () => IEnumerable_, ItemsControl, null, (d, args) => (<ItemsControl>d).OnItemsSourceChanged(args), undefined, false, ItemsControl._ItemsSourceValidator, true);
        static ItemsProperty = DependencyProperty.RegisterImmutable<ItemCollection>("Items", () => ItemCollection, ItemsControl);
        static ItemTemplateProperty = DependencyProperty.Register("ItemTemplate", () => DataTemplate, ItemsControl, undefined, (d, args) => (<ItemsControl>d).OnItemTemplateChanged(args));

        DisplayMemberPath: string;
        ItemsPanel: ItemsPanelTemplate;
        ItemsSource: IEnumerable<any>;
        Items: ItemCollection;
        ItemTemplate: DataTemplate;

        OnDisplayMemberPathChanged(e: IDependencyPropertyChangedEventArgs) {
            this._DisplayMemberTemplate = null;
            var icg = this.ItemContainerGenerator;
            var i = 0;
            var enumerator = this.Items.GetEnumerator();
            while (enumerator.MoveNext()) {
                this.UpdateContentTemplateOnContainer(icg.ContainerFromIndex(i), enumerator.Current);
                i++;
            }
        }
        OnItemsSourceChanged(e: IDependencyPropertyChangedEventArgs) {
            this._Manager.OnItemsSourceChanged(e.OldValue, e.NewValue);
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        OnItemTemplateChanged(e: IDependencyPropertyChangedEventArgs) {
            var enumerator = this.Items.GetEnumerator();
            var i = 0;
            var icg = this.ItemContainerGenerator;
            while (enumerator.MoveNext()) {
                this.UpdateContentTemplateOnContainer(icg.ContainerFromIndex(i), enumerator.Current);
                i++;
            }
        }

        private _DisplayMemberTemplate: DataTemplate = null;
        private _Manager: Internal.IItemsManager;
        private _ItemContainerGenerator: ItemContainerGenerator;

        get ItemContainerGenerator(): ItemContainerGenerator { return this._ItemContainerGenerator; }

        get Panel(): Panel {
            if (!this.XamlNode.ItemsPresenter)
                return undefined;
            return this.XamlNode.ItemsPresenter.ElementRoot;
        }

        static GetItemsOwner(uie: UIElement): ItemsControl {
            if (!(uie instanceof Panel))
                return null;
            var panel = <Panel>uie;
            if (!panel.IsItemsHost)
                return null;
            var presenter = <ItemsPresenter>panel.TemplateOwner;
            if (!(presenter instanceof ItemsPresenter))
                return null;
            var ic = <ItemsControl>presenter.TemplateOwner;
            if (ic instanceof ItemsControl)
                return ic;
            return null;
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
            ItemsControl.ItemsProperty.Initialize(this);
            this._ItemContainerGenerator = new ItemContainerGenerator(this);
            this._ItemContainerGenerator.ItemsChanged.Subscribe(this.OnICGItemsChanged, this);
            this._Manager = new Internal.ItemsManager(this);
        }

        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) {
            this.ItemContainerGenerator.OnOwnerItemsItemsChanged(e);
        }
        OnICGItemsChanged(sender: any, e: Primitives.ItemsChangedEventArgs) {
            var panel = this.Panel;
            if (!panel || panel instanceof VirtualizingPanel)
                return;

            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Reset:
                    var count = panel.Children.Count;
                    if (count > 0)
                        this.RemoveItemsFromPresenter({ Index: 0, Offset: 0 }, count);
                    break;
                case Collections.NotifyCollectionChangedAction.Add:
                    this.AddItemsToPresenter(e.Position, e.ItemCount);
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    this.RemoveItemsFromPresenter(e.Position, e.ItemCount);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    this.RemoveItemsFromPresenter(e.Position, e.ItemCount);
                    this.AddItemsToPresenter(e.Position, e.ItemCount);
                    break;
            }
        }

        AddItemsToPresenter(position: IGeneratorPosition, count: number) {
            var panel = this.Panel;
            if (!panel || panel instanceof VirtualizingPanel)
                return;

            var icg = this.ItemContainerGenerator;
            var newIndex = icg.IndexFromGeneratorPosition(position);
            var items = this.Items;
            var children = panel.Children;

            var state = icg.StartAt(position, true, true);
            try {
                for (var i = 0; i < count; i++) {
                    var item = items.GetValueAt(newIndex + i);
                    var container = icg.GenerateNext({ Value: null });
                    if (container instanceof ContentControl)
                        (<ContentControl>container)._ContentSetsParent = false;

                    if (container instanceof FrameworkElement && !(item instanceof FrameworkElement))
                        container.DataContext = item;

                    children.Insert(newIndex + i, <UIElement>container);
                    icg.PrepareItemContainer(container);
                }
            } finally {
                state.Dispose();
            }
        }
        RemoveItemsFromPresenter(position: IGeneratorPosition, count: number) {
            var panel = this.Panel;
            if (!panel || panel instanceof VirtualizingPanel)
                return;

            while (count > 0) {
                panel.Children.RemoveAt(position.Index);
                count--;
            }
        }
        UpdateContentTemplateOnContainer(element: DependencyObject, item) {
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

        PrepareContainerForItem(container: DependencyObject, item: any) {
            if (this.DisplayMemberPath != null && this.ItemTemplate != null)
                throw new InvalidOperationException("Cannot set 'DisplayMemberPath' and 'ItemTemplate' simultaenously");
            this.UpdateContentTemplateOnContainer(container, item);
        }
        ClearContainerForItem(container: DependencyObject, item: any) { }
        GetContainerForItem(): DependencyObject { return new ContentPresenter(); }
        IsItemItsOwnContainer(item: any): boolean { return item instanceof FrameworkElement; }

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