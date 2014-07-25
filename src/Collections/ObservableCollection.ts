/// <reference path="../Runtime/Enumerable.ts" />
/// <reference path="INotifyCollectionChanged.ts" />
/// <reference path="../Core/INotifyPropertyChanged.ts" />

module Fayde.Collections {
    export class ObservableCollection<T> implements IEnumerable<T>, INotifyCollectionChanged, INotifyPropertyChanged {
        private _ht: T[] = [];

        getEnumerator(): IEnumerator<T> {
            return ArrayEx.GetEnumerator(this._ht);
        }
        CollectionChanged = new MulticastEvent<CollectionChangedEventArgs>();
        PropertyChanged = new MulticastEvent<PropertyChangedEventArgs>();

        get Count(): number { return this._ht.length; }

        ToArray(): T[] { return this._ht.slice(0); }

        GetValueAt(index: number): T {
            var ht = this._ht;
            if (index < 0 || index >= ht.length)
                throw new IndexOutOfRangeException(index);
            return ht[index];
        }
        SetValueAt(index: number, value: T) {
            var ht = this._ht;
            if (index < 0 || index >= ht.length)
                throw new IndexOutOfRangeException(index);
            var oldValue = ht[index];
            ht[index] = value;
            this.CollectionChanged.Raise(this, CollectionChangedEventArgs.Replace(value, oldValue, index));
        }
        Add(value: T) {
            var index = this._ht.push(value) - 1;
            this.CollectionChanged.Raise(this, CollectionChangedEventArgs.Add(value, index));
            this._RaisePropertyChanged("Count");
        }
        AddRange(values: T[]) {
            var index = this._ht.length;
            var len = values.length;
            for (var i = 0; i < len; i++) {
                this._ht.push(values[i]);
            }
            this.CollectionChanged.Raise(this, CollectionChangedEventArgs.AddRange(values, index));
            this._RaisePropertyChanged("Count");
        }
        Insert(value: T, index: number) {
            var ht = this._ht;
            if (index < 0 || index > ht.length)
                throw new IndexOutOfRangeException(index);
            if (index >= ht.length)
                ht.push(value);
            else
                ht.splice(index, 0, value);
            this.CollectionChanged.Raise(this, CollectionChangedEventArgs.Add(value, index));
            this._RaisePropertyChanged("Count");
        }
        IndexOf(value: T): number {
            return this._ht.indexOf(value);
        }
        Contains(value: T): boolean {
            return this._ht.indexOf(value) > -1;
        }
        Remove(value: T) {
            var index = this._ht.indexOf(value);
            if (index < 0)
                return;
            this._ht.splice(index, 1);
            this.CollectionChanged.Raise(this, CollectionChangedEventArgs.Remove(value, index));
            this._RaisePropertyChanged("Count");
        }
        RemoveAt(index: number) {
            if (index < 0 || index >= this._ht.length)
                throw new IndexOutOfRangeException(index);
            var item = this._ht.splice(index, 1)[0];
            this.CollectionChanged.Raise(this, CollectionChangedEventArgs.Remove(item, index));
            this._RaisePropertyChanged("Count");
        }
        Clear() {
            var old = this._ht;
            this._ht = [];
            this.CollectionChanged.Raise(this, CollectionChangedEventArgs.Reset(old));
            this._RaisePropertyChanged("Count");
        }
        private _RaisePropertyChanged(propertyName: string) {
            this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
        }
    }
    Fayde.RegisterType(ObservableCollection, "Fayde.Collections", Fayde.XMLNS);
}