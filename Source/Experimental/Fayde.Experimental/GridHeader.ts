module Fayde.Experimental {
    import ContentControl = Fayde.Controls.ContentControl;

    export class GridHeader extends DependencyObject {
        static HeaderProperty = DependencyProperty.Register("Header", () => Object, GridHeader);
        static HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", () => DataTemplate, GridHeader);
        static HeaderStyleProperty = DependencyProperty.Register("HeaderStyle", () => Style, GridHeader);
        Header: any;
        HeaderTemplate: DataTemplate;
        HeaderStyle: Style;

        GetContainerForCell(): UIElement {
            return new GridHeaderCell();
        }
        PrepareContainerForCell(cell: UIElement) {
            var gc = <GridHeaderCell>cell;
            if (gc instanceof GridHeaderCell) {
                var binding = new Data.Binding("Header");
                binding.Source = this;
                gc.SetBinding(ContentControl.ContentProperty, binding);

                binding = new Data.Binding("HeaderTemplate");
                binding.Source = this;
                gc.SetBinding(ContentControl.ContentTemplateProperty, binding);
                
                binding = new Data.Binding("HeaderStyle");
                binding.Source = this;
                binding.Mode = Data.BindingMode.OneWay;
                gc.SetBinding(FrameworkElement.StyleProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement) {
            var gc = <GridHeaderCell>cell;
            if (gc instanceof GridHeaderCell) {
                gc.ClearValue(ContentControl.ContentProperty);
                gc.ClearValue(ContentControl.ContentTemplateProperty);
                gc.ClearValue(FrameworkElement.StyleProperty);
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