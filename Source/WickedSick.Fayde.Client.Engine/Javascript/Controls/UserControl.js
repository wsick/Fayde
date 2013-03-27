/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// CODE

(function (namespace) {
    var UserControl = Nullstone.Create("UserControl", namespace.Control);

    UserControl.Instance.Init = function () {
        this.Init$Control();
        this.InitializeComponent();
    };

    //#region Properties

    UserControl.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, UserControl);

    Nullstone.AutoProperties(UserControl, [
        UserControl.ContentProperty
    ]);

    //#endregion

    //#region Instance Methods

    UserControl.Instance.IsLayoutContainer = function () { return true; };

    UserControl.Instance._MeasureOverride = function (availableSize, pass) {
        var desired;
        availableSize = size.clone(availableSize);
        var border = this.Padding.Plus(this.BorderThickness);
        size.shrinkByThickness(availableSize, border);

        var walker = new Fayde._VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            child._Measure(availableSize);
            desired = size.clone(child._DesiredSize);
        }
        if (!desired)
            desired = new size();
        size.growByThickness(desired, border);
        return desired;
    };
    UserControl.Instance._ArrangeOverrideWithError = function (finalSize, error) {
        var border = this.Padding.Plus(this.BorderThickness);
        var arranged;

        var walker = new Fayde._VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            var childRect = rect.fromSize(finalSize);
            rect.shrinkByThickness(childRect, border);
            child._ArrangeWithError(childRect, error);
            arranged = size.fromRect(childRect);
            size.growByThickness(arranged, border);
        }
        if (!arranged)
            return finalSize;
        return arranged;
    };

    UserControl.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType != UserControl) {
            this._OnPropertyChanged$FrameworkElement(args, error);
            return;
        }

        if (args.Property._ID === UserControl.ContentProperty._ID) {
            if (args.OldValue && args.OldValue instanceof Fayde.UIElement) {
                if (args.OldValue instanceof Fayde.FrameworkElement) {
                    args.OldValue._SetLogicalParent(null, error);
                    if (error.IsErrored())
                        return;
                }
                this._ElementRemoved(args.OldValue);
            }
            if (args.NewValue && args.NewValue instanceof Fayde.UIElement) {
                if (args.NewValue instanceof Fayde.FrameworkElement) {
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

    UserControl.Instance.InitializeComponent = function () {
        this.ApplyTemplate();
    };
    UserControl.Instance._GetDefaultTemplateCallback = function () {
        var json = this.constructor.__TemplateJson;
        if (json)
            Fayde.JsonParser.ParseUserControl(json, this);
    };

    namespace.UserControl = Nullstone.FinishCreate(UserControl);
})(Nullstone.Namespace("Fayde.Controls"));