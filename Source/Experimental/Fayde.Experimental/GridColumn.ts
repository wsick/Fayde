module Fayde.Experimental {
    export interface IGridColumn {
        CreateCell(item: any): UIElement;
    }
    export class GridColumn extends DependencyObject {
        CreateCell(item: any): UIElement {
            return new GridCell();
        }
    }

    export class GridColumnCollection extends XamlObjectCollection<GridColumn> {
        CollectionChanged = new MulticastEvent<Collections.NotifyCollectionChangedEventArgs>();

        _RaiseItemAdded(value: GridColumn, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Add(value, index));
        }
        _RaiseItemRemoved(value: GridColumn, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Remove(value, index));
        }
        _RaiseItemReplaced(removed: GridColumn, added: GridColumn, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Replace(added, removed, index));
        }
        _RaiseCleared(old: GridColumn[]) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Reset(old));
        }
    }
}