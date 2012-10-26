/// <reference path="Primitives/Selector.js" />
/// CODE
/// <reference path="ListBoxItem.js"/>
/// <reference path="Enums.js"/>
/// <reference path="../Core/Input/KeyboardNavigation.js"/>

//#region ListBox
var ListBox = Nullstone.Create("ListBox", Selector);

ListBox.Instance.Init = function () {
    this.Init$Selector();
    this.DefaultStyleKey = this.constructor;
    this._FocusedIndex = -1;
};

//#region Properties

ListBox.ItemContainerStyleProperty = DependencyProperty.RegisterCore("ItemContainerStyle", function () { return Style; }, ListBox, undefined, function (d, args) { d.OnItemContainerStyleChanged(args.OldValue, args.NewValue); });
ListBox.SelectionModeProperty = DependencyProperty.RegisterCore("SelectionMode", function () { return new Enum(SelectionMode); }, ListBox, undefined, function (d, args) { d._Selection.Mode = args.NewValue; });
ListBox.IsSelectionActiveProperty = Selector.IsSelectionActiveProperty;

Nullstone.AutoProperties(ListBox, [
    ListBox.ItemContainerStyleProperty,
    ListBox.SelectionModeProperty
]);

Nullstone.AutoPropertyReadOnly(ListBox, ListBox.IsSelectionActiveProperty, true);

Nullstone.Property(ListBox, "$IsVerticalOrientation", {
    get: function () {
        var p = this.$Panel;
        if (p instanceof StackPanel || p instanceof VirtualizingStackPanel)
            return p.Orientation === Orientation.Vertical;
        return true;
    }
});

//#endregion

ListBox.Instance.SelectAll = function () {
    this._Selection.SelectAll(this.Items);
};
ListBox.Instance.ScrollIntoView = function (item) {
    var tsv = this.$TemplateScrollViewer;
    if (tsv == null)
        return;
    var items = this.Items;
    if (!items.Contains(item))
        return;

    var ihro;
    var lbiro;
    //TODO: VirtualizingStackPanel
    var virtualizing = false; // VirtualizingStackPanel.GetIsVirtualizing(this);
    if (this._IsOnCurrentPage(item, ihro, lbiro))
        return;

    var ihr = ihro.Value;
    var lbir = lbiro.Value;

    if (this.$IsVerticalOrientation) {
        if (virtualizing) {
            tsv.ScrollToVerticalOffset(this.SelectedIndex);
            return;
        }
        var verticalOffset = tsv.VerticalOffset;
        var verticalDelta = 0;
        if (ihr.GetBottom() < lbir.GetBottom()) {
            verticalDelta = lbir.GetBottom() - ihr.GetBottom();
            verticalOffset += verticalDelta;
        }
        if ((lbir.Y - verticalDelta) < ihr.Y) {
            verticalOffset -= ihr.Y - (lbir.Y - verticalDelta);
        }
        tsv.ScrollToVerticalOffset(verticalOffset);
    } else {
        if (virtualizing) {
            tsv.ScrollToHorizontalOffset(this.SelectedIndex);
            return;
        }
        var horizontalOffset = tsv.HorizontalOffset;
        var horizontalDelta = 0;
        if (ihr.GetRight() < lbir.GetRight()) {
            horizontalDelta = lbir.GetRight() - ihr.GetRight();
            horizontalOffset += horizontalDelta;
        }
        if ((ihr.X - horizontalDelta) < ihr.X) {
            horizontalOffset -= ihr.X - (lbir.X - horizontalDelta);
        }
        tsv.ScrollToHorizontalOffset(horizontalOffset);
    }
};

