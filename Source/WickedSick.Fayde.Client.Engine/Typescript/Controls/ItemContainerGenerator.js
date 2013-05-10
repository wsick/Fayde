var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../Core/UIElement.ts" />
    /// <reference path="ItemsControl.ts" />
    /// <reference path="Primitives/ItemsChangedEventArgs.ts" />
    /// <reference path="../Collections/NotifyCollectionChangedEventArgs.ts" />
    (function (Controls) {
        var ItemContainerGenerator = (function () {
            function ItemContainerGenerator(Owner) {
                this.Owner = Owner;
                this._Cache = [];
                this._Containers = [];
                this._RealizedCount = 0;
                this._Items = [];
                this.ItemsChanged = new MulticastEvent();
            }
            ItemContainerGenerator.prototype.GenerateNext = function (isNewlyRealized) {
                if(!this._GenerationState) {
                    throw new InvalidOperationException("Cannot call GenerateNext before calling StartAt");
                }
                var owner = this.Owner;
                var ownerItems = owner.Items;
                var state = this._GenerationState;
                var pos = state.Position;
                var index = this.IndexFromGeneratorPosition(pos);
                isNewlyRealized.Value = this._Containers[index] == null;
                if(!state.AllowStartAtRealizedItem && !isNewlyRealized.Value && pos.offset === 0) {
                    index += state.Step;
                    isNewlyRealized.Value = this._Containers[index] == null;
                }
                if(index < 0 || index >= ownerItems.Count) {
                    isNewlyRealized.Value = false;
                    return null;
                }
                if(!isNewlyRealized.Value) {
                    pos.index = index;
                    pos.offset = state.Step;
                    return this._Containers[index];
                }
                var container;
                var item = ownerItems.GetValueAt(index);
                if(owner.IsItemItsOwnContainer(item)) {
                    if(item instanceof Fayde.DependencyObject) {
                        container = item;
                    }
                    isNewlyRealized.Value = true;
                } else {
                    if(this._Cache.length > 0) {
                        container = this._Cache.pop();
                        isNewlyRealized.Value = false;
                    } else {
                        container = owner.GetContainerForItem();
                        isNewlyRealized.Value = true;
                    }
                }
                if(container instanceof Fayde.FrameworkElement && !(item instanceof Fayde.UIElement)) {
                    (container).DataContext = item;
                }
                this._Items[index] = item;
                this._Containers[index] = container;
                if(isNewlyRealized.Value) {
                    this._RealizedCount++;
                }
                pos.index = index;
                pos.offset = state.Step;
                return container;
            };
            ItemContainerGenerator.prototype.GetItemContainerGeneratorForPanel = function (panel) {
                if(this.Owner.Panel === panel) {
                    return this;
                }
                return null;
            };
            ItemContainerGenerator.prototype.PrepareItemContainer = function (container) {
                var item = this.ItemFromContainer(container);
                this.Owner.PrepareContainerForItem(container, item);
            };
            ItemContainerGenerator.prototype.Recycle = function (position, count) {
                this._KillContainers(position, count, false);
            };
            ItemContainerGenerator.prototype.Remove = function (position, count) {
                this._KillContainers(position, count, false);
            };
            ItemContainerGenerator.prototype.RemoveAll = function () {
                var container;
                var item;
                var containers = this._Containers;
                var items = this._Items;
                var ic = this.Owner;
                while((container = containers.shift()) !== undefined && (item = items.shift()) !== undefined) {
                    ic.ClearContainerForItem(container, item);
                }
                this._RealizedCount = 0;
            };
            ItemContainerGenerator.prototype.StartAt = function (position, forward, allowStartAtRealizedItem) {
                var _this = this;
                if(this._GenerationState) {
                    throw new InvalidOperationException("Cannot call StartAt while a generation operation is in progress");
                }
                this._GenerationState = {
                    AllowStartAtRealizedItem: allowStartAtRealizedItem,
                    Position: {
                        index: position.index,
                        offset: position.offset
                    },
                    Step: forward ? 1 : -1,
                    Dispose: function () {
                        return _this._GenerationState = null;
                    }
                };
                return this._GenerationState;
            };
            ItemContainerGenerator.prototype.IndexFromContainer = function (container) {
                return this._Containers.indexOf(container);
            };
            ItemContainerGenerator.prototype.ContainerFromIndex = function (index) {
                return this._Containers[index];
            };
            ItemContainerGenerator.prototype.ItemFromContainer = function (container) {
                var index = this._Containers.indexOf(container);
                if(index < 0) {
                    return undefined;
                }
                return this._Items[index];
            };
            ItemContainerGenerator.prototype.ContainerFromItem = function (item) {
                if(item == null) {
                    return undefined;
                }
                var index = this._Items.indexOf(item);
                if(index < 0) {
                    return undefined;
                }
                return this._Containers[index];
            };
            ItemContainerGenerator.prototype.GeneratorPositionFromIndex = function (itemIndex) {
                if(itemIndex < 0) {
                    return {
                        index: -1,
                        offset: 0
                    };
                }
                if(this._RealizedCount === 0) {
                    return {
                        index: -1,
                        offset: itemIndex + 1
                    };
                }
                if(itemIndex > this.Owner.Items.Count) {
                    return {
                        index: -1,
                        offset: 0
                    };
                }
                var realizedIndex = -1;
                var runningOffset = 0;
                var containers = this._Containers;
                var len = containers.length;
                for(var i = 0; i < len && (realizedIndex + runningOffset) < itemIndex; i++) {
                    if(containers[i] != null) {
                        realizedIndex++;
                        runningOffset = 0;
                    } else {
                        runningOffset++;
                    }
                }
                return {
                    index: realizedIndex,
                    offset: runningOffset
                };
            };
            ItemContainerGenerator.prototype.IndexFromGeneratorPosition = function (position) {
                var index = position.index;
                var offset = position.offset;
                if(index === -1) {
                    if(offset < 0) {
                        return this.Owner.Items.Count + offset;
                    }
                    return offset - 1;
                }
                if(index > this.Owner.Items.Count) {
                    return -1;
                }
                var realizedIndex = index;
                var containers = this._Containers;
                var len = containers.length;
                var i = 0;
                for(; i < len && realizedIndex >= 0; i++) {
                    if(containers[i] != null) {
                        realizedIndex--;
                    }
                }
                return i + offset - 1;
            };
            ItemContainerGenerator.prototype.OnOwnerItemsItemsChanged = function (e) {
                var itemCount;
                var itemUICount;
                var oldPosition = {
                    index: -1,
                    offset: 0
                };
                var position;
                switch(e.Action) {
                    case Fayde.Collections.NotifyCollectionChangedAction.Add:
                        itemCount = e.NewItems.length;
                        Fayde.ArrayEx.Fill(this._Containers, e.NewStartingIndex, itemCount, null);
                        Fayde.ArrayEx.Fill(this._Items, e.NewStartingIndex, itemCount, null);
                        itemUICount = 0;
                        position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                        position.offset = 1;
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Remove:
                        itemCount = (e.OldItems) ? e.OldItems.length : 1;
                        itemUICount = this._GetNumAlreadyRealizedItems(e.OldItems);
                        position = this.GeneratorPositionFromIndex(e.OldStartingIndex);
                        this.Remove(position, itemUICount);
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Replace:
                        itemCount = 1;
                        itemUICount = 1;
                        position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                        this.Remove(position, 1);
                        var newPos = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                        var state = this.StartAt(newPos, true, true);
                        try  {
                            this.PrepareItemContainer(this.GenerateNext({
                                Value: null
                            }));
                        }finally {
                            state.Dispose();
                        }
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Reset:
                        itemCount = (e.OldItems) ? e.OldItems.length : 0;
                        itemUICount = this._RealizedCount;
                        position = {
                            index: -1,
                            offset: 0
                        };
                        this.RemoveAll();
                        break;
                    default:
                        Warn("*** Critical error in ItemContainerGenerator.OnOwnerItemsItemsChanged. NotifyCollectionChangedAction." + e.Action + " is not supported");
                        break;
                }
                var args = new Controls.Primitives.ItemsChangedEventArgs(e.Action, itemCount, itemUICount, oldPosition, position);
                this.ItemsChanged.Raise(this, args);
            };
            ItemContainerGenerator.prototype._GetNumAlreadyRealizedItems = function (items) {
                var count = 0;
                var len = items.length;
                for(var i = 0; i < len; i++) {
                    if(this.ContainerFromItem(items[i]) != null) {
                        count++;
                    }
                }
                return count;
            };
            ItemContainerGenerator.prototype._KillContainers = function (position, count, recycle) {
                if(position.offset !== 0) {
                    throw new ArgumentException("position.Offset must be zero as the position must refer to a realized element");
                }
                var index = this.IndexFromGeneratorPosition(position);
                //TODO: Should we warn user if we're removing non-realized elements
                this._Items.splice(index, count);
                if(recycle) {
                    this._Cache = this._Cache.concat(this._Containers.splice(index, count));
                } else {
                    this._Containers.splice(index, count);
                }
                this._RealizedCount -= count;
            };
            return ItemContainerGenerator;
        })();
        Controls.ItemContainerGenerator = ItemContainerGenerator;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemContainerGenerator.js.map
