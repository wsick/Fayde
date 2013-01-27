/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// CODE

(function (namespace) {
    var UserControl = Nullstone.Create("UserControl", namespace.Control);

    //#region Properties

    UserControl.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, UserControl);

    Nullstone.AutoProperties(UserControl, [
        UserControl.ContentProperty
    ]);

    //#endregion

    //#region Instance Methods

    UserControl.Instance.IsLayoutContainer = function () { return true; };

    UserControl.Instance._MeasureOverrideWithError = function (availableSize, error) {
        var desired = new Size(0, 0);

        var border = this.Padding.Plus(this.BorderThickness);

        var walker = new _VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            child._MeasureWithError(availableSize.ShrinkByThickness(border), error);
            desired = child._DesiredSize;
        }

        desired = desired.GrowByThickness(border);

        return desired;
    };
    UserControl.Instance._ArrangeOverrideWithError = function (finalSize, error) {
        var border = this.Padding.Plus(this.BorderThickness);

        var arranged = finalSize;

        var walker = new _VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
            childRect = childRect.ShrinkByThickness(border);
            child._ArrangeWithError(childRect, error);
            arranged = new Size(childRect.Width, childRect.Height).GrowByThickness(border);
        }
        return arranged;
    };

    UserControl.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType != UserControl) {
            this._OnPropertyChanged$FrameworkElement(args, error);
            return;
        }

        if (args.Property._ID === UserControl.ContentProperty._ID) {
            if (args.OldValue && args.OldValue instanceof Fayde.UIElement) {
                if (args.OldValue instanceof FrameworkElement) {
                    args.OldValue._SetLogicalParent(null, error);
                    if (error.IsErrored())
                        return;
                }
                this._ElementRemoved(args.OldValue);
            }
            if (args.NewValue && args.NewValue instanceof Fayde.UIElement) {
                if (args.NewValue instanceof FrameworkElement) {
                    args.NewValue._SetLogicalParent(this, error);
                    if (error.IsErrored())
                        return;
                }
                this._ElementAdded(args.NewValue);
            }
            this._UpdateBounds();
        }
        this.PropertyChanged.Raise(this, args);
    };

    //#endregion

    //#region Annotations

    UserControl.Annotations = {
        ContentProperty: UserControl.ContentProperty
    };

    //#endregion

    namespace.UserControl = Nullstone.FinishCreate(UserControl);
})(Nullstone.Namespace("Fayde.Controls"));