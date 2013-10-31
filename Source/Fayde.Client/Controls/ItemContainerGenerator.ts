
module Fayde.Controls {
    export interface IGeneratorPosition {
        Index: number;
        Offset: number;
    }
    export interface IGenerationState {
        AllowStartAtRealizedItem: boolean;
        Position: IGeneratorPosition;
        Step: number;
        Dispose: () => void;
    }
    export interface IItemContainerGenerator {
        GenerateNext(isNewlyRealized: IOutValue): DependencyObject;
        GetItemContainerGeneratorForPanel(panel: Panel): IItemContainerGenerator;
        PrepareItemContainer(container: DependencyObject);
        Remove(position: IGeneratorPosition, count: number);
        RemoveAll();
        StartAt(position: IGeneratorPosition, forward: boolean, allowStartAtRealizedItem: boolean): IGenerationState;
    }
    export interface IRecyclingItemContainerGenerator {
        Recycle(position: IGeneratorPosition, count: number);
    }

    export class ItemContainerGenerator implements IItemContainerGenerator, IRecyclingItemContainerGenerator {
        private _GenerationState: IGenerationState;

        private _Cache: DependencyObject[] = [];
        private _Containers: DependencyObject[] = [];
        private _RealizedCount: number = 0;
        private _Items: any[] = [];

        ItemsChanged: MulticastEvent<Primitives.ItemsChangedEventArgs> = new MulticastEvent<Primitives.ItemsChangedEventArgs>();

        constructor(public Owner: ItemsControl) { }

        GenerateNext(isNewlyRealized: IOutValue): DependencyObject {
            if (!this._GenerationState)
                throw new InvalidOperationException("Cannot call GenerateNext before calling StartAt");

            var owner = this.Owner;
            var ownerItems = owner.Items;
            var state = this._GenerationState;
            var pos = state.Position;

            var index = this.IndexFromGeneratorPosition(pos);

            isNewlyRealized.Value = this._Containers[index] == null;
            if (!state.AllowStartAtRealizedItem && !isNewlyRealized.Value && pos.Offset === 0) {
                index += state.Step;
                isNewlyRealized.Value = this._Containers[index] == null;
            }

            if (index < 0 || index >= ownerItems.Count) {
                isNewlyRealized.Value = false;
                return null;
            }

            if (!isNewlyRealized.Value) {
                pos.Index = index;
                pos.Offset = state.Step;
                return this._Containers[index];
            }

            var container: DependencyObject;
            var item = ownerItems.GetValueAt(index);
            if (owner.IsItemItsOwnContainer(item)) {
                if (item instanceof DependencyObject)
                    container = <DependencyObject>item;
                isNewlyRealized.Value = true;
            } else {
                if (this._Cache.length > 0) {
                    container = this._Cache.pop();
                    isNewlyRealized.Value = false;
                } else {
                    container = owner.GetContainerForItem();
                    isNewlyRealized.Value = true;
                }
            }

            if (container instanceof FrameworkElement && !(item instanceof UIElement))
                (<FrameworkElement>container).DataContext = item;

            this._Items[index] = item;
            this._Containers[index] = container;
            if (isNewlyRealized.Value) this._RealizedCount++;

            pos.Index = index;
            pos.Offset = state.Step;
            return container;
        }
        GetItemContainerGeneratorForPanel(panel: Panel): IItemContainerGenerator {
            if (this.Owner.Panel === panel)
                return this;
            return null;
        }
        PrepareItemContainer(container: DependencyObject) {
            var item = this.ItemFromContainer(container);
            this.Owner.PrepareContainerForItem(container, item);
        }
        Recycle(position: IGeneratorPosition, count: number) { this._KillContainers(position, count, false); }
        Remove(position: IGeneratorPosition, count: number) { this._KillContainers(position, count, false); }
        RemoveAll() {
            var container: DependencyObject;
            var item: any;
            var containers = this._Containers;
            var items = this._Items;
            var ic = this.Owner;
            while ((container = containers.shift()) !== undefined && (item = items.shift()) !== undefined) {
                if (container)
                    ic.ClearContainerForItem(container, item);
            }
            this._RealizedCount = 0;
        }
        StartAt(position: IGeneratorPosition, forward: boolean, allowStartAtRealizedItem: boolean): IGenerationState {
            if (this._GenerationState)
                throw new InvalidOperationException("Cannot call StartAt while a generation operation is in progress");

            this._GenerationState = {
                AllowStartAtRealizedItem: allowStartAtRealizedItem,
                Position: { Index: position.Index, Offset: position.Offset },
                Step: forward ? 1 : -1,
                Dispose: () => this._GenerationState = null,
            };
            return this._GenerationState;
        }

