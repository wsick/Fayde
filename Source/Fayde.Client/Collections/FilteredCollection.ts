module Fayde.Collections {
    export class FilteredCollection<T> extends Fayde.Collections.DeepObservableCollection<T> {
        private _Source: Fayde.Collections.DeepObservableCollection<T>;
        get Source() { return this._Source; }
        set Source(value: Fayde.Collections.DeepObservableCollection<T>) {
            this._Source = value;
            this.Update();
        }

        private _Filter: (item: any) => boolean;
        get Filter() { return this._Filter; }
        set Filter(value: (item: any) => boolean) {
            this._Filter = value;
            this.Update();
        }
        
        constructor(filter?: (item: any) => boolean, source?: Fayde.Collections.DeepObservableCollection<T>) {
            super();
            this.Filter = filter;
            this.Source = source || new Fayde.Collections.DeepObservableCollection<T>();
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
            if (!this._Source)
                return;
            var filter = this.Filter || ((item: any) => true);
            for (var i = 0, j = 0, enumerator = this._Source.GetEnumerator(); enumerator.moveNext(); i++) {
                var isIncluded = filter(enumerator.current);
                var isCurrent = j < this.Count && this.GetValueAt(j) === enumerator.current;
                if (isIncluded && !isCurrent)
                    this.Insert(enumerator.current, j);
                else if (!isIncluded && isCurrent)
                    this.RemoveAt(j);
                if (isIncluded)
                    j++;
            }
        }
    }
}