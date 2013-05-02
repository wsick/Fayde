var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="VirtualizingPanel.ts" />
    /// CODE
    /// <reference path="ScrollViewer.ts" />
    /// <reference path="Primitives/IScrollInfo.ts" />
    (function (Controls) {
        var LineDelta = 14.7;
        var Wheelitude = 3;
        (function (VirtualizationMode) {
            VirtualizationMode._map = [];
            VirtualizationMode.Standard = 0;
            VirtualizationMode.Recycling = 1;
        })(Controls.VirtualizationMode || (Controls.VirtualizationMode = {}));
        var VirtualizationMode = Controls.VirtualizationMode;
        var CleanUpVirtualizedItemEventArgs = (function (_super) {
            __extends(CleanUpVirtualizedItemEventArgs, _super);
            function CleanUpVirtualizedItemEventArgs(UIElement, Value) {
                        _super.call(this);
                this.UIElement = UIElement;
                this.Value = Value;
                this.Cancel = false;
            }
            return CleanUpVirtualizedItemEventArgs;
        })(Fayde.RoutedEventArgs);
        Controls.CleanUpVirtualizedItemEventArgs = CleanUpVirtualizedItemEventArgs;        
        var VirtualizingStackPanel = (function (_super) {
            __extends(VirtualizingStackPanel, _super);
            function VirtualizingStackPanel() {
                _super.apply(this, arguments);

                this._CanHorizontallyScroll = false;
                this._CanVerticallyScroll = false;
                this._HorizontalOffset = 0;
                this._VerticalOffset = 0;
                this._ExtentWidth = 0;
                this._ExtentHeight = 0;
                this._ViewportWidth = 0;
                this._ViewportHeight = 0;
                this.CleanUpVirtualizedItemEvent = new Fayde.RoutedEvent();
            }
            Object.defineProperty(VirtualizingStackPanel.prototype, "CanHorizontallyScroll", {
                get: function () {
                    return this._CanHorizontallyScroll;
                },
                set: function (value) {
                    this._CanHorizontallyScroll = value;
                    this.XamlNode.LayoutUpdater.InvalidateMeasure();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VirtualizingStackPanel.prototype, "CanVerticallyScroll", {
                get: function () {
                    return this._CanVerticallyScroll;
                },
                set: function (value) {
                    this._CanVerticallyScroll = value;
                    this.XamlNode.LayoutUpdater.InvalidateMeasure();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VirtualizingStackPanel.prototype, "ExtentWidth", {
                get: function () {
                    return this._ExtentWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VirtualizingStackPanel.prototype, "ExtentHeight", {
                get: function () {
                    return this._ExtentHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VirtualizingStackPanel.prototype, "ViewportWidth", {
                get: function () {
                    return this._ViewportWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VirtualizingStackPanel.prototype, "ViewportHeight", {
                get: function () {
                    return this._ViewportHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VirtualizingStackPanel.prototype, "HorizontalOffset", {
                get: function () {
                    return this._HorizontalOffset;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VirtualizingStackPanel.prototype, "VerticalOffset", {
                get: function () {
                    return this._VerticalOffset;
                },
                enumerable: true,
                configurable: true
            });
            VirtualizingStackPanel.prototype.LineUp = function () {
                if(this.Orientation === Fayde.Orientation.Horizontal) {
                    this.SetVerticalOffset(this._VerticalOffset - LineDelta);
                } else {
                    this.SetVerticalOffset(this._VerticalOffset - 1);
                }
            };
            VirtualizingStackPanel.prototype.LineDown = function () {
                if(this.Orientation === Fayde.Orientation.Horizontal) {
                    this.SetVerticalOffset(this._VerticalOffset + LineDelta);
                } else {
                    this.SetVerticalOffset(this._VerticalOffset + 1);
                }
            };
            VirtualizingStackPanel.prototype.LineLeft = function () {
                if(this.Orientation === Fayde.Orientation.Vertical) {
                    this.SetHorizontalOffset(this._HorizontalOffset - LineDelta);
                } else {
                    this.SetHorizontalOffset(this._HorizontalOffset - 1);
                }
            };
            VirtualizingStackPanel.prototype.LineRight = function () {
                if(this.Orientation === Fayde.Orientation.Vertical) {
                    this.SetHorizontalOffset(this._HorizontalOffset + LineDelta);
                } else {
                    this.SetHorizontalOffset(this._HorizontalOffset + 1);
                }
            };
            VirtualizingStackPanel.prototype.MouseWheelUp = function () {
                if(this.Orientation === Fayde.Orientation.Horizontal) {
                    this.SetVerticalOffset(this._VerticalOffset - LineDelta * Wheelitude);
                } else {
                    this.SetVerticalOffset(this._VerticalOffset - Wheelitude);
                }
            };
            VirtualizingStackPanel.prototype.MouseWheelDown = function () {
                if(this.Orientation === Fayde.Orientation.Horizontal) {
                    this.SetVerticalOffset(this._VerticalOffset + LineDelta * Wheelitude);
                } else {
                    this.SetVerticalOffset(this._VerticalOffset + Wheelitude);
                }
            };
            VirtualizingStackPanel.prototype.MouseWheelLeft = function () {
                if(this.Orientation === Fayde.Orientation.Vertical) {
                    this.SetHorizontalOffset(this._HorizontalOffset - LineDelta * Wheelitude);
                } else {
                    this.SetHorizontalOffset(this._HorizontalOffset - Wheelitude);
                }
            };
            VirtualizingStackPanel.prototype.MouseWheelRight = function () {
                if(this.Orientation === Fayde.Orientation.Vertical) {
                    this.SetHorizontalOffset(this._HorizontalOffset + LineDelta * Wheelitude);
                } else {
                    this.SetHorizontalOffset(this._HorizontalOffset + Wheelitude);
                }
            };
            VirtualizingStackPanel.prototype.PageUp = function () {
                this.SetVerticalOffset(this._VerticalOffset - this._ViewportHeight);
            };
            VirtualizingStackPanel.prototype.PageDown = function () {
                this.SetVerticalOffset(this._VerticalOffset + this._ViewportHeight);
            };
            VirtualizingStackPanel.prototype.PageLeft = function () {
                this.SetHorizontalOffset(this._HorizontalOffset - this._ViewportWidth);
            };
            VirtualizingStackPanel.prototype.PageRight = function () {
                this.SetHorizontalOffset(this._HorizontalOffset + this._ViewportWidth);
            };
            VirtualizingStackPanel.prototype.MakeVisible = function (uie, rectangle) {
                var exposed = new rect();
                var uin = uie.XamlNode;
                var isVertical = this.Orientation === Fayde.Orientation.Vertical;
                var enumerator = this.Children.GetEnumerator();
                while(enumerator.MoveNext()) {
                    var childNode = enumerator.Current;
                    var childRenderSize = childNode.LayoutUpdater.RenderSize;
                    if(uin === childNode) {
                        if(isVertical) {
                            if(rectangle.X !== this._HorizontalOffset) {
                                this.SetHorizontalOffset(rectangle.X);
                            }
                            exposed.Width = Math.min(childRenderSize.Width, this._ViewportWidth);
                            exposed.Height = childRenderSize.Height;
                            exposed.X = this._HorizontalOffset;
                        } else {
                            if(rectangle.Y !== this._VerticalOffset) {
                                this.SetVerticalOffset(rectangle.Y);
                            }
                            exposed.Height = Math.min(childRenderSize.Height, this._ViewportHeight);
                            exposed.Width = childRenderSize.Width;
                            exposed.Y = this._VerticalOffset;
                        }
                        return exposed;
                    }
                    if(isVertical) {
                        exposed.Y += childRenderSize.Height;
                    } else {
                        exposed.X += childRenderSize.Width;
                    }
                }
                throw new ArgumentException("Visual is not a child of this Panel");
            };
            VirtualizingStackPanel.prototype.SetHorizontalOffset = function (offset) {
                if(offset < 0 || this._ViewportWidth >= this._ExtentWidth) {
                    offset = 0;
                } else if((offset + this._ViewportWidth) >= this._ExtentWidth) {
                    offset = this._ExtentWidth - this._ViewportWidth;
                }
                if(this._HorizontalOffset === offset) {
                    return;
                }
                this._HorizontalOffset = offset;
                if(this.Orientation === Fayde.Orientation.Horizontal) {
                    this.XamlNode.LayoutUpdater.InvalidateMeasure();
                } else {
                    this.XamlNode.LayoutUpdater.InvalidateArrange();
                }
                var scrollOwner = this.ScrollOwner;
                if(scrollOwner) {
                    scrollOwner.InvalidateScrollInfo();
                }
            };
            VirtualizingStackPanel.prototype.SetVerticalOffset = function (offset) {
                if(offset < 0 || this._ViewportHeight >= this._ExtentHeight) {
                    offset = 0;
                } else if((offset + this._ViewportHeight) >= this._ExtentHeight) {
                    offset = this._ExtentHeight - this._ViewportHeight;
                }
                if(this._VerticalOffset == offset) {
                    return;
                }
                this._VerticalOffset = offset;
                if(this.Orientation === Fayde.Orientation.Vertical) {
                    this.XamlNode.LayoutUpdater.InvalidateMeasure();
                } else {
                    this.XamlNode.LayoutUpdater.InvalidateArrange();
                }
                var scrollOwner = this.ScrollOwner;
                if(scrollOwner) {
                    scrollOwner.InvalidateScrollInfo();
                }
            };
            VirtualizingStackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () {
                return new Enum(Fayde.Orientation);
            }, VirtualizingStackPanel, Fayde.Orientation.Vertical, function (d, args) {
                return (d).XamlNode.LayoutUpdater.InvalidateMeasure();
            });
            VirtualizingStackPanel.IsVirtualizingProperty = DependencyProperty.RegisterAttached("IsVirtualizing", function () {
                return new Boolean();
            }, VirtualizingStackPanel, false);
            VirtualizingStackPanel.GetIsVirtualizing = function GetIsVirtualizing(d) {
                return d.GetValue(VirtualizingStackPanel.IsVirtualizingProperty);
            };
            VirtualizingStackPanel.SetIsVirtualizing = function SetIsVirtualizing(d, value) {
                d.SetValue(VirtualizingStackPanel.IsVirtualizingProperty, value);
            };
            VirtualizingStackPanel.VirtualizationModeProperty = DependencyProperty.RegisterAttached("VirtualizationMode", function () {
                return new Enum(VirtualizationMode);
            }, VirtualizingStackPanel, VirtualizationMode.Recycling);
            VirtualizingStackPanel.GetVirtualizationMode = function GetVirtualizationMode(d) {
                return d.GetValue(VirtualizingStackPanel.VirtualizationModeProperty);
            };
            VirtualizingStackPanel.SetVirtualizationMode = function SetVirtualizationMode(d, value) {
                d.SetValue(VirtualizingStackPanel.VirtualizationModeProperty, value);
            };
            VirtualizingStackPanel.prototype._MeasureOverride = function (availableSize, error) {
                var owner = Controls.ItemsControl.GetItemsOwner(this);
                var measured = new size();
                var invalidate = false;
                var nvisible = 0;
                var beyond = 0;
                var index;
                var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                if(isHorizontal) {
                    index = Math.floor(this._HorizontalOffset);
                } else {
                    index = Math.floor(this._VerticalOffset);
                }
                var itemCount = owner.Items.Count;
                var generator = this.ItemContainerGenerator;
                if(itemCount > 0) {
                    var children = this.Children;
                    var childAvailable = size.clone(availableSize);
                    if(this._CanHorizontallyScroll || isHorizontal) {
                        childAvailable.Width = Number.POSITIVE_INFINITY;
                    }
                    if(this._CanVerticallyScroll || !isHorizontal) {
                        childAvailable.Height = Number.POSITIVE_INFINITY;
                    }
                    var start = generator.GeneratorPositionFromIndex(index);
                    var insertAt = (start.offset === 0) ? start.index : start.index + 1;
                    var state = generator.StartAt(start, 0, true);
                    try  {
                        var isNewlyRealized = {
                            Value: false
                        };
                        var child;
                        var childlu;
                        for(var i = 0; i < itemCount && beyond < 2; i++ , insertAt++) {
                            child = generator.GenerateNext(isNewlyRealized);
                            childlu = child.XamlNode.LayoutUpdater;
                            if(isNewlyRealized.Value || insertAt >= children.Count || children.GetValueAt(insertAt) !== child) {
                                if(insertAt < children.Count) {
                                    this.InsertInternalChild(insertAt, child);
                                } else {
                                    this.AddInternalChild(child);
                                }
                                generator.PrepareItemContainer(child);
                            }
                            child.Measure(childAvailable);
                            var s = childlu.DesiredSize;
                            nvisible++;
                            if(!isHorizontal) {
                                measured.Width = Math.max(measured.Width, s.Width);
                                measured.Height += s.Height;
                                if(measured.Height > availableSize.Height) {
                                    beyond++;
                                }
                            } else {
                                measured.Height = Math.max(measured.Height, s.Height);
                                measured.Width += s.Width;
                                if(measured.Width > availableSize.Width) {
                                    beyond++;
                                }
                            }
                        }
                    }finally {
                        generator.StopGeneration();
                    }
                }
                VirtualizingStackPanel.SetIsVirtualizing(owner, true);
                if(nvisible > 0) {
                    this.RemoveUnusedContainers(index, nvisible);
                }
                nvisible -= beyond;
                if(!isHorizontal) {
                    if(this._ExtentHeight !== itemCount) {
                        this._ExtentHeight = itemCount;
                        invalidate = true;
                    }
                    if(this._ExtentWidth !== measured.Width) {
                        this._ExtentWidth = measured.Width;
                        invalidate = true;
                    }
                    if(this._ViewportHeight !== nvisible) {
                        this._ViewportHeight = nvisible;
                        invalidate = true;
                    }
                    if(this._ViewportWidth != availableSize.Width) {
                        this._ViewportWidth = availableSize.Width;
                        invalidate = true;
                    }
                } else {
                    if(this._ExtentHeight !== measured.Height) {
                        this._ExtentHeight = measured.Height;
                        invalidate = true;
                    }
                    if(this._ExtentWidth !== itemCount) {
                        this._ExtentWidth = itemCount;
                        invalidate = true;
                    }
                    if(this._ViewportHeight !== availableSize.Height) {
                        this._ViewportHeight = availableSize.Height;
                        invalidate = true;
                    }
                    if(this._ViewportWidth !== nvisible) {
                        this._ViewportWidth = nvisible;
                        invalidate = true;
                    }
                }
                var scrollOwner = this.ScrollOwner;
                if(invalidate && scrollOwner != null) {
                    scrollOwner.InvalidateScrollInfo();
                }
                return measured;
            };
            VirtualizingStackPanel.prototype._ArrangeOverride = function (finalSize, error) {
                var arranged = size.clone(finalSize);
                var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                if(!isHorizontal) {
                    arranged.Height = 0;
                } else {
                    arranged.Width = 0;
                }
                var enumerator = this.Children.GetEnumerator();
                while(enumerator.MoveNext()) {
                    var childNode = enumerator.Current;
                    var childLu = childNode.LayoutUpdater;
                    var s = childLu.DesiredSize;
                    if(!isHorizontal) {
                        s.Width = finalSize.Width;
                        var childFinal = rect.fromSize(s);
                        if(rect.isEmpty(childFinal)) {
                            rect.clear(childFinal);
                        } else {
                            childFinal.X = -this._HorizontalOffset;
                            childFinal.Y = arranged.Height;
                        }
                        childLu._Arrange(childFinal, error);
                        arranged.Width = Math.max(arranged.Width, s.Width);
                        arranged.Height += s.Height;
                    } else {
                        s.Height = finalSize.Height;
                        var childFinal = rect.fromSize(s);
                        if(rect.isEmpty(childFinal)) {
                            rect.clear(childFinal);
                        } else {
                            childFinal.X = arranged.Width;
                            childFinal.Y = -this._VerticalOffset;
                        }
                        childNode.XObject.Arrange(childFinal);
                        arranged.Width += s.Width;
                        arranged.Height = Math.max(arranged.Height, s.Height);
                    }
                }
                if(!isHorizontal) {
                    arranged.Height = Math.max(arranged.Height, finalSize.Height);
                } else {
                    arranged.Width = Math.max(arranged.Width, finalSize.Width);
                }
                return arranged;
            };
            VirtualizingStackPanel.prototype.RemoveUnusedContainers = function (first, count) {
                var generator = this.ItemContainerGenerator;
                var owner = Controls.ItemsControl.GetItemsOwner(this);
                var mode = VirtualizingStackPanel.GetVirtualizationMode(this);
                var last = first + count - 1;
                var item;
                var args;
                var children = this.Children;
                var pos = {
                    index: children.Count - 1,
                    offset: 0
                };
                while(pos.index >= 0) {
                    item = generator.IndexFromGeneratorPosition(pos);
                    if(item < first || item > last) {
                        var args = this.OnCleanUpVirtualizedItem(children.GetValueAt(pos.index), owner.Items.GetValueAt(item));
                        if(!args.Cancel) {
                            this.RemoveInternalChildRange(pos.index, 1);
                            if(mode === VirtualizationMode.Recycling) {
                                generator.Recycle(pos, 1);
                            } else {
                                generator.Remove(pos, 1);
                            }
                        }
                    }
                    pos.index--;
                }
            };
            VirtualizingStackPanel.prototype.OnCleanUpVirtualizedItem = function (uie, value) {
                var args = new CleanUpVirtualizedItemEventArgs(uie, value);
                this.CleanUpVirtualizedItemEvent.Raise(this, args);
                return args;
            };
            VirtualizingStackPanel.prototype.OnClearChildren = function () {
                _super.prototype.OnClearChildren.call(this);
                this._HorizontalOffset = 0;
                this._VerticalOffset = 0;
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
                var scrollOwner = this.ScrollOwner;
                if(scrollOwner) {
                    scrollOwner.InvalidateScrollInfo();
                }
            };
            VirtualizingStackPanel.prototype.OnItemContainerGeneratorChanged = function (sender, e) {
                _super.prototype.OnItemContainerGeneratorChanged.call(this, sender, e);
                var generator = this.ItemContainerGenerator;
                var owner = Controls.ItemsControl.GetItemsOwner(this);
                var orientation = this.Orientation;
                var index;
                var offset;
                var viewable;
                switch(e.Action) {
                    case Fayde.Collections.NotifyCollectionChangedAction.Add:
                        var index = generator.IndexFromGeneratorPosition(e.Position);
                        if(orientation === Fayde.Orientation.Horizontal) {
                            offset = this.HorizontalOffset;
                        } else {
                            offset = this.VerticalOffset;
                        }
                        if(index <= offset) {
                            // items have been added earlier in the list than what is viewable
                            offset += e.ItemCount;
                        }
                        if(orientation === Fayde.Orientation.Horizontal) {
                            this.SetHorizontalOffset(offset);
                        } else {
                            this.SetVerticalOffset(offset);
                        }
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Remove:
                        index = generator.IndexFromGeneratorPosition(e.Position);
                        if(orientation === Fayde.Orientation.Horizontal) {
                            offset = this.HorizontalOffset;
                            viewable = this.ViewportWidth;
                        } else {
                            offset = this.VerticalOffset;
                            viewable = this.ViewportHeight;
                        }
                        if(index < offset) {
                            // items earlier in the list than what is viewable have been removed
                            offset = Math.max(offset - e.ItemCount, 0);
                        }
                        // adjust for items removed in the current view and/or beyond the current view
                        offset = Math.min(offset, owner.Items.Count - viewable);
                        offset = Math.max(offset, 0);
                        if(orientation === Fayde.Orientation.Horizontal) {
                            this.SetHorizontalOffset(offset);
                        } else {
                            this.SetVerticalOffset(offset);
                        }
                        this.RemoveInternalChildRange(e.Position.index, e.ItemUICount);
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Replace:
                        this.RemoveInternalChildRange(e.Position.index, e.ItemUICount);
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Reset:
                        break;
                }
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
                var scrollOwner = this.ScrollOwner;
                if(scrollOwner) {
                    scrollOwner.InvalidateScrollInfo();
                }
            };
            return VirtualizingStackPanel;
        })(Controls.VirtualizingPanel);
        Controls.VirtualizingStackPanel = VirtualizingStackPanel;        
        Nullstone.RegisterType(VirtualizingStackPanel, "VirtualizingStackPanel", [
            Controls.Primitives.IScrollInfo_
        ]);
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=VirtualizingStackPanel.js.map
