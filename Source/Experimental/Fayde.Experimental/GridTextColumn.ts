/// <reference path="GridColumn.ts" />

module Fayde.Experimental {
    export class GridTextColumn extends GridColumn {
        static BindingProperty = DependencyProperty.Register("Binding", () => Data.Binding, GridTextColumn, undefined, (d, args) => (<GridTextColumn>d).OnBindingChanged(args));
        Binding: Data.Binding;
        private OnBindingChanged(args: IDependencyPropertyChangedEventArgs) {
            var gcc = <GridColumnCollection>this.Parent;
            if (gcc instanceof GridColumnCollection)
                gcc.ColumnChanged.Raise(gcc, new GridColumnChangedEventArgs(this));
        }

        PrepareContainerForCell(cell: UIElement, item: any) {
            super.PrepareContainerForCell(cell, item);
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                var binding = this.Binding;
                if (binding) {
                    if (!binding.RelativeSource && !binding.ElementName && !binding.Source)
                        binding.Source = item;
                    gc.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);
                }
            }
        }
        ClearContainerForCell(cell: UIElement, item: any) {
            super.ClearContainerForCell(cell, item);
            var gc = <GridCell>cell;
            if (gc instanceof GridCell)
                gc.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
        }
    }
}