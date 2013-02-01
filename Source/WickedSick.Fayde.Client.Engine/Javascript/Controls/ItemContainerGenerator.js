/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/DoubleKeyedDictionary.js" />
/// <reference path="Primitives/ItemsChangedEventArgs.js" />
/// CODE

//#region GenerationState
var GenerationState = Nullstone.Create("GenerationState", undefined, 5);

GenerationState.Instance.Init = function (allowStartAtRealizedItem, generatorDirection, positionIndex, positionOffset) {
    this._allowStartAtRealizedItem = allowStartAtRealizedItem;
    this._positionIndex = positionIndex;
    this._positionOffset = positionOffset;
    this._step = generatorDirection === 0 ? 1 : -1;
};

Nullstone.FinishCreate(GenerationState);
//#endregion

(function (namespace) {

    //#region Range

    var Range = Nullstone.Create("Range", undefined, 2);
    Range.Instance.Init = function (start, end) {
        this.Start = start;
        this.End = end;
    };
    Range.Instance.Count = function () {
        return this.End - this.Start + 1;
    };
    Nullstone.FinishCreate(Range);

    //#endregion

    //#region RangeCollection

    var RangeCollection = Nullstone.Create("RangeCollection");

    RangeCollection.Instance.Init = function () {
        this._ranges = [];
        this._generation = 0;
        this.Count = 0;
    };

    //#region Properties

    Nullstone.Property(RangeCollection, "Ranges", {
        get: function () {
            return RangeCollection.CopyRangeArray(this._ranges, 0, this._ranges.length, 0);
        }
    });

    //#endregion

    RangeCollection.CopyRangeArray = function (rangeArray, startIndex, length, destinationIndex) {
        var result = [];
        for (var i = startIndex; i < length; i++) {
            var r = rangeArray[i];
            result[destinationIndex] = new Range(r.Start, r.End);
            destinationIndex++;
        }
        return result;
    };

    RangeCollection.Instance.FindRangeIndexForValue = function (value) {
        var min = 0;
        var max = this._ranges.length - 1;
        while (min <= max) {
            var mid = Math.floor(min + ((max - min) / 2));
            var range = this._ranges[mid];
            if (value >= range.Start && value <= range.End)
                return mid;

            if (value < range.Start)
                max = mid - 1;
            else
                min = mid + 1;
        }
        return ~min;
    };
    RangeCollection.Instance.FindInsertionPosition = function (range) {
        var min = 0;
        var max = this._ranges.length - 1;
        while (min <= max) {
            var mid = Math.floor(min + ((max - min) / 2));
            var midRange = this._ranges[mid];
            if (midRange.End === range.End)
                return mid;

            if (midRange.End > range.End) {
                if (mid > 0 && (this._ranges[mid - 1].End < range.End))
                    return mid;
                max = mid - 1;
            } else {
                min = mid + 1;
            }
        }
        return min;
    };

    RangeCollection.Instance.IndexOf = function (value) {
        var offset = 0;
        for (var i = 0; i < this._ranges.length; i++) {
            var range = this._ranges[i];
            if (value >= range.Start && value <= range.End)
                return offset + (value - range.Start);

            offset = offset + (range.End - range.Start + 1);
        }
        return -1;
    };
    RangeCollection.Instance.Contains = function (value) {
        return this.FindRangeIndexForValue(value) >= 0;
    };

    RangeCollection.Instance.GetValueAt = function (index) {
        var i;
        var cuml_count;
        var rangeCount = this._ranges.length;
        for (i = 0, cuml_count = 0; i < rangeCount && index >= 0; i++) {
            cuml_count = cuml_count + this._ranges[i].Count();
            if (index < cuml_count)
                return this._ranges[i].End - (cuml_count - index) + 1;
        }

        throw new IndexOutOfRangeException(index);
    };

    RangeCollection.Instance.Add = function (value) {
        if (!this.Contains(value)) {
            this._generation++;
            this.InsertRange(new Range(value, value));
            this.Count++;
            return true;
        }
        return false;
    };
    RangeCollection.Instance.Insert = function (position, range) {
        this._ranges.splice(position, 0, range);
    };
    RangeCollection.Instance.InsertRange = function (range) {
        var position = this.FindInsertionPosition(range);
        var merged_left = this.MergeLeft(range, position);
        var merged_right = this.MergeRight(range, position);

        if (!merged_left && !merged_right) {
            this.Insert(position, range);
        } else if (merged_left && merged_right) {
            this._ranges[position - 1].End = this._ranges[position].End;
            this.RemoveAt(position);
        }
    };
    RangeCollection.Instance.Remove = function (value) {
        this._generation++;
        return this.RemoveIndexFromRange(value);
    };
    RangeCollection.Instance.RemoveAt = function (index) {
        this._ranges.splice(index, 1);
    };
    RangeCollection.Instance.RemoveIndexFromRange = function (index) {
        var range_index = this.FindRangeIndexForValue(index);
        if (range_index < 0)
            return false;

        var range = this._ranges[range_index];
        if (range.Start === index && range.End === index) {
            this.RemoveAt(range_index);
        } else if (range.Start === index) {
            range.Start++;
        } else if (range.End === index) {
            range.End--;
        } else {
            var split_range = new Range(index + 1, range.End);
            range.End = index - 1;
            this.Insert(range_index + 1, split_range);
        }

        this.Count--;
        return true;
    };
    RangeCollection.Instance.Clear = function () {
        this.Count = 0;
        this._ranges = [];
        this._generation++;
    };

    RangeCollection.Instance.MergeLeft = function (range, position) {
        var left = position - 1;
        if (left >= 0 && this._ranges[left].End + 1 == range.Start) {
            this._ranges[left].End = range.Start;
            return true;
        }
        return false;
    };
    RangeCollection.Instance.MergeRight = function (range, position) {
        if (position < this._ranges.length && this._ranges[position].Start - 1 == range.End) {
            this._ranges[position].Start = range.End;
            return true;
        }
        return false;
    };

    Nullstone.FinishCreate(RangeCollection);

    //#endregion

    //#region ItemContainerGenerator

    var ItemContainerGenerator = Nullstone.Create("ItemContainerGenerator", undefined, 1);

    ItemContainerGenerator.Instance.Init = function (owner) {
        this.ItemsChanged = new MulticastEvent();

        this.Cache = [];
        this.ContainerIndexMap = new DoubleKeyedDictionary(Fayde.DependencyObject, Number);
        this.ContainerItemMap = new Dictionary(Fayde.DependencyObject, Object);
        this.Owner = owner;
        this.RealizedElements = new RangeCollection();
    };

    ItemContainerGenerator.Instance.ContainerFromIndex = function (index) {
        return this.ContainerIndexMap.MapFromKey2(index);
    };
    ItemContainerGenerator.Instance.ContainerFromItem = function (item) {
        if (item == null)
            return;

        return this.ContainerItemMap.GetKeyFromValue(item);
    };

    ItemContainerGenerator.Instance.CheckOffsetAndRealized = function (positionIndex, positionOffset, count) {
        if (positionOffset != 0) {
            throw new ArgumentException("position.Offset must be zero as the position must refer to a realized element");
        }

        var index = this.IndexFromGeneratorPosition(positionIndex, positionOffset);
        var rangeIndex = this.RealizedElements.FindRangeIndexForValue(index);
        var range = this.RealizedElements.Ranges[rangeIndex];
        if (index < range.Start || (index + count) > range.Start + range.Count) {
            throw new InvalidOperationException("Only items which have been Realized can be removed");
        }
    };

    ItemContainerGenerator.Instance.GenerateNext = function (isNewlyRealized) {
        if (!this._GenerationState) {
            throw new InvalidOperationException("Cannot call GenerateNext before calling StartAt");
        }

        var index;
        var startAt = this._GenerationState._positionIndex;
        var startOffset = this._GenerationState._positionOffset;
        if (startAt == -1) {
            if (startOffset < 0)
                index = this.Owner.Items.GetCount() + startOffset;
            else if (startOffset == 0)
                index = 0;
            else
                index = startOffset - 1;
        } else if (startAt >= 0 && startAt < this.RealizedElements.Count) {
            index = this.RealizedElements.GetValueAt(startAt) + startOffset;
        } else {
            index = -1;
        }

        var alreadyRealized = this.RealizedElements.Contains(index);
        if (!this._GenerationState._allowStartAtRealizedItem && alreadyRealized && startOffset == 0) {
            index = index + this._GenerationState._step;
            alreadyRealized = this.RealizedElements.Contains(index);
        }

        if (index < 0 || index >= this.Owner.Items.GetCount()) {
            isNewlyRealized.Value = false;
            return null;
        }

        if (alreadyRealized) {
            this._GenerationState._positionIndex = this.RealizedElements.IndexOf(index);
            this._GenerationState._positionOffset = this._GenerationState._step;
            isNewlyRealized.Value = false;
            return this.ContainerIndexMap.GetValueFromKey2(index);
        }

        var container;
        var item = this.Owner.Items.GetValueAt(index);
        if (this.Owner.IsItemItsOwnContainer(item)) {
            container = Nullstone.As(item, Fayde.DependencyObject);
            isNewlyRealized.Value = true;
        }
        else {
            if (this.Cache.length == 0) {
                container = this.Owner.GetContainerForItem();
                isNewlyRealized.Value = true;
            }
            else {
                container = this.Cache.pop();
                isNewlyRealized.Value = false;
            }

            var c = Nullstone.As(container, namespace.ContentControl);
            if (c) {
                c.ContentSetsParent = false;
            }
        }

        var f = Nullstone.As(container, Fayde.FrameworkElement);
        if (f && !(item instanceof Fayde.UIElement)) {
            f.DataContext = item;
        }

        this.RealizedElements.Add(index);
        this.ContainerIndexMap.Add(container, index);
        this.ContainerItemMap.Add(container, item);

        this._GenerationState._positionIndex = this.RealizedElements.IndexOf(index);
        this._GenerationState._positionOffset = this._GenerationState._step;
        return container;
    };

    ItemContainerGenerator.Instance.GeneratorPositionFromIndex = function (itemIndex) {
        var realizedCount = this.RealizedElements.Count;

        if (itemIndex < 0) {
            return { index: -1, offset: 0 };
        }
        else if (this.RealizedElements.Contains(itemIndex)) {
            return { index: this.RealizedElements.IndexOf(itemIndex), offset: 0 };
        }
        else if (itemIndex > this.Owner.Items.GetCount()) {
            return { index: -1, offset: 0 };
        }

        if (realizedCount == 0) {
            return { index: -1, offset: itemIndex + 1 };
        }

        var index = -1;
        for (var i = 0; i < realizedCount; i++) {
            if (this.RealizedElements.GetValueAt(i) > itemIndex) {
                break;
            }
            index = i;
        }
        if (index == -1) {
            return { index: index, offset: itemIndex + 1 };
        }
        else {
            return { index: index, offset: itemIndex - this.RealizedElements.GetValueAt(index) };
        }
    };

    ItemContainerGenerator.Instance.GetItemContainerGeneratorForPanel = function (panel) {
        if (Nullstone.RefEquals(panel, this.Panel)) {
            return this;
        }
        else {
            return null;
        }
    };

    ItemContainerGenerator.Instance.IndexFromContainer = function (container) {
        var rv = this.ContainerIndexMap.MapFromKey1(container);
        if (rv == null)
            return -1;
        return rv;
    };
    ItemContainerGenerator.Instance.IndexFromGeneratorPosition = function (positionIndex, positionOffset) {
        if (positionIndex == -1) {
            if (positionOffset < 0) {
                return this.Owner.Items.GetCount() + positionOffset;
            }
            else {
                return positionOffset - 1;
            }
        }
        else {
            if (positionIndex > this.Owner.Items.GetCount()) {
                return -1;
            }
            if (positionIndex >= 0 && positionIndex < this.RealizedElements.Count) {
                return this.RealizedElements.GetValueAt(positionIndex) + positionOffset;
            }
            return positionIndex + positionOffset;
        }
    };

    ItemContainerGenerator.Instance.ItemFromContainer = function (container) {
        var data = {};
        if (this.ContainerItemMap.TryGetValue(container, data))
            return data.Value;
        return new Fayde.UnsetValue();
    };

    ItemContainerGenerator.Instance.OnOwnerItemsItemsChanged = function (sender, e) {
        var itemCount;
        var itemUICount;
        var oldPosition = { index: -1, offset: 0 };
        var position;

        switch (e.Action) {
            case Fayde.Collections.NotifyCollectionChangedAction.Add:
                if ((e.NewStartingIndex + 1) != this.Owner.Items.GetCount()) {
                    this.MoveExistingItems(e.NewStartingIndex, 1);
                }
                itemCount = 1;
                itemUICount = 0;
                position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                position.offset = 1;
                break;
            case Fayde.Collections.NotifyCollectionChangedAction.Remove:
                itemCount = 1;
                if (this.RealizedElements.Contains(e.OldStartingIndex)) {
                    itemUICount = 1;
                }
                else {
                    itemUICount = 0;
                }
                position = this.GeneratorPositionFromIndex(e.OldStartingIndex);
                if (itemUICount == 1) {
                    this.Remove(position.index, position.offset, 1);
                }
                this.MoveExistingItems(e.OldStartingIndex, -1);
                break;
            case Fayde.Collections.NotifyCollectionChangedAction.Replace:
                if (!this.RealizedElements.Contains(e.NewStartingIndex)) {
                    return;
                }
                itemCount = 1;
                itemUICount = 1;
                position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                this.Remove(position.index, position.offset, 1);

                var newPos = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                this.StartAt(newPos.index, newPos.offset, 0, true);
                this.PrepareItemContainer(this.GenerateNext({}));
                break;
            case Fayde.Collections.NotifyCollectionChangedAction.Reset:
                var itemCount;
                if (!e.OldItems) {
                    itemCount = 0;
                }
                else {
                    itemCount = e.OldItems.GetCount();
                }
                itemUICount = this.RealizedElements.Count;
                position = { index: -1, offset: 0 };
                this.RemoveAll();
                break;
            default:
                Console.WriteLine("*** Critical error in ItemContainerGenerator.OnOwnerItemsItemsChanged. NotifyCollectionChangedAction.{0} is not supported", e.Action);
                break;
        }

        var args = new namespace.Primitives.ItemsChangedEventArgs(e.Action, itemCount, itemUICount, oldPosition, position);
        this.ItemsChanged.Raise(this, args);
    };

    ItemContainerGenerator.Instance.PrepareItemContainer = function (container) {
        var index = this.ContainerIndexMap.GetValueFromKey1(container);
        var item = this.Owner.Items.GetValueAt(index);

        this.Owner.PrepareContainerForItem(container, item);
    };

    ItemContainerGenerator.Instance.Remove = function (positionIndex, positionOffset, count) {
        this.CheckOffsetAndRealized(positionIndex, positionOffset, count);

        var index = this.IndexFromGeneratorPosition(positionIndex, positionOffset);
        for (var i = 0; i < count; i++) {
            var container = this.ContainerIndexMap.GetValueFromKey2(index + i);
            var oitem = { Value: null };
            this.ContainerItemMap.TryGetValue(container, oitem);
            var item = oitem.Value;
            this.ContainerIndexMap.Remove(container, index + i);
            this.ContainerItemMap.Remove(container);
            this.RealizedElements.Remove(index + i);
            this.Owner.ClearContainerForItem(container, item);
        }
    };

    ItemContainerGenerator.Instance.MoveExistingItems = function (index, offset) {
        var newRanges = new RangeCollection();
        var list = [];
        for (var i = 0; i < this.RealizedElements.Count; i++) {
            list.push(this.RealizedElements.GetValueAt(i));
        }

        if (offset > 0) {
            list = list.reverse();
        }

        for (var i = 0; i < list.length; i++) {
            var oldIndex = i;
            if (oldIndex < index) {
                newRanges.Add(oldIndex);
            }
            else {
                newRanges.Add(oldIndex + offset);
                var container = this.ContainerIndexMap.GetValueAt(oldIndex);
                this.ContainerIndexMap.Remove(container, oldIndex);
                this.ContainerIndexMap.Add(container, oldIndex + offset);
            }
        }

        this.RealizedElements = newRanges;
    };

    ItemContainerGenerator.Instance.RemoveAll = function () {
        for (var key in this.ContainerItemMap._ht) {
            this.Owner.ClearContainerForItem(key, this.ContainerItemMap._ht[key]);
        }

        this.RealizedElements.Clear();
        this.ContainerIndexMap.Clear();
        this.ContainerItemMap.Clear();
    };

    ItemContainerGenerator.Instance.StartAt = function (positionIndex, positionOffset, direction, allowStartAtRealizedItem) {
        if (this._GenerationState) {
            throw new InvalidOperationException("Cannot call StartAt while a generation operation is in progress");
        }

        this._GenerationState = new GenerationState(allowStartAtRealizedItem, direction, positionIndex, positionOffset);
        return this._GenerationState;
    };

    ItemContainerGenerator.Instance.Recycle = function (positionIndex, positionOffset, count) {
        this.CheckOffsetAndRealized(positionIndex, positionOffset, count);

        var index = this.IndexFromGeneratorPosition(positionIndex, positionOffset);
        for (var i = 0; i < count; i++) {
            this.Cache.push(this.ContainerIndexMap.GetValueFromKey2(index + i));
        }
        this.Remove(positionIndex, positionOffset, count);
    };

    ItemContainerGenerator.Instance.StopGeneration = function () {
        delete this._GenerationState;
    };

    namespace.ItemContainerGenerator = Nullstone.FinishCreate(ItemContainerGenerator);

    //#endregion
})(Nullstone.Namespace("Fayde.Controls"));