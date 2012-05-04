/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// <reference path="Grid.js"/>
/// CODE

//#region ContentControl
var ContentControl = Nullstone.Create("ContentControl", Control);

ContentControl._FallbackTemplate = (function () {
    // <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
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
})();

//#region Dependency Properties

ContentControl._OnContentPropertyChanged = function (d, args) {
    d.OnContentChanged(args.OldValue, args.NewValue);
};
ContentControl.ContentProperty = DependencyProperty.RegisterCore("Content", function () { return Object; }, ContentControl, undefined, ContentControl._OnContentPropertyChanged);
ContentControl.Instance.GetContent = function () {
    return this.$GetValue(ContentControl.ContentProperty);
};
ContentControl.Instance.SetContent = function (value) {
    this.$SetValue(ContentControl.ContentProperty, value);
};

ContentControl._OnContentTemplatePropertyChanged = function (d, args) {
    d.OnContentTemplateChanged(args.OldValue, args.NewValue);
};
ContentControl.ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", function () { return ControlTemplate; }, ContentControl, undefined, ContentControl._OnContentTemplatePropertyChanged);
ContentControl.Instance.GetContentTemplate = function () {
    return this.$GetValue(ContentControl.ContentTemplateProperty);
};
ContentControl.Instance.SetContentTemplate = function (value) {
    this.$SetValue(ContentControl.ContentTemplateProperty, value);
};

//#endregion

//#region Properties

ContentControl.Instance.GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};

//#endregion

//#region Instance Methods

ContentControl.Instance.OnContentChanged = function (oldContent, newContent) {
};
ContentControl.Instance.OnContentTemplateChanged = function (oldContentTemplate, newContentTemplate) {
};

ContentControl.Instance._GetDefaultTemplate = function () {
    return this.GetFallbackRoot();
};

//#endregion

//#region Annotations

ContentControl.Annotations = {
    ContentProperty: ContentControl.ContentProperty
};

//#endregion

Nullstone.FinishCreate(ContentControl);
//#endregion