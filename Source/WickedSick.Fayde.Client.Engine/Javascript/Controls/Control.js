/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js" />
/// CODE

//#region Control
var Control = Nullstone.Create("Control", FrameworkElement);

Control.Instance.Init = function () {
    this.Init$FrameworkElement();
    this._Providers[_PropertyPrecedence.IsEnabled] = new _InheritedIsEnabledPropertyValueProvider(this, _PropertyPrecedence.IsEnabled);
};

//#region DEPENDENCY PROPERTIES

Control.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Control);
Control.Instance.GetBackground = function () {
    return this.GetValue(Control.BackgroundProperty);
};
Control.Instance.SetBackground = function (value) {
    this.SetValue(Control.BackgroundProperty, value);
};

Control.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () { return Brush; }, Control);
Control.Instance.GetBorderBrush = function () {
    return this.GetValue(Control.BorderBrushProperty);
};
Control.Instance.SetBorderBrush = function (value) {
    this.SetValue(Control.BorderBrushProperty, value);
};

Control.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", function () { return Thickness; }, Control, new Thickness());
Control.Instance.GetBorderThickness = function () {
    return this.GetValue(Control.BorderThicknessProperty);
};
Control.Instance.SetBorderThickness = function (value) {
    this.SetValue(Control.BorderThicknessProperty, value);
};

Control.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, Control, Font.DEFAULT_FAMILY);
Control.Instance.GetFontFamily = function () {
    return this.GetValue(Control.FontFamilyProperty);
};
Control.Instance.SetFontFamily = function (value) {
    this.SetValue(Control.FontFamilyProperty, value);
};

Control.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, Control, Font.DEFAULT_SIZE);
Control.Instance.GetFontSize = function () {
    return this.GetValue(Control.FontSizeProperty);
};
Control.Instance.SetFontSize = function (value) {
    this.SetValue(Control.FontSizeProperty, value);
};

Control.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, Control, Font.DEFAULT_STRETCH);
Control.Instance.GetFontStretch = function () {
    return this.GetValue(Control.FontStretchProperty);
};
Control.Instance.SetFontStretch = function (value) {
    this.SetValue(Control.FontStretchProperty, value);
};

Control.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, Control, Font.DEFAULT_STYLE);
Control.Instance.GetFontStyle = function () {
    return this.GetValue(Control.FontStyleProperty);
};
Control.Instance.SetFontStyle = function (value) {
    this.SetValue(Control.FontStyleProperty, value);
};

Control.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, Control, Font.DEFAULT_WEIGHT);
Control.Instance.GetFontWeight = function () {
    return this.GetValue(Control.FontWeightProperty);
};
Control.Instance.SetFontWeight = function (value) {
    this.SetValue(Control.FontWeightProperty, value);
};

Control.ForegroundProperty = DependencyProperty.Register("Foreground", function () { return Brush; }, Control);
Control.Instance.GetForeground = function () {
    return this.GetValue(Control.ForegroundProperty);
};
Control.Instance.SetForeground = function (value) {
    this.SetValue(Control.ForegroundProperty, value);
};

Control.HorizontalContentAlignmentProperty = DependencyProperty.Register("HorizontalContentAlignment", function () { return Number; }, Control, HorizontalAlignment.Center);
Control.Instance.GetHorizontalContentAlignment = function () {
    return this.GetValue(Control.HorizontalContentAlignmentProperty);
};
Control.Instance.SetHorizontalContentAlignment = function (value) {
    this.SetValue(Control.HorizontalContentAlignmentProperty, value);
};

Control.IsEnabledProperty = DependencyProperty.Register("IsEnabled", function () { return Boolean; }, Control, true, function (d, args, error) { d.OnIsEnabledChanged(args); });
Control.Instance.GetIsEnabled = function () {
    return this.GetValue(Control.IsEnabledProperty);
};
Control.Instance.SetIsEnabled = function (value) {
    this.SetValue(Control.IsEnabledProperty, value);
};

Control.IsTabStopProperty = DependencyProperty.Register("IsTabStop", function () { return Boolean; }, Control, true);
Control.Instance.GetIsTabStop = function () {
    return this.GetValue(Control.IsTabStopProperty);
};
Control.Instance.SetIsTabStop = function (value) {
    this.SetValue(Control.IsTabStopProperty, value);
};

Control.PaddingProperty = DependencyProperty.Register("Padding", function () { return Thickness; }, Control, new Thickness());
Control.Instance.GetPadding = function () {
    return this.GetValue(Control.PaddingProperty);
};
Control.Instance.SetPadding = function (value) {
    this.SetValue(Control.PaddingProperty, value);
};

