 /// <reference path="GridColumn.ts" />

module Fayde.Experimental {
    export class GridTemplateColumn extends GridColumn {
        static CellTemplateProperty = DependencyProperty.Register("CellTemplate", () => DataTemplate, GridTemplateColumn);
        CellTemplate: DataTemplate;

        PrepareContainerForCell(cell: UIElement, item: any) {
            super.PrepareContainerForCell(cell, item);
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                var binding = new Data.Binding();
                binding.Source = item;
                gc.SetBinding(Fayde.Controls.ContentControl.ContentProperty, binding);

                binding = new Data.Binding("CellTemplate");
                binding.Source = this;
                gc.SetBinding(Fayde.Controls.ContentControl.ContentTemplateProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement, item: any) {
            super.ClearContainerForCell(cell, item);
            var gc = <GridCell>cell;
            if (gc instanceof GridCell) {
                gc.ClearValue(Fayde.Controls.ContentControl.ContentProperty);
                gc.ClearValue(Fayde.Controls.ContentControl.ContentTemplateProperty);
            }
        }
    }
}