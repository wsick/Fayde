/// <reference path="Primitives/Selector.js"/>
/// CODE
/// <reference path="ComboBoxItem.js"/>
/// <reference path="ContentPresenter.js"/>
/// <reference path="Primitives/ToggleButton.js"/>
/// <reference path="Primitives/Popup.js"/>

//#region ComboBox
var ComboBox = Nullstone.Create("ComboBox", Selector);

ComboBox.Instance.Init = function () {
    this.Init$Selector();
    this.DefaultStyleKey = this.constructor;

    this.DropDownClosed = new MulticastEvent();
    this.DropDownOpened = new MulticastEvent();

    this.SelectionChanged.Subscribe(this._OnSelectionChanged, this);
};

//#region Properties

ComboBox.IsDropDownOpenProperty = DependencyProperty.RegisterCore("IsDropDownOpen", function () { return Boolean; }, ComboBox, false, function (d, args) { d._IsDropDownOpenChanged(args); });
ComboBox.ItemContainerStyleProperty = DependencyProperty.RegisterCore("ItemContainerStyle", function () { return Style; }, ComboBox);
ComboBox.MaxDropDownHeightProperty = DependencyProperty.RegisterCore("MaxDropDownHeight", function () { return Number; }, ComboBox, Number.POSITIVE_INFINITY, function (d, args) { d._MaxDropDownHeightChanged(args); });
ComboBox.IsSelectionActiveProperty = Selector.IsSelectionActiveProperty;

Nullstone.AutoProperties(ComboBox, [
    ComboBox.IsDropDownOpenProperty,
    ComboBox.ItemContainerStyleProperty,
    ComboBox.MaxDropDownHeightProperty
]);

//#endregion

//#region Property Changed Handlers

ComboBox.Instance._IsDropDownOpenChanged = function (args) {
    var open = args.NewValue;

    if (this.$Popup != null)
        this.$Popup.IsOpen = open;
    if (this.$DropDownToggle != null)
        this.$DropDownToggle.IsChecked = open;

    if (open) {
        this._FocusedIndex = this.Items.GetCount > 0 ? Math.max(this.SelectedIndex, 0) : -1;
        if (this._FocusedIndex > -1) {
            var cbi = Nullstone.As(this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex), ComboBoxItem);
            if (cbi != null)
                cbi.Focus();
        }

        this.LayoutUpdated.Subscribe(this._UpdatePopupSizeAndPosition, this);
        this.DropDownOpened.Raise(this, new EventArgs());
    } else {
        this.Focus();
        this.LayoutUpdated.Unsubscribe(this._UpdatePopupSizeAndPosition, this);
        this.DropDownClosed.Raise(this, new EventArgs());
    }

    var selectedItem = this.SelectedItem;
    this._UpdateDisplayedItem(open && selectedItem instanceof UIElement ? null : selectedItem);
    this.$UpdateVisualState(true);
};
ComboBox.Instance._MaxDropDownHeightChanged = function (args) {
    this._UpdatePopupMaxHeight(args.NewValue);
};

//#endregion

ComboBox.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$Selector();
    this.$UpdateVisualState(false);

    this.$ContentPresenter = Nullstone.As(this.GetTemplateChild("ContentPresenter"), ContentPresenter);
    this.$Popup = Nullstone.As(this.GetTemplateChild("Popup"), Popup);
    this.$DropDownToggle = Nullstone.As(this.GetTemplateChild("DropDownToggle"), ToggleButton);

    if (this.$ContentPresenter != null)
        this._NullSelFallback = this.$ContentPresenter.Content;

    if (this.$Popup != null) {
        this._UpdatePopupMaxHeight(this.MaxDropDownHeight);
        this.$Popup._CatchClickedOutside();
        this.$Popup.ClickedOutside.Subscribe(this._PopupClickedOutside, this);
        
        var child = this.$Popup.Child;
        if (child != null) {
            child.KeyDown.Subscribe(this._OnChildKeyDown, this);
            this.$Popup.RealChild.SizeChanged.Subscribe(this._UpdatePopupSizeAndPosition, this);
        }
    }

    if (this.$DropDownToggle != null) {
        this.$DropDownToggle.Checked.Subscribe(this._OnToggleChecked, this);
        this.$DropDownToggle.Unchecked.Subscribe(this._OnToggleUnchecked, this);
    }

    this.$UpdateVisualState(false);
    this._UpdateDisplayedItem(this.SelectedItem);
};

//#region Selector Overrides

