var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var HeaderedItemsControl = (function (_super) {
            __extends(HeaderedItemsControl, _super);
            function HeaderedItemsControl() {
                _super.call(this);
                this._HeaderIsItem = false;
                this._ItemsControlHelper = new Fayde.Controls.Internal.ItemsControlHelper(this);
            }
            HeaderedItemsControl.prototype.OnHeaderChanged = function (oldHeader, newHeader) {
            };

            HeaderedItemsControl.prototype.OnHeaderTemplateChanged = function (oldHeaderTemplate, newHeaderTemplate) {
            };

            HeaderedItemsControl.prototype.OnItemContainerStyleChanged = function (args) {
                this._ItemsControlHelper.UpdateItemContainerStyle(args.NewValue);
            };

            HeaderedItemsControl.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this._ItemsControlHelper.OnApplyTemplate();
            };

            HeaderedItemsControl.prototype.PrepareContainerForItem = function (element, item) {
                var control = element;
                if (!(control instanceof Fayde.Controls.Control))
                    control = null;

                var ics = this.ItemContainerStyle;
                if (ics != null && control != null && control.Style == null)
                    control.SetValue(Fayde.FrameworkElement.StyleProperty, ics);

                var hic = element;
                if (hic instanceof HeaderedItemsControl)
                    HeaderedItemsControl.PrepareHeaderedItemsControlContainer(hic, item, this, ics);
                _super.prototype.PrepareContainerForItem.call(this, element, item);
            };

            HeaderedItemsControl.PrepareHeaderedItemsControlContainer = function (control, item, parentItemsControl, parentItemContainerStyle) {
                if (control === item)
                    return;
                var itemTemplate = parentItemsControl.ItemTemplate;
                if (itemTemplate != null)
                    control.SetValue(Fayde.Controls.ItemsControl.ItemTemplateProperty, itemTemplate);
                if (parentItemContainerStyle != null && HeaderedItemsControl.HasDefaultValue(control, HeaderedItemsControl.ItemContainerStyleProperty))
                    control.SetValue(HeaderedItemsControl.ItemContainerStyleProperty, parentItemContainerStyle);
                if (control._HeaderIsItem || HeaderedItemsControl.HasDefaultValue(control, HeaderedItemsControl.HeaderProperty)) {
                    control.Header = item;
                    control._HeaderIsItem = true;
                }
                if (itemTemplate != null)
                    control.SetValue(HeaderedItemsControl.HeaderTemplateProperty, itemTemplate);
                if (parentItemContainerStyle != null && control.Style == null)
                    control.SetValue(Fayde.FrameworkElement.StyleProperty, parentItemContainerStyle);
                var hierarchicalDataTemplate = itemTemplate;
                if (!(hierarchicalDataTemplate instanceof Fayde.HierarchicalDataTemplate))
                    return;
                if (hierarchicalDataTemplate.ItemsSource != null && HeaderedItemsControl.HasDefaultValue(control, Fayde.Controls.ItemsControl.ItemsSourceProperty)) {
                    var itemssourcebinding = hierarchicalDataTemplate.ItemsSource;
                    var headeredItemsControl = control;
                    var dp = Fayde.Controls.ItemsControl.ItemsSourceProperty;
                    var binding1 = new Fayde.Data.Binding();
                    binding1.Converter = itemssourcebinding.Converter;
                    binding1.ConverterCulture = itemssourcebinding.ConverterCulture;
                    binding1.ConverterParameter = itemssourcebinding.ConverterParameter;
                    binding1.Mode = itemssourcebinding.Mode;
                    binding1.NotifyOnValidationError = itemssourcebinding.NotifyOnValidationError;
                    binding1.Source = control.Header;
                    binding1.Path = itemssourcebinding.Path;
                    binding1.ValidatesOnExceptions = itemssourcebinding.ValidatesOnExceptions;
                    headeredItemsControl.SetBinding(dp, binding1);
                }
                if (hierarchicalDataTemplate.IsItemTemplateSet && control.ItemTemplate === itemTemplate) {
                    control.ClearValue(Fayde.Controls.ItemsControl.ItemTemplateProperty);
                    if (hierarchicalDataTemplate.ItemTemplate != null)
                        control.ItemTemplate = hierarchicalDataTemplate.ItemTemplate;
                }
                if (!hierarchicalDataTemplate.IsItemContainerStyleSet || control.ItemContainerStyle !== parentItemContainerStyle)
                    return;
                control.ClearValue(HeaderedItemsControl.ItemContainerStyleProperty);
                if (hierarchicalDataTemplate.ItemContainerStyle == null)
                    return;
                control.ItemContainerStyle = hierarchicalDataTemplate.ItemContainerStyle;
            };
            HeaderedItemsControl.HasDefaultValue = function (control, propd) {
                return control.ReadLocalValue(propd) === DependencyProperty.UnsetValue;
            };
            HeaderedItemsControl.HeaderProperty = DependencyProperty.Register("Header", function () {
                return Object;
            }, HeaderedItemsControl, undefined, function (d, args) {
                return d.OnHeaderChanged(args.OldValue, args.NewValue);
            });

            HeaderedItemsControl.HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", function () {
                return Fayde.DataTemplate;
            }, HeaderedItemsControl, undefined, function (d, args) {
                return d.OnHeaderTemplateChanged(args.OldValue, args.NewValue);
            });

            HeaderedItemsControl.ItemContainerStyleProperty = DependencyProperty.Register("ItemContainerStyle", function () {
                return Fayde.Style;
            }, HeaderedItemsControl);
            return HeaderedItemsControl;
        })(Fayde.Controls.ItemsControl);
        Controls.HeaderedItemsControl = HeaderedItemsControl;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
                var valid = e.Direction === 0 /* Increase */ ? 1 /* Increase */ : 2 /* Decrease */;
                if ((this.ValidSpinDirection & valid) !== valid)
                    throw new InvalidOperationException("Invalid Spin Direction");
                this.Spin.Raise(this, e);
            };

            Spinner.prototype.GoToStates = function (gotoFunc) {
                _super.prototype.GoToStates.call(this, gotoFunc);
                this.GoToStateIncrease(gotoFunc);
                this.GoToStateDecrease(gotoFunc);
            };
            Spinner.prototype.GoToStateIncrease = function (gotoFunc) {
                return gotoFunc(((this.ValidSpinDirection & 1 /* Increase */) === 1 /* Increase */) ? "IncreaseEnabled" : "IncreaseDisabled");
            };
            Spinner.prototype.GoToStateDecrease = function (gotoFunc) {
                return gotoFunc(((this.ValidSpinDirection & 2 /* Decrease */) === 2 /* Decrease */) ? "DecreaseEnabled" : "DecreaseDisabled");
            };
            Spinner.ValidSpinDirectionProperty = DependencyProperty.Register("ValidSpinDirection", function () {
                return new Enum(Fayde.Controls.ValidSpinDirections);
            }, Spinner, 1 /* Increase */, function (d, args) {
                return d.OnValidSpinDirectionChanged(args);
            });
            return Spinner;
        })(Fayde.Controls.Control);
        Controls.Spinner = Spinner;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var ButtonSpinner = (function (_super) {
            __extends(ButtonSpinner, _super);
            function ButtonSpinner() {
                _super.call(this);
                this.IsPressed = false;
                this.DefaultStyleKey = this.constructor;
                this._Interaction = new Fayde.Controls.Internal.InteractionHelper(this);
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

            ButtonSpinner.prototype.GoToStateCommon = function (gotoFunc) {
                return this._Interaction.GoToStateCommon(gotoFunc);
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
                this.OnSpin(new Fayde.Controls.SpinEventArgs(sender === this._IncreaseButton ? 0 /* Increase */ : 1 /* Decrease */));
            };

            ButtonSpinner.prototype.SetButtonUsage = function () {
                if (this._IncreaseButton)
                    this._IncreaseButton.IsEnabled = (this.ValidSpinDirection & 1 /* Increase */) === 1 /* Increase */;
                if (this._DecreaseButton)
                    this._DecreaseButton.IsEnabled = (this.ValidSpinDirection & 2 /* Decrease */) === 2 /* Decrease */;
            };
            ButtonSpinner.ContentProperty = DependencyProperty.Register("Content", function () {
                return Object;
            }, ButtonSpinner, undefined, function (d, args) {
                return d.OnContentChanged(args.OldValue, args.NewValue);
            });

            ButtonSpinner.Annotations = { ContentProperty: ButtonSpinner.ContentProperty };
            return ButtonSpinner;
        })(Fayde.Controls.Spinner);
        Controls.ButtonSpinner = ButtonSpinner;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Primitives) {
            var MenuBase = (function (_super) {
                __extends(MenuBase, _super);
                function MenuBase() {
                    _super.apply(this, arguments);
                }
                MenuBase.prototype.IsItemItsOwnContainer = function (item) {
                    return item instanceof Fayde.Controls.MenuItem || item instanceof Fayde.Controls.Separator;
                };
                MenuBase.prototype.GetContainerForItem = function () {
                    return new Fayde.Controls.MenuItem();
                };
                MenuBase.prototype.PrepareContainerForItem = function (element, item) {
                    _super.prototype.PrepareContainerForItem.call(this, element, item);
                    var menuItem = element;
                    if (!(menuItem instanceof Fayde.Controls.MenuItem))
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
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
                this.DefaultStyleKey = this.constructor;
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
                    case 8 /* Escape */:
                        this.ClosePopup();
                        e.Handled = true;
                        break;
                    case 15 /* Up */:
                        this.FocusNextItem(false);
                        e.Handled = true;
                        break;
                    case 17 /* Down */:
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
                var canvas1 = new Fayde.Controls.Canvas();
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
                if (menuItem1 instanceof Fayde.Controls.MenuItem && this === menuItem1.ParentMenuBase)
                    num = this.ItemContainerGenerator.IndexFromContainer(menuItem1);
                var index = num;
                var menuItem2;
                do {
                    index = (index + count + (down ? 1 : -1)) % count;
                    menuItem2 = this.ItemContainerGenerator.ContainerFromIndex(index);
                    if (!(menuItem2 instanceof Fayde.Controls.MenuItem))
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
        })(Fayde.Controls.Primitives.MenuBase);
        Controls.ContextMenu = ContextMenu;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
                if (oldMenu instanceof Fayde.Controls.ContextMenu)
                    oldMenu.Owner = null;
                var newMenu = args.NewValue;
                if (newMenu instanceof Fayde.Controls.ContextMenu)
                    newMenu.Owner = fe;
            };
            ContextMenuService.ContextMenuProperty = DependencyProperty.RegisterAttached("ContextMenu", function () {
                return Fayde.Controls.ContextMenu;
            }, ContextMenuService, undefined, ContextMenuService.OnContextMenuPropertyChanged);
            return ContextMenuService;
        })();
        Controls.ContextMenuService = ContextMenuService;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
                this.DefaultStyleKey = this.constructor;
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
                if (d instanceof Fayde.Controls.TextBox)
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
                if (d instanceof Fayde.Controls.Spinner)
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
                    case 3 /* Enter */:
                        this.ProcessUserInput();
                        e.Handled = true;
                        break;
                    case 15 /* Up */:
                        this.DoIncrement();
                        e.Handled = true;
                        break;
                    case 17 /* Down */:
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
                var e1 = new Fayde.Controls.UpDownParsingEventArgs(text);
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
                    var e2 = new Fayde.Controls.UpDownParseErrorEventArgs(text, error);
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
                if (e.Direction === 0 /* Increase */)
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
                if (this._Spinner && (this._Spinner.ValidSpinDirection & 2 /* Decrease */) !== 2 /* Decrease */)
                    return;
                this.OnDecrement();
            };
            UpDownBase.prototype.OnDecrement = function () {
            };
            UpDownBase.prototype.DoIncrement = function () {
                if (this._Spinner && (this._Spinner.ValidSpinDirection & 1 /* Increase */) !== 1 /* Increase */)
                    return;
                this.OnIncrement();
            };
            UpDownBase.prototype.OnIncrement = function () {
            };
            UpDownBase.SpinnerStyleProperty = DependencyProperty.Register("SpinnerStyle", function () {
                return Fayde.Style;
            }, UpDownBase, undefined, function (d, args) {
                return d.OnSpinnerStyleChanged(args.OldValue, args.NewValue);
            });

            UpDownBase.IsEditableProperty = DependencyProperty.Register("IsEditable", function () {
                return Boolean;
            }, UpDownBase, true, function (d, args) {
                return d.OnIsEditableChanged(args);
            });
            return UpDownBase;
        })(Fayde.Controls.Control);
        Controls.UpDownBase = UpDownBase;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var DomainUpDown = (function (_super) {
            __extends(DomainUpDown, _super);
            function DomainUpDown() {
                _super.call(this);
                this._Items = new Fayde.Controls.Internal.ObservableObjectCollection();
                this._ValueDuringInit = null;
                this._IsNotAllowedToEditByFocus = false;
                this._IsEditing = false;
                this._IsInvalidInput = false;
                this._InitialCurrentIndex = -1;
                this._CurrentIndexDuringInit = null;
                this._CurrentIndexNestLevel = 0;
                this._ValueBindingEvaluator = null;
                this.DefaultStyleKey = this.constructor;
                this._Interaction = new Fayde.Controls.Internal.InteractionHelper(this);
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
                    case 0 /* UseFallbackItem */:
                        break;
                    case 1 /* TextBoxCannotLoseFocus */:
                        break;
                    default:
                        throw new ArgumentException("Invalid input action.");
                }
            };

            DomainUpDown.prototype.OnItemsSourceChanged = function (oldItemsSource, newItemsSource) {
                var oldcc = Fayde.Collections.INotifyCollectionChanged_.As(oldItemsSource);
                if (oldcc)
                    oldcc.CollectionChanged.Unsubscribe(this.OnItemsChanged, this);

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
                    var newcc = Fayde.Collections.INotifyCollectionChanged_.As(newItemsSource);
                    if (newcc)
                        newcc.CollectionChanged.Subscribe(this.OnItemsChanged, this);
                } else {
                    this._Items.Clear();
                }
                this.SetValidSpinDirection();
            };

            Object.defineProperty(DomainUpDown.prototype, "Items", {
                get: function () {
                    if (!this.ItemsSource)
                        return this._Items;
                    var coll = new Fayde.Controls.Internal.ObservableObjectCollection(this.ItemsSource);
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
                    this._ValueBindingEvaluator = new Fayde.Controls.Internal.BindingSourceEvaluator(value);
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

            DomainUpDown.prototype.GoToStates = function (gotoFunc) {
                _super.prototype.GoToStates.call(this, gotoFunc);
                this.GoToStateEditing(gotoFunc);
                this.GoToStateValid(gotoFunc);
            };
            DomainUpDown.prototype.GoToStateEditing = function (gotoFunc) {
                return gotoFunc(this.IsEditing ? "Edit" : "Display");
            };
            DomainUpDown.prototype.GoToStateValid = function (gotoFunc) {
                return gotoFunc(this._IsInvalidInput ? "InvalidDomain" : "ValidDomain");
            };

            DomainUpDown.prototype.OnKeyDown = function (e) {
                if (e != null && ((e.Key === 3 /* Enter */ || e.Key === 9 /* Space */) && !this.IsEditing && this.IsEditable)) {
                    this.SetIsEditing(true);
                    e.Handled = true;
                } else {
                    _super.prototype.OnKeyDown.call(this, e);
                    if (e == null || e.Handled)
                        return;
                    if (e.Key === 8 /* Escape */) {
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
                else if (this.InvalidInputAction === 1 /* TextBoxCannotLoseFocus */ && this.XamlNode.GetFocusedElement() !== this._TextBox)
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
                var validSpinDirections = 0 /* None */;
                if (this.IsCyclic || this.CurrentIndex < num - 1)
                    validSpinDirections |= 2 /* Decrease */;
                if (this.IsCyclic || this.CurrentIndex > 0)
                    validSpinDirections |= 1 /* Increase */;
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
                    var e = new Fayde.Controls.UpDownParseErrorEventArgs(text, err);
                    this.OnParseError(e);
                    if (!e.Handled)
                        this.SetTextBoxText();
                } finally {
                    if (!this._IsInvalidInput || this.InvalidInputAction !== 1 /* TextBoxCannotLoseFocus */)
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
                        if (this.InvalidInputAction === 0 /* UseFallbackItem */) {
                            this.SetIsInvalidInput(false);
                            if (this.FallbackItem != null && Fayde.Enumerable.Contains(this.GetActualItems(), this.FallbackItem))
                                obj = this.FallbackItem;
                            else
                                throw new ArgumentException("Cannot parse value.");
                        } else if (this.InvalidInputAction === 1 /* TextBoxCannotLoseFocus */) {
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
                return d._OnValueChanged(args);
            });

            DomainUpDown.CurrentIndexProperty = DependencyProperty.Register("CurrentIndex", function () {
                return Number;
            }, DomainUpDown, -1, function (d, args) {
                return d._OnCurrentIndexChanged(args);
            });

            DomainUpDown.IsCyclicProperty = DependencyProperty.Register("IsCyclic", function () {
                return Boolean;
            }, DomainUpDown, false, function (d, args) {
                return d._OnIsCyclicChanged(args);
            });

            DomainUpDown.InvalidInputActionProperty = DependencyProperty.Register("InvalidInputAction", function () {
                return new Enum(Fayde.Controls.InvalidInputAction);
            }, DomainUpDown, 0 /* UseFallbackItem */, function (d, args) {
                return d._OnInvalidInputActionPropertyChanged(args);
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
        })(Fayde.Controls.UpDownBase);
        Controls.DomainUpDown = DomainUpDown;

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
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (ValidSpinDirections) {
            ValidSpinDirections[ValidSpinDirections["None"] = 0] = "None";
            ValidSpinDirections[ValidSpinDirections["Increase"] = 1] = "Increase";
            ValidSpinDirections[ValidSpinDirections["Decrease"] = 2] = "Decrease";
        })(Controls.ValidSpinDirections || (Controls.ValidSpinDirections = {}));
        var ValidSpinDirections = Controls.ValidSpinDirections;
        Fayde.RegisterEnum(ValidSpinDirections, "ValidSpinDirections");

        (function (SpinDirection) {
            SpinDirection[SpinDirection["Increase"] = 0] = "Increase";
            SpinDirection[SpinDirection["Decrease"] = 1] = "Decrease";
        })(Controls.SpinDirection || (Controls.SpinDirection = {}));
        var SpinDirection = Controls.SpinDirection;
        Fayde.RegisterEnum(SpinDirection, "SpinDirection");

        (function (InvalidInputAction) {
            InvalidInputAction[InvalidInputAction["UseFallbackItem"] = 0] = "UseFallbackItem";
            InvalidInputAction[InvalidInputAction["TextBoxCannotLoseFocus"] = 1] = "TextBoxCannotLoseFocus";
        })(Controls.InvalidInputAction || (Controls.InvalidInputAction = {}));
        var InvalidInputAction = Controls.InvalidInputAction;
        Fayde.RegisterEnum(InvalidInputAction, "InvalidInputAction");

        (function (Dock) {
            Dock[Dock["Left"] = 0] = "Left";
            Dock[Dock["Top"] = 1] = "Top";
            Dock[Dock["Right"] = 2] = "Right";
            Dock[Dock["Bottom"] = 3] = "Bottom";
        })(Controls.Dock || (Controls.Dock = {}));
        var Dock = Controls.Dock;
        Fayde.RegisterEnum(Dock, "Dock");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
        })(Controls.Internal || (Controls.Internal = {}));
        var Internal = Controls.Internal;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
        })(Controls.Internal || (Controls.Internal = {}));
        var Internal = Controls.Internal;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var MenuItem = (function (_super) {
            __extends(MenuItem, _super);
            function MenuItem() {
                _super.call(this);
                this.Click = new Fayde.RoutedEvent();
                this.DefaultStyleKey = this.constructor;
                this.UpdateIsEnabled();
            }
            MenuItem.prototype.OnCommandChanged = function (args) {
                var oldcmd = Fayde.Input.ICommand_.As(args.OldValue);
                if (oldcmd)
                    oldcmd.CanExecuteChanged.Unsubscribe(this._CanExecuteChanged, this);
                var newcmd = Fayde.Input.ICommand_.As(args.NewValue);
                if (newcmd)
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
                if (!e.Handled && 3 /* Enter */ === e.Key) {
                    this.OnClick();
                    e.Handled = true;
                }
                _super.prototype.OnKeyDown.call(this, e);
            };

            MenuItem.prototype.OnClick = function () {
                var contextMenu = this.ParentMenuBase;
                if (contextMenu instanceof Fayde.Controls.ContextMenu)
                    contextMenu.ChildMenuItemClicked();
                this.Click.Raise(this, new Fayde.RoutedEventArgs());
                if (this.Command == null || !this.Command.CanExecute(this.CommandParameter))
                    return;
                this.Command.Execute(this.CommandParameter);
            };

            MenuItem.prototype.GoToStateCommon = function (gotoFunc) {
                if (!this.IsEnabled)
                    return gotoFunc("Disabled");
                return gotoFunc("Normal");
            };
            MenuItem.CommandProperty = DependencyProperty.Register("Command", function () {
                return Fayde.Input.ICommand_;
            }, MenuItem, undefined, function (d, args) {
                return d.OnCommandChanged(args);
            });

            MenuItem.CommandParameterProperty = DependencyProperty.Register("CommandParameter", function () {
                return Object;
            }, MenuItem, undefined, function (d, args) {
                return d.OnCommandParameterChanged(args);
            });

            MenuItem.IconProperty = DependencyProperty.Register("Icon", function () {
                return Object;
            }, MenuItem);
            return MenuItem;
        })(Fayde.Controls.HeaderedItemsControl);
        Controls.MenuItem = MenuItem;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
                this.DefaultStyleKey = this.constructor;
                this._Interaction = new Fayde.Controls.Internal.InteractionHelper(this);
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
                var validSpinDirections = 0 /* None */;
                if (this.Value < this.Maximum)
                    validSpinDirections |= 1 /* Increase */;
                if (this.Value > this.Minimum)
                    validSpinDirections |= 2 /* Decrease */;
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
                return d._OnValueChanged(args);
            });

            NumericUpDown.MinimumProperty = DependencyProperty.Register("Minimum", function () {
                return Number;
            }, NumericUpDown, 0.0, function (d, args) {
                return d._OnMinimumChanged(args);
            });

            NumericUpDown.MaximumProperty = DependencyProperty.Register("Maximum", function () {
                return Number;
            }, NumericUpDown, 100.0, function (d, args) {
                return d._OnMaximumChanged(args);
            });

            NumericUpDown.IncrementProperty = DependencyProperty.Register("Increment", function () {
                return Number;
            }, NumericUpDown, 1.0, function (d, args) {
                return d._OnIncrementChanged(args);
            });

            NumericUpDown.DecimalPlacesProperty = DependencyProperty.Register("DecimalPlaces", function () {
                return Number;
            }, NumericUpDown, 0, function (d, args) {
                return d._OnDecimalPlacesChanged(args);
            });
            return NumericUpDown;
        })(Fayde.Controls.UpDownBase);
        Controls.NumericUpDown = NumericUpDown;

        function isValidDoubleValue(value, outValue) {
            return !isNaN(value) && isFinite(value) && value <= 7.92281625142643E+28 && value >= -7.92281625142643E+28;
        }
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var Separator = (function (_super) {
            __extends(Separator, _super);
            function Separator() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
            }
            return Separator;
        })(Fayde.Controls.Control);
        Controls.Separator = Separator;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var SpinEventArgs = (function (_super) {
            __extends(SpinEventArgs, _super);
            function SpinEventArgs(direction) {
                _super.call(this);
                Object.defineProperty(this, "Direction", { value: direction, writable: false });
            }
            return SpinEventArgs;
        })(Fayde.RoutedEventArgs);
        Controls.SpinEventArgs = SpinEventArgs;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
        Controls.UpDownParseErrorEventArgs = UpDownParseErrorEventArgs;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
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
        Controls.UpDownParsingEventArgs = UpDownParsingEventArgs;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Internal) {
            var VSM = Fayde.Media.VSM;

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
                InteractionHelper.prototype.GoToStateCommon = function (gotoFunc) {
                    if (!this.Control.IsEnabled)
                        return gotoFunc("Disabled");
                    if (this.IsReadOnly)
                        return gotoFunc("ReadOnly");
                    if (this.IsPressed)
                        return gotoFunc("Pressed");
                    if (this.IsMouseOver)
                        return gotoFunc("MouseOver");
                    return gotoFunc("Normal");
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
                    if (flowDirection === 1 /* RightToLeft */) {
                        switch (originalKey) {
                            case 14 /* Left */:
                                key = 16 /* Right */;
                                break;
                            case 16 /* Right */:
                                key = 14 /* Left */;
                                break;
                        }
                    }
                    return key;
                };

                InteractionHelper.TryGetVisualStateGroup = function (control, name) {
                    if (Fayde.VisualTreeHelper.GetChildrenCount(control) < 1)
                        return null;
                    var root = Fayde.VisualTreeHelper.GetChild(control, 0);
                    if (!root)
                        return null;
                    var groups = VSM.VisualStateManager.GetVisualStateGroups(root);
                    if (!groups)
                        return null;
                    var enumerator = groups.GetEnumerator();
                    while (enumerator.MoveNext()) {
                        if (enumerator.Current.Name === name)
                            return enumerator.Current;
                    }
                };
                return InteractionHelper;
            })();
            Internal.InteractionHelper = InteractionHelper;
        })(Controls.Internal || (Controls.Internal = {}));
        var Internal = Controls.Internal;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Internal) {
            var NumericExtensions = (function () {
                function NumericExtensions() {
                }
                NumericExtensions.IsZero = function (value) {
                    return Math.abs(value) < 2.22044604925031E-15;
                };
                NumericExtensions.IsGreaterThan = function (left, right) {
                    if (left > right)
                        return !NumericExtensions.AreClose(left, right);
                    else
                        return false;
                };
                NumericExtensions.IsLessThanOrClose = function (left, right) {
                    if (left >= right)
                        return NumericExtensions.AreClose(left, right);
                    else
                        return true;
                };
                NumericExtensions.AreClose = function (left, right) {
                    if (left === right)
                        return true;
                    var num1 = (Math.abs(left) + Math.abs(right) + 10.0) * 2.22044604925031E-16;
                    var num2 = left - right;
                    if (-num1 < num2)
                        return num1 > num2;
                    else
                        return false;
                };
                return NumericExtensions;
            })();
            Internal.NumericExtensions = NumericExtensions;
        })(Controls.Internal || (Controls.Internal = {}));
        var Internal = Controls.Internal;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Internal) {
            var ItemsControlHelper = (function () {
                function ItemsControlHelper(control) {
                    this.ItemsControl = control;
                }
                Object.defineProperty(ItemsControlHelper.prototype, "ItemsHost", {
                    get: function () {
                        if (!(this._itemsHost instanceof Fayde.Controls.Panel) && this.ItemsControl != null && this.ItemsControl.ItemContainerGenerator != null) {
                            var container = this.ItemsControl.ItemContainerGenerator.ContainerFromIndex(0);
                            if (container != null)
                                this._itemsHost = Fayde.VisualTreeHelper.GetParent(container);
                        }
                        return this._itemsHost;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemsControlHelper.prototype, "ScrollHost", {
                    get: function () {
                        if (!this._scrollHost) {
                            var itemsHost = this.ItemsHost;
                            if (itemsHost != null) {
                                for (var cur = itemsHost; cur !== this.ItemsControl && cur != null; cur = Fayde.VisualTreeHelper.GetParent(cur)) {
                                    var scrollViewer = cur;
                                    if (scrollViewer instanceof Fayde.Controls.ScrollViewer) {
                                        this._scrollHost = scrollViewer;
                                        break;
                                    }
                                }
                            }
                        }
                        return this._scrollHost;
                    },
                    enumerable: true,
                    configurable: true
                });

                ItemsControlHelper.prototype.OnApplyTemplate = function () {
                    this._itemsHost = null;
                    this._scrollHost = null;
                };

                ItemsControlHelper.PrepareContainerForItemOverride = function (element, parentItemContainerStyle) {
                    if (!parentItemContainerStyle)
                        return;
                    var control = element instanceof Fayde.Controls.Control ? element : null;
                    if (!control || control.Style != null)
                        return;
                    control.SetValue(Fayde.FrameworkElement.StyleProperty, parentItemContainerStyle);
                };

                ItemsControlHelper.prototype.UpdateItemContainerStyle = function (itemContainerStyle) {
                    if (!itemContainerStyle)
                        return;
                    var itemsHost = this.ItemsHost;
                    if (!itemsHost || !itemsHost.Children)
                        return;
                    var enumerator = itemsHost.Children.GetEnumerator();
                    while (enumerator.MoveNext()) {
                        var cur = enumerator.Current;
                        if (!cur.Style)
                            cur.Style = itemContainerStyle;
                    }
                };

                ItemsControlHelper.prototype.ScrollIntoView = function (element) {
                    var scrollHost = this.ScrollHost;
                    if (!scrollHost)
                        return;
                    var generalTransform;
                    try  {
                        generalTransform = element.TransformToVisual(scrollHost);
                    } catch (err) {
                        return;
                    }
                    var tl = generalTransform.Transform(new Point());
                    var sz = generalTransform.Transform(new Point(element.ActualWidth, element.ActualHeight));
                    var r = new rect();
                    rect.set(r, tl.X, tl.Y, sz.X, sz.Y);

                    var verticalOffset = scrollHost.VerticalOffset;
                    var num1 = 0.0;
                    var viewportHeight = scrollHost.ViewportHeight;
                    var bottom = r.Y + r.Height;
                    if (viewportHeight < bottom) {
                        num1 = bottom - viewportHeight;
                        verticalOffset += num1;
                    }
                    var top = r.Y;
                    if (top - num1 < 0.0)
                        verticalOffset -= num1 - top;
                    scrollHost.ScrollToVerticalOffset(verticalOffset);
                    var horizontalOffset = scrollHost.HorizontalOffset;
                    var num2 = 0.0;
                    var viewportWidth = scrollHost.ViewportWidth;
                    var right = r.X + r.Width;
                    if (viewportWidth < right) {
                        num2 = right - viewportWidth;
                        horizontalOffset += num2;
                    }
                    var left = r.X;
                    if (left - num2 < 0.0)
                        horizontalOffset -= num2 - left;
                    scrollHost.ScrollToHorizontalOffset(horizontalOffset);
                };
                return ItemsControlHelper;
            })();
            Internal.ItemsControlHelper = ItemsControlHelper;
        })(Controls.Internal || (Controls.Internal = {}));
        var Internal = Controls.Internal;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        (function (Internal) {
            var LineChange = 16.0;
            var ScrollExtensions = (function () {
                function ScrollExtensions() {
                }
                ScrollExtensions.LineUp = function (viewer) {
                    scrollByVerticalOffset(viewer, -16.0);
                };
                ScrollExtensions.LineDown = function (viewer) {
                    scrollByVerticalOffset(viewer, 16.0);
                };
                ScrollExtensions.LineLeft = function (viewer) {
                    scrollByHorizontalOffset(viewer, -16.0);
                };
                ScrollExtensions.LineRight = function (viewer) {
                    scrollByHorizontalOffset(viewer, 16.0);
                };

                ScrollExtensions.PageUp = function (viewer) {
                    scrollByVerticalOffset(viewer, -viewer.ViewportHeight);
                };
                ScrollExtensions.PageDown = function (viewer) {
                    scrollByVerticalOffset(viewer, viewer.ViewportHeight);
                };
                ScrollExtensions.PageLeft = function (viewer) {
                    scrollByHorizontalOffset(viewer, -viewer.ViewportWidth);
                };
                ScrollExtensions.PageRight = function (viewer) {
                    scrollByHorizontalOffset(viewer, viewer.ViewportWidth);
                };

                ScrollExtensions.ScrollToTop = function (viewer) {
                    viewer.ScrollToVerticalOffset(0.0);
                };
                ScrollExtensions.ScrollToBottom = function (viewer) {
                    viewer.ScrollToVerticalOffset(viewer.ExtentHeight);
                };

                ScrollExtensions.GetTopAndBottom = function (element, parent, top, bottom) {
                    var xform = element.TransformToVisual(parent);
                    top.Value = xform.Transform(new Point(0.0, 0.0)).Y;
                    bottom.Value = xform.Transform(new Point(0.0, element.ActualHeight)).Y;
                };
                return ScrollExtensions;
            })();
            Internal.ScrollExtensions = ScrollExtensions;

            function scrollByVerticalOffset(viewer, offset) {
                offset += viewer.VerticalOffset;
                offset = Math.max(Math.min(offset, viewer.ExtentHeight), 0.0);
                viewer.ScrollToVerticalOffset(offset);
            }
            function scrollByHorizontalOffset(viewer, offset) {
                offset += viewer.HorizontalOffset;
                offset = Math.max(Math.min(offset, viewer.ExtentWidth), 0.0);
                viewer.ScrollToHorizontalOffset(offset);
            }
        })(Controls.Internal || (Controls.Internal = {}));
        var Internal = Controls.Internal;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var NumericExtensions = Fayde.Controls.Internal.NumericExtensions;
        var ScrollExtensions = Fayde.Controls.Internal.ScrollExtensions;

        var TreeViewItem = (function (_super) {
            __extends(TreeViewItem, _super);
            function TreeViewItem() {
                _super.call(this);
                this.Collapsed = new Fayde.RoutedEvent();
                this.Expanded = new Fayde.RoutedEvent();
                this.Selected = new Fayde.RoutedEvent();
                this.Unselected = new Fayde.RoutedEvent();
                this._AllowWrite = false;
                this.DefaultStyleKey = this.constructor;
                this.Interaction = new Fayde.Controls.Internal.InteractionHelper(this);
            }
            TreeViewItem.prototype.$SetHasItems = function (value) {
                try  {
                    this._AllowWrite = true;
                    this.SetValueInternal(TreeViewItem.HasItemsProperty, value);
                } finally {
                    this._AllowWrite = false;
                }
            };

            TreeViewItem.prototype.$SetIsSelectionActive = function (value) {
                try  {
                    this._AllowWrite = true;
                    this.SetValueInternal(TreeViewItem.IsSelectionActiveProperty, value === true);
                } finally {
                    this._AllowWrite = false;
                }
            };

            TreeViewItem.prototype.OnHasItemsChanged = function (e) {
                if (this.IgnorePropertyChange)
                    this.IgnorePropertyChange = false;
                else if (!this._AllowWrite) {
                    this.IgnorePropertyChange = true;
                    this.SetValueInternal(TreeViewItem.HasItemsProperty, e.OldValue);
                    throw new InvalidOperationException("Cannot set read-only property HasItems.");
                } else
                    this.UpdateVisualState(true);
            };
            TreeViewItem.prototype.OnIsExpandedPropertyChanged = function (e) {
                var newValue = e.NewValue === true;
                if (newValue)
                    this.OnExpanded(new Fayde.RoutedEventArgs());
                else
                    this.OnCollapsed(new Fayde.RoutedEventArgs());
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
            };
            TreeViewItem.prototype.OnIsSelectedChanged = function (e) {
                if (this.IgnorePropertyChange) {
                    this.IgnorePropertyChange = false;
                } else if (e.NewValue === true) {
                    this.Select(true);
                    this.OnSelected(new Fayde.RoutedEventArgs());
                } else {
                    this.Select(false);
                    this.OnUnselected(new Fayde.RoutedEventArgs());
                }
            };
            TreeViewItem.prototype.OnIsSelectionActiveChanged = function (e) {
                if (this.IgnorePropertyChange)
                    this.IgnorePropertyChange = false;
                else if (!this._AllowWrite) {
                    this.IgnorePropertyChange = true;
                    this.SetValueInternal(TreeViewItem.IsSelectionActiveProperty, e.OldValue);
                    throw new InvalidOperationException("Cannot set read-only property IsSelectionActive.");
                } else
                    this.UpdateVisualState(true);
            };

            Object.defineProperty(TreeViewItem.prototype, "ExpanderButton", {
                get: function () {
                    return this._expanderButton;
                },
                set: function (value) {
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
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewItem.prototype, "HeaderElement", {
                get: function () {
                    return this._headerElement;
                },
                set: function (value) {
                    if (this._headerElement)
                        this._headerElement.MouseLeftButtonDown.Unsubscribe(this.OnHeaderMouseLeftButtonDown, this);
                    this._headerElement = value;
                    if (this._headerElement)
                        this._headerElement.MouseLeftButtonDown.Subscribe(this.OnHeaderMouseLeftButtonDown, this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewItem.prototype, "ExpansionStateGroup", {
                get: function () {
                    return this._expansionStateGroup;
                },
                set: function (value) {
                    if (this._expansionStateGroup)
                        this._expansionStateGroup.CurrentStateChanged.Unsubscribe(this.OnExpansionStateGroupStateChanged, this);
                    this._expansionStateGroup = value;
                    if (this._expansionStateGroup)
                        this._expansionStateGroup.CurrentStateChanged.Subscribe(this.OnExpansionStateGroupStateChanged, this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewItem.prototype, "ParentItemsControl", {
                get: function () {
                    return this._parentItemsControl;
                },
                set: function (value) {
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
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewItem.prototype, "ParentTreeViewItem", {
                get: function () {
                    var pic = this.ParentItemsControl;
                    if (pic instanceof TreeViewItem)
                        return pic;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewItem.prototype, "ParentTreeView", {
                get: function () {
                    for (var tvi = this; tvi != null; tvi = tvi.ParentTreeViewItem) {
                        var treeView = tvi.ParentItemsControl;
                        if (treeView instanceof Fayde.Controls.TreeView)
                            return treeView;
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewItem.prototype, "IsRoot", {
                get: function () {
                    return this.ParentItemsControl instanceof Fayde.Controls.TreeView;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "CanExpandOnInput", {
                get: function () {
                    return this.HasItems && this.IsEnabled;
                },
                enumerable: true,
                configurable: true
            });

            TreeViewItem.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this.ExpanderButton = this.GetTemplateChild("ExpanderButton", Fayde.Controls.Primitives.ToggleButton);
                this.HeaderElement = this.GetTemplateChild("Header", Fayde.FrameworkElement);
                this.ExpansionStateGroup = Fayde.Controls.Internal.InteractionHelper.TryGetVisualStateGroup(this, "ExpansionStates");
                this.UpdateVisualState(false);
            };

            TreeViewItem.prototype.OnExpansionStateGroupStateChanged = function (sender, e) {
                if (e.NewState.Name && e.NewState.Name.toLowerCase() === "expanded")
                    this.BringIntoView();
            };

            TreeViewItem.prototype.BringIntoView = function () {
                var _this = this;
                if (!this.UserInitiatedExpansion)
                    return;
                this.UserInitiatedExpansion = false;
                var parent = this.ParentTreeView;
                if (!parent)
                    return;
                setTimeout(function () {
                    parent.ItemsControlHelper.ScrollIntoView(_this);
                }, 1);
            };

            TreeViewItem.prototype.GoToStates = function (gotoFunc) {
                gotoFunc(this.IsExpanded ? "Expanded" : "Collapsed");
                gotoFunc(this.HasItems ? "HasItems" : "NoItems");
                if (this.IsSelected)
                    gotoFunc(this.IsSelectionActive ? "Selected" : "SelectedInactive");
                else
                    gotoFunc("Unselected");
            };

            TreeViewItem.prototype.GetContainerForItem = function () {
                return new TreeViewItem();
            };
            TreeViewItem.prototype.IsItemItsOwnContainer = function (item) {
                return item instanceof TreeViewItem;
            };
            TreeViewItem.prototype.PrepareContainerForItem = function (element, item) {
                var treeViewItem = element;
                if (treeViewItem instanceof TreeViewItem)
                    treeViewItem.ParentItemsControl = this;
                _super.prototype.PrepareContainerForItem.call(this, element, item);
            };
            TreeViewItem.prototype.ClearContainerForItem = function (element, item) {
                var treeViewItem = element;
                if (treeViewItem instanceof TreeViewItem)
                    treeViewItem.ParentItemsControl = null;
                _super.prototype.ClearContainerForItem.call(this, element, item);
            };

            TreeViewItem.prototype.InvokeItemsChanged = function (sender, e) {
                _super.prototype.InvokeItemsChanged.call(this, sender, e);
                this.$SetHasItems(this.Items.Count > 0);
            };
            TreeViewItem.prototype.OnItemsChanged = function (e) {
                if (e == null)
                    throw new ArgumentException("e");
                _super.prototype.OnItemsChanged.call(this, e);
                if (e.NewItems != null) {
                    for (var i = 0, items = e.NewItems, len = items.length; i < len; i++) {
                        items[i].ParentItemsControl = this;
                    }
                }
                switch (e.Action) {
                    case 2 /* Remove */:
                    case 4 /* Reset */:
                        if (this.ContainsSelection) {
                            var parentTreeView = this.ParentTreeView;
                            if (parentTreeView != null && !parentTreeView.IsSelectedContainerHookedUp) {
                                this.ContainsSelection = false;
                                this.Select(true);
                            }
                        }
                        break;
                    case 3 /* Replace */:
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
                for (var i = 0, items = e.OldItems, len = items.length; i < len; i++) {
                    items[i].ParentItemsControl = null;
                }
            };

            TreeViewItem.prototype.OnExpanded = function (e) {
                this.ToggleExpanded();
                this.Expanded.Raise(this, e);
            };
            TreeViewItem.prototype.OnCollapsed = function (e) {
                this.ToggleExpanded();
                this.Collapsed.Raise(this, e);
            };
            TreeViewItem.prototype.ToggleExpanded = function () {
                var expanderButton = this.ExpanderButton;
                if (!expanderButton)
                    return;
                expanderButton.IsChecked = this.IsExpanded;
                this.UpdateVisualState(true);
            };

            TreeViewItem.prototype.OnSelected = function (e) {
                this.UpdateVisualState(true);
                this.Selected.Raise(this, e);
            };
            TreeViewItem.prototype.OnUnselected = function (e) {
                this.UpdateVisualState(true);
                this.Unselected.Raise(this, e);
            };

            TreeViewItem.prototype.OnGotFocus = function (e) {
                var parentTreeViewItem = this.ParentTreeViewItem;
                if (parentTreeViewItem)
                    parentTreeViewItem.CancelGotFocusBubble = true;
                try  {
                    if (!this.Interaction.AllowGotFocus(e) || this.CancelGotFocusBubble)
                        return;
                    this.Select(true);
                    this.$SetIsSelectionActive(true);
                    this.UpdateVisualState(true);
                    _super.prototype.OnGotFocus.call(this, e);
                } finally {
                    this.CancelGotFocusBubble = false;
                }
            };
            TreeViewItem.prototype.OnLostFocus = function (e) {
                if (this.Interaction.AllowLostFocus(e)) {
                    this.Interaction.OnLostFocusBase();
                    _super.prototype.OnLostFocus.call(this, e);
                }
                this.$SetIsSelectionActive(false);
                this.UpdateVisualState(true);
            };
            TreeViewItem.prototype.OnExpanderGotFocus = function (sender, e) {
                this.CancelGotFocusBubble = true;
                this.$SetIsSelectionActive(true);
                this.UpdateVisualState(true);
            };
            TreeViewItem.prototype.OnMouseEnter = function (e) {
                if (!this.Interaction.AllowMouseEnter(e))
                    return;
                this.UpdateVisualState(true);
                _super.prototype.OnMouseEnter.call(this, e);
            };
            TreeViewItem.prototype.OnMouseLeave = function (e) {
                if (!this.Interaction.AllowMouseLeave(e))
                    return;
                this.UpdateVisualState(true);
                _super.prototype.OnMouseLeave.call(this, e);
            };
            TreeViewItem.prototype.OnHeaderMouseLeftButtonDown = function (sender, e) {
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
            };
            TreeViewItem.prototype.OnExpanderClick = function (sender, e) {
                var isExpanded = this.IsExpanded;
                this.UserInitiatedExpansion = this.UserInitiatedExpansion || !isExpanded;
                this.IsExpanded = !isExpanded;
            };
            TreeViewItem.prototype.OnMouseLeftButtonDown = function (e) {
                if (e == null)
                    throw new ArgumentException("e");
                var parentTreeView;
                if (!e.Handled && (parentTreeView = this.ParentTreeView) != null && parentTreeView.HandleMouseButtonDown())
                    e.Handled = true;
                _super.prototype.OnMouseLeftButtonDown.call(this, e);
            };
            TreeViewItem.prototype.OnMouseLeftButtonUp = function (e) {
                if (!this.Interaction.AllowMouseLeftButtonUp(e))
                    return;
                this.UpdateVisualState(true);
                _super.prototype.OnMouseLeftButtonUp.call(this, e);
            };

            TreeViewItem.prototype.OnKeyDown = function (e) {
                _super.prototype.OnKeyDown.call(this, e);
                if (this.Interaction.AllowKeyDown(e)) {
                    if (e.Handled)
                        return;
                    switch (Fayde.Controls.Internal.InteractionHelper.GetLogicalKey(this.FlowDirection, e.Key)) {
                        case 14 /* Left */:
                            if (!isControlKeyDown() && this.CanExpandOnInput && this.IsExpanded) {
                                if (this.IsFocused)
                                    this.Focus();
                                else
                                    this.IsExpanded = false;
                                e.Handled = true;
                                break;
                            } else
                                break;
                        case 15 /* Up */:
                            if (!isControlKeyDown() && this.HandleUpKey()) {
                                e.Handled = true;
                                break;
                            } else
                                break;
                        case 16 /* Right */:
                            if (!isControlKeyDown() && this.CanExpandOnInput) {
                                if (!this.IsExpanded) {
                                    this.UserInitiatedExpansion = true;
                                    this.IsExpanded = true;
                                    e.Handled = true;
                                    break;
                                } else if (this.HandleDownKey()) {
                                    e.Handled = true;
                                    break;
                                } else
                                    break;
                            } else
                                break;
                        case 17 /* Down */:
                            if (!isControlKeyDown() && this.HandleDownKey()) {
                                e.Handled = true;
                                break;
                            } else
                                break;
                        case 79 /* Add */:
                            if (this.CanExpandOnInput && !this.IsExpanded) {
                                this.UserInitiatedExpansion = true;
                                this.IsExpanded = true;
                                e.Handled = true;
                                break;
                            } else
                                break;
                        case 80 /* Subtract */:
                            if (this.CanExpandOnInput && this.IsExpanded) {
                                this.IsExpanded = false;
                                e.Handled = true;
                                break;
                            } else
                                break;
                    }
                }
                if (!this.IsRoot)
                    return;
                var parentTreeView = this.ParentTreeView;
                if (!parentTreeView)
                    return;
                parentTreeView.PropagateKeyDown(e);
            };
            TreeViewItem.prototype.HandleDownKey = function () {
                return this.AllowKeyHandleEvent() && this.FocusDown();
            };
            TreeViewItem.prototype.OnKeyUp = function (e) {
                if (!this.Interaction.AllowKeyUp(e))
                    return;
                _super.prototype.OnKeyUp.call(this, e);
            };
            TreeViewItem.prototype.HandleUpKey = function () {
                if (this.AllowKeyHandleEvent()) {
                    var previousFocusableItem = this.FindPreviousFocusableItem();
                    if (previousFocusableItem != null) {
                        if (previousFocusableItem != this.ParentItemsControl || previousFocusableItem != this.ParentTreeView)
                            return previousFocusableItem.Focus();
                        return true;
                    }
                }
                return false;
            };

            TreeViewItem.prototype.HandleScrollByPage = function (up, scrollHost, viewportHeight, top, bottom, currentDelta) {
                var closeEdge1 = { Value: 0.0 };
                currentDelta.Value = calculateDelta(up, this, scrollHost, top, bottom, closeEdge1);
                if (NumericExtensions.IsGreaterThan(closeEdge1.Value, viewportHeight) || NumericExtensions.IsLessThanOrClose(currentDelta.Value, viewportHeight))
                    return false;
                var flag1 = false;
                var headerElement = this.HeaderElement;
                if (headerElement != null && NumericExtensions.IsLessThanOrClose(calculateDelta(up, headerElement, scrollHost, top, bottom, { Value: 0 }), viewportHeight))
                    flag1 = true;
                var tvi1 = null;
                var count = this.Items.Count;
                var flag2 = up && this.ContainsSelection;
                var index = up ? count - 1 : 0;
                while (0 <= index && index < count) {
                    var tvi2 = this.ItemContainerGenerator.ContainerFromIndex(index);
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
                        var currentDelta1 = { Value: 0 };
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
            };

            TreeViewItem.prototype.Select = function (selected) {
                var parentTreeView = this.ParentTreeView;
                if (!parentTreeView || parentTreeView.IsSelectionChangeActive)
                    return;
                var parentTreeViewItem = this.ParentTreeViewItem;
                var itemOrContainer = parentTreeViewItem != null ? parentTreeViewItem.ItemContainerGenerator.ItemFromContainer(this) : parentTreeView.ItemContainerGenerator.ItemFromContainer(this);
                parentTreeView.ChangeSelection(itemOrContainer, this, selected);
            };

            TreeViewItem.prototype.UpdateContainsSelection = function (selected) {
                for (var parentTreeViewItem = this.ParentTreeViewItem; parentTreeViewItem != null; parentTreeViewItem = parentTreeViewItem.ParentTreeViewItem)
                    parentTreeViewItem.ContainsSelection = selected;
            };

            TreeViewItem.prototype.AllowKeyHandleEvent = function () {
                return this.IsSelected;
            };

            TreeViewItem.prototype.FocusDown = function () {
                var nextFocusableItem = this.FindNextFocusableItem(true);
                return nextFocusableItem && nextFocusableItem.Focus();
            };
            TreeViewItem.prototype.FocusInto = function () {
                var lastFocusableItem = this.FindLastFocusableItem();
                return lastFocusableItem && lastFocusableItem.Focus();
            };

            TreeViewItem.prototype.FindNextFocusableItem = function (recurse) {
                if (recurse && this.IsExpanded && this.HasItems) {
                    var treeViewItem = this.ItemContainerGenerator.ContainerFromIndex(0);
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
                        var treeViewItem = parentItemsControl.ItemContainerGenerator.ContainerFromIndex(index);
                        if (treeViewItem instanceof TreeViewItem && treeViewItem.IsEnabled)
                            return treeViewItem;
                    }
                    var parentTreeViewItem = this.ParentTreeViewItem;
                    if (parentTreeViewItem instanceof TreeViewItem)
                        return parentTreeViewItem.FindNextFocusableItem(false);
                }
                return null;
            };
            TreeViewItem.prototype.FindLastFocusableItem = function () {
                var tvi1 = this;
                var tvi2 = null;
                for (var index = -1; tvi1 instanceof TreeViewItem; tvi1 = tvi2.ItemContainerGenerator.ContainerFromIndex(index)) {
                    if (tvi1.IsEnabled) {
                        if (!tvi1.IsExpanded || !tvi1.HasItems)
                            return tvi1;
                        tvi2 = tvi1;
                        index = tvi1.Items.Count - 1;
                    } else if (index > 0)
                        --index;
                    else
                        break;
                }
                return tvi2;
            };
            TreeViewItem.prototype.FindPreviousFocusableItem = function () {
                var parentItemsControl = this.ParentItemsControl;
                if (!parentItemsControl)
                    return null;
                var index = parentItemsControl.ItemContainerGenerator.IndexFromContainer(this);
                while (index-- > 0) {
                    var treeViewItem = parentItemsControl.ItemContainerGenerator.ContainerFromIndex(index);
                    if (treeViewItem instanceof TreeViewItem && treeViewItem.IsEnabled) {
                        var lastFocusableItem = treeViewItem.FindLastFocusableItem();
                        if (lastFocusableItem != null)
                            return lastFocusableItem;
                    }
                }
                return parentItemsControl;
            };
            TreeViewItem.HasItemsProperty = DependencyProperty.RegisterReadOnly("HasItems", function () {
                return Boolean;
            }, TreeViewItem, false, function (d, args) {
                return d.OnHasItemsChanged(args);
            });
            TreeViewItem.IsExpandedProperty = DependencyProperty.Register("IsExpanded", function () {
                return Boolean;
            }, TreeViewItem, false, function (d, args) {
                return d.OnIsExpandedPropertyChanged(args);
            });
            TreeViewItem.IsSelectedProperty = DependencyProperty.Register("IsSelected", function () {
                return Boolean;
            }, TreeViewItem, false, function (d, args) {
                return d.OnIsSelectedChanged(args);
            });
            TreeViewItem.IsSelectionActiveProperty = DependencyProperty.RegisterReadOnly("IsSelectionActive", function () {
                return Boolean;
            }, TreeViewItem, false, function (d, args) {
                return d.OnIsSelectionActiveChanged(args);
            });
            return TreeViewItem;
        })(Fayde.Controls.HeaderedItemsControl);
        Controls.TreeViewItem = TreeViewItem;

        function calculateDelta(up, element, scrollHost, top, bottom, closeEdge) {
            var top1 = { Value: 0 };
            var bottom1 = { Value: 0 };
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
        function isControlKeyDown() {
            return (Fayde.Input.Keyboard.Modifiers & 2 /* Control */) === 2 /* Control */;
        }
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var NumericExtensions = Fayde.Controls.Internal.NumericExtensions;
        var ScrollExtensions = Fayde.Controls.Internal.ScrollExtensions;

        var TreeView = (function (_super) {
            __extends(TreeView, _super);
            function TreeView() {
                _super.call(this);
                this.SelectedItemChanged = new Fayde.RoutedPropertyChangedEvent();
                this.DefaultStyleKey = this.constructor;
                this.ItemsControlHelper = new Fayde.Controls.Internal.ItemsControlHelper(this);
                this.Interaction = new Fayde.Controls.Internal.InteractionHelper(this);
            }
            TreeView.prototype.OnSelectedItemChanged = function (e) {
                if (this._IgnorePropertyChange)
                    this._IgnorePropertyChange = false;
                else if (!this._AllowWrite) {
                    this._IgnorePropertyChange = true;
                    this.SetValue(TreeView.SelectedItemProperty, e.OldValue);
                    throw new InvalidOperationException("Cannot set read-only property SelectedItem.");
                } else
                    this.UpdateSelectedValue(e.NewValue);
            };
            TreeView.prototype.OnSelectedValueChanged = function (e) {
                if (this._IgnorePropertyChange) {
                    this._IgnorePropertyChange = false;
                } else {
                    if (this._AllowWrite)
                        return;
                    this._IgnorePropertyChange = true;
                    this.SetValue(TreeView.SelectedValueProperty, e.OldValue);
                    throw new InvalidOperationException("Cannot set read-only property SelectedValue.");
                }
            };
            TreeView.prototype.OnSelectedValuePathChanged = function (e) {
                this.UpdateSelectedValue(this.SelectedItem);
            };
            TreeView.prototype.OnItemContainerStyleChanged = function (e) {
                this.ItemsControlHelper.UpdateItemContainerStyle(e.NewValue);
            };

            TreeView.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this.ItemsControlHelper.OnApplyTemplate();
                this.UpdateVisualState(false);
            };

            TreeView.prototype.GetContainerForItem = function () {
                return new Fayde.Controls.TreeViewItem();
            };
            TreeView.prototype.IsItemItsOwnContainer = function (item) {
                return item instanceof Fayde.Controls.TreeViewItem;
            };
            TreeView.prototype.PrepareContainerForItem = function (element, item) {
                var treeViewItem = element;
                if (treeViewItem instanceof Fayde.Controls.TreeViewItem)
                    treeViewItem.ParentItemsControl = this;
                Fayde.Controls.Internal.ItemsControlHelper.PrepareContainerForItemOverride(element, this.ItemContainerStyle);
                Fayde.Controls.HeaderedItemsControl.PrepareHeaderedItemsControlContainer(treeViewItem, item, this, this.ItemContainerStyle);
                _super.prototype.PrepareContainerForItem.call(this, element, item);
            };
            TreeView.prototype.ClearContainerForItem = function (element, item) {
                var treeViewItem = element;
                if (treeViewItem instanceof Fayde.Controls.TreeViewItem)
                    treeViewItem.ParentItemsControl = null;
                _super.prototype.ClearContainerForItem.call(this, element, item);
            };

            TreeView.prototype.OnItemsChanged = function (e) {
                if (!e)
                    throw new ArgumentException("e");
                _super.prototype.OnItemsChanged.call(this, e);
                if (e.NewItems != null) {
                    for (var i = 0, items = e.NewItems, len = items.length; i < len; i++) {
                        items[i].ParentItemsControl = this;
                    }
                }

                switch (e.Action) {
                    case 2 /* Remove */:
                    case 4 /* Reset */:
                        if (this.SelectedItem != null && !this.IsSelectedContainerHookedUp)
                            this.SelectFirstItem();
                        break;
                    case 3 /* Replace */:
                        var selectedItem = this.SelectedItem;
                        if (selectedItem != null && (e.OldItems == null || Nullstone.Equals(selectedItem, e.OldItems[0])))
                            this.ChangeSelection(selectedItem, this.SelectedContainer, false);
                        break;
                }

                if (!e.OldItems)
                    return;
                for (var i = 0, items = e.OldItems, len = items.length; i < len; i++) {
                    items[i].ParentItemsControl = null;
                }
            };

            TreeView.prototype.CheckForSelectedDescendents = function (item) {
                var stack = [];
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
            };

            TreeView.prototype.PropagateKeyDown = function (e) {
                this.OnKeyDown(e);
            };
            TreeView.prototype.OnKeyDown = function (e) {
                if (!this.Interaction.AllowKeyDown(e))
                    return;
                _super.prototype.OnKeyDown.call(this, e);
                if (e.Handled)
                    return;
                if (isControlKeyDown()) {
                    switch (e.Key) {
                        case 10 /* PageUp */:
                        case 11 /* PageDown */:
                        case 12 /* End */:
                        case 13 /* Home */:
                        case 14 /* Left */:
                        case 15 /* Up */:
                        case 16 /* Right */:
                        case 17 /* Down */:
                            if (!this.HandleScrollKeys(e.Key))
                                break;
                            e.Handled = true;
                            break;
                    }
                } else {
                    switch (e.Key) {
                        case 10 /* PageUp */:
                        case 11 /* PageDown */:
                            if (this.SelectedContainer != null) {
                                if (!this.HandleScrollByPage(e.Key === 10 /* PageUp */))
                                    break;
                                e.Handled = true;
                                break;
                            } else {
                                if (!this.FocusFirstItem())
                                    break;
                                e.Handled = true;
                                break;
                            }
                        case 12 /* End */:
                            if (!this.FocusLastItem())
                                break;
                            e.Handled = true;
                            break;
                        case 13 /* Home */:
                            if (!this.FocusFirstItem())
                                break;
                            e.Handled = true;
                            break;
                        case 15 /* Up */:
                        case 17 /* Down */:
                            if (this.SelectedContainer != null || !this.FocusFirstItem())
                                break;
                            e.Handled = true;
                            break;
                    }
                }
            };
            TreeView.prototype.HandleScrollKeys = function (key) {
                var scrollHost = this.ItemsControlHelper.ScrollHost;
                if (scrollHost != null) {
                    switch (Fayde.Controls.Internal.InteractionHelper.GetLogicalKey(this.FlowDirection, key)) {
                        case 10 /* PageUp */:
                            if (!NumericExtensions.IsGreaterThan(scrollHost.ExtentHeight, scrollHost.ViewportHeight))
                                ScrollExtensions.PageLeft(scrollHost);
                            else
                                ScrollExtensions.PageUp(scrollHost);
                            return true;
                        case 11 /* PageDown */:
                            if (!NumericExtensions.IsGreaterThan(scrollHost.ExtentHeight, scrollHost.ViewportHeight))
                                ScrollExtensions.PageRight(scrollHost);
                            else
                                ScrollExtensions.PageDown(scrollHost);
                            return true;
                        case 12 /* End */:
                            ScrollExtensions.ScrollToBottom(scrollHost);
                            return true;
                        case 13 /* Home */:
                            ScrollExtensions.ScrollToTop(scrollHost);
                            return true;
                        case 14 /* Left */:
                            ScrollExtensions.LineLeft(scrollHost);
                            return true;
                        case 15 /* Up */:
                            ScrollExtensions.LineUp(scrollHost);
                            return true;
                        case 16 /* Right */:
                            ScrollExtensions.LineRight(scrollHost);
                            return true;
                        case 17 /* Down */:
                            ScrollExtensions.LineDown(scrollHost);
                            return true;
                    }
                }
                return false;
            };
            TreeView.prototype.HandleScrollByPage = function (up) {
                var scrollHost = this.ItemsControlHelper.ScrollHost;
                if (scrollHost != null) {
                    var viewportHeight = scrollHost.ViewportHeight;
                    var top = { Value: 0 };
                    var bottom = { Value: 0 };
                    ScrollExtensions.GetTopAndBottom(this.SelectedContainer.HeaderElement || this.SelectedContainer, scrollHost, top, bottom);
                    var tvi1 = null;
                    var tvi2 = this.SelectedContainer;
                    var itemsControl = this.SelectedContainer.ParentItemsControl;
                    if (itemsControl != null) {
                        if (up) {
                            for (var parentItemsControl; itemsControl !== this; itemsControl = parentItemsControl) {
                                var tvi3 = itemsControl;
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
                                var currentDelta = { Value: 0 };
                                if (tvi2.HandleScrollByPage(up, scrollHost, viewportHeight, top.Value, bottom.Value, currentDelta))
                                    return true;
                                if (NumericExtensions.IsGreaterThan(currentDelta.Value, viewportHeight)) {
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
                                tvi2 = itemsControl.ItemContainerGenerator.ContainerFromIndex(index);
                                if (!(tvi2 instanceof Fayde.Controls.TreeViewItem))
                                    tvi2 = null;
                            } else if (itemsControl === this) {
                                tvi2 = null;
                            } else {
                                while (itemsControl != null) {
                                    var tvi3 = itemsControl instanceof Fayde.Controls.TreeViewItem ? itemsControl : null;
                                    itemsControl = tvi3.ParentItemsControl;
                                    if (itemsControl != null) {
                                        count = itemsControl.Items.Count;
                                        index = itemsControl.ItemContainerGenerator.IndexFromContainer(tvi3) + (up ? -1 : 1);
                                        if (index > -1 && index < count) {
                                            tvi2 = itemsControl.ItemContainerGenerator.ContainerFromIndex(index);
                                            if (!(tvi2 instanceof Fayde.Controls.TreeViewItem))
                                                tvi2 = null;
                                            break;
                                        } else if (itemsControl == this) {
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
            };

            TreeView.prototype.OnKeyUp = function (e) {
                if (!this.Interaction.AllowKeyUp(e))
                    return;
                _super.prototype.OnKeyUp.call(this, e);
            };

            TreeView.prototype.OnMouseEnter = function (e) {
                if (!this.Interaction.AllowMouseEnter(e))
                    return;
                this.UpdateVisualState(true);
                _super.prototype.OnMouseEnter.call(this, e);
            };
            TreeView.prototype.OnMouseLeave = function (e) {
                if (!this.Interaction.AllowMouseLeave(e))
                    return;
                this.UpdateVisualState(true);
                _super.prototype.OnMouseLeave.call(this, e);
            };
            TreeView.prototype.OnMouseMove = function (e) {
                _super.prototype.OnMouseMove.call(this, e);
            };
            TreeView.prototype.OnMouseLeftButtonDown = function (e) {
                if (!this.Interaction.AllowMouseLeftButtonDown(e))
                    return;
                if (!e.Handled && this.HandleMouseButtonDown())
                    e.Handled = true;
                this.UpdateVisualState(true);
                _super.prototype.OnMouseLeftButtonDown.call(this, e);
            };
            TreeView.prototype.OnMouseLeftButtonUp = function (e) {
                if (!this.Interaction.AllowMouseLeftButtonUp(e))
                    return;
                this.UpdateVisualState(true);
                _super.prototype.OnMouseLeftButtonUp.call(this, e);
            };
            TreeView.prototype.HandleMouseButtonDown = function () {
                if (!this.SelectedContainer)
                    return false;
                if (this.SelectedContainer.IsFocused)
                    this.SelectedContainer.Focus();
                return true;
            };

            TreeView.prototype.OnGotFocus = function (e) {
                if (!this.Interaction.AllowGotFocus(e))
                    return;
                this.UpdateVisualState(true);
                _super.prototype.OnGotFocus.call(this, e);
            };
            TreeView.prototype.OnLostFocus = function (e) {
                if (!this.Interaction.AllowLostFocus(e))
                    return;
                this.Interaction.OnLostFocusBase();
                _super.prototype.OnLostFocus.call(this, e);
            };

            TreeView.prototype.ChangeSelection = function (itemOrContainer, container, selected) {
                if (this.IsSelectionChangeActive)
                    return;
                var oldValue = null;
                var newValue = null;
                var flag = false;
                var selectedContainer = this.SelectedContainer;
                this.IsSelectionChangeActive = true;
                try  {
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
                    } else if (!selected && container == this.SelectedContainer) {
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
                this.SelectedItemChanged.Raise(this, new Fayde.RoutedPropertyChangedEventArgs(oldValue, newValue));
            };

            TreeView.prototype.UpdateSelectedValue = function (item) {
                if (!item) {
                    this.ClearValue(TreeView.SelectedValueProperty);
                    return;
                }

                var selectedValuePath = this.SelectedValuePath;
                if (!selectedValuePath) {
                    this.SelectedValue = item;
                } else {
                    var binding = new Fayde.Data.Binding(selectedValuePath);
                    binding.Source = item;
                    var contentControl = new Fayde.Controls.ContentControl();
                    contentControl.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);
                    this.SelectedValue = contentControl.Content;
                    contentControl.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
                }
            };
            TreeView.prototype.SelectFirstItem = function () {
                var container = this.ItemContainerGenerator.ContainerFromIndex(0);
                var selected = container instanceof Fayde.Controls.TreeViewItem;
                if (!selected)
                    container = this.SelectedContainer;
                this.ChangeSelection(selected ? this.ItemContainerGenerator.ItemFromContainer(container) : this.SelectedItem, container, selected);
            };
            TreeView.prototype.FocusFirstItem = function () {
                var tvi = this.ItemContainerGenerator.ContainerFromIndex(0);
                if (!tvi)
                    return false;
                if (!tvi.IsEnabled || !tvi.Focus())
                    return tvi.FocusDown();
                return true;
            };
            TreeView.prototype.FocusLastItem = function () {
                for (var index = this.Items.Count - 1; index >= 0; --index) {
                    var tvi = this.ItemContainerGenerator.ContainerFromIndex(index);
                    if (tvi instanceof Fayde.Controls.TreeViewItem && tvi.IsEnabled)
                        return tvi.FocusInto();
                }
                return false;
            };
            TreeView.SelectedItemProperty = DependencyProperty.Register("SelectedItem", function () {
                return Object;
            }, TreeView, null, function (d, args) {
                return d.OnSelectedItemChanged(args);
            });
            TreeView.SelectedValueProperty = DependencyProperty.Register("SelectedValue", function () {
                return Object;
            }, TreeView, null, function (d, args) {
                return d.OnSelectedValueChanged(args);
            });
            TreeView.SelectedValuePathProperty = DependencyProperty.Register("SelectedValuePath", function () {
                return String;
            }, TreeView, "", function (d, args) {
                return d.OnSelectedValuePathChanged(args);
            });
            TreeView.ItemContainerStyleProperty = DependencyProperty.Register("ItemContainerStyle", function () {
                return Fayde.Style;
            }, TreeView, null, function (d, args) {
                return d.OnItemContainerStyleChanged(args);
            });
            return TreeView;
        })(Fayde.Controls.ItemsControl);
        Controls.TreeView = TreeView;

        Object.defineProperty(TreeView.prototype, "SelectedValue", {
            get: function () {
                return this.GetValue(TreeView.SelectedValueProperty);
            },
            set: function (value) {
                try  {
                    this._AllowWrite = true;
                    this.SetValue(TreeView.SelectedValueProperty, value);
                } finally {
                    this._AllowWrite = false;
                }
            }
        });

        Object.defineProperty(TreeView.prototype, "SelectedItem", {
            get: function () {
                return this.GetValue(TreeView.SelectedItemProperty);
            },
            set: function (value) {
                try  {
                    this._AllowWrite = true;
                    this.SetValue(TreeView.SelectedItemProperty, value);
                } finally {
                    this._AllowWrite = false;
                }
            }
        });

        function isControlKeyDown() {
            return (Fayde.Input.Keyboard.Modifiers & 2 /* Control */) === 2 /* Control */;
        }
        function isShiftKeyDown() {
            return (Fayde.Input.Keyboard.Modifiers & 4 /* Shift */) === 4 /* Shift */;
        }
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var TabPanel = (function (_super) {
            __extends(TabPanel, _super);
            function TabPanel() {
                _super.apply(this, arguments);
                this._NumberOfRows = 1;
            }
            Object.defineProperty(TabPanel.prototype, "TabAlignment", {
                get: function () {
                    var tabControlParent = Fayde.VisualTreeHelper.GetParentOfType(this, Fayde.Controls.TabControl);
                    if (tabControlParent != null)
                        return tabControlParent.TabStripPlacement;
                    return 1 /* Top */;
                },
                enumerable: true,
                configurable: true
            });

            TabPanel.prototype.MeasureOverride = function (availableSize) {
                var size = new size();
                var tabAlignment = this.TabAlignment;
                this._NumberOfRows = 1;
                this._RowHeight = 0.0;

                var childEnumerator = this.Children.GetEnumerator();
                var element;

                if (tabAlignment == 1 /* Top */ || tabAlignment == 3 /* Bottom */) {
                    var num1 = 0;
                    var num2 = 0.0;
                    var num3 = 0.0;
                    while (childEnumerator.MoveNext()) {
                        element = childEnumerator.Current;
                        element.Measure(availableSize);
                        if (element.Visibility !== 1 /* Collapsed */) {
                            var sizeWithoutMargin = getDesiredSizeWithoutMargin(element);
                            if (this._RowHeight < sizeWithoutMargin.Height)
                                this._RowHeight = sizeWithoutMargin.Height;
                            if (num2 + sizeWithoutMargin.Width > availableSize.Width && num1 > 0) {
                                if (num3 < num2)
                                    num3 = num2;
                                num2 = sizeWithoutMargin.Width;
                                num1 = 1;
                                ++this._NumberOfRows;
                            } else {
                                num2 += sizeWithoutMargin.Width;
                                ++num1;
                            }
                        }
                    }
                    if (num3 < num2)
                        num3 = num2;
                    size.Height = this._RowHeight * this._NumberOfRows;
                    size.Width = !isFinite(size.Width) || isNaN(size.Width) || num3 < availableSize.Width ? num3 : availableSize.Width;
                } else if (tabAlignment === 0 /* Left */ || tabAlignment === 2 /* Right */) {
                    while (childEnumerator.MoveNext()) {
                        element = childEnumerator.Current;
                        if (element.Visibility != 1 /* Collapsed */) {
                            element.Measure(availableSize);
                            var sizeWithoutMargin = getDesiredSizeWithoutMargin(element);
                            if (size.Width < sizeWithoutMargin.Width)
                                size.Width = sizeWithoutMargin.Width;
                            size.Height += sizeWithoutMargin.Height;
                        }
                    }
                }
                return size;
            };
            TabPanel.prototype.ArrangeOverride = function (finalSize) {
                switch (this.TabAlignment) {
                    case 1 /* Top */:
                    case 3 /* Bottom */:
                        this._ArrangeHorizontal(finalSize);
                        break;
                    case 0 /* Left */:
                    case 2 /* Right */:
                        this._ArrangeVertical(finalSize);
                        break;
                }
                return finalSize;
            };

            TabPanel.prototype._ArrangeHorizontal = function (arrangeSize) {
                var tabAlignment = this.TabAlignment;
                var flag1 = this._NumberOfRows > 1;
                var num = 0;
                var solution = [];
                var size1 = new size();
                var headersSize = this._GetHeadersSize();
                if (flag1) {
                    solution = this._CalculateHeaderDistribution(arrangeSize.Width, headersSize);
                    num = this._GetActiveRow(solution);
                    if (tabAlignment === 1 /* Top */)
                        size1.Height = (this._NumberOfRows - 1.0 - num) * this._RowHeight;
                    if (tabAlignment === 3 /* Bottom */ && num !== 0)
                        size1.Height = (this._NumberOfRows - num) * this._RowHeight;
                }
                var index1 = 0;
                var index2 = 0;
                var childEnumerator = this.Children.GetEnumerator();
                var uie;
                while (childEnumerator.MoveNext()) {
                    uie = childEnumerator.Current;
                    var thickness = uie.GetValue(Fayde.FrameworkElement.MarginProperty);
                    var left = thickness.Left;
                    var right = thickness.Right;
                    var top = thickness.Top;
                    var bottom = thickness.Bottom;
                    var flag2 = flag1 && (index2 < solution.length && solution[index2] === index1 || index1 === this.Children.Count - 1);
                    var size2 = size.fromRaw(headersSize[index1], this._RowHeight);
                    if (flag2)
                        size2.Width = arrangeSize.Width - size1.Width;
                    var tabItem = uie;
                    if (tabItem instanceof Fayde.Controls.TabItem) {
                        if (tabItem.IsSelected)
                            tabItem.SetValue(Fayde.Controls.Canvas.ZIndexProperty, 1);
                        else
                            tabItem.SetValue(Fayde.Controls.Canvas.ZIndexProperty, 0);
                    }
                    var arrSize = new rect();
                    rect.set(arrSize, size1.Width, size1.Height, size2.Width, size2.Height);
                    uie.Arrange(arrSize);
                    var size3 = size2;
                    size3.Height = Math.max(0.0, size3.Height - top - bottom);
                    size3.Width = Math.max(0.0, size3.Width - left - right);
                    size1.Width += size2.Width;
                    if (flag2) {
                        if (index2 === num && tabAlignment === 1 /* Top */ || index2 === num - 1 && tabAlignment === 3 /* Bottom */)
                            size1.Height = 0.0;
                        else
                            size1.Height += this._RowHeight;
                        size1.Width = 0.0;
                        ++index2;
                    }
                    ++index1;
                }
            };
            TabPanel.prototype._ArrangeVertical = function (arrangeSize) {
                var y = 0.0;
                var childEnumerator = this.Children.GetEnumerator();
                var uie;
                while (childEnumerator.MoveNext()) {
                    uie = childEnumerator.Current;
                    if (uie.Visibility !== 1 /* Collapsed */) {
                        var tabItem = uie;
                        if (tabItem instanceof Fayde.Controls.TabItem) {
                            if (tabItem.IsSelected)
                                tabItem.SetValue(Fayde.Controls.Canvas.ZIndexProperty, 1);
                            else
                                tabItem.SetValue(Fayde.Controls.Canvas.ZIndexProperty, 0);
                        }
                        var sizeWithoutMargin = getDesiredSizeWithoutMargin(uie);
                        var arrSize = new rect();
                        rect.set(arrSize, 0.0, y, arrangeSize.Width, sizeWithoutMargin.Height);
                        uie.Arrange(arrSize);
                        y += sizeWithoutMargin.Height;
                    }
                }
            };

            TabPanel.prototype._GetActiveRow = function (solution) {
                var index = 0;
                var num = 0;
                if (solution.length > 0) {
                    var childEnumerator = this.Children.GetEnumerator();
                    var uie;
                    while (childEnumerator.MoveNext()) {
                        uie = childEnumerator.Current;
                        if (uie.GetValue(Fayde.Controls.TabItem.IsSelectedProperty))
                            return index;
                        if (index < solution.length && solution[index] === num)
                            ++index;
                        ++num;
                    }
                }
                if (this.TabAlignment === 1 /* Top */)
                    index = this._NumberOfRows - 1;
                return index;
            };
            TabPanel.prototype._CalculateHeaderDistribution = function (rowWidthLimit, headerWidth) {
                var num1 = 0.0;
                var length1 = headerWidth.length;
                var length2 = this._NumberOfRows - 1;
                var num2 = 0.0;
                var num3 = 0;
                var numArray1 = new Array(length2);
                var numArray2 = new Array(length2);

                var numArray3 = new Array(this._NumberOfRows);
                var numArray4 = numArray3.slice(0);
                var numArray5 = numArray3.slice(0);
                var numArray6 = numArray3.slice(0);

                var index1 = 0;
                for (var index2 = 0; index2 < length1; ++index2) {
                    if (num2 + headerWidth[index2] > rowWidthLimit && num3 > 0) {
                        numArray4[index1] = num2;
                        numArray3[index1] = num3;
                        var num4 = Math.max(0.0, (rowWidthLimit - num2) / num3);
                        numArray5[index1] = num4;
                        numArray1[index1] = index2 - 1;
                        if (num1 < num4)
                            num1 = num4;
                        ++index1;
                        num2 = headerWidth[index2];
                        num3 = 1;
                    } else {
                        num2 += headerWidth[index2];
                        if (headerWidth[index2] != 0.0)
                            ++num3;
                    }
                }
                if (index1 === 0)
                    return [];
                numArray4[index1] = num2;
                numArray3[index1] = num3;
                var num5 = (rowWidthLimit - num2) / num3;
                numArray5[index1] = num5;
                if (num1 < num5)
                    num1 = num5;

                numArray2 = numArray1.slice(0);
                numArray6 = numArray5.slice(0);
                while (true) {
                    var num4 = 0;
                    do {
                        var num6 = 0;
                        var num7 = 0.0;
                        for (var index2 = 0; index2 < this._NumberOfRows; ++index2) {
                            if (num7 < numArray5[index2]) {
                                num7 = numArray5[index2];
                                num6 = index2;
                            }
                        }
                        if (num6 != 0) {
                            var index2 = num6;
                            var index3 = index2 - 1;
                            var index4 = numArray1[index3];
                            var num8 = headerWidth[index4];
                            numArray4[index2] += num8;
                            if (numArray4[index2] <= rowWidthLimit) {
                                --numArray1[index3];
                                ++numArray3[index2];
                                numArray4[index3] -= num8;
                                --numArray3[index3];
                                numArray5[index3] = (rowWidthLimit - numArray4[index3]) / numArray3[index3];
                                numArray5[index2] = (rowWidthLimit - numArray4[index2]) / numArray3[index2];
                                num4 = 0.0;
                                for (var index5 = 0; index5 < this._NumberOfRows; ++index5) {
                                    if (num4 < numArray5[index5])
                                        num4 = numArray5[index5];
                                }
                            } else
                                break;
                        } else
                            break;
                    } while(num4 >= num1);
                    num1 = num4;
                    numArray2 = numArray1.slice(0);
                    numArray6 = numArray5.slice(0);
                }

                var index6 = 0;
                var index7 = 0;
                var enumerator = this.Children.GetEnumerator();
                var uie;
                while (enumerator.MoveNext()) {
                    uie = enumerator.Current;
                    if (uie.Visibility === 0 /* Visible */)
                        headerWidth[index7] += numArray6[index6];
                    if (index6 < length2 && numArray2[index6] == index7)
                        ++index6;
                    ++index7;
                }
                return numArray2;
            };
            TabPanel.prototype._GetHeadersSize = function () {
                var arr = [];
                var index = 0;
                var enumerator = this.Children.GetEnumerator();
                var uie;
                while (enumerator.MoveNext()) {
                    uie = enumerator.Current;
                    if (uie.Visibility === 1 /* Collapsed */) {
                        arr.push(0.0);
                    } else {
                        arr.push(getDesiredSizeWithoutMargin(uie).Width);
                    }
                }
                return arr;
            };
            return TabPanel;
        })(Fayde.Controls.Panel);
        Controls.TabPanel = TabPanel;

        function getDesiredSizeWithoutMargin(uie) {
            var num = 0.0;
            var tabItem = uie;
            if (tabItem instanceof Fayde.Controls.TabItem && tabItem.IsSelected) {
                var panel = tabItem.GetTemplate(tabItem.IsSelected, tabItem.TabStripPlacement);
                if (!(panel instanceof Fayde.Controls.Panel))
                    panel = null;
                var fe = ((panel == null || panel.Children.Count <= 0) ? null : panel.Children.GetValueAt(0));
                if (fe instanceof Fayde.FrameworkElement)
                    num += Math.abs(fe.Margin.Left + fe.Margin.Right);
            }
            var thickness = uie.GetValue(Fayde.FrameworkElement.MarginProperty);
            var size = new size();
            size.Height = Math.max(0.0, uie.DesiredSize.Height - thickness.Top - thickness.Bottom);
            size.Width = Math.max(0.0, uie.DesiredSize.Width - thickness.Left - thickness.Right + num);
            return size;
        }
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var ElementTemplateTopName = "TemplateTop";
        var ElementTemplateBottomName = "TemplateBottom";
        var ElementTemplateLeftName = "TemplateLeft";
        var ElementTemplateRightName = "TemplateRight";
        var ElementTabPanelTopName = "TabPanelTop";
        var ElementTabPanelBottomName = "TabPanelBottom";
        var ElementTabPanelLeftName = "TabPanelLeft";
        var ElementTabPanelRightName = "TabPanelRight";
        var ElementContentTopName = "ContentTop";
        var ElementContentBottomName = "ContentBottom";
        var ElementContentLeftName = "ContentLeft";
        var ElementContentRightName = "ContentRight";

        var TabControl = (function (_super) {
            __extends(TabControl, _super);
            function TabControl() {
                _super.call(this);
                this.SelectionChanged = new Fayde.RoutedEvent();
                this._UpdateIndex = true;
                this._DesiredIndex = 0;
                this.DefaultStyleKey = this.constructor;
            }
            TabControl.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                if (this._ElementTabPanelTop != null)
                    this._ElementTabPanelTop.Children.Clear();
                if (this._ElementTabPanelBottom != null)
                    this._ElementTabPanelBottom.Children.Clear();
                if (this._ElementTabPanelLeft != null)
                    this._ElementTabPanelLeft.Children.Clear();
                if (this._ElementTabPanelRight != null)
                    this._ElementTabPanelRight.Children.Clear();

                var contentHost = this._GetContentHost(this.TabStripPlacement);
                if (contentHost != null)
                    contentHost.Content = null;
                this._ElementTemplateTop = this.GetTemplateChild("TemplateTop", Fayde.FrameworkElement);
                this._ElementTemplateBottom = this.GetTemplateChild("TemplateBottom", Fayde.FrameworkElement);
                this._ElementTemplateLeft = this.GetTemplateChild("TemplateLeft", Fayde.FrameworkElement);
                this._ElementTemplateRight = this.GetTemplateChild("TemplateRight", Fayde.FrameworkElement);
                this._ElementTabPanelTop = this.GetTemplateChild("TabPanelTop", Fayde.Controls.TabPanel);
                this._ElementTabPanelBottom = this.GetTemplateChild("TabPanelBottom", Fayde.Controls.TabPanel);
                this._ElementTabPanelLeft = this.GetTemplateChild("TabPanelLeft", Fayde.Controls.TabPanel);
                this._ElementTabPanelRight = this.GetTemplateChild("TabPanelRight", Fayde.Controls.TabPanel);
                this._ElementContentTop = this.GetTemplateChild("ContentTop", Fayde.Controls.ContentPresenter);
                this._ElementContentBottom = this.GetTemplateChild("ContentBottom", Fayde.Controls.ContentPresenter);
                this._ElementContentLeft = this.GetTemplateChild("ContentLeft", Fayde.Controls.ContentPresenter);
                this._ElementContentRight = this.GetTemplateChild("ContentRight", Fayde.Controls.ContentPresenter);

                var enumerator = this.Items.GetEnumerator();
                while (enumerator.MoveNext()) {
                    var tabItem = enumerator.Current;
                    if (!(tabItem instanceof Fayde.Controls.TabItem))
                        this._ThrowInvalidTabItem(tabItem);
                    this._AddToTabPanel(tabItem);
                }

                if (this.SelectedIndex >= 0)
                    this.UpdateSelectedContent(this.SelectedContent);
                this.UpdateTabPanelLayout(this.TabStripPlacement, this.TabStripPlacement);
                this.UpdateVisualState(false);
            };

            TabControl.prototype.OnSelectedItemChanged = function (args) {
                var oldItem = args.OldValue;
                var newItem = args.NewValue;
                var num = newItem == null ? -1 : this.Items.IndexOf(newItem);
                if (newItem != null && num === -1) {
                    this.SelectedItem = oldItem;
                } else {
                    this.SelectedIndex = num;
                    this.SelectItem(oldItem, newItem);
                }
            };
            TabControl.prototype.OnSelectedIndexChanged = function (args) {
                var index = args.NewValue;
                var num = args.OldValue;
                if (index < -1)
                    throw new ArgumentException("'" + index.toString() + "' is not a valid value for property 'SelectedIndex'");
                if (this._UpdateIndex)
                    this._DesiredIndex = index;
                else if (!this._UpdateIndex)
                    this._UpdateIndex = true;
                if (index >= this.Items.Count) {
                    this._UpdateIndex = false;
                    this.SelectedIndex = num;
                } else {
                    var item;
                    if (index >= 0 && index < this.Items.Count)
                        item = this.Items.GetValueAt(index);
                    if (this.SelectedItem === item)
                        return;
                    this.SelectedItem = item;
                }
            };
            TabControl.prototype.OnSelectedContentChanged = function (args) {
                this.UpdateSelectedContent(args.NewValue);
            };
            TabControl.prototype.OnTabStripPlacementPropertyChanged = function (args) {
                this.UpdateTabPanelLayout(args.OldValue, args.NewValue);
                var enumerator = this.Items.GetEnumerator();
                var ti;
                while (enumerator.MoveNext()) {
                    ti = enumerator.Current;
                    if (ti != null)
                        ti.UpdateVisualState();
                }
            };

            TabControl.prototype.OnItemsChanged = function (e) {
                _super.prototype.OnItemsChanged.call(this, e);
                switch (e.Action) {
                    case 1 /* Add */:
                        var index1 = -1;
                        var len = e.NewItems.length;
                        for (var i = 0; i < len; i++) {
                            var obj = e.NewItems[i];
                            var tabItem = obj;
                            if (!(tabItem instanceof Fayde.Controls.TabItem))
                                this._ThrowInvalidTabItem(tabItem);
                            var index2 = this.Items.IndexOf(tabItem);
                            this._InsertIntoTabPanel(index2, tabItem);
                            if (tabItem.IsSelected)
                                index1 = index2;
                            else if (this.SelectedItem !== this._GetItemAtIndex(this.SelectedIndex))
                                index1 = this.Items.IndexOf(this.SelectedItem);
                            else if (this._DesiredIndex < this.Items.Count && this._DesiredIndex >= 0)
                                index1 = this._DesiredIndex;
                            tabItem.UpdateVisualState();
                        }
                        if (index1 === -1) {
                            var enumerator = this.Items.GetEnumerator();
                            while (enumerator.MoveNext()) {
                                var tabItem = enumerator.Current;
                                if (!(tabItem instanceof Fayde.Controls.TabItem))
                                    this._ThrowInvalidTabItem(tabItem);
                                if (tabItem.IsSelected)
                                    return;
                            }
                            if (this.Items.Count <= 1) {
                                var item0 = this.Items.GetValueAt(0);
                                var iss = item0.ReadLocalValue(Fayde.Controls.TabItem.IsSelectedProperty);
                                if (iss !== false)
                                    index1 = 0;
                            } else {
                                index1 = 0;
                            }
                        }
                        this.SelectedItem = this._GetItemAtIndex(index1);
                        this.SelectedIndex = index1;
                        break;
                    case 2 /* Remove */:
                        var len = e.OldItems.length;
                        var tabItem;
                        for (var i = 0; i < len; i++) {
                            tabItem = e.OldItems[i];
                            this._RemoveFromTabPanel(tabItem);
                            if (this.Items.Count === 0)
                                this.SelectedIndex = -1;
                            else if (this.Items.Count <= this.SelectedIndex)
                                this.SelectedIndex = this.Items.Count - 1;
                            else
                                this.SelectedItem = this._GetItemAtIndex(this.SelectedIndex);
                        }
                        break;
                    case 4 /* Reset */:
                        this._ClearTabPanel();
                        this.SelectedIndex = -1;
                        var tabItem;
                        var enumerator = this.Items.GetEnumerator();
                        while (enumerator.MoveNext()) {
                            tabItem = enumerator.Current;
                            if (!(tabItem instanceof Fayde.Controls.TabItem))
                                this._ThrowInvalidTabItem(tabItem);
                            this._AddToTabPanel(tabItem);
                            if (tabItem.IsSelected)
                                this.SelectedItem = tabItem;
                        }
                        if (this.SelectedIndex !== -1 || this.Items.Count <= 0)
                            break;
                        this.SelectedIndex = 0;
                        break;
                }
            };

            TabControl.prototype.OnKeyDown = function (e) {
                _super.prototype.OnKeyDown.call(this, e);
                if (e.Handled)
                    return;
                var nextTabItem;

                switch (e.Key) {
                    case 12 /* End */:
                        nextTabItem = this._FindEndTabItem();
                        break;
                    case 13 /* Home */:
                        nextTabItem = this._FindHomeTabItem();
                        break;
                    default:
                        return;
                }
                if (nextTabItem == null || nextTabItem === this.SelectedItem)
                    return;
                e.Handled = true;
                this.SelectedItem = nextTabItem;
                nextTabItem.Focus();
            };
            TabControl.prototype._FindEndTabItem = function () {
                var items = this.Items;
                var len = items.Count;
                var tabItem = null;
                for (var i = len - 1; i >= 0; i--) {
                    tabItem = items.GetValueAt(i);
                    if (tabItem.IsEnabled && tabItem.Visibility === 0 /* Visible */)
                        return tabItem;
                }
                return null;
            };
            TabControl.prototype._FindHomeTabItem = function () {
                var items = this.Items;
                var len = items.Count;
                var tabItem = null;
                for (var i = 0; i < len; i++) {
                    tabItem = items.GetValueAt(i);
                    if (tabItem.IsEnabled && tabItem.Visibility === 0 /* Visible */)
                        return tabItem;
                }
                return null;
            };

            TabControl.prototype.SelectItem = function (oldItem, newItem) {
                if (newItem == null) {
                    var contentHost = this._GetContentHost(this.TabStripPlacement);
                    if (contentHost != null)
                        contentHost.Content = null;
                    this.SetValue(TabControl.SelectedContentProperty, null);
                }
                var tabItem;
                var enumerator = this.Items.GetEnumerator();
                while (enumerator.MoveNext()) {
                    var tabItem = enumerator.Current;
                    if (!(tabItem instanceof Fayde.Controls.TabItem))
                        this._ThrowInvalidTabItem(tabItem);
                    if (tabItem !== newItem && tabItem.IsSelected) {
                        tabItem.IsSelected = false;
                    } else if (tabItem === newItem) {
                        tabItem.IsSelected = true;
                        this.SetValue(TabControl.SelectedContentProperty, tabItem.Content);
                    }
                }

                var oldItems = [];
                if (oldItem != null)
                    oldItems.push(oldItem);

                var newItems = [];
                if (newItem != null)
                    newItems.push(newItem);
                var e = new Fayde.Controls.Primitives.SelectionChangedEventArgs(oldItems, newItems);
                this.OnSelectionChanged(e);
                this.SelectionChanged.Raise(this, e);
            };
            TabControl.prototype.OnSelectionChanged = function (e) {
            };

            TabControl.prototype.UpdateTabPanelLayout = function (oldValue, newValue) {
                var template1 = this._GetTemplate(oldValue);
                var template2 = this._GetTemplate(newValue);
                var tabPanel1 = this._GetTabPanel(oldValue);
                var tabPanel2 = this._GetTabPanel(newValue);
                var contentHost1 = this._GetContentHost(oldValue);
                var contentHost2 = this._GetContentHost(newValue);
                if (oldValue !== newValue) {
                    if (template1 != null)
                        template1.Visibility = 1 /* Collapsed */;
                    if (tabPanel1 != null)
                        tabPanel1.Children.Clear();
                    if (tabPanel2 != null) {
                        var enumerator = this.Items.GetEnumerator();
                        var ti;
                        while (enumerator.MoveNext()) {
                            ti = enumerator.Current;
                            if (!(ti instanceof Fayde.Controls.TabItem))
                                this._ThrowInvalidTabItem(ti);
                            this._AddToTabPanel(ti);
                        }
                    }
                    if (contentHost1 != null)
                        contentHost1.Content = null;
                    if (contentHost2 != null)
                        contentHost2.Content = this.SelectedContent;
                }
                if (template2 == null)
                    return;
                template2.Visibility = 0 /* Visible */;
            };
            TabControl.prototype.UpdateSelectedContent = function (content) {
                var tabItem = this.SelectedItem;
                if (!(tabItem instanceof Fayde.Controls.TabItem))
                    return;
                var contentHost = this._GetContentHost(this.TabStripPlacement);
                if (contentHost == null)
                    return;
                contentHost.HorizontalAlignment = tabItem.HorizontalContentAlignment;
                contentHost.VerticalAlignment = tabItem.VerticalContentAlignment;
                contentHost.ContentTemplate = tabItem.ContentTemplate;
                contentHost.Content = content;
            };

            TabControl.prototype.EnsureLanguageBinding = function (tabItem) {
                if (tabItem == null)
                    return;
                var frameworkElement = tabItem.Content;
                if (!(frameworkElement instanceof Fayde.FrameworkElement) || frameworkElement.ReadLocalValue(Fayde.FrameworkElement.LanguageProperty) !== DependencyProperty.UnsetValue)
                    return;
                var binding = new Fayde.Data.Binding("Language");
                binding.Source = this;
                frameworkElement.SetBinding(Fayde.FrameworkElement.LanguageProperty, binding);
            };
            TabControl.prototype.ClearLanguageBinding = function (tabItem) {
                if (tabItem == null)
                    return;
                var frameworkElement = tabItem.Content;
                if (!(frameworkElement instanceof Fayde.FrameworkElement) || frameworkElement.ReadLocalValue(Fayde.FrameworkElement.LanguageProperty) !== DependencyProperty.UnsetValue)
                    return;
                frameworkElement.ClearValue(Fayde.FrameworkElement.LanguageProperty);
            };

            TabControl.prototype._AddToTabPanel = function (ti) {
                var tabPanel = this._GetTabPanel(this.TabStripPlacement);
                if (!tabPanel || tabPanel.Children.Contains(ti))
                    return;
                tabPanel.Children.Add(ti);
                this.EnsureLanguageBinding(ti);
            };
            TabControl.prototype._InsertIntoTabPanel = function (index, ti) {
                var tabPanel = this._GetTabPanel(this.TabStripPlacement);
                if (!tabPanel || tabPanel.Children.Contains(ti))
                    return;
                tabPanel.Children.Insert(index, ti);
            };
            TabControl.prototype._RemoveFromTabPanel = function (ti) {
                var tabPanel = this._GetTabPanel(this.TabStripPlacement);
                if (!tabPanel || !tabPanel.Children.Contains(ti))
                    return;
                tabPanel.Children.Remove(ti);
            };
            TabControl.prototype._ClearTabPanel = function () {
                var tabPanel = this._GetTabPanel(this.TabStripPlacement);
                if (!tabPanel)
                    return;
                var enumerator = tabPanel.Children.GetEnumerator();
                while (enumerator.MoveNext()) {
                    var tabItem = enumerator.Current;
                    if (tabItem != null)
                        this.ClearLanguageBinding(tabItem);
                }
                tabPanel.Children.Clear();
            };

            TabControl.prototype._GetTabPanel = function (tabPlacement) {
                switch (tabPlacement) {
                    case 0 /* Left */:
                        return this._ElementTabPanelLeft;
                    case 1 /* Top */:
                        return this._ElementTabPanelTop;
                    case 2 /* Right */:
                        return this._ElementTabPanelRight;
                    case 3 /* Bottom */:
                        return this._ElementTabPanelBottom;
                    default:
                        return null;
                }
            };
            TabControl.prototype._GetTemplate = function (tabPlacement) {
                switch (tabPlacement) {
                    case 0 /* Left */:
                        return this._ElementTemplateLeft;
                    case 1 /* Top */:
                        return this._ElementTemplateTop;
                    case 2 /* Right */:
                        return this._ElementTemplateRight;
                    case 3 /* Bottom */:
                        return this._ElementTemplateBottom;
                    default:
                        return null;
                }
            };
            TabControl.prototype._GetContentHost = function (tabPlacement) {
                switch (tabPlacement) {
                    case 0 /* Left */:
                        return this._ElementContentLeft;
                    case 1 /* Top */:
                        return this._ElementContentTop;
                    case 2 /* Right */:
                        return this._ElementContentRight;
                    case 3 /* Bottom */:
                        return this._ElementContentBottom;
                    default:
                        return null;
                }
            };

            TabControl.prototype._GetItemAtIndex = function (index) {
                if (index < 0 || index >= this.Items.Count)
                    return null;
                var item = this.Items.GetValueAt(index);
                if (item instanceof Fayde.Controls.TabItem)
                    return item;
            };

            TabControl.prototype._ThrowInvalidTabItem = function (obj) {
                var type = "object";
                try  {
                    type = obj.constructor._TypeName;
                } catch (err) {
                }
                throw new ArgumentException("Unable to cast object of type '" + type + "' to type 'System.Windows.Controls.TabItem'.");
            };
            TabControl.SelectedItemProperty = DependencyProperty.Register("SelectedItem", function () {
                return Object;
            }, TabControl, null, function (d, args) {
                return d.OnSelectedItemChanged(args);
            });
            TabControl.SelectedIndexProperty = DependencyProperty.Register("SelectedIndex", function () {
                return Number;
            }, TabControl, -1, function (d, args) {
                return d.OnSelectedIndexChanged(args);
            });
            TabControl.SelectedContentProperty = DependencyProperty.Register("SelectedContent", function () {
                return Object;
            }, TabControl, null, function (d, args) {
                return d.OnSelectedContentChanged(args);
            });
            TabControl.TabStripPlacementProperty = DependencyProperty.Register("TabStripPlacement", function () {
                return new Enum(Fayde.Controls.Dock);
            }, TabControl, 1 /* Top */, function (d, args) {
                return d.OnTabStripPlacementPropertyChanged(args);
            });
            return TabControl;
        })(Fayde.Controls.ItemsControl);
        Controls.TabControl = TabControl;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Controls) {
        var TabItem = (function (_super) {
            __extends(TabItem, _super);
            function TabItem() {
                _super.call(this);
                this._PreviousTemplate = null;
                this._PreviousHeader = null;
                this.DefaultStyleKey = this.constructor;
            }
            Object.defineProperty(TabItem.prototype, "TabStripPlacement", {
                get: function () {
                    var tabControlParent = this.TabControlParent;
                    if (tabControlParent != null)
                        return tabControlParent.TabStripPlacement;
                    return 1 /* Top */;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabItem.prototype, "TabControlParent", {
                get: function () {
                    return Fayde.VisualTreeHelper.GetParentOfType(this, Fayde.Controls.TabControl);
                },
                enumerable: true,
                configurable: true
            });

            TabItem.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                var contentControl = this._GetContentControl(this.IsSelected, this.TabStripPlacement);
                if (contentControl != null)
                    contentControl.Content = null;
                this._ElementTemplateTopSelected = this.GetTemplateChild("TemplateTopSelected");
                this._ElementTemplateBottomSelected = this.GetTemplateChild("TemplateBottomSelected");
                this._ElementTemplateLeftSelected = this.GetTemplateChild("TemplateLeftSelected");
                this._ElementTemplateRightSelected = this.GetTemplateChild("TemplateRightSelected");
                this._ElementTemplateTopUnselected = this.GetTemplateChild("TemplateTopUnselected");
                this._ElementTemplateBottomUnselected = this.GetTemplateChild("TemplateBottomUnselected");
                this._ElementTemplateLeftUnselected = this.GetTemplateChild("TemplateLeftUnselected");
                this._ElementTemplateRightUnselected = this.GetTemplateChild("TemplateRightUnselected");
                this._ElementHeaderTopSelected = this.GetTemplateChild("HeaderTopSelected");
                this._ElementHeaderBottomSelected = this.GetTemplateChild("HeaderBottomSelected");
                this._ElementHeaderLeftSelected = this.GetTemplateChild("HeaderLeftSelected");
                this._ElementHeaderRightSelected = this.GetTemplateChild("HeaderRightSelected");
                this._ElementHeaderTopUnselected = this.GetTemplateChild("HeaderTopUnselected");
                this._ElementHeaderBottomUnselected = this.GetTemplateChild("HeaderBottomUnselected");
                this._ElementHeaderLeftUnselected = this.GetTemplateChild("HeaderLeftUnselected");
                this._ElementHeaderRightUnselected = this.GetTemplateChild("HeaderRightUnselected");
                this._UpdateHeaderVisuals();
                this.UpdateVisualState(false);
            };

            TabItem.prototype._OnHeaderChanged = function (args) {
                this.HasHeader = args.NewValue != null;
                this.OnHeaderChanged(args.OldValue, args.NewValue);
            };
            TabItem.prototype.OnHeaderChanged = function (oldValue, newValue) {
                this._UpdateHeaderVisuals();
            };
            TabItem.prototype.OnHeaderTemplateChanged = function (oldHeaderTemplate, newHeaderTemplate) {
                this._UpdateHeaderVisuals();
            };
            TabItem.prototype._OnIsSelectedChanged = function (args) {
                var isSelected = args.NewValue;
                var e1 = new Fayde.RoutedEventArgs();
                if (isSelected)
                    this.OnSelected(e1);
                else
                    this.OnUnselected(e1);
                this.IsTabStop = isSelected;
                this.UpdateVisualState();
            };
            TabItem.prototype.OnSelected = function (e) {
                var parent = this.TabControlParent;
                if (!parent)
                    return;
                parent.SelectedItem = this;
            };
            TabItem.prototype.OnUnselected = function (e) {
                var parent = this.TabControlParent;
                if (!parent || parent.SelectedItem != this)
                    return;
                parent.SelectedIndex = -1;
            };

            TabItem.prototype._UpdateHeaderVisuals = function () {
                var contentControl = this._GetContentControl(this.IsSelected, this.TabStripPlacement);
                if (contentControl == null)
                    return;
                contentControl.Content = this.Header;
                contentControl.ContentTemplate = this.HeaderTemplate;
            };

            TabItem.prototype.UpdateTabItemVisuals = function () {
                var template = this.GetTemplate(this.IsSelected, this.TabStripPlacement);
                if (this._PreviousTemplate != null && this._PreviousTemplate !== template)
                    this._PreviousTemplate.Visibility = 1 /* Collapsed */;
                this._PreviousTemplate = template;
                if (template != null)
                    template.Visibility = 0 /* Visible */;
                var contentControl = this._GetContentControl(this.IsSelected, this.TabStripPlacement);
                if (this._PreviousHeader != null && this._PreviousHeader !== contentControl)
                    this._PreviousHeader.Content = null;
                this._PreviousHeader = contentControl;
                this._UpdateHeaderVisuals();
            };

            TabItem.prototype.OnMouseLeave = function (e) {
                this.UpdateVisualState();
            };
            TabItem.prototype.OnMouseEnter = function (e) {
                this.UpdateVisualState();
            };
            TabItem.prototype.OnMouseLeftButtonDown = function (e) {
                if (!this.IsEnabled || this.TabControlParent == null || (this.IsSelected || e.Handled))
                    return;
                this.IsTabStop = true;
                e.Handled = this.Focus();
                this.TabControlParent.SelectedIndex = this.TabControlParent.Items.IndexOf(this);
            };

            TabItem.prototype.OnGotFocus = function (e) {
                _super.prototype.OnGotFocus.call(this, e);
                this.SetValueInternal(TabItem.IsFocusedProperty, true);
                this.UpdateVisualState();
            };
            TabItem.prototype.OnLostFocus = function (e) {
                _super.prototype.OnLostFocus.call(this, e);
                this.SetValueInternal(TabItem.IsFocusedProperty, false);
                this.UpdateVisualState();
            };

            TabItem.prototype.OnContentChanged = function (oldContent, newContent) {
                _super.prototype.OnContentChanged.call(this, oldContent, newContent);
                var parent = this.TabControlParent;
                if (!parent == null || !this.IsSelected)
                    return;
                parent.SelectedContent = newContent;
            };

            TabItem.prototype.OnKeyDown = function (e) {
                _super.prototype.OnKeyDown.call(this, e);
                if (e.Handled)
                    return;
                var parent = this.TabControlParent;
                var logicalKey = Fayde.Input.InteractionHelper.GetLogicalKey(this.FlowDirection, e.Key);
                var startIndex = parent.Items.IndexOf(this);
                var nextTabItem = null;
                switch (logicalKey) {
                    case 14 /* Left */:
                    case 15 /* Up */:
                        nextTabItem = this._FindPreviousTabItem(startIndex);
                        break;
                    case 16 /* Right */:
                    case 17 /* Down */:
                        nextTabItem = this._FindNextTabItem(startIndex);
                        break;
                    default:
                        return;
                }
                if (!nextTabItem || nextTabItem === parent.SelectedItem)
                    return;
                e.Handled = true;
                parent.SelectedItem = nextTabItem;
                nextTabItem.Focus();
            };

            TabItem.prototype.GetTemplate = function (isSelected, tabPlacement) {
                switch (tabPlacement) {
                    case 0 /* Left */:
                        if (!isSelected)
                            return this._ElementTemplateLeftUnselected;
                        else
                            return this._ElementTemplateLeftSelected;
                    case 1 /* Top */:
                        if (!isSelected)
                            return this._ElementTemplateTopUnselected;
                        else
                            return this._ElementTemplateTopSelected;
                    case 2 /* Right */:
                        if (!isSelected)
                            return this._ElementTemplateRightUnselected;
                        else
                            return this._ElementTemplateRightSelected;
                    case 3 /* Bottom */:
                        if (!isSelected)
                            return this._ElementTemplateBottomUnselected;
                        else
                            return this._ElementTemplateBottomSelected;
                    default:
                        return null;
                }
            };
            TabItem.prototype._GetContentControl = function (isSelected, tabPlacement) {
                switch (tabPlacement) {
                    case 0 /* Left */:
                        if (!isSelected)
                            return this._ElementHeaderLeftUnselected;
                        else
                            return this._ElementHeaderLeftSelected;
                    case 1 /* Top */:
                        if (!isSelected)
                            return this._ElementHeaderTopUnselected;
                        else
                            return this._ElementHeaderTopSelected;
                    case 2 /* Right */:
                        if (!isSelected)
                            return this._ElementHeaderRightUnselected;
                        else
                            return this._ElementHeaderRightSelected;
                    case 3 /* Bottom */:
                        if (!isSelected)
                            return this._ElementHeaderBottomUnselected;
                        else
                            return this._ElementHeaderBottomSelected;
                    default:
                        return null;
                }
            };

            TabItem.prototype._FindPreviousTabItem = function (startIndex) {
                var parent = this.TabControlParent;
                var items = parent.Items;
                var tabItem = null;
                for (var i = startIndex; i >= 0; i--) {
                    tabItem = items.GetValueAt(i);
                    if (tabItem.IsEnabled && tabItem.Visibility === 0 /* Visible */)
                        return tabItem;
                }
                return null;
            };
            TabItem.prototype._FindNextTabItem = function (startIndex) {
                var parent = this.TabControlParent;
                var items = parent.Items;
                var len = items.Count;
                var tabItem = null;
                for (var i = startIndex; i < len; i++) {
                    tabItem = items.GetValueAt(i);
                    if (tabItem.IsEnabled && tabItem.Visibility === 0 /* Visible */)
                        return tabItem;
                }
                return null;
            };
            TabItem.HasHeaderProperty = DependencyProperty.Register("HasHeader", function () {
                return Boolean;
            }, TabItem, false);
            TabItem.HeaderProperty = DependencyProperty.Register("Header", function () {
                return Object;
            }, TabItem, null, function (d, args) {
                return d._OnHeaderChanged(args);
            });
            TabItem.HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", function () {
                return Fayde.DataTemplate;
            }, TabItem, function (d, args) {
                return d.OnHeaderTemplateChanged(args.OldValue, args.NewValue);
            });
            TabItem.IsFocusedProperty = DependencyProperty.Register("IsFocused", function () {
                return Boolean;
            }, TabItem, false);
            TabItem.IsSelectedProperty = DependencyProperty.Register("IsSelected", function () {
                return Boolean;
            }, TabItem, false, function (d, args) {
                return d._OnIsSelectedChanged(args);
            });
            return TabItem;
        })(Fayde.Controls.ContentControl);
        Controls.TabItem = TabItem;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
