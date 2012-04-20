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

//#region DEPENDENCY PROPERTIES

ContentControl.ContentProperty = DependencyProperty.Register("Content", function () { return Object; }, ContentControl);
ContentControl.Instance.GetContent = function () {
    return this.$GetValue(ContentControl.ContentProperty);
};
ContentControl.Instance.SetContent = function (value) {
    this.$SetValue(ContentControl.ContentProperty, value);
};

ContentControl.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return ControlTemplate; }, ContentControl);
ContentControl.Instance.GetContentTemplate = function () {
    return this.$GetValue(ContentControl.ContentTemplateProperty);
};
ContentControl.Instance.SetContentTemplate = function (value) {
    this.$SetValue(ContentControl.ContentTemplateProperty, value);
};

//#endregion

//#region PROPERTIES

ContentControl.Instance.GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};

//#endregion

//#region INSTANCE METHODS

ContentControl.Instance._GetDefaultTemplate = function () {
    return this.GetFallbackRoot();
};

//#endregion

//#region ANNOTATIONS

ContentControl.Annotations = {
    ContentProperty: ContentControl.ContentProperty
};

//#endregion

Nullstone.FinishCreate(ContentControl);
//#endregion