ComboBox.Instance.OnItemContainerStyleChanged = function (oldStyle, newStyle) {
    var items = this.Items;
    var count = items.GetCount();
    var icg = this.ItemContainerGenerator;
    for (var i = 0; i < count; i++) {
        var item = items.GetValueAt(i);
        var container = icg.ContainerFromIndex(i);
        if (container != null && !Nullstone.RefEquals(item, container))
            container.Style = newStyle;
    }
};
ComboBox.Instance.IsItemItsOwnContainer = function (item) {
    return item instanceof ComboBoxItem;
};
ComboBox.Instance.GetContainerForItem = function () {
    return new ComboBoxItem();
};
ComboBox.Instance.PrepareContainerForItem = function (element, item) {
    this.PrepareContainerForItem$Selector(element, item);
    if (!Nullstone.RefEquals(element, item)) {
        var ics = this.ItemContainerStyle;
        if (element.Style == null && ics != null)
            element.Style = ics;
    }
};

//#endregion

ComboBox.Instance.$GetVisualStateFocus = function () {
    var isEnabled = this.IsEnabled;
    if (this.IsDropDownOpen && isEnabled)
        return "FocusedDropDown";
    else if (this.IsFocused && isEnabled)
        return "Focused";
    else
        return "Unfocused";
};

ComboBox.Instance.OnIsEnabledChanged = function (e) {
    this.OnIsEnabledChanged$Selector(e);
    if (!this.IsEnabled)
        this.IsDropDownOpen = false;
};

//#region Mouse

ComboBox.Instance.OnMouseLeftButtonDown = function (sender, e) {
    this.OnMouseLeftButtonDown$Selector(sender, e);
    if (!e.Handled) {
        e.Handled = true;
        this.$SetValueInternal(ComboBox.IsSelectionActiveProperty, true);
        this.IsDropDownOpen = !this.IsDropDownOpen;
    }
};
ComboBox.Instance.OnMouseEnter = function (e) {
    this.OnMouseEnter$Selector(e);
    this.$UpdateVisualState(true);
};
ComboBox.Instance.OnMouseLeave = function (e) {
    this.OnMouseLeave$Selector(e);
    this.$UpdateVisualState(true);
};

//#endregion

//#region Keyboard

ComboBox.Instance.OnKeyDown = function (e) {
    this.OnKeyDown$Selector(e);
    if (e.Handled)
        return;
    e.Handled = true;

    var key = e.Key;
    if (this.FlowDirection === FlowDirection.RightToLeft) {
        if (key === Key.Left)
            key = Key.Right;
        else if (key === Key.Right)
            key = Key.Left;
    }
    switch (key) {
        case Key.Escape:
            this.IsDropDownOpen = false;
            break;
        case Key.Enter:
        case Key.Space:
            if (this.IsDropDownOpen && this._FocusedIndex !== this.SelectedIndex) {
                this.SelectedIndex = this._FocusedIndex;
                this.IsDropDownOpen = false;
            } else {
                this.IsDropDownOpen = true;
            }
            break;
        case Key.Right:
        case Key.Down:
            if (this.IsDropDownOpen) {
                if (this._FocusedIndex < (this.Items.GetCount() - 1)) {
                    this._FocusedIndex++;
                    this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex).Focus();
                }
            } else {
                this.SelectedIndex = Math.min(this.SelectedIndex + 1, this.Items.GetCount() - 1);
            }
            break;
        case Key.Left:
        case Key.Up:
            if (this.IsDropDownOpen) {
                if (this._FocusedIndex > 0) {
                    this._FocusedIndex--;
                    this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex).Focus();
                }
            } else {
                this.SelectedIndex = Math.max(this.SelectedIndex - 1, 0);
            }
            break;
        default:
            e.Handled = false;
            break;
    }
};

//#endregion

//#region Focus

ComboBox.Instance.OnGotFocus = function (e) {
    this.OnGotFocus$Selector(e);
    this.$UpdateVisualState(true);
};
ComboBox.Instance.OnLostFocus = function (e) {
    this.OnLostFocus$Selector(e);
    this.$SetValueInternal(ComboBox.IsSelectionActiveProperty, this.$Popup == null ? false : this.$Popup.IsOpen);
    this.$UpdateVisualState(true);
};

//#endregion

//#region External Event Handlers

ComboBox.Instance._OnChildKeyDown = function (sender, e) {
    this.OnKeyDown(e);
};
ComboBox.Instance._OnSelectionChanged = function (sender, args) {
    if (!this.IsDropDownOpen)
        this._UpdateDisplayedItem(this.SelectedItem);
};
ComboBox.Instance._OnToggleChecked = function (sender, e) { this.IsDropDownOpen = true; };
ComboBox.Instance._OnToggleUnchecked = function (sender, e) { this.IsDropDownOpen = false; };

