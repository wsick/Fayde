/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export class DataGridCellsPresenter extends Panel {
        private _DesiredHeight = 0.0;
        private _FillerLeftEdge = 0.0;
        _OwningRow: DataGridRow;
        private get OwningGrid(): DataGrid {
            var or = this._OwningRow;
            if (or != null)
                return or.OwningGrid;
            return null;
        }

        _MeasureOverride(availableSize: size, error: BError): size {
            var og = this.OwningGrid;
            if (og == null)
                return super._MeasureOverride(availableSize, error);
            var flag1 = false;
            var height = 0.0;
            if (isNaN(og.RowHeight)) {
                flag1 = true;
                height = Number.POSITIVE_INFINITY;
            } else {
                this._DesiredHeight = og.RowHeight;
                height = this._DesiredHeight;
                flag1 = false;
            }
            var frozenLeftEdge = 0.0;
            var leftEdge1 = 0.0;
            var num1 = -og.HorizontalOffset;
            og.ColumnsInternal.EnsureVisibleEdgedColumnsWidth();
            var lastVisibleColumn = og.ColumnsInternal.LastVisibleColumn;
            var or = this._OwningRow;
            var column: DataGridColumn;
            var visCols = og.ColumnsInternal.GetVisibleColumns();
            var len = visCols.length;
            for (var i = 0; i < len; i++) {
                column = visCols[i];
                var cell = or.Cells[column.Index];
                var displayColumn = this.ShouldDisplayCell(column, frozenLeftEdge, num1) || or.Index === 0;
                DataGridCellsPresenter.EnsureCellDisplay(cell, displayColumn);
                if (displayColumn) {
                    var width = column.Width;
                    var flag2 = width.IsSizeToCells || width.IsAuto;
                    if (column != lastVisibleColumn)
                        cell.EnsureGridLine(lastVisibleColumn);
                    if (!og.UsesStarSizing || !column.ActualCanUserResize && !column.Width.IsStar) {
                        var displayValue = column.Width.IsStar ? Math.min(column.ActualMaxWidth, 10000.0) : Math.max(column.ActualMinWidth, Math.min(column.ActualMaxWidth, column.Width.DesiredValue));
                        column.SetWidthDisplayValue(displayValue);
                    }
                    if (flag2) {
                        cell.Measure(size.fromRaw(column.ActualMaxWidth, height));
                        og.AutoSizeColumn(column, cell.DesiredSize.Width);
                        column.ComputeLayoutRoundedWidth(leftEdge1);
                    } else if (!og.UsesStarSizing) {
                        column.ComputeLayoutRoundedWidth(num1);
                        cell.Measure(size.fromRaw(column.LayoutRoundedWidth, height));
                    }
                    if (flag1)
                        this._DesiredHeight = Math.max(this._DesiredHeight, cell.DesiredSize.Height);
                }
                if (column.IsFrozen)
                    frozenLeftEdge += column.ActualWidth;
                num1 += column.ActualWidth;
                leftEdge1 += column.ActualWidth;
            }
            if (og.UsesStarSizing && !og.AutoSizingColumns) {
                var amount = og.CellsWidth - leftEdge1;
                var num2 = leftEdge1 + (amount - og.AdjustColumnWidths(0, amount, false));
                var leftEdge2 = 0.0;

                for (var i = 0; i < len; i++) {
                    column = visCols[i];
                    var dataGridCell = or.Cells[column.Index];
                    column.ComputeLayoutRoundedWidth(leftEdge2);
                    dataGridCell.Measure(size.fromRaw(column.LayoutRoundedWidth, height));
                    if (flag1)
                        this._DesiredHeight = Math.max(this._DesiredHeight, dataGridCell.DesiredSize.Height);
                    leftEdge2 += column.ActualWidth;
                }
            }
            or.FillerCell.Measure(size.fromRaw(Number.POSITIVE_INFINITY, this._DesiredHeight));
            og.ColumnsInternal.EnsureVisibleEdgedColumnsWidth();
            return size.fromRaw(og.ColumnsInternal.VisibleEdgedColumnsWidth, this._DesiredHeight);
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            var og = this.OwningGrid;
            if (og == null)
                return super._ArrangeOverride(finalSize, error);
            if (og.AutoSizingColumns) {
                og.AutoSizingColumns = false;
                return super._ArrangeOverride(finalSize, error);
            }
            var frozenLeftEdge = 0.0;
            var cellLeftEdge = -og.HorizontalOffset;
            var column: DataGridColumn;
            var visCols = og.ColumnsInternal.GetVisibleColumns();
            var len = visCols.length;
            for (var i = 0; i < len; i++) {
                column = visCols[i];
                var cell = or.Cells[column.Index];
                var x = 0.0;
                if (column.IsFrozen) {
                    x = frozenLeftEdge;
                    frozenLeftEdge += column.ActualWidth;
                } else
                    x = cellLeftEdge;
                if (cell.Visibility == Visibility.Visible) {
                    var r = new rect();
                    rect.set(r, x, 0.0, column.LayoutRoundedWidth, finalSize.Height);
                    cell.Arrange(r);
                    ensureCellClip(cell, column.ActualWidth, finalSize.Height, frozenLeftEdge, cellLeftEdge);
                }
                cellLeftEdge += column.ActualWidth;
                column.IsInitialDesiredWidthDetermined = true;
            }
            this._FillerLeftEdge = cellLeftEdge;
            var r = new rect();
            rect.set(r, this._FillerLeftEdge, 0.0, og.ColumnsInternal.FillerColumn.FillerWidth, finalSize.Height);
            or.FillerCell.Arrange(r);
            return finalSize;
        }

        private EnsureFillerVisibility() {
            var og = this.OwningGrid;
            var or = this._OwningRow;
            var fillerColumn = og.ColumnsInternal.FillerColumn;
            var visibility = fillerColumn.IsActive ? Visibility.Visible : Visibility.Collapsed;
            if (or.FillerCell.Visibility !== visibility) {
                or.FillerCell.Visibility = visibility;
                if (visibility === Visibility.Visible) {
                    var r = new rect();
                    rect.set(r, this._FillerLeftEdge, 0.0, fillerColumn.FillerWidth, this.ActualHeight);
                    or.FillerCell.Arrange(r);
                }
            }
            var lastVisibleColumn = og.ColumnsInternal.LastVisibleColumn;
            if (lastVisibleColumn == null)
                return;
            or.Cells[lastVisibleColumn.Index].EnsureGridLine(lastVisibleColumn);
        }
    }
    Fayde.RegisterType(DataGridCellsPresenter, {
        Name: "DataGridCellsPresenter",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: Fayde.XMLNS
    });

    function ensureCellClip(cell: DataGridCell, width: number, height: number, frozenLeftEdge: number, cellLeftEdge: number) {
        if (!cell.OwningColumn.IsFrozen && frozenLeftEdge > cellLeftEdge) {
            var rectangleGeometry = new Media.RectangleGeometry();
            var x = Math.round(Math.min(width, frozenLeftEdge - cellLeftEdge));
            rectangleGeometry.Rect = new Rect();
            rect.set(rectangleGeometry.Rect, x, 0.0, Math.Max(0.0, width - x), height);
            cell.Clip = rectangleGeometry;
        } else
            cell.Clip = null;
    }
    function ensureCellDisplay(cell: DataGridCell, displayColumn: boolean) {
        if (cell.IsCurrent) {
            if (displayColumn) {
                cell.Visibility = Visibility.Visible;
                cell.Clip = null;
            } else {
                var rectangleGeometry = new Media.RectangleGeometry();
                rectangleGeometry.Rect = new rect();
                cell.Clip = rectangleGeometry;
            }
        }
        else
            cell.Visibility = displayColumn ? Visibility.Visible : Visibility.Collapsed;
    }
}