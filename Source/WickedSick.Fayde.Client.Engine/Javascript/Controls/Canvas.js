/// <reference path="Panel.js" />
/// CODE

(function (namespace) {
    var Canvas = Nullstone.Create("Canvas", namespace.Panel);

    Canvas.Instance.InitSpecific = function () {
        this._Metrics = new Fayde.Controls.CanvasMetrics();
    };

    //#region Properties

    Canvas.LeftProperty = DependencyProperty.RegisterAttached("Left", function () { return Number; }, Canvas, 0.0);
    Canvas.GetLeft = function (d) {
        return d.$GetValue(Canvas.LeftProperty);
    };
    Canvas.SetLeft = function (d, value) {
        d.$SetValue(Canvas.LeftProperty, value);
    };

    Canvas.TopProperty = DependencyProperty.RegisterAttached("Top", function () { return Number; }, Canvas, 0.0);
    Canvas.GetTop = function (d) {
        return d.$GetValue(Canvas.TopProperty);
    };
    Canvas.SetTop = function (d, value) {
        d.$SetValue(Canvas.TopProperty, value);
    };

    //#endregion

    //#region Measure/Arrange

    Canvas.Instance._MeasureOverride = function (availableSize, pass, error) {
        var childSize = size.createInfinite();
        var walker = new Fayde._VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            child._Measure(childSize, error);
        }
        return new size();
    };
    Canvas.Instance._ArrangeOverride = function (finalSize, pass, error) {
        var walker = new Fayde._VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            var childFinal = rect.fromSize(child._DesiredSize);
            childFinal.X = Canvas.GetLeft(child);
            childFinal.Y = Canvas.GetTop(child);
            child._Arrange(childFinal, error);
        }
        return finalSize;
    };

    //#endregion

    Canvas.Instance.IsLayoutContainer = function () {
        var walker = new Fayde._DeepTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            if (!(child instanceof Canvas) && child.IsLayoutContainer())
                return true;
        }
        return false;
    };

    Canvas.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== Canvas) {
            this._OnPropertyChanged$Panel(args, error);
            return;
        }

        if (args.Property._ID === Canvas.TopProperty._ID
            || args.Property._ID === Canvas.LeftProperty._ID) {
            if (this.GetVisualParent() == null) {
                this._UpdateTransform();
                this._InvalidateArrange();
            }
        }

        this.PropertyChanged.Raise(this, args);
    };
    Canvas.Instance._OnCollectionItemChanged = function (col, obj, args) {
        if (col === this._UpdatePass.Panel.Children) {
            if (args.Property._ID === Canvas.TopProperty._ID
                || args.Property._ID === Canvas.LeftProperty._ID) {
                var child = obj;
                var childFinal = rect.fromSize(child._DesiredSize);
                childFinal.X = Canvas.GetLeft(child);
                childFinal.Y = Canvas.GetTop(child);
                if (child.UseLayoutRounding) {
                    childFinal.X = Math.round(childFinal.X);
                    childFinal.Y = Math.round(childFinal.Y);
                    childFinal.Width = Math.round(childFinal.Width);
                    childFinal.Height = Math.round(childFinal.Height);
                }

                Fayde.LayoutInformation.SetLayoutSlot(child, childFinal);
                child._InvalidateArrange();
                this._UpdatePass.IsLayoutContainer = this.IsLayoutContainer();
                return;
            }
        }
        this._OnCollectionItemChanged$Panel(col, obj, args);
    };

    namespace.Canvas = Nullstone.FinishCreate(Canvas);
})(Nullstone.Namespace("Fayde.Controls"));