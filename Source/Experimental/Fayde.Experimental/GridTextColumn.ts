/// <reference path="GridColumn.ts" />

module Fayde.Experimental {
    export class GridTextColumn extends GridColumn {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, GridTextColumn, undefined, (d, args) => (<GridTextColumn>d).OnDisplayMemberChanged(args));
        DisplayMemberPath: string;
        private OnDisplayMemberChanged(args: IDependencyPropertyChangedEventArgs) {
            var gcc = <GridColumnCollection>this.Parent;
            if (gcc instanceof GridColumnCollection)
                gcc.ColumnChanged.Raise(gcc, new GridColumnChangedEventArgs(this));
        }

        PrepareContainerForCell(cell: UIElement, item: any) {
            super.PrepareContainerForCell(cell, item);
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                gc.VerticalAlignment = VerticalAlignment.Center;
                var binding = new Data.Binding(this.DisplayMemberPath);
                binding.Source = item;
                gc.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);
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