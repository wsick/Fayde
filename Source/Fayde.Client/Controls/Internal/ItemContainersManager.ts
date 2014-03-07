module Fayde.Controls.Internal {
    import NotifyCollectionChangedEventArgs = Collections.NotifyCollectionChangedEventArgs;
    import NotifyCollectionChangedAction = Collections.NotifyCollectionChangedAction;
    import INotifyCollectionChanged_ = Collections.INotifyCollectionChanged_;

    export interface IItemContainersOwner {
        PrepareContainerForItem(container: DependencyObject, item: any);
        ClearContainerForItem(container: DependencyObject, item: any);
        GetContainerForItem(): DependencyObject;
        IsItemItsOwnContainer(item: any): boolean;
    }
    export interface IItemContainersManager {
        Items: ItemCollection;
        ItemsSource: IEnumerable<any>;
        IndexFromContainer(container: DependencyObject): number;
        ContainerFromIndex(index: number): DependencyObject;
        ItemFromContainer(container: DependencyObject): any;
        ContainerFromItem(item: any): DependencyObject;
        CreateGenerator(index: number, count: number): IContainerGenerator;
        CreateRemover(index: number, count: number): IContainerRemover;
        GetEnumerator(index?: number, count?: number): IContainerEnumerator;
        ItemsChanged: MulticastEvent<NotifyCollectionChangedEventArgs>;
    }
    export class ItemContainersManager implements IItemContainersManager {
        private _IsDataBound = false;
        private _IsInItemsSourceChanged = false;
        private _RealizedCount = 0;
        private _Containers: DependencyObject[] = [];
        private _Cache: DependencyObject[] = [];

        private _Items: ItemCollection = null;
        get Items(): ItemCollection { return this._Items; }
        set Items(value: ItemCollection) {
            if (this._Items) {
                this._Items.ItemsChanged.Unsubscribe(this.OnItemsChanged, this);
                this.Reset(this._Items.ToArray(), false);
            }

            this._Items = value;
            if (value) {
                value.ItemsChanged.Subscribe(this.OnItemsChanged, this);
                this.Add(value.ToArray(), 0, false);
            }
        }

        private _ItemsSource: IEnumerable<any> = null;
        get ItemsSource(): IEnumerable<any> { return this._ItemsSource; }
        set ItemsSource(value: IEnumerable<any>) {
            var nc = INotifyCollectionChanged_.As(this._ItemsSource);
            if (nc)
                nc.CollectionChanged.Unsubscribe(this.OnItemsSourceChanged, this);

            if (this._Items)
                this.Reset(this._Items.ToArray(), true);

            this._ItemsSource = value;
            this._IsDataBound = !!this._ItemsSource;
            var nc = INotifyCollectionChanged_.As(this._ItemsSource);
            if (nc)
                nc.CollectionChanged.Subscribe(this.OnItemsSourceChanged, this);

            if (value)
                this.Add(Enumerable.ToArray(value), 0, true);
        }

        ItemsChanged = new MulticastEvent<NotifyCollectionChangedEventArgs>();

        constructor(public Owner: IItemContainersOwner) { }

        IndexFromContainer(container: DependencyObject): number { return this._Containers.indexOf(container); }
        ContainerFromIndex(index: number): DependencyObject { return this._Containers[index]; }
        ItemFromContainer(container: DependencyObject): any {
            var index = this._Containers.indexOf(container);
            if (index < 0)
                return null;
            return this._Items.GetValueAt(index);
        }
        ContainerFromItem(item: any): DependencyObject {
            if (item == null)
                return null;
            var index = this._Items.IndexOf(item);
            if (index < 0)
                return null;
            return this._Containers[index];
        }

        CreateGenerator(index: number, count: number): IContainerGenerator {
            var generator: IContainerGenerator = {
                IsCurrentNew: false,
                Current: undefined,
                CurrentItem: undefined,
                CurrentIndex: index - 1,
                GenerateIndex: -1,
                Generate: function (): boolean { return false; }
            };

            var ic = this.Owner;
            var icm = this;
            var containers = this._Containers;
            var items = this._Items;
            var cache = this._Cache;
            generator.Generate = function (): boolean {
                generator.GenerateIndex++;
                generator.CurrentIndex++;
                generator.IsCurrentNew = false;
                if (generator.CurrentIndex < 0 || generator.GenerateIndex >= count || generator.CurrentIndex >= containers.length) {
                    generator.Current = undefined;
                    generator.CurrentItem = undefined;
                    return false;
                }
                generator.CurrentItem = items.GetValueAt(generator.CurrentIndex);
                if ((generator.Current = containers[generator.CurrentIndex]) == null) {
                    if (ic.IsItemItsOwnContainer(generator.CurrentItem)) {
                        if (generator.CurrentItem instanceof DependencyObject)
                            generator.Current = <DependencyObject>generator.CurrentItem;
                        generator.IsCurrentNew = true;
                    } else if (cache.length > 0) {
                        generator.Current = cache.pop();
                    } else {
                        generator.Current = ic.GetContainerForItem();
                        generator.IsCurrentNew = true;
                    }
                    containers[generator.CurrentIndex] = generator.Current;
                }

                if (generator.IsCurrentNew)
                    icm._RealizedCount++;

                return true;
            };

            return generator;
        }
        CreateRemover(keepStart?: number, keepCount?: number): IContainerRemover {
            if (keepStart == null) keepStart = 0;
            if (keepCount == null) keepCount = 0;

            var carr = this._Containers;
            var iarr = this._Items.ToArray();
            var end1 = keepStart - 1;
            var in2 = false;
            var start2 = keepStart + keepCount;
            var end2 = carr.length - 1;

            var index = -1;

            var remover = { MoveNext: undefined, Current: undefined, CurrentItem: undefined, CurrentIndex: -1, Remove: undefined };
            remover.MoveNext = function (): boolean {
                index++;
                if (!in2 && index > end1) {
                    index = start2;
                    in2 = true;
                }
                remover.CurrentIndex = index;
                if (index > end2) {
                    remover.Current = undefined;
                    remover.CurrentItem = undefined;
                    return false;
                }
                remover.Current = carr[index];
                remover.CurrentItem = iarr[index];
                return true;
            };

            var ic = this.Owner;
            var icm = this;
            remover.Remove = function (recycle: boolean) {
                if (!remover.Current)
                    return;
                if (recycle)
                    icm._Cache.push(remover.Current);
                ic.ClearContainerForItem(remover.Current, remover.CurrentItem);
                carr[index] = null;
                icm._RealizedCount--;
            };
            return remover;
        }
        GetEnumerator(start?: number, count?: number): IContainerEnumerator {
            var carr = this._Containers.slice(0);
            var iarr = this._Items.ToArray();

            var index = (start || 0) - 1;
            var len = count == null ? carr.length : count;

            var i = 0;
            var e = { MoveNext: undefined, Current: undefined, CurrentItem: undefined, CurrentIndex: -1 };
            e.MoveNext = function () {
                i++;
                index++;
                e.CurrentIndex = index;
                if (i > len || index >= carr.length) {
                    e.Current = undefined;
                    e.CurrentItem = undefined;
                    return false;
                }
                e.Current = carr[index];
                e.CurrentItem = iarr[index];
                return true;
            };
            return e;
        }
        
        private OnItemsChanged(sender: any, e: NotifyCollectionChangedEventArgs) {
            if (this._IsInItemsSourceChanged) //Ignore OnItemsSourceChanged operations
                return;
            if (this._IsDataBound)
                throw new InvalidOperationException("Cannot modify Items while bound to ItemsSource.");

            switch (e.Action) {
                case NotifyCollectionChangedAction.Add:
                    this.Add(e.NewItems, e.NewStartingIndex, false);
                    break;
                case NotifyCollectionChangedAction.Remove:
                    this.Remove(e.OldItems, e.OldStartingIndex, false);
                    break;
                case NotifyCollectionChangedAction.Replace:
                    this.Replace(e.NewStartingIndex, e.OldItems[0], e.NewItems[0], false);
                    break;
                case NotifyCollectionChangedAction.Reset:
                    this.Reset(e.OldItems, false);
                    break;
            }
            this.ItemsChanged.Raise(this, e);
        }
        private OnItemsSourceChanged(sender: any, e: NotifyCollectionChangedEventArgs) {
            switch (e.Action) {
                case NotifyCollectionChangedAction.Add:
                    this.Add(e.NewItems, e.NewStartingIndex, true);
                    break;
                case NotifyCollectionChangedAction.Remove:
                    this.Remove(e.OldItems, e.OldStartingIndex, true);
                    break;
                case NotifyCollectionChangedAction.Replace:
                    this.Replace(e.NewStartingIndex, e.OldItems[0], e.NewItems[0], true);
                    break;
                case NotifyCollectionChangedAction.Reset:
                    this.Reset(e.OldItems, true);
                    break;
            }
            this.ItemsChanged.Raise(this, e);
        }

        private Add(newItems: any[], index: number, addItems: boolean) {
            var count = newItems.length;
            this.InsertNullContainers(index, count);
            if (!addItems)
                return;
            try {
                this._IsInItemsSourceChanged = true;
                if (index >= this._Items.Count) {
                    this._Items.AddRange(newItems);
                } else {
                    for (var i = 0; i < count; i++) {
                        this._Items.Insert(index + i, addItems[i]);
                    }
                }
            } finally {
                this._IsInItemsSourceChanged = false;
            }
        }
        private Remove(oldItems: any[], index: number, removeItems: boolean) {
            var count = oldItems.length;
            this.Cleanup(oldItems, this._Containers.splice(index, count));
            if (!removeItems)
                return;
            try {
                this._IsInItemsSourceChanged = true;
                if (this._Items.Count === count) {
                    this._Items.Clear();
                } else {
                    for (var i = 0; i < count; i++) {
                        this._Items.RemoveAt(index);
                    }
                }
            } finally {
                this._IsInItemsSourceChanged = false;
            }
        }
        private Replace(index: number, oldItem: any, newItem: any, replaceItem: boolean) {
            var existing = this._Containers[index];
            if (existing) {
                this.Owner.ClearContainerForItem(existing, oldItem);
                this._Items[index] = newItem;
                this.Owner.PrepareContainerForItem(existing, newItem);
            }
            if (!replaceItem)
                return;
            this._Items.SetValueAt(index, newItem);
        }
        private Reset(oldItems: any[], resetItems: boolean) {
            this.Cleanup(oldItems, this._Containers.splice(0, this._Containers.length));
            if (!resetItems)
                return;
            try {
                this._IsInItemsSourceChanged = true;
                this._Items.Clear();
            } finally {
                this._IsInItemsSourceChanged = false;
            }
        }

        private InsertNullContainers(index: number, count: number) {
            for (var i = 0; i < count; i++) {
                this._Containers.splice(index, 0, null);
            }
        }
        private Cleanup(items: any[], containers: DependencyObject[]) {
            var ic = this.Owner;
            for (var i = 0, len = containers.length; i < len; i++) {
                var container = containers[i];
                if (!container)
                    continue;
                ic.ClearContainerForItem(container, items[i]);
                this._RealizedCount--;
            }
        }
    }

    export interface IContainerGenerator {
        IsCurrentNew: boolean;
        Current: DependencyObject;
        CurrentItem: any;
        CurrentIndex: number;
        GenerateIndex: number;
        Generate(): boolean;
    }
    export interface IContainerEnumerator extends IEnumerator<UIElement> {
        CurrentItem: any;
        CurrentIndex: number;
    }
    export interface IContainerRemover extends IContainerEnumerator {
        Remove(recycle: boolean);
    }
}