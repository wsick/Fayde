var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// CODE
    /// <reference path="Panel.ts" />
    /// <reference path="ItemsPresenter.ts" />
    /// <reference path="ItemContainerGenerator.ts" />
    /// <reference path="ContentPresenter.ts" />
    /// <reference path="ItemCollection.ts" />
    /// <reference path="../Collections/NotifyCollectionChangedEventArgs.ts" />
    (function (Controls) {
        var ItemsControlNode = (function (_super) {
            __extends(ItemsControlNode, _super);
            function ItemsControlNode(xobj) {
                        _super.call(this, xobj);
            }
            ItemsControlNode._DefaultPosition = {
                Index: -1,
                Offset: 1
            };
            ItemsControlNode.prototype.GetDefaultVisualTree = function () {
                var presenter = this._Presenter;
                if(!presenter) {
                    //TODO: How can we get the res chain in here?
                    this._Presenter = presenter = new Controls.ItemsPresenter();
                    presenter.TemplateOwner = this.XObject;
                }
                return presenter;
            };
            Object.defineProperty(ItemsControlNode.prototype, "ItemsPresenter", {
                get: function () {
                    return this._Presenter;
                },
                enumerable: true,
                configurable: true
            });
            ItemsControlNode.prototype._SetItemsPresenter = function (presenter) {
                if(this._Presenter) {
                    this._Presenter.XamlNode.ElementRoot.Children.Clear();
                }
                this._Presenter = presenter;
                var xobj = this.XObject;
                xobj.AddItemsToPresenter(ItemsControlNode._DefaultPosition, xobj.Items.Count);
            };
            return ItemsControlNode;
        })(Controls.ControlNode);
        Controls.ItemsControlNode = ItemsControlNode;        
        Nullstone.RegisterType(ItemsControlNode, "ItemsControlNode");
        var ItemsControl = (function (_super) {
            __extends(ItemsControl, _super);
            function ItemsControl() {
                        _super.call(this);
                this._ItemsIsDataBound = false;
                this._Items = null;
                this._DisplayMemberTemplate = null;
                this.DefaultStyleKey = (this).constructor;
                var icg = new Controls.ItemContainerGenerator(this);
                icg.ItemsChanged.Subscribe(this.OnItemContainerGeneratorChanged, this);
                Object.defineProperty(this, "ItemContainerGenerator", {
                    value: icg,
                    writable: false
                });
            }
            ItemsControl.prototype.CreateNode = function () {
                return new ItemsControlNode(this);
            };
            ItemsControl.DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", function () {
                return String;
            }, ItemsControl, null, function (d, args) {
                return (d).OnDisplayMemberPathChanged(args);
            });
            ItemsControl.ItemsPanelProperty = DependencyProperty.RegisterCore("ItemsPanel", function () {
                return Controls.ItemsPanelTemplate;
            }, ItemsControl);
            ItemsControl.ItemsSourceProperty = DependencyProperty.Register("ItemsSource", function () {
                return Fayde.IEnumerable_;
            }, ItemsControl, null, function (d, args) {
                return (d).OnItemsSourceChanged(args);
            });
            ItemsControl.ItemTemplateProperty = DependencyProperty.RegisterCore("ItemTemplate", function () {
                return Fayde.DataTemplate;
            }, ItemsControl, undefined, function (d, args) {
                return (d).OnItemTemplateChanged(args);
            });
            Object.defineProperty(ItemsControl.prototype, "Items", {
                get: function () {
                    var items = this._Items;
                    if(!items) {
                        this._Items = items = new Controls.ItemCollection();
                        this._ItemsIsDataBound = true;
                        items.ItemsChanged.Subscribe(this.InvokeItemsChanged, this);
                        //items.Clearing.Subscribe(this.OnItemsClearing, this);
                                            }
                    return items;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ItemsControl.prototype, "$Items", {
                get: function () {
                    return this.Items;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ItemsControl.prototype, "ItemsSource", {
                get: function () {
                    return this.GetValue(ItemsControl.ItemsSourceProperty);
                },
                set: function (value) {
                    if(!this._ItemsIsDataBound && this.Items.Count > 0) {
                        throw new InvalidOperationException("Items collection must be empty before using ItemsSource");
                    }
                    this.SetValue(ItemsControl.ItemsSourceProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ItemsControl.prototype, "$DisplayMemberTemplate", {
                get: // <DataTemplate><Grid><TextBlock Text="{Binding @DisplayMemberPath}" /></Grid></DataTemplate>
                function () {
                    var dmt = this._DisplayMemberTemplate;
                    if(!dmt) {
                        var json = {
                            ParseType: Controls.Grid,
                            Children: [
                                {
                                    ParseType: Controls.TextBlock,
                                    Props: {
                                        Text: new Fayde.BindingMarkup({
                                            Path: this.DisplayMemberPath
                                        })
                                    }
                                }
                            ]
                        };
                        dmt = this._DisplayMemberTemplate = new Fayde.DataTemplate(json);
                        //TODO: DataTemplate wants a res chain
                                            }
                    return dmt;
                },
                enumerable: true,
                configurable: true
            });
            ItemsControl.Annotations = {
                ContentProperty: "Items"
            };
            Object.defineProperty(ItemsControl.prototype, "Panel", {
                get: function () {
                    var p = this.XamlNode.ItemsPresenter;
                    var presenter = this.XamlNode.ItemsPresenter;
                    if(presenter) {
                        return presenter.ElementRoot;
                    }
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            ItemsControl.GetItemsOwner = function GetItemsOwner(uie) {
                if(!(uie instanceof Controls.Panel)) {
                    return null;
                }
                var panel = uie;
                if(!panel.IsItemsHost) {
                    return null;
                }
                var presenter = panel.TemplateOwner;
                if(!(presenter instanceof Controls.ItemsPresenter)) {
                    return null;
                }
                var ic = presenter.TemplateOwner;
                if(ic instanceof ItemsControl) {
                    return ic;
                }
                return null;
            };
            ItemsControl.ItemsControlFromItemContainer = function ItemsControlFromItemContainer(container) {
                if(!(container instanceof Fayde.FrameworkElement)) {
                    return null;
                }
                var fe = container;
                var parentNode = fe.XamlNode.ParentNode;
                var parent = (parentNode) ? parentNode.XObject : null;
                var itctl;
                if(parent instanceof ItemsControl) {
                    itctl = parent;
                }
                if(itctl == null) {
                    return ItemsControl.GetItemsOwner(parent);
                }
                if(itctl.IsItemItsOwnContainer(fe)) {
                    return itctl;
                }
                return null;
            };
            ItemsControl.prototype.OnItemsSourceChanged = function (e) {
                if(!e.OldValue && Nullstone.ImplementsInterface(e.OldValue, Fayde.Collections.INotifyCollectionChanged_)) {
                    (e.OldValue).CollectionChanged.Unsubscribe(this._CollectionChanged, this);
                }
                if(e.NewValue != null) {
                    var source = e.NewValue;
                    if(Nullstone.ImplementsInterface(source, Fayde.Collections.INotifyCollectionChanged_)) {
                        (source).CollectionChanged.Subscribe(this._CollectionChanged, this);
                    }
                    this.$Items.IsReadOnly = true;
                    this._ItemsIsDataBound = true;
                    this.$Items.ClearImpl();
                    var enumerator;
                    if(source instanceof Array) {
                        enumerator = Fayde.ArrayEx.GetEnumerator(source);
                    } else if(source instanceof Fayde.XamlObjectCollection) {
                        enumerator = (source).GetEnumerator();
                    }
                    if(enumerator) {
                        var items = this.$Items;
                        while(enumerator.MoveNext()) {
                            items.AddImpl(enumerator.Current);
                        }
                    }
                    this.OnItemsChanged(Fayde.Collections.NotifyCollectionChangedEventArgs.Reset());
                } else {
                    this._ItemsIsDataBound = false;
                    this.$Items.IsReadOnly = false;
                    this.$Items.ClearImpl();
                }
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            ItemsControl.prototype._CollectionChanged = function (sender, e) {
                var index;
                switch(e.Action) {
                    case Fayde.Collections.NotifyCollectionChangedAction.Add:
                        var enumerator = Fayde.ArrayEx.GetEnumerator(e.NewItems);
                        index = e.NewStartingIndex;
                        while(enumerator.MoveNext()) {
                            this.$Items.InsertImpl(index, enumerator.Current);
                            index++;
                        }
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Remove:
                        var enumerator = Fayde.ArrayEx.GetEnumerator(e.OldItems);
                        while(enumerator.MoveNext()) {
                            this.$Items.RemoveAtImpl(e.OldStartingIndex);
                        }
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Replace:
                        var enumerator = Fayde.ArrayEx.GetEnumerator(e.NewItems);
                        index = e.NewStartingIndex;
                        while(enumerator.MoveNext()) {
                            this.$Items.SetValueAtImpl(index, enumerator.Current);
                            index++;
                        }
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Reset:
                        this.$Items.ClearImpl();
                        var enumerator = this.ItemsSource.GetEnumerator();
                        while(enumerator.MoveNext()) {
                            this.$Items.AddImpl(enumerator.Current);
                        }
                        break;
                }
                this.OnItemsChanged(e);
            };
            ItemsControl.prototype.OnDisplayMemberPathChanged = function (e) {
                var icg = this.ItemContainerGenerator;
                var i = 0;
                var enumerator = this.Items.GetEnumerator();
                while(enumerator.MoveNext()) {
                    this.UpdateContentTemplateOnContainer(icg.ContainerFromIndex(i), enumerator.Current);
                    i++;
                }
            };
            ItemsControl.prototype.PrepareContainerForItem = function (container, item) {
                if(this.DisplayMemberPath != null && this.ItemTemplate != null) {
                    throw new InvalidOperationException("Cannot set 'DisplayMemberPath' and 'ItemTemplate' simultaenously");
                }
                this.UpdateContentTemplateOnContainer(container, item);
            };
            ItemsControl.prototype.ClearContainerForItem = function (container, item) {
            };
            ItemsControl.prototype.GetContainerForItem = function () {
                return new Controls.ContentPresenter();
            };
            ItemsControl.prototype.IsItemItsOwnContainer = function (item) {
                return item instanceof Fayde.FrameworkElement;
            };
            ItemsControl.prototype.OnItemsChanged = function (e) {
            };
            ItemsControl.prototype.InvokeItemsChanged = function (sender, e) {
                /*
                switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                this.SetLogicalParent(this, e.NewItems);
                break;
                case Collections.NotifyCollectionChangedAction.Remove:
                this.SetLogicalParent(null, e.OldItems);
                break;
                case Collections.NotifyCollectionChangedAction.Replace:
                this.SetLogicalParent(null, e.OldItems);
                this.SetLogicalParent(this, e.NewItems);
                break;
                }
                */
                this.ItemContainerGenerator.OnOwnerItemsItemsChanged(e);
                if(!this._ItemsIsDataBound) {
                    this.OnItemsChanged(e);
                }
            };
            ItemsControl.prototype.OnItemContainerGeneratorChanged = function (sender, e) {
                var panel = this.Panel;
                if(!panel || panel instanceof Controls.VirtualizingPanel) {
                    return;
                }
                switch(e.Action) {
                    case Fayde.Collections.NotifyCollectionChangedAction.Reset:
                        var count = panel.Children.Count;
                        if(count > 0) {
                            this.RemoveItemsFromPresenter({
                                Index: 0,
                                Offset: 0
                            }, count);
                        }
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Add:
                        this.AddItemsToPresenter(e.Position, e.ItemCount);
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Remove:
                        this.RemoveItemsFromPresenter(e.Position, e.ItemCount);
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Replace:
                        this.RemoveItemsFromPresenter(e.Position, e.ItemCount);
                        this.AddItemsToPresenter(e.Position, e.ItemCount);
                        break;
                }
            };
            ItemsControl.prototype.OnItemTemplateChanged = function (e) {
                var enumerator = this.Items.GetEnumerator();
                var i = 0;
                var icg = this.ItemContainerGenerator;
                while(enumerator.MoveNext()) {
                    this.UpdateContentTemplateOnContainer(icg.ContainerFromIndex(i), enumerator.Current);
                    i++;
                }
            };
            ItemsControl.prototype.AddItemsToPresenter = function (position, count) {
                var panel = this.Panel;
                if(!panel || panel instanceof Controls.VirtualizingPanel) {
                    return;
                }
                var icg = this.ItemContainerGenerator;
                var newIndex = icg.IndexFromGeneratorPosition(position);
                var items = this.Items;
                var children = panel.Children;
                var state = icg.StartAt(position, true, true);
                try  {
                    for(var i = 0; i < count; i++) {
                        var item = items.GetValueAt(newIndex + i);
                        var container = icg.GenerateNext({
                            Value: null
                        });
                        if(container instanceof Controls.ContentControl) {
                            (container)._ContentSetsParent = false;
                        }
                        if(container instanceof Fayde.FrameworkElement && !(item instanceof Fayde.FrameworkElement)) {
                            container.DataContext = item;
                        }
                        children.Insert(newIndex + i, container);
                        icg.PrepareItemContainer(container);
                    }
                }finally {
                    state.Dispose();
                }
            };
            ItemsControl.prototype.RemoveItemsFromPresenter = function (position, count) {
                var panel = this.Panel;
                if(!panel || panel instanceof Controls.VirtualizingPanel) {
                    return;
                }
                while(count > 0) {
                    panel.Children.RemoveAt(position.Index);
                    count--;
                }
            };
            ItemsControl.prototype.UpdateContentTemplateOnContainer = function (element, item) {
                if(element === item) {
                    return;
                }
                var presenter;
                if(element instanceof Controls.ContentPresenter) {
                    presenter = element;
                }
                var control;
                if(element instanceof Controls.ContentControl) {
                    control = element;
                }
                var template;
                if(!(item instanceof Fayde.UIElement)) {
                    template = this.ItemTemplate || this.$DisplayMemberTemplate;
                }
                if(presenter != null) {
                    presenter.ContentTemplate = template;
                    presenter.Content = item;
                } else if(control != null) {
                    control.ContentTemplate = template;
                    control.Content = item;
                }
            };
            return ItemsControl;
        })(Controls.Control);
        Controls.ItemsControl = ItemsControl;        
        Nullstone.RegisterType(ItemsControl, "ItemsControl");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemsControl.js.map
