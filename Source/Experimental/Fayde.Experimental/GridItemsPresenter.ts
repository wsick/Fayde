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
        private _Columns: IGridColumn[] = [];

        OnColumnAdded(index: number, newColumn: IGridColumn) {
            var gic = this.GridItemsControl;
            var grid = this.Panel;
            if (!gic || !grid)
                return;

            var cols = this._Columns;
            cols.splice(index, 0, newColumn);

            for (var i = 0, containers = this._CellContainers, len = containers.length, items = gic.Items, children = grid.Children; i < len; i++) {
                var container = newColumn.CreateCell(items[i]);
                containers[i].splice(index, 0, container);
                children.Insert(i * cols.length + index, container);
            }
        }
        OnColumnRemoved(index: number) {
            console.error("OnColumnRemoved not implemented");
        }
        OnColumnsCleared() {
            console.error("OnColumnsCleared not implemented");
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

            var rowdefs = grid.RowDefinitions;
            for (var i = 0, len = newItems.length; i < len; i++) {
                //Insert row definition
                rowdefs.Insert(index + i, new RowDefinition());
                //Shift cells down by 'len'
                for (var j = 0, currow = containers[i]; j < currow.length; j++) {
                    Grid.SetRow(currow[j], index + i + len);
                }
                //Insert containers
                var newrow: UIElement[] = [];
                for (var j = 0, len2 = cols.length; j < len2; j++) {
                    var container = cols[j].CreateCell(items[index + i]);
                    newrow.push(container);
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

            // Remove cell containers from _CellContainers
            var oldRowContainers = containers.splice(index, oldItems.length);

            // Remove cells in ['index','index + oldItems.length'] range
            for (var i = 0, len = oldItems.length; i < len; i++) {
                var oldrow = oldRowContainers[i];
                for (var j = 0; j < oldrow.length; j++) {
                    grid.Children.Remove(oldrow[j]);
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
            var index = rowdefs.Count - 1;
            while (index >= containers.length) {
                rowdefs.RemoveAt(index);
            }
        }
    }
}