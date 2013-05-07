var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../Core/UIElement.ts" />
    /// <reference path="ItemsControl.ts" />
    /// <reference path="ContainerMap.ts" />
    /// <reference path="Primitives/ItemsChangedEventArgs.ts" />
    /// <reference path="../Collections/NotifyCollectionChangedEventArgs.ts" />
    (function (Controls) {
        function range_count(r) {
            return r.End - r.Start + 1;
        }
        var RangeCollection = (function () {
            function RangeCollection() {
                this._Ranges = [];
                this._IndexCount = 0;
                this._Gen = 0;
            }
            Object.defineProperty(RangeCollection.prototype, "Count", {
                get: function () {
                    return this._IndexCount;
                },
                enumerable: true,
                configurable: true
            });
            RangeCollection.prototype.ToExpandedArray = function () {
                var arr = [];
                var count = this._IndexCount;
                for(var i = 0; i < count; i++) {
                    arr.push(this.GetValueAt(i));
                }
                return arr;
            };
            RangeCollection.prototype.FindRangeIndexForValue = function (value) {
                var min = 0;
                var max = this._Ranges.length - 1;
                while(min <= max) {
                    var mid = Math.floor(min + ((max - min) / 2));
                    var range = this._Ranges[mid];
                    if(value >= range.Start && value <= range.End) {
                        return mid;
                    }
                    if(value < range.Start) {
                        max = mid - 1;
                    } else {
                        min = mid + 1;
                    }
                }
                return ~min;
            };
            RangeCollection.prototype.FindInsertionPosition = function (range) {
                var min = 0;
                var max = this._Ranges.length - 1;
                while(min <= max) {
                    var mid = Math.floor(min + ((max - min) / 2));
                    var midRange = this._Ranges[mid];
                    if(midRange.End === range.End) {
                        return mid;
                    }
                    if(midRange.End > range.End) {
                        if(mid > 0 && (this._Ranges[mid - 1].End < range.End)) {
                            return mid;
                        }
                        max = mid - 1;
                    } else {
                        min = mid + 1;
                    }
                }
                return min;
            };
            RangeCollection.prototype.IndexOf = function (value) {
                var offset = 0;
                var rs = this._Ranges;
                var len = rs.length;
                for(var i = 0; i < len; i++) {
                    var range = rs[i];
                    if(value >= range.Start && value <= range.End) {
                        return offset + (value - range.Start);
                    }
                    offset = offset + (range.End - range.Start + 1);
                }
                return -1;
            };
            RangeCollection.prototype.Contains = function (value) {
                return this.FindRangeIndexForValue(value) >= 0;
            };
            RangeCollection.prototype.Get = function (index) {
                return this._Ranges[index];
            };
            RangeCollection.prototype.GetValueAt = function (index) {
                var i;
                var cuml_count;
                var rs = this._Ranges;
                var len = rs.length;
                var r;
                for(i = 0 , cuml_count = 0; i < len && index >= 0; i++) {
                    r = rs[i];
                    cuml_count = cuml_count + range_count(r);
                    if(index < cuml_count) {
                        return r.End - (cuml_count - index) + 1;
                    }
                }
                throw new IndexOutOfRangeException(index);
            };
            RangeCollection.prototype.Add = function (value) {
                if(!this.Contains(value)) {
                    this._Gen++;
                    this.InsertRange({
                        Start: value,
                        End: value
                    });
                    this._IndexCount++;
                    return true;
                }
                return false;
            };
            RangeCollection.prototype.Insert = function (position, range) {
                this._Ranges.splice(position, 0, range);
            };
            RangeCollection.prototype.InsertRange = function (range) {
                var position = this.FindInsertionPosition(range);
                var merged_left = this.MergeLeft(range, position);
                var merged_right = this.MergeRight(range, position);
                if(!merged_left && !merged_right) {
                    this.Insert(position, range);
                } else if(merged_left && merged_right) {
                    this._Ranges[position - 1].End = this._Ranges[position].End;
                    this.RemoveAt(position);
                }
            };
            RangeCollection.prototype.Remove = function (value) {
                this._Gen++;
                return this.RemoveIndexFromRange(value);
            };
            RangeCollection.prototype.RemoveAt = function (index) {
                this._Ranges.splice(index, 1);
            };
            RangeCollection.prototype.RemoveIndexFromRange = function (index) {
                var rindex = this.FindRangeIndexForValue(index);
                if(rindex < 0) {
                    return false;
                }
                var range = this._Ranges[rindex];
                if(range.Start === index && range.End === index) {
                    this.RemoveAt(rindex);
                } else if(range.Start === index) {
                    range.Start++;
                } else if(range.End === index) {
                    range.End--;
                } else {
                    var split_range = {
                        Start: index + 1,
                        End: range.End
                    };
                    range.End = index - 1;
                    this.Insert(rindex + 1, split_range);
                }
                this._IndexCount--;
                return true;
            };
            RangeCollection.prototype.Clear = function () {
                this._Ranges = [];
                this._Gen++;
                this._IndexCount = 0;
            };
            RangeCollection.prototype.MergeLeft = function (range, position) {
                var left = position - 1;
                var rs = this._Ranges;
                if(left >= 0 && rs[left].End + 1 == range.Start) {
                    rs[left].End = range.Start;
                    return true;
                }
                return false;
            };
            RangeCollection.prototype.MergeRight = function (range, position) {
                var rs = this._Ranges;
                if((position < rs.length) && (rs[position].Start - 1 === range.End)) {
                    rs[position].Start = range.End;
                    return true;
                }
                return false;
            };
            return RangeCollection;
        })();
        Controls.RangeCollection = RangeCollection;        
        var ItemContainerGenerator = (function () {
            function ItemContainerGenerator(Owner) {
                this.Owner = Owner;
                this.RealizedElements = new RangeCollection();
                this.Cache = [];
                this.ItemsChanged = new MulticastEvent();
                this.ContainerMap = new Controls.ContainerMap(this);
            }
            Object.defineProperty(ItemContainerGenerator.prototype, "Panel", {
                get: function () {
                    return this.Owner.Panel;
                },
                enumerable: true,
                configurable: true
            });
            ItemContainerGenerator.prototype.GetItemContainerGeneratorForPanel = function (panel) {
                if(this.Panel === panel) {
                    return this;
                }
                return null;
            };
            ItemContainerGenerator.prototype.CheckOffsetAndRealized = function (position, count) {
                if(position.offset !== 0) {
                    throw new ArgumentException("position.Offset must be zero as the position must refer to a realized element");
                }
                var index = this.IndexFromGeneratorPosition(position);
                var realized = this.RealizedElements;
                var rangeIndex = realized.FindRangeIndexForValue(index);
                var range = realized.Get(rangeIndex);
                if(index < range.Start || (index + count) > range.Start + range_count(range)) {
                    throw new InvalidOperationException("Only items which have been Realized can be removed");
                }
            };
            ItemContainerGenerator.prototype.GeneratorPositionFromIndex = function (index) {
                var realized = this.RealizedElements;
                var realizedCount = realized.Count;
                if(index < 0) {
                    return {
                        index: -1,
                        offset: 0
                    };
                } else if(realized.Contains(index)) {
                    return {
                        index: realized.IndexOf(index),
                        offset: 0
                    };
                } else if(index > this.Owner.Items.Count) {
                    return {
                        index: -1,
                        offset: 0
                    };
                }
                if(realizedCount === 0) {
                    return {
                        index: -1,
                        offset: index + 1
                    };
                }
                var index = -1;
                for(var i = 0; i < realizedCount; i++) {
                    if(realized.GetValueAt(i) > index) {
                        break;
                    }
                    index = i;
                }
                if(index === -1) {
                    return {
                        index: index,
                        offset: index + 1
                    };
                }
                return {
                    index: index,
                    offset: index - realized.GetValueAt(index)
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
                var realized = this.RealizedElements;
                if(index >= 0 && index < realized.Count) {
                    return realized.GetValueAt(index) + offset;
                }
                return index + offset;
            };
            ItemContainerGenerator.prototype.IndexFromContainer = function (container) {
                return this.ContainerMap.IndexFromContainer(container);
            };
            ItemContainerGenerator.prototype.ContainerFromIndex = function (index) {
                return this.ContainerMap.ContainerFromIndex(index);
            };
            ItemContainerGenerator.prototype.ItemFromContainer = function (container) {
                return this.ContainerMap.ItemFromContainer(container);
            };
            ItemContainerGenerator.prototype.ContainerFromItem = function (item) {
                return this.ContainerMap.ContainerFromItem(item);
            };
            ItemContainerGenerator.prototype.StartAt = function (position, direction, allowStartAtRealizedItem) {
                if(this._GenerationState) {
                    throw new InvalidOperationException("Cannot call StartAt while a generation operation is in progress");
                }
                this._GenerationState = {
                    AllowStartAtRealizedItem: allowStartAtRealizedItem,
                    PositionIndex: position.index,
                    PositionOffset: position.offset,
                    Step: direction
                };
                return this._GenerationState;
            };
            ItemContainerGenerator.prototype.GenerateNext = function (isNewlyRealized) {
                if(!this._GenerationState) {
                    throw new InvalidOperationException("Cannot call GenerateNext before calling StartAt");
                }
                var realized = this.RealizedElements;
                var state = this._GenerationState;
                var index;
                var startAt = state.PositionIndex;
                ;
                var startOffset = state.PositionOffset;
                if(startAt === -1) {
                    if(startOffset < 0) {
                        index = this.Owner.Items.Count + startOffset;
                    } else if(startOffset == 0) {
                        index = 0;
                    } else {
                        index = startOffset - 1;
                    }
                } else if(startAt >= 0 && startAt < realized.Count) {
                    index = realized.GetValueAt(startAt) + startOffset;
                } else {
                    index = -1;
                }
                var alreadyRealized = realized.Contains(index);
                if(!state.AllowStartAtRealizedItem && alreadyRealized && startOffset === 0) {
                    index = index + state.Step;
                    alreadyRealized = realized.Contains(index);
                }
                if(index < 0 || index >= this.Owner.Items.Count) {
                    isNewlyRealized.Value = false;
                    return null;
                }
                if(alreadyRealized) {
                    state.PositionIndex = realized.IndexOf(index);
                    state.PositionOffset = state.Step;
                    isNewlyRealized.Value = false;
                    return this.ContainerMap.ContainerFromIndex(index);
                }
                var container;
                var item = this.Owner.Items.GetValueAt(index);
                if(this.Owner.IsItemItsOwnContainer(item)) {
                    if(item instanceof Fayde.DependencyObject) {
                        container = item;
                    }
                    isNewlyRealized.Value = true;
                } else {
                    if(this.Cache.length === 0) {
                        container = this.Owner.GetContainerForItem();
                        isNewlyRealized.Value = true;
                    } else {
                        container = this.Cache.pop();
                        isNewlyRealized.Value = false;
                    }
                    if(container instanceof Controls.ContentControl) {
                        (container)._ContentSetsParent = false;
                    }
                }
                if(container instanceof Fayde.FrameworkElement && !(item instanceof Fayde.UIElement)) {
                    (container).DataContext = item;
                }
                realized.Add(index);
                this.ContainerMap.Add(container, item, index);
                state.PositionIndex = realized.IndexOf(index);
                state.PositionOffset = state.Step;
                return container;
            };
            ItemContainerGenerator.prototype.StopGeneration = function () {
                this._GenerationState = undefined;
            };
            ItemContainerGenerator.prototype.PrepareItemContainer = function (container) {
                var item = this.ContainerMap.ItemFromContainer(container);
                this.Owner.PrepareContainerForItem(container, item);
            };
            ItemContainerGenerator.prototype.MoveExistingItems = function (index, offset) {
                var list = this.RealizedElements.ToExpandedArray();
                if(offset > 0) {
                    list = list.reverse();
                }
                var newRanges = new RangeCollection();
                var map = this.ContainerMap;
                for(var i = 0; i < list.length; i++) {
                    var oldIndex = i;
                    if(oldIndex < index) {
                        newRanges.Add(oldIndex);
                    } else {
                        newRanges.Add(oldIndex + offset);
                        map.Move(oldIndex, offset);
                    }
                }
                this.RealizedElements = newRanges;
            };
            ItemContainerGenerator.prototype.Recycle = function (position, count) {
                this.CheckOffsetAndRealized(position, count);
                var index = this.IndexFromGeneratorPosition(position);
                var realized = this.RealizedElements;
                var cache = this.Cache;
                var map = this.ContainerMap;
                var end = index + count;
                for(var i = index; i < end; i++) {
                    realized.Remove(i);
                    cache.push(map.RemoveIndex(i));
                }
            };
            ItemContainerGenerator.prototype.Remove = function (position, count) {
                this.CheckOffsetAndRealized(position, count);
                var index = this.IndexFromGeneratorPosition(position);
                var realized = this.RealizedElements;
                var map = this.ContainerMap;
                var end = index + count;
                for(var i = index; i < end; i++) {
                    realized.Remove(i);
                    map.RemoveIndex(i);
                }
            };
            ItemContainerGenerator.prototype.RemoveAll = function () {
                this.ContainerMap.Clear();
                this.RealizedElements.Clear();
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
                        if((e.NewStartingIndex + 1) !== this.Owner.Items.Count) {
                            this.MoveExistingItems(e.NewStartingIndex, 1);
                        }
                        itemCount = 1;
                        itemUICount = 0;
                        position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                        position.offset = 1;
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Remove:
                        itemCount = 1;
                        if(this.RealizedElements.Contains(e.OldStartingIndex)) {
                            itemUICount = 1;
                        } else {
                            itemUICount = 0;
                        }
                        position = this.GeneratorPositionFromIndex(e.OldStartingIndex);
                        if(itemUICount === 1) {
                            this.Remove(position, 1);
                        }
                        this.MoveExistingItems(e.OldStartingIndex, -1);
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Replace:
                        if(!this.RealizedElements.Contains(e.NewStartingIndex)) {
                            return;
                        }
                        itemCount = 1;
                        itemUICount = 1;
                        position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                        this.Remove(position, 1);
                        var newPos = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                        this.StartAt(newPos, 0, true);
                        this.PrepareItemContainer(this.GenerateNext({
                            Value: null
                        }));
                        break;
                    case Fayde.Collections.NotifyCollectionChangedAction.Reset:
                        var itemCount;
                        if(!e.OldItems) {
                            itemCount = 0;
                        } else {
                            itemCount = e.OldItems.length;
                        }
                        itemUICount = this.RealizedElements.Count;
                        position = {
                            index: -1,
                            offset: 0
                        };
                        this.RemoveAll();
                        break;
                    default:
                        //Console.WriteLine("*** Critical error in ItemContainerGenerator.OnOwnerItemsItemsChanged. NotifyCollectionChangedAction.{0} is not supported", e.Action);
                        break;
                }
                this.ItemsChanged.Raise(this, new Controls.Primitives.ItemsChangedEventArgs(e.Action, itemCount, itemUICount, oldPosition, position));
            };
            return ItemContainerGenerator;
        })();
        Controls.ItemContainerGenerator = ItemContainerGenerator;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemContainerGenerator.js.map
