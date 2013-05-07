/// CODE
/// <reference path="../Core/UIElement.ts" />
/// <reference path="ItemsControl.ts" />
/// <reference path="ContainerMap.ts" />
/// <reference path="Primitives/ItemsChangedEventArgs.ts" />
/// <reference path="../Collections/NotifyCollectionChangedEventArgs.ts" />

module Fayde.Controls {
    export interface IGeneratorPosition {
        index: number;
        offset: number;
    }
    export interface IGenerationState {
        AllowStartAtRealizedItem: bool;
        PositionIndex: number;
        PositionOffset: number;
        Step: number;
    }

    export interface IRange {
        Start: number;
        End: number;
    }
    function range_count(r: IRange) {
        return r.End - r.Start + 1;
    }
    export class RangeCollection {
        private _Ranges: IRange[] = [];
        private _IndexCount: number = 0;
        private _Gen: number = 0;
        get Count(): number { return this._IndexCount; }

        ToExpandedArray(): number[] {
            var arr = [];
            var count = this._IndexCount;
            for (var i = 0; i < count; i++) {
                arr.push(this.GetValueAt(i));
            }
            return arr;
        }

        FindRangeIndexForValue(value: number): number {
            var min = 0;
            var max = this._Ranges.length - 1;
            while (min <= max) {
                var mid = Math.floor(min + ((max - min) / 2));
                var range = this._Ranges[mid];
                if (value >= range.Start && value <= range.End)
                    return mid;

                if (value < range.Start)
                    max = mid - 1;
                else
                    min = mid + 1;
            }
            return ~min;
        }
        FindInsertionPosition(range: IRange): number {
            var min = 0;
            var max = this._Ranges.length - 1;
            while (min <= max) {
                var mid = Math.floor(min + ((max - min) / 2));
                var midRange = this._Ranges[mid];
                if (midRange.End === range.End)
                    return mid;

                if (midRange.End > range.End) {
                    if (mid > 0 && (this._Ranges[mid - 1].End < range.End))
                        return mid;
                    max = mid - 1;
                } else {
                    min = mid + 1;
                }
            }
            return min;
        }

        IndexOf(value: number): number {
            var offset = 0;
            var rs = this._Ranges;
            var len = rs.length;
            for (var i = 0; i < len; i++) {
                var range = rs[i];
                if (value >= range.Start && value <= range.End)
                    return offset + (value - range.Start);

                offset = offset + (range.End - range.Start + 1);
            }
            return -1;
        }
        Contains(value: number) { return this.FindRangeIndexForValue(value) >= 0; }

        Get(index: number): IRange { return this._Ranges[index]; }
        GetValueAt(index: number): number {
            var i;
            var cuml_count;
            var rs = this._Ranges;
            var len = rs.length;
            var r: IRange;
            for (i = 0, cuml_count = 0; i < len && index >= 0; i++) {
                r = rs[i];
                cuml_count = cuml_count + range_count(r);
                if (index < cuml_count)
                    return r.End - (cuml_count - index) + 1;
            }

            throw new IndexOutOfRangeException(index);
        }

        Add(value: number): bool {
            if (!this.Contains(value)) {
                this._Gen++;
                this.InsertRange({ Start: value, End: value });
                this._IndexCount++;
                return true;
            }
            return false;
        }
        Insert(position: number, range: IRange) {
            this._Ranges.splice(position, 0, range);
        }
        InsertRange(range: IRange) {
            var position = this.FindInsertionPosition(range);
            var merged_left = this.MergeLeft(range, position);
            var merged_right = this.MergeRight(range, position);

            if (!merged_left && !merged_right) {
                this.Insert(position, range);
            } else if (merged_left && merged_right) {
                this._Ranges[position - 1].End = this._Ranges[position].End;
                this.RemoveAt(position);
            }
        }
        Remove(value: number): bool {
            this._Gen++;
            return this.RemoveIndexFromRange(value);
        }
        RemoveAt(index: number) {
            this._Ranges.splice(index, 1);
        }
        RemoveIndexFromRange(index: number): bool {
            var rindex = this.FindRangeIndexForValue(index);
            if (rindex < 0)
                return false;

            var range = this._Ranges[rindex];
            if (range.Start === index && range.End === index) {
                this.RemoveAt(rindex);
            } else if (range.Start === index) {
                range.Start++;
            } else if (range.End === index) {
                range.End--;
            } else {
                var split_range = { Start: index + 1, End: range.End };
                range.End = index - 1;
                this.Insert(rindex + 1, split_range);
            }

            this._IndexCount--;
            return true;
        }
        Clear() {
            this._Ranges = [];
            this._Gen++;
            this._IndexCount = 0;
        }

