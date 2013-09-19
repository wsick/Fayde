/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    var MAX_BYTE_VALUE = 255;

    export class DataGridRowHeader extends ContentControl {
        static SeparatorBrushProperty = DependencyProperty.Register("SeparatorBrush", () => Media.Brush, DataGridRowHeader);
        static SeparatorVisibilityProperty = DependencyProperty.Register("SeparatorVisibility", () => Visibility, DataGridRowHeader);
        SeparatorBrush: Media.Brush;
        SeparatorVisibility: Visibility;

        private _RootElement: FrameworkElement = null;
        private Owner: Control;
        private get OwningRow(): DataGridRow {
            var o = <DataGridRow>this.Owner;
            if (o instanceof DataGridRow)
                return o;
            return null;
        }
        private get OwningGrid(): DataGrid {
            var or = this.OwningRow;
            if (or != null)
                return or.OwningGrid;
            var orgh = this.OwningRowGroupHeader;
            if (orgh != null)
                return orgh.OwningGrid;
            return null;
        }
        private get OwningRowGroupHeader(): DataGridRowGroupHeader {
            var orgh = <DataGridRowGroupHeader>this.Owner;
            if (orgh instanceof DataGridRowGroupHeader)
                return orgh;
            return null;
        }
        private get Slot(): number {
            var or = this.OwningRow;
            if (or != null)
                return or.Slot;
            var orgh = this.OwningRowGroupHeader;
            if (orgh != null)
                return orgh.RowGroupInfo.Slot;
            else
                return -1;
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this._RootElement = <FrameworkElement>this.GetTemplateChild("Root");
            if (!(this._RootElement instanceof FrameworkElement)) {
                this._RootElement = null;
                return;
            }
            this.ApplyOwnerStatus(false);
        }

        _MeasureOverride(availableSize: size, error: BError): size {
            var owningGrid = this.OwningGrid;
            if (this.OwningRow == null || owningGrid == null)
                return super._MeasureOverride(availableSize, error);
            var height = isNaN(owningGrid.RowHeight) ? availableSize.Height : owningGrid.RowHeight;
            var s = super._MeasureOverride(size.fromRaw(isNaN(owningGrid.RowHeaderWidth) ? availableSize.Width : owningGrid.RowHeaderWidth, height), error);
            if (!isNaN(owningGrid.RowHeaderWidth) || s.Width < owningGrid.ActualRowHeaderWidth)
                return size.fromRaw(owningGrid.ActualRowHeaderWidth, s.Height);
            else
                return s;
        }

        private ApplyOwnerStatus(animate: boolean) {
            if (this._RootElement == null || this.Owner == null || this.Owner.Visibility !== Visibility.Visible)
                return;
            var num1 = 0;
            var owningRow = this.OwningRow;
            var owningGrid = this.OwningGrid;
            if (owningRow != null) {
                if (owningRow.IsValid)
                    Media.VSM.VisualStateManager.GoToState(this, "RowValid", false);
                else
                    Media.VSM.VisualStateManager.GoToState(this, "RowInvalid", false);
                if (owningGrid != null) {
                    if (owningGrid.CurrentSlot === owningRow.Slot)
                        num1 += 16;
                    if (owningGrid.ContainsFocus)
                        ++num1;
                }
                if (owningRow.IsSelected || owningRow.IsEditing)
                    num1 += 8;
                if (owningRow.IsEditing)
                    num1 += 4;
                if (owningRow.IsMouseOver)
                    num1 += 2;
            } else {
                var orgh = this.OwningRowGroupHeader;
                if (orgh != null && owningGrid != null && owningGrid.CurrentSlot === orgh.RowGroupInfo.Slot)
                    num1 += 16;
            }
            var num2 = DataGridRowHeader._idealStateMapping[num1];
            while (num2 !== MAX_BYTE_VALUE && (!Media.VSM.VisualStateManager.GoToState(this, DataGridRowHeader._stateNames[num2], animate) && !Media.VSM.VisualStateManager.GoToState(this, DataGridRowHeader._legacyStateNames[num2], animate)))
                num2 = DataGridRowHeader._fallbackStateMapping[num2];
        }
        private EnsureStyle(previousStyle: Style) {
            var owningRow = this.OwningRow;
            var owningGrid = this.OwningGrid;
            var ts = this.Style;
            var orgh = this.OwningRowGroupHeader;
            if (ts != null && owningRow != null && (ts !== owningRow.HeaderStyle && orgh != null) && (ts !== orgh.HeaderStyle && owningGrid != null && (ts !== owningGrid.RowHeaderStyle && ts !== previousStyle)))
                return;
            var style: Style = null;
            if (owningRow != null)
                style = owningRow.HeaderStyle;
            if (style == null && owningGrid != null)
                style = owningGrid.RowHeaderStyle;
            Extensions.SetStyleWithType(this, style);
        }
        OnMouseEnter(e: Input.MouseEventArgs) {
            var owningRow = this.OwningRow;
            if (owningRow != null)
                owningRow.IsMouseOver = true;
        }
        OnMouseLeave(e: Input.MouseEventArgs) {
            var owningRow = this.OwningRow;
            if (owningRow != null)
                owningRow.IsMouseOver = false;
        }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            var owningGrid = this.OwningGrid;
            if (owningGrid == null)
                return;
            if (!e.Handled && owningGrid.IsTabStop)
                owningGrid.Focus();
            if (this.OwningRow == null)
                return;
            e.Handled = owningGrid.UpdateStateOnMouseLeftButtonDown(e, -1, this.Slot, false);
            owningGrid.UpdatedStateOnMouseLeftButtonDown = true;
        }
    }
    Fayde.RegisterType(DataGridRowHeader, {
        Name: "DataGridRowHeader",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: Fayde.XMLNS
    });
}