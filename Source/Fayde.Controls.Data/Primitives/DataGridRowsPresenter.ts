/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export class DataGridRowsPresenter extends Panel {
        _OwningGrid: DataGrid;

        _MeasureOverride(availableSize: size, error: BError): size {
            var og = this._OwningGrid;
            if (availableSize.Height === 0.0 || og == null)
                return super._MeasureOverride(availableSize, error);
            var flag = (!og.RowsPresenterAvailableSize.HasValue || availableSize.Width != og.RowsPresenterAvailableSize.Value.Width) && isFinite(availableSize.Width);
            og.RowsPresenterAvailableSize = size.fromRaw(availableSize.Width, availableSize.Height);
            og.OnRowsMeasure();
            var val2 = -og.NegVerticalOffset;
            var edgedColumnsWidth = og.ColumnsInternal.VisibleEdgedColumnsWidth;
            var val1 = 0.0;
            var se = og._DisplayData.GetScrollingElements();
            var len = se.length;
            for (var i = 0; i < len; i++) {
                var uiElement = se[i];
                var dataGridRow = <DataGridRow>uiElement;
                if (!(dataGridRow instanceof DataGridRow))
                    dataGridRow = null;
                if (dataGridRow != null && flag)
                    dataGridRow.InvalidateMeasure();
                uiElement.Measure(size.createInfinite());
                if (dataGridRow != null && dataGridRow.HeaderCell != null) {
                    val1 = Math.max(val1, dataGridRow.HeaderCell.DesiredSize.Width);
                } else {
                    var gridRowGroupHeader = <DataGridRowGroupHeader>uiElement;
                    if (gridRowGroupHeader instanceof DataGridRowGroupHeader && gridRowGroupHeader.HeaderCell != null)
                        val1 = Math.max(val1, gridRowGroupHeader.HeaderCell.DesiredSize.Width);
                }
                val2 += uiElement.DesiredSize.Height;
            }
            og.RowHeadersDesiredWidth = val1;
            og.AvailableSlotElementRoom = availableSize.Height - val2;
            var height = Math.max(0.0, val2);
            return size.fromRaw(edgedColumnsWidth + val1, height);
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            var og = this._OwningGrid;
            if (finalSize.Height === 0.0 || og == null)
                return super._ArrangeOverride(finalSize, error);
            og.OnFillerColumnWidthNeeded(finalSize.Width);
            var width = og.ColumnsInternal.VisibleEdgedColumnsWidth + og.ColumnsInternal.FillerColumn.FillerWidth;
            var y = -og.NegVerticalOffset;
            var r = new rect();
            var se = og._DisplayData.GetScrollingElements();
            var len = se.length;
            for (var i = 0; i < len; i++) {
                var uiElement = se[i];
                var dataGridRow = <DataGridRow>uiElement;
                if (!(dataGridRow instanceof DataGridRow))
                    dataGridRow = null;
                if (dataGridRow != null) {
                    dataGridRow.EnsureFillerVisibility();
                    rect.set(r, -og.HorizontalOffset, y, width, uiElement.DesiredSize.Height);
                    dataGridRow.Arrange(r);
                } else {
                    var gridRowGroupHeader = <DataGridRowGroupHeader>uiElement;
                    if (gridRowGroupHeader instanceof DataGridRowGroupHeader) {
                        var x = og.AreRowGroupHeadersFrozen ? 0.0 : -og.HorizontalOffset;
                        rect.set(r, x, y, width - x, uiElement.DesiredSize.Height);
                        gridRowGroupHeader.Arrange(r);
                    }
                }
                y += uiElement.DesiredSize.Height;
            }
            var height = Math.max(y + og.NegVerticalOffset, finalSize.Height);
            var rectangleGeometry = new Media.RectangleGeometry();
            rectangleGeometry.Rect = new rect();
            rect.set(rectangleGeometry.Rect, 0.0, 0.0, finalSize.Width, height);
            this.Clip = rectangleGeometry;
            return size.fromRaw(finalSize.Width, height);
        }
    }
    Fayde.RegisterType(DataGridRowsPresenter, {
        Name: "DataGridRowsPresenter",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: Fayde.XMLNS
    });
}