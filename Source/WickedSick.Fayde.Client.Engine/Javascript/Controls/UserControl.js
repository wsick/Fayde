/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// CODE

//#region UserControl
var UserControl = Nullstone.Create("UserControl", Control);

//#region DEPENDENCY PROPERTIES

UserControl.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, UserControl);
UserControl.Instance.GetContent = function () {
    return this.$GetValue(UserControl.ContentProperty);
};
UserControl.Instance.SetContent = function (value) {
    this.SetValue(UserControl.ContentProperty, value);
};

//#endregion

//#region INSTANCE METHODS

UserControl.Instance.IsLayoutContainer = function () { return true; };

UserControl.Instance._MeasureOverrideWithError = function (availableSize, error) {
    var desired = new Size(0, 0);

    var border = this.GetPadding().Plus(this.GetBorderThickness());

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        child._MeasureWithError(availableSize.GrowByThickness(border.Negate()), error);
        desired = child._DesiredSize;
    }

    desired = desired.GrowByThickness(border);

    return desired;
};
UserControl.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    var border = this.GetPadding().Plus(this.GetBorderThickness());

    var arranged = finalSize;

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
        childRect = childRect.GrowByThickness(border.Negate());
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

    if (args.Property == UserControl.ContentProperty) {
        if (args.OldValue && args.OldValue instanceof UIElement) {
            if (args.OldValue instanceof FrameworkElement) {
                args.OldValue._SetLogicalParent(null, error);
                if (error.IsErrored())
                    return;
            }
            this._ElementRemoved(args.OldValue);
        }
        if (args.NewValue && args.NewValue instanceof UIElement) {
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

//#region ANNOTATIONS

UserControl.Annotations = {
    ContentProperty: UserControl.ContentProperty
};

//#endregion

Nullstone.FinishCreate(UserControl);
//#endregion