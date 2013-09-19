/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls {

    enum DragMode {
        None,
        MouseDown,
        Drag,
        Resize,
        Reorder,
    }

    interface IHandledObj {
        Value: boolean;
    }

    export class DataGridColumnHeader extends ContentControl {
        static SeparatorBrushProperty = DependencyProperty.Register("SeparatorBrush", () => Media.Brush, DataGridColumnHeader);
        static SeparatorVisibilityProperty = DependencyProperty.Register("SeparatorVisibility", () => Visibility, DataGridColumnHeader, Visibility.Visible, (d, args) => (<DataGridColumnHeader>d).OnSeparatorVisibilityChanged(args)));
        SeparatorBrush: Media.Brush;
        SeparatorVisibility: Visibility;

        private _IsPressed = false;
        _OwningColumn: DataGridColumn;
        private _DesiredSeparatorVisibility: Visibility;
        private _CurrentSortingState: ListSortDirection;
        private get ColumnIndex(): number {
            var oc = this._OwningColumn;
            if (!oc)
                return -1;
            return oc.Index;
        }
        private get OwningGrid(): DataGrid {
            var oc = this._OwningColumn;
            if (oc != null && oc.OwningGrid != null)
                return oc.OwningGrid;
            return null;
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        OnContentChanged(oldContent: any, newContent: any) {
            if (newContent instanceof UIElement)
                throw DataGridError.DataGridColumnHeader.ContentDoesNotSupportUIElements();
            super.OnContentChanged(oldContent, newContent);
        }

        private OnSeparatorVisibilityChanged(args: IDependencyPropertyChangedEventArgs) {
            if (Extensions.AreHandlersSuspended(this))
                return;
            this._DesiredSeparatorVisibility = <Visibility> args.NewValue;
            var og = this.OwningGrid;
            if (og != null)
                this.UpdateSeparatorVisibility(og.ColumnsInternal.LastVisibleColumn);
            else
                this.UpdateSeparatorVisibility(null);
        }

        private EnsureStyle(previousStyle: Style) {
            var ts = this.Style;
            var oc = this._OwningColumn;
            var og = this.OwningGrid;
            if (ts != null && (oc == null || ts !== oc.HeaderStyle) && ((og == null || ts !== og.ColumnHeaderStyle) && ts !== previousStyle))
                return;
            var style: Style = null;
            if (oc != null)
                style = oc.HeaderStyle;
            if (style == null && og != null)
                style = og.ColumnHeaderStyle;
            Extensions.SetStyleWithType(this, style);
        }


















        private InvokeProcessSort() {
            /*
            if (this.OwningGrid.WaitForLostFocus(new Action((object) this, __methodptr(\u003CInvokeProcessSort\u003Eb__0))) || !this.OwningGrid.CommitEdit(DataGridEditingUnit.Row, true))
                return;
            this.Dispatcher.BeginInvoke(new Action((object) this, __methodptr(ProcessSort)));
            */
        }

        private OnMouseLeftButtonDown(handled: IHandledObj, mousePosition: Point) {
            this._IsPressed = true;
            if (this.OwningGrid == null || this.OwningGrid.ColumnHeaders == null)
                return;
            this.CaptureMouse();
            DataGridColumnHeader._dragMode = DataGridColumnHeader.DragMode.MouseDown;
            DataGridColumnHeader._frozenColumnsWidth = this.OwningGrid.ColumnsInternal.GetVisibleFrozenEdgedColumnsWidth();
            DataGridColumnHeader._lastMousePositionHeaders = Extensions.Translate(this, this.OwningGrid.ColumnHeaders, mousePosition);
            var x = mousePosition.X;
            var num = this.ActualWidth - x;
            var owningColumn = this.OwningColumn;
            var column = <DataGridColumn> null;
            if (!(this.OwningColumn instanceof DataGridFillerColumn))
                column = this.OwningGrid.ColumnsInternal.GetPreviousVisibleNonFillerColumn(owningColumn);
            if (DataGridColumnHeader._dragMode === DataGridColumnHeader.DragMode.MouseDown && DataGridColumnHeader._dragColumn == null && num <= 5.0)
                handled.Value = DataGridColumnHeader.TrySetResizeColumn(owningColumn);
            else if (DataGridColumnHeader._dragMode === DataGridColumnHeader.DragMode.MouseDown && DataGridColumnHeader._dragColumn == null && (x <= 5.0 && column != null))
                handled.Value = DataGridColumnHeader.TrySetResizeColumn(column);
            if (DataGridColumnHeader._dragMode !== DataGridColumnHeader.DragMode.Resize || DataGridColumnHeader._dragColumn == null)
                return;
            DataGridColumnHeader._dragStart = DataGridColumnHeader._lastMousePositionHeaders;
            DataGridColumnHeader._originalWidth = DataGridColumnHeader._dragColumn.ActualWidth;
            DataGridColumnHeader._originalHorizontalOffset = this.OwningGrid.HorizontalOffset;
            handled.Value = true;
        }

        private OnMouseLeftButtonUp(handled: IHandledObj, mousePosition: Point, mousePositionHeaders: Point) {
            this.IsPressed = false;
            if (this.OwningGrid == null || this.OwningGrid.ColumnHeaders == null)
                return;
            if (DataGridColumnHeader._dragMode == DataGridColumnHeader.DragMode.MouseDown)
                this.OnMouseLeftButtonUp_Click(handled);
            else if (DataGridColumnHeader._dragMode == DataGridColumnHeader.DragMode.Reorder) {
                var targetDisplayIndex = this.GetReorderingTargetDisplayIndex(mousePositionHeaders);
                if (!this.OwningColumn.IsFrozen && targetDisplayIndex >= this.OwningGrid.FrozenColumnCount || this.OwningColumn.IsFrozen && targetDisplayIndex < this.OwningGrid.FrozenColumnCount) {
                    this.OwningColumn.DisplayIndex = targetDisplayIndex;
                    this.OwningGrid.OnColumnReordered(new DataGridColumnEventArgs(this.OwningColumn));
                }
                this.OwningGrid.OnColumnHeaderDragCompleted(new DragCompletedEventArgs(mousePosition.X - DataGridColumnHeader._dragStart.Value.X, mousePosition.Y - DataGridColumnHeader._dragStart.Value.Y, false));
            }
            else if (DataGridColumnHeader._dragMode == DataGridColumnHeader.DragMode.Drag)
                this.OwningGrid.OnColumnHeaderDragCompleted(new DragCompletedEventArgs(0.0, 0.0, false));
            this.SetDragCursor(mousePosition);
            this.ReleaseMouseCapture();
            DataGridColumnHeader._dragMode = DataGridColumnHeader.DragMode.None;
            handled.Value = true;
        }

        private OnMouseLeftButtonUp_Click(handled: IHandledObj) {
            this.InvokeProcessSort();
            handled.Value = true;
        }

        private OnMouseMove(handled: IHandledObj, mousePosition: Point, mousePositionHeaders: Point) {
            if (handled || this.OwningGrid == null || this.OwningGrid.ColumnHeaders == null)
                return;
            var x = mousePosition.X;
            var distanceFromRight = this.ActualWidth - x;
            this.OnMouseMove_Resize(handled, mousePositionHeaders);
            this.OnMouseMove_Reorder(handled, mousePosition, mousePositionHeaders, x, distanceFromRight);
            if (DataGridColumnHeader._dragMode === DataGridColumnHeader.DragMode.MouseDown)
                DataGridColumnHeader._dragMode = DataGridColumnHeader.DragMode.Drag;
            if (DataGridColumnHeader._dragMode === DataGridColumnHeader.DragMode.Drag)
                this.OwningGrid.OnColumnHeaderDragDelta(new DragDeltaEventArgs(mousePositionHeaders.X - DataGridColumnHeader._lastMousePositionHeaders.Value.X, mousePositionHeaders.Y - DataGridColumnHeader._lastMousePositionHeaders.Value.Y));
            DataGridColumnHeader._lastMousePositionHeaders = new Point? (mousePositionHeaders);
            this.SetDragCursor(mousePosition);
        }

        private ProcessSort() {
            if (this.OwningColumn == null || this.OwningGrid == null || (this.OwningGrid.EditingRow != null || this.OwningColumn == this.OwningGrid.ColumnsInternal.FillerColumn) || (!this.OwningGrid.DataConnection.AllowSort || !this.OwningGrid.CanUserSortColumns || (!this.OwningColumn.CanUserSort || this.OwningGrid.DataConnection.SortDescriptions == null)))
                return;
            var owningGrid = this.OwningGrid;
            var ctrl = false;
            var shift = false;
            KeyboardHelper.GetMetaKeyState(out ctrl, out shift);
            var sortDescription1 = this.OwningColumn.GetSortDescription();
            var collectionView = owningGrid.DataConnection.CollectionView;
            try {
                owningGrid.OnUserSorting();
                using(collectionView.DeferRefresh())
        {
                    if (!shift || owningGrid.DataConnection.SortDescriptions.Count == 0) {
                        if (collectionView.CanGroup && collectionView.GroupDescriptions != null) {
                            for (var val1 = 0; val1 < collectionView.GroupDescriptions.Count; ++val1) {
                                var groupDescription = collectionView.GroupDescriptions[val1]as PropertyGroupDescription;
                                if (groupDescription != null && collectionView.SortDescriptions.Count <= val1 || collectionView.SortDescriptions[val1].PropertyName != groupDescription.PropertyName)
                                    collectionView.SortDescriptions.Insert(Math.min(val1, collectionView.SortDescriptions.Count), new SortDescription(groupDescription.PropertyName, ListSortDirection.Ascending));
                            }
                            while (collectionView.SortDescriptions.Count > collectionView.GroupDescriptions.Count)
                                collectionView.SortDescriptions.RemoveAt(collectionView.GroupDescriptions.Count);
                        }
                        else if (!shift)
                            owningGrid.DataConnection.SortDescriptions.Clear();
                    }
                    if (sortDescription1.HasValue) {
                        var direction = sortDescription1.Value.Direction != ListSortDirection.Ascending ? ListSortDirection.Ascending : ListSortDirection.Descending;
                        var sortDescription2 = new SortDescription(sortDescription1.Value.PropertyName, direction);
                        var index = owningGrid.DataConnection.SortDescriptions.IndexOf(sortDescription1.Value);
                        if (index >= 0) {
                            owningGrid.DataConnection.SortDescriptions.Remove(sortDescription1.Value);
                            owningGrid.DataConnection.SortDescriptions.Insert(index, sortDescription2);
                        }
                        else
                            owningGrid.DataConnection.SortDescriptions.Add(sortDescription2);
                    }
                    else {
                        var direction = ListSortDirection.Ascending;
                        var sortPropertyName = this.OwningColumn.GetSortPropertyName();
                        if (string.IsNullOrEmpty(sortPropertyName))
                            return;
                        var sortDescription2 = new SortDescription(sortPropertyName, direction);
                        owningGrid.DataConnection.SortDescriptions.Add(sortDescription2);
                    }
                }
            }
            finally {
                owningGrid.OnUserSorted();
            }
        }

        private UpdateSeparatorVisibility(lastVisibleColumn: DataGridColumn) {
            var visibility = this._DesiredSeparatorVisibility;
            if (this.OwningColumn != null && this.OwningGrid != null && (this._DesiredSeparatorVisibility === Visibility.Visible && this.OwningColumn === lastVisibleColumn) && !this.OwningGrid.ColumnsInternal.FillerColumn.IsActive)
                visibility = Visibility.Collapsed;
            if (this.SeparatorVisibility === visibility)
                return;
            Extensions.SetValueNoCallback(this, DataGridColumnHeader.SeparatorVisibilityProperty, visibility);
        }

        private CanReorderColumn(column: DataGridColumn): boolean {
            if (!this.OwningGrid.CanUserReorderColumns || column instanceof DataGridFillerColumn)
                return false;
            if (!column.CanUserReorderInternal.HasValue || !column.CanUserReorderInternal.Value)
                return !column.CanUserReorderInternal.HasValue;
            return true;
        }

        private static CanResizeColumn(column: DataGridColumn): boolean {
            if (column.OwningGrid != null && column.OwningGrid.ColumnsInternal != null && column.OwningGrid.UsesStarSizing && (column.OwningGrid.ColumnsInternal.LastVisibleColumn == column || !DoubleUtil.AreClose(column.OwningGrid.ColumnsInternal.VisibleEdgedColumnsWidth, column.OwningGrid.CellsWidth)))
                return false;
            return column.ActualCanUserResize;
        }

        private DataGridColumnHeader_LostMouseCapture(sender: any, e: Input.MouseEventArgs) {
            this.OnLostMouseCapture();
        }

        private DataGridColumnHeader_MouseEnter(sender: any, e: Input.MouseEventArgs) {
            if (!this.IsEnabled)
                return;
            this.OnMouseEnter(e.GetPosition(this));
            this.UpdateVisualState(true);
        }

        private DataGridColumnHeader_MouseLeave(sender: any, MouseEventArgs e) {
            if (!this.IsEnabled)
                return;
            this.OnMouseLeave();
            this.UpdateVisualState(true);
        }

        private DataGridColumnHeader_MouseLeftButtonDown(sender: any, e: Input.MouseButtonEventArgs) {
            if (this.OwningColumn == null || e.Handled || !this.IsEnabled)
                return;
            var position = e.GetPosition(this);
            var handled = { Value: e.Handled };
            this.OnMouseLeftButtonDown(handled, position);
            e.Handled = handled.Value;
            this.UpdateVisualState(true);
        }

        private DataGridColumnHeader_MouseLeftButtonUp(sender: any, e: Input.MouseButtonEventArgs) {
            if (this.OwningColumn == null || e.Handled || !this.IsEnabled)
                return;
            var position1 = e.GetPosition(this);
            var position2 = e.GetPosition(this.OwningGrid.ColumnHeaders);
            var handled = { Value: e.Handled };
            this.OnMouseLeftButtonUp(handled, position1, position2);
            e.Handled = handled.Value;
            this.UpdateVisualState(true);
        }

        private DataGridColumnHeader_MouseMove(sender: any, e: Input.MouseEventArgs) {
            if (this.OwningGrid == null || !this.IsEnabled)
                return;
            var position1 = e.GetPosition(this);
            var position2 = e.GetPosition(this.OwningGrid.ColumnHeaders);
            var handled = { Value: false };
            this.OnMouseMove(handled, position1, position2);
        }

        private GetReorderingTargetColumn(mousePositionHeaders: Point, scroll: boolean, out double scrollAmount): DataGridColumn {
            scrollAmount = 0.0;
            var num1 = this.OwningGrid.ColumnsInternal.RowGroupSpacerColumn.IsRepresented ? this.OwningGrid.ColumnsInternal.RowGroupSpacerColumn.ActualWidth : 0.0;
            var val1_1 = this.OwningGrid.CellsWidth;
            if (this.OwningColumn.IsFrozen)
                val1_1 = Math.Min(val1_1, DataGridColumnHeader._frozenColumnsWidth);
            else if (this.OwningGrid.FrozenColumnCount > 0)
                num1 = DataGridColumnHeader._frozenColumnsWidth;
            if (mousePositionHeaders.X < num1) {
                if (scroll && this.OwningGrid.HorizontalScrollBar != null && (this.OwningGrid.HorizontalScrollBar.Visibility == Visibility.Visible && this.OwningGrid.HorizontalScrollBar.Value > 0.0)) {
                    var val1_2 = mousePositionHeaders.X - num1;
                    scrollAmount = Math.Min(val1_2, this.OwningGrid.HorizontalScrollBar.Value);
                    this.OwningGrid.UpdateHorizontalOffset(scrollAmount + this.OwningGrid.HorizontalScrollBar.Value);
                }
                mousePositionHeaders.X = num1;
            }
            else if (mousePositionHeaders.X >= val1_1) {
                if (scroll && this.OwningGrid.HorizontalScrollBar != null && (this.OwningGrid.HorizontalScrollBar.Visibility == Visibility.Visible && this.OwningGrid.HorizontalScrollBar.Value < this.OwningGrid.HorizontalScrollBar.Maximum)) {
                    var val1_2 = mousePositionHeaders.X - val1_1;
                    scrollAmount = Math.Min(val1_2, this.OwningGrid.HorizontalScrollBar.Maximum - this.OwningGrid.HorizontalScrollBar.Value);
                    this.OwningGrid.UpdateHorizontalOffset(scrollAmount + this.OwningGrid.HorizontalScrollBar.Value);
                }
                mousePositionHeaders.X = val1_1 - 1.0;
            }
            foreach(DataGridColumn dataGridColumnStart in this.OwningGrid.ColumnsInternal.GetDisplayedColumns())
      {
                var point = Extensions.Translate(this.OwningGrid.ColumnHeaders, dataGridColumnStart.HeaderCell, mousePositionHeaders);
                var num2 = dataGridColumnStart.HeaderCell.ActualWidth / 2.0;
                if (point.X >= 0.0 && point.X <= num2)
                    return dataGridColumnStart;
                if (point.X > num2 && point.X < dataGridColumnStart.HeaderCell.ActualWidth)
                    return this.OwningGrid.ColumnsInternal.GetNextVisibleColumn(dataGridColumnStart);
            }
            return null;
        }

        private GetReorderingTargetDisplayIndex(mousePositionHeaders: Point): number {
            var scrollAmount = 0.0;
            var reorderingTargetColumn = this.GetReorderingTargetColumn(mousePositionHeaders, false, out scrollAmount);
            if (reorderingTargetColumn == null)
                return this.OwningGrid.Columns.Count - 1;
            if (reorderingTargetColumn.DisplayIndex <= this.OwningColumn.DisplayIndex)
                return reorderingTargetColumn.DisplayIndex;
            else
                return reorderingTargetColumn.DisplayIndex - 1;
        }

        private IsReorderTargeted(mousePosition: Point, element: FrameworkElement, ignoreVertical: boolean): boolean {
            var point = Extensions.Translate(this, element, mousePosition);
            if (point.X >= 0.0 && (point.X < 0.0 || point.X > element.ActualWidth / 2.0))
                return false;
            if (ignoreVertical)
                return true;
            if (point.Y >= 0.0)
                return point.Y <= element.ActualHeight;
            else
                return false;
        }

        private OnLostMouseCapture() {
            if (DataGridColumnHeader._dragColumn != null && DataGridColumnHeader._dragColumn.HeaderCell != null)
                DataGridColumnHeader._dragColumn.HeaderCell.Cursor = DataGridColumnHeader._originalCursor;
            DataGridColumnHeader._dragMode = DataGridColumnHeader.DragMode.None;
            DataGridColumnHeader._dragColumn = null;
            DataGridColumnHeader._dragStart = null;
            DataGridColumnHeader._lastMousePositionHeaders = null;
            if (this.OwningGrid == null || this.OwningGrid.ColumnHeaders == null)
                return;
            this.OwningGrid.ColumnHeaders.DragColumn = null;
            this.OwningGrid.ColumnHeaders.DragIndicator = null;
            this.OwningGrid.ColumnHeaders.DropLocationIndicator = null;
        }

        private OnMouseEnter(mousePosition: Point) {
            this.IsMouseOver = true;
            this.SetDragCursor(mousePosition);
        }

        private OnMouseLeave() {
            this.IsMouseOver = false;
        }

        private OnMouseMove_BeginReorder(mousePosition: Point) {
            var gridColumnHeader = new DataGridColumnHeader();
            gridColumnHeader.OwningColumn = this.OwningColumn;
            gridColumnHeader.IsEnabled = false;
            gridColumnHeader.Content = this.Content;
            gridColumnHeader.ContentTemplate = this.ContentTemplate;
            var control = new ContentControl();
            Extensions.SetStyleWithType(control, this.OwningGrid.DropLocationIndicatorStyle);
            if (this.OwningColumn.DragIndicatorStyle != null)
                Extensions.SetStyleWithType(gridColumnHeader, this.OwningColumn.DragIndicatorStyle);
            else if (this.OwningGrid.DragIndicatorStyle != null)
                Extensions.SetStyleWithType(gridColumnHeader, this.OwningGrid.DragIndicatorStyle);
            if (isNaN(gridColumnHeader.Width))
                gridColumnHeader.Width = this.ActualWidth;
            if (isNaN(control.Height))
                control.Height = this.ActualHeight;
            var reorderingEventArgs = new DataGridColumnReorderingEventArgs(this.OwningColumn);
            reorderingEventArgs.DropLocationIndicator = control;
            reorderingEventArgs.DragIndicator = gridColumnHeader;
            var e = reorderingEventArgs;
            this.OwningGrid.OnColumnReordering(e);
            if (e.Cancel)
                return;
            DataGridColumnHeader._dragColumn = this.OwningColumn;
            DataGridColumnHeader._dragMode = DataGridColumnHeader.DragMode.Reorder;
            DataGridColumnHeader._dragStart = new Point? (mousePosition);
            this.OwningGrid.ColumnHeaders.DragColumn = this.OwningColumn;
            this.OwningGrid.ColumnHeaders.DragIndicator = e.DragIndicator;
            this.OwningGrid.ColumnHeaders.DropLocationIndicator = e.DropLocationIndicator;
        }

        private OnMouseMove_Reorder(handled: IHandledObj, mousePosition: Point, mousePositionHeaders: Point, distanceFromLeft: number, distanceFromRight: number) {
            if (handled.Value)
                return;
            if (DataGridColumnHeader._dragMode == DataGridColumnHeader.DragMode.MouseDown && DataGridColumnHeader._dragColumn == null && (distanceFromRight > 5.0 && distanceFromLeft > 5.0)) {
                this.OwningGrid.OnColumnHeaderDragStarted(new DragStartedEventArgs(mousePositionHeaders.X - DataGridColumnHeader._lastMousePositionHeaders.Value.X, mousePositionHeaders.Y - DataGridColumnHeader._lastMousePositionHeaders.Value.Y));
                handled.Value = this.CanReorderColumn(this.OwningColumn);
                if (handled.Value)
                    this.OnMouseMove_BeginReorder(mousePosition);
            }
            if (DataGridColumnHeader._dragMode != DataGridColumnHeader.DragMode.Reorder || this.OwningGrid.ColumnHeaders.DragIndicator == null)
                return;
            this.OwningGrid.OnColumnHeaderDragDelta(new DragDeltaEventArgs(mousePositionHeaders.X - DataGridColumnHeader._lastMousePositionHeaders.Value.X, mousePositionHeaders.Y - DataGridColumnHeader._lastMousePositionHeaders.Value.Y));
            var scrollAmount = 0.0;
            var reorderingTargetColumn = this.GetReorderingTargetColumn(mousePositionHeaders, !this.OwningColumn.IsFrozen, out scrollAmount);
            this.OwningGrid.ColumnHeaders.DragIndicatorOffset = mousePosition.X - DataGridColumnHeader._dragStart.Value.X + scrollAmount;
            this.OwningGrid.ColumnHeaders.InvalidateArrange();
            if (this.OwningGrid.ColumnHeaders.DropLocationIndicator != null) {
                var fromPoint = new Point(0.0, 0.0);
                var point: Point = null;
                if (reorderingTargetColumn == null || reorderingTargetColumn == this.OwningGrid.ColumnsInternal.FillerColumn || reorderingTargetColumn.IsFrozen != this.OwningColumn.IsFrozen) {
                    var lastColumn = this.OwningGrid.ColumnsInternal.GetLastColumn(true, this.OwningColumn.IsFrozen, null);
                    point = Extensions.Translate(lastColumn.HeaderCell, this.OwningGrid.ColumnHeaders, fromPoint);
                    point.X += lastColumn.ActualWidth;
                }
                else
                    point = Extensions.Translate(reorderingTargetColumn.HeaderCell, this.OwningGrid.ColumnHeaders, fromPoint);
                this.OwningGrid.ColumnHeaders.DropLocationIndicatorOffset = point.X - scrollAmount;
            }
            handled.Value = true;
        }

        private OnMouseMove_Resize(handled: IHandledObj, mousePositionHeaders: Point) {
            if (handled.Value || DataGridColumnHeader._dragMode != DataGridColumnHeader.DragMode.Resize || (DataGridColumnHeader._dragColumn == null || !DataGridColumnHeader._dragStart.HasValue))
                return;
            var num = mousePositionHeaders.X - DataGridColumnHeader._dragStart.Value.X;
            var val2 = DataGridColumnHeader._originalWidth + num;
            var displayValue = Math.Max(DataGridColumnHeader._dragColumn.ActualMinWidth, Math.Min(DataGridColumnHeader._dragColumn.ActualMaxWidth, val2));
            DataGridColumnHeader._dragColumn.Resize(DataGridColumnHeader._dragColumn.Width.Value, DataGridColumnHeader._dragColumn.Width.UnitType, DataGridColumnHeader._dragColumn.Width.DesiredValue, displayValue, true);
            this.OwningGrid.UpdateHorizontalOffset(DataGridColumnHeader._originalHorizontalOffset);
            handled.Value = true;
        }

        private SetDragCursor(mousePosition: Point) {
            if (DataGridColumnHeader._dragMode !== DataGridColumnHeader.DragMode.None || this.OwningGrid == null || this.OwningColumn == null)
                return;
            var x = mousePosition.X;
            var num = this.ActualWidth - x;
            var owningColumn = this.OwningColumn;
            var column = <DataGridColumn> null;
            if (!(this.OwningColumn instanceof DataGridFillerColumn))
                column = this.OwningGrid.ColumnsInternal.GetPreviousVisibleNonFillerColumn(owningColumn);
            if (num <= 5.0 && owningColumn != null && DataGridColumnHeader.CanResizeColumn(owningColumn) || x <= 5.0 && column != null && DataGridColumnHeader.CanResizeColumn(column)) {
                if (this.Cursor === Cursors.SizeWE)
                    return;
                DataGridColumnHeader._originalCursor = this.Cursor;
                this.Cursor = Cursors.SizeWE;
            } else
                this.Cursor = DataGridColumnHeader._originalCursor;
        }

        private static TrySetResizeColumn(column: DataGridColumn): boolean {
            if (!DataGridColumnHeader.CanResizeColumn(column))
                return false;
            DataGridColumnHeader._dragColumn = column;
            DataGridColumnHeader._dragMode = DataGridColumnHeader.DragMode.Resize;
            return true;
        }
    }
    Fayde.RegisterType(DataGridColumnHeader, {
        Name: "DataGridColumnHeader",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: "MyDataStuff"//Fayde.XMLNS
    });
}