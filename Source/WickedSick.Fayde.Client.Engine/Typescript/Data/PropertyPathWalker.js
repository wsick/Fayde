var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="PropertyPathParser.ts" />
    /// <reference path="../Runtime/PropertyInfo.ts" />
    /// <reference path="../Core/INotifyPropertyChanged.ts" />
    /// <reference path="../Collections/INotifyCollectionChanged.ts" />
    /// <reference path="CollectionViewSource.ts" />
    (function (Data) {
        var PropertyPathWalker = (function () {
            function PropertyPathWalker(path, bindDirectlyToSource, bindsToView, isDataContextBound) {
                bindDirectlyToSource = bindDirectlyToSource !== false;
                bindsToView = bindsToView === true;
                this.IsDataContextBound = isDataContextBound === true;
                //begin
                this.Path = path;
                this.IsDataContextBound = isDataContextBound;
                var lastCVNode = null;
                if(!path || path === ".") {
                    lastCVNode = createCollectionViewNode(bindDirectlyToSource, bindsToView);
                    this.Node = lastCVNode;
                    this.FinalNode = lastCVNode;
                } else {
                    var data = {
                        typeName: undefined,
                        propertyName: undefined,
                        index: undefined
                    };
                    var type;
                    var parser = new Data.PropertyPathParser(path);
                    while((type = parser.Step(data)) !== Data.PropertyNodeType.None) {
                        var isViewProperty = false;
                        //bool isViewProperty = CollectionViewProperties.Any (prop => prop.Name == propertyName);
                        //          static readonly PropertyInfo[] CollectionViewProperties = typeof (ICollectionView).GetProperties ();
                        var node = createCollectionViewNode(bindDirectlyToSource, isViewProperty);
                        lastCVNode = node;
                        switch(type) {
                            case Data.PropertyNodeType.AttachedProperty:
                            case Data.PropertyNodeType.Property:
                                node.Next = createStandardNode(data.typeName, data.propertyName);
                                break;
                            case Data.PropertyNodeType.Indexed:
                                node.Next = createIndexedNode(data.index);
                                break;
                            default:
                                break;
                        }
                        if(this.FinalNode) {
                            this.FinalNode.Next = node;
                        } else {
                            this.Node = node;
                        }
                        this.FinalNode = node.Next;
                    }
                }
                lastCVNode.BindToView = lastCVNode.BindToView || bindsToView;
                this.FinalNode.Listen(this);
            }
            Object.defineProperty(PropertyPathWalker.prototype, "Value", {
                get: function () {
                    return this._Value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropertyPathWalker.prototype, "IsPathBroken", {
                get: function () {
                    var path = this.Path;
                    if(this.IsDataContextBound && (!path || path.length < 1)) {
                        return false;
                    }
                    var node = this.Node;
                    while(node) {
                        if(node.IsBroken) {
                            return true;
                        }
                        node = node.Next;
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            PropertyPathWalker.prototype.GetValue = function (item) {
                this.Update(item);
                var o = this.FinalNode.Value;
                this.Update(null);
                return o;
            };
            PropertyPathWalker.prototype.Update = function (source) {
                this.Source = source;
                this.Node.SetSource(source);
            };
            PropertyPathWalker.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            PropertyPathWalker.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            PropertyPathWalker.prototype.IsBrokenChanged = function (node) {
                this.ValueInternal = node.Value;
                var listener = this._Listener;
                if(listener) {
                    listener.IsBrokenChanged();
                }
            };
            PropertyPathWalker.prototype.ValueChanged = function (node) {
                this.ValueInternal = node.Value;
                var listener = this._Listener;
                if(listener) {
                    listener.ValueChanged();
                }
            };
            return PropertyPathWalker;
        })();
        Data.PropertyPathWalker = PropertyPathWalker;        
        var PropertyPathNode = (function () {
            function PropertyPathNode() { }
            Object.defineProperty(PropertyPathNode.prototype, "IsBroken", {
                get: function () {
                    return this._IsBroken;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropertyPathNode.prototype, "Source", {
                get: function () {
                    return this._Source;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropertyPathNode.prototype, "Value", {
                get: function () {
                    return this._Value;
                },
                enumerable: true,
                configurable: true
            });
            PropertyPathNode.prototype.Listen = function (listener) {
                this._NodeListener = listener;
            };
            PropertyPathNode.prototype.Unlisten = function (listener) {
                if(this._NodeListener === listener) {
                    this._NodeListener = null;
                }
            };
            PropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
            };
            PropertyPathNode.prototype.OnSourcePropertyChanged = function (o, e) {
            };
            PropertyPathNode.prototype.UpdateValue = function () {
                AbstractMethod("PropertyPathNode.UpdateValue");
            };
            PropertyPathNode.prototype.SetValue = function (value) {
                AbstractMethod("PropertyPathNode.SetValue");
            };
            PropertyPathNode.prototype.SetSource = function (value) {
                if(value == null || !Nullstone.Equals(value, this._Source)) {
                    var oldSource = this._Source;
                    if(oldSource && Nullstone.ImplementsInterface(oldSource, Fayde.INotifyPropertyChanged_)) {
                        (oldSource).PropertyChanged.Unsubscribe(this.OnSourcePropertyChanged, this);
                    }
                    this._Source = value;
                    if(this._Source && Nullstone.ImplementsInterface(this._Source, Fayde.INotifyPropertyChanged_)) {
                        (this._Source).PropertyChanged.Subscribe(this.OnSourcePropertyChanged, this);
                    }
                    this.OnSourceChanged(oldSource, this._Source);
                    this.UpdateValue();
                    if(this.Next) {
                        this.Next.SetSource(this._Value);
                    }
                }
            };
            PropertyPathNode.prototype.UpdateValueAndIsBroken = function (newValue, isBroken) {
                var emitBrokenChanged = this._IsBroken !== isBroken;
                var emitValueChanged = !Nullstone.Equals(this.Value, newValue);
                this._IsBroken = isBroken;
                this._Value = newValue;
                if(emitValueChanged) {
                    var listener = this._NodeListener;
                    if(listener) {
                        listener.ValueChanged(this);
                    }
                } else if(emitBrokenChanged) {
                    var listener = this._NodeListener;
                    if(listener) {
                        listener.IsBrokenChanged(this);
                    }
                }
            };
            PropertyPathNode.prototype._CheckIsBroken = function () {
                return !this.Source || (!this.PropertyInfo && !this.DependencyProperty);
            };
            return PropertyPathNode;
        })();        
        function createStandardNode(typeName, propertyName) {
            return new StandardPropertyPathNode(typeName, propertyName);
        }
        var StandardPropertyPathNode = (function (_super) {
            __extends(StandardPropertyPathNode, _super);
            function StandardPropertyPathNode(typeName, propertyName) {
                        _super.call(this);
                this._STypeName = typeName;
                this._PropertyName = propertyName;
            }
            StandardPropertyPathNode.prototype.SetValue = function (value) {
                if(this.DependencyProperty) {
                    (this.Source).SetValue(this.DependencyProperty, value);
                } else if(this.PropertyInfo) {
                    this.PropertyInfo.SetValue(this.Source, value);
                }
            };
            StandardPropertyPathNode.prototype.UpdateValue = function () {
                if(this.DependencyProperty) {
                    this.ValueType = this.DependencyProperty.GetTargetType();
                    this.UpdateValueAndIsBroken((this.Source).GetValue(this.DependencyProperty), this._CheckIsBroken());
                } else if(this.PropertyInfo) {
                    //TODO: this.ValueType = PropertyInfo.PropertyType;
                    this.ValueType = null;
                    try  {
                        this.UpdateValueAndIsBroken(this.PropertyInfo.GetValue(this.Source), this._CheckIsBroken());
                    } catch (err) {
                        this.UpdateValueAndIsBroken(null, this._CheckIsBroken());
                    }
                } else {
                    this.ValueType = null;
                    this.UpdateValueAndIsBroken(null, this._CheckIsBroken());
                }
            };
            StandardPropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
                _super.prototype.OnSourceChanged.call(this, oldSource, newSource);
                var oldDO;
                var newDO;
                if(oldSource instanceof Fayde.DependencyObject) {
                    oldDO = oldSource;
                }
                if(newSource instanceof Fayde.DependencyObject) {
                    newDO = newSource;
                }
                var listener = this._DPListener;
                if(listener) {
                    listener.Detach();
                    this._DPListener = listener = null;
                }
                this.DependencyProperty = null;
                this.PropertyInfo = null;
                if(!this.Source) {
                    return;
                }
                if(newDO) {
                    var propd = DependencyProperty.GetDependencyProperty(this.Source.constructor, this._PropertyName);
                    if(propd) {
                        this.DependencyProperty = propd;
                        this._DPListener = listener = Fayde.ListenToPropertyChanged(newDO, propd, this.OnPropertyChanged, this);
                    }
                }
                if(!this.DependencyProperty || !this.DependencyProperty._IsAttached) {
                    this.PropertyInfo = PropertyInfo.Find(this.Source, this._PropertyName);
                }
            };
            StandardPropertyPathNode.prototype.OnPropertyChanged = function (sender, args) {
                try  {
                    this.UpdateValue();
                    if(this.Next) {
                        this.Next.SetSource(this.Value);
                    }
                } catch (err) {
                }
            };
            StandardPropertyPathNode.prototype.OnSourcePropertyChanged = function (sender, e) {
                if(e.PropertyName === this._PropertyName && this.PropertyInfo) {
                    this.UpdateValue();
                    var next = this.Next;
                    if(next) {
                        next.SetSource(this.Value);
                    }
                }
            };
            return StandardPropertyPathNode;
        })(PropertyPathNode);        
        function createCollectionViewNode(bindsDirectlyToSource, bindsToView) {
            return new CollectionViewNode(bindsDirectlyToSource, bindsToView);
        }
        var CollectionViewNode = (function (_super) {
            __extends(CollectionViewNode, _super);
            function CollectionViewNode(bindsDirectlyToSource, bindToView) {
                        _super.call(this);
                this.BindsDirectlyToSource = bindsDirectlyToSource === true;
                this.BindToView = bindToView === true;
            }
            CollectionViewNode.prototype.OnSourceChanged = function (oldSource, newSource) {
                _super.prototype.OnSourceChanged.call(this, oldSource, newSource);
                this.DisconnectViewHandlers();
                this.ConnectViewHandlers(newSource, newSource);
            };
            CollectionViewNode.prototype.ViewChanged = function (sender, e) {
                this.DisconnectViewHandlers(true);
                this.ConnectViewHandlers(null, e.NewValue);
                this.ViewCurrentChanged(this, EventArgs.Empty);
            };
            CollectionViewNode.prototype.ViewCurrentChanged = function (sender, e) {
                this.UpdateValue();
                if(this.Next) {
                    this.Next.SetSource(this.Value);
                }
            };
            CollectionViewNode.prototype.SetValue = function () {
                throw new NotSupportedException("SetValue");
            };
            CollectionViewNode.prototype.UpdateValue = function () {
                if(this.BindsDirectlyToSource) {
                    this.ValueType = this.Source == null ? null : this.Source.constructor;
                    this.UpdateValueAndIsBroken(this.Source, this._CheckIsBroken());
                } else {
                    var usableSource = this.Source;
                    var view;
                    if(this.Source instanceof Data.CollectionViewSource) {
                        usableSource = null;
                        view = this.Source.View;
                    } else if(Nullstone.ImplementsInterface(this.Source, Data.ICollectionView_)) {
                        view = this.Source;
                    }
                    if(!view) {
                        this.ValueType = usableSource == null ? null : usableSource.constructor;
                        this.UpdateValueAndIsBroken(usableSource, this._CheckIsBroken());
                    } else {
                        if(this.BindToView) {
                            this.ValueType = view.constructor;
                            this.UpdateValueAndIsBroken(view, this._CheckIsBroken());
                        } else {
                            this.ValueType = view.GetCurrentItem() == null ? null : view.GetCurrentItem().constructor;
                            this.UpdateValueAndIsBroken(view.GetCurrentItem(), this._CheckIsBroken());
                        }
                    }
                }
            };
            CollectionViewNode.prototype._CheckIsBroken = function () {
                return this.Source == null;
            };
            CollectionViewNode.prototype.ConnectViewHandlers = function (source, view) {
                if(source instanceof Data.CollectionViewSource) {
                    this._ViewPropertyListener = Fayde.ListenToPropertyChanged(source, Data.CollectionViewSource.ViewProperty, this.ViewChanged, this);
                    view = source.View;
                }
                if(Nullstone.ImplementsInterface(view, Data.ICollectionView_)) {
                    this._View = view;
                    this._View.CurrentChanged.Subscribe(this.ViewCurrentChanged, this);
                }
            };
            CollectionViewNode.prototype.DisconnectViewHandlers = function (onlyView) {
                if(!onlyView) {
                    onlyView = false;
                }
                if(this._ViewPropertyListener && !onlyView) {
                    this._ViewPropertyListener.Detach();
                    this._ViewPropertyListener = null;
                }
                if(this._View) {
                    this._View.CurrentChanged.Unsubscribe(this.ViewCurrentChanged, this);
                }
            };
            return CollectionViewNode;
        })(PropertyPathNode);        
        function createIndexedNode(index) {
            return new IndexedPropertyPathNode(index);
        }
        var IndexedPropertyPathNode = (function (_super) {
            __extends(IndexedPropertyPathNode, _super);
            function IndexedPropertyPathNode(index) {
                        _super.call(this);
                this._IsBroken = false;
                var val = parseInt(index, 10);
                if(isNaN(val)) {
                    this._Index = index;
                } else {
                    this._Index = val;
                }
            }
            Object.defineProperty(IndexedPropertyPathNode.prototype, "Index", {
                get: function () {
                    return this._Index;
                },
                enumerable: true,
                configurable: true
            });
            IndexedPropertyPathNode.prototype.UpdateValue = function () {
                if(this.PropertyInfo == null) {
                    this._IsBroken = true;
                    this.ValueType = null;
                    this.UpdateValueAndIsBroken(null, this._IsBroken);
                    return;
                }
                try  {
                    var newVal = this.PropertyInfo.GetValue(this.Source, this._Index);
                    this._IsBroken = false;
                    this.ValueType = this.PropertyInfo.PropertyType;
                    this.UpdateValueAndIsBroken(newVal, this._IsBroken);
                } catch (err) {
                    this._IsBroken = true;
                    this.ValueType = null;
                    this.UpdateValueAndIsBroken(null, this._IsBroken);
                }
            };
            IndexedPropertyPathNode.prototype.SetValue = function (value) {
                if(this.PropertyInfo != null) {
                    this.PropertyInfo.SetValue(this.Source, this._Index, value);
                }
            };
            IndexedPropertyPathNode.prototype._CheckIsBroken = function () {
                return this._IsBroken || _super.prototype._CheckIsBroken.call(this);
            };
            IndexedPropertyPathNode.prototype.OnSourcePropertyChanged = function (o, e) {
                this.UpdateValue();
                if(this.Next != null) {
                    this.Next.SetSource(this.Value);
                }
            };
            IndexedPropertyPathNode.prototype.OnSourceChanged = function (oldSource, newSource) {
                _super.prototype.OnSourceChanged.call(this, oldSource, newSource);
                if(this.Listener != null) {
                    this.Listener.Detach();
                    this.Listener = null;
                }
                if(Nullstone.ImplementsInterface(newSource, Fayde.Collections.INotifyCollectionChanged_)) {
                    (newSource).CollectionChanged.Subscribe(this.CollectionChanged, this);
                }
                this._GetIndexer();
            };
            IndexedPropertyPathNode.prototype._GetIndexer = function () {
                this.PropertyInfo = null;
                if(this._Source != null) {
                    this.PropertyInfo = IndexedPropertyInfo.Find(this._Source);
                }
            };
            IndexedPropertyPathNode.prototype.CollectionChanged = function (o, e) {
                this.UpdateValue();
                if(this.Next != null) {
                    this.Next.SetSource(this.Value);
                }
            };
            return IndexedPropertyPathNode;
        })(PropertyPathNode);        
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PropertyPathWalker.js.map
