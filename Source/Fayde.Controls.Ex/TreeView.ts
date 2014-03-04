module Fayde.Controls {
    import ScrollExtensions = Internal.ScrollExtensions;

    export class TreeView extends ItemsControl {
        static SelectedItemProperty = DependencyProperty.Register("SelectedItem", () => Object, TreeView, null, (d, args) => (<TreeView>d).OnSelectedItemChanged(args));
        static SelectedValueProperty = DependencyProperty.Register("SelectedValue", () => Object, TreeView, null, (d, args) => (<TreeView>d).OnSelectedValueChanged(args));
        static SelectedValuePathProperty = DependencyProperty.Register("SelectedValuePath", () => String, TreeView, "", (d, args) => (<TreeView>d).OnSelectedValuePathChanged(args));
        static ItemContainerStyleProperty = DependencyProperty.Register("ItemContainerStyle", () => Style, TreeView, null, (d, args) => (<TreeView>d).OnItemContainerStyleChanged(args));

        SelectedItem: any;
        SelectedValue: any;
        SelectedValuePath: string;
        ItemContainerStyle: Style;

        private OnSelectedItemChanged(e: DependencyPropertyChangedEventArgs) {
            if (this._IgnorePropertyChange)
                this._IgnorePropertyChange = false;
            else if (!this._AllowWrite) {
                this._IgnorePropertyChange = true;
                this.SetValue(TreeView.SelectedItemProperty, e.OldValue);
                throw new InvalidOperationException("Cannot set read-only property SelectedItem.");
            }
            else
                this.UpdateSelectedValue(e.NewValue);
        }
        private OnSelectedValueChanged(e: DependencyPropertyChangedEventArgs) {
            if (this._IgnorePropertyChange) {
                this._IgnorePropertyChange = false;
            } else {
                if (this._AllowWrite)
                    return;
                this._IgnorePropertyChange = true;
                this.SetValue(TreeView.SelectedValueProperty, e.OldValue);
                throw new InvalidOperationException("Cannot set read-only property SelectedValue.");
            }
        }
        private OnSelectedValuePathChanged(e: DependencyPropertyChangedEventArgs) {
            this.UpdateSelectedValue(this.SelectedItem);
        }
        private OnItemContainerStyleChanged(e: DependencyPropertyChangedEventArgs) {
            this.ItemsControlHelper.UpdateItemContainerStyle(<Style>e.NewValue);
        }

        private _AllowWrite: boolean;
        private _IgnorePropertyChange: boolean;

        SelectedContainer: TreeViewItem;
        IsSelectedContainerHookedUp: boolean;
        IsSelectionChangeActive: boolean;
        ItemsControlHelper: Internal.ItemsControlHelper;
        private Interaction: Internal.InteractionHelper;

        private SelectedItemChanged = new RoutedPropertyChangedEvent<any>();

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.ItemsControlHelper = new Internal.ItemsControlHelper(this);
            this.Interaction = new Internal.InteractionHelper(this);
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.ItemsControlHelper.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        GetContainerForItem(): DependencyObject {
            return new TreeViewItem();
        }
        IsItemItsOwnContainer(item: any): boolean {
            return item instanceof TreeViewItem;
        }
        PrepareContainerForItem(element: DependencyObject, item: any) {
            var treeViewItem = <TreeViewItem>element;
            if (treeViewItem instanceof TreeViewItem)
                treeViewItem.ParentItemsControl = this;
            Internal.ItemsControlHelper.PrepareContainerForItemOverride(element, this.ItemContainerStyle);
            HeaderedItemsControl.PrepareHeaderedItemsControlContainer(treeViewItem, item, this, this.ItemContainerStyle);
            super.PrepareContainerForItem(element, item);
        }
        ClearContainerForItem(element: DependencyObject, item: any) {
            var treeViewItem = <TreeViewItem>element;
            if (treeViewItem instanceof TreeViewItem)
                treeViewItem.ParentItemsControl = null;
            super.ClearContainerForItem(element, item);
        }

        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) {
            if (!e)
                throw new ArgumentException("e");
            super.OnItemsChanged(e);
            if (e.NewItems != null) {
                for (var i = 0, items = <TreeViewItem[]>e.NewItems, len = items.length; i < len; i++) {
                    items[i].ParentItemsControl = this;
                }
            }

            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Remove:
                case Collections.NotifyCollectionChangedAction.Reset:
                    if (this.SelectedItem != null && !this.IsSelectedContainerHookedUp)
                        this.SelectFirstItem();
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    var selectedItem = this.SelectedItem;
                    if (selectedItem != null && (e.OldItems == null || Nullstone.Equals(selectedItem, e.OldItems[0])))
                        this.ChangeSelection(selectedItem, this.SelectedContainer, false);
                    break;
            }

            if (!e.OldItems)
                return;
            for (var i = 0, items = <TreeViewItem[]>e.OldItems, len = items.length; i < len; i++) {
                items[i].ParentItemsControl = null;
            }
        }

        CheckForSelectedDescendents(item: TreeViewItem) {
            var stack: TreeViewItem[] = [];
            stack.push(item);
            while (stack.length > 0) {
                var container = stack.pop();
                if (container.IsSelected) {
                    container.IgnorePropertyChange = true;
                    container.IsSelected = false;
                    this.ChangeSelection(container, container, true);
                    if (this.SelectedContainer.ParentItemsControl == null)
                        this.SelectedContainer.RequiresContainsSelectionUpdate = true;
                }
                var enumerator = container.Items.GetEnumerator();
                while (enumerator.MoveNext())
                    stack.push(enumerator.Current);
            }
        }

        PropagateKeyDown(e: Input.KeyEventArgs) {
            this.OnKeyDown(e);
        }
        OnKeyDown(e: Input.KeyEventArgs) {
            if (!this.Interaction.AllowKeyDown(e))
                return;
            super.OnKeyDown(e);
            if (e.Handled)
                return;
            if (Input.Keyboard.HasControl()) {
                switch (e.Key) {
                    case Input.Key.PageUp:
                    case Input.Key.PageDown:
                    case Input.Key.End:
                    case Input.Key.Home:
                    case Input.Key.Left:
                    case Input.Key.Up:
                    case Input.Key.Right:
                    case Input.Key.Down:
                        if (!this.HandleScrollKeys(e.Key))
                            break;
                        e.Handled = true;
                        break;
                }
            }
            else {
                switch (e.Key) {
                    case Input.Key.PageUp:
                    case Input.Key.PageDown:
                        if (this.SelectedContainer != null) {
                            if (!this.HandleScrollByPage(e.Key === Input.Key.PageUp))
                                break;
                            e.Handled = true;
                            break;
                        }
                        else {
                            if (!this.FocusFirstItem())
                                break;
                            e.Handled = true;
                            break;
                        }
                    case Input.Key.End:
                        if (!this.FocusLastItem())
                            break;
                        e.Handled = true;
                        break;
                    case Input.Key.Home:
                        if (!this.FocusFirstItem())
                            break;
                        e.Handled = true;
                        break;
                    case Input.Key.Up:
                    case Input.Key.Down:
                        if (this.SelectedContainer != null || !this.FocusFirstItem())
                            break;
                        e.Handled = true;
                        break;
                }
            }
        }
        private HandleScrollKeys(key: Input.Key): boolean {
            var scrollHost = this.ItemsControlHelper.ScrollHost;
            if (scrollHost != null) {
                switch (Internal.InteractionHelper.GetLogicalKey(this.FlowDirection, key)) {
                    case Input.Key.PageUp:
                        if (!NumberEx.IsGreaterThanClose(scrollHost.ExtentHeight, scrollHost.ViewportHeight))
                            ScrollExtensions.PageLeft(scrollHost);
                        else
                            ScrollExtensions.PageUp(scrollHost);
                        return true;
                    case Input.Key.PageDown:
                        if (!NumberEx.IsGreaterThanClose(scrollHost.ExtentHeight, scrollHost.ViewportHeight))
                            ScrollExtensions.PageRight(scrollHost);
                        else
                            ScrollExtensions.PageDown(scrollHost);
                        return true;
                    case Input.Key.End:
                        ScrollExtensions.ScrollToBottom(scrollHost);
                        return true;
                    case Input.Key.Home:
                        ScrollExtensions.ScrollToTop(scrollHost);
                        return true;
                    case Input.Key.Left:
                        ScrollExtensions.LineLeft(scrollHost);
                        return true;
                    case Input.Key.Up:
                        ScrollExtensions.LineUp(scrollHost);
                        return true;
                    case Input.Key.Right:
                        ScrollExtensions.LineRight(scrollHost);
                        return true;
                    case Input.Key.Down:
                        ScrollExtensions.LineDown(scrollHost);
                        return true;
                }
            }
            return false;
        }
        private HandleScrollByPage(up: boolean): boolean {
            var scrollHost = this.ItemsControlHelper.ScrollHost;
            if (scrollHost != null) {
                var viewportHeight = scrollHost.ViewportHeight;
                var top: IOutValue = { Value: 0 };
                var bottom: IOutValue = { Value: 0 };
                ScrollExtensions.GetTopAndBottom(this.SelectedContainer.HeaderElement || this.SelectedContainer, scrollHost, top, bottom);
                var tvi1: TreeViewItem = null;
                var tvi2 = this.SelectedContainer;
                var itemsControl = this.SelectedContainer.ParentItemsControl;
                if (itemsControl != null) {
                    if (up) {
                        for (var parentItemsControl; itemsControl !== this; itemsControl = parentItemsControl) {
                            var tvi3 = <TreeViewItem>itemsControl;
                            if (tvi3 != null) {
                                parentItemsControl = tvi3.ParentItemsControl;
                                if (!parentItemsControl)
                                    break;
                                tvi2 = tvi3;
                            }
                            break;
                        }
                    }
                    var index = itemsControl.ItemContainerGenerator.IndexFromContainer(tvi2);
                    var count = itemsControl.Items.Count;
                    while (itemsControl != null && tvi2 != null) {
                        if (tvi2.IsEnabled) {
                            var currentDelta: IOutValue = { Value: 0 };
                            if (tvi2.HandleScrollByPage(up, scrollHost, viewportHeight, top.Value, bottom.Value, currentDelta))
                                return true;
                            if (NumberEx.IsGreaterThanClose(currentDelta.Value, viewportHeight)) {
                                if (tvi1 === this.SelectedContainer || tvi1 == null) {
                                    if (!up)
                                        return this.SelectedContainer.HandleDownKey();
                                    return this.SelectedContainer.HandleUpKey();
                                }
                                break;
                            } else
                                tvi1 = tvi2;
                        }
                        index += up ? -1 : 1;
                        if (0 <= index && index < count) {
                            tvi2 = <TreeViewItem>itemsControl.ItemContainerGenerator.ContainerFromIndex(index);
                            if (!(tvi2 instanceof TreeViewItem)) tvi2 = null;
                        } else if (itemsControl === this) {
                            tvi2 = null;
                        } else {
                            while (itemsControl != null) {
                                var tvi3 = itemsControl instanceof TreeViewItem ? <TreeViewItem>itemsControl : null;
                                itemsControl = tvi3.ParentItemsControl;
                                if (itemsControl != null) {
                                    count = itemsControl.Items.Count;
                                    index = itemsControl.ItemContainerGenerator.IndexFromContainer(tvi3) + (up ? -1 : 1);
                                    if (index > -1 && index < count) {
                                        tvi2 = <TreeViewItem>itemsControl.ItemContainerGenerator.ContainerFromIndex(index);
                                        if (!(tvi2 instanceof TreeViewItem)) tvi2 = null;
                                        break;
                                    }
                                    else if (itemsControl == this) {
                                        tvi2 = null;
                                        itemsControl = null;
                                    }
                                }
                            }
                        }
                    }
                }
                if (tvi1 != null) {
                    if (up) {
                        if (tvi1 !== this.SelectedContainer)
                            return tvi1.Focus();
                    } else
                        tvi1.FocusInto();
                }
            }
            return false;
        }

        OnKeyUp(e: Input.KeyEventArgs) {
            if (!this.Interaction.AllowKeyUp(e))
                return;
            super.OnKeyUp(e);
        }

        OnMouseEnter(e: Input.MouseEventArgs) {
            if (!this.Interaction.AllowMouseEnter(e))
                return;
            this.UpdateVisualState(true);
            super.OnMouseEnter(e);
        }
        OnMouseLeave(e: Input.MouseEventArgs) {
            if (!this.Interaction.AllowMouseLeave(e))
                return;
            this.UpdateVisualState(true);
            super.OnMouseLeave(e);
        }
        OnMouseMove(e: Input.MouseEventArgs) {
            super.OnMouseMove(e);
        }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            if (!this.Interaction.AllowMouseLeftButtonDown(e))
                return;
            if (!e.Handled && this.HandleMouseButtonDown())
                e.Handled = true;
            this.UpdateVisualState(true);
            super.OnMouseLeftButtonDown(e);
        }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            if (!this.Interaction.AllowMouseLeftButtonUp(e))
                return;
            this.UpdateVisualState(true);
            super.OnMouseLeftButtonUp(e);
        }
        HandleMouseButtonDown(): boolean {
            if (!this.SelectedContainer)
                return false;
            if (this.SelectedContainer.IsFocused)
                this.SelectedContainer.Focus();
            return true;
        }

        OnGotFocus(e: RoutedEventArgs) {
            if (!this.Interaction.AllowGotFocus(e))
                return;
            this.UpdateVisualState(true);
            super.OnGotFocus(e);
        }
        OnLostFocus(e: RoutedEventArgs) {
            if (!this.Interaction.AllowLostFocus(e))
                return;
            this.Interaction.OnLostFocusBase();
            super.OnLostFocus(e);
        }

        ChangeSelection(itemOrContainer: any, container: TreeViewItem, selected: boolean) {
            if (this.IsSelectionChangeActive)
                return;
            var oldValue = null;
            var newValue = null;
            var flag = false;
            var selectedContainer = this.SelectedContainer;
            this.IsSelectionChangeActive = true;
            try {
                if (selected && container != this.SelectedContainer) {
                    oldValue = this.SelectedItem;
                    if (this.SelectedContainer != null) {
                        this.SelectedContainer.IsSelected = false;
                        this.SelectedContainer.UpdateContainsSelection(false);
                    }
                    newValue = itemOrContainer;
                    this.SelectedContainer = container;
                    this.SelectedContainer.UpdateContainsSelection(true);
                    this.SelectedItem = itemOrContainer;
                    this.UpdateSelectedValue(itemOrContainer);
                    flag = true;
                    this.ItemsControlHelper.ScrollIntoView(container.HeaderElement || container);
                }
                else if (!selected && container == this.SelectedContainer) {
                    this.SelectedContainer.UpdateContainsSelection(false);
                    this.SelectedContainer = null;
                    this.SelectedItem = null;
                    this.SelectedValue = null;
                    oldValue = itemOrContainer;
                    flag = true;
                }
                container.IsSelected = selected;
            } finally {
                this.IsSelectionChangeActive = false;
            }
            if (!flag)
                return;
            this.SelectedItemChanged.Raise(this, new RoutedPropertyChangedEventArgs<any>(oldValue, newValue));
        }

        private UpdateSelectedValue(item: any) {
            if (!item) {
                this.ClearValue(TreeView.SelectedValueProperty);
                return;
            }

            var selectedValuePath = this.SelectedValuePath;
            if (!selectedValuePath) {
                this.SelectedValue = item;
            } else {
                var binding = new Data.Binding(selectedValuePath);
                binding.Source = item;
                var contentControl = new ContentControl();
                contentControl.SetBinding(ContentControl.ContentProperty, binding);
                this.SelectedValue = contentControl.Content;
                contentControl.ClearValue(ContentControl.ContentProperty);
            }
        }
        private SelectFirstItem() {
            var container = <TreeViewItem>this.ItemContainerGenerator.ContainerFromIndex(0);
            var selected = container instanceof TreeViewItem;
            if (!selected)
                container = this.SelectedContainer;
            this.ChangeSelection(selected ? this.ItemContainerGenerator.ItemFromContainer(container) : this.SelectedItem, container, selected);
        }
        private FocusFirstItem(): boolean {
            var tvi = <TreeViewItem>this.ItemContainerGenerator.ContainerFromIndex(0);
            if (!tvi)
                return false;
            if (!tvi.IsEnabled || !tvi.Focus())
                return tvi.FocusDown();
            return true;
        }
        private FocusLastItem(): boolean {
            for (var index = this.Items.Count - 1; index >= 0; --index) {
                var tvi = <TreeViewItem>this.ItemContainerGenerator.ContainerFromIndex(index);
                if (tvi instanceof TreeViewItem && tvi.IsEnabled)
                    return tvi.FocusInto();
            }
            return false;
        }
    }
    TemplateVisualStates(TreeView,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Pressed" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "FocusStates", Name: "Unfocused" },
        { GroupName: "FocusStates", Name: "Focused" },
        { GroupName: "ValidationStates", Name: "Valid" },
        { GroupName: "ValidationStates", Name: "InvalidUnfocused" },
        { GroupName: "ValidationStates", Name: "InvalidFocused" });

    Object.defineProperty(TreeView.prototype, "SelectedValue", {
        get: function () { return this.GetValue(TreeView.SelectedValueProperty); },
        set: function (value: any) {
            try {
                this._AllowWrite = true;
                this.SetValue(TreeView.SelectedValueProperty, value);
            } finally {
                this._AllowWrite = false;
            }
        }
    });
    
    Object.defineProperty(TreeView.prototype, "SelectedItem", {
        get: function () { return this.GetValue(TreeView.SelectedItemProperty); },
        set: function (value: any) {
            try {
                this._AllowWrite = true;
                this.SetValue(TreeView.SelectedItemProperty, value);
            } finally {
                this._AllowWrite = false;
            }
        }
    });
}