/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js" />
/// CODE

//#region Control
var Control = Nullstone.Create("Control", FrameworkElement);

Control.Instance.Init = function () {
    this.Init$FrameworkElement();
    this._Providers[_PropertyPrecedence.IsEnabled] = new _InheritedIsEnabledPropertyValueProvider(this, _PropertyPrecedence.IsEnabled);
};

//#region Properties

Control.BackgroundProperty = DependencyProperty.RegisterCore("Background", function () { return Brush; }, Control);
Control.BorderBrushProperty = DependencyProperty.RegisterCore("BorderBrush", function () { return Brush; }, Control);
Control.BorderThicknessProperty = DependencyProperty.RegisterCore("BorderThickness", function () { return Thickness; }, Control, new Thickness());
Control.FontFamilyProperty = DependencyProperty.RegisterCore("FontFamily", function () { return String; }, Control, Font.DEFAULT_FAMILY);
Control.FontSizeProperty = DependencyProperty.RegisterCore("FontSize", function () { return Number; }, Control, Font.DEFAULT_SIZE);
Control.FontStretchProperty = DependencyProperty.RegisterCore("FontStretch", function () { return String; }, Control, Font.DEFAULT_STRETCH);
Control.FontStyleProperty = DependencyProperty.RegisterCore("FontStyle", function () { return String; }, Control, Font.DEFAULT_STYLE);
Control.FontWeightProperty = DependencyProperty.RegisterCore("FontWeight", function () { return new Enum(FontWeight); }, Control, Font.DEFAULT_WEIGHT);
Control.ForegroundProperty = DependencyProperty.RegisterFull("Foreground", function () { return Brush; }, Control, undefined, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0, 1.0)); } });
Control.HorizontalContentAlignmentProperty = DependencyProperty.RegisterCore("HorizontalContentAlignment", function () { return new Enum(HorizontalAlignment); }, Control, HorizontalAlignment.Center);
Control.IsEnabledProperty = DependencyProperty.RegisterCore("IsEnabled", function () { return Boolean; }, Control, true, function (d, args, error) { d.OnIsEnabledChanged(args); });
Control.IsTabStopProperty = DependencyProperty.RegisterCore("IsTabStop", function () { return Boolean; }, Control, true);
Control.PaddingProperty = DependencyProperty.RegisterCore("Padding", function () { return Thickness; }, Control, new Thickness());
Control.TabIndexProperty = DependencyProperty.RegisterCore("TabIndex", function () { return Number; }, Control, Number.MAX_VALUE);
Control.TabNavigationProperty = DependencyProperty.RegisterCore("TabNavigation", function () { return Number; }, Control);
Control.TemplateProperty = DependencyProperty.RegisterCore("Template", function () { return ControlTemplate; }, Control);
Control.VerticalContentAlignmentProperty = DependencyProperty.RegisterCore("VerticalContentAlignment", function () { return new Enum(VerticalAlignment); }, Control, VerticalAlignment.Center);
Control.DefaultStyleKeyProperty = DependencyProperty.RegisterCore("DefaultStyleKey", function () { return Function; }, Control);

Control.IsTemplateItemProperty = DependencyProperty.RegisterAttachedCore("IsTemplateItem", function () { return Boolean; }, Control, false);
Control.GetIsTemplateItem = function (d) {
    ///<returns type="Boolean"></returns>
    return d.$GetValue(Control.IsTemplateItemProperty);
};
Control.SetIsTemplateItem = function (d, value) {
    ///<param name="value" type="Boolean"></param>
    d.$SetValue(Control.IsTemplateItemProperty, value);
};

Nullstone.AutoProperties(Control, [
    Control.BackgroundProperty,
    Control.BorderBrushProperty,
    Control.BorderThicknessProperty,
    Control.FontFamilyProperty,
    Control.FontSizeProperty,
    Control.FontStretchProperty,
    Control.FontStyleProperty,
    Control.FontWeightProperty,
    Control.ForegroundProperty,
    Control.HorizontalContentAlignmentProperty,
    Control.IsEnabledProperty,
    Control.IsTabStopProperty,
    Control.PaddingProperty,
    Control.TabIndexProperty,
    Control.TabNavigationProperty,
    Control.TemplateProperty,
    Control.VerticalContentAlignmentProperty,
    Control.DefaultStyleKeyProperty
]);

Nullstone.Property(Control, "IsFocused", {
    get: function () {
        /// <returns type="Boolean" />
        return this._IsFocused;
    }
});

//#endregion

//#region Instance Methods

Control.Instance.GetDefaultStyle = function () {
    return null;
};
Control.Instance.GetTemplateChild = function (name) {
    if (this._TemplateRoot)
        return this._TemplateRoot.FindName(name);
    return null;
};
Control.Instance.SetVisualParent = function (visualParent) {
    if (this.GetVisualParent() != visualParent) {
        this.SetVisualParent$FrameworkElement(visualParent);
        this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(this._GetLogicalParent());
    }
};

Control.Instance._ElementAdded = function (item) {
    var error = new BError();
    item._AddParent(this, true, error);
    this._SetSubtreeObject(item);
    this._ElementAdded$FrameworkElement(item);
};
Control.Instance._ElementRemoved = function (item) {
    var error;
    if (this._TemplateRoot) {
        this._TemplateRoot._RemoveParent(this, error);
        this._TemplateRoot = null;
    }
    item._RemoveParent(this, error);
    this._ElementRemoved$FrameworkElement(item);
};

