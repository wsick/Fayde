/// <reference path="Primitives/Selector.ts" />
/// CODE
/// <reference path="Primitives/ToggleButton.ts" />
/// <reference path="ComboBoxItem.ts" />

module Fayde.Controls {
    export class ComboBox extends Primitives.Selector {
        DropDownOpened: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
        DropDownClosed: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();

        static IsDropDownOpenProperty = DependencyProperty.Register("IsDropDownOpen", () => Boolean, ComboBox, false, (d, args) => (<ComboBox>d)._IsDropDownOpenChanged(args));
        static ItemContainerStyleProperty = DependencyProperty.RegisterCore("ItemContainerStyle", () => Style, ComboBox, undefined, (d, args) => (<ListBox>d).OnItemContainerStyleChanged(args));
        static MaxDropDownHeightProperty = DependencyProperty.Register("MaxDropDownHeight", () => Number, ComboBox, Number.POSITIVE_INFINITY, (d, args) => (<ComboBox>d)._MaxDropDownHeightChanged(args));
        static IsSelectionActiveProperty = Primitives.Selector.IsSelectionActiveProperty;
        IsDropDownOpen: bool;
        ItemContainerStyle: Style;
        MaxDropDownHeight: number;

        private $ContentPresenter: ContentPresenter;
        private $Popup: Primitives.Popup;
        private $DropDownToggle: Primitives.ToggleButton;
        private $DisplayedItem: ComboBoxItem = null;
        private $SelectionBoxItem: any = null;
        private $SelectionBoxItemTemplate: DataTemplate = null;
        private _NullSelFallback: any;
        private _FocusedIndex: number = -1;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        private _IsDropDownOpenChanged(args: IDependencyPropertyChangedEventArgs) {
            var open = args.NewValue;

            if (this.$Popup != null)
                this.$Popup.IsOpen = open;
            if (this.$DropDownToggle != null)
                this.$DropDownToggle.IsChecked = open;

            if (open) {
                this._FocusedIndex = this.Items.Count > 0 ? Math.max(this.SelectedIndex, 0) : -1;
                if (this._FocusedIndex > -1) {
                    var focusedItem = this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex);
                    if (focusedItem instanceof ComboBoxItem)
                        (<ComboBoxItem>focusedItem).Focus();
                }

                this.LayoutUpdated.Subscribe(this._UpdatePopupSizeAndPosition, this);
                this.DropDownOpened.Raise(this, EventArgs.Empty);
            } else {
                this.Focus();
                this.LayoutUpdated.Unsubscribe(this._UpdatePopupSizeAndPosition, this);
                this.DropDownClosed.Raise(this, EventArgs.Empty);
            }

            var selectedItem = this.SelectedItem;
            this._UpdateDisplayedItem(open && selectedItem instanceof Fayde.UIElement ? null : selectedItem);
            this.UpdateVisualState(true);
        }
        private _MaxDropDownHeightChanged(args: IDependencyPropertyChangedEventArgs) {
            this._UpdatePopupMaxHeight(args.NewValue);
        }
        
        private _GetChildOfType(name: string, type: Function): any {
            var temp = this.GetTemplateChild(name);
            if (temp instanceof type)
                return temp;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);

            this.$ContentPresenter = this._GetChildOfType("ContentPresenter", ContentPresenter);
            this.$Popup = this._GetChildOfType("Popup", Primitives.Popup);
            this.$DropDownToggle = this._GetChildOfType("DropDownToggle", Primitives.ToggleButton);

            if (this.$ContentPresenter != null)
                this._NullSelFallback = this.$ContentPresenter.Content;

            if (this.$Popup != null) {
                this._UpdatePopupMaxHeight(this.MaxDropDownHeight);
                this.$Popup.XamlNode.CatchClickedOutside();
                this.$Popup.ClickedOutside.Subscribe(this._PopupClickedOutside, this);

                var child = this.$Popup.Child;
                if (child != null) {
                    child.KeyDown.Subscribe(this._OnChildKeyDown, this);
                    (<FrameworkElement>child).SizeChanged.Subscribe(this._UpdatePopupSizeAndPosition, this);
                }
            }

