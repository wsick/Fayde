/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Core/FrameworkElement.js" />
/// CODE

//#region Control

function Control() {
    FrameworkElement.call(this);

    this._Providers[_PropertyPrecedence.IsEnabled] = new _InheritedIsEnabledPropertyValueProvider(this, _PropertyPrecedence.IsEnabled);
}
Control.InheritFrom(FrameworkElement);

//#region DEPENDENCY PROPERTIES

Control.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Control);
Control.prototype.GetBackground = function () {
    return this.GetValue(Control.BackgroundProperty);
};
Control.prototype.SetBackground = function (value) {
    this.SetValue(Control.BackgroundProperty, value);
};

Control.BorderBrushProperty = DependencyProperty.Register("BorderBrush", function () { return Brush; }, Control);
Control.prototype.GetBorderBrush = function () {
    return this.GetValue(Control.BorderBrushProperty);
};
Control.prototype.SetBorderBrush = function (value) {
    this.SetValue(Control.BorderBrushProperty, value);
};

Control.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", function () { return Thickness; }, Control, new Thickness());
Control.prototype.GetBorderThickness = function () {
    return this.GetValue(Control.BorderThicknessProperty);
};
Control.prototype.SetBorderThickness = function (value) {
    this.SetValue(Control.BorderThicknessProperty, value);
};

Control.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, Control, Font.DEFAULT_FAMILY);
Control.prototype.GetFontFamily = function () {
    return this.GetValue(Control.FontFamilyProperty);
};
Control.prototype.SetFontFamily = function (value) {
    this.SetValue(Control.FontFamilyProperty, value);
};

Control.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, Control, Font.DEFAULT_SIZE);
Control.prototype.GetFontSize = function () {
    return this.GetValue(Control.FontSizeProperty);
};
Control.prototype.SetFontSize = function (value) {
    this.SetValue(Control.FontSizeProperty, value);
};

Control.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, Control, Font.DEFAULT_STRETCH);
Control.prototype.GetFontStretch = function () {
    return this.GetValue(Control.FontStretchProperty);
};
Control.prototype.SetFontStretch = function (value) {
    this.SetValue(Control.FontStretchProperty, value);
};

Control.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, Control, Font.DEFAULT_STYLE);
Control.prototype.GetFontStyle = function () {
    return this.GetValue(Control.FontStyleProperty);
};
Control.prototype.SetFontStyle = function (value) {
    this.SetValue(Control.FontStyleProperty, value);
};

Control.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, Control, Font.DEFAULT_WEIGHT);
Control.prototype.GetFontWeight = function () {
    return this.GetValue(Control.FontWeightProperty);
};
Control.prototype.SetFontWeight = function (value) {
    this.SetValue(Control.FontWeightProperty, value);
};

Control.ForegroundProperty = DependencyProperty.Register("Foreground", function () { return Brush; }, Control);
Control.prototype.GetForeground = function () {
    return this.GetValue(Control.ForegroundProperty);
};
Control.prototype.SetForeground = function (value) {
    this.SetValue(Control.ForegroundProperty, value);
};

Control.HorizontalContentAlignmentProperty = DependencyProperty.Register("HorizontalContentAlignment", function () { return Number; }, Control, HorizontalAlignment.Center);
Control.prototype.GetHorizontalContentAlignment = function () {
    return this.GetValue(Control.HorizontalContentAlignmentProperty);
};
Control.prototype.SetHorizontalContentAlignment = function (value) {
    this.SetValue(Control.HorizontalContentAlignmentProperty, value);
};

Control.IsEnabledProperty = DependencyProperty.Register("IsEnabled", function () { return Boolean; }, Control, true, function (d, args, error) { d.OnIsEnabledChanged(args); });
Control.prototype.GetIsEnabled = function () {
    return this.GetValue(Control.IsEnabledProperty);
};
Control.prototype.SetIsEnabled = function (value) {
    this.SetValue(Control.IsEnabledProperty, value);
};

Control.IsTabStopProperty = DependencyProperty.Register("IsTabStop", function () { return Boolean; }, Control, true);
Control.prototype.GetIsTabStop = function () {
    return this.GetValue(Control.IsTabStopProperty);
};
Control.prototype.SetIsTabStop = function (value) {
    this.SetValue(Control.IsTabStopProperty, value);
};

Control.PaddingProperty = DependencyProperty.Register("Padding", function () { return Thickness; }, Control, new Thickness());
Control.prototype.GetPadding = function () {
    return this.GetValue(Control.PaddingProperty);
};
Control.prototype.SetPadding = function (value) {
    this.SetValue(Control.PaddingProperty, value);
};

Control.TabIndexProperty = DependencyProperty.Register("TabIndex", function () { return Number; }, Control, Number.MAX_VALUE);
Control.prototype.GetTabIndex = function () {
    return this.GetValue(Control.TabIndexProperty);
};
Control.prototype.SetTabIndex = function (value) {
    this.SetValue(Control.TabIndexProperty, value);
};

