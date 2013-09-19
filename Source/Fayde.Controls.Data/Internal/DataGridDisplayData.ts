/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls.Internal {
    export class DataGridDisplayData {
        FirstDisplayedScrollingCol = -1;
        FirstScrollingSlot = 0;
        LastScrollingSlot = 0;
        LastTotallyDisplayedScrollingCol = -1;
        NumDisplayedScrollingElements = 0;
        NumTotallyDisplayedScrollingElements = 0;
        PendingVerticalScrollHeight = 0.0;

        private _Owner: DataGrid;
        private _scrollingElements: UIElement[] = [];
        private _recyclableGroupHeaders: DataGridRowGroupHeader[] = [];
        private _recyclableRows: DataGridRow[] = [];
        private _fullyRecycledGroupHeaders: DataGridRowGroupHeader[] = [];
        private _fullyRecycledRows: DataGridRow[] = [];

        constructor(owner: DataGrid) {
            this._Owner = owner;
            this.ResetSlotIndexes();
        }

        private AddRecylableRow(row: DataGridRow) {
            row.DetachFromDataGrid(true);
            this._recyclableRows.push(row);
        }
        private AddRecylableRowGroupHeader(groupHeader: DataGridRowGroupHeader) {
            groupHeader.IsRecycled = true;
            this._recyclableGroupHeaders.push(groupHeader);
        }
        private ClearElements(recycle: boolean) {
            this.ResetSlotIndexes();
            if (recycle) {
                var len = this._scrollingElements.length;
                for (var i = 0; i < len; i++) {
                    var uiElement = this._scrollingElements[i];
                    var row = <DataGridRow>uiElement;
                    if (row instanceof DataGridRow) {
                        if (row.IsRecyclable)
                            this.AddRecylableRow(row);
                        else
                            row.Clip = new Media.RectangleGeometry();
                    } else {
                        var groupHeader = <DataGridRowGroupHeader>uiElement;
                        if (groupHeader instanceof DataGridRowGroupHeader)
                            this.AddRecylableRowGroupHeader(groupHeader);
                    }
                }
            } else {
                this._recyclableRows = [];
                this._fullyRecycledRows = [];
                this._recyclableGroupHeaders = [];
                this._fullyRecycledGroupHeaders = [];
            }
            this._scrollingElements = [];
        }
        private CorrectSlotsAfterDeletion(slot: number, wasCollapsed: boolean) {
            if (wasCollapsed) {
                if (slot > this.FirstScrollingSlot)
                    --this.LastScrollingSlot;
            } else if (this._Owner.IsSlotVisible(slot))
                this.UnloadScrollingElement(slot, true, true);
            if (slot >= this.FirstScrollingSlot)
                return;
            --this.FirstScrollingSlot;
            --this.LastScrollingSlot;
        }
        private CorrectSlotsAfterInsertion(slot: number, element: UIElement, isCollapsed: boolean) {
            if (slot < this.FirstScrollingSlot) {
                ++this.FirstScrollingSlot;
                ++this.LastScrollingSlot;
            } else if (isCollapsed && slot <= this.LastScrollingSlot) {
                ++this.LastScrollingSlot;
            } else {
                if (this._Owner.GetPreviousVisibleSlot(slot) > this.LastScrollingSlot && this.LastScrollingSlot !== -1)
                    return;
                this.LoadScrollingSlot(slot, element, true);
            }
        }
        private GetCircularListIndex(slot: number, wrap: boolean): number {
            var num = slot - this.FirstScrollingSlot - this._headScrollingElements - this._Owner.GetCollapsedSlotCount(this.FirstScrollingSlot, slot);
            if (!wrap)
                return num;
            else
                return num % this._scrollingElements.length;
        }
        private FullyRecycleElements() {
            while (this._recyclableRows.length > 0) {
                var dataGridRow = this._recyclableRows.pop();
                dataGridRow.Visibility = Visibility.Collapsed;
                this._fullyRecycledRows.push(dataGridRow);
            }
            while (this._recyclableGroupHeaders.length > 0) {
                var gridRowGroupHeader = this._recyclableGroupHeaders.pop();
                gridRowGroupHeader.Visibility = Visibility.Collapsed;
                this._fullyRecycledGroupHeaders.push(gridRowGroupHeader);
            }
        }
        private GetDisplayedElement(slot: number): UIElement {
            return this._scrollingElements[this.GetCircularListIndex(slot, true)];
        }
        private GetDisplayedRow(rowIndex: number): DataGridRow {
            var row = <DataGridRow>this.GetDisplayedElement(this._Owner.SlotFromRowIndex(rowIndex));
            if (row instanceof DataGridRow)
                return row;
            return null;
        }
        GetScrollingElements(filter?: (uie: UIElement) => boolean): UIElement[] {
            if (!filter)
                return this._scrollingElements.slice(0);
            return this._scrollingElements.filter(filter);
        }
        private GetScrollingRows(): UIElement[] {
            return this.GetScrollingElements((uie: UIElement) => uie instanceof DataGridRow);
        }
        private GetUsedGroupHeader(): DataGridRowGroupHeader {
            if (this._recyclableGroupHeaders.length > 0)
                return this._recyclableGroupHeaders.pop();
            if (this._fullyRecycledGroupHeaders.length <= 0)
                return null;
            var gridRowGroupHeader = this._fullyRecycledGroupHeaders.pop();
            gridRowGroupHeader.Visibility = Visibility.Visible;
            return gridRowGroupHeader;
        }
        private GetUsedRow(): DataGridRow {
            if (this._recyclableRows.length > 0)
                return this._recyclableRows.pop();
            if (this._fullyRecycledRows.length <= 0)
                return null;
            var dataGridRow = this._fullyRecycledRows.Pop();
            dataGridRow.Visibility = Visibility.Visible;
            return dataGridRow;
        }
        private LoadScrollingSlot(slot: number, element: UIElement, updateSlotInformation: boolean) {
            if (this._scrollingElements.length === 0) {
                this.SetScrollingSlots(slot);
                this._scrollingElements.push(element);
            } else {
                if (updateSlotInformation) {
                    if (slot < this.FirstScrollingSlot)
                        this.FirstScrollingSlot = slot;
                    else
                        this.LastScrollingSlot = this._owner.GetNextVisibleSlot(this.LastScrollingSlot);
                }
                var circularListIndex = this.GetCircularListIndex(slot, false);
                if (circularListIndex > this._scrollingElements.length) {
                    circularListIndex -= this._scrollingElements.length;
                    ++this._headScrollingElements;
                }
                this._scrollingElements.Insert(circularListIndex, element);
            }
        }
        private ResetSlotIndexes() {
            this.SetScrollingSlots(-1);
            this.NumTotallyDisplayedScrollingElements = 0;
            this._headScrollingElements = 0;
        }
        private SetScrollingSlots(newValue: number) {
            this.FirstScrollingSlot = newValue;
            this.LastScrollingSlot = newValue;
        }
        private UnloadScrollingElement(slot: number, updateSlotInformation: boolean, wasDeleted: boolean) {
            var circularListIndex = this.GetCircularListIndex(slot, false);
            if (circularListIndex > this._scrollingElements.length) {
                circularListIndex -= this._scrollingElements.length;
                --this._headScrollingElements;
            }
            this._scrollingElements.RemoveAt(circularListIndex);
            if (!updateSlotInformation)
                return;
            if (slot === this.FirstScrollingSlot && !wasDeleted)
                this.FirstScrollingSlot = this._owner.GetNextVisibleSlot(this.FirstScrollingSlot);
            else
                this.LastScrollingSlot = this._owner.GetPreviousVisibleSlot(this.LastScrollingSlot);
            if (this.LastScrollingSlot >= this.FirstScrollingSlot)
                return;
            this.ResetSlotIndexes();
        }
    }
}