var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Input) {
            Input.XMLNS = "http://schemas.wsick.com/fayde/controls/input";
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Input) {
            /// <reference path="../Fayde.d.ts" />
            /// <reference path="../_.ts" />
            (function (Primitives) {
                var MenuBase = (function (_super) {
                    __extends(MenuBase, _super);
                    function MenuBase() {
                        _super.apply(this, arguments);
                    }
                    MenuBase.prototype.IsItemItsOwnContainer = function (item) {
                        return item instanceof Input.MenuItem || item instanceof Input.Separator;
                    };
                    MenuBase.prototype.GetContainerForItem = function () {
                        return new Input.MenuItem();
                    };
                    MenuBase.prototype.PrepareContainerForItem = function (element, item) {
                        _super.prototype.PrepareContainerForItem.call(this, element, item);
                        var menuItem = element;
                        if (!(menuItem instanceof Input.MenuItem))
                            return;
                        menuItem.ParentMenuBase = this;
                        if (menuItem != item) {
                            var itemTemplate = this.ItemTemplate;
                            var itemContainerStyle = this.ItemContainerStyle;
                            if (itemTemplate != null)
                                menuItem.SetValue(Fayde.Controls.ItemsControl.ItemTemplateProperty, itemTemplate);
                            if (itemContainerStyle != null && MenuBase.HasDefaultValue(menuItem, Fayde.Controls.HeaderedItemsControl.ItemContainerStyleProperty))
                                menuItem.SetValue(Fayde.Controls.HeaderedItemsControl.ItemContainerStyleProperty, itemContainerStyle);
                            if (MenuBase.HasDefaultValue(menuItem, Fayde.Controls.HeaderedItemsControl.HeaderProperty))
                                menuItem.Header = item;
                            if (itemTemplate != null)
                                menuItem.SetValue(Fayde.Controls.HeaderedItemsControl.HeaderTemplateProperty, itemTemplate);
                            if (itemContainerStyle != null)
                                menuItem.SetValue(Fayde.FrameworkElement.StyleProperty, itemContainerStyle);
                        }
                    };
                    MenuBase.HasDefaultValue = function (control, propd) {
                        return control.ReadLocalValue(propd) === DependencyProperty.UnsetValue;
                    };
                    MenuBase.ItemContainerStyleProperty = DependencyProperty.Register("ItemContainerStyle", function () {
                        return Fayde.Style;
                    }, MenuBase);
                    return MenuBase;
                })(Fayde.Controls.ItemsControl);
                Primitives.MenuBase = MenuBase;
                Fayde.RegisterType(MenuBase, {
                    Name: "MenuBase",
                    Namespace: Controls.Input.XMLNS
                });
            })(Input.Primitives || (Input.Primitives = {}));
            var Primitives = Input.Primitives;
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Primitives/MenuBase.ts" />
        (function (Input) {
            var ContextMenu = (function (_super) {
                __extends(ContextMenu, _super);
                function ContextMenu() {
                    _super.call(this);
                    this.Opened = new Fayde.RoutedEvent();
                    this.Closed = new Fayde.RoutedEvent();
                    this._Owner = null;
                    this._MousePosition = new Point();
                    this._PopupAlignmentPoint = new Point();
                    this._SettingIsOpen = false;
                    this._RootVisual = null;
                    this._Popup = null;
                    this._Overlay = null;
                    this.DefaultStyleKey = (this).constructor;
                    this.LayoutUpdated.Subscribe(this._HandleLayoutUpdated, this);
                }
                ContextMenu.prototype.OnHorizontalOffsetChanged = function (args) {
                    this.UpdateContextMenuPlacement();
                };

                ContextMenu.prototype.OnVerticalOffsetChanged = function (args) {
                    this.UpdateContextMenuPlacement();
                };

                ContextMenu.prototype.OnIsOpenChanged = function (args) {
                    if (this._SettingIsOpen)
                        return;
                    if (args.NewValue === true)
                        this.OpenPopup(this._MousePosition);
else
                        this.ClosePopup();
                };

                ContextMenu.prototype.OnKeyDown = function (e) {
                    switch (e.Key) {
                        case Fayde.Input.Key.Escape:
                            this.ClosePopup();
                            e.Handled = true;
                            break;
                        case Fayde.Input.Key.Up:
                            this.FocusNextItem(false);
                            e.Handled = true;
                            break;
                        case Fayde.Input.Key.Down:
                            this.FocusNextItem(true);
                            e.Handled = true;
                            break;
                    }
                    _super.prototype.OnKeyDown.call(this, e);
                };
                ContextMenu.prototype.OnMouseLeftButtonDown = function (e) {
                    e.Handled = true;
                    _super.prototype.OnMouseLeftButtonDown.call(this, e);
                };
                ContextMenu.prototype.OnMouseRightButtonDown = function (e) {
                    e.Handled = true;
                    _super.prototype.OnMouseRightButtonDown.call(this, e);
                };

                Object.defineProperty(ContextMenu.prototype, "Owner", {
                    get: function () {
                        return this._Owner;
                    },
                    set: function (value) {
                        if (this._Owner) {
                            var fe = this._Owner instanceof Fayde.FrameworkElement ? this._Owner : null;
                            if (fe)
                                fe.MouseRightButtonDown.Unsubscribe(this._HandleOwnerMouseRightButtonDown, this);
                        }
                        this._Owner = value;
                        if (!this._Owner)
                            return;
                        fe = this._Owner instanceof Fayde.FrameworkElement ? this._Owner : null;
                        if (fe)
                            fe.MouseRightButtonDown.Subscribe(this._HandleOwnerMouseRightButtonDown, this);
                    },
                    enumerable: true,
                    configurable: true
                });

                ContextMenu.prototype._HandleLayoutUpdated = function (sender, e) {
                    if (!Fayde.Application.Current.RootVisual)
                        return;
                    this.InitializeRootVisual();
                    this.LayoutUpdated.Unsubscribe(this._HandleLayoutUpdated, this);
                };
                ContextMenu.prototype._HandleOwnerMouseRightButtonDown = function (sender, e) {
                    this.OpenPopup(e.GetPosition(null));
                    e.Handled = true;
                };
                ContextMenu.prototype._HandleRootVisualMouseMove = function (sender, e) {
                    this._MousePosition = e.GetPosition(null);
                };
                ContextMenu.prototype._HandleOverlayMouseButtonDown = function (sender, e) {
                    this.ClosePopup();
                    e.Handled = true;
                };
                ContextMenu.prototype._HandleContextMenuSizeChanged = function (sender, e) {
                    this.UpdateContextMenuPlacement();
                };

                ContextMenu.prototype.ChildMenuItemClicked = function () {
                    this.ClosePopup();
                };

                ContextMenu.prototype.InitializeRootVisual = function () {
                    if (this._RootVisual)
                        return;
                    var rv = Fayde.Application.Current.RootVisual;
                    this._RootVisual = rv instanceof Fayde.FrameworkElement ? rv : null;
                    if (this._RootVisual)
                        this._RootVisual.MouseMove.Subscribe(this._HandleRootVisualMouseMove, this);
                };

                ContextMenu.prototype.UpdateContextMenuPlacement = function () {
                    if (!this._RootVisual || !this._Overlay)
                        return;
                    var x = this._PopupAlignmentPoint.X;
                    var y = this._PopupAlignmentPoint.Y;
                    var val1_1 = x + this.HorizontalOffset;
                    var val1_2 = y + this.VerticalOffset;
                    var val1_3 = Math.min(val1_1, this._RootVisual.ActualWidth - this.ActualWidth);
                    var val1_4 = Math.min(val1_2, this._RootVisual.ActualHeight - this.ActualHeight);
                    var length1 = Math.max(val1_3, 0.0);
                    var length2 = Math.max(val1_4, 0.0);
                    Fayde.Controls.Canvas.SetLeft(this, length1);
                    Fayde.Controls.Canvas.SetTop(this, length2);
                    this._Overlay.Width = this._RootVisual.ActualWidth;
                    this._Overlay.Height = this._RootVisual.ActualHeight;
                };
                ContextMenu.prototype.OpenPopup = function (position) {
                    this._PopupAlignmentPoint = position;
                    this.InitializeRootVisual();
                    var contextMenu1 = this;
                    var canvas1 = new Controls.Canvas();
                    canvas1.Background = new Fayde.Media.SolidColorBrush(Color.KnownColors.Transparent);
                    var canvas2 = canvas1;
                    contextMenu1._Overlay = canvas2;
                    this._Overlay.MouseLeftButtonDown.Subscribe(this._HandleOverlayMouseButtonDown, this);
                    this._Overlay.MouseRightButtonDown.Subscribe(this._HandleOverlayMouseButtonDown, this);
                    this._Overlay.Children.Add(this);
                    var contextMenu2 = this;
                    var popup1 = new Fayde.Controls.Primitives.Popup();
                    popup1.Child = this._Overlay;
                    var popup2 = popup1;
                    contextMenu2._Popup = popup2;
                    this.SizeChanged.Subscribe(this._HandleContextMenuSizeChanged, this);
                    if (this._RootVisual)
                        this._RootVisual.SizeChanged.Subscribe(this._HandleContextMenuSizeChanged, this);
                    this.UpdateContextMenuPlacement();
                    if (this.ReadLocalValue(Fayde.DependencyObject.DataContextProperty) === DependencyProperty.UnsetValue) {
                        var dependencyObject = this.Owner;
                        if (!dependencyObject)
                            dependencyObject = this._RootVisual;
                        var contextMenu3 = this;
                        var dp = Fayde.FrameworkElement.DataContextProperty;
                        var binding1 = new Fayde.Data.Binding("DataContext");
                        binding1.Source = dependencyObject;
                        var binding2 = binding1;
                        contextMenu3.SetBinding(dp, binding2);
                    }
                    this._Popup.IsOpen = true;
                    this.Focus();
                    this._SettingIsOpen = true;
                    this.IsOpen = true;
                    this._SettingIsOpen = false;
                    this.OnOpened(new Fayde.RoutedEventArgs());
                };
                ContextMenu.prototype.OnOpened = function (e) {
                    this.Opened.Raise(this, e);
                };
                ContextMenu.prototype.ClosePopup = function () {
                    if (this._Popup) {
                        this._Popup.IsOpen = false;
                        this._Popup.Child = null;
                        this._Popup = null;
                    }
                    if (this._Overlay) {
                        this._Overlay.Children.Clear();
                        this._Overlay = null;
                    }
                    this.SizeChanged.Unsubscribe(this._HandleContextMenuSizeChanged, this);
                    if (this._RootVisual)
                        this._RootVisual.SizeChanged.Unsubscribe(this._HandleContextMenuSizeChanged, this);
                    this._SettingIsOpen = true;
                    this.IsOpen = false;
                    this._SettingIsOpen = false;
                    this.OnClosed(new Fayde.RoutedEventArgs());
                };
                ContextMenu.prototype.OnClosed = function (e) {
                    this.Closed.Raise(this, e);
                };

                ContextMenu.prototype.FocusNextItem = function (down) {
                    var count = this.Items.Count;
                    var num = down ? -1 : count;
                    var menuItem1 = this.XamlNode.GetFocusedElement();
                    if (menuItem1 instanceof Input.MenuItem && this === menuItem1.ParentMenuBase)
                        num = this.ItemContainerGenerator.IndexFromContainer(menuItem1);
                    var index = num;
                    var menuItem2;
                    do {
                        index = (index + count + (down ? 1 : -1)) % count;
                        menuItem2 = this.ItemContainerGenerator.ContainerFromIndex(index);
                        if (!(menuItem2 instanceof Input.MenuItem))
                            menuItem2 = null;
                    } while((!menuItem2 || (!menuItem2.IsEnabled || !menuItem2.Focus())) && index !== num);
                };
                ContextMenu.HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", function () {
                    return Number;
                }, ContextMenu, 0.0);

                ContextMenu.VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", function () {
                    return Number;
                }, ContextMenu, 0.0);

                ContextMenu.IsOpenProperty = DependencyProperty.Register("IsOpen", function () {
                    return Boolean;
                }, ContextMenu, false);
                return ContextMenu;
            })(Input.Primitives.MenuBase);
            Input.ContextMenu = ContextMenu;
            Fayde.RegisterType(ContextMenu, {
                Name: "ContextMenu",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Input) {
            /// <reference path="../Fayde.d.ts" />
            (function (Internal) {
                var ObservableObjectCollection = (function (_super) {
                    __extends(ObservableObjectCollection, _super);
                    function ObservableObjectCollection(collection) {
                        _super.call(this);
                        this.IsReadOnly = false;
                        if (!collection)
                            return;
                        var enumerator = collection.GetEnumerator();
                        while (enumerator.MoveNext()) {
                            this.Add(enumerator.Current);
                        }
                    }
                    ObservableObjectCollection.prototype.Insert = function (item, index) {
                        if (this.IsReadOnly)
                            throw new InvalidOperationException("ObservableObjectCollection is read only.");
                        _super.prototype.Insert.call(this, item, index);
                    };
                    ObservableObjectCollection.prototype.RemoveAt = function (index) {
                        if (this.IsReadOnly)
                            throw new InvalidOperationException("ObservableObjectCollection is read only.");
                        _super.prototype.RemoveAt.call(this, index);
                    };
                    ObservableObjectCollection.prototype.SetValueAt = function (index, item) {
                        if (this.IsReadOnly)
                            throw new InvalidOperationException("ObservableObjectCollection is read only.");
                        _super.prototype.SetValueAt.call(this, index, item);
                    };
                    ObservableObjectCollection.prototype.Clear = function () {
                        if (this.IsReadOnly)
                            throw new InvalidOperationException("ObservableObjectCollection is read only.");
                        _super.prototype.Clear.call(this);
                    };
                    return ObservableObjectCollection;
                })(Fayde.Collections.ObservableCollection);
                Internal.ObservableObjectCollection = ObservableObjectCollection;
                Fayde.RegisterType(ObservableObjectCollection, {
                    Name: "ObservableObjectCollection",
                    Namespace: "Fayde.Controls.Input.Internal"
                });
            })(Input.Internal || (Input.Internal = {}));
            var Internal = Input.Internal;
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="_.ts" />
        (function (Input) {
            var UpDownBase = (function (_super) {
                __extends(UpDownBase, _super);
                function UpDownBase() {
                    _super.call(this);
                    this._IgnoreValueChange = false;
                    this._TextBox = null;
                    this._Spinner = null;
                    this._Text = "";
                    this.ValueChanging = new Fayde.RoutedPropertyChangingEvent();
                    this.ValueChanged = new Fayde.RoutedPropertyChangedEvent();
                    this.Parsing = new Fayde.RoutedEvent();
                    this.ParseError = new Fayde.RoutedEvent();
                    this.DefaultStyleKey = (this).constructor;
                }
                UpDownBase.prototype.OnSpinnerStyleChanged = function (oldStyle, newStyle) {
                };

                UpDownBase.prototype._OnValueChanged = function (args) {
                    if (this._IgnoreValueChange)
                        return;
                    var oldValue = args.OldValue;
                    var newValue = args.NewValue;
                    var e1 = new Fayde.RoutedPropertyChangingEventArgs(args.Property, oldValue, newValue, true);
                    this.OnValueChanging(e1);
                    if (e1.InCoercion)
                        return;
                    if (!e1.Cancel) {
                        var newValue2 = e1.NewValue;
                        var e2 = new Fayde.RoutedPropertyChangedEventArgs(oldValue, newValue2);
                        this.OnValueChanged(e2);
                    } else {
                        this._IgnoreValueChange = true;
                        this.Value = oldValue;
                        this._IgnoreValueChange = false;
                    }
                };
                UpDownBase.prototype.OnValueChanging = function (e) {
                    this.ValueChanging.Raise(this, e);
                };
                UpDownBase.prototype.OnValueChanged = function (e) {
                    this.ValueChanged.Raise(this, e);
                    this.SetTextBoxText();
                };

                UpDownBase.prototype.OnIsEditableChanged = function (args) {
                    if (!this._TextBox)
                        this._TextBox.IsReadOnly = !this.IsEditable;
                };

                UpDownBase.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.SetTextBox(this.GetTemplateChild("Text"));
                    this.SetSpinner(this.GetTemplateChild("Spinner"));
                    this.SetTextBoxText();
                    if (this._TextBox != null)
                        this._TextBox.IsReadOnly = !this.IsEditable;
                    this.UpdateVisualState(false);
                };
                UpDownBase.prototype.SetTextBox = function (d) {
                    if (this._TextBox) {
                        this._TextBox.GotFocus.Unsubscribe(this.TextBox_GotFocus, this);
                        this._TextBox.LostFocus.Unsubscribe(this.TextBox_LostFocus, this);
                    }
                    if (d instanceof Controls.TextBox)
                        this._TextBox = d;
else
                        this._TextBox = null;
                    this._TextBox.GotFocus.Subscribe(this.TextBox_GotFocus, this);
                    this._TextBox.LostFocus.Subscribe(this.TextBox_LostFocus, this);
                    this._Text = this._TextBox.Text;
                };
                UpDownBase.prototype.SetSpinner = function (d) {
                    if (this._Spinner)
                        this._Spinner.Spin.Unsubscribe(this.Spinner_Spin, this);
                    if (d instanceof Input.Spinner)
                        this._Spinner = d;
else
                        this._Spinner = null;
                    if (this._Spinner)
                        this._Spinner.Spin.Subscribe(this.Spinner_Spin, this);
                };

                UpDownBase.prototype.OnKeyDown = function (e) {
                    _super.prototype.OnKeyDown.call(this, e);
                    if (e.Handled)
                        return;
                    switch (e.Key) {
                        case Fayde.Input.Key.Enter:
                            this.ProcessUserInput();
                            e.Handled = true;
                            break;
                        case Fayde.Input.Key.Up:
                            this.DoIncrement();
                            e.Handled = true;
                            break;
                        case Fayde.Input.Key.Down:
                            this.DoDecrement();
                            e.Handled = true;
                            break;
                    }
                };
                UpDownBase.prototype.OnMouseWheel = function (e) {
                    _super.prototype.OnMouseWheel.call(this, e);
                    if (e.Handled)
                        return;
                    if (e.Delta < 0)
                        this.DoDecrement();
else if (0 < e.Delta)
                        this.DoIncrement();
                    e.Handled = true;
                };

                UpDownBase.prototype.ApplyValue = function (text) {
                    var e1 = new Input.UpDownParsingEventArgs(text);
                    var obj1;
                    var error = null;
                    try  {
                        obj1 = this.ParseValue(text);
                        e1.Value = obj1;
                    } catch (err) {
                        error = err;
                    }
                    try  {
                        this.OnParsing(e1);
                    } catch (err) {
                    }
                    if (error == null) {
                        var obj2 = e1.Handled ? e1.Value : obj1;
                        var value = this.Value;
                        if (this.Value === obj2)
                            this.SetTextBoxText();
                        this.Value = obj2;
                    } else if (e1.Handled) {
                        if (this.Value === e1.Value)
                            this.SetTextBoxText();
                        this.Value = e1.Value;
                    } else {
                        var e2 = new Input.UpDownParseErrorEventArgs(text, error);
                        this.OnParseError(e2);
                        if (!e2.Handled)
                            this.SetTextBoxText();
                    }
                };
                UpDownBase.prototype.OnParseError = function (e) {
                    this.ParseError.Raise(this, e);
                };
                UpDownBase.prototype.OnParsing = function (e) {
                    this.Parsing.Raise(this, e);
                };
                UpDownBase.prototype.ParseValue = function (text) {
                    return;
                };
                UpDownBase.prototype.FormatValue = function () {
                    return "";
                };

                UpDownBase.prototype.SelectAllText = function () {
                    if (this._TextBox)
                        this._TextBox.SelectAll();
                };
                UpDownBase.prototype.SetTextBoxText = function () {
                    if (!this._TextBox)
                        return;
                    this._Text = this.FormatValue() || "";
                    this._TextBox.Text = this._Text;
                    this._TextBox.SelectionStart = this._Text.length;
                };
                UpDownBase.prototype.TextBox_LostFocus = function (sender, e) {
                    this.ProcessUserInput();
                };
                UpDownBase.prototype.TextBox_GotFocus = function (sender, e) {
                    this.SelectAllText();
                };

                UpDownBase.prototype.Spinner_Spin = function (sender, e) {
                    if (this._TextBox)
                        this.ProcessUserInput();
                    this.OnSpin(e);
                };
                UpDownBase.prototype.OnSpin = function (e) {
                    if (e.Direction === Input.SpinDirection.Increase)
                        this.DoIncrement();
else
                        this.DoDecrement();
                };

                UpDownBase.prototype.ProcessUserInput = function () {
                    if (!this._TextBox || this._Text === this._TextBox.Text)
                        return;
                    var selectionStart = this._TextBox.SelectionStart;
                    this._Text = this._TextBox.Text;
                    this.ApplyValue(this._Text);
                    if (selectionStart < this._TextBox.Text.length)
                        this._TextBox.SelectionStart = selectionStart;
                };
                UpDownBase.prototype.DoDecrement = function () {
                    if (this._Spinner && (this._Spinner.ValidSpinDirection & Input.ValidSpinDirections.Decrease) !== Input.ValidSpinDirections.Decrease)
                        return;
                    this.OnDecrement();
                };
                UpDownBase.prototype.OnDecrement = function () {
                };
                UpDownBase.prototype.DoIncrement = function () {
                    if (this._Spinner && (this._Spinner.ValidSpinDirection & Input.ValidSpinDirections.Increase) !== Input.ValidSpinDirections.Increase)
                        return;
                    this.OnIncrement();
                };
                UpDownBase.prototype.OnIncrement = function () {
                };
                UpDownBase.SpinnerStyleProperty = DependencyProperty.Register("SpinnerStyle", function () {
                    return Fayde.Style;
                }, UpDownBase, undefined, function (d, args) {
                    return (d).OnSpinnerStyleChanged(args.OldValue, args.NewValue);
                });

                UpDownBase.IsEditableProperty = DependencyProperty.Register("IsEditable", function () {
                    return Boolean;
                }, UpDownBase, undefined, function (d, args) {
                    return (d).OnIsEditableChanged(args);
                });
                return UpDownBase;
            })(Controls.Control);
            Input.UpDownBase = UpDownBase;
            Fayde.RegisterType(UpDownBase, {
                Name: "UpDownBase",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="UpDownBase.ts" />
        (function (Input) {
            var NumericUpDown = (function (_super) {
                __extends(NumericUpDown, _super);
                function NumericUpDown() {
                    _super.call(this);
                    this._LevelsFromRootCall = 0;
                    this._InitialMin = 0.0;
                    this._InitialMax = 100.0;
                    this._InitialVal = 0.0;
                    this._InitialInc = 1.0;
                    this._RequestedMin = 0.0;
                    this._RequestedMax = 100.0;
                    this._RequestedVal = 0.0;
                    this._RequestedInc = 1.0;
                    this.DefaultStyleKey = (this).constructor;
                    this._Interaction = new Input.Internal.InteractionHelper(this);
                }
                NumericUpDown.prototype._OnMinimumChanged = function (args) {
                    this._EnsureValidDoubleValue(args.Property, args.OldValue, args.NewValue);
                    if (this._LevelsFromRootCall === 0) {
                        this._RequestedMin = args.NewValue;
                        this._InitialMin = args.OldValue;
                        this._InitialMax = this.Maximum;
                        this._InitialVal = this.Value;
                        ++this._LevelsFromRootCall;
                        if (this.Minimum != this._RequestedMin)
                            this.Minimum = this._RequestedMin;
                        --this._LevelsFromRootCall;
                    }
                    ++this._LevelsFromRootCall;
                    this.CoerceMaximum();
                    this.CoerceValue();
                    --this._LevelsFromRootCall;
                    if (this._LevelsFromRootCall != 0)
                        return;
                    var minimum = this.Minimum;
                    if (this._InitialMin !== minimum) {
                        this.OnMinimumChanged(this._InitialMin, minimum);
                    }
                    var maximum = this.Maximum;
                    if (this._InitialMax !== maximum) {
                        this.OnMaximumChanged(this._InitialMax, maximum);
                    }
                    this.SetValidSpinDirection();
                };
                NumericUpDown.prototype.OnMinimumChanged = function (oldMinimum, newMinimum) {
                };

                NumericUpDown.prototype._OnMaximumChanged = function (args) {
                    this._EnsureValidDoubleValue(args.Property, args.OldValue, args.NewValue);
                    if (this._LevelsFromRootCall === 0) {
                        this._RequestedMax = args.NewValue;
                        this._InitialMax = args.OldValue;
                        this._InitialVal = this.Value;
                    }
                    ++this._LevelsFromRootCall;
                    this.CoerceMaximum();
                    this.CoerceValue();
                    --this._LevelsFromRootCall;
                    if (this._LevelsFromRootCall !== 0)
                        return;
                    var maximum = this.Maximum;
                    if (this._InitialMax !== maximum) {
                        this.OnMaximumChanged(this._InitialMax, maximum);
                    }
                    this.SetValidSpinDirection();
                };
                NumericUpDown.prototype.OnMaximumChanged = function (oldMaximum, newMaximum) {
                };

                NumericUpDown.prototype._OnIncrementChanged = function (args) {
                    this._EnsureValidIncrementValue(args);
                    if (this._LevelsFromRootCall === 0) {
                        this._RequestedInc = args.NewValue;
                        this._InitialInc = args.OldValue;
                        ++this._LevelsFromRootCall;
                        if (this.Increment !== this._RequestedInc)
                            this.Increment = this._RequestedInc;
                        --this._LevelsFromRootCall;
                    }
                    if (this._LevelsFromRootCall !== 0)
                        return;
                    var increment = this.Increment;
                    if (this._InitialInc !== increment) {
                        this.OnIncrementChanged(this._InitialInc, increment);
                    }
                };
                NumericUpDown.prototype.OnIncrementChanged = function (oldIncrement, newIncrement) {
                };

                NumericUpDown.prototype._OnDecimalPlacesChanged = function (args) {
                    this._EnsureValidDecimalPlacesValue(args);
                    this.OnDecimalPlacesChanged(args.OldValue, args.NewValue);
                };
                NumericUpDown.prototype.OnDecimalPlacesChanged = function (oldDecimalPlaces, newDecimalPlaces) {
                    ++this._LevelsFromRootCall;
                    this.SetTextBoxText();
                    --this._LevelsFromRootCall;
                };

                NumericUpDown.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.SetValidSpinDirection();
                };

                NumericUpDown.prototype.SetValidSpinDirection = function () {
                    var validSpinDirections = Input.ValidSpinDirections.None;
                    if (this.Value < this.Maximum)
                        validSpinDirections |= Input.ValidSpinDirections.Increase;
                    if (this.Value > this.Minimum)
                        validSpinDirections |= Input.ValidSpinDirections.Decrease;
                    if (!this._Spinner)
                        return;
                    this._Spinner.ValidSpinDirection = validSpinDirections;
                };

                NumericUpDown.prototype.OnValueChanging = function (e) {
                    if (this._LevelsFromRootCall === 0) {
                        this._EnsureValidDoubleValue(e.Property, e.OldValue, e.NewValue);
                        this._InitialVal = e.OldValue;
                        this._RequestedVal = e.NewValue;
                        e.InCoercion = true;
                    }
                    ++this._LevelsFromRootCall;
                    this.CoerceValue();
                    --this._LevelsFromRootCall;
                    if (this._LevelsFromRootCall != 0)
                        return;
                    e.InCoercion = false;
                    if (this._InitialVal !== this.Value) {
                        e.NewValue = this.Value;
                        _super.prototype.OnValueChanging.call(this, e);
                    }
                };
                NumericUpDown.prototype.OnValueChanged = function (e) {
                    this.SetValidSpinDirection();
                    _super.prototype.OnValueChanged.call(this, e);
                };

                NumericUpDown.prototype.ParseValue = function (text) {
                    return parseFloat(text);
                };
                NumericUpDown.prototype.FormatValue = function () {
                    return this.Value.toFixed(this.DecimalPlaces);
                };
                NumericUpDown.prototype.OnIncrement = function () {
                    this.Value = this.Value + this.Increment;
                    this._RequestedVal = this.Value;
                };
                NumericUpDown.prototype.OnDecrement = function () {
                    this.Value = this.Value - this.Increment;
                    this._RequestedVal = this.Value;
                };

                NumericUpDown.prototype.CoerceMaximum = function () {
                    var minimum = this.Minimum;
                    var maximum = this.Maximum;
                    if (this._RequestedMax !== maximum) {
                        if (this._RequestedMax >= minimum) {
                            this.SetValue(NumericUpDown.MaximumProperty, this._RequestedMax);
                        } else {
                            if (maximum === minimum)
                                return;
                            this.SetValue(NumericUpDown.MaximumProperty, minimum);
                        }
                    } else {
                        if (maximum >= minimum)
                            return;
                        this.SetValue(NumericUpDown.MaximumProperty, minimum);
                    }
                };
                NumericUpDown.prototype.CoerceValue = function () {
                    var minimum = this.Minimum;
                    var maximum = this.Maximum;
                    var num = this.Value;
                    if (this._RequestedVal !== num) {
                        if (this._RequestedVal >= minimum && this._RequestedVal <= maximum) {
                            this.Value = this._RequestedVal;
                        } else if (this._RequestedVal < minimum && num !== minimum) {
                            this.Value = minimum;
                        } else {
                            if (this._RequestedVal <= maximum || num === maximum)
                                return;
                            this.Value = maximum;
                        }
                    } else if (num < minimum) {
                        this.Value = minimum;
                    } else {
                        if (num <= maximum)
                            return;
                        this.Value = maximum;
                    }
                };

                NumericUpDown.prototype._EnsureValidDoubleValue = function (propd, oldValue, newValue) {
                    var ov = { Value: 0.0 };
                    if (isValidDoubleValue(newValue, ov))
                        return;
                    ++this._LevelsFromRootCall;
                    this.SetValue(propd, oldValue);
                    --this._LevelsFromRootCall;
                    throw new ArgumentException("Invalid double value.");
                };
                NumericUpDown.prototype._EnsureValidIncrementValue = function (e) {
                    var ov = { Value: 0 };
                    if (isValidDoubleValue(e.NewValue, ov) && ov.Value > 0.0)
                        return;
                    ++this._LevelsFromRootCall;
                    this.SetValue(e.Property, e.OldValue);
                    --this._LevelsFromRootCall;
                    throw new ArgumentException("Invalid increment value.");
                };
                NumericUpDown.prototype._EnsureValidDecimalPlacesValue = function (e) {
                    var num = e.NewValue;
                    if (num >= 0 && num <= 15)
                        return;
                    ++this._LevelsFromRootCall;
                    this.DecimalPlaces = e.OldValue;
                    --this._LevelsFromRootCall;
                    throw new ArgumentException("Invalid decimal places value.");
                };
                NumericUpDown.ValueProperty = DependencyProperty.Register("Value", function () {
                    return Number;
                }, NumericUpDown, 0.0, function (d, args) {
                    return (d)._OnValueChanged(args);
                });

                NumericUpDown.MinimumProperty = DependencyProperty.Register("Minimum", function () {
                    return Number;
                }, NumericUpDown, 0.0, function (d, args) {
                    return (d)._OnMinimumChanged(args);
                });

                NumericUpDown.MaximumProperty = DependencyProperty.Register("Maximum", function () {
                    return Number;
                }, NumericUpDown, 100.0, function (d, args) {
                    return (d)._OnMaximumChanged(args);
                });

                NumericUpDown.IncrementProperty = DependencyProperty.Register("Increment", function () {
                    return Number;
                }, NumericUpDown, 1.0, function (d, args) {
                    return (d)._OnIncrementChanged(args);
                });

                NumericUpDown.DecimalPlacesProperty = DependencyProperty.Register("DecimalPlaces", function () {
                    return Number;
                }, NumericUpDown, 0, function (d, args) {
                    return (d)._OnDecimalPlacesChanged(args);
                });
                return NumericUpDown;
            })(Input.UpDownBase);
            Input.NumericUpDown = NumericUpDown;
            Fayde.RegisterType(NumericUpDown, {
                Name: "NumericUpDown",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });

            function isValidDoubleValue(value, outValue) {
                return !isNaN(value) && isFinite(value) && value <= 7.92281625142643E+28 && value >= -7.92281625142643E+28;
            }
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Input) {
            /// <reference path="../Fayde.d.ts" />
            (function (Internal) {
                var SequentialClickThresholdInMilliseconds = 500.0;
                var SequentialClickThresholdInPixelsSquared = 9.0;

                var InteractionHelper = (function () {
                    function InteractionHelper(control) {
                        this.Control = null;
                        this.IsFocused = false;
                        this.IsMouseOver = false;
                        this.IsReadOnly = false;
                        this.IsPressed = false;
                        this.LastClickTime = 0;
                        this.LastClickPosition = new Point();
                        this.ClickCount = 0;
                        this.Control = control;
                        this.Control.Loaded.Subscribe(this.OnLoaded, this);
                        this.Control.IsEnabledChanged.Subscribe(this.OnIsEnabledChanged, this);
                    }
                    InteractionHelper.prototype.GetVisualStateCommon = function () {
                        if (!this.Control.IsEnabled)
                            return "Disabled";
else if (this.IsReadOnly)
                            return "ReadOnly";
else if (this.IsPressed)
                            return "Pressed";
else if (this.IsMouseOver)
                            return "MouseOver";
else
                            return "Normal";
                    };

                    InteractionHelper.prototype.OnLoaded = function (sender, e) {
                        this.Control.UpdateVisualState(false);
                    };
                    InteractionHelper.prototype.OnIsEnabledChanged = function (sender, args) {
                        if (args.NewValue !== true) {
                            this.IsPressed = false;
                            this.IsMouseOver = false;
                            this.IsFocused = false;
                        }
                        this.Control.UpdateVisualState(true);
                    };

                    InteractionHelper.prototype.OnIsReadOnlyChanged = function (value) {
                        this.IsReadOnly = value;
                        if (!value) {
                            this.IsPressed = false;
                            this.IsMouseOver = false;
                            this.IsFocused = false;
                        }
                        this.Control.UpdateVisualState(true);
                    };

                    InteractionHelper.prototype.AllowGotFocus = function (e) {
                        if (!e)
                            throw new ArgumentException("e");
                        if (!this.Control.IsEnabled)
                            return false;
                        this.IsFocused = true;
                        return true;
                    };
                    InteractionHelper.prototype.AllowLostFocus = function (e) {
                        if (!e)
                            throw new ArgumentException("e");
                        if (!this.Control.IsEnabled)
                            return false;
                        this.IsFocused = false;
                        return true;
                    };
                    InteractionHelper.prototype.OnLostFocusBase = function () {
                        this.IsPressed = false;
                        this.Control.UpdateVisualState(true);
                    };

                    InteractionHelper.prototype.AllowMouseEnter = function (e) {
                        if (!e)
                            throw new ArgumentException("e");
                        if (!this.Control.IsEnabled)
                            return false;
                        this.IsMouseOver = true;
                        return true;
                    };
                    InteractionHelper.prototype.AllowMouseLeave = function (e) {
                        if (!e)
                            throw new ArgumentException("e");
                        if (!this.Control.IsEnabled)
                            return false;
                        this.IsMouseOver = false;
                        return true;
                    };

                    InteractionHelper.prototype.AllowMouseLeftButtonDown = function (e) {
                        if (!e)
                            throw new ArgumentException("e");
                        var isEnabled = this.Control.IsEnabled;
                        if (isEnabled) {
                            var now = new Date().getTime();
                            var position = e.GetPosition(this.Control);
                            var totalMilliseconds = now - this.LastClickTime;
                            var lastClickPosition = this.LastClickPosition;
                            var num1 = position.X - lastClickPosition.X;
                            var num2 = position.Y - lastClickPosition.Y;
                            var num3 = num1 * num1 + num2 * num2;
                            if (totalMilliseconds < 500.0 && num3 < 9.0)
                                ++this.ClickCount;
else
                                this.ClickCount = 1;
                            this.LastClickTime = now;
                            this.LastClickPosition = position;
                            this.IsPressed = true;
                        } else
                            this.ClickCount = 1;
                        return isEnabled;
                    };
                    InteractionHelper.prototype.AllowMouseLeftButtonUp = function (e) {
                        if (!e)
                            throw new ArgumentException("e");
                        if (!this.Control.IsEnabled)
                            return false;
                        this.IsPressed = false;
                        return true;
                    };

                    InteractionHelper.prototype.AllowKeyDown = function (e) {
                        if (!e)
                            throw new ArgumentException("e");
                        return this.Control.IsEnabled;
                    };
                    InteractionHelper.prototype.AllowKeyUp = function (e) {
                        if (!e)
                            throw new ArgumentException("e");
                        return this.Control.IsEnabled;
                    };

                    InteractionHelper.GetLogicalKey = function (flowDirection, originalKey) {
                        var key = originalKey;
                        if (flowDirection === Fayde.FlowDirection.RightToLeft) {
                            switch (originalKey) {
                                case Fayde.Input.Key.Left:
                                    key = Fayde.Input.Key.Right;
                                    break;
                                case Fayde.Input.Key.Right:
                                    key = Fayde.Input.Key.Left;
                                    break;
                            }
                        }
                        return key;
                    };
                    return InteractionHelper;
                })();
                Internal.InteractionHelper = InteractionHelper;
            })(Input.Internal || (Input.Internal = {}));
            var Internal = Input.Internal;
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="_.ts" />
        (function (Input) {
            var UpDownParseErrorEventArgs = (function (_super) {
                __extends(UpDownParseErrorEventArgs, _super);
                function UpDownParseErrorEventArgs(text, error) {
                    _super.call(this);
                    this.Handled = false;
                    Object.defineProperty(this, "Text", { value: text, writable: false });
                    Object.defineProperty(this, "Error", { value: error, writable: false });
                }
                return UpDownParseErrorEventArgs;
            })(Fayde.RoutedEventArgs);
            Input.UpDownParseErrorEventArgs = UpDownParseErrorEventArgs;
            Fayde.RegisterType(UpDownParseErrorEventArgs, {
                Name: "UpDownParseErrorEventArgs",
                Namespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="_.ts" />
        (function (Input) {
            var UpDownParsingEventArgs = (function (_super) {
                __extends(UpDownParsingEventArgs, _super);
                function UpDownParsingEventArgs(text) {
                    _super.call(this);
                    this.Value = null;
                    this.Handled = false;
                    Object.defineProperty(this, "Text", { value: text, writable: false });
                }
                return UpDownParsingEventArgs;
            })(Fayde.RoutedEventArgs);
            Input.UpDownParsingEventArgs = UpDownParsingEventArgs;
            Fayde.RegisterType(UpDownParsingEventArgs, {
                Name: "UpDownParsingEventArgs",
                Namespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="_.ts" />
        (function (Input) {
            var SpinEventArgs = (function (_super) {
                __extends(SpinEventArgs, _super);
                function SpinEventArgs(direction) {
                    _super.call(this);
                    Object.defineProperty(this, "Direction", { value: direction, writable: false });
                }
                return SpinEventArgs;
            })(Fayde.RoutedEventArgs);
            Input.SpinEventArgs = SpinEventArgs;
            Fayde.RegisterType(SpinEventArgs, {
                Name: "SpinEventArgs",
                Namespace: "Fayde.Controls.Input"
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="_.ts" />
        (function (Input) {
            (function (ValidSpinDirections) {
                ValidSpinDirections[ValidSpinDirections["None"] = 0] = "None";
                ValidSpinDirections[ValidSpinDirections["Increase"] = 1] = "Increase";
                ValidSpinDirections[ValidSpinDirections["Decrease"] = 2] = "Decrease";
            })(Input.ValidSpinDirections || (Input.ValidSpinDirections = {}));
            var ValidSpinDirections = Input.ValidSpinDirections;
            Fayde.RegisterEnum(ValidSpinDirections, {
                Name: "ValidSpinDirections",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });

            (function (SpinDirection) {
                SpinDirection[SpinDirection["Increase"] = 0] = "Increase";
                SpinDirection[SpinDirection["Decrease"] = 1] = "Decrease";
            })(Input.SpinDirection || (Input.SpinDirection = {}));
            var SpinDirection = Input.SpinDirection;
            Fayde.RegisterEnum(SpinDirection, {
                Name: "SpinDirection",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });

            (function (InvalidInputAction) {
                InvalidInputAction[InvalidInputAction["UseFallbackItem"] = 0] = "UseFallbackItem";
                InvalidInputAction[InvalidInputAction["TextBoxCannotLoseFocus"] = 1] = "TextBoxCannotLoseFocus";
            })(Input.InvalidInputAction || (Input.InvalidInputAction = {}));
            var InvalidInputAction = Input.InvalidInputAction;
            Fayde.RegisterEnum(InvalidInputAction, {
                Name: "InvalidInputAction",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="_.ts" />
        (function (Input) {
            var Spinner = (function (_super) {
                __extends(Spinner, _super);
                function Spinner() {
                    _super.apply(this, arguments);
                    this.Spin = new Fayde.RoutedEvent();
                }
                Spinner.prototype.OnValidSpinDirectionChanged = function (args) {
                    this.UpdateVisualState(true);
                };

                Spinner.prototype.OnSpin = function (e) {
                    var valid = e.Direction === Input.SpinDirection.Increase ? Input.ValidSpinDirections.Increase : Input.ValidSpinDirections.Decrease;
                    if ((this.ValidSpinDirection & valid) !== valid)
                        throw new InvalidOperationException("Invalid Spin Direction");
                    this.Spin.Raise(this, e);
                };

                Spinner.prototype.GetVisualStateNamesToActivate = function () {
                    var names = _super.prototype.GetVisualStateNamesToActivate.call(this);
                    var vsp = this.ValidSpinDirection;
                    names.push(((vsp & Input.ValidSpinDirections.Increase) === Input.ValidSpinDirections.Increase) ? "IncreaseEnabled" : "IncreaseDisabled");
                    names.push(((vsp & Input.ValidSpinDirections.Decrease) === Input.ValidSpinDirections.Decrease) ? "DecreaseEnabled" : "DecreaseDisabled");
                    return names;
                };
                Spinner.ValidSpinDirectionProperty = DependencyProperty.Register("ValidSpinDirection", function () {
                    return new Enum(Input.ValidSpinDirections);
                }, Spinner, Input.ValidSpinDirections.Increase, function (d, args) {
                    return (d).OnValidSpinDirectionChanged(args);
                });
                return Spinner;
            })(Controls.Control);
            Input.Spinner = Spinner;
            Fayde.RegisterType(Spinner, {
                Name: "Spinner",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="Spinner.ts" />
        (function (Input) {
            var ButtonSpinner = (function (_super) {
                __extends(ButtonSpinner, _super);
                function ButtonSpinner() {
                    _super.call(this);
                    this.IsPressed = false;
                    this.DefaultStyleKey = (this).constructor;
                    this._Interaction = new Input.Internal.InteractionHelper(this);
                }
                ButtonSpinner.prototype.OnContentChanged = function (oldValue, newValue) {
                };

                ButtonSpinner.prototype.OnValidSpinDirectionChanged = function (args) {
                    _super.prototype.OnValidSpinDirectionChanged.call(this, args);
                    this.SetButtonUsage();
                };

                ButtonSpinner.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.SetIncreaseButton(this.GetTemplateChild("IncreaseButton"));
                    this.SetDecreaseButton(this.GetTemplateChild("DecreaseButton"));
                    this.UpdateVisualState(false);
                    this.SetButtonUsage();
                };

                ButtonSpinner.prototype.GetVisualStateCommon = function () {
                    return this._Interaction.GetVisualStateCommon();
                };

                ButtonSpinner.prototype.OnMouseEnter = function (e) {
                    if (!this._Interaction.AllowMouseEnter(e))
                        return;
                    this.UpdateVisualState(true);
                    _super.prototype.OnMouseEnter.call(this, e);
                };
                ButtonSpinner.prototype.OnMouseLeave = function (e) {
                    if (!this._Interaction.AllowMouseLeave(e))
                        return;
                    this.UpdateVisualState(true);
                    _super.prototype.OnMouseLeave.call(this, e);
                };
                ButtonSpinner.prototype.OnMouseLeftButtonDown = function (e) {
                    if (!this._Interaction.AllowMouseLeftButtonDown(e))
                        return;
                    this.UpdateVisualState(true);
                    _super.prototype.OnMouseLeftButtonDown.call(this, e);
                };
                ButtonSpinner.prototype.OnMouseLeftButtonUp = function (e) {
                    _super.prototype.OnMouseLeftButtonUp.call(this, e);
                    var position;
                    var ib = this._IncreaseButton;
                    if (ib && !ib.IsEnabled) {
                        position = e.GetPosition(ib);
                        if (position.X > 0.0 && position.X < ib.ActualWidth && position.Y > 0.0 && position.Y < ib.ActualHeight)
                            e.Handled = true;
                    }
                    var db = this._DecreaseButton;
                    if (db || db.IsEnabled)
                        return;
                    position = e.GetPosition(db);
                    if (position.X > 0.0 && position.X < db.ActualWidth && position.Y > 0.0 && position.Y < db.ActualHeight)
                        e.Handled = true;
                };
                ButtonSpinner.prototype.OnGotFocus = function (e) {
                    if (!this._Interaction.AllowGotFocus(e))
                        return;
                    this.UpdateVisualState(true);
                    _super.prototype.OnGotFocus.call(this, e);
                };
                ButtonSpinner.prototype.OnLostFocus = function (e) {
                    if (!this._Interaction.AllowLostFocus(e))
                        return;
                    this._Interaction.OnLostFocusBase();
                    _super.prototype.OnLostFocus.call(this, e);
                };

                ButtonSpinner.prototype.SetIncreaseButton = function (d) {
                    if (this._IncreaseButton)
                        this._IncreaseButton.Click.Unsubscribe(this.Button_Click, this);

                    if (d instanceof Fayde.Controls.Primitives.ButtonBase)
                        this._IncreaseButton = d;
else
                        this._IncreaseButton = null;
                    if (this._IncreaseButton)
                        this._IncreaseButton.Click.Subscribe(this.Button_Click, this);
                };
                ButtonSpinner.prototype.SetDecreaseButton = function (d) {
                    if (this._DecreaseButton)
                        this._DecreaseButton.Click.Unsubscribe(this.Button_Click, this);

                    if (d instanceof Fayde.Controls.Primitives.ButtonBase)
                        this._DecreaseButton = d;
else
                        this._DecreaseButton = null;
                    if (this._DecreaseButton)
                        this._DecreaseButton.Click.Subscribe(this.Button_Click, this);
                };
                ButtonSpinner.prototype.Button_Click = function (sender, e) {
                    this.OnSpin(new Input.SpinEventArgs(sender === this._IncreaseButton ? Input.SpinDirection.Increase : Input.SpinDirection.Decrease));
                };

                ButtonSpinner.prototype.SetButtonUsage = function () {
                    if (this._IncreaseButton)
                        this._IncreaseButton.IsEnabled = (this.ValidSpinDirection & Input.ValidSpinDirections.Increase) === Input.ValidSpinDirections.Increase;
                    if (this._DecreaseButton)
                        this._DecreaseButton.IsEnabled = (this.ValidSpinDirection & Input.ValidSpinDirections.Decrease) === Input.ValidSpinDirections.Decrease;
                };
                ButtonSpinner.ContentProperty = DependencyProperty.Register("Content", function () {
                    return Object;
                }, ButtonSpinner, undefined, function (d, args) {
                    return (d).OnContentChanged(args.OldValue, args.NewValue);
                });

                ButtonSpinner.Annotations = { ContentProperty: ButtonSpinner.ContentProperty };
                return ButtonSpinner;
            })(Input.Spinner);
            Input.ButtonSpinner = ButtonSpinner;
            Fayde.RegisterType(ButtonSpinner, {
                Name: "ButtonSpinner",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="UpDownBase.ts" />
        (function (Input) {
            var DomainUpDown = (function (_super) {
                __extends(DomainUpDown, _super);
                function DomainUpDown() {
                    _super.call(this);
                    this._Items = new Input.Internal.ObservableObjectCollection();
                    this._ValueDuringInit = null;
                    this._IsNotAllowedToEditByFocus = false;
                    this._IsEditing = false;
                    this._IsInvalidInput = false;
                    this._InitialCurrentIndex = -1;
                    this._CurrentIndexDuringInit = null;
                    this._CurrentIndexNestLevel = 0;
                    this._ValueBindingEvaluator = null;
                    this.DefaultStyleKey = (this).constructor;
                    this._Interaction = new Input.Internal.InteractionHelper(this);
                    this._Items.CollectionChanged.Subscribe(this.OnItemsChanged, this);
                }
                DomainUpDown.prototype._OnCurrentIndexChanged = function (args) {
                    var index = args.NewValue;
                    var oldValue = args.OldValue;
                    if (!this.IsValidCurrentIndex(index)) {
                        ++this._CurrentIndexNestLevel;
                        this.SetValue(args.Property, oldValue);
                        --this._CurrentIndexNestLevel;
                        if (this._CurrentIndexDuringInit == null)
                            this._CurrentIndexDuringInit = index;
else
                            throw new ArgumentOutOfRangeException("Invalid current index.");
                    } else {
                        if (this._CurrentIndexNestLevel == 0)
                            this._InitialCurrentIndex = oldValue;
                        ++this._CurrentIndexNestLevel;
                        var num = this.CoerceSelectedIndex(index);
                        if (index !== num)
                            this.CurrentIndex = num;
                        --this._CurrentIndexNestLevel;
                        if (this._CurrentIndexNestLevel != 0 || this.CurrentIndex === this._InitialCurrentIndex)
                            return;
                        this.OnCurrentIndexChanged(oldValue, this.CurrentIndex);
                    }
                };
                DomainUpDown.prototype.OnCurrentIndexChanged = function (oldValue, newValue) {
                    this.Value = Fayde.Enumerable.ElementAtOrDefault(this.GetActualItems(), newValue);
                    this.SetIsEditing(false);
                    this.SetValidSpinDirection();
                };

                DomainUpDown.prototype._OnIsCyclicChanged = function (args) {
                    this.SetValidSpinDirection();
                };

                DomainUpDown.prototype._OnInvalidInputActionPropertyChanged = function (args) {
                    switch (args.NewValue) {
                        case Input.InvalidInputAction.UseFallbackItem:
                            break;
                        case Input.InvalidInputAction.TextBoxCannotLoseFocus:
                            break;
                        default:
                            throw new ArgumentException("Invalid input action.");
                    }
                };

                DomainUpDown.prototype.OnItemsSourceChanged = function (oldItemsSource, newItemsSource) {
                    if (oldItemsSource && Nullstone.ImplementsInterface(oldItemsSource, Fayde.Collections.INotifyCollectionChanged_)) {
                        (oldItemsSource).CollectionChanged.Unsubscribe(this.OnItemsChanged, this);
                    }

                    if (newItemsSource != null) {
                        var index = getIndexOf(newItemsSource, this.Value);
                        if (index > -1) {
                            this.CurrentIndex = index;
                        } else {
                            var source = newItemsSource;
                            if (this._CurrentIndexDuringInit != null && this._CurrentIndexDuringInit > -1) {
                                if (this.IsValidCurrentIndex(this.CurrentIndex))
                                    this.Value = Fayde.Enumerable.ElementAt(source, this.CurrentIndex);
else
                                    this.Value = this.IsValidCurrentIndex(this._CurrentIndexDuringInit) ? Fayde.Enumerable.ElementAt(source, this._CurrentIndexDuringInit) : Fayde.Enumerable.FirstOrDefault(source);
                                this._CurrentIndexDuringInit = -1;
                            } else if (Fayde.Enumerable.Contains(source, this._ValueDuringInit)) {
                                this.Value = this._ValueDuringInit;
                                this._ValueDuringInit = {};
                            } else
                                this.Value = this.IsValidCurrentIndex(this.CurrentIndex) ? Fayde.Enumerable.ElementAtOrDefault(source, this.CurrentIndex) : Fayde.Enumerable.FirstOrDefault(source);
                        }
                        if (Nullstone.ImplementsInterface(newItemsSource, Fayde.Collections.INotifyCollectionChanged_)) {
                            (newItemsSource).CollectionChanged.Subscribe(this.OnItemsChanged, this);
                        }
                    } else
                        this._Items.Clear();
                    this.SetValidSpinDirection();
                };

                Object.defineProperty(DomainUpDown.prototype, "Items", {
                    get: function () {
                        if (!this.ItemsSource)
                            return this._Items;
                        var coll = new Input.Internal.ObservableObjectCollection(this.ItemsSource);
                        coll.IsReadOnly = true;
                        return coll;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(DomainUpDown.prototype, "IsEditing", {
                    get: function () {
                        return this._IsEditing;
                    },
                    enumerable: true,
                    configurable: true
                });
                DomainUpDown.prototype.SetIsEditing = function (value) {
                    if (value === this._IsEditing || !this.IsEditable && value)
                        return;
                    this._IsEditing = value;
                    this.UpdateVisualState(true);
                    if (!this._TextBox)
                        return;
                    if (!value) {
                        this._TextBox.Text = this.FormatValue();
                        this._TextBox.IsHitTestVisible = false;
                    } else {
                        if (this.XamlNode.GetFocusedElement() === this._TextBox)
                            this._TextBox.Select(0, this._TextBox.Text.length);
                        this._TextBox.IsHitTestVisible = true;
                    }
                };
                DomainUpDown.prototype.SetIsInvalidInput = function (value) {
                    if (value === this._IsInvalidInput)
                        return;
                    this._IsInvalidInput = value;
                    this.UpdateVisualState(true);
                };

                Object.defineProperty(DomainUpDown.prototype, "ValueMemberPath", {
                    get: function () {
                        var vb = this.ValueMemberBinding;
                        return vb ? vb.Path.Path : null;
                    },
                    set: function (value) {
                        var vb = this.ValueMemberBinding;
                        if (!value) {
                            if (!vb)
                                return;
                            var binding1 = new Fayde.Data.Binding();
                            binding1.Converter = vb.Converter;
                            binding1.ConverterCulture = vb.ConverterCulture;
                            binding1.ConverterParameter = vb.ConverterParameter;
                            this.ValueMemberBinding = binding1;
                        } else if (vb != null) {
                            var binding1 = new Fayde.Data.Binding(value);
                            binding1.Converter = vb.Converter;
                            binding1.ConverterCulture = vb.ConverterCulture;
                            binding1.ConverterParameter = vb.ConverterParameter;
                            this.ValueMemberBinding = binding1;
                        } else
                            this.ValueMemberBinding = new Fayde.Data.Binding(value);
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(DomainUpDown.prototype, "ValueMemberBinding", {
                    get: function () {
                        var vbe = this._ValueBindingEvaluator;
                        return vbe ? vbe.ValueBinding : null;
                    },
                    set: function (value) {
                        this._ValueBindingEvaluator = new Input.Internal.BindingSourceEvaluator(value);
                    },
                    enumerable: true,
                    configurable: true
                });

                DomainUpDown.prototype.GetActualItems = function () {
                    var is = this.ItemsSource;
                    return is == null ? this._Items : is;
                };

                DomainUpDown.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.SetValidSpinDirection();
                };

                DomainUpDown.prototype.GetVisualStateNamesToActivate = function (useTransitions) {
                    var arr = _super.prototype.GetVisualStateNamesToActivate.call(this);
                    arr.push(this.IsEditing ? "Edit" : "Display");
                    arr.push(this._IsInvalidInput ? "InvalidDomain" : "ValidDomain");
                    return arr;
                };

                DomainUpDown.prototype.OnKeyDown = function (e) {
                    if (e != null && ((e.Key === Fayde.Input.Key.Enter || e.Key === Fayde.Input.Key.Space) && !this.IsEditing && this.IsEditable)) {
                        this.SetIsEditing(true);
                        e.Handled = true;
                    } else {
                        _super.prototype.OnKeyDown.call(this, e);
                        if (e == null || e.Handled)
                            return;
                        if (e.Key === Fayde.Input.Key.Escape) {
                            this.SetIsInvalidInput(false);
                            this.SetIsEditing(false);
                            e.Handled = true;
                        } else if (!this.IsEditing && this.IsEditable)
                            this.SetIsEditing(true);
                    }
                };

                DomainUpDown.prototype.OnGotFocus = function (e) {
                    if (!this._Interaction.AllowGotFocus(e))
                        return;
                    this.TryEnterEditMode();
                    this.UpdateVisualState(true);
                    _super.prototype.OnGotFocus.call(this, e);
                };
                DomainUpDown.prototype.OnLostFocus = function (e) {
                    var _this = this;
                    if (!this._Interaction.AllowLostFocus(e))
                        return;
                    if (!this._IsInvalidInput)
                        this.SetIsEditing(false);
else if (this.InvalidInputAction === Input.InvalidInputAction.TextBoxCannotLoseFocus && this.XamlNode.GetFocusedElement() !== this._TextBox)
                        window.setTimeout(function () {
                            return _this._TextBox.Focus();
                        }, 1);
                    this._Interaction.OnLostFocusBase();
                    _super.prototype.OnLostFocus.call(this, e);
                };
                DomainUpDown.prototype.OnMouseEnter = function (e) {
                    if (!this._Interaction.AllowMouseEnter(e))
                        return;
                    this.UpdateVisualState(true);
                    _super.prototype.OnMouseEnter.call(this, e);
                };
                DomainUpDown.prototype.OnMouseLeave = function (e) {
                    if (!this._Interaction.AllowMouseLeave(e))
                        return;
                    this.UpdateVisualState(true);
                    _super.prototype.OnMouseLeave.call(this, e);
                };
                DomainUpDown.prototype.OnMouseLeftButtonDown = function (e) {
                    if (!this._Interaction.AllowMouseLeftButtonDown(e))
                        return;
                    this.UpdateVisualState(true);
                    _super.prototype.OnMouseLeftButtonDown.call(this, e);
                };
                DomainUpDown.prototype.OnMouseLeftButtonUp = function (e) {
                    if (!this._Interaction.AllowMouseLeftButtonUp(e))
                        return;
                    this.UpdateVisualState(true);
                    _super.prototype.OnMouseLeftButtonUp.call(this, e);
                    if (!this.IsEditing) {
                        this.Focus();
                        this.TryEnterEditMode();
                    }
                };

                DomainUpDown.prototype.SetValidSpinDirection = function () {
                    var num = Fayde.Enumerable.Count(this.GetActualItems());
                    var validSpinDirections = Input.ValidSpinDirections.None;
                    if (this.IsCyclic || this.CurrentIndex < num - 1)
                        validSpinDirections |= Input.ValidSpinDirections.Decrease;
                    if (this.IsCyclic || this.CurrentIndex > 0)
                        validSpinDirections |= Input.ValidSpinDirections.Increase;
                    if (this._Spinner)
                        this._Spinner.ValidSpinDirection = validSpinDirections;
                };

                DomainUpDown.prototype.OnItemsChanged = function (sender, e) {
                    if (this._CurrentIndexDuringInit != null && this._CurrentIndexDuringInit > -1 && this.IsValidCurrentIndex(this._CurrentIndexDuringInit)) {
                        this.Value = Fayde.Enumerable.ElementAt(this.GetActualItems(), this._CurrentIndexDuringInit);
                        this._CurrentIndexDuringInit = -1;
                    } else if (this._ValueDuringInit != null && Fayde.Enumerable.Contains(this.GetActualItems(), this._ValueDuringInit)) {
                        this.Value = this._ValueDuringInit;
                        this._ValueDuringInit = {};
                    } else if (this.Value == null || !Fayde.Enumerable.Contains(this.GetActualItems(), this.Value))
                        this.Value = Fayde.Enumerable.FirstOrDefault(this.GetActualItems());
                    this.SetValidSpinDirection();
                };

                DomainUpDown.prototype.OnValueChanging = function (e) {
                    if (e != null && (e.NewValue == null && Fayde.Enumerable.Count(this.GetActualItems()) > 0 || e.NewValue != null && !Fayde.Enumerable.Contains(this.GetActualItems(), e.NewValue))) {
                        e.Cancel = true;
                        if (this._ValueDuringInit != null || e.NewValue == null)
                            return;
                        this._ValueDuringInit = e.NewValue;
                    } else
                        _super.prototype.OnValueChanging.call(this, e);
                };
                DomainUpDown.prototype.OnValueChanged = function (e) {
                    _super.prototype.OnValueChanged.call(this, e);
                    this.CurrentIndex = getIndexOf(this.GetActualItems(), this.Value);
                    this.SetIsEditing(false);
                };

                DomainUpDown.prototype.ApplyValue = function (text) {
                    if (!this.IsEditable)
                        return;
                    this.SetIsEditing(true);
                    try  {
                        this.Value = this.ParseValue(text);
                    } catch (err) {
                        var e = new Input.UpDownParseErrorEventArgs(text, err);
                        this.OnParseError(e);
                        if (!e.Handled)
                            this.SetTextBoxText();
                    } finally {
                        if (!this._IsInvalidInput || this.InvalidInputAction !== Input.InvalidInputAction.TextBoxCannotLoseFocus)
                            this.SetIsEditing(false);
                    }
                };
                DomainUpDown.prototype.ParseValue = function (text) {
                    var obj = null;
                    if (!!text) {
                        var vb = this._ValueBindingEvaluator;
                        obj = Fayde.Enumerable.FirstOrDefault(this.GetActualItems(), function (item) {
                            var s;
                            if (!vb)
                                s = item.toString();
else
                                s = vb.GetDynamicValue(item) || "";
                            return s === text;
                        });
                        if (obj == null) {
                            if (this.InvalidInputAction === Input.InvalidInputAction.UseFallbackItem) {
                                this.SetIsInvalidInput(false);
                                if (this.FallbackItem != null && Fayde.Enumerable.Contains(this.GetActualItems(), this.FallbackItem))
                                    obj = this.FallbackItem;
else
                                    throw new ArgumentException("Cannot parse value.");
                            } else if (this.InvalidInputAction === Input.InvalidInputAction.TextBoxCannotLoseFocus) {
                                this.SetIsInvalidInput(true);
                                obj = this.Value;
                            }
                        } else
                            this.SetIsInvalidInput(false);
                    } else {
                        this.SetIsInvalidInput(false);
                        obj = this.Value;
                    }
                    return obj;
                };
                DomainUpDown.prototype.FormatValue = function () {
                    if (!this.Value)
                        return "";
                    try  {
                        var vb = this._ValueBindingEvaluator;
                        if (vb)
                            return vb.GetDynamicValue(this.Value);
                    } catch (err) {
                    }
                    return this.Value.toString();
                };
                DomainUpDown.prototype.OnIncrement = function () {
                    var _this = this;
                    if (this.CurrentIndex > 0)
                        --this.CurrentIndex;
else if (this.IsCyclic)
                        this.CurrentIndex = Fayde.Enumerable.Count(this.GetActualItems()) - 1;
                    this.SetIsInvalidInput(false);
                    this._IsNotAllowedToEditByFocus = true;
                    this.Focus();
                    window.setTimeout(function () {
                        return _this._IsNotAllowedToEditByFocus = false;
                    }, 1);
                };
                DomainUpDown.prototype.OnDecrement = function () {
                    var _this = this;
                    if (this.IsValidCurrentIndex(this.CurrentIndex + 1))
                        ++this.CurrentIndex;
else if (this.IsCyclic)
                        this.CurrentIndex = 0;
                    this.SetIsInvalidInput(false);
                    this._IsNotAllowedToEditByFocus = true;
                    this.Focus();
                    window.setTimeout(function () {
                        return _this._IsNotAllowedToEditByFocus = false;
                    }, 1);
                };

                DomainUpDown.prototype.TryEnterEditMode = function () {
                    if (this._IsNotAllowedToEditByFocus || !this.IsEditable)
                        return;
                    this.SetIsEditing(true);
                };
                DomainUpDown.prototype.SelectAllText = function () {
                };

                DomainUpDown.prototype.CoerceSelectedIndex = function (index) {
                    if (this.IsValidCurrentIndex(index))
                        return index;
                    return Fayde.Enumerable.Count(this.GetActualItems()) == 0 ? -1 : 0;
                };
                DomainUpDown.prototype.IsValidCurrentIndex = function (value) {
                    var num = Fayde.Enumerable.Count(this.GetActualItems());
                    return value === -1 && num === 0 || value >= 0 && value < num;
                };
                DomainUpDown.ValueProperty = DependencyProperty.Register("Value", function () {
                    return Object;
                }, DomainUpDown, null, function (d, args) {
                    return (d)._OnValueChanged(args);
                });

                DomainUpDown.CurrentIndexProperty = DependencyProperty.Register("CurrentIndex", function () {
                    return Number;
                }, DomainUpDown, -1, function (d, args) {
                    return (d)._OnCurrentIndexChanged(args);
                });

                DomainUpDown.IsCyclicProperty = DependencyProperty.Register("IsCyclic", function () {
                    return Boolean;
                }, DomainUpDown, false, function (d, args) {
                    return (d)._OnIsCyclicChanged(args);
                });

                DomainUpDown.InvalidInputActionProperty = DependencyProperty.Register("InvalidInputAction", function () {
                    return new Enum(Input.InvalidInputAction);
                }, DomainUpDown, Input.InvalidInputAction.UseFallbackItem, function (d, args) {
                    return (d)._OnInvalidInputActionPropertyChanged(args);
                });

                DomainUpDown.FallbackItemProperty = DependencyProperty.Register("FallbackItem", function () {
                    return Object;
                }, DomainUpDown, null);

                DomainUpDown.ItemsSourceProperty = DependencyProperty.Register("ItemsSource", function () {
                    return Fayde.IEnumerable_;
                }, DomainUpDown, null);

                DomainUpDown.ItemTemplateProperty = DependencyProperty.Register("ItemTemplate", function () {
                    return Fayde.DataTemplate;
                }, DomainUpDown);
                return DomainUpDown;
            })(Input.UpDownBase);
            Input.DomainUpDown = DomainUpDown;
            Fayde.RegisterType(DomainUpDown, {
                Name: "DomainUpDown",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });

            function getIndexOf(sequence, item) {
                var i = 0;
                var enumerator = sequence.GetEnumerator();
                while (enumerator.MoveNext()) {
                    if (enumerator.Current === item)
                        return i;
                    i++;
                }
                return -1;
            }
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Input) {
            /// <reference path="../Fayde.d.ts" />
            (function (Internal) {
                var BindingSourceEvaluator = (function (_super) {
                    __extends(BindingSourceEvaluator, _super);
                    function BindingSourceEvaluator(binding) {
                        _super.call(this);
                        this._ValueBinding = null;
                        this._ValueBinding = binding;
                    }
                    Object.defineProperty(BindingSourceEvaluator.prototype, "ValueBinding", {
                        get: function () {
                            return this._ValueBinding;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    BindingSourceEvaluator.prototype.GetDynamicValue = function (source) {
                        var vb = this._ValueBinding;

                        var binding1 = new Fayde.Data.Binding();
                        binding1.BindsDirectlyToSource = vb.BindsDirectlyToSource;
                        binding1.Converter = vb.Converter;
                        binding1.ConverterCulture = vb.ConverterCulture;
                        binding1.ConverterParameter = vb.ConverterParameter;
                        binding1.FallbackValue = vb.FallbackValue;
                        binding1.Mode = vb.Mode;
                        binding1.NotifyOnValidationError = vb.NotifyOnValidationError;
                        binding1.Path = vb.Path;
                        binding1.StringFormat = vb.StringFormat;
                        binding1.TargetNullValue = vb.TargetNullValue;
                        binding1.UpdateSourceTrigger = vb.UpdateSourceTrigger;
                        binding1.ValidatesOnDataErrors = vb.ValidatesOnDataErrors;
                        binding1.ValidatesOnExceptions = vb.ValidatesOnExceptions;
                        binding1.ValidatesOnNotifyDataErrors = vb.ValidatesOnNotifyDataErrors;
                        binding1.Source = source;

                        this.SetBinding(BindingSourceEvaluator.ValueProperty, binding1);
                        var obj = this.Value;
                        this.ClearValue(BindingSourceEvaluator.ValueProperty);
                        return obj;
                    };
                    BindingSourceEvaluator.ValueProperty = DependencyProperty.Register("Value", function () {
                        return Object;
                    }, BindingSourceEvaluator);
                    return BindingSourceEvaluator;
                })(Fayde.FrameworkElement);
                Internal.BindingSourceEvaluator = BindingSourceEvaluator;
                Fayde.RegisterType(BindingSourceEvaluator, {
                    Name: "BindingSourceEvaluator",
                    Namespace: "Fayde.Controls.Input.Internal"
                });
            })(Input.Internal || (Input.Internal = {}));
            var Internal = Input.Internal;
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="_.ts" />
        (function (Input) {
            var ContextMenuService = (function () {
                function ContextMenuService() {
                }
                ContextMenuService.GetContextMenu = function (d) {
                    return d.GetValue(ContextMenuService.ContextMenuProperty);
                };
                ContextMenuService.SetContextMenu = function (d, value) {
                    d.SetValue(ContextMenuService.ContextMenuProperty, value);
                };
                ContextMenuService.OnContextMenuPropertyChanged = function (d, args) {
                    var fe = d;
                    if (!(fe instanceof Fayde.FrameworkElement))
                        return;
                    var oldMenu = args.OldValue;
                    if (oldMenu instanceof Input.ContextMenu)
                        oldMenu.Owner = null;
                    var newMenu = args.NewValue;
                    if (newMenu instanceof Input.ContextMenu)
                        newMenu.Owner = fe;
                };
                ContextMenuService.ContextMenuProperty = DependencyProperty.RegisterAttached("ContextMenu", function () {
                    return Input.ContextMenu;
                }, ContextMenuService, undefined, ContextMenuService.OnContextMenuPropertyChanged);
                return ContextMenuService;
            })();
            Input.ContextMenuService = ContextMenuService;
            Fayde.RegisterType(ContextMenuService, {
                Name: "ContextMenuService",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="_.ts" />
        (function (Input) {
            var Separator = (function (_super) {
                __extends(Separator, _super);
                function Separator() {
                    _super.call(this);
                    this.DefaultStyleKey = (this).constructor;
                }
                return Separator;
            })(Controls.Control);
            Input.Separator = Separator;
            Fayde.RegisterType(Separator, {
                Name: "Separator",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="Fayde.d.ts" />
        /// <reference path="Primitives/MenuBase.ts" />
        (function (Input) {
            var MenuItem = (function (_super) {
                __extends(MenuItem, _super);
                function MenuItem() {
                    _super.call(this);
                    this.Click = new Fayde.RoutedEvent();
                    this.DefaultStyleKey = (this).constructor;
                    this.UpdateIsEnabled();
                }
                MenuItem.prototype.OnCommandChanged = function (args) {
                    var oldcmd = args.OldValue;
                    if (Nullstone.ImplementsInterface(oldcmd, Fayde.Input.ICommand_))
                        oldcmd.CanExecuteChanged.Unsubscribe(this._CanExecuteChanged, this);
                    var newcmd = args.NewValue;
                    if (Nullstone.ImplementsInterface(newcmd, Fayde.Input.ICommand_))
                        newcmd.CanExecuteChanged.Subscribe(this._CanExecuteChanged, this);
                    this.UpdateIsEnabled();
                };
                MenuItem.prototype._CanExecuteChanged = function (sender, e) {
                    this.UpdateIsEnabled();
                };

                MenuItem.prototype.OnCommandParameterChanged = function (args) {
                    this.UpdateIsEnabled();
                };

                MenuItem.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.UpdateVisualState(false);
                };

                MenuItem.prototype.UpdateIsEnabled = function () {
                    this.IsEnabled = this.Command == null || this.Command.CanExecute(this.CommandParameter);
                    this.UpdateVisualState(true);
                };

                MenuItem.prototype.OnGotFocus = function (e) {
                    _super.prototype.OnGotFocus.call(this, e);
                    this.UpdateVisualState(true);
                };
                MenuItem.prototype.OnLostFocus = function (e) {
                    _super.prototype.OnLostFocus.call(this, e);
                    this.UpdateVisualState(true);
                };

                MenuItem.prototype.OnMouseEnter = function (e) {
                    _super.prototype.OnMouseEnter.call(this, e);
                    this.Focus();
                    this.UpdateVisualState(true);
                };
                MenuItem.prototype.OnMouseLeave = function (e) {
                    _super.prototype.OnMouseLeave.call(this, e);
                    if (this.ParentMenuBase != null)
                        this.ParentMenuBase.Focus();
                    this.UpdateVisualState(true);
                };
                MenuItem.prototype.OnMouseLeftButtonDown = function (e) {
                    if (!e.Handled) {
                        this.OnClick();
                        e.Handled = true;
                    }
                    _super.prototype.OnMouseLeftButtonDown.call(this, e);
                };
                MenuItem.prototype.OnMouseRightButtonDown = function (e) {
                    if (!e.Handled) {
                        this.OnClick();
                        e.Handled = true;
                    }
                    _super.prototype.OnMouseRightButtonDown.call(this, e);
                };
                MenuItem.prototype.OnKeyDown = function (e) {
                    if (!e.Handled && Fayde.Input.Key.Enter === e.Key) {
                        this.OnClick();
                        e.Handled = true;
                    }
                    _super.prototype.OnKeyDown.call(this, e);
                };

                MenuItem.prototype.OnClick = function () {
                    var contextMenu = this.ParentMenuBase;
                    if (contextMenu instanceof Input.ContextMenu)
                        contextMenu.ChildMenuItemClicked();
                    this.Click.Raise(this, new Fayde.RoutedEventArgs());
                    if (this.Command == null || !this.Command.CanExecute(this.CommandParameter))
                        return;
                    this.Command.Execute(this.CommandParameter);
                };

                MenuItem.prototype.GetVisualStateCommon = function () {
                    if (!this.IsEnabled) {
                        return "Disabled";
                    } else {
                        return "Normal";
                    }
                };
                MenuItem.CommandProperty = DependencyProperty.Register("Command", function () {
                    return Fayde.Input.ICommand_;
                }, MenuItem, undefined, function (d, args) {
                    return (d).OnCommandChanged(args);
                });

                MenuItem.CommandParameterProperty = DependencyProperty.Register("CommandParameter", function () {
                    return Object;
                }, MenuItem, undefined, function (d, args) {
                    return (d).OnCommandParameterChanged(args);
                });

                MenuItem.IconProperty = DependencyProperty.Register("Icon", function () {
                    return Object;
                }, MenuItem);
                return MenuItem;
            })(Fayde.Controls.HeaderedItemsControl);
            Input.MenuItem = MenuItem;
            Fayde.RegisterType(MenuItem, {
                Name: "MenuItem",
                Namespace: "Fayde.Controls.Input",
                XmlNamespace: Controls.Input.XMLNS
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Controls.Input.js.map
