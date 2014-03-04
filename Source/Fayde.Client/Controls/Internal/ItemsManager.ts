module Fayde.Controls.Internal {
    export interface ICollection {
        IsReadOnly: boolean;
        Count: number;
        IndexOf(value: any): number;
        Contains(value: any): boolean;
        GetValueAt(index: number): any;
        Add(val: any);
        AddRange(vals: any[]);
        Insert(index:number, val: any);
        RemoveAt(index: number);
        SetValueAt(index: number, val: any);
        Clear();
    }

    export interface IItemsOwner {
        Items: ICollection;
        ItemsSource: IEnumerable<any>;
        OnItemsChanged(e: Collections.NotifyCollectionChangedEventArgs);
    }
    export interface IItemsManager {
        Items: ICollection;
        OnItemsSourceChanged(oldItemsSource: IEnumerable<any>, newItemsSource: IEnumerable<any>);
    }
    export class ItemsManager implements IItemsManager {
        Items: ICollection;

        constructor(public Owner: IItemsOwner) {
            this.Items = this.Owner.Items;
            if ((<any>this.Items).ItemsChanged instanceof MulticastEvent)
                (<any>this.Items).ItemsChanged.Subscribe(this.OnItemsChanged, this);
            if (Collections.INotifyCollectionChanged_.As(this.Items))
                (<Collections.INotifyCollectionChanged><any>this.Items).CollectionChanged.Subscribe(this.OnItemsChanged, this);
        }

        OnItemsChanged(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            this.Owner.OnItemsChanged(e);
        }

        OnItemsSourceChanged(oldItemsSource: IEnumerable<any>, newItemsSource: IEnumerable<any>) {
            var cc = Collections.INotifyCollectionChanged_.As(oldItemsSource);
            if (cc)
                cc.CollectionChanged.Unsubscribe(this._CollectionChanged, this);

            this.Items.IsReadOnly = false;
            this.Items.Clear();
            if (!newItemsSource)
                return;

            var en = IEnumerable_.As(newItemsSource);
            if (en) {
                this.Items.AddRange(Enumerable.ToArray(en));
                this.Items.IsReadOnly = true;
            }

            cc = Collections.INotifyCollectionChanged_.As(newItemsSource);
            if (cc)
                cc.CollectionChanged.Subscribe(this._CollectionChanged, this);
        }
        private _CollectionChanged(sender, e: Collections.NotifyCollectionChangedEventArgs) {
            var coll = <Collections.ObservableCollection<any>>sender;
            var index: number;
            this.Items.IsReadOnly = false;
            switch (e.Action) {
                case Collections.NotifyCollectionChangedAction.Add:
                    var enumerator = ArrayEx.GetEnumerator(e.NewItems);
                    index = e.NewStartingIndex;
                    while (enumerator.MoveNext()) {
                        this.Items.Insert(index, enumerator.Current);
                        index++;
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Remove:
                    var enumerator = ArrayEx.GetEnumerator(e.OldItems);
                    while (enumerator.MoveNext()) {
                        this.Items.RemoveAt(e.OldStartingIndex);
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Replace:
                    var enumerator = ArrayEx.GetEnumerator(e.NewItems);
                    index = e.NewStartingIndex;
                    while (enumerator.MoveNext()) {
                        this.Items.SetValueAt(index, enumerator.Current);
                        index++;
                    }
                    break;
                case Collections.NotifyCollectionChangedAction.Reset:
                    this.Items.Clear();
                    this.Items.AddRange(coll.ToArray());
                    break;
            }
            this.Items.IsReadOnly = true;
        }
    }
}