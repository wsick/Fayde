/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Control.js"/>
/// <reference path="Grid.js"/>
/// CODE

//#region ContentControl

function ContentControl() {
    Control.call(this);
}
ContentControl.InheritFrom(Control);

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

ContentControl.ContentProperty = DependencyProperty.Register("Content", function () { return RefObject; }, ContentControl);
ContentControl.prototype.GetContent = function () {
    return this.GetValue(ContentControl.ContentProperty);
};
ContentControl.prototype.SetContent = function (value) {
    this.SetValue(ContentControl.ContentProperty, value);
};

ContentControl.ContentTemplateProperty = DependencyProperty.Register("ContentTemplate", function () { return ControlTemplate; }, ContentControl);
ContentControl.prototype.GetContentTemplate = function () {
    return this.GetValue(ContentControl.ContentTemplateProperty);
};
ContentControl.prototype.SetContentTemplate = function (value) {
    this.SetValue(ContentControl.ContentTemplateProperty, value);
};

//#endregion

//#region PROPERTIES

ContentControl.prototype.GetFallbackRoot = function () {
    if (this._FallbackRoot == null)
        this._FallbackRoot = ContentControl._FallbackTemplate.GetVisualTree(this);
    return this._FallbackRoot;
};

//#endregion

//#region INSTANCE METHODS

ContentControl.prototype._GetDefaultTemplate = function () {
    return this.GetFallbackRoot();
};

//#endregion

//#region ANNOTATIONS

ContentControl.Annotations = {
    ContentProperty: ContentControl.ContentProperty
};

//#endregion

//#endregion