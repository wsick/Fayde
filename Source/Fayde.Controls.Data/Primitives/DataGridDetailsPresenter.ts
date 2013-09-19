/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export class DataGridDetailsPresenter extends Panel {
        static ContentHeightProperty = DependencyProperty.Register("ContentHeight", () => Number, DataGridDetailsPresenter, 0.0, (d, args) => (<DataGridDetailsPresenter>d).InvalidateMeasure());
        ContentHeight: number;

        _OwningRow: DataGridRow;
        private get OwningGrid(): DataGrid {
            var or = this._OwningRow;
            if (or != null)
                return or.OwningGrid;
            return null;
        }

        _MeasureOverride(availableSize: size, error: BError): size {
            var og = this.OwningGrid;
            if (og == null || this.Children.Count == 0)
                return new size();
            var width = (og.AreRowDetailsFrozen ? og.CellsWidth : Math.max(og.CellsWidth, og.ColumnsInternal.VisibleEdgedColumnsWidth)) - og.ColumnsInternal.RowGroupSpacerColumn.Width.Value;
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                enumerator.Current.Measure(size.fromRaw(width, Number.POSITIVE_INFINITY));
            }
            var height = Math.max(0.0, isNaN(this.ContentHeight) ? 0.0 : this.ContentHeight);
            return size.fromRaw(width, height);
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            var og = this.OwningGrid;
            if (og == null)
                return super._ArrangeOverride(finalSize, error);
            var num1 = og.ColumnsInternal.RowGroupSpacerColumn.Width.Value;
            var x1 = num1;
            var x2 = og.AreRowGroupHeadersFrozen ? num1 : 0.0;
            var num2 = 0.0;
            if (og.AreRowDetailsFrozen) {
                x1 += og.HorizontalOffset;
                num2 = og.CellsWidth;
            } else {
                x2 += og.HorizontalOffset;
                num2 = Math.max(og.CellsWidth, og.ColumnsInternal.VisibleEdgedColumnsWidth);
            }
            var width = num2 - num1;
            var height = Math.max(0.0, isNaN(this.ContentHeight) ? 0.0 : this.ContentHeight);

            var r = new rect();
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                rect.set(r, x1, 0.0, width, height);
                enumerator.Current.Arrange(r);
            }
            if (og.AreRowDetailsFrozen) {
                this.Clip = null;
            } else {
                var rectangleGeometry = new Media.RectangleGeometry();
                rectangleGeometry.Rect = new rect();
                rect.set(rectangleGeometry.Rect, x2, 0.0, Math.max(0.0, width - x2 + num1), height);
                this.Clip = rectangleGeometry;
            }
            return finalSize;
        }
    }
    Fayde.RegisterType(DataGridDetailsPresenter, {
        Name: "DataGridDetailsPresenter",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: Fayde.XMLNS
    });
}