            if (this.$DropDownToggle != null) {
                this.$DropDownToggle.Checked.Subscribe(this._OnToggleChecked, this);
                this.$DropDownToggle.Unchecked.Subscribe(this._OnToggleUnchecked, this);
            }

            this.UpdateVisualState(false);
            this._UpdateDisplayedItem(this.SelectedItem);
        }

        OnItemContainerStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            var newStyle = <Style>args.NewValue;
            var items = this.Items;
            var count = items.Count;
            var icg = this.ItemContainerGenerator;
            for (var i = 0; i < count; i++) {
                var item = items.GetValueAt(i);
                var container = <FrameworkElement>icg.ContainerFromIndex(i);
                if (container && item !== container)
                    container.Style = newStyle;
            }
        }
        IsItemItsOwnContainer(item: any): bool {
            return item instanceof ComboBoxItem;
        }
        GetContainerForItem(): DependencyObject {
            return new ComboBoxItem();
        }
        PrepareContainerForItem(container: DependencyObject, item: any) {
            super.PrepareContainerForItem(container, item);
            var cbi = <ComboBoxItem>container;
            if (cbi !== item) {
                var ics = this.ItemContainerStyle;
                if (!cbi.Style && ics)
                    cbi.Style = ics;
            }
        }

        GetVisualStateFocus(): string {
            var isEnabled = this.IsEnabled;
            if (this.IsDropDownOpen && isEnabled)
                return "FocusedDropDown";
            else if (this.IsFocused && isEnabled)
                return "Focused";
            else
                return "Unfocused";
        }

        OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs) {
            super.OnIsEnabledChanged(e);
            if (!this.IsEnabled)
                this.IsDropDownOpen = false;
        }

        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
            if (!e.Handled) {
                e.Handled = true;
                this.SetValueInternal(ComboBox.IsSelectionActiveProperty, true);
                this.IsDropDownOpen = !this.IsDropDownOpen;
            }
        }
        OnMouseEnter(e: Input.MouseEventArgs) {
            super.OnMouseEnter(e);
            this.UpdateVisualState(true);
        }
        OnMouseLeave(e: Input.MouseEventArgs) {
            super.OnMouseLeave(e);
            this.UpdateVisualState(true);
        }
        OnKeyDown(e: Input.KeyEventArgs) {
            super.OnKeyDown(e);
            if (e.Handled)
                return;
            e.Handled = true;

            var key = e.Key;
            if (this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                if (key === Input.Key.Left)
                    key = Input.Key.Right;
                else if (key === Input.Key.Right)
                    key = Input.Key.Left;
            }
            switch (key) {
                case Input.Key.Escape:
                    this.IsDropDownOpen = false;
                    break;
                case Input.Key.Enter:
                case Input.Key.Space:
                    if (this.IsDropDownOpen && this._FocusedIndex !== this.SelectedIndex) {
                        this.SelectedIndex = this._FocusedIndex;
                        this.IsDropDownOpen = false;
                    } else {
                        this.IsDropDownOpen = true;
                    }
                    break;
                case Input.Key.Right:
                case Input.Key.Down:
                    if (this.IsDropDownOpen) {
                        if (this._FocusedIndex < (this.Items.Count - 1)) {
                            this._FocusedIndex++;
                            (<UIElement>this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex)).Focus();
                        }
                    } else {
                        this.SelectedIndex = Math.min(this.SelectedIndex + 1, this.Items.Count - 1);
                    }
                    break;
                case Input.Key.Left:
                case Input.Key.Up:
                    if (this.IsDropDownOpen) {
                        if (this._FocusedIndex > 0) {
                            this._FocusedIndex--;
                            (<UIElement>this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex)).Focus();
                        }
                    } else {
                        this.SelectedIndex = Math.max(this.SelectedIndex - 1, 0);
                    }
                    break;
                default:
                    e.Handled = false;
                    break;
            }
        }
        OnGotFocus(e: RoutedEventArgs) {
            super.OnGotFocus(e);
            this.UpdateVisualState(true);
        }
        OnLostFocus(e: RoutedEventArgs) {
            super.OnLostFocus(e);
            this.SetValueInternal(ComboBox.IsSelectionActiveProperty, this.$Popup == null ? false : this.$Popup.IsOpen);
            this.UpdateVisualState(true);
        }

        private _OnChildKeyDown(sender, e: Input.KeyEventArgs) {
            this.OnKeyDown(e);
        }
        OnSelectionChanged(e: Primitives.SelectionChangedEventArgs) {
            if (!this.IsDropDownOpen)
                this._UpdateDisplayedItem(this.SelectedItem);
        }
        private _OnToggleChecked(sender, e) { this.IsDropDownOpen = true; }
        private _OnToggleUnchecked(sender, e) { this.IsDropDownOpen = false; }

        private _PopupClickedOutside() {
            this.IsDropDownOpen = false;
        }
        private _UpdateDisplayedItem(selectedItem: any) {
            if (!this.$ContentPresenter)
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
            var temp = icg.ContainerFromIndex(selectedIndex);
            if (temp instanceof ComboBoxItem) this.$DisplayedItem = <ComboBoxItem>temp;

            this.$SelectionBoxItem = content;
            this.$SelectionBoxItemTemplate = this.ItemTemplate;

            if (this.$DisplayedItem != null) {
                this.$SelectionBoxItemTemplate = this.$DisplayedItem.ContentTemplate;
                if (content instanceof Fayde.UIElement)
                    this.$DisplayedItem.Content = null
                else
                    this.$DisplayedItem = null;
            } else {
                temp = icg.ContainerFromIndex(selectedIndex);
                var container: ComboBoxItem;
                if (temp instanceof ComboBoxItem) container = <ComboBoxItem>temp;
                if (!container) {
                    var position = icg.GeneratorPositionFromIndex(selectedIndex);
                    var state = icg.StartAt(position, false, true);
                    try {
                        temp = icg.GenerateNext({ Value: null });
                        if (temp instanceof ComboBoxItem) container = <ComboBoxItem>temp;
                    } finally {
                        state.Dispose();
                    }
                    icg.PrepareItemContainer(container);
                }
                this.$SelectionBoxItemTemplate = container.ContentTemplate;
            }

            this.$ContentPresenter.Content = this.$SelectionBoxItem;
            this.$ContentPresenter.ContentTemplate = this.$SelectionBoxItemTemplate;
        }
        private _UpdatePopupSizeAndPosition(sender, e: EventArgs) {
            var popup = this.$Popup;
            if (!popup)
                return;
            var child = <FrameworkElement>popup.Child;
            if (!(child instanceof FrameworkElement))
                return;

            child.MinWidth = this.ActualWidth;

            var root = <FrameworkElement>VisualTreeHelper.GetRoot(this);
            if (!root)
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

            popup.HorizontalOffset = finalOffset.X;
            popup.VerticalOffset = finalOffset.Y;

            this._UpdatePopupMaxHeight(this.MaxDropDownHeight);
        }
        private _UpdatePopupMaxHeight(height: number) {
            var child: FrameworkElement;
            if (this.$Popup && (child = <FrameworkElement>this.$Popup.Child) && child instanceof FrameworkElement) {
                if (height === Number.POSITIVE_INFINITY)
                    height = App.Current.MainSurface.Extents.Height / 2.0;
                child.MaxHeight = height;
            }
        }
    }
    Nullstone.RegisterType(ComboBox, "ComboBox");
}