module Fayde.Collections {
    export class ReadOnlyObservableCollection<T> implements INotifyCollectionChanged, INotifyPropertyChanged {
        get Count (): number {
            return this._Source.Count;
        }

        private _Source: ObservableCollection<T>;

        CollectionChanged = new nullstone.Event<CollectionChangedEventArgs>();
        PropertyChanged = new nullstone.Event<PropertyChangedEventArgs>();

        constructor (source: ObservableCollection<T>) {
            this._Source = source;
            this._Source.CollectionChanged.on(this._OnCollectionChanged, this);
            this._Source.PropertyChanged.on(this._OnPropertyChanged, this);
        }

        GetValueAt (index: number) {
            return this._Source.GetValueAt(index);
        }

        ToArray (): T[] {
            return this._Source.ToArray();
        }

        IndexOf (value: T): number {
            return this._Source.IndexOf(value);
        }

        Contains (value: T): boolean {
            return this._Source.Contains(value);
        }

        private _OnCollectionChanged (sender: any, args: CollectionChangedEventArgs) {
            this.CollectionChanged.raise(this, args);
        }

        private _OnPropertyChanged (sender: any, args: PropertyChangedEventArgs) {
            this.PropertyChanged.raise(this, args);
        }
    }
    Fayde.CoreLibrary.add(ObservableCollection);
    nullstone.addTypeInterfaces(ReadOnlyObservableCollection, INotifyCollectionChanged_, INotifyPropertyChanged_);
}