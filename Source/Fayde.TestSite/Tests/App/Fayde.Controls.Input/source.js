var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
                XmlNamespace: "http://schemas.wsick.com/fayde/input"
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
            /// <reference path="../MenuItem.ts" />
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
                    Namespace: "Fayde.Controls.Input.Primitives"
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
                XmlNamespace: "http://schemas.wsick.com/fayde/input"
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
                XmlNamespace: "http://schemas.wsick.com/fayde/input"
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
                XmlNamespace: "http://schemas.wsick.com/fayde/input"
            });
        })(Controls.Input || (Controls.Input = {}));
        var Input = Controls.Input;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Controls.Input.js.map