        MergeLeft(range: IRange, position: number): bool {
            var left = position - 1;
            var rs = this._Ranges;
            if (left >= 0 && rs[left].End + 1 == range.Start) {
                rs[left].End = range.Start;
                return true;
            }
            return false;
        }
        MergeRight(range: IRange, position: number): bool {
            var rs = this._Ranges;
            if ((position < rs.length) && (rs[position].Start - 1 === range.End)) {
                rs[position].Start = range.End;
                return true;
            }
            return false;
        }
    }

    export class ItemContainerGenerator {
        private _GenerationState: IGenerationState;
        private RealizedElements: RangeCollection = new RangeCollection();
        private Cache: DependencyObject[] = [];

        private ContainerMap: ContainerMap;

        ItemsChanged: MulticastEvent = new MulticastEvent();

        get Panel(): Panel { return this.Owner.Panel; }

        constructor(public Owner: ItemsControl) {
            this.ContainerMap = new ContainerMap(this);
        }

        GetItemContainerGeneratorForPanel(panel) {
            if (this.Panel === panel)
                return this;
            return null;
        }

        CheckOffsetAndRealized(position: IGeneratorPosition, count: number) {
            if (position.offset !== 0) {
                throw new ArgumentException("position.Offset must be zero as the position must refer to a realized element");
            }

            var index = this.IndexFromGeneratorPosition(position);
            var realized = this.RealizedElements;
            var rangeIndex = realized.FindRangeIndexForValue(index);
            var range = realized.Get(rangeIndex);
            if (index < range.Start || (index + count) > range.Start + range_count(range)) {
                throw new InvalidOperationException("Only items which have been Realized can be removed");
            }
        }
        GeneratorPositionFromIndex(index: number): IGeneratorPosition {
            var realized = this.RealizedElements;
            var realizedCount = realized.Count;

            if (index < 0)
                return { index: -1, offset: 0 };
            else if (realized.Contains(index))
                return { index: realized.IndexOf(index), offset: 0 };
            else if (index > this.Owner.Items.Count)
                return { index: -1, offset: 0 };

            if (realizedCount === 0)
                return { index: -1, offset: index + 1 };

            var index = -1;
            for (var i = 0; i < realizedCount; i++) {
                if (realized.GetValueAt(i) > index)
                    break;
                index = i;
            }
            if (index === -1)
                return { index: index, offset: index + 1 };
            return { index: index, offset: index - realized.GetValueAt(index) };
        }
        IndexFromGeneratorPosition(position: IGeneratorPosition): number {
            var index = position.index;
            var offset = position.offset;
            if (index === -1) {
                if (offset < 0)
                    return this.Owner.Items.Count + offset;
                return offset - 1;
            }
            if (index > this.Owner.Items.Count)
                return -1;
            var realized = this.RealizedElements;
            if (index >= 0 && index < realized.Count)
                return realized.GetValueAt(index) + offset;
            return index + offset;
        }

        IndexFromContainer(container: DependencyObject): number { return this.ContainerMap.IndexFromContainer(container); }
        ContainerFromIndex(index: number): DependencyObject { return this.ContainerMap.ContainerFromIndex(index); }
        ItemFromContainer(container: DependencyObject): any { return this.ContainerMap.ItemFromContainer(container); }
        ContainerFromItem(item: any): DependencyObject { return this.ContainerMap.ContainerFromItem(item); }

        StartAt(position: IGeneratorPosition, direction: number, allowStartAtRealizedItem: bool): IGenerationState {
            if (this._GenerationState)
                throw new InvalidOperationException("Cannot call StartAt while a generation operation is in progress");

            this._GenerationState = {
                AllowStartAtRealizedItem: allowStartAtRealizedItem,
                PositionIndex: position.index,
                PositionOffset: position.offset,
                Step: direction
            };
            return this._GenerationState;
        }
        GenerateNext(isNewlyRealized: IOutValue): DependencyObject {
            if (!this._GenerationState) {
                throw new InvalidOperationException("Cannot call GenerateNext before calling StartAt");
            }

            var realized = this.RealizedElements;

            var state = this._GenerationState;
            var index: number;
            var startAt = state.PositionIndex;;
            var startOffset = state.PositionOffset;
            if (startAt === -1) {
                if (startOffset < 0)
                    index = this.Owner.Items.Count + startOffset;
                else if (startOffset == 0)
                    index = 0;
                else
                    index = startOffset - 1;
            } else if (startAt >= 0 && startAt < realized.Count) {
                index = realized.GetValueAt(startAt) + startOffset;
            } else {
                index = -1;
            }

            var alreadyRealized = realized.Contains(index);
            if (!state.AllowStartAtRealizedItem && alreadyRealized && startOffset === 0) {
                index = index + state.Step;
                alreadyRealized = realized.Contains(index);
            }

            if (index < 0 || index >= this.Owner.Items.Count) {
                isNewlyRealized.Value = false;
                return null;
            }

            if (alreadyRealized) {
                state.PositionIndex = realized.IndexOf(index);
                state.PositionOffset = state.Step;
                isNewlyRealized.Value = false;
                return this.ContainerMap.ContainerFromIndex(index);
            }

            var container: DependencyObject;
            var item = this.Owner.Items.GetValueAt(index);
            if (this.Owner.IsItemItsOwnContainer(item)) {
                if (item instanceof DependencyObject)
                    container = <DependencyObject>item;
                isNewlyRealized.Value = true;
            } else {
                if (this.Cache.length === 0) {
                    container = this.Owner.GetContainerForItem();
                    isNewlyRealized.Value = true;
                } else {
                    container = this.Cache.pop();
                    isNewlyRealized.Value = false;
                }

                if (container instanceof ContentControl)
                    (<ContentControl>container)._ContentSetsParent = false;
            }

            if (container instanceof FrameworkElement && !(item instanceof UIElement))
                (<FrameworkElement>container).DataContext = item;

            realized.Add(index);
            this.ContainerMap.Add(container, item, index);

            state.PositionIndex = realized.IndexOf(index);
            state.PositionOffset = state.Step;
            return container;
        }
        StopGeneration() { this._GenerationState = undefined; }

