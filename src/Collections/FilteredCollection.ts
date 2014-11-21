module Fayde.Collections {
    export class FilteredCollection<T> extends DeepObservableCollection<T> {
        private _Source: DeepObservableCollection<T>;
        get Source () {
            return this._Source;
        }

        set Source (value: DeepObservableCollection<T>) {
            this._Source = value;
            this.Update();
        }

        private _Filter: (item: any) => boolean;
        get Filter () {
            return this._Filter;
        }

        set Filter (value: (item: any) => boolean) {
            this._Filter = value;
            this.Update();
        }

        constructor (filter?: (item: any) => boolean, source?: DeepObservableCollection<T>) {
            super();
            this.Filter = filter;
            this.Source = source || new Fayde.Collections.DeepObservableCollection<T>();
            source.CollectionChanged.on(this._OnSourceCollectionChanged, this);
            source.ItemPropertyChanged.on(this._OnSourceItemPropertyChanged, this);
        }

        private _OnSourceCollectionChanged (sender: any, e: CollectionChangedEventArgs) {
            this.Update();
        }

        private _OnSourceItemPropertyChanged (sender: any, e: ItemPropertyChangedEventArgs<any>) {
            this.Update();
            if (this.Filter && this.Filter(e.Item))
                this.ItemPropertyChanged.raise(this, e);
        }

        Update () {
            if (!this._Source)
                return;
            var filter = this.Filter || ((item: any) => true);
            for (var i = 0, j = 0, enumerator = this._Source.getEnumerator(); enumerator.moveNext(); i++) {
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