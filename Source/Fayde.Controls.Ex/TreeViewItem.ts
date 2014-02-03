/// <reference path="Fayde.d.ts" />

module Fayde.Controls {
    import NumericExtensions = Internal.NumericExtensions;
    import ScrollExtensions = Internal.ScrollExtensions;

    export class TreeViewItem extends HeaderedItemsControl {
        static HasItemsProperty = DependencyProperty.Register("HasItems", () => Boolean, TreeViewItem, false, (d, args) => (<TreeViewItem>d).OnHasItemsChanged(args));
        static IsExpandedProperty = DependencyProperty.Register("IsExpanded", () => Boolean, TreeViewItem, false, (d, args) => (<TreeViewItem>d).OnIsExpandedPropertyChanged(args));
        static IsSelectedProperty = DependencyProperty.Register("IsSelected", () => Boolean, TreeViewItem, false, (d, args) => (<TreeViewItem>d).OnIsSelectedChanged(args));
        static IsSelectionActiveProperty = DependencyProperty.Register("IsSelectionActive", () => Boolean, TreeViewItem, false, (d, args) => (<TreeViewItem>d).OnIsSelectionActiveChanged(args));

        get HasItems(): boolean { return this.GetValue(TreeViewItem.HasItemsProperty) === true; }
        set HasItems(value: boolean) {
            try {
                this._AllowWrite = true;
                this.SetValue(TreeViewItem.HasItemsProperty, value === true);
            } finally {
                this._AllowWrite = false;
            }
        }
        IsExpanded: boolean;
        IsSelected: boolean;
        get IsSelectionActive(): boolean { return this.GetValue(TreeViewItem.IsSelectionActiveProperty) === true; }
        set IsSelectionActive(value: boolean) {
            try {
                this._AllowWrite = true;
                this.SetValue(TreeViewItem.IsSelectionActiveProperty, value === true);
            } finally {
                this._AllowWrite = false;
            }
        }

        private OnHasItemsChanged(e: DependencyPropertyChangedEventArgs) {
            if (this.IgnorePropertyChange)
                this.IgnorePropertyChange = false;
            else if (!this._AllowWrite) {
                this.IgnorePropertyChange = true;
                this.SetValue(TreeViewItem.HasItemsProperty, e.OldValue);
                throw new InvalidOperationException("Cannot set read-only property HasItems.");
            } else
                this.UpdateVisualState(true);
        }
        private OnIsExpandedPropertyChanged(e: DependencyPropertyChangedEventArgs) {
            var newValue = e.NewValue === true;
            if (newValue)
                this.OnExpanded(new RoutedEventArgs());
            else
                this.OnCollapsed(new RoutedEventArgs());
            if (newValue) {
                if (this.ExpansionStateGroup != null || !this.UserInitiatedExpansion)
                    return;
                this.UserInitiatedExpansion = false;
                var parentTreeView = this.ParentTreeView;
                if (!parentTreeView)
                    return;
                parentTreeView.ItemsControlHelper.ScrollIntoView(this);
            } else {
                if (!this.ContainsSelection)
                    return;
                this.Focus();
            }
        }
        private OnIsSelectedChanged(e: DependencyPropertyChangedEventArgs) {
            if (this.IgnorePropertyChange) {
                this.IgnorePropertyChange = false;
            } else if (e.NewValue === true) {
                this.Select(true);
                this.OnSelected(new RoutedEventArgs());
            } else {
                this.Select(false);
                this.OnUnselected(new RoutedEventArgs());
            }
        }
        private OnIsSelectionActiveChanged(e: DependencyPropertyChangedEventArgs) {
            if (this.IgnorePropertyChange)
                this.IgnorePropertyChange = false;
            else if (!this._AllowWrite) {
                this.IgnorePropertyChange = true;
                this.SetValue(TreeViewItem.IsSelectionActiveProperty, e.OldValue);
                throw new InvalidOperationException("Cannot set read-only property IsSelectionActive.");
            } else
                this.UpdateVisualState(true);
        }

