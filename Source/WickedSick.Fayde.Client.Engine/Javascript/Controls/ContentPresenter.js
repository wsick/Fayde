/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="ContentControl.js"/>

//#region ContentPresenter

function ContentPresenter() {
    FrameworkElement.call(this);
}
ContentPresenter.InheritFrom(FrameworkElement);

//#region DEPENDENCY PROPERTIES

ContentPresenter.ContentProperty = DependencyProperty.Register("Content", function () { return RefObject; }, ContentPresenter);
ContentPresenter.prototype.GetContent = function () {
    return this.GetValue(ContentPresenter.ContentProperty);
};
ContentPresenter.prototype.SetContent = function (value) {
    this.SetValue(ContentPresenter.ContentProperty, value);
};

ContentPresenter.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return ControlTemplate; }, ContentPresenter);
ContentPresenter.prototype.GetContentTemplate = function () {
    /// <returns type="ControlTemplate" />
    return this.GetValue(ContentPresenter.ContentTemplateProperty);
};
ContentPresenter.prototype.SetContentTemplate = function (value) {
    this.SetValue(ContentPresenter.ContentTemplateProperty, value);
};

//#endregion

//#region PROPERTIES

ContentPresenter.prototype.GetFallbackRoot = function () {
    /// <returns type="UIElement" />
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};

//#endregion

//#region INSTANCE METHODS

ContentPresenter.prototype._GetDefaultTemplate = function () {
    /// <returns type="UIElement" />
    var templateOwner = this.GetTemplateOwner();
    if (templateOwner) {
        if (this.ReadLocalValue(ContentPresenter.ContentProperty) instanceof UnsetValue) {
            this.SetValue(ContentPresenter.ContentProperty, 
                new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
        }
        if (this.ReadLocalValue(ContentPresenter.ContentTemplateProperty) instanceof UnsetValue) {
            this.SetValue(ContentPresenter.ContentTemplateProperty, 
                new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
        }
    }

    var template = this.GetContentTemplate();
    if (template != null) {
        this._ContentRoot = RefObject.As(template.GetVisualTree(this), UIElement);
    } else {
        var content = this.GetContent();
        this._ContentRoot = RefObject.As(content, UIElement);
        if (this._ContentRoot == null && content != null)
            this._ContentRoot = this.GetFallbackRoot();
    }
    return this._ContentRoot;
};
ContentPresenter.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ContentPresenter) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    if (args.Property === ContentPresenter.ContentProperty) {
        if ((args.NewValue && args.NewValue instanceof UIElement)
            || (args.OldValue && args.OldValue instanceof UIElement)) {
            this._ClearRoot();
        }
        if (args.NewValue && !(args.NewValue instanceof UIElement))
            this.SetValue(FrameworkElement.DataContextProperty, args.NewValue);
        else
            this.ClearValue(FrameworkElement.DataContextProperty);
        this._InvalidateMeasure();
    } else if (args.Property === ContentPresenter.ContentTemplateProperty) {
        this._ClearRoot();
        this._InvalidateMeasure();
    }
    this.PropertyChanged.Raise(this, args);
};
ContentPresenter.prototype._ClearRoot = function () {
    if (this._ContentRoot != null)
        this._ElementRemoved(this._ContentRoot);
    this._ContentRoot = null;
};
ContentPresenter.prototype.InvokeLoaded = function () {
    if (this.GetContent() instanceof UIElement)
        this.ClearValue(FrameworkElement.DataContextProperty);
    else
        this.SetDataContext(this.GetContent());
    FrameworkElement.prototype.InvokeLoaded.call(this);
};

//#endregion

//#region ANNOTATIONS

ContentPresenter.Annotations = {
    ContentProperty: ContentPresenter.ContentProperty
};

//#endregion

//#endregion
