/// <reference path="ContentControl.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class ScrollViewer extends ContentControl {
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        VerticalScrollBarVisibility: ScrollBarVisibility;

        private _ScrollInfo: Primitives.IScrollInfo;
        get ScrollInfo(): Primitives.IScrollInfo { return this._ScrollInfo; }
        set ScrollInfo(value: Primitives.IScrollInfo) {
            this._ScrollInfo = value;
            if (value) {
                value.CanHorizontallyScroll = this.HorizontalScrollBarVisibility !== ScrollBarVisibility.Disabled;
                value.CanVerticallyScroll = this.VerticalScrollBarVisibility !== ScrollBarVisibility.Disabled;
            }
        }

        InvalidateScrollInfo() {
            //TODO: Implement
        }
    }
    Nullstone.RegisterType(ScrollViewer, "ScrollViewer");
}