        Collapsed: RoutedEvent<RoutedEventArgs>;
        Expanded: RoutedEvent<RoutedEventArgs>;
        Selected: RoutedEvent<RoutedEventArgs>;
        Unselected: RoutedEvent<RoutedEventArgs>;

        private _AllowWrite = false;
        IgnorePropertyChange: boolean;
        private Interaction: Internal.InteractionHelper;
        private ContainsSelection: boolean;
        private CancelGotFocusBubble: boolean;
        RequiresContainsSelectionUpdate: boolean;
        private UserInitiatedExpansion: boolean;

        private _expanderButton: Primitives.ToggleButton;
        private get ExpanderButton(): Primitives.ToggleButton { return this._expanderButton; }
        private set ExpanderButton(value: Primitives.ToggleButton) {
            if (this._expanderButton) {
                this._expanderButton.Click.Unsubscribe(this.OnExpanderClick, this);
                this._expanderButton.GotFocus.Unsubscribe(this.OnExpanderGotFocus, this);
            }
            this._expanderButton = value;
            if (this._expanderButton) {
                this._expanderButton.IsChecked = this.IsExpanded;
                this._expanderButton.Click.Subscribe(this.OnExpanderClick, this);
                this._expanderButton.GotFocus.Subscribe(this.OnExpanderGotFocus, this);
            }
        }

        private _headerElement: FrameworkElement;
        get HeaderElement(): FrameworkElement { return this._headerElement; }
        set HeaderElement(value: FrameworkElement) {
            if (this._headerElement)
                this._headerElement.MouseLeftButtonDown.Unsubscribe(this.OnHeaderMouseLeftButtonDown, this);
            this._headerElement = value;
            if (this._headerElement)
                this._headerElement.MouseLeftButtonDown.Subscribe(this.OnHeaderMouseLeftButtonDown, this);
        }

        private _expansionStateGroup: Media.VSM.VisualStateGroup;
        private get ExpansionStateGroup(): Media.VSM.VisualStateGroup { return this._expansionStateGroup; }
        private set ExpansionStateGroup(value: Media.VSM.VisualStateGroup) {
            if (this._expansionStateGroup)
                this._expansionStateGroup.CurrentStateChanged.Unsubscribe(this.OnExpansionStateGroupStateChanged, this);
            this._expansionStateGroup = value;
            if (this._expansionStateGroup)
                this._expansionStateGroup.CurrentStateChanged.Subscribe(this.OnExpansionStateGroupStateChanged, this);
        }

        private _parentItemsControl: ItemsControl;
        get ParentItemsControl(): ItemsControl { return this._parentItemsControl; }
        set ParentItemsControl(value: ItemsControl) {
            if (this._parentItemsControl == value)
                return;
            this._parentItemsControl = value;
            var parentTreeView = this.ParentTreeView;
            if (parentTreeView == null)
                return;
            if (this.RequiresContainsSelectionUpdate) {
                this.RequiresContainsSelectionUpdate = false;
                this.UpdateContainsSelection(true);
            }
            parentTreeView.CheckForSelectedDescendents(this);
        }

        private get ParentTreeViewItem(): TreeViewItem {
            var pic = <TreeViewItem>this.ParentItemsControl;
            if (pic instanceof TreeViewItem)
                return pic;
        }

        private get ParentTreeView(): TreeView {
            for (var tvi = this; tvi != null; tvi = tvi.ParentTreeViewItem) {
                var treeView = <TreeView>tvi.ParentItemsControl;
                if (treeView instanceof TreeView)
                    return treeView;
            }
            return null;
        }

        private get IsRoot(): boolean { return this.ParentItemsControl instanceof TreeView; }
        private get CanExpandOnInput(): boolean { return this.HasItems && this.IsEnabled; }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.Interaction = new Internal.InteractionHelper(this);
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.ExpanderButton = <Primitives.ToggleButton>this.GetTemplateChild("ExpanderButton", Primitives.ToggleButton);
            this.HeaderElement = <FrameworkElement>this.GetTemplateChild("Header", FrameworkElement);
            this.ExpansionStateGroup = Internal.InteractionHelper.TryGetVisualStateGroup(this, "ExpansionStates");
            this.UpdateVisualState(false);
        }

