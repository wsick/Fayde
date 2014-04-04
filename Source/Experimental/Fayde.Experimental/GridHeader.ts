module Fayde.Experimental {
    import ContentControl = Fayde.Controls.ContentControl;

    export class GridHeader extends DependencyObject {
        static HeaderProperty = DependencyProperty.Register("Header", () => Object, GridHeader);
        static HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", () => DataTemplate, GridHeader);
        Header: any;
        HeaderTemplate: DataTemplate;

        GetContainerForCell(): UIElement {
            return new GridCell();
        }
        PrepareContainerForCell(cell: UIElement) {
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                var binding = new Data.Binding("Header");
                binding.Source = this;
                gc.SetBinding(ContentControl.ContentProperty, binding);

                binding = new Data.Binding("HeaderTemplate");
                binding.Source = this;
                gc.SetBinding(ContentControl.ContentTemplateProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement) {
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                gc.ClearValue(ContentControl.ContentProperty);
                gc.ClearValue(ContentControl.ContentTemplateProperty);
            }
        }
    }

    export class GridHeaderCollection extends XamlObjectCollection<GridHeader> {
        HeaderChanged = new MulticastEvent<GridHeaderChangedEventArgs>();
        CollectionChanged = new MulticastEvent<Collections.NotifyCollectionChangedEventArgs>();

        _RaiseItemAdded(value: GridHeader, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Add(value, index));
        }
        _RaiseItemRemoved(value: GridHeader, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Remove(value, index));
        }
        _RaiseItemReplaced(removed: GridHeader, added: GridHeader, index: number) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Replace(added, removed, index));
        }
        _RaiseCleared(old: GridHeader[]) {
            this.CollectionChanged.Raise(this, Collections.NotifyCollectionChangedEventArgs.Reset(old));
        }
    }
}