ListBox.Instance._NavigateByPage = function (forward) {
    var tsv = this.$TemplateScrollViewer;
    var newFocusedIndex = -1;
    var item = (this._FocusedIndex !== -1) ? this.Items.GetValueAt(this._FocusedIndex) : null;
    if (item != null && !this._IsOnCurrentPage(item)) {
        this.ScrollIntoView(item);
        if (tsv != null)
            tsv.UpdateLayout();
    }
    if (item == null) {
        newFocusedIndex = this._GetFirstItemOnCurrentPage(this._FocusedIndex, forward);
    } else {
        var firstItemOnCurrentPage = this._GetFirstItemOnCurrentPage(this._FocusedIndex, forward);
        if (firstItemOnCurrentPage !== this._FocusedIndex) {
            newFocusedIndex = firstItemOnCurrentPage;
        } else {
            if (tsv != null) {
                if (this.$IsVerticalOrientation) {
                    tsv.ScrollToVerticalOffset(Math.max(0, Math.min(tsv.ScrollableHeight,
                        tsv.VerticalOffset + (tsv.ViewportHeight * (forward ? 1 : -1)))));
                } else {
                    tsv.ScrollToHorizontalOffset(Math.max(0, Math.min(tsv.ScrollableWidth,
                        tsv.HorizontalOffset + (tsv.ViewportWidth * (forward ? 1 : -1)))));

                }
                tsv.UpdateLayout();
            }
            newFocusedIndex = this._GetFirstItemOnCurrentPage(this._FocusedIndex, forward);
        }
    }
    return newFocusedIndex;
};
ListBox.Instance._ScrollInDirection = function (key) {
    if (this.$TemplateScrollViewer == null)
        return;
    this.$TemplateScrollViewer._ScrollInDirection(key);
};
ListBox.Instance._IsOnCurrentPage = function (item, itemsHostRectOut, listBoxItemsRectOut) {
    if (itemsHostRectOut === undefined) itemsHostRectOut = {};
    if (listBoxItemsRectOut === undefined) listBoxItemsRectOut = {};

    var itemsHost = VisualTreeHelper.GetChild(VisualTreeHelper.GetChild(this, 0), 0);

    var tsv = this.$TemplateScrollViewer;
    if (tsv != null) {
        itemsHost = tsv;
        if (tsv.$ElementScrollContentPresenter != null)
            itemsHost = tsv.$ElementScrollContentPresenter;
    }
    itemsHost = Nullstone.As(itemsHost, FrameworkElement);

    var ihro = itemsHostRectOut.Value = new Rect();
    var lbiro = listBoxItemsRectOut.Value = new Rect();
    if (itemsHost == null) {
        return false;
    }
    ihro.Width = itemsHost.RenderSize.Width;
    ihro.Height = itemsHost.RenderSize.Height;

    var lbi = this.ItemContainerGenerator.ContainerFromItem(item);
    if (lbi == null)
        return false;
    
    lbiro.Width = lbi.RenderSize.Width;
    lbiro.Height = lbi.RenderSize.Height;

    if (itemsHost instanceof Control) {
        var padding = itemsHost.Padding;
        ihro.X = ihro.X + padding.Left;
        ihro.Y = ihro.Y + padding.Top;
        ihro.Width = ihro.Width - padding.Left - padding.Right;
        ihro.Height = ihro.Height - padding.Top - padding.Bottom;
    }

    var genXform = lbi.TransformToVisual(itemsHost);
    if (genXform != null) {
        var ptl = genXform.Transform(new Point());
        var pbr = genXform.Transform(new Point(lbi.RenderSize.Width, lbi.RenderSize.Height));
        lbiro.X = Math.min(ptl.X, pbr.X);
        lbiro.Y = Math.min(ptl.Y, pbr.Y);
        lbiro.Width = Math.abs(ptl.X - pbr.X);
        lbiro.Height = Math.abs(ptl.Y - pbr.Y);
    }

    return this.$IsVerticalOrientation 
        ? ihro.X <= lbiro.Y && ihro.GetBottom() >= lbiro.GetBottom()
        : ihro.X <= lbiro.X && ihro.GetRight() >= lbiro.GetRight();
};
ListBox.Instance._GetFirstItemOnCurrentPage = function (startingIndex, forward) {
    var delta = forward ? 1 : -1;
    var fiocp = -1;
    var probeIndex = startingIndex;
    var items = this.Items;
    var itemsCount = items.GetCount();
    while (probeIndex >= 0 && probeIndex < itemsCount && !this._IsOnCurrentPage(items.GetValueAt(probeIndex))) {
        fiocp = probeIndex;
        probeIndex += delta;
    }
    while (probeIndex >= 0 && probeIndex < itemsCount && this._IsOnCurrentPage(items.GetValueAt(probeIndex))) {
        fiocp = probeIndex;
        probeIndex += delta;
    }
    return fiocp;
};

ListBox.Instance.OnItemContainerStyleChanged = function (oldStyle, newStyle) {
    var count = this.Items.GetCount();
    for (var i = 0; i < count; i++) {
        var lbi = this.ItemContainerGenerator.ContainerFromIndex(i);
        if (lbi != null && Nullstone.RefEquals(lbi.Style, oldStyle))
            lbi.Style = newStyle;
    }
};

