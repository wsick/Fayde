/// <reference path="../../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="../../Media/Matrix3DProjection.js"/>

//#region Popup
var Popup = Nullstone.Create("Popup", FrameworkElement);

Popup.Instance.Init = function () {
    this.Init$FrameworkElement();
    this.Opened = new MulticastEvent();
    this.Closed = new MulticastEvent();
    this.ClickedOutside = new MulticastEvent();
};

//#region Properties

Popup.ChildProperty = DependencyProperty.RegisterCore("Child", function () { return UIElement; }, Popup);
Popup.HorizontalOffsetProperty = DependencyProperty.RegisterCore("HorizontalOffset", function () { return Number; }, Popup, 0.0);
Popup.VerticalOffsetProperty = DependencyProperty.RegisterCore("VerticalOffset", function () { return Number; }, Popup, 0.0);
Popup.IsOpenProperty = DependencyProperty.RegisterCore("IsOpen", function () { return Boolean; }, Popup, false);

Nullstone.AutoProperties(Popup, [
    Popup.ChildProperty,
    Popup.HorizontalOffsetProperty,
    Popup.VerticalOffsetProperty,
    Popup.IsOpenProperty
]);

Nullstone.Property(Popup, "RealChild", {
    get: function () {
        if (this._ClickCatcher != null) {
            return this.Child.Children.GetValueAt(1);
        }
        return this.Child;
    }
});

//#endregion

//#region Annotations

Popup.Annotations = {
    ContentProperty: Popup.ChildProperty
};

//#endregion

Popup.Instance._ComputeBounds = function () { };

Popup.Instance._OnIsAttachedChanged = function (value) {
    this._OnIsAttachedChanged$FrameworkElement(value);
    if (!value && this.IsOpen)
        this.IsOpen = false;
};

Popup.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Popup) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }

    if (args.Property._ID === Popup.IsOpenProperty._ID) {
        if (args.NewValue) {
            this._Show(this.Child);
            this._OnOpened();
        } else {
            this._Hide(this.Child);
            this._OnClosed();
        }
    } else if (args.Property._ID === Popup.ChildProperty._ID) {
        if (args.OldValue != null) {
            var oldFE = Nullstone.As(args.OldValue, FrameworkElement);
            if (this.IsOpen)
                this._Hide(oldFE);

            this._Providers[_PropertyPrecedence.Inherited].ClearInheritedPropertiesOnRemovingFromTree(oldFE);

            oldFE._SetLogicalParent(undefined, error);
            if (error.IsErrored())
                return;
        }
        if (args.NewValue != null) {
            var newFE = Nullstone.As(args.NewValue, FrameworkElement);
            newFE._SetLogicalParent(this, error);
            if (error.IsErrored())
                return;

            this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(newFE);

            if (this.IsOpen)
                this._Show(newFE);
        }
    } else if (args.Property._ID === Popup.HorizontalOffsetProperty._ID
        || args.Property._ID === Popup.VerticalOffsetProperty._ID) {
        var child = this.Child;
        if (child != null)
            child._InvalidateMeasure();
    }
    this.PropertyChanged.Raise(this, args);
};

Popup.Instance._HitTestPoint = function (ctx, p, uielist) {
    if (this._Visible)
        this._HitTestPoint$FrameworkElement(ctx, p, uielist);
};

Popup.Instance._Hide = function (child) {
    if (!this._Visible || !child)
        return;
    this._Visible = false;
    App.Instance.MainSurface._DetachLayer(child);
};
Popup.Instance._Show = function (child) {
    if (this._Visible || !child)
        return;
    this._Visible = true;
    App.Instance.MainSurface._AttachLayer(child);
};

Popup.Instance._OnOpened = function () {
    this._UpdateCatcher();
    this.Opened.RaiseAsync(this, new EventArgs());
};
Popup.Instance._OnClosed = function () {
    this.Closed.RaiseAsync(this, new EventArgs());
};

Popup.Instance._CatchClickedOutside = function () {
    var child = this.Child;
    if (child == null)
        return;
    
    var root = new Canvas();
    this._ClickCatcher = new Canvas();
    this._ClickCatcher.Background = new SolidColorBrush(new Color(255, 255, 255, 0));
    this.Child = root;
    root.Children.Add(this._ClickCatcher);
    root.Children.Add(child);
    this._ClickCatcher.LayoutUpdated.Subscribe(this._UpdateCatcher, this);
    this._ClickCatcher.MouseLeftButtonDown.Subscribe(this._RaiseClickedOutside, this);
};
Popup.Instance._UpdateCatcher = function () {
    if (this._ClickCatcher == null)
        return;

    try {
        var xform = this.Child.TransformToVisual(null);
        if (xform instanceof Transform) {
            this._ClickCatcher.Projection = null;
            this._ClickCatcher.RenderTransform = xform.Inverse;
        } else if (xform instanceof InternalTransform) {
            var projection = new Matrix3DProjection();
            projection.ProjectionMatrix = xform.Inverse.Matrix;
            this._ClickCatcher.RenderTransform = null;
            this._ClickCatcher.Projection = projection;
        }
    } catch (err) {
        if (!(err instanceof ArgumentException))
            throw err;
    }

    this._ClickCatcher.Width = App.Instance.MainSurface.ActualWidth;
    this._ClickCatcher.Height = App.Instance.MainSurface.ActualHeight;
};
Popup.Instance._RaiseClickedOutside = function (sender, e) {
    this.ClickedOutside.Raise(this, new EventArgs());
};

Nullstone.FinishCreate(Popup);
//#endregion