
module Fayde.Controls.Primitives {
    export class ScrollData {
        CanHorizontallyScroll: boolean = false;
        CanVerticallyScroll: boolean = false;
        ScrollOwner: ScrollViewer = null;
        OffsetX: number = 0;
        OffsetY: number = 0;
        CachedOffsetX: number = 0;
        CachedOffsetY: number = 0;
        ViewportWidth: number = 0;
        ViewportHeight: number = 0;
        ExtentWidth: number = 0;
        ExtentHeight: number = 0;
        MaxDesiredWidth: number = 0;
        MaxDesiredHeight: number = 0;
    }
}