Control.Instance.IsLayoutContainer = function () {
    return true;
};
Control.Instance.CanCaptureMouse = function () {
    return this.IsEnabled;
};

Control.Instance._CanFindElement = function () {
    return this.IsEnabled;
};
Control.Instance._InsideObject = function (x, y) {
    return false;
};
Control.Instance._HitTestPoint = function (ctx, p, uielist) {
    if (this.IsEnabled)
        this._HitTestPoint$FrameworkElement(ctx, p, uielist);
};

Control.Instance._UpdateIsEnabledSource = function (control) {
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(control);
};

Control.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Control) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }

    if (args.Property._ID === Control.TemplateProperty._ID) {
        var subtree = this._GetSubtreeObject();
        if (subtree)
            this._ElementRemoved(subtree);
        this._InvalidateMeasure();
    } else if (args.Property._ID === Control.PaddingProperty._ID
        || args.Property._ID === Control.BorderThicknessProperty._ID) {
        this._InvalidateMeasure();
    } else if (args.Property._ID === Control.IsEnabledProperty._ID) {
        if (!args.NewValue) {
            //TODO: Remove element from focus
            //TODO: Release Mouse Capture
        }
        //TODO: IsEnabledChanged Event
    } else if (args.Property._ID === Control.HorizontalContentAlignmentProperty._ID
        || args.Property._ID === Control.VerticalContentAlignmentProperty._ID) {
        this._InvalidateArrange();
    }
    this.PropertyChanged.Raise(this, args);
};
Control.Instance._OnLogicalParentChanged = function (oldParent, newParent) {
    this._OnLogicalParentChanged$FrameworkElement(oldParent, newParent);
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(newParent);
};
Control.Instance._OnIsAttachedChanged = function (value) {
    this._OnIsAttachedChanged$FrameworkElement(value);
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(this._GetLogicalParent());
};

Control.Instance._DoApplyTemplateWithError = function (error) {
    var t = this.Template;
    if (!t)
        return this._DoApplyTemplateWithError$FrameworkElement(error);

    var root = t._GetVisualTreeWithError(this, error);
    if (root && !(root instanceof UIElement)) {
        Warn("Root element in template was not a UIElement.");
        root = null;
    }

    if (!root)
        return this._DoApplyTemplateWithError$FrameworkElement(error);

    if (this._TemplateRoot != root && this._TemplateRoot != null) {
        this._TemplateRoot._RemoveParent(this, null);
        this._TemplateRoot = null;
    }

    this._TemplateRoot = root;

    this._ElementAdded(this._TemplateRoot);

    if (this._IsLoaded) {
        //Deployment Loaded Event (Async)
    }

    return true;
};

Control.Instance.OnMouseLeftButtonDown = function (sender, args) { };

//#endregion

//#region Focus

Control.Instance.Focus = function (recurse) {
    recurse = recurse === undefined || recurse === true;
    if (!this._IsAttached)
        return false;

    var surface = App.Instance.MainSurface;
    var walker = new _DeepTreeWalker(this);
    var uie;
    while (uie = walker.Step()) {
        if (uie.Visibility !== Visibility.Visible) {
            walker.SkipBranch();
            continue;
        }

        var c = Nullstone.As(uie, Control);
        if (c == null)
            continue;

        if (!c.IsEnabled) {
            if (!recurse)
                return false;
            walker.SkipBranch();
            continue;
        }

        var loaded = false;
        for (var check = this; !loaded && check != null; check = check.GetVisualParent())
            loaded = loaded || check._IsLoaded;

        if (loaded && c._GetRenderVisible() && c.IsTabStop)
            return surface._FocusElement(c);

        if (!recurse)
            return false;
    }
    return false;
};
Control.Instance.OnGotFocus = function (sender, e) {
    this._IsFocused = true;
    this.OnGotFocus$FrameworkElement(sender, e);
};
Control.Instance.OnLostFocus = function (sender, e) {
    this._IsFocused = false;
    this.OnLostFocus$FrameworkElement(sender, e);
};

//#endregion

Control.Instance.OnIsEnabledChanged = function (args) {
    if (!this.IsEnabled)
        this.$SetValueInternal(UIElement.IsMouseOverProperty, false);
}

//#region Visual State Management

Control.Instance.$UpdateVisualState = function (useTransitions) {
    useTransitions = useTransitions !== false;
    var states = this.$GetVisualStateNamesToActivate();
    for (var i = 0; i < states.length; i++) {
        VisualStateManager.GoToState(this, states[i], useTransitions);
    }
};
Control.Instance.$GetVisualStateNamesToActivate = function () {
    var commonState = this.$GetVisualStateCommon();
    var focusedState = this.$GetVisualStateFocus();
    return [commonState, focusedState];
};
Control.Instance.$GetVisualStateCommon = function () {
    if (!this.IsEnabled) {
        return "Disabled";
    } else if (this.IsMouseOver) {
        return "MouseOver";
    } else {
        return "Normal";
    }
};
Control.Instance.$GetVisualStateFocus = function () {
    if (this.IsFocused && this.IsEnabled)
        return "Focused";
    else
        return "Unfocused";
};

//#endregion

Nullstone.FinishCreate(Control);
//#endregion