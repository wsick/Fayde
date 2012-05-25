/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="ContentControl.js"/>

//#region ContentPresenter
var ContentPresenter = Nullstone.Create("ContentPresenter", FrameworkElement);

//#region Dependency Properties

ContentPresenter.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, ContentPresenter);
ContentPresenter.Instance.GetContent = function () {
    return this.$GetValue(ContentPresenter.ContentProperty);
};
ContentPresenter.Instance.SetContent = function (value) {
    this.$SetValue(ContentPresenter.ContentProperty, value);
};

ContentPresenter.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return ControlTemplate; }, ContentPresenter);
ContentPresenter.Instance.GetContentTemplate = function () {
    /// <returns type="ControlTemplate" />
    return this.$GetValue(ContentPresenter.ContentTemplateProperty);
};
ContentPresenter.Instance.SetContentTemplate = function (value) {
    this.$SetValue(ContentPresenter.ContentTemplateProperty, value);
};

//#endregion

//#region Properties

// <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
ContentPresenter.Instance._CreateFallbackTemplate = function () {
    return new ControlTemplate(ContentControl, {
        Type: Grid,
        Children: [
            {
                Type: TextBlock,
                Props: {
                    Text: new BindingMarkup()
                }
            }
        ]
    });
};
ContentPresenter.Instance._GetFallbackRoot = function () {
    /// <returns type="UIElement" />
    if (this._FallbackRoot == null) {
        if (!ContentPresenter._FallbackTemplate)
            ContentPresenter._FallbackTemplate = this._CreateFallbackTemplate();
        this._FallbackRoot = ContentPresenter._FallbackTemplate.GetVisualTree(this);
    }
    return this._FallbackRoot;
};

//#endregion

//#region Instance Methods

ContentPresenter.Instance._GetDefaultTemplateCallback = function () {
    /// <returns type="UIElement" />
    var templateOwner = Nullstone.As(this.TemplateOwner, ContentControl);
    if (templateOwner != null) {
        if (this.$ReadLocalValue(ContentPresenter.ContentProperty) instanceof UnsetValue) {
            this.$SetValue(ContentPresenter.ContentProperty,
                new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
        }
        if (this.$ReadLocalValue(ContentPresenter.ContentTemplateProperty) instanceof UnsetValue) {
            this.$SetValue(ContentPresenter.ContentTemplateProperty,
                new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
        }
    }

    var template = Nullstone.As(this.GetContentTemplate(), DataTemplate);
    if (template != null) {
        this._ContentRoot = Nullstone.As(template.GetVisualTree(this), UIElement);
    } else {
        var content = this.GetContent();
        this._ContentRoot = Nullstone.As(content, UIElement);
        if (this._ContentRoot == null && content != null)
            this._ContentRoot = this._GetFallbackRoot();
    }
    return this._ContentRoot;
};
ContentPresenter.Instance._ClearRoot = function () {
    if (this._ContentRoot != null)
        this._ElementRemoved(this._ContentRoot);
    this._ContentRoot = null;
};
ContentPresenter.Instance.InvokeLoaded = function () {
    if (Nullstone.Is(this.GetContent(), UIElement))
        this.$ClearValue(FrameworkElement.DataContextProperty);
    else
        this.DataContext = this.GetContent();
    this.InvokeLoaded$FrameworkElement();
};

ContentPresenter.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ContentPresenter) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }
    if (args.Property._ID === ContentPresenter.ContentProperty._ID) {
        if ((args.NewValue && args.NewValue instanceof UIElement)
            || (args.OldValue && args.OldValue instanceof UIElement)) {
            this._ClearRoot();
        }
        if (args.NewValue && !(args.NewValue instanceof UIElement))
            this._SetValue(FrameworkElement.DataContextProperty, args.NewValue);
        else
            this._ClearValue(FrameworkElement.DataContextProperty);
        this._InvalidateMeasure();
    } else if (args.Property._ID === ContentPresenter.ContentTemplateProperty._ID) {
        this._ClearRoot();
        this._InvalidateMeasure();
    }
    this.PropertyChanged.Raise(this, args);
};

//#endregion

//#region Annotations

ContentPresenter.Annotations = {
    ContentProperty: ContentPresenter.ContentProperty
};

//#endregion

Nullstone.FinishCreate(ContentPresenter);
//#endregion