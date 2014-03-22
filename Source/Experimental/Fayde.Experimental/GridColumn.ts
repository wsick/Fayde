/// <reference path="Fayde.d.ts" />

module Fayde.Experimental {
    export interface IGridColumn extends Fayde.XamlObject {
        GetContainerForCell(item: any): UIElement;
        PrepareContainerForCell(cell: UIElement, item: any): void;
        ClearContainerForCell(cell: UIElement, item: any);
    }
    export class GridTextColumn extends DependencyObject {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => Data.PropertyPath, GridTextColumn, undefined, (d, args) => (<GridTextColumn>d).OnDisplayMemberChanged(args));
        DisplayMemberPath: Data.PropertyPath;
        private OnDisplayMemberChanged(args: IDependencyPropertyChangedEventArgs) {
            var gcc = <GridColumnCollection>this.Parent;
            if (gcc instanceof GridColumnCollection)
                gcc.ColumnChanged.Raise(gcc, new GridColumnChangedEventArgs(this));
        }

        GetContainerForCell(item: any): UIElement {
            return new GridCell();
        }
        PrepareContainerForCell(cell: UIElement, item: any) {
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                var binding = new Data.Binding();
                binding.Path = this.DisplayMemberPath;
                binding.Source = item;
                gc.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement, item: any) {
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                gc.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
            }
        }
    }

    export class GridColumnCollection extends XamlObjectCollection<IGridColumn> {
        ColumnChanged = new MulticastEvent<GridColumnChangedEventArgs>();
        CollectionChanged = new MulticastEvent<Collections.NotifyCollectionChangedEventArgs>();

        _RaiseItemAdded(value: IGridColumn, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Add(value, index));
        }
        _RaiseItemRemoved(value: IGridColumn, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Remove(value, index));
        }
        _RaiseItemReplaced(removed: IGridColumn, added: IGridColumn, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Replace(added, removed, index));
        }
        _RaiseCleared(old: IGridColumn[]) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Reset(old));
        }
    }
}