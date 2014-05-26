module Fayde.Collections {
    export class FilteredCollection<T> extends Fayde.Collections.DeepObservableCollection<T> {
        private _Source: Fayde.Collections.DeepObservableCollection<T>;
        get Source() { return this._Source; }
        set Source(value: Fayde.Collections.DeepObservableCollection<T>) {
            this._Source = value;
            this.Update();
        }
        
        constructor(source: Fayde.Collections.DeepObservableCollection<T>, public Filter: (item: any) => boolean) {
            super();
            this.Source = source;
            source.CollectionChanged.Subscribe(this._OnSourceCollectionChanged, this);
            source.ItemPropertyChanged.Subscribe(this._OnSourceItemPropertyChanged, this);
        }

        private _OnSourceCollectionChanged(sender: any, e: Fayde.Collections.CollectionChangedEventArgs) {
            this.Update();
        }
        private _OnSourceItemPropertyChanged(sender: any, e: Fayde.Collections.ItemPropertyChangedEventArgs<any>) {
            this.Update();
            if (this.Filter && this.Filter(e.Item))
                this.ItemPropertyChanged.Raise(this, e);
        }

        Update() {
            var filter = this.Filter || ((item: any) => true);
            for (var i = 0, j = 0, enumerator = this._Source.GetEnumerator(); enumerator.MoveNext(); i++) {
                var isIncluded = filter(enumerator.Current);
                var isCurrent = j < this.Count && this.GetValueAt(j) === enumerator.Current;
                if (isIncluded && !isCurrent)
                    this.Insert(enumerator.Current, j);
                else if (!isIncluded && isCurrent)
                    this.RemoveAt(j);
                if (isIncluded)
                    j++;
            }
        }
    }
}