        private OnExpansionStateGroupStateChanged(sender: any, e: Media.VSM.VisualStateChangedEventArgs) {
            if (e.NewState.Name && e.NewState.Name.toLowerCase() === "expanded")
                this.BringIntoView();
        }

        private BringIntoView() {
            if (!this.UserInitiatedExpansion)
                return;
            this.UserInitiatedExpansion = false;
            var parent = this.ParentTreeView;
            if (!parent)
                return;
            setTimeout(() => {
                parent.ItemsControlHelper.ScrollIntoView(this);
            }, 1);
        }

        GoToStates(gotoFunc: (state: string) => boolean) {
            gotoFunc(this.IsExpanded ? "Expanded" : "Collapsed");
            gotoFunc(this.HasItems ? "HasItems" : "NoItems");
            if (this.IsSelected)
                gotoFunc(this.IsSelectionActive ? "Selected" : "SelectedInactive");
            else
                gotoFunc("Unselected");
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
            super.PrepareContainerForItem(element, item);
        }
        ClearContainerForItem(element: DependencyObject, item: any) {
            var treeViewItem = <TreeViewItem>element;
            if (treeViewItem instanceof TreeViewItem)
                treeViewItem.ParentItemsControl = null;
            super.ClearContainerForItem(element, item);
        }

        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) {
            if (e == null)
                throw new ArgumentException("e");
            super.OnItemsChanged(e);
            this.HasItems = this.Items.Count > 0;
            if (e.NewItems != null) {
                for (var i = 0, items = <TreeViewItem[]>e.NewItems, len = items.length; i < len; i++) {
                    items[i].ParentItemsControl = this;
                }
            }
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Remove:
                case Collections.NotifyCollectionChangedAction.Reset:
                    if (this.ContainsSelection) {
                        var parentTreeView = this.ParentTreeView;
                        if (parentTreeView != null && !parentTreeView.IsSelectedContainerHookedUp) {
                            this.ContainsSelection = false;
                            this.Select(true);
                        }
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    if (this.ContainsSelection) {
                        var parentTreeView = this.ParentTreeView;
                        if (parentTreeView != null) {
                            var selectedItem = parentTreeView.SelectedItem;
                            if (selectedItem != null && (e.OldItems == null || Nullstone.Equals(selectedItem, e.OldItems[0])))
                                parentTreeView.ChangeSelection(selectedItem, parentTreeView.SelectedContainer, false);
                        }
                    }
                    break;
            }
            if (e.OldItems == null)
                return;
            for (var i = 0, items = <TreeViewItem[]>e.OldItems, len = items.length; i < len; i++) {
                items[i].ParentItemsControl = null;
            }
        }

        OnExpanded(e: RoutedEventArgs) {
            this.ToggleExpanded();
            this.Expanded.Raise(this, e);
        }
        OnCollapsed(e: RoutedEventArgs) {
            this.ToggleExpanded();
            this.Collapsed.Raise(this, e);
        }
        private ToggleExpanded() {
            var expanderButton = this.ExpanderButton;
            if (!expanderButton)
                return;
            expanderButton.IsChecked = this.IsExpanded;
            this.UpdateVisualState(true);
        }

        OnSelected(e: RoutedEventArgs) {
            this.UpdateVisualState(true);
            this.Selected.Raise(this, e);
        }
        OnUnselected(e: RoutedEventArgs) {
            this.UpdateVisualState(true);
            this.Unselected.Raise(this, e);
        }

        OnGotFocus(e: RoutedEventArgs) {
            var parentTreeViewItem = this.ParentTreeViewItem;
            if (parentTreeViewItem)
                parentTreeViewItem.CancelGotFocusBubble = true;
            try {
                if (!this.Interaction.AllowGotFocus(e) || this.CancelGotFocusBubble)
                    return;
                this.Select(true);
                this.IsSelectionActive = true;
                this.UpdateVisualState(true);
                super.OnGotFocus(e);
            } finally {
                this.CancelGotFocusBubble = false;
            }
        }
        OnLostFocus(e: RoutedEventArgs) {
            if (this.Interaction.AllowLostFocus(e)) {
                this.Interaction.OnLostFocusBase();
                super.OnLostFocus(e);
            }
            this.IsSelectionActive = false;
            this.UpdateVisualState(true);
        }
        private OnExpanderGotFocus(sender: any, e: RoutedEventArgs) {
            this.CancelGotFocusBubble = true;
            this.IsSelectionActive = true;
            this.UpdateVisualState(true);
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
        private OnHeaderMouseLeftButtonDown(sender: any, e: Input.MouseButtonEventArgs) {
            if (!this.Interaction.AllowMouseLeftButtonDown(e))
                return;
            if (!e.Handled && this.IsEnabled) {
                if (this.Focus())
                    e.Handled = true;
                if (this.Interaction.ClickCount % 2 === 0) {
                    var isExpanded = this.IsExpanded;
                    this.UserInitiatedExpansion = this.UserInitiatedExpansion || !isExpanded;
                    this.IsExpanded = !isExpanded;
                    e.Handled = true;
                }
            }
            this.UpdateVisualState(true);
            this.OnMouseLeftButtonDown(e);
        }
        private OnExpanderClick(sender: any, e: RoutedEventArgs) {
            var isExpanded = this.IsExpanded;
            this.UserInitiatedExpansion = this.UserInitiatedExpansion || !isExpanded;
            this.IsExpanded = !isExpanded;
        }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            if (e == null)
                throw new ArgumentException("e");
            var parentTreeView: TreeView;
            if (!e.Handled && (parentTreeView = this.ParentTreeView) != null && parentTreeView.HandleMouseButtonDown())
                e.Handled = true;
            super.OnMouseLeftButtonDown(e);
        }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            if (!this.Interaction.AllowMouseLeftButtonUp(e))
                return;
            this.UpdateVisualState(true);
            super.OnMouseLeftButtonUp(e);
        }

        OnKeyDown(e: Input.KeyEventArgs) {
            super.OnKeyDown(e);
            if (this.Interaction.AllowKeyDown(e)) {
                if (e.Handled)
                    return;
                switch (Internal.InteractionHelper.GetLogicalKey(this.FlowDirection, e.Key)) {
                    case Input.Key.Left:
                        if (!isControlKeyDown() && this.CanExpandOnInput && this.IsExpanded) {
                            if (this.IsFocused)
                                this.Focus();
                            else
                                this.IsExpanded = false;
                            e.Handled = true;
                            break;
                        }
                        else
                            break;
                    case Input.Key.Up:
                        if (!isControlKeyDown() && this.HandleUpKey()) {
                            e.Handled = true;
                            break;
                        }
                        else
                            break;
                    case Input.Key.Right:
                        if (!isControlKeyDown() && this.CanExpandOnInput) {
                            if (!this.IsExpanded) {
                                this.UserInitiatedExpansion = true;
                                this.IsExpanded = true;
                                e.Handled = true;
                                break;
                            }
                            else if (this.HandleDownKey()) {
                                e.Handled = true;
                                break;
                            }
                            else
                                break;
                        }
                        else
                            break;
                    case Input.Key.Down:
                        if (!isControlKeyDown() && this.HandleDownKey()) {
                            e.Handled = true;
                            break;
                        }
                        else
                            break;
                    case Input.Key.Add:
                        if (this.CanExpandOnInput && !this.IsExpanded) {
                            this.UserInitiatedExpansion = true;
                            this.IsExpanded = true;
                            e.Handled = true;
                            break;
                        }
                        else
                            break;
                    case Input.Key.Subtract:
                        if (this.CanExpandOnInput && this.IsExpanded) {
                            this.IsExpanded = false;
                            e.Handled = true;
                            break;
                        }
                        else
                            break;
                }
            }
            if (!this.IsRoot)
                return;
            var parentTreeView = this.ParentTreeView;
            if (!parentTreeView)
                return;
            parentTreeView.PropagateKeyDown(e);
        }
        HandleDownKey(): boolean {
            return this.AllowKeyHandleEvent() && this.FocusDown();
        }
        OnKeyUp(e: Input.KeyEventArgs) {
            if (!this.Interaction.AllowKeyUp(e))
                return;
            super.OnKeyUp(e);
        }
        HandleUpKey(): boolean {
            if (this.AllowKeyHandleEvent()) {
                var previousFocusableItem = this.FindPreviousFocusableItem();
                if (previousFocusableItem != null) {
                    if (previousFocusableItem != this.ParentItemsControl || previousFocusableItem != this.ParentTreeView)
                        return previousFocusableItem.Focus();
                    return true;
                }
            }
            return false;
        }

        HandleScrollByPage(up: boolean, scrollHost: ScrollViewer, viewportHeight: number, top: number, bottom: number, currentDelta: IOutValue): boolean {
            var closeEdge1: IOutValue = { Value: 0.0 };
            currentDelta.Value = calculateDelta(up, this, scrollHost, top, bottom, closeEdge1);
            if (NumericExtensions.IsGreaterThan(closeEdge1.Value, viewportHeight) || NumericExtensions.IsLessThanOrClose(currentDelta.Value, viewportHeight))
                return false;
            var flag1 = false;
            var headerElement = this.HeaderElement;
            if (headerElement != null && NumericExtensions.IsLessThanOrClose(calculateDelta(up, headerElement, scrollHost, top, bottom, { Value: 0 }), viewportHeight))
                flag1 = true;
            var tvi1: TreeViewItem = null;
            var count = this.Items.Count;
            var flag2 = up && this.ContainsSelection;
            var index = up ? count - 1 : 0;
            while (0 <= index && index < count) {
                var tvi2 = <TreeViewItem>this.ItemContainerGenerator.ContainerFromIndex(index);
                if (tvi2 instanceof TreeViewItem && tvi2.IsEnabled) {
                    if (flag2) {
                        if (tvi2.IsSelected) {
                            flag2 = false;
                            index += up ? -1 : 1;
                            continue;
                        } else if (tvi2.ContainsSelection) {
                            flag2 = false;
                        } else {
                            index += up ? -1 : 1;
                            continue;
                        }
                    }
                    var currentDelta1: IOutValue = { Value: 0 };
                    if (tvi2.HandleScrollByPage(up, scrollHost, viewportHeight, top, bottom, currentDelta1))
                        return true;
                    if (!NumericExtensions.IsGreaterThan(currentDelta1.Value, viewportHeight))
                        tvi1 = tvi2;
                    else
                        break;
                }
                index += up ? -1 : 1;
            }
            if (tvi1 != null) {
                if (up)
                    return tvi1.Focus();
                return tvi1.FocusInto();
            } else if (flag1)
                return this.Focus();
            return false;
        }


        private Select(selected: boolean) {
            var parentTreeView = this.ParentTreeView;
            if (!parentTreeView || parentTreeView.IsSelectionChangeActive)
                return;
            var parentTreeViewItem = this.ParentTreeViewItem;
            var itemOrContainer = parentTreeViewItem != null ? parentTreeViewItem.ItemContainerGenerator.ItemFromContainer(this) : parentTreeView.ItemContainerGenerator.ItemFromContainer(this);
            parentTreeView.ChangeSelection(itemOrContainer, this, selected);
        }

        UpdateContainsSelection(selected: boolean) {
            for (var parentTreeViewItem = this.ParentTreeViewItem; parentTreeViewItem != null; parentTreeViewItem = parentTreeViewItem.ParentTreeViewItem)
                parentTreeViewItem.ContainsSelection = selected;
        }

        private AllowKeyHandleEvent(): boolean {
            return this.IsSelected;
        }

        FocusDown(): boolean {
            var nextFocusableItem = this.FindNextFocusableItem(true);
            return nextFocusableItem && nextFocusableItem.Focus();
        }
        FocusInto(): boolean {
            var lastFocusableItem = this.FindLastFocusableItem();
            return lastFocusableItem && lastFocusableItem.Focus();
        }

        private FindNextFocusableItem(recurse: boolean): TreeViewItem {
            if (recurse && this.IsExpanded && this.HasItems) {
                var treeViewItem = <TreeViewItem>this.ItemContainerGenerator.ContainerFromIndex(0);
                if (treeViewItem instanceof TreeViewItem) {
                    if (!treeViewItem.IsEnabled)
                        return treeViewItem.FindNextFocusableItem(false);
                    return treeViewItem;
                }
            }
            var parentItemsControl = this.ParentItemsControl;
            if (parentItemsControl != null) {
                var index = parentItemsControl.ItemContainerGenerator.IndexFromContainer(this);
                var count = parentItemsControl.Items.Count;
                while (index++ < count) {
                    var treeViewItem = <TreeViewItem>parentItemsControl.ItemContainerGenerator.ContainerFromIndex(index);
                    if (treeViewItem instanceof TreeViewItem && treeViewItem.IsEnabled)
                        return treeViewItem;
                }
                var parentTreeViewItem = this.ParentTreeViewItem;
                if (parentTreeViewItem instanceof TreeViewItem)
                    return parentTreeViewItem.FindNextFocusableItem(false);
            }
            return null;
        }
        private FindLastFocusableItem(): TreeViewItem {
            var tvi1 = this;
            var tvi2: TreeViewItem = null;
            for (var index = -1; tvi1 instanceof TreeViewItem; tvi1 = <TreeViewItem>tvi2.ItemContainerGenerator.ContainerFromIndex(index)) {
                if (tvi1.IsEnabled) {
                    if (!tvi1.IsExpanded || !tvi1.HasItems)
                        return tvi1;
                    tvi2 = tvi1;
                    index = tvi1.Items.Count - 1;
                }
                else if (index > 0)
                    --index;
                else
                    break;
            }
            return tvi2;
        }
        private FindPreviousFocusableItem(): ItemsControl {
            var parentItemsControl = this.ParentItemsControl;
            if (!parentItemsControl)
                return null;
            var index = parentItemsControl.ItemContainerGenerator.IndexFromContainer(this);
            while (index-- > 0) {
                var treeViewItem = <TreeViewItem>parentItemsControl.ItemContainerGenerator.ContainerFromIndex(index);
                if (treeViewItem instanceof TreeViewItem && treeViewItem.IsEnabled) {
                    var lastFocusableItem = treeViewItem.FindLastFocusableItem();
                    if (lastFocusableItem != null)
                        return lastFocusableItem;
                }
            }
            return parentItemsControl;
        }
    }
    Fayde.RegisterType(TreeViewItem, "TreeViewItem", Fayde.XMLNS);

    function calculateDelta(up: boolean, element: FrameworkElement, scrollHost: ScrollViewer, top: number, bottom: number, closeEdge: IOutValue): number {
        var top1: IOutValue = { Value: 0 };
        var bottom1: IOutValue = { Value: 0 };
        ScrollExtensions.GetTopAndBottom(element, scrollHost, top1, bottom1);
        var ce = 0;
        if (up) {
            ce = bottom - bottom1.Value;
            return bottom - top1.Value;
        } else {
            ce = top1.Value - top;
            return bottom1.Value - top;
        }
        closeEdge.Value = ce;
    }
    function isControlKeyDown(): boolean {
        return (Input.Keyboard.Modifiers & Input.ModifierKeys.Control) === Input.ModifierKeys.Control;
    }
}