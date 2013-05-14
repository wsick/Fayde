var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/Selector.ts" />
    /// CODE
    /// <reference path="Primitives/ToggleButton.ts" />
    /// <reference path="ComboBoxItem.ts" />
    (function (Controls) {
        var ComboBox = (function (_super) {
            __extends(ComboBox, _super);
            function ComboBox() {
                        _super.call(this);
                this.DropDownOpened = new MulticastEvent();
                this.DropDownClosed = new MulticastEvent();
                this.$DisplayedItem = null;
                this.$SelectionBoxItem = null;
                this.$SelectionBoxItemTemplate = null;
                this._FocusedIndex = -1;
                this.DefaultStyleKey = (this).constructor;
            }
            ComboBox.IsDropDownOpenProperty = DependencyProperty.Register("IsDropDownOpen", function () {
                return Boolean;
            }, ComboBox, false, function (d, args) {
                return (d)._IsDropDownOpenChanged(args);
            });
            ComboBox.ItemContainerStyleProperty = DependencyProperty.RegisterCore("ItemContainerStyle", function () {
                return Fayde.Style;
            }, ComboBox, undefined, function (d, args) {
                return (d).OnItemContainerStyleChanged(args);
            });
            ComboBox.MaxDropDownHeightProperty = DependencyProperty.Register("MaxDropDownHeight", function () {
                return Number;
            }, ComboBox, Number.POSITIVE_INFINITY, function (d, args) {
                return (d)._MaxDropDownHeightChanged(args);
            });
            ComboBox.IsSelectionActiveProperty = Controls.Primitives.Selector.IsSelectionActiveProperty;
            ComboBox.prototype._IsDropDownOpenChanged = function (args) {
                var open = args.NewValue;
                if(this.$Popup != null) {
                    this.$Popup.IsOpen = open;
                }
                if(this.$DropDownToggle != null) {
                    this.$DropDownToggle.IsChecked = open;
                }
                if(open) {
                    this._FocusedIndex = this.Items.Count > 0 ? Math.max(this.SelectedIndex, 0) : -1;
                    if(this._FocusedIndex > -1) {
                        var focusedItem = this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex);
                        if(focusedItem instanceof Controls.ComboBoxItem) {
                            (focusedItem).Focus();
                        }
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
            };
            ComboBox.prototype._MaxDropDownHeightChanged = function (args) {
                this._UpdatePopupMaxHeight(args.NewValue);
            };
            ComboBox.prototype._GetChildOfType = function (name, type) {
                var temp = this.GetTemplateChild(name);
                if(temp instanceof type) {
                    return temp;
                }
            };
            ComboBox.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this.UpdateVisualState(false);
                this.$ContentPresenter = this._GetChildOfType("ContentPresenter", Controls.ContentPresenter);
                this.$Popup = this._GetChildOfType("Popup", Controls.Primitives.Popup);
                this.$DropDownToggle = this._GetChildOfType("DropDownToggle", Controls.Primitives.ToggleButton);
                if(this.$ContentPresenter != null) {
                    this._NullSelFallback = this.$ContentPresenter.Content;
                }
                if(this.$Popup != null) {
                    this._UpdatePopupMaxHeight(this.MaxDropDownHeight);
                    this.$Popup.XamlNode.CatchClickedOutside();
                    this.$Popup.ClickedOutside.Subscribe(this._PopupClickedOutside, this);
                    var child = this.$Popup.Child;
                    if(child != null) {
                        child.KeyDown.Subscribe(this._OnChildKeyDown, this);
                        (child).SizeChanged.Subscribe(this._UpdatePopupSizeAndPosition, this);
                    }
                }
                if(this.$DropDownToggle != null) {
                    this.$DropDownToggle.Checked.Subscribe(this._OnToggleChecked, this);
                    this.$DropDownToggle.Unchecked.Subscribe(this._OnToggleUnchecked, this);
                }
                this.UpdateVisualState(false);
                this._UpdateDisplayedItem(this.SelectedItem);
            };
            ComboBox.prototype.OnItemContainerStyleChanged = function (args) {
                var newStyle = args.NewValue;
                var items = this.Items;
                var count = items.Count;
                var icg = this.ItemContainerGenerator;
                for(var i = 0; i < count; i++) {
                    var item = items.GetValueAt(i);
                    var container = icg.ContainerFromIndex(i);
                    if(container && item !== container) {
                        container.Style = newStyle;
                    }
                }
            };
            ComboBox.prototype.IsItemItsOwnContainer = function (item) {
                return item instanceof Controls.ComboBoxItem;
            };
            ComboBox.prototype.GetContainerForItem = function () {
                return new Controls.ComboBoxItem();
            };
            ComboBox.prototype.PrepareContainerForItem = function (container, item) {
                _super.prototype.PrepareContainerForItem.call(this, container, item);
                var cbi = container;
                if(cbi !== item) {
                    var ics = this.ItemContainerStyle;
                    if(!cbi.Style && ics) {
                        cbi.Style = ics;
                    }
                }
            };
            ComboBox.prototype.GetVisualStateFocus = function () {
                var isEnabled = this.IsEnabled;
                if(this.IsDropDownOpen && isEnabled) {
                    return "FocusedDropDown";
                } else if(this.IsFocused && isEnabled) {
                    return "Focused";
                } else {
                    return "Unfocused";
                }
            };
            ComboBox.prototype.OnIsEnabledChanged = function (e) {
                _super.prototype.OnIsEnabledChanged.call(this, e);
                if(!this.IsEnabled) {
                    this.IsDropDownOpen = false;
                }
            };
            ComboBox.prototype.OnMouseLeftButtonDown = function (e) {
                _super.prototype.OnMouseLeftButtonDown.call(this, e);
                if(!e.Handled) {
                    e.Handled = true;
                    this.SetValueInternal(ComboBox.IsSelectionActiveProperty, true);
                    this.IsDropDownOpen = !this.IsDropDownOpen;
                }
            };
            ComboBox.prototype.OnMouseEnter = function (e) {
                _super.prototype.OnMouseEnter.call(this, e);
                this.UpdateVisualState(true);
            };
            ComboBox.prototype.OnMouseLeave = function (e) {
                _super.prototype.OnMouseLeave.call(this, e);
                this.UpdateVisualState(true);
            };
            ComboBox.prototype.OnKeyDown = function (e) {
                _super.prototype.OnKeyDown.call(this, e);
                if(e.Handled) {
                    return;
                }
                e.Handled = true;
                var key = e.Key;
                if(this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                    if(key === Fayde.Input.Key.Left) {
                        key = Fayde.Input.Key.Right;
                    } else if(key === Fayde.Input.Key.Right) {
                        key = Fayde.Input.Key.Left;
                    }
                }
                switch(key) {
                    case Fayde.Input.Key.Escape:
                        this.IsDropDownOpen = false;
                        break;
                    case Fayde.Input.Key.Enter:
                    case Fayde.Input.Key.Space:
                        if(this.IsDropDownOpen && this._FocusedIndex !== this.SelectedIndex) {
                            this.SelectedIndex = this._FocusedIndex;
                            this.IsDropDownOpen = false;
                        } else {
                            this.IsDropDownOpen = true;
                        }
                        break;
                    case Fayde.Input.Key.Right:
                    case Fayde.Input.Key.Down:
                        if(this.IsDropDownOpen) {
                            if(this._FocusedIndex < (this.Items.Count - 1)) {
                                this._FocusedIndex++;
                                (this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex)).Focus();
                            }
                        } else {
                            this.SelectedIndex = Math.min(this.SelectedIndex + 1, this.Items.Count - 1);
                        }
                        break;
                    case Fayde.Input.Key.Left:
                    case Fayde.Input.Key.Up:
                        if(this.IsDropDownOpen) {
                            if(this._FocusedIndex > 0) {
                                this._FocusedIndex--;
                                (this.ItemContainerGenerator.ContainerFromIndex(this._FocusedIndex)).Focus();
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
            ComboBox.prototype.OnGotFocus = function (e) {
                _super.prototype.OnGotFocus.call(this, e);
                this.UpdateVisualState(true);
            };
            ComboBox.prototype.OnLostFocus = function (e) {
                _super.prototype.OnLostFocus.call(this, e);
                this.SetValueInternal(ComboBox.IsSelectionActiveProperty, this.$Popup == null ? false : this.$Popup.IsOpen);
                this.UpdateVisualState(true);
            };
            ComboBox.prototype._OnChildKeyDown = function (sender, e) {
                this.OnKeyDown(e);
            };
            ComboBox.prototype.OnSelectionChanged = function (e) {
                if(!this.IsDropDownOpen) {
                    this._UpdateDisplayedItem(this.SelectedItem);
                }
            };
            ComboBox.prototype._OnToggleChecked = function (sender, e) {
                this.IsDropDownOpen = true;
            };
            ComboBox.prototype._OnToggleUnchecked = function (sender, e) {
                this.IsDropDownOpen = false;
            };
            ComboBox.prototype._PopupClickedOutside = function () {
                this.IsDropDownOpen = false;
            };
            ComboBox.prototype._UpdateDisplayedItem = function (selectedItem) {
                if(!this.$ContentPresenter) {
                    return;
                }
                if(this.$DisplayedItem != null) {
                    this.$DisplayedItem.Content = this.$ContentPresenter.Content;
                    this.$DisplayedItem = null;
                }
                this.$ContentPresenter.Content = null;
                if(selectedItem == null) {
                    this.$ContentPresenter.Content = this._NullSelFallback;
                    this.$ContentPresenter.ContentTemplate = null;
                    this.$SelectionBoxItem = null;
                    this.$SelectionBoxItemTemplate = null;
                    return;
                }
                var content = selectedItem;
                if(content instanceof Controls.ComboBoxItem) {
                    content = content.Content;
                }
                var icg = this.ItemContainerGenerator;
                var selectedIndex = this.SelectedIndex;
                var temp = icg.ContainerFromIndex(selectedIndex);
                if(temp instanceof Controls.ComboBoxItem) {
                    this.$DisplayedItem = temp;
                }
                this.$SelectionBoxItem = content;
                this.$SelectionBoxItemTemplate = this.ItemTemplate;
                if(this.$DisplayedItem != null) {
                    this.$SelectionBoxItemTemplate = this.$DisplayedItem.ContentTemplate;
                    if(content instanceof Fayde.UIElement) {
                        this.$DisplayedItem.Content = null;
                    } else {
                        this.$DisplayedItem = null;
                    }
                } else {
                    temp = icg.ContainerFromIndex(selectedIndex);
                    var container;
                    if(temp instanceof Controls.ComboBoxItem) {
                        container = temp;
                    }
                    if(!container) {
                        var position = icg.GeneratorPositionFromIndex(selectedIndex);
                        var state = icg.StartAt(position.index, position.offset, 0, true);
                        try  {
                            temp = icg.GenerateNext({
                                Value: null
                            });
                            if(temp instanceof Controls.ComboBoxItem) {
                                container = temp;
                            }
                        }finally {
                            state.Dispose();
                        }
                        icg.PrepareItemContainer(container);
                    }
                    this.$SelectionBoxItemTemplate = container.ContentTemplate;
                }
                this.$ContentPresenter.Content = this.$SelectionBoxItem;
                this.$ContentPresenter.ContentTemplate = this.$SelectionBoxItemTemplate;
            };
            ComboBox.prototype._UpdatePopupSizeAndPosition = function (sender, e) {
                var popup = this.$Popup;
                if(!popup) {
                    return;
                }
                var child = popup.Child;
                if(!(child instanceof Fayde.FrameworkElement)) {
                    return;
                }
                child.MinWidth = this.ActualWidth;
                var root = Fayde.VisualTreeHelper.GetRoot(this);
                if(!root) {
                    return;
                }
                try  {
                    var xform = this.TransformToVisual(null);
                } catch (err) {
                    //Ignore ComboBox being detached
                    return;
                }
                var offset = new Point(0, this.ActualHeight);
                var bottomRight = new Point(offset.X + child.ActualWidth, offset.Y + child.ActualHeight);
                var topLeft = xform.Transform(offset);
                bottomRight = xform.Transform(bottomRight);
                var isRightToLeft = (this.FlowDirection === Fayde.FlowDirection.RightToLeft);
                if(isRightToLeft) {
                    var left = bottomRight.X;
                    bottomRight.X = topLeft.X;
                    topLeft.X = left;
                }
                var finalOffset = new Point();
                var raw = root.ActualWidth;
                if(bottomRight.X > raw) {
                    finalOffset.X = raw - bottomRight.X;
                } else if(topLeft.X < 0) {
                    finalOffset.X = offset.X - topLeft.X;
                } else {
                    finalOffset.X = offset.X;
                }
                if(isRightToLeft) {
                    finalOffset.X = -finalOffset.X;
                }
                var rah = root.ActualHeight;
                if(bottomRight.Y > rah) {
                    finalOffset.Y = -child.ActualHeight;
                } else {
                    finalOffset.Y = this.RenderSize.Height;
                }
                popup.HorizontalOffset = finalOffset.X;
                popup.VerticalOffset = finalOffset.Y;
                this._UpdatePopupMaxHeight(this.MaxDropDownHeight);
            };
            ComboBox.prototype._UpdatePopupMaxHeight = function (height) {
                var child;
                if(this.$Popup && (child = this.$Popup.Child) && child instanceof Fayde.FrameworkElement) {
                    if(height === Number.POSITIVE_INFINITY) {
                        height = (App.Current.RootVisual).ActualHeight / 2.0;
                    }
                    child.MaxHeight = height;
                }
            };
            return ComboBox;
        })(Controls.Primitives.Selector);
        Controls.ComboBox = ComboBox;        
        Nullstone.RegisterType(ComboBox, "ComboBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ComboBox.js.map
