/// <reference path="ObservableCollection.ts" />

module Fayde.Collections {
    export class DeepObservableCollection<T> extends ObservableCollection<T> {
        ItemPropertyChanged = new MulticastEvent<ItemPropertyChangedEventArgs<T>>();
        constructor() {
            super();
            this.CollectionChanged.Subscribe(this._OnCollectionChanged, this);
        }

        private _OnCollectionChanged(sender: any, e: NotifyCollectionChangedEventArgs) {
            if (e.NewItems) {
                for (var i = 0; i < e.NewItems.length; i++) {
                    var notify = INotifyPropertyChanged_.As(e.NewItems[i]);
                    if (notify)
                        notify.PropertyChanged.Subscribe(this._OnItemPropertyChanged, this);
                }
            }
            if (e.OldItems) {
                for (var i = 0; i < e.OldItems.length; i++) {
                    var notify = INotifyPropertyChanged_.As(e.OldItems[i]);
                    if (notify)
                        notify.PropertyChanged.Unsubscribe(this._OnItemPropertyChanged, this);
                }
            }
        }
        private _OnItemPropertyChanged(sender: T, e: PropertyChangedEventArgs) {
            this.ItemPropertyChanged.Raise(this, new ItemPropertyChangedEventArgs<T>(sender, e.PropertyName));
        }
    }
} 