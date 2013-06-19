/// <reference path="Control.ts" />
/// CODE
/// <reference path="Panel.ts" />
/// <reference path="ItemsPresenter.ts" />
/// <reference path="ItemContainerGenerator.ts" />
/// <reference path="ContentPresenter.ts" />
/// <reference path="ItemCollection.ts" />
/// <reference path="../Collections/NotifyCollectionChangedEventArgs.ts" />

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
    Nullstone.RegisterType(ItemsControlNode, "ItemsControlNode");

    export class ItemsControl extends Control {
        private _ItemsIsDataBound: bool = false;
        private _Items: IItemCollectionHidden = null;
        private _DisplayMemberTemplate:DataTemplate = null;

        XamlNode: ItemsControlNode;
        CreateNode(): ItemsControlNode { return new ItemsControlNode(this); }

        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, ItemsControl, null, (d, args) => (<ItemsControl>d).OnDisplayMemberPathChanged(args));
        //static ItemsProperty = DependencyProperty.RegisterCore("Items", () => ItemCollection, ItemsControl);
        static ItemsPanelProperty = DependencyProperty.RegisterCore("ItemsPanel", () => ItemsPanelTemplate, ItemsControl);
        static ItemsSourceProperty = DependencyProperty.Register("ItemsSource", () => IEnumerable_, ItemsControl, null, (d, args) => (<ItemsControl>d).OnItemsSourceChanged(args));
        static ItemTemplateProperty = DependencyProperty.RegisterCore("ItemTemplate", () => DataTemplate, ItemsControl, undefined, (d, args) => (<ItemsControl>d).OnItemTemplateChanged(args));
        DisplayMemberPath: string;
        ItemsPanel: ItemsPanelTemplate;
        ItemTemplate: DataTemplate;
        
        get Items(): ItemCollection {
            var items = <ItemCollection>this._Items;
            if (!items) {
                this._Items = items = new ItemCollection();
                this._ItemsIsDataBound = true;
                items.ItemsChanged.Subscribe(this.InvokeItemsChanged, this);
                //items.Clearing.Subscribe(this.OnItemsClearing, this);
            }
            return items;
        }
        private get $Items(): IItemCollectionHidden { return this.Items; }

        get ItemsSource(): IEnumerable<any> { return this.GetValue(ItemsControl.ItemsSourceProperty); }
        set ItemsSource(value: IEnumerable<any>) {
            if (!this._ItemsIsDataBound && this.Items.Count > 0)
                throw new InvalidOperationException("Items collection must be empty before using ItemsSource");
            this.SetValue(ItemsControl.ItemsSourceProperty, value);
        }
        // <DataTemplate><Grid><TextBlock Text="{Binding @DisplayMemberPath}" /></Grid></DataTemplate>
        get $DisplayMemberTemplate(): DataTemplate {
            var dmt = this._DisplayMemberTemplate;
            if (!dmt) {
                var json = {
                    ParseType: Grid,
                    Children: [
                        {
                            ParseType: TextBlock,
                            Props: { Text: new Fayde.BindingMarkup({ Path: this.DisplayMemberPath }) }
                        }
                    ]
                };
                dmt = this._DisplayMemberTemplate = new DataTemplate(json);
                //TODO: DataTemplate wants a res chain
            }
            return dmt;
        }

        static Annotations = { ContentProperty: "Items" }

        ItemContainerGenerator: ItemContainerGenerator;
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            var icg = new ItemContainerGenerator(this);
            icg.ItemsChanged.Subscribe(this.OnItemContainerGeneratorChanged, this);
            Object.defineProperty(this, "ItemContainerGenerator", {
                value: icg,
                writable: false
            });
        }

        get Panel(): Panel {
            var p = this.XamlNode.ItemsPresenter;
            var presenter = this.XamlNode.ItemsPresenter;
            if (presenter)
                return presenter.ElementRoot;
            return undefined;
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

        OnItemsSourceChanged(e: IDependencyPropertyChangedEventArgs) {
            if (!e.OldValue && Nullstone.ImplementsInterface(e.OldValue, Collections.INotifyCollectionChanged_)) {
                (<Collections.INotifyCollectionChanged>e.OldValue).CollectionChanged.Unsubscribe(this._CollectionChanged, this);
            }

            if (e.NewValue != null) {
                var source = e.NewValue;
                if (Nullstone.ImplementsInterface(source, Collections.INotifyCollectionChanged_)) {
                    (<Collections.INotifyCollectionChanged>source).CollectionChanged.Subscribe(this._CollectionChanged, this);
                }

                this.$Items.IsReadOnly = true;
                this._ItemsIsDataBound = true;
                this.$Items.ClearImpl();

                var enumerator: IEnumerator<any>;
                if (source instanceof Array) enumerator = ArrayEx.GetEnumerator(<any[]>source);
                else if (source instanceof XamlObjectCollection) enumerator = (<XamlObjectCollection>source).GetEnumerator();
                
                if (enumerator) {
                    var items = this.$Items;
                    while (enumerator.MoveNext()) {
                        items.AddImpl(enumerator.Current);
                    }
                }
                this.OnItemsChanged(Collections.NotifyCollectionChangedEventArgs.Reset());
            } else {
                this._ItemsIsDataBound = false;
                this.$Items.IsReadOnly = false;
                this.$Items.ClearImpl();
            }

            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        private _CollectionChanged(sender, e: Collections.NotifyCollectionChangedEventArgs) {
            var index: number;
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    var enumerator = ArrayEx.GetEnumerator(e.NewItems);
                    index = e.NewStartingIndex;
                    while (enumerator.MoveNext()) {
                        this.$Items.InsertImpl(index, enumerator.Current);
                        index++;
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    var enumerator = ArrayEx.GetEnumerator(e.OldItems);
                    while (enumerator.MoveNext()) {
                        this.$Items.RemoveAtImpl(e.OldStartingIndex);
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    var enumerator = ArrayEx.GetEnumerator(e.NewItems);
                    index = e.NewStartingIndex;
                    while (enumerator.MoveNext()) {
                        this.$Items.SetValueAtImpl(index, enumerator.Current);
                        index++;
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    this.$Items.ClearImpl();
                    var enumerator = this.ItemsSource.GetEnumerator();
                    while (enumerator.MoveNext()) {
                        this.$Items.AddImpl(enumerator.Current);
                    }
                    break;
            }
            this.OnItemsChanged(e);
        }
        OnDisplayMemberPathChanged(e: IDependencyPropertyChangedEventArgs) {
            var icg = this.ItemContainerGenerator;
            var i = 0;
            var enumerator = this.Items.GetEnumerator();
            while (enumerator.MoveNext()) {
                this.UpdateContentTemplateOnContainer(icg.ContainerFromIndex(i), enumerator.Current);
                i++;
            }
        }
        PrepareContainerForItem(container: DependencyObject, item: any) {
            if (this.DisplayMemberPath != null && this.ItemTemplate != null)
                throw new InvalidOperationException("Cannot set 'DisplayMemberPath' and 'ItemTemplate' simultaenously");

            this.UpdateContentTemplateOnContainer(container, item);
        }
        ClearContainerForItem(container: DependencyObject, item: any) { }
        GetContainerForItem(): DependencyObject { return new ContentPresenter(); }
        IsItemItsOwnContainer(item: any): bool { return item instanceof FrameworkElement; }
        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) { }
        InvokeItemsChanged(sender, e: Collections.NotifyCollectionChangedEventArgs) {
            /*
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    this.SetLogicalParent(this, e.NewItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    this.SetLogicalParent(null, e.OldItems);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    this.SetLogicalParent(null, e.OldItems);
                    this.SetLogicalParent(this, e.NewItems);
                    break;
            }
            */
            this.ItemContainerGenerator.OnOwnerItemsItemsChanged(e);
            if (!this._ItemsIsDataBound)
                this.OnItemsChanged(e);
        }
        OnItemContainerGeneratorChanged(sender, e:Primitives.ItemsChangedEventArgs) {
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
        OnItemTemplateChanged(e: IDependencyPropertyChangedEventArgs) {
            var enumerator = this.Items.GetEnumerator();
            var i = 0;
            var icg = this.ItemContainerGenerator;
            while (enumerator.MoveNext()) {
                this.UpdateContentTemplateOnContainer(icg.ContainerFromIndex(i), enumerator.Current);
                i++;
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
                template = this.ItemTemplate || this.$DisplayMemberTemplate;

            if (presenter != null) {
                presenter.ContentTemplate = template;
                presenter.Content = item;
            } else if (control != null) {
                control.ContentTemplate = template;
                control.Content = item;
            }
        }
    }
    Nullstone.RegisterType(ItemsControl, "ItemsControl");
}