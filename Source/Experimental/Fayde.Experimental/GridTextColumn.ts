module Fayde.Experimental {
    export class GridTextColumn extends GridColumn {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => Data.PropertyPath, GridTextColumn, undefined, (d, args) => (<GridTextColumn>d).OnDisplayMemberChanged(args));
        DisplayMemberPath: Data.PropertyPath;
        private OnDisplayMemberChanged(args: IDependencyPropertyChangedEventArgs) {
            var gcc = <GridColumnCollection>this.Parent;
            if (gcc instanceof GridColumnCollection)
                gcc.ColumnChanged.Raise(gcc, new GridColumnChangedEventArgs(this));
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
    }
}