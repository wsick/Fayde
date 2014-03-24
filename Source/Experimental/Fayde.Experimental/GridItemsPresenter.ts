module Fayde.Experimental {
    import Grid = Fayde.Controls.Grid;
    import RowDefinition = Fayde.Controls.RowDefinition;
    import ColumnDefinition = Fayde.Controls.ColumnDefinition;

    export class GridItemsPresenterNode extends FENode {
        XObject: GridItemsPresenter;
        constructor(xobj: GridItemsPresenter) {
            super(xobj);
        }

        private _ElementRoot: Grid;
        get ElementRoot(): Grid { return this._ElementRoot; }

        DoApplyTemplateWithError(error: BError): boolean {
            if (this._ElementRoot)
                return false;

            var xobj = this.XObject;
            var gic = xobj.TemplateOwner;
            if (!(gic instanceof GridItemsControl))
                return false;

            this._ElementRoot = new Grid();

            if (!this.FinishApplyTemplateWithError(this._ElementRoot, error))
                return false;
            gic.XamlNode.ItemsPresenter = xobj;
            for (var i = 0, cols = gic.Columns.ToArray(), len = cols.length; i < len; i++) {
                xobj.OnColumnAdded(i, cols[i]);
            }
            xobj.OnItemsAdded(0, gic.Items);
            return true;
        }
    }

    export class GridItemsPresenter extends FrameworkElement {
        TemplateOwner: GridItemsControl;
        XamlNode: GridItemsPresenterNode;
        CreateNode(): GridItemsPresenterNode { return new GridItemsPresenterNode(this); }

        get GridItemsControl(): GridItemsControl {
            return this.TemplateOwner instanceof GridItemsControl ? this.TemplateOwner : null;
        }
        get Panel(): Grid { return this.XamlNode.ElementRoot; }

        private _CellContainers: UIElement[][] = []; //[row][col]
        private _Columns: GridColumn[] = [];

        OnColumnAdded(index: number, newColumn: GridColumn) {
            //TODO: Handle multiple columns
            var cols = this._Columns;
            cols.splice(index, 0, newColumn);

            var gic = this.GridItemsControl;
            var grid = this.Panel;
            if (!gic || !grid)
                return;
            
            var coldef = new ColumnDefinition();
            newColumn.AttachToDefinition(coldef);
            grid.ColumnDefinitions.Insert(index, coldef);

            //Insert containers
            for (var i = 0, containers = this._CellContainers, len = containers.length, items = gic.Items, children = grid.Children; i < len; i++) {
                var item = items[i];
                var container = newColumn.GetContainerForCell(item);
                newColumn.PrepareContainerForCell(container, item);
                containers[i].splice(index, 0, container);
                children.Insert(i * cols.length + index, container);
            }

            //Shift existing
            for (var i = 0, containers = this._CellContainers, len = containers.length; i < len; i++) {
                for (var j = index + 1, cells = containers[i], len2 = cells.length; j < len2; j++) {
                    Grid.SetColumn(cells[j], j);
                }
            }
        }
        OnColumnRemoved(index: number) {
            //TODO: Handle multiple columns
            var cols = this._Columns;
            var col = cols[index];

            var gic = this.GridItemsControl;
            var grid = this.Panel;
            if (gic && grid) {
                //Clear containers
                for (var items = gic.Items, containers = this._CellContainers, i = containers.length - 1; i >= 0; i--) {
                    var container = containers[i][index];
                    col.ClearContainerForCell(container, items[i]);
                    grid.Children.Remove(container);
                }

                //Shift Grid.Column for existing
                for (var i = 0, containers = this._CellContainers, len = containers.length; i < len; i++) {
                    for (var j = index + 1, cells = containers[i], len2 = cells.length; j < len2; j++) {
                        Grid.SetColumn(cells[j], j);
                    }
                }

                grid.ColumnDefinitions.RemoveAt(index);
            }
            
            col.DetachDefinition();
            cols.splice(index, 1);
        }
        OnColumnsCleared() {
            var cols = this._Columns;
            var gic = this.GridItemsControl;
            var grid = this.Panel;
            if (gic && grid) {
                var items = gic.Items;
                //Clear containers
                for (var containers = this._CellContainers, i = containers.length - 1; i >= 0; i--) {
                    for (var j = cols.length - 1; j >= 0; j--) {
                        cols[j].ClearContainerForCell(containers[i][j], items[i]);
                    }
                }
                grid.Children.Clear();
            }
            for (var j = 0, len = cols.length; j < len; j++) {
                cols[j].DetachDefinition();
            }
            cols.length = 0;
            this._CellContainers.length = 0;
        }
        OnColumnChanged(col: GridColumn) {
            var gic = this.GridItemsControl;
            if (!gic)
                return;
            var colindex = this._Columns.indexOf(col);
            if (colindex < 0)
                return;
            for (var i = 0, containers = this._CellContainers, items = gic.Items, len = containers.length; i < len; i++) {
                col.PrepareContainerForCell(containers[i][colindex], items[i]);
            }
        }

        OnItemsAdded(index: number, newItems: any[]) {
            var gic = this.GridItemsControl;
            var grid = this.Panel;
            if (!gic || !grid)
                return;

            var containers = this._CellContainers;
            var items = gic.Items;
            var cols = this._Columns;
            var children = grid.Children;

            //Insert row definitions
            var rowdefs = grid.RowDefinitions;
            for (var i = 0, len = newItems.length; i < len; i++) {
                var rowdef = new RowDefinition();
                rowdef.Height = new Fayde.Controls.GridLength(1, Fayde.Controls.GridUnitType.Auto);
                rowdefs.Insert(index + i, rowdef);
            }

            //Shift cells down by 'newItems.length'
            for (var i = index, len = containers.length; i < len; i++) {
                for (var j = 0, cells = containers[i]; j < cells.length; j++) {
                    Grid.SetRow(cells[j], i + newItems.length);
                }
            }

            //Insert containers
            for (var i = 0, len = newItems.length; i < len; i++) {
                var newrow: UIElement[] = [];
                for (var j = 0, len2 = cols.length; j < len2; j++) {
                    var item = items[index + i];
                    var col = cols[j];
                    var container = col.GetContainerForCell(item);
                    col.PrepareContainerForCell(container, item);
                    newrow.push(container);
                    Grid.SetRow(container, i);
                    Grid.SetColumn(container, j);
                    children.Insert(i * cols.length + index, container);
                }
                containers.splice(index + i, 0, newrow);
            }
        }
        OnItemsRemoved(index: number, oldItems: any[]) {
            var grid = this.Panel;
            if (!grid)
                return;

            var containers = this._CellContainers;
            var cols = this._Columns;

            // Remove cell containers from _CellContainers
            var oldRowContainers = containers.splice(index, oldItems.length);

            // Remove cells in ['index','index + oldItems.length'] range
            for (var i = 0, len = oldItems.length; i < len; i++) {
                var oldrow = oldRowContainers[i];
                for (var j = 0; j < oldrow.length; j++) {
                    var cell = oldrow[j];
                    cols[j].ClearContainerForCell(cell, oldItems[i]);
                    grid.Children.Remove(cell);
                }
            }

            // Re-set Grid.Row for all shifted rows
            for (var i = index, len = containers.length; i < len; i++) {
                var row = containers[i];
                for (var j = 0; j < row.length; j++) {
                    Grid.SetRow(row[j], i);
                }
            }

            //Remove excessive row definitions
            var rowdefs = grid.RowDefinitions;
            for (var i = 0, len = oldItems.length; i < len; i++) {
                rowdefs.RemoveAt(index);
            }
        }
    }
}