        IndexFromContainer(container: DependencyObject): number { return this._Containers.indexOf(container); }
        ContainerFromIndex(index: number): DependencyObject { return this._Containers[index]; }
        ItemFromContainer(container: DependencyObject): any {
            var index = this._Containers.indexOf(container);
            if (index < 0)
                return undefined;
            return this._Items[index];
        }
        ContainerFromItem(item: any): DependencyObject {
            if (item == null)
                return undefined;
            var index = this._Items.indexOf(item);
            if (index < 0)
                return undefined;
            return this._Containers[index];
        }

        GeneratorPositionFromIndex(itemIndex: number): IGeneratorPosition {
            if (itemIndex < 0)
                return { Index: -1, Offset: 0 };
            if (this._RealizedCount === 0)
                return { Index: -1, Offset: itemIndex + 1 };
            if (itemIndex > this.Owner.Items.Count)
                return { Index: -1, Offset: 0 };

            var realizedIndex: number = -1;
            var runningOffset: number = 0;
            var containers = this._Containers;
            var len = containers.length;
            for (var i = 0; i < len && (realizedIndex + runningOffset) < itemIndex; i++) {
                if (containers[i] != null) {
                    realizedIndex++;
                    runningOffset = 0;
                } else {
                    runningOffset++;
                }
            }
            return { Index: realizedIndex, Offset: runningOffset };
        }
        IndexFromGeneratorPosition(position: IGeneratorPosition): number {
            var index = position.Index;
            var offset = position.Offset;
            if (index === -1) {
                if (offset < 0)
                    return this.Owner.Items.Count + offset;
                return offset - 1;
            }
            if (index > this.Owner.Items.Count)
                return -1;

            var realizedIndex = index;
            var containers = this._Containers;
            var len = containers.length;
            var i: number = 0;
            for (; i < len && realizedIndex >= 0; i++) {
                if (containers[i] != null)
                    realizedIndex--;
            }
            return i + offset - 1;
        }

        OnOwnerItemsItemsChanged(e: Collections.NotifyCollectionChangedEventArgs) {
            var itemCount: number;
            var itemUICount: number;
            var oldPosition: IGeneratorPosition = { Index: -1, Offset: 0 };
            var position: IGeneratorPosition;

            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    itemCount = e.NewItems.length;
                    ArrayEx.Fill(this._Containers, e.NewStartingIndex, itemCount, null);
                    ArrayEx.Fill(this._Items, e.NewStartingIndex, itemCount, null);
                    itemUICount = 0;
                    position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                    position.Offset = 1;
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    itemCount = (e.OldItems) ? e.OldItems.length : 1;
                    itemUICount = this._GetNumAlreadyRealizedItems(e.OldItems);
                    position = this.GeneratorPositionFromIndex(e.OldStartingIndex);
                    this.Remove(position, itemUICount);
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    itemCount = 1;
                    itemUICount = 1;
                    position = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                    this.Remove(position, 1);
                    var newPos = this.GeneratorPositionFromIndex(e.NewStartingIndex);
                    var state = this.StartAt(newPos, true, true);
                    try {
                        this.PrepareItemContainer(this.GenerateNext({ Value: null }));
                    } finally {
                        state.Dispose();
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    itemCount = (e.OldItems) ? e.OldItems.length : 0;
                    itemUICount = this._RealizedCount;
                    position = { Index: -1, Offset: 0 };
                    this.RemoveAll();
                    break;
                default:
                    Warn("*** Critical error in ItemContainerGenerator.OnOwnerItemsItemsChanged. NotifyCollectionChangedAction." + e.Action + " is not supported");
                    break;
            }

            var args = new Primitives.ItemsChangedEventArgs(e.Action, itemCount, itemUICount, oldPosition, position);
            this.ItemsChanged.Raise(this, args);
        }
        private _GetNumAlreadyRealizedItems(items: any[]): any {
            var count = 0;
            var len = items.length;
            for (var i = 0; i < len; i++) {
                if (this.ContainerFromItem(items[i]) != null)
                    count++;
            }
            return count;
        }
        private _KillContainers(position: IGeneratorPosition, count: number, recycle: boolean) {
            if (position.Offset !== 0)
                throw new ArgumentException("position.Offset must be zero as the position must refer to a realized element");
            var index = this.IndexFromGeneratorPosition(position);
            //TODO: Should we warn user if we're removing non-realized elements
            var tokillitems = this._Items.splice(index, count);
            var tokillcontainers = this._Containers.splice(index, count);
            if (recycle)
                this._Cache = this._Cache.concat(tokillcontainers);

            var ic = this.Owner;
            var len = tokillcontainers.length;
            var container: DependencyObject;
            for (var i = 0; i < len; i++) {
                container = tokillcontainers[i];
                if (!container)
                    continue;
                ic.ClearContainerForItem(container, tokillitems[i]);
                this._RealizedCount--;
            }
        }
    }
}