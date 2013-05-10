var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/Selector.ts" />
    /// CODE
    /// <reference path="../Core/VisualTreeHelper.ts" />
    /// <reference path="../Input/KeyboardNavigation.ts" />
    (function (Controls) {
        var ListBox = (function (_super) {
            __extends(ListBox, _super);
            function ListBox() {
                _super.apply(this, arguments);

                this._FocusedIndex = 0;
            }
            ListBox.ItemContainerStyleProperty = DependencyProperty.RegisterCore("ItemContainerStyle", function () {
                return Fayde.Style;
            }, ListBox, undefined, function (d, args) {
                return (d).OnItemContainerStyleChanged(args);
            });
            ListBox.SelectionModeProperty = DependencyProperty.Register("SelectionMode", function () {
                return new Enum(Controls.SelectionMode);
            }, ListBox, undefined, function (d, args) {
                return (d)._Selection.Mode = args.NewValue;
            });
            ListBox.IsSelectionActiveProperty = Controls.Primitives.Selector.IsSelectionActiveProperty;
            ListBox.prototype.SelectAll = function () {
                this._Selection.SelectAll(this.Items.ToArray());
            };
            ListBox.prototype.ScrollIntoView = function (item) {
                var tsv = this.$TemplateScrollViewer;
                if(!tsv) {
                    return;
                }
                var items = this.Items;
                if(!items.Contains(item)) {
                    return;
                }
                var ihro = {
                    Value: null
                };
                var lbiro = {
                    Value: null
                };
                var virtualizing = Controls.VirtualizingStackPanel.GetIsVirtualizing(this);
                if(this._IsOnCurrentPage(item, ihro, lbiro)) {
                    return;
                }
                var ihr = ihro.Value;
                var lbir = lbiro.Value;
                if(this._GetIsVerticalOrientation()) {
                    if(virtualizing) {
                        tsv.ScrollToVerticalOffset(this.SelectedIndex);
                        return;
                    }
                    var verticalOffset = tsv.VerticalOffset;
                    var verticalDelta = 0;
                    if(ihr.GetBottom() < lbir.GetBottom()) {
                        verticalDelta = lbir.GetBottom() - ihr.GetBottom();
                        verticalOffset += verticalDelta;
                    }
                    if((lbir.Y - verticalDelta) < ihr.Y) {
                        verticalOffset -= ihr.Y - (lbir.Y - verticalDelta);
                    }
                    tsv.ScrollToVerticalOffset(verticalOffset);
                } else {
                    if(virtualizing) {
                        tsv.ScrollToHorizontalOffset(this.SelectedIndex);
                        return;
                    }
                    var horizontalOffset = tsv.HorizontalOffset;
                    var horizontalDelta = 0;
                    if(ihr.GetRight() < lbir.GetRight()) {
                        horizontalDelta = lbir.GetRight() - ihr.GetRight();
                        horizontalOffset += horizontalDelta;
                    }
                    if((ihr.X - horizontalDelta) < ihr.X) {
                        horizontalOffset -= ihr.X - (lbir.X - horizontalDelta);
                    }
                    tsv.ScrollToHorizontalOffset(horizontalOffset);
                }
            };
            ListBox.prototype._NavigateByPage = function (forward) {
                var tsv = this.$TemplateScrollViewer;
                var newFocusedIndex = -1;
                var item = (this._FocusedIndex !== -1) ? this.Items.GetValueAt(this._FocusedIndex) : null;
                if(item != null && !this._IsOnCurrentPage(item)) {
                    this.ScrollIntoView(item);
                    if(tsv != null) {
                        tsv.UpdateLayout();
                    }
                }
                if(item == null) {
                    newFocusedIndex = this._GetFirstItemOnCurrentPage(this._FocusedIndex, forward);
                } else {
                    var firstItemOnCurrentPage = this._GetFirstItemOnCurrentPage(this._FocusedIndex, forward);
                    if(firstItemOnCurrentPage !== this._FocusedIndex) {
                        newFocusedIndex = firstItemOnCurrentPage;
                    } else {
                        if(tsv != null) {
                            if(this._GetIsVerticalOrientation()) {
                                tsv.ScrollToVerticalOffset(Math.max(0, Math.min(tsv.ScrollableHeight, tsv.VerticalOffset + (tsv.ViewportHeight * (forward ? 1 : -1)))));
                            } else {
                                tsv.ScrollToHorizontalOffset(Math.max(0, Math.min(tsv.ScrollableWidth, tsv.HorizontalOffset + (tsv.ViewportWidth * (forward ? 1 : -1)))));
                            }
                            tsv.UpdateLayout();
                        }
                        newFocusedIndex = this._GetFirstItemOnCurrentPage(this._FocusedIndex, forward);
                    }
                }
                return newFocusedIndex;
            };
            ListBox.prototype._ScrollInDirection = function (key) {
                if(this.$TemplateScrollViewer) {
                    this.$TemplateScrollViewer.ScrollInDirection(key);
                }
            };
            ListBox.prototype._IsOnCurrentPage = function (item, itemsHostRectOut, listBoxItemsRectOut) {
                if(!itemsHostRectOut) {
                    itemsHostRectOut = {
                        Value: null
                    };
                }
                if(!listBoxItemsRectOut) {
                    listBoxItemsRectOut = {
                        Value: null
                    };
                }
                var itemsHost = Fayde.VisualTreeHelper.GetChild(Fayde.VisualTreeHelper.GetChild(this, 0), 0);
                var tsv = this.$TemplateScrollViewer;
                if(tsv != null) {
                    itemsHost = tsv;
                    if(tsv.$ScrollContentPresenter != null) {
                        itemsHost = tsv.$ScrollContentPresenter;
                    }
                }
                if(!(itemsHost instanceof Fayde.FrameworkElement)) {
                    itemsHost = null;
                }
                var ihro = itemsHostRectOut.Value = new rect();
                var lbiro = listBoxItemsRectOut.Value = new rect();
                if(!itemsHost) {
                    return false;
                }
                ihro.Width = itemsHost.RenderSize.Width;
                ihro.Height = itemsHost.RenderSize.Height;
                var lbi = this.ItemContainerGenerator.ContainerFromItem(item);
                if(!lbi) {
                    return false;
                }
                lbiro.Width = lbi.RenderSize.Width;
                lbiro.Height = lbi.RenderSize.Height;
                if(itemsHost instanceof Controls.Control) {
                    var padding = (itemsHost).Padding;
                    if(padding) {
                        ihro.X = ihro.X + padding.Left;
                        ihro.Y = ihro.Y + padding.Top;
                        ihro.Width = ihro.Width - padding.Left - padding.Right;
                        ihro.Height = ihro.Height - padding.Top - padding.Bottom;
                    }
                }
                var genXform = lbi.TransformToVisual(itemsHost);
                if(genXform != null) {
                    var ptl = genXform.Transform(new Point());
                    var pbr = genXform.Transform(new Point(lbi.RenderSize.Width, lbi.RenderSize.Height));
                    lbiro.X = Math.min(ptl.X, pbr.X);
                    lbiro.Y = Math.min(ptl.Y, pbr.Y);
                    lbiro.Width = Math.abs(ptl.X - pbr.X);
                    lbiro.Height = Math.abs(ptl.Y - pbr.Y);
                }
                return this._GetIsVerticalOrientation() ? ihro.X <= lbiro.Y && rect.getBottom(ihro) >= rect.getBottom(lbiro) : ihro.X <= lbiro.X && rect.getRight(ihro) >= rect.getRight(lbiro);
            };
            ListBox.prototype._GetFirstItemOnCurrentPage = function (startingIndex, forward) {
                var delta = forward ? 1 : -1;
                var fiocp = -1;
                var probeIndex = startingIndex;
                var items = this.Items;
                var itemsCount = items.Count;
                while(probeIndex >= 0 && probeIndex < itemsCount && !this._IsOnCurrentPage(items.GetValueAt(probeIndex))) {
                    fiocp = probeIndex;
                    probeIndex += delta;
                }
                while(probeIndex >= 0 && probeIndex < itemsCount && this._IsOnCurrentPage(items.GetValueAt(probeIndex))) {
                    fiocp = probeIndex;
                    probeIndex += delta;
                }
                return fiocp;
            };
            ListBox.prototype.OnItemContainerStyleChanged = function (args) {
                var oldStyle = args.OldValue;
                var newStyle = args.NewValue;
                var count = this.Items.Count;
                for(var i = 0; i < count; i++) {
                    var lbi = this.ItemContainerGenerator.ContainerFromIndex(i);
                    if(lbi != null && lbi.Style === oldStyle) {
                        lbi.Style = newStyle;
                    }
                }
            };
            ListBox.prototype.OnKeyDown = function (args) {
                if(args.Handled) {
                    return;
                }
                var handled = false;
                var newFocusedIndex = -1;
                switch(args.Key) {
                    case Fayde.Input.Key.Space:
                    case Fayde.Input.Key.Enter:
                        if(Fayde.Input.Key.Enter !== args.Key || Fayde.Input.KeyboardNavigation.GetAcceptsReturn(this)) {
                            if(!Fayde.Input.Keyboard.HasAlt()) {
                                var focusedEl = this.XamlNode.GetFocusedElement();
                                var lbi;
                                if(focusedEl instanceof Controls.ListBoxItem) {
                                    lbi = focusedEl;
                                }
                                if(lbi) {
                                    if(Fayde.Input.Keyboard.HasControl() && lbi.IsSelected) {
                                        this.SelectedItem = null;
                                    } else {
                                        this.SelectedItem = this.ItemContainerGenerator.ItemFromContainer(lbi);
                                    }
                                    handled = true;
                                }
                            }
                        }
                        break;
                    case Fayde.Input.Key.Home:
                        newFocusedIndex = 0;
                        break;
                    case Fayde.Input.Key.End:
                        newFocusedIndex = this.Items.Count - 1;
                        break;
                    case Fayde.Input.Key.PageUp:
                        newFocusedIndex = this._NavigateByPage(false);
                        break;
                    case Fayde.Input.Key.PageDown:
                        newFocusedIndex = this._NavigateByPage(true);
                        break;
                    case Fayde.Input.Key.Left:
                        if(this._GetIsVerticalOrientation()) {
                            this._ScrollInDirection(Fayde.Input.Key.Left);
                        } else {
                            newFocusedIndex = this._FocusedIndex - 1;
                        }
                        break;
                    case Fayde.Input.Key.Up:
                        if(this._GetIsVerticalOrientation()) {
                            newFocusedIndex = this._FocusedIndex - 1;
                        } else {
                            this._ScrollInDirection(Fayde.Input.Key.Up);
                        }
                        break;
                    case Fayde.Input.Key.Right:
                        if(this._GetIsVerticalOrientation()) {
                            this._ScrollInDirection(Fayde.Input.Key.Right);
                        } else {
                            newFocusedIndex = this._FocusedIndex + 1;
                        }
                        break;
                    case Fayde.Input.Key.Down:
                        if(this._GetIsVerticalOrientation()) {
                            newFocusedIndex = this._FocusedIndex + 1;
                        } else {
                            this._ScrollInDirection(Fayde.Input.Key.Down);
                        }
                        break;
                }
                if(newFocusedIndex !== -1 && this._FocusedIndex !== -1 && newFocusedIndex !== this._FocusedIndex && newFocusedIndex >= 0 && newFocusedIndex < this.Items.Count) {
                    // A key press changes the focused ListBoxItem
                    var icg = this.ItemContainerGenerator;
                    var lbi = icg.ContainerFromIndex(newFocusedIndex);
                    var item = icg.ItemFromContainer(lbi);
                    this.ScrollIntoView(item);
                    if(Fayde.Input.Keyboard.HasControl()) {
                        lbi.Focus();
                    } else {
                        this.SelectedItem = item;
                    }
                    handled = true;
                }
                if(handled) {
                    args.Handled = true;
                }
            };
            ListBox.prototype._GetIsVerticalOrientation = function () {
                var p = this.Panel;
                if(p instanceof Controls.StackPanel) {
                    return (p).Orientation === Fayde.Orientation.Vertical;
                }
                if(p instanceof Controls.VirtualizingStackPanel) {
                    return (p).Orientation === Fayde.Orientation.Vertical;
                }
                return true;
            };
            ListBox.prototype.IsItemItsOwnContainer = function (item) {
                return item instanceof Controls.ListBoxItem;
            };
            ListBox.prototype.GetContainerForItem = function () {
                var item = new Controls.ListBoxItem();
                var ics = this.ItemContainerStyle;
                if(ics != null) {
                    item.Style = ics;
                }
                return item;
            };
            ListBox.prototype.PrepareContainerForItem = function (element, item) {
                _super.prototype.PrepareContainerForItem.call(this, element, item);
                var ics = this.ItemContainerStyle;
                var lbi = element;
                if(!lbi.Style && ics) {
                    lbi.Style = ics;
                }
            };
            ListBox.prototype.OnGotFocus = function (e) {
                _super.prototype.OnGotFocus.call(this, e);
                this.SetValueInternal(ListBox.IsSelectionActiveProperty, true);
            };
            ListBox.prototype.OnLostFocus = function (e) {
                _super.prototype.OnLostFocus.call(this, e);
                this.SetValueInternal(ListBox.IsSelectionActiveProperty, false);
            };
            ListBox.prototype.NotifyListItemGotFocus = function (lbi) {
                this._FocusedIndex = this.ItemContainerGenerator.IndexFromContainer(lbi);
            };
            ListBox.prototype.NotifyListItemLostFocus = function (lbi) {
                this._FocusedIndex = -1;
            };
            return ListBox;
        })(Controls.Primitives.Selector);
        Controls.ListBox = ListBox;        
        Nullstone.RegisterType(ListBox, "ListBox");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ListBox.js.map
