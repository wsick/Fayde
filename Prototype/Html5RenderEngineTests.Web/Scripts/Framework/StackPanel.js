/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="Panel.js" />

var Orientation = {
    Vertical: "Vertical",
    Horizontal: "Horizontal"
};

function StackPanel() {
    this._OrientationChanged = function (d, e) {
        if (!d)
            return;
        d.InvalidateMeasure();
        d.InvalidateArrange();
    };
    this.GetOrientation = function () {
        return this.GetValue(StackPanel.OrientationProperty);
    };
    this.SetOrientation = function (value) {
        this.SetValue(StackPanel.OrientationProperty, value);
    };
    this.MeasureOverride = function (constraint) {
        var childAvailable = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        var measured = new Size(0, 0);

        if (this.GetOrientation() == Orientation.Vertical) {
            childAvailable.Width = constraint.Width;
            if (isNaN(this.Width))
                childAvailable.Width = this.Width;
            childAvailable.Width = Math.min(childAvailable.Width, this.MaxWidth);
            childAvailable.Width = Math.max(childAvailable.Width, this.MinWidth);
        } else {
            childAvailable.Height = constraint.Height;
            if (isNaN(this.Height))
                childAvailable.Height = this.Height;
            childAvailable.Height = Math.min(childAvailable.Height, this.MaxHeight);
            childAvailable.Height = Math.max(childAvailable.Height, this.MinHeight);
        }

        for (var i = 0; i < this.Children.length; i++) {
            var child = this.Children[i];
            child.Measure(childAvailable);
            var size = child.DesiredSize;

            if (this.GetOrientation() == Orientation.Vertical) {
                measured.Height += size.Height;
                measured.Width = Math.max(measured.Width, size.Width);
            } else {
                measured.Width += size.Width;
                measured.Height = Math.max(measured.Height, size.Height);
            }
        }

        return measured;
    };
    this.ArrangeOverride = function (arrangeSize) {
        var arranged = arrangeSize;

        if (this.GetOrientation() == Orientation.Vertical)
            arranged.Height = 0;
        else
            arranged.Width = 0;

        for (var i = 0; i < this.Children.length; i++) {
            var child = this.Children[i];
            var size = child.DesiredSize;

            if (this.GetOrientation() == Orientation.Vertical) {
                size.Width = arrangeSize.Width;

                var childFinal = new Rect(0, arranged.Height, size.Width, size.Height);

                if (childFinal.IsEmpty())
                    child.Arrange(new Rect());
                else
                    child.Arrange(childFinal);

                arranged.Width = Math.max(arranged.Width, size.Width);
                arranged.Height += size.Height;
            } else {
                size.Height = arrangeSize.Height;

                var childFinal = new Rect(arranged.Width, 0, size.Width, size.Height);
                if (childFinal.IsEmpty())
                    child.Arrange(new Rect());
                else
                    child.Arrange(childFinal);

                arranged.Width += size.Width;
                arranged.Height = Math.max(arranged.Height, size.Height);
            }

            if (this.GetOrientation() == Orientation.Vertical)
                arranged.Height = Math.max(arranged.Height, arrangeSize.Height);
            else
                arranged.Width = Math.max(arranged.Width, arrangeSize.Width);

            return arranged;
        }
    };
}
StackPanel.OrientationProperty = DependencyProperty.Register("Orientation", StackPanel, Orientation.Horizontal);
StackPanel.prototype = new Panel();