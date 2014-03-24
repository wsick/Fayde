/// <reference path="Fayde.d.ts" />

module Fayde.Experimental {
    import GridLength = Fayde.Controls.GridLength;
    import ColumnDefinition = Fayde.Controls.ColumnDefinition;

    export class GridColumn extends DependencyObject {
        static WidthProperty: DependencyProperty = DependencyProperty.Register("Width", () => GridLength, GridColumn);
        static MaxWidthProperty: DependencyProperty = DependencyProperty.Register("MaxWidth", () => Number, GridColumn, Number.POSITIVE_INFINITY);
        static MinWidthProperty: DependencyProperty = DependencyProperty.Register("MinWidth", () => Number, GridColumn, 0.0);
        static ActualWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("ActualWidth", () => Number, GridColumn, 0.0);
        Width: GridLength;
        MaxWidth: number;
        MinWidth: number;
        ActualWidth: number;

        GetContainerForCell(item: any): UIElement {
            return new GridCell();
        }
        PrepareContainerForCell(cell: UIElement, item: any) { }
        ClearContainerForCell(cell: UIElement, item: any) {
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                gc.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
            }
        }

        private _Definition: ColumnDefinition = null;
        private _ActualWidthListener: Providers.IPropertyChangedListener = null;
        AttachToDefinition(coldef: ColumnDefinition) {
            this._Definition = coldef;
            if (!coldef)
                return;

            var binding = new Data.Binding("Width");
            binding.Source = this;
            binding.Mode = Data.BindingMode.OneWay;
            binding.Converter = new EmptyWidthConverter();
            coldef.SetBinding(ColumnDefinition.WidthProperty, binding);

            binding = new Data.Binding("MaxWidth");
            binding.Source = this;
            binding.Mode = Data.BindingMode.OneWay;
            coldef.SetBinding(ColumnDefinition.MaxWidthProperty, binding);

            binding = new Data.Binding("MinWidth");
            binding.Source = this;
            binding.Mode = Data.BindingMode.OneWay;
            coldef.SetBinding(ColumnDefinition.MinWidthProperty, binding);

            this._ActualWidthListener = ColumnDefinition.ActualWidthProperty.Store.ListenToChanged(coldef, ColumnDefinition.ActualWidthProperty, this._OnActualWidthChanged, this);
        }
        private _OnActualWidthChanged(sender: any, args: IDependencyPropertyChangedEventArgs) {
            this.SetCurrentValue(ColumnDefinition.ActualWidthProperty, args.NewValue);
        }
        DetachDefinition() {
            var awl = this._ActualWidthListener;
            var coldef = this._Definition;
            this._ActualWidthListener = null;
            this._Definition = null;
            if (awl)
                awl.Detach();
            if (coldef) {
                coldef.ClearValue(ColumnDefinition.WidthProperty);
                coldef.ClearValue(ColumnDefinition.MaxWidthProperty);
                coldef.ClearValue(ColumnDefinition.MinWidthProperty);
            }
        }
    }

    export class GridColumnCollection extends XamlObjectCollection<GridColumn> {
        ColumnChanged = new MulticastEvent<GridColumnChangedEventArgs>();
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

    class EmptyWidthConverter implements Data.IValueConverter {
        Convert(value: any, targetType: IType, parameter: any, culture: any): any {
            if (!value)
                return new Controls.GridLength(1, Controls.GridUnitType.Auto);
            return value;
        }
        ConvertBack(value: any, targetType: IType, parameter: any, culture: any): any { }
    }
}