Control.TabIndexProperty = DependencyProperty.Register("TabIndex", function () { return Number; }, Control, Number.MAX_VALUE);
Control.Instance.GetTabIndex = function () {
    return this.GetValue(Control.TabIndexProperty);
};
Control.Instance.SetTabIndex = function (value) {
    this.SetValue(Control.TabIndexProperty, value);
};

Control.TabNavigationProperty = DependencyProperty.Register("TabNavigation", function () { return Number; }, Control);
Control.Instance.GetTabNavigation = function () {
    return this.GetValue(Control.TabNavigationProperty);
};
Control.Instance.SetTabNavigation = function (value) {
    this.SetValue(Control.TabNavigationProperty, value);
};

Control.TemplateProperty = DependencyProperty.Register("Template", function () { return ControlTemplate; }, Control);
Control.Instance.GetTemplate = function () {
    return this.GetValue(Control.TemplateProperty);
};
Control.Instance.SetTemplate = function (value) {
    this.SetValue(Control.TemplateProperty, value);
};

Control.VerticalContentAlignmentProperty = DependencyProperty.Register("VerticalContentAlignment", function () { return Number; }, Control, VerticalAlignment.Center);
Control.Instance.GetVerticalContentAlignment = function () {
    return this.GetValue(Control.VerticalContentAlignmentProperty);
};
Control.Instance.SetVerticalContentAlignment = function (value) {
    this.SetValue(Control.VerticalContentAlignmentProperty, value);
};

Control.DefaultStyleKeyProperty = DependencyProperty.Register("DefaultStyleKey", function () { return Function; }, Control);
Control.Instance.GetDefaultStyleKey = function () {
    return this.GetValue(Control.DefaultStyleKeyProperty);
};
Control.Instance.SetDefaultStyleKey = function (value) {
    this.SetValue(Control.DefaultStyleKeyProperty, value);
};

Control.IsTemplateItemProperty = DependencyProperty.RegisterAttached("IsTemplateItem", function () { return Boolean; }, Control, false);
Control.GetIsTemplateItem = function (d) {
    return d.GetValue(Control.IsTemplateItemProperty);
};
Control.SetIsTemplateItem = function (d, value) {
    d.SetValue(Control.IsTemplateItemProperty, value);
};

//#endregion

//#region PROPERTIES

Control.Instance.GetIsFocused = function () {
    ///<returns type="Boolean"></returns>
    return this._IsFocused;
};

//#endregion

//#region INSTANCE METHODS

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

Control.Instance.CanCaptureMouse = function () {
    return this.GetIsEnabled();
};

Control.Instance._CanFindElement = function () {
    return this.GetIsEnabled();
};
Control.Instance._InsideObject = function (x, y) {
    return false;
};
Control.Instance._HitTestPoint = function (ctx, p, uielist) {
    if (this.GetIsEnabled())
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
    var t = this.GetTemplate();
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

//#endregion

//#region FOCUS

Control.Instance.Focus = function (recurse) {
    recurse = recurse === undefined || recurse === true;
    if (!this._IsAttached)
        return false;

    var surface = App.Instance.MainSurface;
    var walker = new _DeepTreeWalker(this);
    var uie;
    while (uie = walker.Step()) {
        if (uie.GetVisibility() !== Visibility.Visible) {
            walker.SkipBranch();
            continue;
        }

        var c = Nullstone.As(uie, Control);
        if (c == null)
            continue;

        if (!c.GetIsEnabled()) {
            if (!recurse)
                return false;
            walker.SkipBranch();
            continue;
        }

        var loaded = false;
        for (var check = this; !loaded && check != null; check = check.GetVisualParent())
            loaded = loaded || check._IsLoaded;

        if (loaded && c._GetRenderVisible() && c.GetIsTabStop())
            return surface._FocusElement(c);

        if (!recurse)
            return false;
    }
    return false;
};
Control.Instance.OnGotFocus = function (sender, args) {
    this._IsFocused = true;
    this.OnGotFocus$FrameworkElement(sender, args);
};
Control.Instance.OnLostFocus = function (sender, args) {
    this._IsFocused = false;
    this.OnLostFocus$FrameworkElement(sender, args);
};

//#endregion

Control.Instance.OnIsEnabledChanged = function (args) {
}

Nullstone.FinishCreate(Control);
//#endregion