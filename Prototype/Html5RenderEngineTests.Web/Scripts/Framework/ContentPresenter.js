/// <reference path="FrameworkElement.js"/>
/// CODE
/// <reference path="ContentControl.js"/>
/// <reference path="Templates.js"/>

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
    return this.GetValue(ContentPresenter.ContentTemplateProperty);
};
ContentPresenter.prototype.SetContentTemplate = function (value) {
    this.SetValue(ContentPresenter.ContentTemplateProperty, value);
};

//#endregion

//#region INSTANCE METHODS

ContentPresenter.prototype._GetDefaultTemplate = function () {
    var templateOwner = this._GetTemplateOwner();
    if (templateOwner) {
        if (this._ReadLocalValue(ContentPresenter.ContentProperty) == undefined) {
            this._SetTemplateBinding(ContentPresenter.ContentProperty, new TemplateBindingExpression(ContentControl.ContentProperty, ContentPresenter.ContentProperty));
        }
        if (this._ReadLocalValue(ContentPresenter.ContentTemplateProperty) == undefined) {
            this._SetTemplateBinding(ContentPresenter.ContentTemplateProperty, new TemplateBindingExpression(ContentControl.ContentTemplateProperty, ContentPresenter.ContentTemplateProperty));
        }
    }

    var template = this.GetContentTemplate();
    if (template) {
        this._ContentRoot = template.GetVisualTree(this);
    } else {
        var content = this.GetContent();
        this._ContentRoot = content;
        if (!(this._ContentRoot instanceof UIElement) && content != null)
            this._ContentRoot = this._GetFallbackRoot();
    }
    return this._ContentRoot;
};
ContentPresenter.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ContentPresenter) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    if (args.Property == ContentPresenter.ContentProperty) {
        if ((args.NewValue && args.NewValue instanceof UIElement)
            || (args.OldValue && args.OldValue instanceof UIElement)) {
            this._ClearRoot();
        }
        if (args.NewValue && !(args.NewValue instanceof UIElement))
            this.SetValue(FrameworkElement.DataContextProperty, args.NewValue);
        else
            this.ClearValue(FrameworkElement.DataContextProperty);
        this._InvalidateMeasure();
    } else if (args.Property == ContentPresenter.ContentTemplateProperty) {
        this._ClearRoot();
        this._InvalidateMeasure();
    }
    this.PropertyChanged.Raise(this, args);
};
ContentPresenter.prototype._ClearRoot = function () {
    //TODO: Raise ContentPresenter.ClearRootEvent
};
ContentPresenter.prototype._GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};

//#endregion

//#region ANNOTATIONS

ContentPresenter.Annotations = {
    ContentProperty: ContentPresenter.ContentProperty
};

//#endregion

//#endregion