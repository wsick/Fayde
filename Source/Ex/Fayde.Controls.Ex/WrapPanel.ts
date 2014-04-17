module Fayde.Controls {
    export class WrapPanel extends Fayde.Controls.Panel {
        static OrientationProperty = DependencyProperty.
            Register("Orientation", () => new Enum(Fayde.Orientation), WrapPanel, Fayde.Orientation.Horizontal, (d, args) => (<WrapPanel>d).OnPropertyChange());
        Orientation: Fayde.Orientation;
       
        static ItemWidthProperty = DependencyProperty.
            Register("ItemWidth", () => Number, WrapPanel, Number.NaN, (d, args) => (<WrapPanel>d).OnPropertyChange());
        ItemWidth: number;
       
        static ItemHeightProperty = DependencyProperty.
            Register("ItemHeight", () => Number, WrapPanel, Number.NaN, (d, args) => (<WrapPanel>d).OnPropertyChange());
        ItemHeight: number;

        private OnPropertyChange() {
            this.InvalidateMeasure();
        }

        MeasureOverride(availableSize: size): size {
            var measured = new size();
            if (this.Orientation === Fayde.Orientation.Vertical) {
                if (!isNaN(this.Width))
                    availableSize.Width = this.Width;
                availableSize.Width = Math.min(availableSize.Width, this.MaxWidth);
                availableSize.Width = Math.max(availableSize.Width, this.MinWidth);
            } else {
                if (!isNaN(this.Height))
                    availableSize.Height = this.Height;
                availableSize.Height = Math.min(availableSize.Height, this.MaxHeight);
                availableSize.Height = Math.max(availableSize.Height, this.MinHeight);
            }
            var colWidth = 0;
            var rowHeight = 0;
            var offsetX = 0;
            var offsetY = 0;
            for (var i = 0; i < this.Children.Count; i++) {
                var child = <Fayde.FrameworkElement>this.Children.GetValueAt(i);
                if (child != null) {
                    if (isNaN(child.Width) && !isNaN(this.ItemWidth))
                        child.Width = this.ItemWidth;
                    if (isNaN(child.Height) && !isNaN(this.ItemHeight))
                        child.Height = this.ItemHeight;
                }
                child.Measure(availableSize);
                var s = child.DesiredSize;

                if (this.Orientation === Fayde.Orientation.Vertical) {
                    if (availableSize.Height < (offsetY + s.Height)) {  // needs to start another col
                        offsetX += colWidth;
                        offsetY = 0; //reset offsetY to 0
                        colWidth = 0; //reset col spacing
                    }
                    colWidth = Math.max(colWidth, s.Width);
                    measured.Height = Math.max(measured.Height, offsetY + s.Height);
                    measured.Width = Math.max(measured.Width, offsetX + s.Width);
                    offsetY += s.Height;
                } else {
                    if (availableSize.Width < (offsetX + s.Width)) {  // needs to start another row
                        offsetX = 0;  // reset offsetX to 0
                        offsetY += rowHeight;
                        rowHeight = 0;  //reset row height
                    }
                    rowHeight = Math.max(rowHeight, s.Height);

                    measured.Height = Math.max(measured.Height, offsetY + s.Height);
                    measured.Width = Math.max(measured.Width, offsetX + s.Width);
                    offsetX += s.Width;
                }
            }
            return measured;
        }

        ArrangeOverride(finalSize: size): size {
            var arranged = size.copyTo(finalSize);
            var offsetX = 0;
            var offsetY = 0;
            var colWidth = 0;
            var rowHeight = 0;
            var childFinal = new rect();
            for (var i = 0; i < this.Children.Count; i++) {
                var child = this.Children.GetValueAt(i);
                var s = child.DesiredSize;
                if (this.Orientation === Fayde.Orientation.Vertical) {
                    if (finalSize.Height < (offsetY + s.Height)) {  // needs to start another col
                        offsetX += colWidth;   //and colWidth
                        offsetY = 0;           //reset OffsetY to top
                        colWidth = 0;          //reset colWidth
                    }
                    colWidth = Math.max(colWidth, s.Width);
                    rect.set(childFinal, offsetX, offsetY, s.Width, s.Height);
                    child.Arrange(childFinal);
                    offsetY += s.Height;
                } else {
                    if (finalSize.Width < (offsetX + s.Width)) {  // needs to start another row
                        offsetX = 0;  // reset offsetX to 0
                        offsetY += rowHeight; //offsetY + lastrow height
                        rowHeight = 0;  //reset row spacing
                    }
                    rowHeight = Math.max(rowHeight, s.Height);
                    rect.set(childFinal, offsetX, offsetY, s.Width, s.Height);
                    child.Arrange(childFinal);
                    offsetX += s.Width;
                }
            }
            if (this.Orientation === Fayde.Orientation.Vertical)
                arranged.Height = Math.max(arranged.Height, finalSize.Height);
            else
                arranged.Width = Math.max(arranged.Width, finalSize.Width);

            return arranged;
        }
    }
}
