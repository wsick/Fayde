var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridItemsControlNode = (function (_super) {
            __extends(GridItemsControlNode, _super);
            function GridItemsControlNode(xobj) {
                _super.call(this, xobj);
                this.ItemsPresenter = null;
            }
            GridItemsControlNode.prototype.GetDefaultVisualTree = function () {
                var presenter = this.ItemsPresenter;
                if (!presenter)
                    (presenter = new Fayde.Experimental.GridItemsPresenter()).TemplateOwner = this.XObject;
                return presenter;
            };
            return GridItemsControlNode;
        })(Fayde.Controls.ControlNode);
        Experimental.GridItemsControlNode = GridItemsControlNode;

        var GridItemsControl = (function (_super) {
            __extends(GridItemsControl, _super);
            function GridItemsControl() {
                _super.call(this);
                this._Items = [];
                this.DefaultStyleKey = this.constructor;
                var coll = GridItemsControl.ColumnsProperty.Initialize(this);
                coll.CollectionChanged.Subscribe(this._ColumnsChanged, this);
                coll.ColumnChanged.Subscribe(this._ColumnChanged, this);
            }
            GridItemsControl.prototype.CreateNode = function () {
                return new GridItemsControlNode(this);
            };

            GridItemsControl.prototype.OnItemsSourceChanged = function (oldItemsSource, newItemsSource) {
                var nc = Fayde.Collections.INotifyCollectionChanged_.As(oldItemsSource);
                if (nc)
                    nc.CollectionChanged.Unsubscribe(this._OnItemsSourceUpdated, this);
                if (oldItemsSource)
                    this._RemoveItems(0, this._Items);
                if (newItemsSource)
                    this._AddItems(0, Fayde.Enumerable.ToArray(newItemsSource));
                var nc = Fayde.Collections.INotifyCollectionChanged_.As(newItemsSource);
                if (nc)
                    nc.CollectionChanged.Subscribe(this._OnItemsSourceUpdated, this);
            };
            GridItemsControl.prototype._OnItemsSourceUpdated = function (sender, e) {
                switch (e.Action) {
                    case 1 /* Add */:
                        this._AddItems(e.NewStartingIndex, e.NewItems);
                        break;
                    case 2 /* Remove */:
                        this._RemoveItems(e.OldStartingIndex, e.OldItems);
                        break;
                    case 3 /* Replace */:
                        this._RemoveItems(e.NewStartingIndex, e.OldItems);
                        this._AddItems(e.NewStartingIndex, e.NewItems);
                        break;
                    case 4 /* Reset */:
                        this._RemoveItems(0, e.OldItems);
                        break;
                }
            };

            Object.defineProperty(GridItemsControl.prototype, "Items", {
                get: function () {
                    return this._Items;
                },
                enumerable: true,
                configurable: true
            });
            GridItemsControl.prototype._AddItems = function (index, newItems) {
                var items = this._Items;
                for (var i = 0, len = newItems.length; i < len; i++) {
                    items.splice(index + i, 0, newItems[i]);
                }
                this.OnItemsAdded(index, newItems);
            };
            GridItemsControl.prototype._RemoveItems = function (index, oldItems) {
                this._Items.splice(index, oldItems.length);
                this.OnItemsRemoved(index, oldItems);
            };

            GridItemsControl.prototype.OnItemsAdded = function (index, newItems) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (presenter)
                    presenter.OnItemsAdded(index, newItems);
            };
            GridItemsControl.prototype.OnItemsRemoved = function (index, oldItems) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (presenter)
                    presenter.OnItemsRemoved(index, oldItems);
            };

            GridItemsControl.prototype._ColumnsChanged = function (sender, e) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (!presenter)
                    return;
                switch (e.Action) {
                    case 1 /* Add */:
                        for (var i = 0, len = e.NewItems.length; i < len; i++) {
                            presenter.OnColumnAdded(e.NewStartingIndex + i, e.NewItems[i]);
                        }
                        break;
                    case 2 /* Remove */:
                        for (var i = 0, len = e.OldItems.length; i < len; i++) {
                            presenter.OnColumnRemoved(e.OldStartingIndex + i);
                        }
                        break;
                    case 3 /* Replace */:
                        presenter.OnColumnRemoved(e.NewStartingIndex);
                        presenter.OnColumnAdded(e.NewStartingIndex, e.NewItems[i]);
                        break;
                    case 4 /* Reset */:
                        presenter.OnColumnsCleared();
                        break;
                }
            };
            GridItemsControl.prototype._ColumnChanged = function (sender, e) {
                var presenter = this.XamlNode.ItemsPresenter;
                if (!presenter)
                    return;
                presenter.OnColumnChanged(e.GridColumn);
            };
            GridItemsControl.ItemsSourceProperty = DependencyProperty.Register("ItemsSource", function () {
                return Fayde.IEnumerable_;
            }, GridItemsControl, null, function (d, args) {
                return d.OnItemsSourceChanged(args.OldValue, args.NewValue);
            });

            GridItemsControl.ColumnsProperty = DependencyProperty.RegisterImmutable("Columns", function () {
                return Fayde.Experimental.GridColumnCollection;
            }, GridItemsControl);
            return GridItemsControl;
        })(Fayde.Controls.Control);
        Experimental.GridItemsControl = GridItemsControl;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var Grid = Fayde.Controls.Grid;
        var RowDefinition = Fayde.Controls.RowDefinition;
        var ColumnDefinition = Fayde.Controls.ColumnDefinition;

        var GridItemsPresenterNode = (function (_super) {
            __extends(GridItemsPresenterNode, _super);
            function GridItemsPresenterNode(xobj) {
                _super.call(this, xobj);
            }
            Object.defineProperty(GridItemsPresenterNode.prototype, "ElementRoot", {
                get: function () {
                    return this._ElementRoot;
                },
                enumerable: true,
                configurable: true
            });

            GridItemsPresenterNode.prototype.DoApplyTemplateWithError = function (error) {
                if (this._ElementRoot)
                    return false;

                var xobj = this.XObject;
                var gic = xobj.TemplateOwner;
                if (!(gic instanceof Fayde.Experimental.GridItemsControl))
                    return false;

                this._ElementRoot = new Grid();

                if (!this.FinishApplyTemplateWithError(this._ElementRoot, error))
                    return false;
                gic.XamlNode.ItemsPresenter = xobj;
                for (var i = 0, cols = gic.Columns.ToArray(), len = cols.length; i < len; i++) {
                    xobj.OnColumnAdded(i, cols[i]);
                }
                xobj.OnItemsAdded(0, gic.Items);
                return true;
            };
            return GridItemsPresenterNode;
        })(Fayde.FENode);
        Experimental.GridItemsPresenterNode = GridItemsPresenterNode;

        var GridItemsPresenter = (function (_super) {
            __extends(GridItemsPresenter, _super);
            function GridItemsPresenter() {
                _super.apply(this, arguments);
                this._CellContainers = [];
                this._Columns = [];
            }
            GridItemsPresenter.prototype.CreateNode = function () {
                return new GridItemsPresenterNode(this);
            };

            Object.defineProperty(GridItemsPresenter.prototype, "GridItemsControl", {
                get: function () {
                    return this.TemplateOwner instanceof Fayde.Experimental.GridItemsControl ? this.TemplateOwner : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridItemsPresenter.prototype, "Panel", {
                get: function () {
                    return this.XamlNode.ElementRoot;
                },
                enumerable: true,
                configurable: true
            });

            GridItemsPresenter.prototype.OnColumnAdded = function (index, newColumn) {
                var cols = this._Columns;
                cols.splice(index, 0, newColumn);

                var gic = this.GridItemsControl;
                var grid = this.Panel;
                if (!gic || !grid)
                    return;

                var coldef = new ColumnDefinition();
                newColumn.AttachToDefinition(coldef);
                grid.ColumnDefinitions.Insert(index, coldef);

                for (var i = 0, containers = this._CellContainers, len = containers.length, items = gic.Items, children = grid.Children; i < len; i++) {
                    var item = items[i];
                    var container = newColumn.GetContainerForCell(item);
                    newColumn.PrepareContainerForCell(container, item);
                    containers[i].splice(index, 0, container);
                    Grid.SetRow(container, i);
                    children.Insert(i * cols.length + index, container);
                }

                for (var i = 0, containers = this._CellContainers, len = containers.length; i < len; i++) {
                    for (var j = index, cells = containers[i], len2 = cells.length; j < len2; j++) {
                        Grid.SetColumn(cells[j], j);
                    }
                }
            };
            GridItemsPresenter.prototype.OnColumnRemoved = function (index) {
                var cols = this._Columns;
                var col = cols[index];

                var gic = this.GridItemsControl;
                var grid = this.Panel;
                if (gic && grid) {
                    for (var items = gic.Items, containers = this._CellContainers, i = containers.length - 1; i >= 0; i--) {
                        var container = containers[i][index];
                        col.ClearContainerForCell(container, items[i]);
                        grid.Children.Remove(container);

                        var cells = containers[i];
                        cells.splice(index, 1);

                        for (var j = index, len2 = cells.length; j < len2; j++) {
                            Grid.SetColumn(cells[j], j);
                        }
                    }

                    grid.ColumnDefinitions.RemoveAt(index);
                }

                col.DetachDefinition();
                cols.splice(index, 1);
            };
            GridItemsPresenter.prototype.OnColumnsCleared = function () {
                var cols = this._Columns;
                var gic = this.GridItemsControl;
                var grid = this.Panel;
                if (gic && grid) {
                    var items = gic.Items;

                    for (var containers = this._CellContainers, i = containers.length - 1; i >= 0; i--) {
                        for (var j = cols.length - 1; j >= 0; j--) {
                            cols[j].ClearContainerForCell(containers[i][j], items[i]);
                        }
                    }
                    grid.Children.Clear();
                }
                for (var j = 0, len = cols.length; j < len; j++) {
                    cols[j].DetachDefinition();
                }
                cols.length = 0;
                this._CellContainers.length = 0;
            };
            GridItemsPresenter.prototype.OnColumnChanged = function (col) {
                var gic = this.GridItemsControl;
                if (!gic)
                    return;
                var colindex = this._Columns.indexOf(col);
                if (colindex < 0)
                    return;
                for (var i = 0, containers = this._CellContainers, items = gic.Items, len = containers.length; i < len; i++) {
                    col.PrepareContainerForCell(containers[i][colindex], items[i]);
                }
            };

            GridItemsPresenter.prototype.OnItemsAdded = function (index, newItems) {
                var gic = this.GridItemsControl;
                var grid = this.Panel;
                if (!gic || !grid)
                    return;

                var containers = this._CellContainers;
                var items = gic.Items;
                var cols = this._Columns;
                var children = grid.Children;

                var rowdefs = grid.RowDefinitions;
                for (var i = 0, len = newItems.length; i < len; i++) {
                    var rowdef = new RowDefinition();
                    rowdef.Height = new Fayde.Controls.GridLength(1, 0 /* Auto */);
                    rowdefs.Insert(index + i, rowdef);
                }

                for (var i = 0, len = newItems.length; i < len; i++) {
                    var newrow = [];
                    for (var j = 0, len2 = cols.length; j < len2; j++) {
                        var item = items[index + i];
                        var col = cols[j];
                        var container = col.GetContainerForCell(item);
                        col.PrepareContainerForCell(container, item);
                        newrow.push(container);
                        Grid.SetRow(container, index + i);
                        Grid.SetColumn(container, j);
                        children.Insert((index + i) * len2 + j, container);
                    }
                    containers.splice(index + i, 0, newrow);
                }

                for (var i = index + 1, len = containers.length; i < len; i++) {
                    for (var j = 0, cells = containers[i]; j < cells.length; j++) {
                        Grid.SetRow(cells[j], i);
                    }
                }
            };
            GridItemsPresenter.prototype.OnItemsRemoved = function (index, oldItems) {
                var grid = this.Panel;
                if (!grid)
                    return;

                var containers = this._CellContainers;
                var cols = this._Columns;

                var oldRowContainers = containers.splice(index, oldItems.length);

                for (var i = 0, len = oldItems.length; i < len; i++) {
                    var oldrow = oldRowContainers[i];
                    for (var j = 0; j < oldrow.length; j++) {
                        var cell = oldrow[j];
                        cols[j].ClearContainerForCell(cell, oldItems[i]);
                        grid.Children.Remove(cell);
                    }
                }

                for (var i = index, len = containers.length; i < len; i++) {
                    var row = containers[i];
                    for (var j = 0; j < row.length; j++) {
                        Grid.SetRow(row[j], i);
                    }
                }

                var rowdefs = grid.RowDefinitions;
                for (var i = 0, len = oldItems.length; i < len; i++) {
                    rowdefs.RemoveAt(index);
                }
            };
            return GridItemsPresenter;
        })(Fayde.FrameworkElement);
        Experimental.GridItemsPresenter = GridItemsPresenter;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridCell = (function (_super) {
            __extends(GridCell, _super);
            function GridCell() {
                _super.apply(this, arguments);
            }
            return GridCell;
        })(Fayde.Controls.ContentControl);
        Experimental.GridCell = GridCell;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridLength = Fayde.Controls.GridLength;
        var ColumnDefinition = Fayde.Controls.ColumnDefinition;

        var GridColumn = (function (_super) {
            __extends(GridColumn, _super);
            function GridColumn() {
                _super.apply(this, arguments);
                this._Definition = null;
                this._ActualWidthListener = null;
            }
            GridColumn.prototype.GetContainerForCell = function (item) {
                return new Fayde.Experimental.GridCell();
            };
            GridColumn.prototype.PrepareContainerForCell = function (cell, item) {
            };
            GridColumn.prototype.ClearContainerForCell = function (cell, item) {
            };

            GridColumn.prototype.AttachToDefinition = function (coldef) {
                this._Definition = coldef;
                if (!coldef)
                    return;

                var binding = new Fayde.Data.Binding("Width");
                binding.Source = this;
                binding.Mode = 1 /* OneWay */;
                binding.Converter = new EmptyWidthConverter();
                coldef.SetBinding(ColumnDefinition.WidthProperty, binding);

                binding = new Fayde.Data.Binding("MaxWidth");
                binding.Source = this;
                binding.Mode = 1 /* OneWay */;
                coldef.SetBinding(ColumnDefinition.MaxWidthProperty, binding);

                binding = new Fayde.Data.Binding("MinWidth");
                binding.Source = this;
                binding.Mode = 1 /* OneWay */;
                coldef.SetBinding(ColumnDefinition.MinWidthProperty, binding);

                this._ActualWidthListener = ColumnDefinition.ActualWidthProperty.Store.ListenToChanged(coldef, ColumnDefinition.ActualWidthProperty, this._OnActualWidthChanged, this);
            };
            GridColumn.prototype._OnActualWidthChanged = function (sender, args) {
                this.SetCurrentValue(ColumnDefinition.ActualWidthProperty, args.NewValue);
            };
            GridColumn.prototype.DetachDefinition = function () {
                var awl = this._ActualWidthListener;
                var coldef = this._Definition;
                this._ActualWidthListener = null;
                this._Definition = null;
                if (awl)
                    awl.Detach();
                if (coldef) {
                    coldef.ClearValue(ColumnDefinition.WidthProperty);
                    coldef.ClearValue(ColumnDefinition.MaxWidthProperty);
                    coldef.ClearValue(ColumnDefinition.MinWidthProperty);
                }
            };
            GridColumn.WidthProperty = DependencyProperty.Register("Width", function () {
                return GridLength;
            }, GridColumn);
            GridColumn.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () {
                return Number;
            }, GridColumn, Number.POSITIVE_INFINITY);
            GridColumn.MinWidthProperty = DependencyProperty.Register("MinWidth", function () {
                return Number;
            }, GridColumn, 0.0);
            GridColumn.ActualWidthProperty = DependencyProperty.RegisterReadOnly("ActualWidth", function () {
                return Number;
            }, GridColumn, 0.0);
            return GridColumn;
        })(Fayde.DependencyObject);
        Experimental.GridColumn = GridColumn;

        var GridColumnCollection = (function (_super) {
            __extends(GridColumnCollection, _super);
            function GridColumnCollection() {
                _super.apply(this, arguments);
                this.ColumnChanged = new MulticastEvent();
                this.CollectionChanged = new MulticastEvent();
            }
            GridColumnCollection.prototype._RaiseItemAdded = function (value, index) {
                this.CollectionChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Add(value, index));
            };
            GridColumnCollection.prototype._RaiseItemRemoved = function (value, index) {
                this.CollectionChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Remove(value, index));
            };
            GridColumnCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
                this.CollectionChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Replace(added, removed, index));
            };
            GridColumnCollection.prototype._RaiseCleared = function (old) {
                this.CollectionChanged.Raise(this, Fayde.Collections.NotifyCollectionChangedEventArgs.Reset(old));
            };
            return GridColumnCollection;
        })(Fayde.XamlObjectCollection);
        Experimental.GridColumnCollection = GridColumnCollection;

        var EmptyWidthConverter = (function () {
            function EmptyWidthConverter() {
            }
            EmptyWidthConverter.prototype.Convert = function (value, targetType, parameter, culture) {
                if (!value)
                    return "auto";
                return value;
            };
            EmptyWidthConverter.prototype.ConvertBack = function (value, targetType, parameter, culture) {
            };
            return EmptyWidthConverter;
        })();
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridColumnChangedEventArgs = (function (_super) {
            __extends(GridColumnChangedEventArgs, _super);
            function GridColumnChangedEventArgs(col) {
                _super.call(this);
                Object.defineProperty(this, "GridColumn", { value: col, writable: false });
            }
            return GridColumnChangedEventArgs;
        })(EventArgs);
        Experimental.GridColumnChangedEventArgs = GridColumnChangedEventArgs;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridTextColumn = (function (_super) {
            __extends(GridTextColumn, _super);
            function GridTextColumn() {
                _super.apply(this, arguments);
            }
            GridTextColumn.prototype.OnDisplayMemberChanged = function (args) {
                var gcc = this.Parent;
                if (gcc instanceof Fayde.Experimental.GridColumnCollection)
                    gcc.ColumnChanged.Raise(gcc, new Fayde.Experimental.GridColumnChangedEventArgs(this));
            };

            GridTextColumn.prototype.PrepareContainerForCell = function (cell, item) {
                _super.prototype.PrepareContainerForCell.call(this, cell, item);
                var gc = cell;
                if (gc instanceof Fayde.Experimental.GridCell) {
                    gc.VerticalAlignment = 1 /* Center */;
                    var binding = new Fayde.Data.Binding(this.DisplayMemberPath);
                    binding.Source = item;
                    gc.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);
                }
            };
            GridTextColumn.prototype.ClearContainerForCell = function (cell, item) {
                _super.prototype.ClearContainerForCell.call(this, cell, item);
                var gc = cell;
                if (gc instanceof Fayde.Experimental.GridCell)
                    gc.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
            };
            GridTextColumn.DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", function () {
                return String;
            }, GridTextColumn, undefined, function (d, args) {
                return d.OnDisplayMemberChanged(args);
            });
            return GridTextColumn;
        })(Fayde.Experimental.GridColumn);
        Experimental.GridTextColumn = GridTextColumn;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Experimental) {
        var GridTemplateColumn = (function (_super) {
            __extends(GridTemplateColumn, _super);
            function GridTemplateColumn() {
                _super.apply(this, arguments);
            }
            GridTemplateColumn.prototype.PrepareContainerForCell = function (cell, item) {
                _super.prototype.PrepareContainerForCell.call(this, cell, item);
                var gc = cell;
                if (gc instanceof Fayde.Experimental.GridCell) {
                    var binding = new Fayde.Data.Binding();
                    binding.Source = item;
                    gc.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);

                    binding = new Fayde.Data.Binding("CellTemplate");
                    binding.Source = this;
                    gc.SetBinding(Fayde.Controls.ContentControl.ContentTemplateProperty, binding);
                }
            };
            GridTemplateColumn.prototype.ClearContainerForCell = function (cell, item) {
                _super.prototype.ClearContainerForCell.call(this, cell, item);
                var gc = cell;
                if (gc instanceof Fayde.Experimental.GridCell) {
                    gc.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
                    gc.ClearValue(Fayde.Controls.ContentControl.ContentTemplateProperty);
                }
            };
            GridTemplateColumn.CellTemplateProperty = DependencyProperty.Register("CellTemplate", function () {
                return Fayde.DataTemplate;
            }, GridTemplateColumn);
            return GridTemplateColumn;
        })(Fayde.Experimental.GridColumn);
        Experimental.GridTemplateColumn = GridTemplateColumn;
    })(Fayde.Experimental || (Fayde.Experimental = {}));
    var Experimental = Fayde.Experimental;
})(Fayde || (Fayde = {}));