        PrepareItemContainer(container: DependencyObject) {
            var item = this.ContainerMap.ItemFromContainer(container);
            this.Owner.PrepareContainerForItem(container, item);
        }

        MoveExistingItems(index: number, offset: number) {
            var list = this.RealizedElements.ToExpandedArray();
            if (offset > 0)
                list = list.reverse();

            var newRanges = new RangeCollection();
            var map = this.ContainerMap;
            for (var i = 0; i < list.length; i++) {
                var oldIndex = i;
                if (oldIndex < index) {
                    newRanges.Add(oldIndex);
                } else {
                    newRanges.Add(oldIndex + offset);
                    map.Move(oldIndex, offset);
                }
            }

            this.RealizedElements = newRanges;
        }

        Recycle(position: IGeneratorPosition, count: number) {
            this.CheckOffsetAndRealized(position, count);

            var index = this.IndexFromGeneratorPosition(position);
            var realized = this.RealizedElements;
            var cache = this.Cache;
            var map = this.ContainerMap;
            var end = index + count;
            for (var i = index; i < end; i++) {
                realized.Remove(i);
                cache.push(map.RemoveIndex(i));
            }
        }
        Remove(position: IGeneratorPosition, count: number) {
            this.CheckOffsetAndRealized(position, count);

            var index = this.IndexFromGeneratorPosition(position);
            var realized = this.RealizedElements;
            var map = this.ContainerMap;
            var end = index + count;
            for (var i = index; i < end; i++) {
                realized.Remove(i);
                map.RemoveIndex(i);
            }
        }
        RemoveAll() {
            this.ContainerMap.Clear();
            this.RealizedElements.Clear();
        }

        OnOwnerItemsItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) {
            var itemCount: number;
            var itemUICount: number;
            var oldPosition: IGeneratorPosition = { index: -1, offset: 0 };
            var position: IGeneratorPosition;

            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    if ((e.NewStartingIndex + 1) !== this.Owner.Items.Count)
                        this.MoveExistingItems(e.NewStartingIndex, 1);
                    itemCount = 1;
                    itemUICount = 0;
                    position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                    position.offset = 1;
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    itemCount = 1;
                    if (this.RealizedElements.Contains(e.OldStartingIndex))
                        itemUICount = 1;
                    else
                        itemUICount = 0;
                    position = this.GeneratorPositionFromIndex(e.OldStartingIndex);
                    if (itemUICount === 1)
                        this.Remove(position, 1);
                    this.MoveExistingItems(e.OldStartingIndex, -1);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    if (!this.RealizedElements.Contains(e.NewStartingIndex))
                        return;
                    itemCount = 1;
                    itemUICount = 1;
                    position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                    this.Remove(position, 1);

                    var newPos = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                    this.StartAt(newPos, 0, true);
                    this.PrepareItemContainer(this.GenerateNext({ Value: null }));
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    var itemCount;
                    if (!e.OldItems)
                        itemCount = 0;
                    else
                        itemCount = e.OldItems.length;
                    itemUICount = this.RealizedElements.Count;
                    position = { index: -1, offset: 0 };
                    this.RemoveAll();
                    break;
                default:
                    //Console.WriteLine("*** Critical error in ItemContainerGenerator.OnOwnerItemsItemsChanged. NotifyCollectionChangedAction.{0} is not supported", e.Action);
                    break;
            }

            this.ItemsChanged.Raise(this, new Primitives.ItemsChangedEventArgs(e.Action, itemCount, itemUICount, oldPosition, position));
        }
    }
}