module Fayde.Controls.Internal {
    var LineChange = 16.0;
    export class ScrollExtensions {
        static LineUp(viewer: ScrollViewer) {
            scrollByVerticalOffset(viewer, -16.0);
        }
        static LineDown(viewer: ScrollViewer) {
            scrollByVerticalOffset(viewer, 16.0);
        }
        static LineLeft(viewer: ScrollViewer) {
            scrollByHorizontalOffset(viewer, -16.0);
        }
        static LineRight(viewer: ScrollViewer) {
            scrollByHorizontalOffset(viewer, 16.0);
        }

        static PageUp(viewer: ScrollViewer) {
            scrollByVerticalOffset(viewer, -viewer.ViewportHeight);
        }
        static PageDown(viewer: ScrollViewer) {
            scrollByVerticalOffset(viewer, viewer.ViewportHeight);
        }
        static PageLeft(viewer: ScrollViewer) {
            scrollByHorizontalOffset(viewer, -viewer.ViewportWidth);
        }
        static PageRight(viewer: ScrollViewer) {
            scrollByHorizontalOffset(viewer, viewer.ViewportWidth);
        }

        static ScrollToTop(viewer: ScrollViewer) {
            viewer.ScrollToVerticalOffset(0.0);
        }
        static ScrollToBottom(viewer: ScrollViewer) {
            viewer.ScrollToVerticalOffset(viewer.ExtentHeight);
        }

        static GetTopAndBottom(element: FrameworkElement, parent: FrameworkElement, top: IOutValue, bottom: IOutValue) {
            var xform = element.TransformToVisual(parent);
            top.Value = xform.Transform(new Point(0.0, 0.0)).Y;
            bottom.Value = xform.Transform(new Point(0.0, element.ActualHeight)).Y;
        }
    }

    function scrollByVerticalOffset(viewer: ScrollViewer, offset: number) {
        offset += viewer.VerticalOffset;
        offset = Math.max(Math.min(offset, viewer.ExtentHeight), 0.0);
        viewer.ScrollToVerticalOffset(offset);
    }
    function scrollByHorizontalOffset(viewer: ScrollViewer, offset: number) {
        offset += viewer.HorizontalOffset;
        offset = Math.max(Math.min(offset, viewer.ExtentWidth), 0.0);
        viewer.ScrollToHorizontalOffset(offset);
    }
}