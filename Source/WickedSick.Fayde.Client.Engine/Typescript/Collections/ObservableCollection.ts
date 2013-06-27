/// <reference path="INotifyCollectionChanged.ts" />
/// <reference path="../Runtime/Enumerable.ts" />
/// CODE
/// <reference path="NotifyCollectionChangedEventArgs.ts" />

module Fayde.Collections {
    export class ObservableCollection implements IEnumerable<any>, INotifyCollectionChanged, INotifyPropertyChanged {
        private _ht: any[] = [];
        
        GetEnumerator(): IEnumerator<any> {
            return ArrayEx.GetEnumerator(this._ht);
        }
        CollectionChanged: MulticastEvent<NotifyCollectionChangedEventArgs> = new MulticastEvent<NotifyCollectionChangedEventArgs>();
        PropertyChanged: MulticastEvent<PropertyChangedEventArgs> = new MulticastEvent<PropertyChangedEventArgs>();

        get Count(): number { return this._ht.length; }

        GetValueAt(index: number): any {
            var ht = this._ht;
            if (index < 0 || index >= ht.length)
                throw new IndexOutOfRangeException(index);
            return ht[index];
        }
        SetValueAt(index: number, value: any) {
            var ht = this._ht;
            if (index < 0 || index >= ht.length)
                throw new IndexOutOfRangeException(index);
            var oldValue = ht[index];
            ht[index] = value;
            this.CollectionChanged.Raise(this, NotifyCollectionChangedEventArgs.Replace(value, oldValue, index));
        }
        Add(value: any) {
            var index = this._ht.push(value) - 1;
            this.CollectionChanged.Raise(this, NotifyCollectionChangedEventArgs.Add(value, index));
            this._RaisePropertyChanged("Count");
        }
        AddRange(values: any[]) {
            var index = this._ht.length;
            var len = values.length;
            for (var i = 0; i < len; i++) {
                this._ht.push(values[i]);
            }
            this.CollectionChanged.Raise(this, NotifyCollectionChangedEventArgs.AddRange(values, index));
            this._RaisePropertyChanged("Count");
        }
        Insert(value: any, index: number) {
            var ht = this._ht;
            if (index < 0 || index > ht.length)
                throw new IndexOutOfRangeException(index);
            if (index >= ht.length)
                ht.push(value);
            else
                ht.splice(index, 0, value);
            this.CollectionChanged.Raise(this, NotifyCollectionChangedEventArgs.Add(value, index));
            this._RaisePropertyChanged("Count");
        }
        IndexOf(value: any): number {
            return this._ht.indexOf(value);
        }
        Contains(value: any): bool {
            return this._ht.indexOf(value) > 0;
        }
        Remove(value: any) {
            var index = this._ht.indexOf(value);
            if (index < 0)
                return;
            this._ht.splice(index, 1);
            this.CollectionChanged.Raise(this, NotifyCollectionChangedEventArgs.Remove(value, index));
            this._RaisePropertyChanged("Count");
        }
        RemoveAt(index: number) {
            if (index < 0 || index >= this._ht.length)
                throw new IndexOutOfRangeException(index);
            var item = this._ht.splice(index, 1)[0];
            this.CollectionChanged.Raise(this, NotifyCollectionChangedEventArgs.Remove(item, index));
            this._RaisePropertyChanged("Count");
        }
        Clear() {
            this._ht = [];
            this.CollectionChanged.Raise(this, NotifyCollectionChangedEventArgs.Reset());
            this._RaisePropertyChanged("Count");
        }
        private _RaisePropertyChanged(propertyName: string) {
            this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
        }
    }
    Nullstone.RegisterType(ObservableCollection, "ObservableCollection", [IEnumerable_, INotifyCollectionChanged_, INotifyPropertyChanged_]);
}