//#endregion

ComboBox.Instance._PopupClickedOutside = function () {
    this.IsDropDownOpen = false;
};
ComboBox.Instance._UpdateDisplayedItem = function (selectedItem) {
    if (this.$ContentPresenter == null)
        return;

    if (this.$DisplayedItem != null) {
        this.$DisplayedItem.Content = this.$ContentPresenter.Content;
        this.$DisplayedItem = null;
    }
    this.$ContentPresenter.Content = null;

    if (selectedItem == null) {
        this.$ContentPresenter.Content = this._NullSelFallback;
        this.$ContentPresenter.ContentTemplate = null;
        this.$SelectionBoxItem = null;
        this.$SelectionBoxItemTemplate = null;
        return;
    }

    var content = selectedItem;
    if (content instanceof ComboBoxItem)
        content = content.Content;

    var icg = this.ItemContainerGenerator;
    var selectedIndex = this.SelectedIndex;
    this.$DisplayedItem = Nullstone.As(icg.ContainerFromIndex(selectedIndex), ComboBoxItem);

    this.$SelectionBoxItem = content;
    this.$SelectionBoxItemTemplate = this.ItemTemplate;

    if (this.$DisplayedItem != null) {
        this.$SelectionBoxItemTemplate = this.$DisplayedItem.ContentTemplate;
        if (content instanceof UIElement)
            this.$DisplayedItem.Content = null
        else
            this.$DisplayedItem = null;
    } else {
        var container = Nullstone.As(icg.ContainerFromIndex(selectedIndex), ComboBoxItem);
        if (container == null) {
            var position = icg.GeneratorPositionFromIndex(selectedIndex);
            var state = icg.StartAt(position.index, position.offset, 0, true);
            container = Nullstone.As(icg.GenerateNext({}), ComboBoxItem);
            icg.PrepareItemContainer(container);
        }
        this.$SelectionBoxItemTemplate = container.ContentTemplate;
    }

    this.$ContentPresenter.Content = this.$SelectionBoxItem;
    this.$ContentPresenter.ContentTemplate = this.$SelectionBoxItemTemplate;
};
ComboBox.Instance._UpdatePopupSizeAndPosition = function (sender, e) {
    if (this.$Popup == null)
        return;
    var child = this.$Popup.RealChild;
    if (!(child instanceof FrameworkElement))
        return;
    child.MinWidth = this.ActualWidth;

    var root = App.Instance.MainSurface.Root;
    if (root == null)
        return;
    try {
        var xform = this.TransformToVisual(null);
    } catch (err) {
        //Ignore ComboBox being detached
        return;
    }

    var offset = new Point(0, this.ActualHeight);
    var bottomRight = new Point(offset.X + child.ActualWidth, offset.Y + child.ActualHeight);

    var topLeft = xform.Transform(offset);
    bottomRight = xform.Transform(bottomRight);

    var isRightToLeft = (this.FlowDirection === FlowDirection.RightToLeft);
    if (isRightToLeft) {
        var left = bottomRight.X;
        bottomRight.X = topLeft.X;
        topLeft.X = left;
    }

    var finalOffset = new Point();
    var raw = root.ActualWidth;
    if (bottomRight.X > raw) {
        finalOffset.X = raw - bottomRight.X;
    } else if (topLeft.X < 0) {
        finalOffset.X = offset.X - topLeft.X;
    } else {
        finalOffset.X = offset.X;
    }

    if (isRightToLeft)
        finalOffset.X = -finalOffset.X;

    var rah = root.ActualHeight;
    if (bottomRight.Y > rah) {
        finalOffset.Y = -child.ActualHeight;
    } else {
        finalOffset.Y = this.RenderSize.Height;
    }

    this.$Popup.HorizontalOffset = finalOffset.X;
    this.$Popup.VerticalOffset = finalOffset.Y;

    this._UpdatePopupMaxHeight(this.MaxDropDownHeight);
};
ComboBox.Instance._UpdatePopupMaxHeight = function (height) {
    if (this.$Popup != null && this.$Popup.Child instanceof FrameworkElement) {
        if (height === Number.POSITIVE_INFINITY)
            height = App.Instance.MainSurface.ActualHeight / 2.0;
        this.$Popup.RealChild.MaxHeight = height;
    }
};

Nullstone.FinishCreate(ComboBox);
//#endregion