ListBox.Instance.OnKeyDown = function (args) {
    if (args.Handled)
        return;

    var handled = false;
    var newFocusedIndex = -1;
    switch (args.Key) {
        case Key.Space:
        case Key.Enter:
            if (Key.Enter !== args.Key || KeyboardNavigation.GetAcceptsReturn(this)) {
                if ((Keyboard.Modifiers & ModifierKeys.Alt) !== ModifierKeys.Alt) {
                    var lbi = Nullstone.As(FocusManager.GetFocusedElement(), ListBoxItem);
                    if (lbi != null) {
                        if ((Keyboard.Modifiers & ModifierKeys.Control) === ModifierKeys.Control && lbi.IsSelected) {
                            this.SelectedItem = null;
                        } else {
                            this.SelectedItem = this.ItemContainerGenerator.ItemFromContainer(lbi);
                        }
                        handled = true;
                    }
                }
            }
            break;
        case Key.Home:
            newFocusedIndex = 0;
            break;
        case Key.End:
            newFocusedIndex = this.Items.GetCount() - 1;
            break;
        case Key.PageUp:
            newFocusedIndex = this._NavigateByPage(false);
            break;
        case Key.PageDown:
            newFocusedIndex = this._NavigateByPage(true);
            break;
        case Key.Left:
            if (this.$IsVerticalOrientation) {
                this._ScrollInDirection(Key.Left);
            } else {
                newFocusedIndex = this._FocusedIndex - 1;
            }
            break;
        case Key.Up:
            if (this.$IsVerticalOrientation) {
                newFocusedIndex = this._FocusedIndex - 1;
            } else {
                this._ScrollInDirection(Key.Up);
            }
            break;
        case Key.Right:
            if (this.$IsVerticalOrientation) {
                this._ScrollInDirection(Key.Right);
            } else {
                newFocusedIndex = this._FocusedIndex + 1;
            }
            break;
        case Key.Down:
            if (this.$IsVerticalOrientation) {
                newFocusedIndex = this._FocusedIndex + 1;
            } else {
                this._ScrollInDirection(Key.Down);
            }
            break;
    }

    if (newFocusedIndex !== -1 && this._FocusedIndex !== -1 && newFocusedIndex !== this._FocusedIndex && newFocusedIndex >= 0 && newFocusedIndex < this.Items.GetCount()) {
        // A key press changes the focused ListBoxItem
        var icg = this.ItemContainerGenerator;
        var lbi = icg.ContainerFromIndex(newFocusedIndex);
        var item = icg.ItemFromContainer(lbi);
        this.ScrollIntoView(item);
        if ((Keyboard.Modifiers & ModifierKeys.Control) === ModifierKeys.Control) {
            lbi.Focus();
        } else {
            this.SelectedItem = item;
        }
        handled = true;
    }
    if (handled)
        args.Handled = true;
};

//#region Overrides

ListBox.Instance.IsItemItsOwnContainer = function (item) {
    return item instanceof ListBoxItem;
};
ListBox.Instance.GetContainerForItem = function () {
    var item = new ListBoxItem();
    var ics = this.ItemContainerStyle;
    if (ics != null)
        item.Style = ics;
    return item;
};
ListBox.Instance.PrepareContainerForItem = function (element, item) {
    this.PrepareContainerForItem$Selector(element, item);
    var ics = this.ItemContainerStyle;
    if (element.Style == null && ics != null)
        element.Style = ics;
};

//#endregion

//#region Focus

ListBox.Instance.OnGotFocus = function (e) {
    this.OnGotFocus$Selector(e);
    this.$SetValueInternal(ListBox.IsSelectionActiveProperty, true);
};
ListBox.Instance.OnLostFocus = function (e) {
    this.OnLostFocus$Selector(e);
    this.$SetValueInternal(ListBox.IsSelectionActiveProperty, false);
};

//#endregion

//#region ListItem Notifications

ListBox.Instance.NotifyListItemGotFocus = function (lbi) {
    this._FocusedIndex = this.ItemContainerGenerator.IndexFromContainer(lbi);
};
ListBox.Instance.NotifyListItemLostFocus = function (lbi) {
    this._FocusedIndex = -1;
};

//#endregion

Nullstone.FinishCreate(ListBox);
//#endregion