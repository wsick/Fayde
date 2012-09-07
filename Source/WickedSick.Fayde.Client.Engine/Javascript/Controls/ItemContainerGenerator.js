/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/DoubleKeyedDictionary.js" />
/// <reference path="Primitives/ItemsChangedEventArgs.js" />
/// CODE

var GenerationState = Nullstone.Create("GenerationState", undefined, 5);

GenerationState.Instance.Init = function (allowStartAtRealizedItem, generatorDirection, positionIndex, positionOffset) {
    this._allowStartAtRealizedItem = allowStartAtRealizedItem;
    this._positionIndex = positionIndex;
    this._positionOffset = positionOffset;
    this._step = generatorDirection === 0 ? 1 : -1;
};

Nullstone.FinishCreate(GenerationState);

//#region ItemContainerGenerator
var ItemContainerGenerator = Nullstone.Create("ItemContainerGenerator", undefined, 1);

ItemContainerGenerator.Instance.Init = function (owner) {
    this.ItemsChanged = new MulticastEvent();

    this.Cache = [];
    this.ContainerIndexMap = new DoubleKeyedDictionary();
    this.ContainerItemMap = new Dictionary();
    this.Owner = owner;
    this.RealizedElements = new RangeCollection();
};

ItemContainerGenerator.Instance.ContainerFromIndex = function (index) {
    var container;
    this.ContainerIndexMap.TryMapFromKey2(index, container);
    return container;
};

ItemContainerGenerator.Instance.ContainerFromItem = function (item) {
    if (!item) {
        return;
    }

    for (var key in this.ContainerItemMap._ht) {
        if (this.ContainerItemMap.GetValueAt(key), item) {
            return key;
        }
    }
    return null;
};

ItemContainerGenerator.Instance.CheckOffsetAndRealized = function (positionIndex, positionOffset, count) {
    if (positionOffset != 0) {
        throw new ArgumentException("position.Offset must be zero as the position must refer to a realized element");
    }

    var index = this.GetIndexFromGeneratorPosition(positionIndex, positionOffset);
    var rangeIndex = this.RealizedElements.FindRangeIndexForValue(index);
    var range = this.RealizedElements.Ranges.GetValueAt(rangeIndex);
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
        if (startOffset < 0) {
            index = this.Owner.Items.GetCount() + startOffset;
        }
        else if (startOffset == 0) {
            index = 0;
        }
        else {
            index = startOffset - 1;
        }
    }
    else if (startAt >= 0 && startAt < this.RealizedElements.Count) {
        index = this.RealizedElements.GetValueAt(startAt) + startOffset;
    }
    else {
        index = -1;
    }

    var alreadyRealized = this.RealizedElements.Contains(index);
    if (!this._GenerationState._allowStartAtRealizedItem && alreadyRealized && startOffset == 0) {
        index = index + this._GenerationState._step;
        alreadyRealized = this.RealizedElements.Contains(index);
    }

    if (index < 0 || index >= this.Owner.Items.GetCount()) {
        isNewlyRealized = false;
        return null;
    }

    if (alreadyRealized) {
        this._GenerationState._positionIndex = this.RealizedElements.IndexOf(index);
        this._GenerationState._positionOffset = this._GenerationState._step;
        isNewlyRealized = false;
        var result;
        this.ContainerIndexMap.TryGetValueFromKey1(index, result);
        return result;
    }

    var container;
    var item = this.Owner.Items.GetValueAt(index);
    if (this.Owner.IsItemItsOwnContainer(item)) {
        container = Nullstone.As(item, DependencyObject);
        isNewlyRealized = true;
    }
    else {
        if (this.Cache.length == 0) {
            container = this.Owner.GetContainerForItem();
            isNewlyRealized = true;
        }
        else {
            container = this.Cache.pop();
            isNewlyRealized = false;
        }

        var c = Nullstone.As(container, ContentControl);
        if (c) {
            c.ContentSetsParent = false;
        }
    }

    var f = Nullstone.As(container, FrameworkElement);
    if (f && !Nullstone.Is(item, UIElement)) {
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
    var index;
    if (!this.ContainerIndexMap.TryMapFromKey1(container, index)) {
        index = -1;
    }
    return index;
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
    var item;
    this.ContainerItemMap.TryGetValueFromKey1(container, item);
    if (item) {
        return item;
    }
    else {
        return DependencyProperty.UnsetValue;
    }
};

ItemContainerGenerator.Instance.OnOwnerItemsItemsChanged = function (sender, e) {
    var itemCount;
    var itemUICount;
    var oldPosition = { index: -1, offset: 0 };
    var position;

    switch (e.Action) {
        case NotifyCollectionChangedAction.Add:
            if ((e.NewStartingIndex + 1) != this.Owner.Items.GetCount()) {
                this.MoveExistingItems(e.NewStartingIndex, 1);
            }
            itemCount = 1;
            itemUICount = 0;
            position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
            position.offset = 1;
            break;
        case NotifyCollectionChangedAction.Remove:
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
        case NotifyCollectionChangedAction.Replace:
            if (!this.RealizedElements.Contains(e.NewStartingIndex)) {
                return;
            }
            itemCount = 1;
            itemUICount = 1;
            position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
            this.Remove(position.index, position.offset, 1);

            var fresh;
            var newPos = this.GeneratorPositionFromIndex(e.NewStartingIndex);
            this.StartAt(newPos.index, newPos.offset, 0, true);
            this.PrepareItemContainer(this.GenerateNext(fresh));
            break;
        case NotifyCollectionChangedAction.Reset:
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
            Console.WriteLine("*** Critical error in ItemContainerGenerator.OnOwnerItemsItemsChanged. NotifyCollectionChangedAction.{0} is not supported", e.GetAction());
            break;
    }

    var args = new ItemsChangedEventArgs(e.Action, itemCount, itemUICount, oldPosition, position);
    this.ItemsChanged.Raise(this, args);
};

ItemContainerGenerator.Instance.PrepareItemContainer = function (container) {
    var index = this.ContainerIndexMap.GetValueFromKey1(container);
    var item = this.Owner.Items.GetValueAt(index);

    this.Owner.PrepareContainerForItem(container, item);
};

ItemContainerGenerator.Instance.Remove = function (positionIndex, positionOffset, count) {
    this.CheckOffsetAndRealized(positionIndex, positionOffset, count);

    var index = this.GetIndexFromGeneratorPosition(positionIndex, positionOffset);
    for (var i = 0; i < count; i++) {
        var container = this.ContainerIndexMap.GetValueAtKey2(index + 1);
        var item;
        this.ContainerItemMap.TryGetValue(container, item);
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
        this.Owner.ClearContainerForItem(key, this.ContainerItemMap.GetValueAt(key));
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

    var index = this.GetIndexFromGeneratorPosition(positionIndex, positionOffset);
    for (var i = 0; i < count; i++) {
        this.Cache.push(this.ContainerIndexMap.GetValueForKey2(index + i));
    }
    this.Remove(positionIndex, positionOffset, count);
};

Nullstone.FinishCreate(ItemContainerGenerator);
//#endregion