Control.TabNavigationProperty = DependencyProperty.Register("TabNavigation", function () { return Number; }, Control);
Control.prototype.GetTabNavigation = function () {
    return this.GetValue(Control.TabNavigationProperty);
};
Control.prototype.SetTabNavigation = function (value) {
    this.SetValue(Control.TabNavigationProperty, value);
};

Control.TemplateProperty = DependencyProperty.Register("Template", function () { return ControlTemplate; }, Control);
Control.prototype.GetTemplate = function () {
    return this.GetValue(Control.TemplateProperty);
};
Control.prototype.SetTemplate = function (value) {
    this.SetValue(Control.TemplateProperty, value);
};

Control.VerticalContentAlignmentProperty = DependencyProperty.Register("VerticalContentAlignment", function () { return Number; }, Control, VerticalAlignment.Center);
Control.prototype.GetVerticalContentAlignment = function () {
    return this.GetValue(Control.VerticalContentAlignmentProperty);
};
Control.prototype.SetVerticalContentAlignment = function (value) {
    this.SetValue(Control.VerticalContentAlignmentProperty, value);
};

Control.DefaultStyleKeyProperty = DependencyProperty.Register("DefaultStyleKey", function () { return Function; }, Control);
Control.prototype.GetDefaultStyleKey = function () {
    return this.GetValue(Control.DefaultStyleKeyProperty);
};
Control.prototype.SetDefaultStyleKey = function (value) {
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

//#region INSTANCE METHODS

Control.prototype.GetDefaultStyle = function () {
    return null;
};
Control.prototype.GetTemplateChild = function (name) {
    if (this._TemplateRoot)
        return this._TemplateRoot.FindName(name);
    return null;
};
Control.prototype.SetVisualParent = function (visualParent) {
    if (this.GetVisualParent() != visualParent) {
        FrameworkElement.prototype.SetVisualParent.call(this, visualParent);
        this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(this._GetLogicalParent());
    }
};

Control.prototype._ElementAdded = function (item) {
    var error;
    item._AddParent(this, true, error);
    this._SetSubtreeObject(item);
    FrameworkElement.prototype._ElementAdded.call(this, item);
};
Control.prototype._ElementRemoved = function (item) {
    var error;
    if (this._TemplateRoot) {
        this._TemplateRoot._RemoveParent(this, error);
        this._TemplateRoot = null;
    }
    item._RemoveParent(this, error);
    FrameworkElement.prototype._ElementRemoved.call(this, item);
};

Control.prototype.CanCaptureMouse = function () {
    return this.GetIsEnabled();
};

Control.prototype._CanFindElement = function () {
    return this.GetIsEnabled();
};
Control.prototype._InsideObject = function (x, y) {
    return false;
};
Control.prototype._HitTestPoint = function (ctx, p, uielist) {
    if (this.GetIsEnabled())
        FrameworkElement.prototype._HitTestPoint.call(this, ctx, p, uielist);
};

Control.prototype._UpdateIsEnabledSource = function (control) {
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(control);
};

Control.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Control) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == Control.TemplateProperty) {
    } else if (args.Property == Control.PaddingProperty
        || args.Property == Control.BorderThicknessProperty) {
        this._InvalidateMeasure();
    } else if (args.Property == Control.IsEnabledProperty) {
        if (!args.NewValue) {
            //TODO: Remove element from focus
            //TODO: Release Mouse Capture
        }
        //TODO: IsEnabledChanged Event
    } else if (args.Property == Control.HorizontalContentAlignmentProperty
        || args.Property == Control.VerticalContentAlignmentProperty) {
        this._InvalidateArrange();
    }
    this.PropertyChanged.Raise(this, args);
};
Control.prototype._OnLogicalParentChanged = function (oldParent, newParent) {
    FrameworkElement.prototype._OnLogicalParentChanged.call(this, oldParent, newParent);
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(newParent);
};
Control.prototype._OnIsAttachedChanged = function (value) {
    FrameworkElement.prototype._OnIsAttachedChanged.call(this, value);
    this._Providers[_PropertyPrecedence.IsEnabled].SetDataSource(this._GetLogicalParent());
};

Control.prototype._DoApplyTemplateWithError = function (error) {
    var t = this.GetTemplate();
    if (!t)
        return FrameworkElement.prototype._DoApplyTemplateWithError.call(this, error);

    var root = t._GetVisualTreeWithError(this, error);
    if (root && !(root instanceof UIElement)) {
        Warn("Root element in template was not a UIElement.");
        root = null;
    }

    if (!root)
        return FrameworkElement.prototype._DoApplyTemplateWithError.call(this, error);

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

Control.prototype.Focus = function (recurse) {
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

        var c = RefObject.As(uie, Control);
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

//#endregion

Control.prototype.OnIsEnabledChanged = function (args) {
}

//#endregion
